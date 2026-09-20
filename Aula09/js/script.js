const checkTermos = document.getElementById("termos");
const botaoSalvar = document.getElementById("salvar");
const checkCliente = document.getElementById("cliente");
const empresa = document.getElementById("empresa");
const documento = document.getElementById("documento");
const telefone = document.getElementById("telefone");

checkTermos.addEventListener("change", function() {
    if (checkTermos.checked) {
        botaoSalvar.disabled = false;
    } else {
        botaoSalvar.disabled = true;
    }
});

checkCliente.addEventListener("change", function() {
    if (checkCliente.checked) {
        empresa.required = true;
    } else {
        empresa.required = false;
    }
});

documento.addEventListener("input", function () {
    documento.value = documento.value.replace(/\D/g, "");
});

telefone.addEventListener("input", function() {
    telefone.value = telefone.value.replace(/\D/g, "");
});

function cancelar () {
    window.location.href = "index.html"
}