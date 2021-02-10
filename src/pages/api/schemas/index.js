import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Artist {
        id: ID
        name: String
    }

    type Copyright {
        text: String
        type: String
    }

    type Image {
        height: Int
        width: Int
        url: String
    }

    type Track {
        id: ID
        name: String
        artists: [Artist]
        duration_ms: Int
        explicit: Boolean
        track_number: Int
    }

    type TrackPage {
        items: [Track]
        limit: Int
        offset: Int
        total: Int
        previous: String
        next: String
    }

    type Album {
        id: ID
        name: String
        artists: [Artist]
        images: [Image]
        label: String
        popularity: Int
        release_date: String
        release_date_precision: String
        total_tracks: Int
        tracks: TrackPage
        copyrights: [Copyright]
    }

    type Query {
        album(id: ID!): Album!
    }
`;
