import styles from "../styles/Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        &copy; 2025 - Desenvolvido por{" "}
        <a
          href="https://www.linkedin.com/in/lucas-ackermann05"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lucas Ackermann
        </a>
      </p>
    </footer>
  );
}
