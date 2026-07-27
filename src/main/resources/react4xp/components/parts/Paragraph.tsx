import React from 'react';
import {ComponentProps, RichText, PartData, RichTextData} from '@enonic/react-components';

export const Paragraph = (props: ComponentProps<PartData>) => {
    return (
        <RichText data={props.data.text as RichTextData} component={props.component} meta={props.meta}/>
    );
};
