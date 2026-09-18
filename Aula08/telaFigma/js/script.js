function validar () {
    var titulo = document.getElementById("titulo").value;
    var episodio = document.getElementById("episodio").value;
    var descricao = document.getElementById("descricao").value;
    var autor = document.getElementById("autor").value;

    if (titulo && episodio && descricao && autor) {
        localStorage.setItem("anime_titulo", titulo);
        localStorage.setItem("anime_episodio", episodio);
        localStorage.setItem("anime_descricao", descricao);
        localStorage.setItem("anime_autor", autor);

        window.location.href = "cadastroConfirmacao.html";
    } else {
        alert("Por Favor preencha todos os campos!");
    }
}

function voltar() {
    window.location.href = "index.html";
}

function confirmar() {
    window.location.href = "cadastroConcluido.html";
    localStorage.clear();
}

// Aguarda o HTML da página carregar por completo antes de executar o código interno
window.addEventListener("DOMContentLoaded", function() {
    // 1. Busca o primeiro elemento para testar se estamos na tela de confirmação
    var pTitulo = document.getElementById("conf-titulo");

    // 2. Só coloca os textos se o elemento realmente existir na página atual
    if (pTitulo) {
        pTitulo.textContent = localStorage.getItem("anime_titulo");
        document.getElementById("conf-episodio").textContent = localStorage.getItem("anime_episodio");
        document.getElementById("conf-descricao").textContent = localStorage.getItem("anime_descricao");
        document.getElementById("conf-autor").textContent = localStorage.getItem("anime_autor");
    }
});