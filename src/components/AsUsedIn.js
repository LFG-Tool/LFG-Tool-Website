const Servers = [
  // not yet
  // {
  //   name: "PEAK",
  //   url: "https://discord.gg/peakgame",
  //   img: "https://cdn.discordapp.com/icons/1368870708335083650/9547ab960b4e3337ae6f608a63aab45e.webp?size=256&quality=lossless",
  //   members: "520,000",
  // },
  {
    name: "AGGRO CRAB",
    url: "https://discord.com/invite/aggrocrab",
    img: "https://cdn.discordapp.com/icons/672881520406691868/1fcff60bd3695108345fc9170ddcccbc.webp?size=256&quality=lossless",
    members: "14,000",
  },
];

export default function AsUsedIn({ gap = 16 }) {
  return (
    <section style={{ marginTop: 60, textAlign: "center" }}>
      <h2 style={{ marginBottom: 20 }}>Used by</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap,
        }}
      >
        {Servers.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            style={{
              width: 160,
              textDecoration: "none",
              color: "inherit",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
              background: "rgba(255,255,255,0.02)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
              e.currentTarget.style.boxShadow =
                "0 0 18px rgba(120, 180, 255, 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={s.img}
              alt={s.name}
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                objectFit: "cover",
              }}
            />

            <div style={{ fontWeight: 600 }}>{s.name}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {s.members} members
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}