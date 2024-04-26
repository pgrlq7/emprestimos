const DOM_inputNome = document.querySelector('[data-js-input-nome]');
const DOM_inputValor = document.querySelector('[data-js-input-valor]');
const DOM_botaoAdicionar = document.querySelector('[data-js-botao-adicionar]');
const DOM_mostrarDadosEmprestimo = document.querySelector('[data-js-mostrar-dados-emprestimo]');
const nomeChaveLocalStorage = 'emprestimo';

let estruturaSalvarDadosEntrada = [];

function adicionarEmprestimoLocalStorage(obj) {
    estruturaSalvarDadosEntrada.push(obj);
    localStorage.setItem(nomeChaveLocalStorage, JSON.stringify(estruturaSalvarDadosEntrada));
}

function removerEmprestimoLocalStorage(id) {
    estruturaSalvarDadosEntrada = estruturaSalvarDadosEntrada.filter(dado => dado.id !== id);
    localStorage.setItem(nomeChaveLocalStorage, JSON.stringify(estruturaSalvarDadosEntrada));
}

function adicionarEstilos() {
    const itensEmprestimo = document.querySelectorAll('.lista-emprestimos-item');
    itensEmprestimo.forEach(item => {
        const nome = item.querySelector('.nome-emprestimo');
        nome.classList.add('nome-emprestimo');

        const valor = item.querySelector('.valor-emprestimo');
        valor.classList.add('valor-emprestimo');

        const data = item.querySelector('.data-emprestimo');
        data.classList.add('data-emprestimo');

        const botao = item.querySelector('.botao-marcar-como-pago');
        botao.classList.add('botao-marcar-como-pago');
    });
}

function criarElementoEmprestimo(obj) {
    const div = document.createElement('div');
    div.classList.add('lista-emprestimos-item'); // Adiciona a classe ao elemento div

    const nome = document.createElement('div');
    nome.textContent = `Nome: ${obj.nome}`;
    nome.classList.add('nome-emprestimo'); // Adiciona a classe ao elemento nome

    const valor = document.createElement('div');
    valor.textContent = `Valor: R$${obj.valor}`;
    valor.classList.add('valor-emprestimo'); // Adiciona a classe ao elemento valor

    const data = document.createElement('div');
    data.textContent = `Data: ${obj.data}`;
    data.classList.add('data-emprestimo'); // Adiciona a classe ao elemento data

    const botao = document.createElement('button');
    botao.setAttribute('data-js-botao', 'marcar-como-pago');
    botao.setAttribute('data-js-id', obj.id);
    botao.textContent = 'Marcar como pago';
    botao.classList.add('botao-marcar-como-pago'); // Adiciona a classe ao botão

    div.appendChild(nome);
    div.appendChild(valor);
    div.appendChild(data);
    div.appendChild(botao);
    DOM_mostrarDadosEmprestimo.appendChild(div);

    // Adiciona o ouvinte de evento para o botão "Marcar como Pago"
    botao.addEventListener('click', () => {
        const idElementoClicado = Number(botao.dataset.jsId);
        removerEmprestimoLocalStorage(idElementoClicado);
        div.remove();
    });
}

function exibirDadosTela() {
    DOM_mostrarDadosEmprestimo.innerHTML = ''; // Limpa a lista antes de exibir os empréstimos existentes
    const dadosLocalStorage = JSON.parse(localStorage.getItem(nomeChaveLocalStorage)) || [];
    dadosLocalStorage.forEach(dado => criarElementoEmprestimo(dado));
    adicionarEstilos(); // Adiciona estilos aos elementos criados dinamicamente
}

DOM_botaoAdicionar.addEventListener('click', () => {
    const inputNome = DOM_inputNome.value.trim();
    const inputValor = DOM_inputValor.value.trim();

    if (!inputNome || !inputValor || inputValor <= 0) {
        alert('Preencha todos os dados corretamente! O valor não pode ser menor ou igual a zero.');
        return;
    }

    const novoEmprestimo = {
        nome: inputNome,
        valor: inputValor,
        data: new Date().toLocaleDateString(),
        id: Date.now(),
    };

    adicionarEmprestimoLocalStorage(novoEmprestimo);
    criarElementoEmprestimo(novoEmprestimo);

    DOM_inputNome.value = '';
    DOM_inputValor.value = '';
});

window.addEventListener('DOMContentLoaded', exibirDadosTela);
