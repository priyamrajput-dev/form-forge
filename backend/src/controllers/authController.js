import * as userService from '../services/userService.js';
import generateToken  from '../utils/generateToken.js';

const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const user = await userService.createUser(fullName, email, password);
    generateToken(res, user._id);
    res.status(201).json({ _id: user._id, fullName: user.fullName, email: user.email });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password);
    generateToken(res, user._id);
    res.status(200).json({ _id: user._id, fullName: user.fullName, email: user.email });
  } catch (error) {
    res.status(401);
    next(error);
  }
};

const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'User logged out' });
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404);
    next(error);
  }
};

export { registerUser, loginUser, logoutUser, getUserProfile };
