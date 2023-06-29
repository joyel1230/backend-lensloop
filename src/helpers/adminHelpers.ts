import { User } from "../models/user";
import { generateJwt } from "../services/jwt";

export const loginAdminData = async (email: string) => {
  try {
    const token = generateJwt(email);
    return token;
  } catch (error) {
    console.log(error,'jwterror');
  }
};

export const fetchAllUsersData=async()=>{
  try {
    const user = await User.find();
    return user;
  } catch (error) {
    console.error(error.message);
  }
}

export const changeUserVerify=async(username:string,status:{changeKey:string,bool:boolean})=>{
  try {
    if (status.changeKey==='verified') {
      await User.updateOne({ username }, { $set: { verified: status.bool } });
    }else if(status.changeKey==='blocked'){
      await User.updateOne({ username }, { $set: { blocked: status.bool } });
    }
    return true;
  } catch (error) {
    console.error(error.message);
  }
}