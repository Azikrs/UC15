window.addEventListener('scroll', () => {
  const header = document.querySelector('.header-fixo');

  if (window.scrollY >950) {
    header.classList.add('colado');
  } else {
    header.classList.remove('colado');
  }
});