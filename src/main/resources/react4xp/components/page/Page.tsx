import {Region, ComponentProps, PageData} from '@enonic/react-components';
import React from 'react'

export const Page = ({component, common, meta}: ComponentProps<PageData>) => {

    return (
        <Region data={component.regions.main.components} common={common} meta={meta} name="main"/>
    );
};
