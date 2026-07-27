import {PartComponent} from '@enonic-types/core';
import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import {processHtml} from '/lib/enonic/react4xp';

export const paragraphProcessor: ComponentProcessor<'com.enonic.app.hmdb:paragraph'> = (params) => {
    const component = params.component as PartComponent;
    const text = component.config?.text as string;

    return {
        text: text ? processHtml({
            value: text,
            imageWidths: [200, 400, 800],
            dataFetcher: params.dataFetcher,
            component: params.component
        }) : '',
    };

};
