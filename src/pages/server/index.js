import React from "react";
import Layout from "@theme/Layout";
import { useLocation } from "@docusaurus/router";
import "./styles.css"

export default function ServerPage() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const guildId = params.get("id");

  return (
    <Layout>
      <div class="page">
        <div class="card">
        <h1>Server Dashboard</h1>

        <p>Guild ID: {guildId}</p>
      </div>
      </div>
    </Layout>
  );
}