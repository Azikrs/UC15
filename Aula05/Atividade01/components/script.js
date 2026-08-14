// ========================================
// 1. HEADER FIXO - Aparece ao sair da seção inicial
// ========================================
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".pagina-inicial-cabecalho");
    const segundaSecao = document.querySelector(".pagina-inicial");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                header.classList.remove("header-visivel");
            } else {
                header.classList.add("header-visivel");
            }
        });
    });

    observer.observe(segundaSecao);
});

// ========================================
// 2. ANIMAÇÃO DE ENTRADA DO HEADER FIXO
// ========================================
document.addEventListener("DOMContentLoaded", function () {
    const headerFixo = document.querySelector(".pagina-inicial-cabecalho-fixo");
    
    if (headerFixo) {
        requestAnimationFrame(function () {
            headerFixo.classList.add("header-show");
        });
    }
});

// ========================================
// 3. ELEMENTOS COM CLASSE "REVEAL" - Animação ao entrar na tela
// ========================================
document.addEventListener("DOMContentLoaded", function () {
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
});

// ========================================
// 4. LINHAS ANIMADAS - Animação ao entrar na tela
// ========================================
document.addEventListener("DOMContentLoaded", function () {
    const statisticLines = document.querySelectorAll(".americana-shopping-estatisticas-card > hr");

    const lineObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    lineObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.7 }
    );

    statisticLines.forEach((line) => {
        lineObserver.observe(line);
    });
});

// ========================================
// 5. LINHAS HORIZONTAIS - Animação ao entrar na tela
// ========================================
document.addEventListener("DOMContentLoaded", function () {
    const linhas = document.querySelectorAll(".linha-animada");

    const linhaObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("ativa");
                    linhaObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.7 }
    );

    linhas.forEach((linha) => {
        linhaObserver.observe(linha);
    });
});

// ========================================
// 6. BOTÕES - Animação de entrada suave
// ========================================
document.addEventListener("DOMContentLoaded", function () {
    const botoes = document.querySelectorAll(".botao-entrada");

    botoes.forEach((botao) => {
        requestAnimationFrame(function () {
            botao.classList.add("show");
        });
    });
});