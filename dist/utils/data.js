const usernames = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Frank',
    'Grace',
    'Henry',
    'Isabella',
    'Jack',
    'Jill',
    'Kim',
    'Lisa',
    'Mary',
    'Nancy',
    'Olivia',
    'Peter',
    'Quinn',
    'Rachel',
    'Sophia',
    'Thomas',
    'Ursula',
    'Victoria',
    'William',
    'Xavier',
    'Yolanda',
    'Zoe',
];
const possibleThoughts = [
    'I love coding',
    'I am learning React',
    'I am excited about the future of technology',
    'I have a goal to travel the world',
    'I have a dream to become a world-renowned artist',
    'I am working on a project to improve my communication skills',
    'I am passionate about environmental conservation',
    'I have a plan to attend a conference next month',
    'I am a bit anxious about the future of healthcare',
    'I am excited about the opportunity to travel and work abroad',
    'I am trying to learn more about music theory',
    'I am trying to improve my writing skills',
    'I am interested in learning more about photography',
    'I am looking forward to exploring new cultures and traditions',
    'I am excited about the opportunity to work remotely',
];
const possibleReactions = [
    'Love this',
    'I agree',
    'Disagree',
    'Nice',
    'This is sad',
    'I am confused',
    'I am happy for you',
    'I am upset by this',
    'How exciting',
];
// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
// Gets a random full name
const getRandomName = () => `${getRandomArrItem(usernames)} ${getRandomArrItem(usernames)}`;
// Function to generate random applications that we can add to the database. Includes application tags.
const getRandomThought = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtText: getRandomArrItem(possibleThoughts),
            published: Math.random() < 0.5,
            description: getRandomArrItem(possibleThoughts),
            buildSuccess: Math.random() < 0.5,
            tags: [...getRandomReaction(3)],
        });
    }
    return results;
};
// Create the tags that will be added to each application
const getRandomReaction = (int) => {
    if (int === 1) {
        return getRandomArrItem(possibleReactions);
    }
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            tagBody: getRandomArrItem(possibleReactions),
            username: getRandomName(),
        });
    }
    return results;
};
// Export the functions for use in seed.js
export { getRandomName, getRandomThought };
