import {Regions, type ComponentProps, type PageData} from '@enonic/react-components';
import dayjs from 'dayjs';
import styles from './Page.module.css';

export const Page = ({data, common, meta, component}: ComponentProps<PageData>) => {

    return (
        <div className={styles[data.name as string]}>
            <Regions common={common} meta={meta} component={component}/>
            <div>Page: {dayjs().format()}</div>
        </div>
    );
};
