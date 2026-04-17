import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import restaurantModel from "../models/Restaurant.js";

const saltRound = 10;

export const registerRestaurant = async (req, res) => {
  try {
    const { businessEmail, password, restaurantName } = req.body;
    if (!password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const restaurantExists = await restaurantModel.findOne({ businessEmail });
    if (restaurantExists) {
      return res.status(409).json({ message: "Restaurant already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const result = await restaurantModel.create({
      businessEmail,
      password: hashedPassword,
      restaurantName,
    });

    const token = jwt.sign(
      {
        res_id: result._id,
        restaurantName: result.restaurantName,
        role: result.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    return res.status(201).json({
      message: "Restaurant registered successfully",
      token,
      user: { name: result.restaurantName, role: result.role, _id: result.id },
    });
  } catch (error) {
    console.log("Error in server", error.message);
    if (error.name == "ValidationError") {
      const msg = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: msg[0] });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginRestaurant = async (req, res) => {
  try {
    const { email, password } = req.body;
    let currentUser;
    if (!password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const restaurantExists = await restaurantModel.findOne({
      businessEmail: email,
    });
    const userExists = await User.findOne({ email });
    if (!restaurantExists && !userExists) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (userExists) {
      currentUser = userExists;
    } else if (restaurantExists) {
      currentUser = restaurantExists;
    }

    const passMatch = await bcrypt.compare(password, currentUser.password);

    if (!passMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const userinfo = {
      _id: currentUser._id,
      role: currentUser.role,
      res_id: restaurantExists ? currentUser._id : currentUser.res_id,
      restaurantName: restaurantExists
        ? currentUser.restaurantName
        : currentUser.name,
    };
    const token = jwt.sign(userinfo, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      message: `${restaurantExists ? "Restaurant" : "User"} login successfull`,
      token,
      user: {
        name: restaurantExists ? currentUser.restaurantName : currentUser.name,
        role: currentUser.role,
        _id: currentUser._id,
      },
    });
  } catch (error) {
    console.log("Error in server", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const registerStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const res_id = req.user.res_id;
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exisits" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const result = await User.create({
      name,
      email,
      password: hashedPassword,
      res_id,
      role,
    });

    res.status(201).json({
      message: "User Registered",
      user: {
        _id: result._id,
        name: result.name,
        role: result.role,
        res_id: result.res_id,
      },
    });
  } catch (error) {
    console.log("Error while creating the user in server :", error.message);
    if (error.name == "ValidationError") {
      const msg = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: msg.join(" ") });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Seprate User/Staff Login>>>>>
// export const userLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const userExits = await User.findOne({ email });
//     if (!userExits) {
//       return res.status(400).json({ message: "Invalid User" });
//     }
//     const passMatch = await bcrypt.compare(password, userExits.password);
//     if (!passMatch) {
//       return res.status(401).json({ message: "Invalid Credentials" });
//     }
//     const token = jwt.sign(
//       { id: userExits._id, role: userExits.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" },
//     );
//     return res.status(200).json({
//       message: "User login successfull",
//       token,
//       user: { _id: userExits._id, name: userExits.name, role: userExits.role },
//     });
//   } catch (error) {
//     console.log("Error in Server while logging in", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
