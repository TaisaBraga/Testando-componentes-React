import { useRecoilValue, useSetRecoilState } from "recoil"
import { erroState, listaParticipantesState } from "../atom"

export const useAdicionarParticipante = () => {
    const setLista = useSetRecoilState(listaParticipantesState)

    const lista = useRecoilValue(listaParticipantesState)
    const setErro = useSetRecoilState(erroState)

    return(nomeParticipante: string) => {
        if(lista.includes(nomeParticipante)){
            setErro('Nomes duplicados nao sao permitidos!')
            setTimeout(() => {
                setErro("")
            }, 5000)
            return
        }
        return setLista(listaAtual => [...listaAtual, nomeParticipante])
    }
}