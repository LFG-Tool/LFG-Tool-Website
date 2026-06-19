import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import LandingFeatures from '@site/src/components/HomepageFeatures';
import AsUsedIn from '@site/src/components/AsUsedIn.js';
import { ExternalLink } from 'lucide-react';
import Heading from '@theme/Heading';
import styles from './index.module.css';
// Just set this to true when we want other people to use it freely.
const Available = true;

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroRadialGradient} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <Heading as="h1" className={styles.Title}>
          {siteConfig.title}
        </Heading>

        <p className={styles.Subtitle}>{siteConfig.tagline}</p>

        {Available ? (
          <div className={styles.buttonWrapper}>
            <Link className="glow-button" to="/add">
              Add to your server
              <ExternalLink size={18} />
            </Link>

            <Link className="secondary-ghost-button" to="/discord">
              Join our Discord Server
              <ExternalLink size={18} />
            </Link>
          </div>
        ) : (
          <div className={styles.noticeContainer}>
            <p className={styles.releaseNotice}>
              <strong>LFG Tool</strong> is currently in closed beta testing. If you're interested in trying it out or want to stay updated, please join our Discord server!
            </p>

            <div className={styles.buttonWrapper}>
              <Link className="glow-button" to="/discord">
                Join our Discord Server
                <ExternalLink size={18} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


export default function Home() {

  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description={siteConfig.tagline}>
      <HomepageHeader />

      <main style={{ position: 'relative', zIndex: 2 }}>
        <AsUsedIn/>
        <LandingFeatures />
      </main>
    </Layout>
  );
}