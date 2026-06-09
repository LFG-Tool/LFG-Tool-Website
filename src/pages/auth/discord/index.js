import React, { useEffect } from "react";
import styles from "./style.module.css";
import Layout from "@theme/Layout";

export default function DiscordAuth() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const OAuth2URL =
    `https://discord.com/oauth2/authorize` +
    `?client_id=1495971346868469760` +
    `&response_type=code` +
    (isDevelopment ? "&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fcallback" : "&redirect_uri=https%3A%2F%2Flfgtool.xyz%2Fauth%2Fdiscord%2Fcallback" )+
    `&scope=identify%20guilds` +
    `&state=${(isDevelopment ? "DEV" : "PROD")}`;


  useEffect(() => { window.location.href = OAuth2URL; }, []);
  return (
    <Layout>
      <div className={styles.page}>
        <h1 className={styles.title}>Redirecting to Discord...</h1>
        <p className={styles.subtitle}>If you're not redirected, click below:</p>

        <a href={OAuth2URL}>
          Login with Discord
        </a>
      </div>
    </Layout>
  );
}