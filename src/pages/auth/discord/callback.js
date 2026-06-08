import React, { useEffect, useState } from "react";

export default function DiscordCallback() {
  const [status, setStatus] = useState("Logging you in...");

  useEffect(() => {
    const login = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        setStatus("Login failed: missing code.");
        return;
      }

      try {
        // 1. Send code to your backend
        const res = await fetch("https://api.lfgtool.xyz/v1/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();

        if (!res.ok || !data.token) {
          setStatus("Login failed.");
          return;
        }
        
        // 2. Store JWT
        localStorage.setItem("token", data.token);

        setStatus("Login successful! Redirecting...");

        // 3. Redirect
        setTimeout(() => {
          window.location.href = "/";
        }, 800);
      } catch (err) {
        console.error(err);
        setStatus("Login error occurred.");
      }
    };

    login();
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Discord Login</h1>
      <p>{status}</p>
    </div>
  );
}