import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';

// Get all users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Create a new user
export const createNewUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Get a single user by its _id and populated thoughts and friend data
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('thoughts')
      .populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Update a user by its _id
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.userId, 
        req.body, 
        { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    return res.json(updatedUser);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// Delete a user by its _id and remove a user's associated thoughts when deleted
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    // Remove user's associated thoughts
    await Thought.deleteMany({ username: deletedUser.username });
    return res.json({ message: 'User and associated thoughts deleted!' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Add a new friend to a user's friend list
export const addNewFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// Remove a friend from a user's friend list
export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};