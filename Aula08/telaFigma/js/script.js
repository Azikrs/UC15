function validar () {
    var titulo = document.getElementById("titulo").value;
    var episodio = document.getElementById("episodio").value;
    var descricao = document.getElementById("descricao").value;
    var autor = document.getElementById("autor").value;

    alert ("Cadastro Confirmado com sucesso!\n\nTítulo: "+ titulo +"\nQuantidade de episódios: " + episodio + "\nDescricao: " + descricao +  "\nAutor: " + autor)
}