import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRound = 10;

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exisits" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const result = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User Registered", user_id: result._id });
  } catch (error) {
    console.log("Error while creating the user in server :", error.message);
    if (error.name == "ValidationError") {
      const msg = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: msg.join(" ") });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExits = await User.findOne({ email });
    if (!userExits) {
      return res.status(400).json({ message: "Invalid User" });
    }
    const passMatch = await bcrypt.compare(password, userExits.password);
    if (!passMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { id: userExits._id, role: userExits.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    return res.status(200).json({
      message: "User login successfull",
      token,
      user: { id: userExits._id, name: userExits.name, role: userExits.role },
    });
  } catch (error) {
    console.log("Error in Server while logging in", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
