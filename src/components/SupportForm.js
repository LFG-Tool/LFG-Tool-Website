import React, { useState } from "react";
import styles from "./SupportForm.module.css";

export default function SupportForm() {
  const [form, setForm] = useState({
    category: "Feedback",
    subject: "",
    message: "",
    email: "",
  });

  const [emailTouched, setEmailTouched] = useState(false);

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function updateField(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      setEmailTouched(true);
      return;
    }

    const payload = {
      category: form.category,
      subject: form.subject.slice(0, 80),
      message: form.message.slice(0, 1000),
      email: form.email,
    };

    try {
      const response = await fetch("https://api.lfgtool.xyz/v1/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) alert("Sent feedback!");
    else alert("Not accepted! You may be on cool down.");
    } catch (error) {
      alert("Failed to send.");
      console.log(error);
      
    }

    setForm({
      category: "Feedback",
      subject: "",
      message: "",
      email: "",
    });

    setEmailTouched(false);
  }

  const emailError = emailTouched && form.email && !isValidEmail(form.email);

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <label className={styles.label}>
        Category
        <select
          name="category"
          value={form.category}
          onChange={updateField}
          className={styles.select}
        >
          <option value="Feedback">Feedback</option>
          <option value="Support">Support</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <label className={styles.label}>
        Subject Line
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={updateField}
          className={styles.input}
          maxLength={150}
          placeholder="Short subject..."
          required
        />
      </label>

      <label className={styles.label}>
        Message (max 2000 chars)
        <textarea
          name="message"
          value={form.message}
          onChange={updateField}
          className={styles.textarea}
          maxLength={2000}
          placeholder="Describe your issue or feedback..."
          required
        />
      </label>

      <label className={styles.label}>
        Contact Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={updateField}
          onBlur={() => setEmailTouched(true)}
          className={styles.input}
          maxLength={254}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        {emailError && (
          <span style={{ color: "red", fontSize: "12px" }}>
            Please enter a valid email address.
          </span>
        )}
      </label>

      <button type="submit" className={styles.button}>
        Send
      </button>
    </form>
  );
}