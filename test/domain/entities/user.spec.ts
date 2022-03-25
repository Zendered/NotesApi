import { User } from '@/domain/entities/user';

describe('User domain entity', () => {
  const validEmail = 'any@mail.com';
  const validPassword = '1validpassword';
  const invalidEmail = 'invalid_email';
  const invalidPasswordWithNoNumbers = 'invalid';
  const invalidPasswordWithTooFewCharacters = '123ab';
  const emptyPassword = '';
  test('should not create user with invalid e-mail address', () => {
    const error = User.create({ email: invalidEmail, password: validPassword }) as Error;
    expect(error.name).toEqual('InvalidEmailError');
  });

  test('should not create user with invalid password (no numbers)', () => {
    const error = User.create({ email: validEmail, password: invalidPasswordWithNoNumbers }) as Error;
    expect(error.name).toEqual('InvalidPasswordError');
  });

  test('should not create user with invalid password (too few chars)', () => {
    const error = User.create({ email: validEmail, password: invalidPasswordWithTooFewCharacters }) as Error;
    expect(error.name).toEqual('InvalidPasswordError');
  });

  test('should not create user with invalid password (empty)', () => {
    const error = User.create({ email: validEmail, password: emptyPassword }) as Error;
    expect(error.name).toEqual('InvalidPasswordError');
  });

  test('should create user with valid data', () => {
    const user = User.create({ email: validEmail, password: validPassword }) as User;
    expect(user.props.email).toEqual(validEmail);
    expect(user.props.password).toEqual(validPassword);
  });
});
