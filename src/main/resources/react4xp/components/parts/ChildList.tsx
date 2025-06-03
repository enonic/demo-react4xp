import {Part} from "@enonic/react-components";
import React from "react";
import styles from "./ChildList.module.css";


export const ChildList = (props) => {

    const {names, paths, componentRegistry, ...partProps} = props;
    return (
        <Part {...partProps}>
            {names?.length > 0 && <ul>
                {names.map((name, index) => (
                    <li className={styles.listItem} key={index}>
                        <a className={styles.listLink} href={paths[index]}><p>{name}</p></a>
                    </li>
                ))}
            </ul>}
        </Part>
    );
};
