import { realizarSorteio } from "./realizarSorteio"

describe('dado o sorteio de um amigo Secreto', () => {
    test('cada participante nao sorteie o proprio nome', () => {
        const participantes = ['Ana', 'Catarina', 'Joao', 'Juliana', 'Natalia', 'Joaquim']

        const sorteio = realizarSorteio(participantes)
        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante)
            expect(amigoSecreto).not.toEqual(participante)
        })
    })
})