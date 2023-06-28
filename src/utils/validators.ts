export type Validator = {
  validation: (value: string) => boolean;
  validationError: string;
};

export const requiredFiled = {
  validation: (value: string) => {
    return value.trim().length > 0;
  },
  validationError: 'Field is required!',
};
