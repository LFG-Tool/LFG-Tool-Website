import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function UserNavbarItem() {
  // 🚀 instantly load cached user
  const [user, setUser] = useState(() => {
    if(localStorage == null) return;
    const cached = localStorage.getItem('user');

    if (!cached) return null;

    try {
      return JSON.parse(cached);
    } catch {
      return null;
    }
  });

  const [open, setOpen] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    if(localStorage == null) return;
    const token = localStorage.getItem('token');

    // no token
    if (!token) {
      setCheckedAuth(true);
      return;
    }

    // silently verify token
    fetch('https://api.lfgtool.xyz/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Invalid token');
        return res.json();
      })
      .then((data) => {
        setUser(data.user);

        // 🚀 refresh cached user
        localStorage.setItem(
          'user',
          JSON.stringify(data.user)
        );

        setCheckedAuth(true);
      })
      .catch(() => {
        // 🚨 invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        setUser(null);
        setCheckedAuth(true);
      });
  }, []);

  const loginWithDiscord = () => {
    window.location.href = '/auth/discord';
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setUser(null);

    window.location.reload();
  };

  // 🚀 only show login AFTER auth check
  if (!user && !checkedAuth) {
    return (
      <div className={styles.userNavbar}>
        <div className={styles.userButton}>
          <div className={styles.skeletonAvatar} />
          <div className={styles.skeletonText} />
        </div>
      </div>
    );
  }

  // logged out
  if (!user) {
    return (
        <></>
    //   <a className="navbar__item navbar__link" onClick={loginWithDiscord}>
    //     Login with Discord
    //   </a>
    );
  }

  return (
    <div className={styles.userNavbar}>
      <button
        className={styles.userButton}
        onClick={() => setOpen(!open)}
      >
        <img
          src={`https://cdn.discordapp.com/avatars/${user.userid}/${user.avatar}.png?size=256`}
          alt="avatar"
          className={styles.userAvatar}
        />

        <span className={styles.userName}>
          {user.displayName}
        </span>
      </button>

      {open && (
        <div className={styles.userDropdown}>
          <a
            href="/servers"
            className={styles.userDropdownItem}
          >
            Manage Servers
          </a>

          <button
            onClick={logout}
            className={styles.userDropdownItem}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}