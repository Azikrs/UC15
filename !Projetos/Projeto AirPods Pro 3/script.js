const gatilho = document.querySelector('#gatilho-scroll');
const header = document.querySelector('.header-fixo');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Se o elemento gatilho NÃO estiver visível na tela (usuário rolou para baixo)
    if (!entry.isIntersecting) {
      header.classList.add('colado');
    } else {
      // Se o usuário voltou totalmente para o topo
      header.classList.remove('colado');
    }
  });
}, {
  rootMargin: '0px 0px 0px 0px' /* Ajuste este valor para controlar a altura do disparo */
});

observer.observe(gatilho);