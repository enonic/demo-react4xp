import type {ComponentProps} from '@enonic/react-components';
import React from 'react';
import {REQUEST_MODE} from '../../constants'
import styles from './Movie.module.css';

interface Photo {
    imageUrl: string;
    title: string;
}

interface MovieData
    extends Record<string, unknown> {
    restPhotos?: Photo[];
    trailer?: string;
    name?: string;
    photo?: Photo;
    website?: string;
    release?: string;
    cast: {
        actorName: string;
        character: string;
        photoUrl: string;
        castUrl: string;
    }[];
    director?: {
        name: string;
        photo: string;
        url: string;
    };
    subtitle?: string;
    abstract?: string;
}

export const Movie = (props: ComponentProps) => {
    const {
        restPhotos,
        trailer,
        name,
        photo,
        website,
        release,
        cast,
        director,
        subtitle,
        abstract,
    } = props.data as MovieData;

    if (!abstract?.length) {
        if (props.meta.mode !== REQUEST_MODE.EDIT) { return <h1>Movie details</h1>}
        return;
    }


    return <div className={styles.moviePage}>
        <header>
            <h1><a href={trailer} className={styles.sneakyTitle}>{name}</a></h1>
        </header>

        <main className={styles.main}>
            <div className={styles.flexy}>
                {photo && <section className={styles.firstPhoto}>
                    <a href={trailer}>
                        <img
                            src={photo.imageUrl}
                            alt={photo.title}
                            title={photo.title}
                            className={styles.featuredImage}
                            loading="eager"
                            height={1000}
                            width={700}
                        />
                    </a>
                </section>}

                <div className={styles.blocky}>
                    <div>
                        <div>
                            {website && <>
                                <h2>
                                    Official Website
                                </h2>
                                <p className={styles.website}>
                                    <a href={website} className={styles.sneakyLink} target="_blank"
                                       rel="noopener noreferrer">
                                        {website}
                                    </a>
                                </p>
                            </>}
                            {release && <>
                                <h2>Release Date:</h2>
                                <p className={styles.date}>{release}</p>
                            </>}
                        </div>

                        {cast.length > 0 && <section className={styles.cast}>
                            <h2>Cast</h2>
                            <ul>
                                {cast.map((member, index) => (
                                    <li key={index}>
                                        <a href={member.castUrl} className={styles.sneakyCastLink}>
                                            <img
                                                src={member.photoUrl}
                                                alt={member.actorName}
                                                height={150}
                                                width={150}
                                            />
                                            <p><strong>{member.actorName}</strong> as {member.character}
                                            </p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>}
                    </div>
                    <div>
                        {director && <section className={styles.director}>
                            <h2>Director</h2>
                            <a href={director.url} className={styles.sneakyLink}>
                                <h3>{director.name}</h3>
                                <img
                                    className={styles.directorImg}
                                    src={director.photo}
                                    alt={"Director"}
                                    height={200}
                                    width={300}
                                />
                            </a>
                        </section>}
                    </div>
                </div>
            </div>

            <h2>{subtitle}</h2>

            <section className={styles.abstract}>
                <p>{abstract}</p>
            </section>

            {restPhotos && restPhotos.length > 0 && <section className={styles.photos}>
                <div className={styles.photoGrid}>
                    <div className={styles.photoScroll}>
                        {restPhotos.map((photo, index) => (
                            <img
                                key={index}
                                src={photo.imageUrl}
                                alt={photo.title}
                                title={photo.title}
                                className={styles.photoImg}
                                loading="lazy"
                                height={220}
                                width={340}
                            />
                        ))}
                    </div>
                </div>
            </section>}
        </main>
    </div>
};
