import "./Formulario.css";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { useRef, useState } from "react";
import { useAdicionarParticipante } from "../state/hook/useAdicionarParticipante";
import { useMensagemDeErro } from "../state/hook/useMensagemDeErro";

export default function Formulario() {
  const [nome, setNome] = useState("");

  //O hook useRef é para referenciar o input que queremos ter o foco
  const inputRef = useRef<HTMLInputElement>(null);

  const adicionarNaLista = useAdicionarParticipante();

  const mensagemDeErro = useMensagemDeErro();

  const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    adicionarNaLista(nome);
    setNome("");
    inputRef.current?.focus();
  };

  return (
    <div>
      <form className="form" onSubmit={adicionarParticipante}>
        <div className="grupo-input-btn">
          {/*<PersonAddIcon className="personIcon" />*/}
          <input
            ref={inputRef}
            value={nome}
            type="text"
            placeholder="Insira os nomes dos participantes"
            onChange={(event) => setNome(event.target.value)}
          />

          <button disabled={!nome}>Adicionar</button>
        </div>
        {mensagemDeErro && <p role={"alert"}>{mensagemDeErro}</p>}
      </form>
    </div>
  );
}
