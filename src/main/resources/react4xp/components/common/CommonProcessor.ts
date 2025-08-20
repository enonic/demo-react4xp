import {assetUrl} from '/lib/enonic/asset';
import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';

export const commonProcessor: ComponentProcessor<'com.enonic.app.hmdb:main'> = (_props) => {

    const logoUrl = assetUrl({path: 'react4xp.svg'});

    return {
        logoUrl
    };
};
