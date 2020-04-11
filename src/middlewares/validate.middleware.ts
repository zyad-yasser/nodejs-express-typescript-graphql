export const validate = (body, validationSchema) => {
  return new Promise((resolve, reject) => {
    const validation = validationSchema.validate(body, { abortEarly: false });

    if (validation.error) {
      const errors = [];
      validation.error.details.forEach((elem: any) => {
        errors.push({
          path: elem.path[0],
          message: elem.message,
        });
      });
      return reject(errors);
    }
    return resolve();
  });
};
