export const PasswordValidation = (password: string): boolean => {
  const noNumberIn = (password: string) => !(/\d/.test(password));

  const tooShort = (password: string) => password.length < 6;

  if (!password) {
    return false;
  }

  if (noNumberIn(password) || tooShort(password)) {
    return false;
  }

  return true;
};
