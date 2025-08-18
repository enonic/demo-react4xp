import Hello from '/lib/myReactComponents/Hello';
import dayjs from 'dayjs';
import React, {useState} from 'react';
import type {ComponentProps, PartData} from '@enonic/react-components';

export const Example = (props: ComponentProps<PartData>) => {

    const [count, setCount] = useState(0);

    return <>
            <Hello/>
            <div>Part: {dayjs().format()}</div>
            <button onClick={() => setCount(prev => prev + 1)}>{count}</button>
    </>;
};


export default Example;
