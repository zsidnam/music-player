import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
    type Copyright {
        text: String!
        type: String!
    }

    type Image {
        height: Int!
        width: Int!
        url: String!
    }

    type Artist {
        id: ID!
        name: String!
        uri: String!
        images: [Image]!
    }

    type ArtistPage {
        items: [Artist]!
        limit: Int!
        next: String
        offset: Int!
        previous: String
        total: Int!
    }

    type Track {
        id: ID!
        uri: String!
        name: String!
        artists: [Artist]!
        duration_ms: Int!
        explicit: Boolean
        track_number: Int
        album: SimplifiedAlbum!
    }

    type TrackPage {
        items: [Track]!
        limit: Int!
        next: String
        offset: Int!
        previous: String
        total: Int!
    }

    type Album {
        id: ID!
        uri: String!
        name: String!
        artists: [Artist]!
        images: [Image]!
        release_date: String
        release_date_precision: String
        label: String
        popularity: Int
        total_tracks: Int
        tracks: TrackPage!
        copyrights: [Copyright]
    }

    type SimplifiedArtist {
        id: ID!
        name: String!
        uri: String!
    }

    type SimplifiedAlbum {
        id: ID!
        uri: String!
        name: String!
        artists: [SimplifiedArtist]!
        images: [Image]!
        release_date: String
        release_date_precision: String
        album_group: String
        album_type: String
    }

    type SimplifiedAlbumPage {
        items: [SimplifiedAlbum]!
        limit: Int!
        next: String
        offset: Int!
        previous: String
        total: Int!
    }

    type SearchResults {
        albums: SimplifiedAlbumPage!
        artists: ArtistPage!
        tracks: TrackPage!
    }

    type TopTracksSummary {
        tracks: [Track]!
    }

    type RelatedArtistsSummary {
        artists: [Artist]!
    }

    type ArtistAlbums {
        items: [SimplifiedAlbum]!
    }

    type Query {
        album(id: ID!): Album!
        artist(id: ID!): Artist!
        search(searchText: String!, limit: Int, offset: Int): SearchResults!
        topTracks(artistId: ID!): TopTracksSummary!
        relatedArtists(artistId: ID!): RelatedArtistsSummary!
        artistAlbums(artistId: ID!, limit: Int, offset: Int, groups: String): SimplifiedAlbumPage!
        albumTracks(albumId: ID!, limit: Int, offset: Int): TrackPage!
        userTopTracks(limit: Int, offset: Int): TrackPage!
        userTopArtists(limit: Int, offset: Int): ArtistPage!
    }
`;
