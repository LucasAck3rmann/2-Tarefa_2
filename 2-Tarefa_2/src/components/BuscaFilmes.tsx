import { useState } from "react";
import styles from "../styles/BuscaFilmes.module.css";


interface BuscaFilmesProps {
  onSearch: (termo: string, tipo: "all" | "nome" | "genero") => void;
}

const BuscaFilmes = ({ onSearch }: BuscaFilmesProps) => {
  const [termo, setTermo] = useState("");
  const [tipoBusca, setTipoBusca] = useState<"all" | "nome" | "genero">("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(termo, tipoBusca);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buscaContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.searchBox}>
            <input
              type="text"
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="Pesquisar filmes..."
              className={styles.campoBusca}
              aria-label="Campo de busca de filmes"
            />
            <button type="submit" className={styles.botaoBusca}>
              Buscar
            </button>
          </div>

          <div className={styles.opcoesFiltro}>
            <label>
              <input
                type="radio"
                name="tipoBusca"
                value="all"
                checked={tipoBusca === "all"}
                onChange={() => setTipoBusca("all")}
              />
              Todos
            </label>
            <label>
              <input
                type="radio"
                name="tipoBusca"
                value="nome"
                checked={tipoBusca === "nome"}
                onChange={() => setTipoBusca("nome")}
              />
              Nome
            </label>
            <label>
              <input
                type="radio"
                name="tipoBusca"
                value="genero"
                checked={tipoBusca === "genero"}
                onChange={() => setTipoBusca("genero")}
              />
              Gênero
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuscaFilmes;
