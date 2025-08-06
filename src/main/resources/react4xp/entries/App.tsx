import '@enonic/react-components/utils/initPublicPath';
import Footer from "/react4xp/components/common/Footer";
import '../components/globalStyles.css'
import type {MetaData} from '@enonic/react-components';
import {BaseComponent} from '@enonic/react-components';
import * as React from 'react';
import {componentRegistry} from '../componentRegistry';
import {AppProps} from '/types/AppProps';

const App: React.FC<AppProps> = ({component, data, common, meta}) => {
    const compMeta: MetaData = meta as MetaData;
    compMeta.componentRegistry = componentRegistry;
    return (
        <>
            <BaseComponent component={component} data={data} common={common} meta={compMeta}/>
            {
                (component.type == "page" || component.type == "contentType") && <Footer logoUrl={common.logoUrl as string}/>
            }
        </>
    );
}

App.displayName = 'App';

export default App;
