import { useState, useEffect } from "react";
import BuscaFilmes from "./components/BuscaFilmes";
import TabelaFilmes from "./components/TabelaFilmes";
import MensagemAssistido from "./components/MensagemAssistido";
import { Filme } from "./types/Filme";
import styles from "./styles/App.module.css";

function App() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [termoBusca, setTermoBusca] = useState("");
  const [tipoBusca, setTipoBusca] = useState<"all" | "nome" | "genero">("all");
  const [filmeAssistido, setFilmeAssistido] = useState<string | null>(null);

  useEffect(() => {
    const carregarFilmes = async () => {
      try {
        const response = await fetch("/Filmes.json");
        if (!response.ok) {
          throw new Error("Falha ao carregar os dados de filmes");
        }
        const dados = await response.json();
        /*todos filmes com checked=false*/
        const filmesComChecked = dados.map((filme: Filme) => ({
          ...filme,
          checked: false,
        }));
        setFilmes(filmesComChecked);
      } catch (error) {
        setErro(
          "Erro ao carregar os filmes. Por favor, tente novamente mais tarde."
        );
        console.error("Erro:", error);
      } finally {
        setIsLoading(false);
      }
    };

    carregarFilmes();
  }, []);

  const handleSearch = (termo: string, tipo: "all" | "nome" | "genero") => {
    setTermoBusca(termo);
    setTipoBusca(tipo);
  };

  const handleFilmeAssistido = (id: number, nome: string, checked: boolean) => {
    if (checked) {
      setFilmeAssistido(nome);
      setTimeout(() => setFilmeAssistido(null), 3000);
    }

    setFilmes(
      filmes.map((filme) => (filme.id === id ? { ...filme, checked } : filme))
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.appContainer}>
        <h1>Catálogo de Filmes</h1>

        <MensagemAssistido nomeFilme={filmeAssistido} />

        <BuscaFilmes onSearch={handleSearch} />

        {isLoading && (
          <p className={styles.mensagemCarregando}>Carregando filmes...</p>
        )}

        {erro && <p className={styles.mensagemErro}>{erro}</p>}

        {!isLoading && !erro && (
          <TabelaFilmes
            filmes={filmes}
            termoBusca={termoBusca}
            tipoBusca={tipoBusca}
            onFilmeAssistido={handleFilmeAssistido}
          />
        )}
      </div>
    </div>
  );
}

export default App;
