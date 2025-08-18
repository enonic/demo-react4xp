import {LayoutComponent} from '@enonic-types/core';
import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';


export const layoutProcessor: ComponentProcessor<'com.enonic.app.react4xp:TwoColumns'> = ({component}) => {
    const {regions} = component as LayoutComponent;

    return {
        regions,
        tags: 'section'
    };
};
