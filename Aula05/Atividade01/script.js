
const header = document.querySelector(
    ".pagina-inicial-cabecalho"
);

const segundaSecao = document.querySelector(
    ".pagina-inicial"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                // Entrou na segunda seção
                header.classList.remove(
                    "header-visivel"
                );

            } else {

                // Saiu da segunda seção
                header.classList.add(
                    "header-visivel"
                );

            }

        });

    },
);

observer.observe(segundaSecao);

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                // Para de observar depois que apareceu
                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});

const statisticLines = document.querySelectorAll(
    ".americana-shopping-estatisticas-card > hr"
);

const lineObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.7
    }
);


statisticLines.forEach((line) => {

    lineObserver.observe(line);

});

document.addEventListener("DOMContentLoaded", () => {

    const linhas = document.querySelectorAll(
        ".linha-animada"
    );

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("ativa");

                    // Anima somente uma vez
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.7
        }
    );

    linhas.forEach((linha) => {
        observer.observe(linha);
    });

});

document.addEventListener("DOMContentLoaded", function () {

    const botoes = document.querySelectorAll(".botao-entrada");


    botoes.forEach(function (botao) {

        requestAnimationFrame(function () {

            botao.classList.add("show");

        });

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector(
        ".pagina-inicial-cabecalho-fixo"
    );

    if (!header) {
        return;
    }

    requestAnimationFrame(function () {

        header.classList.add("header-show");

    });

});