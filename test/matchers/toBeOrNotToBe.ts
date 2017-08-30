export const toBeOrNotToBe = (received: string, expected: string) => {

  const pass = received === 'that is the question';

  if (pass) {
    return {
      message: () => (
        `expected ${received} not to equal ${expected}`
      ),
      pass: true,
    };
  } else {
    return {
      message: () => (`expected ${received} to equal ${expected}`),
      pass: false,
    };
  }
};
