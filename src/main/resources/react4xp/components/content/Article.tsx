import {RichText, type ComponentProps} from "@enonic/react-components";
import React from 'react';
import styles from './Article.module.css';


export const Article = (props: ComponentProps) => {
    const {component, common, meta} = props;
    const {title, blocks, coverImage, preface, author, tags, spotlight} = props.data as any; // Include new props
    return (
        <div className={`wrapper ${styles.article}`}>
            {/* Article Header */}
            <header className={styles.header}>
                <h1>{title}</h1>


                {/* Cover Image */}
                {coverImage && (
                    <div className={styles.coverImageContainer}>
                        <img
                            src={coverImage}
                            alt={title}
                            className={styles.coverImage}
                            height={800}
                            width={1400}
                            loading="eager"
                        />
                    </div>
                )}


                <div>
                    {/* Tags */}
                    {tags && tags.length > 0 && (
                        <div className={styles.tags}>
                            {tags.map((tag, index) => (
                                <span key={index} className={styles.tag}>
                                {tag}
                            </span>
                            ))}
                        </div>
                    )}
                    {/* Preface */}
                    {preface && (
                        <p className={styles.preface}>
                            {preface}
                        </p>
                    )}

                    {/* Author */}
                    {author && (
                        <p className={styles.author}>
                            <strong>By:</strong> {author}
                        </p>
                    )}
                </div>

            </header>

            {/* Dynamic Content Blocks */}
            <main className={styles.blocks}>
                {blocks.map((block, index) => {
                    // Render Text Block
                    if (block.type === 'text') {
                        return (
                            <section key={index} className={styles.textBlock}>
                                {/* Use processed HTML */}
                                <RichText data={block.text} component={component} meta={meta} common={common}/>
                            </section>
                        );
                    }

                    // Render Banner Block
                    if (block.type === 'banner') {
                        return (
                            <section key={index} className={styles.banner}>
                                <div>
                                    <img
                                        className={styles.bannerImage}
                                        src={block.banner.imageUrl}
                                        title={block.banner.text}
                                        alt={block.banner.text}
                                        loading="lazy"
                                        width={1000}
                                        height={350}
                                    />
                                    <p className={styles.bannerText}>{block.banner.text}</p>
                                </div>
                            </section>
                        );
                    }

                    // Render Quote Block
                    if (block.type === 'quote') {
                        return (
                            <section key={index} className={styles.quoteBlock}>
                                <blockquote className={styles.quote}>
                                    <p>"{block.quote.text}"</p>
                                    {block.quote.byline && (
                                        <cite className={styles.byline}>
                                            - {block.quote.byline}
                                        </cite>
                                    )}
                                </blockquote>
                            </section>
                        );
                    }

                    // Render Story Block
                    if (block.type === 'story') {
                        return (
                            <>
                                <section key={index} className={styles.storyBlock}>
                                    <div className={styles.storyBlockContainer}>
                                        <div className={styles.storyScroll}>
                                            {block.story.map((panel, panelIndex) => (
                                                <div key={panelIndex} className={styles.storyPanel}>
                                                    <img
                                                        src={panel.imageUrl}
                                                        alt={panel.storyline}
                                                        loading="lazy"
                                                        height={220}
                                                        width={340}
                                                    />
                                                    <div>
                                                        <p className={styles.storyline}>{panel.storyline}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </>
                        );
                    }

                    return null;
                })}

                {/* spotlight */}
                {spotlight.length > 0 && (
                    <>
                        <h2>Spotlight</h2>
                        <section className={styles.spotlight}>
                            <div className={styles.spotlightGrid}>
                                <ul className={styles.spotlightScroll}>
                                    {spotlight.map((spotlight, index) => (
                                        <li key={index}>
                                            <a className={styles.sneakyLink}
                                               href={spotlight.url} data-content-path={spotlight._path}><img
                                                src={spotlight.photoUrl}
                                                alt={spotlight.name}
                                                loading="lazy"
                                                height={200}
                                                width={200}/></a>
                                            <a className={styles.sneakyLink}
                                               href={spotlight.url} data-content-path={spotlight._path}><p>{spotlight.name}</p></a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </>
                )}

            </main>
        </div>
    );
};

