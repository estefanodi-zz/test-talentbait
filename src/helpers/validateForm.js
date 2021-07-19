export const validate = (data) => {
  let isValid = true;
  let missingField;
  for (let key in data) {
    if (!data[key]) {
      isValid = false;
      missingField = key;
      break;
    }
  }
  return [isValid, `Field ${missingField} is missing`];
};
