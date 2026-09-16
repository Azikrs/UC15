function validar () {
    var usuario = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;

if (usuario == "pave" && senha == "chocolate"){
    window.location.href = "https://www.sp.senac.br/";
} else {
    alert ("Acesso Negado!! Tente novamente!!");
    window.location.href = "index.html"
}
}