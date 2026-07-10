const botao = document.getElementById("desc-btn");
const descricao = document.getElementById("descricao");
const arrowImage = document.querySelector("#desc-btn img");

botao.addEventListener("click", function () {
    if (descricao.style.display === "block") {
        descricao.style.display = "none";
        arrowImage.classList.remove("rotated");
    } else {
        descricao.style.display = "block";
        arrowImage.classList.add("rotated");
    }
});