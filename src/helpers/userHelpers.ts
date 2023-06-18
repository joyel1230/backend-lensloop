import { ParsedQs } from "qs";
import { User } from "../models/user";
import { comparePassword, hashPassword } from "../utils/password";
import { generateJwt } from "../utils/jwt";
import { UserDocument } from "../interfaces/user.interface";

export const fetchUsersData = async (
  username: string | string[] | ParsedQs | ParsedQs[]
) => {
  try {
    const user = await User.findOne({ username: username });
    return user;
  } catch (error) {
    console.error(error.message);
  }
};

export const registerUsersData = async (credentials: any) => {
  try {
    let { email, username, password, profilePic } = credentials;
    if (profilePic === undefined) profilePic = "";
    password = await hashPassword(password);
    const user = new User({ email, username, password, profilePic });
    const dbdata = await user.save();
    const token = generateJwt(dbdata);
    return { status: 200, userToken: token };
  } catch (error) {
    if (error?.message?.includes("username")) {
      error.msg = "username is already taken";
    } else if (error?.message?.includes("email")) {
      error.msg = "this email is already registered";
    }
    return { status: 401, error };
  }
};

export const loginUsersData = async (credentials: {
  emailOrUsername: string;
  password: string;
}) => {
  try {
    let { emailOrUsername, password } = credentials;
    let user: UserDocument;
    if (emailOrUsername.includes("@")) {
      user = await User.findOne({ email: emailOrUsername });
      if (!user?.email) {
        throw new Error("Invalid Email");
      }
    } else {
      user = await User.findOne({ username: emailOrUsername });
      if (!user?.username) {
        throw new Error("Invalid Username");
      }
    }
    const validPassword = await comparePassword(password, user?.password);
    if (validPassword) {
      const token = generateJwt(user);
      return { status: 200, userToken: token };
    } else {
      return { status: 401, error: { msg: "Wrong password" } };
    }
  } catch (error) {
    console.log(error.message);

    if (error?.message.includes("Username")) {
      error.msg = "No account with this username";
    } else if (error?.message.includes("Email")) {
      error.msg = "No account with this email";
    } else {
      error.msg = "Wrong password";
    }
    return { status: 401, error };
  }
};
