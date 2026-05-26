import React, { useEffect } from 'react';

export default function RedirectPage() {
  useEffect(() => {
    window.location.replace('https://discord.com/oauth2/authorize?client_id=1495971346868469760');
  }, []);

  return null;
}