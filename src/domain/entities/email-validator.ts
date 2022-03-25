export const EmailValidation = (email: string): boolean => {
  const emptyOrTooLarge = (str: string, maxSize: number): boolean => {
    if (!str || str.length > maxSize) {
      return true;
    }
    return false;
  };

  const nonConformant = (email: string): boolean => {
    const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    return !emailRegex.test(email);
  };

  const somePartIsTooLargeIn = (domain: string): boolean => {
    const maxPartSize = 63;
    const domainParts = domain.split('.');
    return domainParts.some((part) => part.length > maxPartSize);
  };

  const maxEmailSize = 320;
  if (emptyOrTooLarge(email, maxEmailSize) || nonConformant(email)) {
    return false;
  }

  const [local, domain] = email.split('@');
  const maxLocalSize = 64;
  const maxDomainSize = 255;
  if (emptyOrTooLarge(local, maxLocalSize)
        || emptyOrTooLarge(domain, maxDomainSize)) {
    return false;
  }

  if (somePartIsTooLargeIn(domain)) {
    return false;
  }

  return true;
};
