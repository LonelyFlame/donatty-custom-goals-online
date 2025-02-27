import styles from "./page.module.css";

export default async function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        Ну что-то тут написать надо приветственное
      </main>
    </div>
  );
}
