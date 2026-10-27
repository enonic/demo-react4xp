import type {ComponentProps, LayoutData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import React from 'react'
import styles from './TwoColumn.module.css';


export const TwoColumnLayout = ({component, common, meta}: ComponentProps<LayoutData>) => {

    return <div className={styles.row}>
        <Region data={component.regions.left.components} common={common} meta={meta} name="left"/>
        <Region data={component.regions.right.components} common={common} meta={meta} name="right"/>
    </div>;
};
