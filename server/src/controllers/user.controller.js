import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User, Individual, Business } from "../models/user.model.js";

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Secure only in production
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
};

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token!"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, phone, password, role, profileDetails } = req.body;
  console.log(email, phone, password, role, profileDetails);

  if (!email || !phone || !password || !role || !profileDetails) {
    throw new ApiError(400, "Please provide all the required fields");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
  if (existingUser) {
    throw new ApiError(400, "User with this email or phone already exists");
  }

  let newUser;
  if (role === "individual") {
    newUser = await Individual.create({
      email,
      phone,
      password,
      role,
      ...profileDetails,
    });
  } else if (role === "business") {
    newUser = await Business.create({
      email,
      phone,
      password,
      role,
      ...profileDetails,
    });
  } else {
    throw new ApiError(400, "Invalid role");
  }

  if (!newUser) {
    throw new ApiError(400, "Something went wrong while registering!");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    newUser._id
  );

  const user = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(400, "Something went wrong while registering");
  }

  return res
    .status(200)
    .cookie("gali_accessToken", accessToken, options)
    .cookie("gali_refreshToken", refreshToken, options)
    .json(new ApiResponse(200, user, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;
  console.log(email, phone, password);

  if((email && phone) || !password) {
    throw new ApiError(400, "Please provide email or phone and password!");
  }

  const user = await User.findOne({ $or: [{ email }, { phone }] });
  if (!user) {
    throw new ApiError(404, "User doesn't exists with this credential!");
  }

  console.log(user)
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(404, "Invalid password!");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("gali_accessToken", accessToken, options)
    .cookie("gali_refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User login working!"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  await User.findByIdAndUpdate(
      userId,
      {
          $unset: {
              refreshToken: 1,
          },
      },
      {
          new: true,
      },
  );

  res.status(200)
      .clearCookie("recipe_accessToken")
      .clearCookie("recipe_refreshToken")
      .json(new ApiResponse(200, {}, "User successfully logged out!"));
});


export { registerUser, loginUser, logoutUser };
