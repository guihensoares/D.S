let musica
function criarMusica(nome, estilo, tema, letra) {
    musica = new Musica(nome, estilo, tema, letra)
}

let letra = document.getElementById('letra');
let historicoMusicas = [];

function criar() {
    let nome_musica = document.getElementById('nome_musica').value;
    let estilo_musica = document.getElementById('estilo_musica').value;
    let tema_musica = document.getElementById('tema_musica').value;

    const KEY = `CHAVE-AQUI`;
    const URL = `https://api.openai.com/v1/chat/completions`;

    fetch(URL, {
        method: 'POST', //post, get, delete, put
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: `Crie uma letra de musica curta que se chame ${nome_musica} no estilo ${estilo_musica} e com o tema ${tema_musica}` }
            ],
            max_tokens: 50
        })
    })
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);

        let letra = resp.choices[0].message.content;

        let novaMusica = new Musica(nome_musica, estilo_musica, tema_musica, letra);
        historicoMusicas.push(novaMusica);

        exibirLetra(novaMusica);

        historico();
    })
    .catch(erro => console.log(erro))
    .finally(() => console.log('Finalizado'));
}

function exibirLetra(musica) {
    letra.innerHTML = '';
    let col_resp = document.createElement('div');
    col_resp.classList.add('col-12', 'd-flex', 'justify-content-start');

    let card_resp = document.createElement('div');
    card_resp.classList.add('card', 'm-1', 'bg-info', 'p-2', 'shadow');
    card_resp.innerText = musica.letra;

    letra.appendChild(col_resp);
    col_resp.appendChild(card_resp);
}

function historico() {
    let card_historico = document.getElementById('card_historico');
    card_historico.innerHTML = `<h5 class="text-center">Histórico de Músicas</h5>`;

    historicoMusicas.forEach((musica, index) => {
        let divMusica = document.createElement('div');
        divMusica.classList.add('col-12', 'd-flex');

        let card = document.createElement('div');
        card.classList.add('card', 'm-1', 'p-2', 'bg-secondary', 'text-light', 'w-100');
        card.innerText = `${index + 1} - ${musica.nome} (${musica.estilo}) - Tema: ${musica.tema}`;

        card.onclick = function() {
            exibirLetra(musica);
        };

        divMusica.appendChild(card);
        card_historico.appendChild(divMusica);
    });
}