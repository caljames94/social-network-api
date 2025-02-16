import { Thought, User } from '../models/index.js';
// Get all thoughts
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        return res.json(thoughts);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// Get a single thought by its _id
export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        return res.json(thought);
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// Create a new thought
export const createNewThought = async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        // Add the thought to the user's thoughts array
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } }, { new: true });
        return res.json(newThought);
    }
    catch (err) {
        return res.status(400).json(err);
    }
};
// Update a thought by its _id
export const updateThoughtById = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        return res.json(updatedThought);
    }
    catch (err) {
        return res.status(400).json(err);
    }
};
// Delete a thought by its _id
export const deleteThoughtById = async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        // Remove the thought from the user's thoughts array
        await User.findByIdAndUpdate(deletedThought.userId, { $pull: { thoughts: req.params.thoughtId } });
        return res.json({ message: 'Thought deleted!' });
    }
    catch (err) {
        return res.status(500).json(err);
    }
};
// Create a reaction for a thought
export const createAReaction = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        return res.json(updatedThought);
    }
    catch (err) {
        return res.status(400).json(err);
    }
};
// Delete a reaction by its reactionId
export const deleteAReactionById = async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { reactionId: reactionId } } }, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        if (!updatedThought.reactions) {
            return res.status(404).json({ message: 'No reactions found for this thought!' });
        }
        const deletedReaction = updatedThought.reactions.id(reactionId);
        if (!deletedReaction) {
            return res.status(404).json({ message: 'No reaction with this id!' });
        }
        return res.json({ message: 'Reaction successfully deleted', updatedThought });
    }
    catch (err) {
        console.error('Error in deleteAReactionById:', err);
        return res.status(500).json({ message: 'Server error', error: err });
    }
};
