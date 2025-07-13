// src/app/page.tsx
import styles from './page.module.css';

export default function Home() {
  return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            🎧 Listening Practice API
          </h1>

          <p className={styles.description}>
            API para practicar la comprensión auditiva en inglés.
          </p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h2>GET <code>/api/frases</code></h2>
              <p>Obtiene todas las frases. Acepta filtros como <code>?nivel=básico</code> o <code>?tag=experiencia</code>.</p>
            </div>

            <div className={styles.card}>
              <h2>GET <code>/api/frases/random</code></h2>
              <p>Obtiene una frase aleatoria del conjunto de datos.</p>
            </div>

            <div className={styles.card}>
              <h2>POST <code>/api/frases/verificar</code></h2>
              <p>Verifica la transcripción de un usuario contra la frase original.</p>
            </div>

            <div className={styles.card}>
              <h2>GET <code>/audio/[filename].mp3</code></h2>
              <p>Sirve el archivo de audio correspondiente a una frase.</p>
            </div>
          </div>
        </main>
      </div>
  );
}