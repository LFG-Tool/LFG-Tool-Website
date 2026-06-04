import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { Gamepad2, Volume2, ShieldCheck } from 'lucide-react';

const DEVELOPERS = [
  {
    name: 'Atomic();',
    role: 'Developer',
    description: 'Made the VC integration, made the interfaces and contributed towards LFG services.',
    avatarUrl: 'https://github.com/AtomicTyler1.png',
    profileUrl: 'https://atomictyler.dev/',
  },
  {
    name: 'Anthony Stainton',
    role: 'Developer',
    description: 'Created the LFG system, created our database integration, made the moderation framework and case system.',
    avatarUrl: 'https://github.com/ItzRock.png',
    profileUrl: 'https://github.com/ItzRock',
  },
  {
    name: 'CMax',
    role: 'VPS Hosting',
    description: 'Helped with hosting the bot, giving feedback where possible and making some code edits towards the database service.',
    avatarUrl: 'https://github.com/CadeMH.png',
    profileUrl: 'https://github.com/CadeMH',
  },
];

function FeatureSection({ title, icon: Icon, text, img, reverse, imageMaxWidth = 500 }) {
  return (
    <div className="row margin-bottom--xl" style={{ alignItems: 'center' }}>
      
      {!reverse && (
        <div className="col col--6">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {Icon && <Icon size={24} className="feature-icon" />}
            {title}
          </h3>
          <p style={{ opacity: 0.8 }}>{text}</p>
        </div>
      )}

      <div className="col col--6" style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={img}
          alt={title}
          style={{
            width: '100%',
            maxWidth: imageMaxWidth,
            borderRadius: 10,
          }}
        />
      </div>

      {reverse && (
        <div className="col col--6">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {Icon && <Icon size={24} className="feature-icon" />}
            {title}
          </h3>
          <p style={{ opacity: 0.8 }}>{text}</p>
        </div>
      )}

    </div>
  );
}

function LandingFeatures() {
  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">

        <div className="text--center margin-bottom--lg">
          <h2>Features</h2>
          <p style={{ opacity: 0.7 }}>
            Built for moderation, matchmaking, and reliable voice systems.
          </p>
        </div>

        <FeatureSection
          icon={Gamepad2}
          title="Managed LFG Postings"
          text="LFG Tool manages your LFG channels to reduce spam, scammers, and provide a cleaner experience."
          img="/img/example1.png"
        />

        <FeatureSection
          icon={Volume2}
          title="Temporary Voice Channels"
          text="Allows users to create voice channels that remain managed by the bot after outages."
          img="/img/example2.png"
          reverse
        />

        <FeatureSection
          icon={ShieldCheck}
          title="Moderation Focused"
          text="Provides moderation tools and logs for join records, voice renames, and voice chat history."
          img="/img/example3.png"
        />

        <hr style={{ margin: '4rem 0', opacity: 0.1 }} />

        <div className="margin-top--xl">
          <div className="text--center margin-bottom--xl">
            <h2>Meet the Developers</h2>
            <p style={{ opacity: 0.7 }}>
              The team building and maintaining LFG Tool.
            </p>
          </div>

          <div className="row">
            {DEVELOPERS.map((dev, index) => {
              const CardComponent = dev.profileUrl ? 'a' : 'div';
              
              return (
                <div key={index} className="col col--4 margin-bottom--lg">
                  <CardComponent
                    href={dev.profileUrl || undefined}
                    target={dev.profileUrl ? '_blank' : undefined}
                    rel={dev.profileUrl ? 'noopener noreferrer' : undefined}
                    className={clsx(
                      'text--center',
                      dev.profileUrl && styles.developerCardLink
                    )}
                    style={{ 
                      display: 'block',
                      padding: '2rem 1.5rem',
                      height: '100%',
                      textDecoration: 'none',
                      color: 'inherit',
                      borderRadius: '12px',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}
                  >
                    <img 
                      src={dev.avatarUrl}
                      alt={`${dev.name} avatar`}
                      style={{
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid var(--ifm-color-primary)',
                        padding: '4px',
                        background: 'transparent',
                        marginBottom: '1rem',
                      }}
                    />
                    <h3 style={{ marginBottom: '0.25rem' }}>{dev.name}</h3>
                    <small 
                      style={{ 
                        display: 'block', 
                        color: 'var(--ifm-color-primary)', 
                        fontWeight: 600,
                        marginBottom: '1rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                      }}
                    >
                      {dev.role}
                    </small>
                    <p style={{ opacity: 0.8, fontSize: '0.95rem', margin: 0 }}>
                      {dev.description}
                    </p>
                  </CardComponent>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default LandingFeatures;