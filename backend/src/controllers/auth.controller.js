import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters long" });
    }
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    }); //creating a new user

    if (newUser) {
      //generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" }); //should'nt let the malicious attacker know, which is incorrect either email or password
    }
    /*
  this function will password and compare it with the user.password first argument is what the user sends and the second is the password present in the db
  */
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id,res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const logout = (req, res) => {
  try {

    res.cookie("jwt", "", { maxAge: 0 }); //will expire immediately
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};


export const updateProfile=async (req,res)=>{
 try{
  const {profilePic}=req.body;
  //protected function alli, req body ge user info attact madidvi, so we can use it
  const userId=req.user._id

  if(!profilePic){
    return res.status(400).json({message:"Profile pic is required"});

  }
   const uploadResponse = await cloudinary.uploader.upload(profilePic) //cloudinary is not our db, it is a bucket for our images
   const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})//secure_url field that cloudinary gives back

   res.status(200).json(updatedUser)
 }catch(error){
         console.log("error in update profile:",error);
         return res.status(500).json({message:"Internal server error"});
 }
}



/*
We are going to call this function whenever we are going to refresh our application
*/
export const checkAuth=(req,res)=>{
try{
  res.status(200).json(req.user);
}catch(error){
  console.log("error in checkAuth controller",error.message);
  res.status(500).json({message:"Internal server error"});
}
}