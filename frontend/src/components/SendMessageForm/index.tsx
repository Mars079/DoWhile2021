import { useState, FormEvent } from "react";
import { api } from "../../services/api";
import { UserProfile } from "../UserProfile";
import styles from "./styles.module.scss";

export function SendMessageForm() {
  const [message, setMessage] = useState("");

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();

    if (!message.trim()) {
      return;
    }

    const { data } = await api.post("messages", { message });
    setMessage("");
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <UserProfile />
      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual sua expectativa para o evento?"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  );
}
