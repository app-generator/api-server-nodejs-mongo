import jwt from "jsonwebtoken";
import User from "../models/user";
import Role from "../models/role";
import ActiveSession from "../models/activeSession";
import { DEFAULT_ROLE } from "../constants";

export const createUserWithToken = async (userData: any) => {
  const { login: username, email } = userData;
  let requiredUser: any = null;
  let createdToken = "";

  const user = await User.findOne({ username });
  const role = await Role.findOne({ name: DEFAULT_ROLE.name });

  if (user) {
    requiredUser = user;
  } else {
    const query = {
      username,
      email,
      user_role: role.role_no ?? DEFAULT_ROLE.role_no,
    };
    const newUser = new User(query);
    const returnedData: any = await newUser.save();
    requiredUser = returnedData._doc;
  }

  if (!process.env.SECRET) {
    throw new Error("SECRET not provided");
  }

  if (requiredUser) {
    const token: any = jwt.sign(
      {
        id: requiredUser._id,
        username: requiredUser.username,
      },
      process.env.SECRET,
      {
        expiresIn: 86400, // 1 week
      }
    );
    const query = { userId: requiredUser._id, token };
    const newSession = new ActiveSession(query);
    await newSession.save();
    createdToken = token;
  }
  return { ...requiredUser._doc, token: createdToken };
};
