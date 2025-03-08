import { useState, useEffect, JSX } from "react";
import { Filme } from "../types/Filme";
import styles from "../styles/TabelaFilmes.module.css";

interface TabelaFilmesProps {
  filmes: Filme[];
  termoBusca: string;
  tipoBusca: "all" | "nome" | "genero";
  onFilmeAssistido: (id: number, nome: string, checked: boolean) => void;
}

const TabelaFilmes = ({
  filmes,
  termoBusca,
  tipoBusca,
  onFilmeAssistido,
}: TabelaFilmesProps) => {
  const [filmesExibidos, setFilmesExibidos] = useState<Filme[]>([]);

  useEffect(() => {
    if (!termoBusca.trim()) {
      setFilmesExibidos(filmes);
      return;
    }

    const termoLowerCase = termoBusca.toLowerCase();
    let resultados: Filme[];

    if (tipoBusca === "nome") {
      resultados = filmes.filter((filme) =>
        filme.nome.toLowerCase().includes(termoLowerCase)
      );
    } else if (tipoBusca === "genero") {
      resultados = filmes.filter((filme) =>
        filme.genero.toLowerCase().includes(termoLowerCase)
      );
    } else {
      // all
      resultados = filmes.filter(
        (filme) =>
          filme.nome.toLowerCase().includes(termoLowerCase) ||
          filme.genero.toLowerCase().includes(termoLowerCase)
      );
    }

    setFilmesExibidos(resultados);
  }, [filmes, termoBusca, tipoBusca]);

  const destacarTexto = (texto: string): JSX.Element => {
    if (!termoBusca.trim()) return <>{texto}</>;

    const regex = new RegExp(`(${termoBusca})`, "gi");
    const partes = texto.split(regex);

    return (
      <>
        {partes.map((parte, i) =>
          regex.test(parte) ? (
            <span key={i} className={styles.highlight}>
              {parte}
            </span>
          ) : (
            parte
          )
        )}
      </>
    );
  };

  const handleCheckboxChange = (id: number, nome: string, checked: boolean) => {
    onFilmeAssistido(id, nome, checked);
  };

  return (
    <div className={styles.tabelaContainer}>
      <p className={styles.resultadosContagem}>
        {filmesExibidos.length} filme(s) encontrado(s)
      </p>
      <div className={styles.tableResponsive}>
        <table className={styles.tabelaFilmes}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Gênero</th>
              <th>Imagem</th>
              <th>Assistido</th>
            </tr>
          </thead>
          <tbody>
            {filmesExibidos.length > 0 ? (
              filmesExibidos.map((filme) => (
                <tr
                  key={filme.id}
                  className={filme.checked ? styles.filmeAssistido : ""}
                >
                  <td>{filme.id}</td>
                  <td>{destacarTexto(filme.nome)}</td>
                  <td>{destacarTexto(filme.genero)}</td>
                  <td>
                    <img
                      src={filme.imagem}
                      alt={`Pôster do filme ${filme.nome}`}
                      className={styles.posterImagem}
                    />
                  </td>
                  <td className={styles.colunaCheckbox}>
                    <label className={styles.checkboxContainer}>
                      <input
                        type="checkbox"
                        checked={filme.checked || false}
                        onChange={(e) =>
                          handleCheckboxChange(
                            filme.id,
                            filme.nome,
                            e.target.checked
                          )
                        }
                        aria-label={`Marcar como assistido o filme ${filme.nome}`}
                      />
                      <span className={styles.checkmark}></span>
                    </label>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Nenhum filme encontrado</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaFilmes;
