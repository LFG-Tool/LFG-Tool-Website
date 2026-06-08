import React, { useEffect } from "react";
const DiscordURL = "https://discord.com/oauth2/authorize?client_id=1495971346868469760&response_type=code&redirect_uri=https%3A%2F%2Flfgtool.xyz%2Fauth%2Fdiscord%2Fcallback&scope=identify+guilds"
const DevURL = "https://discord.com/oauth2/authorize?client_id=1495971346868469760&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback&scope=identify+guilds"
export default function DiscordAuth() {
  useEffect(() => {
    // Send user to your backend OAuth endpoint
    window.location.href = DevURL;
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Redirecting to Discord...</h1>
      <p>If you're not redirected, click below:</p>

      <a href={DiscordURL}>
        Login with Discord
      </a>
    </div>
  );
}