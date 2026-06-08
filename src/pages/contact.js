import React from "react";
import Layout from "@theme/Layout";
import styles from "./contact.module.css";
import SupportForm from "../components/SupportForm.js";
export default function Contact() {
  return (
    <Layout>
      <main className={styles.page}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Contact & Support</h1>

          <p className={styles.discord}>
            Currently, the best way to contact us is through our Discord:
            <br />
            <a
              href="https://discord.lfgtool.xyz"
              target="_blank"
              rel="noreferrer"
            >
              https://discord.lfgtool.xyz
            </a>
            <br/>
            or use the form below.
          </p>
        </div>
      </main>
      <SupportForm/>
    </Layout>
  );
}