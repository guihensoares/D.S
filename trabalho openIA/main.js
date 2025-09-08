let personagem
function criarMusica(nome, estilo, letra) {
    personagem = new Personagem(nome, estilo, letra);
}

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
            { role: 'system', content: `Crie uma letra de musica no estilo ${estilo}, que fale sobre ${sobre} e tenha como o nome de ${nome}` },
            { role: 'user', content: pergunta },
        ],
        max_tokens: 50
    })
})
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);

    })
    .catch(erro => {
        console.log(erro);
    })
    .finally(() => {
        console.log('Finalizado');
    })