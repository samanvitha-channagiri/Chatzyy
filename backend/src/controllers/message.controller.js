import User from "../models/user.model.js";
import Message from "../models/message.model.js";
/*Every single user but not ourselves*/
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; //because it comes through the protectRoute
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); //find all the users except for the current user, and we don't want to send the password back to the client, even thought the password is hashed
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/*Basically what we are trying to do is, send all the messages, if the reciever is me and the sender is someone or if the reciever is someone else and the sender is me..so that is all the messages bw both of us*/
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; //renaming id to userToChatId so that its understandable
    const myId = req.user._id;

    /*This query returns an array of messages exchanged between these two users.*/
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        {
          senderId: userToChatId,
          receiverId: myId,
        },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

/*When you want to send a message, it can either be a text or an image */
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    /*If an image is present, this code uploads the image to Cloudinary (a cloud-based image hosting service). */
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);

      /*Cloudinary returns an object (uploadResponse) containing various details about the upload. secure_url is the HTTPS URL of the uploaded image. */
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    }); /*Image url can either be undefined or actual value*/

    await newMessage.save();
    //todo:real time functionality goes here=>socket.io

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
