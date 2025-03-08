import { Filme } from "../types/Filme";
import styles from "../styles/ListaFilmes.module.css";

interface ListaFilmesProps {
  filmes: Filme[];
  onToggleAssistido: (id: number, checked: boolean) => void;
}

const ListaFilmes = ({ filmes, onToggleAssistido }: ListaFilmesProps) => {
  return (
    <div className={styles.listaFilmes}>
      <h2>Minha Lista de Filmes</h2>
      <div className={styles.filmesGrid}>
        {filmes.map((filme) => (
          <div
            key={filme.id}
            className={`${styles.filmeCard} ${
              filme.checked ? styles.assistido : ""
            }`}
          >
            <div className={styles.filmePoster}>
              <img src={filme.imagem} alt={`Pôster do filme ${filme.nome}`} />
            </div>
            <div className={styles.filmeInfo}>
              <div className={styles.filmeTitulo}>
                <h3>{filme.nome}</h3>
                <span className={styles.generoBadge}>{filme.genero}</span>
              </div>
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  checked={filme.checked}
                  onChange={(e) =>
                    onToggleAssistido(filme.id, e.target.checked)
                  }
                />
                <span className={styles.checkmark}></span>
                {filme.checked ? "Assistido" : "Marcar como assistido"}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaFilmes;
