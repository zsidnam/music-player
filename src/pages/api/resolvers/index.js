const dummyData = [
    {
        species: 'mouse',
        name: 'jerry',
        friends: [
            {
                name: 'rick',
                occupation: 'inventor',
            },
        ],
    },
    {
        species: 'cat',
        name: 'tom',
        friends: [
            {
                name: 'spongeBob',
                occupation: 'chef',
            },
            {
                name: 'patrick',
                occupation: 'bum',
            },
        ],
    },
];

export const resolvers = {
    Query: {
        getCharacters: async () => {
            return dummyData;
        },
    },
    Mutation: {
        addCharacter: async (_, args) => {
            const newChar = {
                species: args.species,
                name: args.name,
            };

            dummyData.push(newChar);

            return newChar;
        },
    },
};
