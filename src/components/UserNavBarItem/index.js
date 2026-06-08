import React, {useEffect, useState} from 'react';
import './styles.css';

export default function UserNavbarItem() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;

    fetch('https://api.lfgtool.xyz/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Invalid token');
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      });
  }, []);

  const loginWithDiscord = () => {
    window.location.href = '/auth/discord';
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.reload();
  };

  if (!user) {
  return (
    <a
      className="navbar__item navbar__link"
      onClick={loginWithDiscord}
    >
      Login with Discord
    </a>
  );
}

  return (
    <div className="userNavbar">
      <button className="userButton" onClick={() => setOpen(!open)}>
        <img src={`https://cdn.discordapp.com/avatars/${user.userid}/${user.avatar}.png?size=256`} alt="avatar" className="userAvatar" />
        <span className="userName">{user.displayName}</span>
      </button>

      {open && (
        <div className="userDropdown">
          <a href="/servers" className="userDropdownItem">
            Manage Servers
          </a>

          <button onClick={logout} className="userDropdownItem">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}