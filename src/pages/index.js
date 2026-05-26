import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { ExternalLink } from 'lucide-react';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const Available = false; // change this once available

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>

        <p className="hero__subtitle">{siteConfig.tagline}</p>

        {Available ? (
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/add">
              Add to your server<ExternalLink size={18} style={{ marginLeft: '6px' }} />
            </Link>
          </div>
        ) : (
          <>
            <p className={styles.releaseNotice}>
              LFG Tool is currently in limited development access. Join our Discord
              server to stay updated on future public availability.
            </p>

            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/discord">
                Join our Discord Server<ExternalLink size={18} style={{ marginLeft: '6px' }} />
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      description="A managed LFG bot for your Discord communities.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
