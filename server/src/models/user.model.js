import { Schema, model } from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["individual", "business"],
    },
  },
  { timestamps: true, discriminatorKey: "role" }
);

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 16);
  next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
      {
          _id: this._id,
          email: this.email
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}

userSchema.methods.generateRefreshToken = function() {
  return jwt.sign(
      {
          _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}

const User = model("User", userSchema);

const individualSchema = new Schema({
  profileImage: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pincode: { type: String },
  profession: { type: String },
  area_of_interest: { type: [String] },
});
const Individual = User.discriminator("individual", individualSchema);

const businessSchema = new Schema({
  organization_name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["food", "grocery", "house", "land"],
  },
  desc: { type: String },
  logo: { type: String },
  businessProof: { type: String },
  ownerName: { type: String, required: true },
  businessAddress: { type: String, required: true },
  deliveryAvailable: { type: Boolean, default: false },
  websiteUrl: { type: String },
  instaUrl: { type: String },
});
const Business = User.discriminator("business", businessSchema);

export { User, Individual, Business };