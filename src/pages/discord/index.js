import React, { useEffect } from 'react';

export default function RedirectPage() {
  useEffect(() => {
    window.location.replace('https://discord.gg/ARyWWXDSBW');
  }, []);

  return null;
}