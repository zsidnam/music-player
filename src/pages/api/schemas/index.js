import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Character {
        species: String
        name: String
        friends: [Friend]
    }

    type Friend {
        name: String
        occupation: String
    }

    type Query {
        getCharacters: [Character]
    }

    type Mutation {
        addCharacter(species: String, name: String): Character
    }
`;
