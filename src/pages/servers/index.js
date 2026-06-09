import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import styles from "./servers.module.css";

export default function ServersPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);


    const sortGuilds = (a, b) => {
        if (a.isAdmin !== b.isAdmin) {
            return a.isAdmin ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
    };

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
                json.managedGuilds = json.managedGuilds.sort(sortGuilds);
                json.inviteGuilds = json.inviteGuilds.sort(sortGuilds);
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

        const isDisabled = !guild.isAdmin; // or any condition you want

        return (
            <a
                href={isDisabled ? undefined : `/server?id=${guild.id}`}
                className={`${styles.guildCard} ${isDisabled ? styles.disabled : ""}`}
                onClick={(e) => {
                    if (isDisabled) e.preventDefault();
                }}
            >
                <img src={icon} alt={guild.name} className={styles.guildIcon} />

                <div className={styles.guildName}>{guild.name}</div>
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
                            <h2>Servers without LFG Tool.</h2>
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