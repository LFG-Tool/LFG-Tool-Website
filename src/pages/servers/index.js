import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import "./servers.css";

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
                <div className="page">
                    <div className="pageHeader">
                        <h1 className="title">Loading servers</h1>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout>
                <div className="page">
                    <div className="pageHeader">
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
            : null;

        return (
            <a href={(guild.botPresent ? `/server/${guild.id}` : "/add")} className="guildCard">
                {icon ? (
                    <img src={icon} alt={guild.name} className="guildIcon" />
                ) : (
                    <div className="guildPlaceholder" />
                )}

                <div className="guildName">{guild.name}</div>
            </a>
        );
    };

    return (
        <Layout>
            <div className="page">

                <div className="pageHeader">
                    <h1 className="title">Servers</h1>
                    <p className="subtitle">Manage your Discord guilds</p>
                </div>

                <div className="card">
                    {managedGuilds.length > 0 && (
                        <div className="section">
                            <h2>Managed Servers</h2>
                            <div className="grid">
                                {managedGuilds.map((g) => (
                                    <ServerCard key={g.id} guild={g} />
                                ))}
                            </div>
                        </div>
                    )}

                    {inviteGuilds.length > 0 && (
                        <div className="section">
                            <h2>Unmanaged Servers</h2>
                            <div className="grid">
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