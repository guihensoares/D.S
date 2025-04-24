function exibir(nome, idade) {
    return "O seu nome é: " + nome + ", e sua idade é: " + idade;
}

function contar(inicial, final) {
    for (let i = inicial; i <= final; i++) {
        document.writeln(i+"<br>");
    }
}

// conta quantas letras específicas possui a String
function contarLetras(palavra, letra) { 
    let contador = 0;

    palavra = palavra.toLowerCase();
    //converter tudo para minúsculo

    for (let i = 0; i < palavra.length; i++) {
        //charAt pega uma posição específica do vetor String
       if(palavra.charAt(i) == letra) {
            contador++;
       }
    }
    return contador;
}