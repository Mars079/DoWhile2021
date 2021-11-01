import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { VscSignOut } from "react-icons/vsc";
import {
  FaGithubSquare,
  FaLinkedin,
  FaYoutubeSquare,
  FaTwitterSquare,
} from "react-icons/fa";

import styles from "./styles.module.scss";

export function UserProfile() {
  const { user, signOut } = useContext(AuthContext);

  return (
    <header className={styles.userInformation}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>

      <div className={styles.userImage}>
        <img src={user?.avatar_url} alt={user?.name} />
      </div>
      <strong className={styles.userName}>{user?.name}</strong>

      <div className={styles.linkArea}>
        <a
          href={user?.socials[0].github}
          target="_blank"
          rel="noopener rereferrer"
          className={styles.profileLink}
        >
          <FaGithubSquare size="40" />
        </a>

        <a
          href={user?.socials[0].youtube || undefined}
          target="_blank"
          rel="noopener rereferrer"
          className={styles.profileLink}
        >
          <FaYoutubeSquare size="40" />
        </a>

        <a
          href={user?.socials[0].twitter || undefined}
          target="_blank"
          rel="noopener rereferrer"
          className={styles.profileLink}
        >
          <FaTwitterSquare size="40" />
        </a>

        <a
          href={user?.socials[0].lkdin || undefined}
          target="_blank"
          rel="noopener rereferrer"
          className={styles.profileLink}
        >
          <FaLinkedin size="40" />
        </a>
      </div>
    </header>
  );
}
