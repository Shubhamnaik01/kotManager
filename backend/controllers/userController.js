import userModel from "../models/Users.js";

export const changeRole = async (req, res) => {
  try {
    const _id = req.params.id;
    const { newRole } = req.body;
    const userExist = await userModel.findById(_id);
    if (!userExist) {
      res.status(404).json({ message: "User Not found" });
    }
    const result = await userModel.findByIdAndUpdate(
      _id,
      {
        $set: { role: newRole.toLowerCase() },
      },
      { new: true, runValidators: true },
    );
    res.status(200).json({ message: "User Role Updated" });
  } catch (error) {
    if (error.name == "ValidationError") {
      const msg = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: msg[0] });
    }
    console.log("Error in server while updating role:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
