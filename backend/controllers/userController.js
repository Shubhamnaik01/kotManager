import userModel from "../models/Users.js";

export const changeRole = async (req, res) => {
  try {
    const _id = req.params.id;
    const { newRole } = req.body;
    if (!newRole || typeof newRole !== "string") {
      return res.status(400).json({ message: "Invalid Role" });
    }
    const result = await userModel.findByIdAndUpdate(
      _id,
      {
        $set: { role: newRole.toLowerCase() },
      },
      { new: true, runValidators: true },
    );
    if (!result) {
      return res.status(404).json({ message: "User Not found" });
    }
    return res.status(200).json({ message: "User Role Updated" });
  } catch (error) {
    if (error.name == "ValidationError") {
      const msg = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: msg[0] });
    } else if (error.name == "CastError") {
      return res.status(400).json({ message: "Invalid ID" });
    }
    console.log("Error in server while updating role:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(_id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    if (error.name == "CastError") {
      return res.status(400).json({ message: "Invalid ID" });
    }
    console.log("Error in server while deleting user:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const result = await userModel.find().select("-password");
    if (result.length == 0) {
      return res
        .status(200)
        .json({ message: "No users found ", payload: result });
    }
    return res
      .status(200)
      .json({ message: "Fetched all users", payload: result });
  } catch (error) {
    console.log("Error in server while fetching users", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
