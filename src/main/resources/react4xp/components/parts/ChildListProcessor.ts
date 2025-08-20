import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import {getChildren} from '/lib/xp/content';
import {PartComponent} from '@enonic-types/core';

export const childListProcessor: ComponentProcessor<'com.enonic.app.hmdb:child-list'> = (params) => {
    const component = params.component as PartComponent;
    const sortOrder = component.config.sorting as string;

    const result = getChildren({
        key: params.content._id,
        start: 0,
        count: 99,
        sort: sortOrder
    });

    return {
        names: result.hits.map((content) => content.displayName),
        paths: result.hits.map((content) => params.request.path + '/' + content._name),
    };
};
