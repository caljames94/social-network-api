import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { getRandomName, getRandomThought } from './data.js';
import { Types } from 'mongoose';

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected to MongoDB');

    let applicationCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
    if (applicationCheck?.length) {
        await connection.dropCollection('thoughts');
    }

    let userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
    if (userCheck?.length) {
        await connection.dropCollection('users');
    }

    const users = [];
    const thoughts = [];

    for (let i = 0; i < 20; i++) {
        const username = getRandomName();
        const email = `${username.replace(' ', '.')}@example.com`;

        const user = {
            username,
            email,
            thoughts: [],
            friends: [],
        };

        const createdUser = await User.create(user);

        const userThoughts = getRandomThought(2); 
        for (const thought of userThoughts) {
            const newThought = await Thought.create({
                ...thought,
                username: createdUser.username,
                userId: createdUser._id,
            });

            createdUser.thoughts.push(newThought._id as Types.ObjectId);
        }

        await createdUser.save();

        users.push(createdUser);
        thoughts.push(...userThoughts);
    }

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete!');
    process.exit(0);
});