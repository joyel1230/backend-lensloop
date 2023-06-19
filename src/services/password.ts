import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  const validPassword = bcrypt.compare(password, hashPassword);
  return validPassword;
};
