const PEAK = {
    name: "PEAK",
    url: "https://discord.gg/peakgame",
    img: "/img/icons/peak.webp",
    members: "520,000",
  }
const AGGRO_CRAB = {
    name: "AGGRO CRAB",
    url: "https://discord.gg/aggrocrab",
    img: "/img/icons/aggro.webp",
    members: "14,000",
  }
const REPO_MODDING = {
    name: "R.E.P.O Modding",
    url: "https://discord.gg/vPJtKhYAFe",
    img: "/img/icons/repomod.webp",
    members: "16,000",
  }

const Servers = [AGGRO_CRAB, REPO_MODDING];

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