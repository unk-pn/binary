import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          Oops! The page you&apos;re looking for doesn&apos;t exist. Maybe it
          got converted to binary and disappeared into the digital void.
        </p>

        <div className={styles.binaryAnimation}>
          <span>01001111 01101111 01110000 01110011</span>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.homeButton}>
            🏠 Go Home
          </Link>
          <Link href="/game" className={styles.gameButton}>
            🎮 Play Game
          </Link>
        </div>
      </div>
    </div>
  );
}
