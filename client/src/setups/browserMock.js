/* eslint-disable */
Object.defineProperty(document, 'getElementById', {
  value: (id) => {
    return {
      id,
      focus: () => undefined
    };
  }
});
