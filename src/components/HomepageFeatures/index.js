import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';


function FeatureSection({ title, text, img, reverse, imageMaxWidth = 500 }) {
  return (
    <div className="row margin-bottom--xl" style={{ alignItems: 'center' }}>
      
      {!reverse && (
        <div className="col col--6">
          <h3>{title}</h3>
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
          <h3>{title}</h3>
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

        {/* TITLE */}
        <div className="text--center margin-bottom--lg">
          <h2>Features</h2>
          <p style={{ opacity: 0.7 }}>
            Built for moderation, matchmaking, and reliable voice systems.
          </p>
        </div>

        <FeatureSection
          title="🎮 Managed LFG Postings"
          text="LFG Tool manages your LFG channels to reduce spam, scammers, and provide a cleaner experience."
          img="/img/example1.png"
        />

        <FeatureSection
          title="🔊 Temporary Voice Channels"
          text="Allows users to create voice channels that remain managed by the bot after outages."
          img="/img/example2.png"
          reverse
        />

        <FeatureSection
          title="🛡️ Moderation Focused"
          text="Provides moderation tools and logs for join records, voice renames, and voice chat history."
          img="/img/example3.png"
        />

        <div className="margin-top--xl text--center">
          <h2>Is LFG Tool right for your server?</h2>

          <p style={{ opacity: 0.7 }}>
            You may be interested if you are experiencing one of these issues:
          </p>

          <ul style={{ maxWidth: 700, margin: '0 auto', textAlign: 'left', lineHeight: 1.8 }}>
            <li>Your existing temporary voice channel bot is forgetting its channels after outages.</li>
            <li>You run a gaming community where LFGs use <code>steam://joinlobby/...</code> links.</li>
            <li>You receive reports on in-game behaviour but cannot reliably find the user's Discord account.</li>
          </ul>
        </div>

      </div>
    </section>
  );
}

export default LandingFeatures;
