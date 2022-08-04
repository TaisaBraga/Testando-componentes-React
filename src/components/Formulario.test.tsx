import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { RecoilRoot } from "recoil";
import Formulario from "./Formulario";


describe("o comportamento do Formulario.tsx", () => {

  test("Enquando input vazio, entao novos participantes nao podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
  
    //encontrar o input no DOM
    //encontrar na tela(screen) o input peloo placeholder
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
  
    //encontrar o botao
    //encontrar na tela(screen) o botao pelo papel(role)
    const botao = screen.getByRole("button");
  
    //garantir que o input esteja no documento
    expect(input).toBeInTheDocument();
  
    //garantir que o botao esteja desabilitado
    expect(botao).toBeDisabled();
  });
  
  test("Enquanto o formulario estiver preenchido, deve adicionar um novo participante", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
  
    //encontrar o input no DOM
    //encontrar na tela(screen) o input peloo placeholder
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
  
    //encontrar o botao
    //encontrar na tela(screen) o botao pelo papel(role)
    const botao = screen.getByRole("button");
  
    //inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });
  
    //clicar no botao submeter
    fireEvent.click(botao);
  
    //garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus();
  
    //garantir que o input nao esteja vazio
    expect(input).toHaveValue("");
  });
  
  test("Enquanto nome for duplicado, nao Deve adicionar na lista", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
  
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
  
    const botao = screen.getByRole("button");
   
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });
  
    fireEvent.click(botao);
  
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });
    
    fireEvent.click(botao);
  
    const mensagemDeErro = screen.getByRole("alert")
    expect(mensagemDeErro.textContent).toBe("Nomes duplicados nao sao permitidos!")
  });
  
  test("Enquanto mensagemErro aparecer, Deverá desaparecer após os timers", () => {
    jest.useFakeTimers()
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
  
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
  
    const botao = screen.getByRole("button");
   
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });
  
    fireEvent.click(botao);
  
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });
    
    fireEvent.click(botao);
  
    let mensagemDeErro = screen.queryByRole("alert")
    expect(mensagemDeErro).toBeInTheDocument()
  
    //tudo oq tiver no JS de contagem de tempo será executado 
    act(() => {
      jest.runAllTimers()
    })
  
    //queryByRole para ser OK se nao encontrar essa parte
    mensagemDeErro = screen.queryByRole("alert")
    expect(mensagemDeErro).toBeNull()
  });
})