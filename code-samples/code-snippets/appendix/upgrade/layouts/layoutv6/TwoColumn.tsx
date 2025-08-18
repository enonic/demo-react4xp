import {type ComponentProps, type LayoutData, Region} from '@enonic/react-components';
import dayjs from 'dayjs';
import styles from './TwoColumn.module.css';


export const TwoColumnLayout = ({component, meta, data}: ComponentProps<LayoutData>) => {

    return <>
        <div className={styles.row + ' ' + styles[data.tags as string]}>
            <Region data={component.regions.left.components} meta={meta} name="left"/>
            <Region data={component.regions.right.components} meta={meta} name="right"/>
        </div>
        <div>Layout:{dayjs().format()}</div>
    </>;
};
