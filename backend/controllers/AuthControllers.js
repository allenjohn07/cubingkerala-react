import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { KeralaCubers } from "../models/users.js";

//Register Controller
export const RegisterCuber = async (req, res) => {
  const { name, wcaid, password } = req.body;
  const regex = /^\d{4}[A-Za-z]{4}\d{2}$/;
  if (!regex.test(wcaid)) {
    return res.json({
      status: 401,
      message: "Invalid credentials",
    });
  }
  try {
    const existingUser = await KeralaCubers.findOne({ wcaid });
    if (existingUser) {
      return res.json({
        message: "user already exists",
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await KeralaCubers.create({
      name,
      wcaid,
      password: hashedPassword,
    });
    return res.json({
      message: "Registration successfull!",
      status: 200,
    });
  } catch (error) {
    return res.json({
      message: "Error registering user",
      error: error.message,
      status: 403,
    });
  }
};

//Login Controller
export const LoginCuber = async (req, res) => {
  const { wcaid, password } = req.body;
  const regex = /^\d{4}[A-Za-z]{4}\d{2}$/;
  if (!regex.test(wcaid)) {
    return res.json({
      status: 401,
      message: "Invalid credentials",
    });
  }

  const user = await KeralaCubers.findOne({ wcaid });
  if (!user) {
    return res.json({ message: "User does not exists!", status: 409 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({
      message: "Invalid password",
      status: 402,
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.jwt_secret);
  res.json({
    token,
    status: 200,
    userID: user._id,
    name: user.name,
    wcaid: user.wcaid,
    message: "Logged In",
  });
};
