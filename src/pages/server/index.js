import React, { useEffect, useMemo, useState } from "react";
import Layout from "@theme/Layout";
import { useLocation } from "@docusaurus/router";
import styles from "./server.module.css";

const API = "https://api.lfgtool.xyz/v1";

export default function ServerPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const guildId = params.get("id");

  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState(null);
  const [originalConfig, setOriginalConfig] = useState(null);

  const [guildData, setGuildData] = useState(null);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    if (!guildId) {
      window.location.href = "/servers";
      return;
    }

    Promise.all([
      fetch(`${API}/server?guild=${guildId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((r) => r.json()),

      fetch(`${API}/server/config?guild=${guildId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((r) => r.json()),
    ])
      .then(([guild, cfg]) => {
        setGuildData(guild);
        setConfig(cfg);
        setOriginalConfig(JSON.parse(JSON.stringify(cfg)));
        setLoading(false);
      })
      .catch(() => {
        window.location.href = "/servers";
      });
  }, [guildId]);

  const unsavedChanges = useMemo(() => {
    return JSON.stringify(config) !== JSON.stringify(originalConfig);
  }, [config, originalConfig]);

  const updateField = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateBranch = (index, field, value) => {
    const branches = [...config.Branches];
    branches[index][field] = value;

    setConfig((prev) => ({
      ...prev,
      Branches: branches,
    }));
  };

  const createBranch = () => {
    setConfig((prev) => ({
      ...prev,
      Branches: [
        ...prev.Branches,
        {
          BranchId: crypto.randomUUID(),
          BranchName: "New Branch",
          Description: "",
          AppId: 0,
          MaxLobbyAge: 0,
          LobbyType: 0,
          Locked: false,
          BranchChannelId: "",
        },
      ],
    }));
  };

  const removeBranch = (index) => {
    const branches = [...config.Branches];
    branches.splice(index, 1);

    setConfig((prev) => ({
      ...prev,
      Branches: branches,
    }));
  };

  const saveConfig = async () => {
    setSaving(true);

    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/server/config?guild=${guildId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    });

    if (res.ok) {
      setOriginalConfig(JSON.parse(JSON.stringify(config)));
    }

    setSaving(false);
  };

  const discardChanges = () => {
    setConfig(JSON.parse(JSON.stringify(originalConfig)));
  };

  if (loading || !config || !guildData) {
    return (
      <Layout>
        <div className={styles.page}>
          <div className={styles.card}>
            <h1>Loading Server...</h1>
          </div>
        </div>
      </Layout>
    );
  }

  const channels = guildData.channels || [];
  const roles = guildData.roles || [];

  const textChannels = channels.filter((c) => c.type === 0);
  const voiceChannels = channels.filter((c) => c.type === 2);
  const categories = channels.filter((c) => c.type === 4);

  const premiumPermanent =
    config.PremiumExpiry > 3153600000000;

  return (
    <Layout>
      <div className={styles.page}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{guildData.name}</h1>

          <p className={styles.subtitle}>
            Configure your LFG Tool server settings
          </p>

          <div className={styles.card}>
            {config.PremiumExpiry > 0 && (
              <div className={styles.section}>
                <h2>Premium</h2>

                <div className={styles.setting}>
                  <label>Status</label>

                  <div className={styles.value}>
                    {premiumPermanent
                      ? "Permanent Premium"
                      : new Date(
                          config.PremiumExpiry
                        ).toLocaleString()}
                  </div>
                </div>
              </div>
            )}

            <div className={styles.section}>
              <h2>General</h2>

              <div className={styles.setting}>
                <label>Moderator Role</label>

                <select
                  value={config.ModeratorRoleId || ""}
                  onChange={(e) =>
                    updateField("ModeratorRoleId", e.target.value)
                  }
                >
                  <option value="">Select Role</option>

                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.setting}>
                <label>Logging Channel</label>

                <select
                  value={config.LoggingChannelId || ""}
                  onChange={(e) =>
                    updateField("LoggingChannelId", e.target.value)
                  }
                >
                  <option value="">Select Channel</option>

                  {textChannels.map((c) => (
                    <option key={c.id} value={c.id}>
                      #{c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.setting}>
                <label>VC Category</label>

                <select
                  value={config.VcCategoryId || ""}
                  onChange={(e) =>
                    updateField("VcCategoryId", e.target.value)
                  }
                >
                  <option value="">Select Category</option>

                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.setting}>
                <label>Creator VC</label>

                <select
                  value={config.CreatorChannelId || ""}
                  onChange={(e) =>
                    updateField("CreatorChannelId", e.target.value)
                  }
                >
                  <option value="">Select Voice Channel</option>

                  {voiceChannels.map((c) => (
                    <option key={c.id} value={c.id}>
                      🔊 {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.setting}>
                <label>Steam App ID</label>

                <input
                  type="number"
                  value={config.AppId || 0}
                  onChange={(e) =>
                    updateField(
                      "AppId",
                      Number(e.target.value)
                    )
                  }
                />
              </div>

              <div className={styles.setting}>
                <label>Enforce Same App</label>

                <select
                  value={config.EnforceSameApp ? "true" : "false"}
                  onChange={(e) =>
                    updateField(
                      "EnforceSameApp",
                      e.target.value === "true"
                    )
                  }
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </div>

              <div className={styles.setting}>
                <label>Max Lobby Age</label>

                <input
                  type="number"
                  value={config.MaxLobbyAge || 0}
                  onChange={(e) =>
                    updateField(
                      "MaxLobbyAge",
                      Number(e.target.value)
                    )
                  }
                />
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Banned Steam IDs</h2>

                <button
                  className={styles.addButton}
                  onClick={() => {
                    updateField("BannedSteamIds", [
                      ...(config.BannedSteamIds || []),
                      "",
                    ]);
                  }}
                >
                  Add Steam ID
                </button>
              </div>

              {(config.BannedSteamIds || []).map((id, index) => (
                <div key={index} className={styles.arrayRow}>
                  <input
                    value={id}
                    onChange={(e) => {
                      const arr = [...config.BannedSteamIds];
                      arr[index] = e.target.value;

                      updateField("BannedSteamIds", arr);
                    }}
                  />

                  <button
                    className={styles.removeButton}
                    onClick={() => {
                      const arr = [...config.BannedSteamIds];
                      arr.splice(index, 1);

                      updateField("BannedSteamIds", arr);
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Branches</h2>

                <button
                  className={styles.addButton}
                  onClick={createBranch}
                >
                  Create Branch
                </button>
              </div>

              {config.Branches.map((branch, index) => (
                <div key={branch.BranchId} className={styles.branchCard}>
                  <div className={styles.setting}>
                    <label>Branch Name</label>

                    <input
                      value={branch.BranchName}
                      onChange={(e) =>
                        updateBranch(
                          index,
                          "BranchName",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.setting}>
                    <label>Description</label>

                    <textarea
                      value={branch.Description}
                      onChange={(e) =>
                        updateBranch(
                          index,
                          "Description",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className={styles.setting}>
                    <label>App ID</label>

                    <input
                      type="number"
                      value={branch.AppId}
                      onChange={(e) =>
                        updateBranch(
                          index,
                          "AppId",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>

                  <div className={styles.setting}>
                    <label>Max Lobby Age (Seconds)</label>

                    <input
                      type="number"
                      value={branch.MaxLobbyAge}
                      onChange={(e) =>
                        updateBranch(
                          index,
                          "MaxLobbyAge",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>

                  <div className={styles.setting}>
                    <label>Lobby Type</label>

                    <select
                      value={branch.LobbyType}
                      onChange={(e) =>
                        updateBranch(
                          index,
                          "LobbyType",
                          Number(e.target.value)
                        )
                      }
                    >
                      <option value={0}>
                        Steam Lobby Link
                      </option>

                      <option value={1}>
                        Lobby Code
                      </option>

                      <option value={3}>
                        Discord Thread
                      </option>
                    </select>
                  </div>

                  <div className={styles.setting}>
                    <label>Locked</label>

                    <select
                      value={branch.Locked ? "true" : "false"}
                      onChange={(e) =>
                        updateBranch(
                          index,
                          "Locked",
                          e.target.value === "true"
                        )
                      }
                    >
                      <option value="true">Enabled</option>
                      <option value="false">Disabled</option>
                    </select>
                  </div>

                  <div className={styles.setting}>
                    <label>Branch Channel</label>

                    <select
                      value={branch.BranchChannelId || ""}
                      onChange={(e) =>
                        updateBranch(
                          index,
                          "BranchChannelId",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select Channel</option>

                      {textChannels.map((c) => (
                        <option key={c.id} value={c.id}>
                          #{c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className={styles.removeButton}
                    onClick={() => removeBranch(index)}
                  >
                    Delete Branch
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {unsavedChanges && (
          <div className={styles.saveBar}>
            <div>
              You have unsaved changes
            </div>

            <div className={styles.saveActions}>
              <button
                className={styles.discardButton}
                onClick={discardChanges}
              >
                Discard
              </button>

              <button
                className={styles.saveButton}
                onClick={saveConfig}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}