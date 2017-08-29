import { spawnSync } from 'child_process';
import * as path from 'path';
import * as yamljs from 'yamljs';
import * as chalk from 'chalk';

const log = (message: string) => console.log(chalk.green(message));

interface Config {
  functionName: string;
  s3Bucket: string;
  s3Key: string;
}

/* Load lambda.yml */
const configPath = path.join(__dirname, 'lambda.yml');
const { functionName, s3Bucket, s3Key } = yamljs.load(configPath) as Config;

/* Validate lambda.yml */
const FILL_IN = 'FILL_IN';
if (!functionName || functionName === FILL_IN) {
  throw new Error('lambda.yml missing functionName field');
}

if (!s3Bucket || s3Bucket === FILL_IN) {
  throw new Error('lambda.yml missing s3Bucket field');
}

if (!s3Key || s3Key === FILL_IN) {
  throw new Error('lambda.yml missing s3Key field');
}

/* Upload lambda */
interface ExecSpawn {
  logMessage: string;
  command: string;
  args?: string[];
}
const execSpawn = ({ logMessage, command, args = [] }: ExecSpawn): void => {
  log(logMessage);
  const { status, stderr } = spawnSync(command, args);
  if (status !== 0) {
    log(stderr.toString());
    process.exit(1);
  }
};

const commands: ExecSpawn[] = [
  {
    logMessage: 'building project',
    command: 'npm',
    args: ['run', 'build']
  },
  {
    logMessage: 'clearing node_modules',
    command: 'rm',
    args: ['-rf', 'node_modules', s3Key]
  },
  {
    logMessage: 'installing dependencies',
    command: 'npm',
    args: ['install', '--production']
  },
  {
    logMessage: 'zipping files',
    command: 'zip',
    args: ['-r', s3Key, '.', '-i', 'node_modules/\*', 'dist/\*']
  },
  {
    logMessage: 'uploading to S3',
    command: 'aws',
    args: [
      's3', 'cp',
      s3Key,
      `s3://${s3Bucket}/${s3Key}`
    ]
  },
  {
    logMessage: 'updating lambda code',
    command: 'aws',
    args: [
      'lambda', 'update-function-code',
      '--function-name', functionName,
      '--s3-bucket', s3Bucket,
      '--s3-key', s3Key,
    ]
  },
  {
    logMessage: 'clearing artefacts',
    command: 'rm',
    args: ['-rf', s3Key],
  },
  {
    logMessage: 'restoring node_modules',
    command: 'npm',
    args: ['install'],
  }
];

commands.forEach(execSpawn);
