/*----------------------------------------- ARQUIVO DA TAREFA 3 -----------------------------------------*/

import { useEffect, useState } from "react";
import styles from "../styles/MensagemAssistido.module.css";

interface MensagemAssistidoProps {
  nomeFilme: string | null;
}

const MensagemAssistido = ({ nomeFilme }: MensagemAssistidoProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (nomeFilme) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [nomeFilme]);

  if (!visible || !nomeFilme) return null;

  return (
    <div className={styles.mensagemAssistido}>
      <p>
        O filme <strong>{nomeFilme}</strong> foi marcado como assistido!
      </p>
    </div>
  );
};

export default MensagemAssistido;
