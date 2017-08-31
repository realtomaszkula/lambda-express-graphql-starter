export const toBeALanguage = (received: any) => {

  const pass = ['languageId', 'languageName'].every(prop => prop in received);

  if (pass) {
    return {
      message: () => (
        `expected ${received} to be Language`
      ),
      pass: true,
    };
  } else {
    return {
      message: () => (`expected ${received} NOT to be language`),
      pass: false,
    };
  }
};
