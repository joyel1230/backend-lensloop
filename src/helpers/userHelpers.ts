import { ParsedQs } from "qs";
import { User } from "../models/user";
import { comparePassword, hashPassword } from "../services/password";
import { generateJwt } from "../services/jwt";
import { UserDocument } from "../interfaces/user.interface";
import { verificationEmail } from "../services/nodemailer";

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
    const dbdata = new User({ email, username, password, profilePic }).save();
    verificationEmail(email, username);
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
      if (user?.verified === true) {
        const token = generateJwt(user);
        return { status: 200, userToken: token };
      } else {
        return { status: 401, error: { msg: "email not verified" } };
      }
    } else {
      return { status: 401, error: { msg: "Wrong password" } };
    }
  } catch (error) {
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

export const updatePass = async (email: string, newPass: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return { msg: "no account with this email",stat:false };
    const password = await hashPassword(newPass);
    await User.updateOne({ email }, { $set: { password,verified:false } });
    verificationEmail(email, user?.username);
    return { stat: true };
  } catch (error) {
    console.log(error);
  }
};
