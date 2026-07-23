import {assetUrl} from '/lib/enonic/asset';
import {get as getContentByKey} from '/lib/xp/content';
import {imageUrl, pageUrl} from '/lib/xp/portal';
import {toArray} from "/react4xp/utils/arrayUtils";
import {PageDescriptor} from '@enonic-types/core';
import type {Content} from '@enonic-types/lib-content';
import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';


// Function to fetch additional photos and return their image URLs
function fetchAdditionalPhotos(photoIds: string[]) {
    return photoIds.map(photoId => {
        const photoContent = getContentByKey<Content>({key: photoId});
        return photoContent
               ? {
                _id: photoContent._id,
                title: photoContent.displayName,
                imageUrl: imageUrl({id: photoContent._id, scale: 'block(238, 150)'}) // Smaller images for additional photos
            }
               : null;
    }).filter(Boolean); // Filter out null entries in case a photo is missing
}

// Function to fetch detailed information for each movie
function fetchMovies(movieIds: string[]) {
    return movieIds.map(movieId => {
        const movieContent = getContentByKey<Content>({key: movieId});
        if (!movieContent) {
            return {
                _id: movieId,
                title: '(Unknown Movie)',
                movieUrl: '#',
                photo: null, // No photo available for missing movies
                restPhotos: [],
                subtitle: 'Subtitle unavailable.',
                description: 'Description unavailable.'
            };
        }

        // Extract photos from movie content
        const photos: string[] = toArray(movieContent.data.photos as string | string[])
        const firstPhotoId = photos[0] || ''; // First photo ID
        const remainingPhotoIds = photos.slice(1) || []; // Remaining photo IDs

        // Fetch the first photo
        const firstPhotoContent = getContentByKey<Content>({key: firstPhotoId});
        const firstPhoto = firstPhotoContent
                           ? {
                _id: firstPhotoContent._id,
                title: firstPhotoContent.displayName,
                imageUrl: imageUrl({id: firstPhotoContent._id, scale: 'block(500, 740)'}) // Larger image for the first photo
            }
                           : null;

        // Fetch remaining photos
        const restPhotos = fetchAdditionalPhotos(remainingPhotoIds);
        const abstract = movieContent.data.abstract
        return {
            _id: movieContent._id,
            title: movieContent.displayName,
            movieUrl: pageUrl({path: movieContent._path}),
            photo: firstPhoto, // Primary photo
            restPhotos, // Additional photos
            subtitle: movieContent.data.subtitle,
            description: movieContent.data.abstract
        };
    });
}

export const playlistProcessor: ComponentProcessor<PageDescriptor> = params => {
    const footerUrl = assetUrl({path: 'react4xp.svg'});
    const content = params.content;
    const playlistData = content.data;

// Ensure playlistData.list is always an array
    const movieList: string[] = toArray<string>(playlistData?.list as string | string[]);

    if (movieList.length === 0) {
        throw new Error(`Invalid or empty playlist data for content ID: ${content._id}`);
    }

// Fetch movies with additional photo data
    const movies = fetchMovies(movieList);

    return {
        playlist: {
            _id: content._id,
            displayName: content.displayName,
            description: playlistData.description || 'No description available.',
            movies: movies,
            footerUrl
        }
    };
};

