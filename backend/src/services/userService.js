import User  from '../models/User.js';
import bcrypt  from 'bcryptjs';

const createUser = async (fullName, email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  return user;
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  throw new Error('Invalid email or password');
};

const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

export { createUser, authenticateUser, getUserById };
