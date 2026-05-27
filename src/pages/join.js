import React, { useMemo, useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useLocation } from '@docusaurus/router';

function CheckSteamLobby(url) {
  if (!url) return false;

  try {
    const parsed = new URL(url);

    if (parsed.protocol !== 'steam:') return false;
    if (!parsed.pathname.startsWith('//joinlobby/')) return false;

    const parts = parsed.pathname.split('/').filter(Boolean);

    if (parts.length !== 4) return false;

    const [_, appId, lobbyId, steamId] = parts;

    if (!/^\d+$/.test(appId)) return false;
    if (!/^\d+$/.test(lobbyId)) return false;
    if (!/^\d+$/.test(steamId)) return false;
    return true;
  } catch (e) {
    return false;
  }
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
      <div
        style={{
          maxWidth: '650px',
          margin: '80px auto',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h1>Join Steam Lobby</h1>

        <p style={{ opacity: 0.7 }}>
          Paste a Steam lobby link below to join.
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="steam://joinlobby/..."
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '14px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            marginTop: '20px',
          }}
        />

        {joinlink.length > 0 && (
          <div
            style={{
              marginTop: '10px',
              fontSize: '13px',
              color: isValid ? 'green' : 'red',
            }}
          >
            {isValid ? 'Valid Steam lobby link' : 'Invalid Steam lobby link'}
          </div>
        )}

        <button
          onClick={handleJoin}
          disabled={!isValid}
          style={{
            marginTop: '20px',
            padding: '12px 20px',
            fontSize: '16px',
            cursor: isValid ? 'pointer' : 'not-allowed',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: isValid ? '#2d6cdf' : '#999',
            color: 'white',
            opacity: isValid ? 1 : 0.6,
          }}
        >
          Open in Steam
        </button>

        <div
          style={{
            marginTop: '40px',
            padding: '14px',
            borderRadius: '8px',
            backgroundColor: '#f5f7fb',
            border: '1px solid #e3e8f0',
            fontSize: '13px',
            color: '#444',
            lineHeight: '1.4',
          }}
        >
          <strong>Tip:</strong> Steam lobby links can be entered directly into your browser's
          address bar to launch the game automatically.
        </div>
      </div>
    </Layout>
  );
}