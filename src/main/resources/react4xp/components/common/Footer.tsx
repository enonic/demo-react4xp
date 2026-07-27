import React from 'react';
import styles from './Footer.module.css';


export interface FooterProps {
    logoUrl: string;
}

const Footer = ({logoUrl}: FooterProps) => (
    <footer className={styles.footer}>
        <div className={styles.footerContainer}>
            <p>
                <span className={styles.rotateRight}>©</span>
                {` ${new Date().getFullYear()}, Built with `}
                <a href="https://developer.enonic.com/learn/react4xp">React4XP</a>
            </p>
        </div>
        {logoUrl && (
            <div className={styles.logoContainer}>
                <img src={logoUrl}
                     width={32}
                     height={42}
                     alt="Enonic XP logo"/>
            </div>
        )}
    </footer>
);

export default Footer;