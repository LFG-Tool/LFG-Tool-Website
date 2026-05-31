import React, { useMemo, useState, useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';
import styles from './join.module.css';

function CheckSteamLobby(url) {
  if (!url) return false;
  const steamLobbyRegex = /^steam:\/\/joinlobby\/(\d+)\/(\d+)\/(\d+)\/?$/;
  return steamLobbyRegex.test(url.trim());
}

export default function JoinPage() {
  const [input, setInput] = useState('');
  const location = useLocation();

  const params = useMemo(() => {
    const search = location.search || '';
    return new URLSearchParams(search);
  }, [location.search]);

  const steamUrl = useMemo(() => {
    const raw = params.get('url');
    return raw ? decodeURIComponent(raw) : '';
  }, [params]);

  useEffect(() => {
    if (steamUrl && !input) {
      setInput(steamUrl);
      handleJoin();
    }
  }, [steamUrl]);

  const joinlink = input || steamUrl;
  const isValid = useMemo(() => CheckSteamLobby(joinlink), [joinlink]);

  const handleJoin = () => {
    if (!isValid) return;
    window.location.href = joinlink;
  };
  
  return (
    <Layout title="Join Lobby">
      <div className={styles.joinContainer}>
        <h1 className={styles.title}>Join Steam Lobby</h1>
        <p className={styles.subtitle}>Paste a Steam lobby link below to safely jump in.</p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="steam://joinlobby/..."
          className={styles.inputField}
        />

        {joinlink.length > 0 && (
          <div className={clsx(styles.statusMessage, isValid ? styles.valid : styles.invalid)}>
            {isValid ? 'Valid Steam lobby link' : 'Invalid Steam lobby link'}
          </div>
        )}

        <button
          onClick={handleJoin}
          disabled={!isValid}
          className="glow-button"
          style={{ marginTop: '24px', width: '100%' }}
        >
          Open in Steam
        </button>

        <div className={styles.tipBox}>
          <strong>Tip:</strong> Steam lobby links can be entered directly into your browser's
          address bar to launch the game automatically.
        </div>
      </div>
    </Layout>
  );
}