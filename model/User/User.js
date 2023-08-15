const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    usernmae: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    accountLevel: {
      type: String,
      enum: ["bronze", "silver", "gold"],
      default: "bronze",
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    notificationPreferences: {
      email: {
        type: String,
        default: true,
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "prefer not to say", "non-binary"],
    },
    profileViewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    follower: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    likedPost: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    accountVerificationToken: {
      type: String,
    },
    accountVerificationExpires: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// complete schema to model

const User = mongoose.model("User", userSchema);

module.exports = User;
