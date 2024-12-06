import { Seller } from "../models/seller.model.js";
import { passwordHandler } from "../utils/passowordHandler.js";
import { generateToken } from "../utils/tokenHandler.js";

// seller signup
const sellerSignup = async (req, res) => {
  try {
    // destructing data from request body
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    // checking seller exists or not
    const sellerExist = await Seller.findOne({ email });
    if (sellerExist) {
      return res
        .status(400)
        .json({ message: "Seller already exist" })
        .select("-password");
    }
    // hashing password
    const hashedPassword = await passwordHandler(password);

    // creating new seller object
    const newSeller = new Seller({ name, email, password: hashedPassword });

    // save new seller to database
    await newSeller.save();

    res.json({ message: "Seller created succfully", data: newSeller });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

// user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking fields
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // checking user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not exist" });
    }

    // checking password
    const matchedPassword = await passwordHandler(password, user.password);

    if (!matchedPassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // checking user profile
    if (!user.isActive) {
      return res.status(400).json({ error: "User profile deactivated" });
    }

    // generating token
    const token = generateToken(user, "user");

    // set token to cookie
    res.cookie("token", token);

    // exclude password
    const { password: _, ...userWithoutPassword } = user.toObject();

    res
      .status(200)
      .json({ message: "Login successfull", data: userWithoutPassword });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// user profile details
const userProfile = async (req, res) => {
  try {
    // fetching userId
    // const { userId } = req.user.id;
    const userProfileData = await User.findById(req.user.id).select(
      "-password"
    );

    res
      .status(200)
      .json({ message: "user profile details fetched", data: userProfileData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// user logout
const userLogout = async (req, res) => {
  // clearing token from cookies
  try {
    res.clearCookie("token");

    res.status(200).json({ message: "User logout success" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// update user profile details
const updateUserProfile = async (req, res) => {
  try {
    // fetching userId
    // const { userId } = req.user.id;

    // update user data
    const updatedUserData = await User.findByIdAndUpdate(
      req.user.id,
      req.body
    ).select("-password");

    res
      .status(200)
      .json({ message: "user profile details updated", data: updatedUserData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

// checking user
const checkUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Autherized user" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

const deactivateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { isActive: false });
    res.status(202).json({ message: "User deactivated" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal server error" });
  }
};

export {
  userSignup,
  userLogin,
  userProfile,
  userLogout,
  updateUserProfile,
  checkUser,
  deactivateUser,
};
