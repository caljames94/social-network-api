import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { getRandomName, getRandomThought } from './data.js';
connection.on('error', (err) => console.error('MongoDB connection error:', err));
connection.once('open', async () => {
    console.log('Connected to MongoDB');
    try {
        // Clear existing collections
        await User.deleteMany({});
        await Thought.deleteMany({});
        const users = [];
        const thoughts = [];
        const usedUsernames = new Set();
        // Create users
        for (let i = 0; i < 20; i++) {
            let username;
            do {
                username = getRandomName();
            } while (usedUsernames.has(username));
            usedUsernames.add(username);
            const email = `${username.replace(' ', '.').toLowerCase()}@example.com`;
            const user = await User.create({ username, email, thoughts: [] });
            users.push(user);
            // Create thoughts for each user
            const userThoughts = getRandomThought(2);
            for (const thoughtData of userThoughts) {
                const thought = await Thought.create({
                    thoughtText: thoughtData.description,
                    username: user.username,
                    userId: user._id,
                });
                thoughts.push(thought);
                // Update user's thoughts array
                await User.findByIdAndUpdate(user._id, { $push: { thoughts: thought._id } }, { new: true });
            }
        }
        // Assign random friends to users
        for (const user of users) {
            const friendCount = Math.floor(Math.random() * 5) + 1; // Random number between 1 and 5
            const potentialFriends = users.filter(u => u._id.toString() !== user._id.toString());
            for (let i = 0; i < friendCount && potentialFriends.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * potentialFriends.length);
                const friend = potentialFriends.splice(randomIndex, 1)[0];
                await User.findByIdAndUpdate(user._id, { $addToSet: { friends: friend._id } }, { new: true });
                await User.findByIdAndUpdate(friend._id, { $addToSet: { friends: user._id } }, { new: true });
            }
        }
        console.log('Users created:', users.length);
        console.log('Thoughts created:', thoughts.length);
        console.log('Sample user:', users[0]);
        console.log('Sample thought:', thoughts[0]);
        console.log('Seeding complete!');
    }
    catch (error) {
        console.error('Error during seeding:', error);
    }
    finally {
        await connection.close();
        process.exit(0);
    }
});
