import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import styles from "./servers.module.css";

export default function ServersPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/";
            return;
        }

        fetch("https://api.lfgtool.xyz/v1/guilds", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed");
                return res.json();
            })
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                window.location = "/";
            });
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className={styles.page}>
                    <div className={styles.pageHeader}>
                        <h1 className="title">Loading servers</h1>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout>
                <div className={styles.page}>
                    <div className={styles.pageHeader}>
                        <h1 className="title">Failed to load</h1>
                        <p className="subtitle">we were unable to find your servers. Please ensure you are logged in.</p>
                    </div>
                </div>
            </Layout>
        );
    }

    const { managedGuilds = [], inviteGuilds = [] } = data;

    const ServerCard = ({ guild }) => {
        const icon = guild.icon
            ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=128`
            : `https://cdn.discordapp.com/embed/avatars/0.png?size=128`;

        return (
            <a href={(guild.botPresent ? `/server?id=${guild.id}` : "/add")} className={styles.guildCard}>
                {icon ? (
                    <img src={icon} alt={guild.name} className={styles.guildIcon} />
                ) : (
                    <div className={styles.guildPlaceholder} />
                )}

                <div className="guildName">{guild.name}</div>
            </a>
        );
    };

    return (
        <Layout>
            <div className={styles.page}>
                <div className={styles.pageHeader}>
                    <h1 className={styles.title}>Servers</h1>
                    <p className={styles.subtitle}>Manage your Discord servers</p>
                </div>

                <div className={styles.card}>
                    {managedGuilds.length > 0 && (
                        <div className={styles.section}>
                            <h2>Manage Servers</h2>
                            <div className={styles.grid}>
                                {managedGuilds.map((g) => (
                                    <ServerCard key={g.id} guild={g} />
                                ))}
                            </div>
                        </div>
                    )}

                    {inviteGuilds.length > 0 && (
                        <div className={styles.section}>
                            <h2>Add LFG Tool to!</h2>
                            <div className={styles.grid}>
                                {inviteGuilds.map((g) => (
                                    <ServerCard key={g.id} guild={g} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}