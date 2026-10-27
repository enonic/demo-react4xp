import {processHtml} from '/lib/enonic/react4xp';
import {get as getContentByKey} from "/lib/xp/content";
import {imageUrl, pageUrl} from '/lib/xp/portal';
import {toArray} from "/react4xp/utils/arrayUtils";
import {PageDescriptor} from '@enonic-types/core';
import type {Content} from '@enonic-types/lib-content';
import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';

export const articleProcessor: ComponentProcessor<PageDescriptor> = (params) => {
    const {content} = params;
    const {data} = content;


    const spotlight = toArray<string>(data.spotlight as string | string[]).map(spotlightKey => {

        const spotlightContent = getContentByKey<Content>({key: spotlightKey});


        const photos: string [] = toArray<string>(spotlightContent.data.photos as string | string[])
        const firstPhotoId = photos[0] || '';


        return {
            name: spotlightContent.displayName,
            photoUrl: imageUrl({id: firstPhotoId, scale: 'block(200, 200)'}),
            id: spotlightContent._id,
            _path: spotlightContent._path,
            url: pageUrl({path: spotlightContent._path})
        };
    });


    const processedBlocks = toArray<any>(data.blocks).map(block => {

        if (block._selected === 'banner' && block.banner?.text) {
            // Banner block
            return {
                type: 'banner',
                banner: {
                    text: block.banner.text,
                    imageUrl: imageUrl({id: block.banner.image, scale: 'block(1000, 350)'})
                },
            };
        }

        if (block._selected === 'text' && block.text?.text) {
            // Text block
            return {
                type: 'text',
                text: processHtml({
                    value: block.text.text,
                    imageWidths: [200, 400, 800],
                    dataFetcher: params.dataFetcher,
                    component: params.component
                }),
            };
        }

        if (block._selected === 'quote' && block.quote?.text) {
            // Quote block
            return {
                type: 'quote',
                quote: {
                    text: block.quote.text,
                    byline: block.quote.byline || '',
                },
            };
        }
        const storyArray = toArray(block.story.panel)
        if (block._selected === 'story' && storyArray) {

            // Story block with multiple panels
            const panels = storyArray.map(panel => ({
                image: panel.image,
                imageUrl: imageUrl({id: panel.image, scale: 'block(340, 220)'}),
                storyline: panel.storyline || '',
            }));
            return {
                type: 'story',
                story: panels,
            };
        }

        return null;
    }).filter(Boolean);


    const cover = data.coverimage as string

    return {
        title: content.displayName,
        coverImage: cover ? imageUrl({id: cover, scale: 'block(1400, 800)'}) : null,
        preface: data.preface || null,
        author: data.author || null,
        tags: data.tags || [],
        blocks: processedBlocks,
        spotlight
    };
};
