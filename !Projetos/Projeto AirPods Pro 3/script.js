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

// Seleciona os 3 botões de cards pelas classes do seu HTML
const card1 = document.querySelector('.card-ambiente-1');
const card2 = document.querySelector('.card-ambiente-2');
const card3 = document.querySelector('.card-ambiente-3');

// Seleciona as caixas de texto que criamos
const modal1 = document.getElementById('curiosidade-ambiente-1');
const modal2 = document.getElementById('curiosidade-ambiente-2');
const modal3 = document.getElementById('curiosidade-ambiente-3');

// Função centralizada para abrir a curiosidade e travar o site atrás
function abrirModal(modal) {
  if (!modal) return;
  modal.classList.add('ativo');
  
  // 1. BLOQUEIA O SCROLL: Impede o usuário de rolar a página de fundo
  document.body.style.overflow = 'hidden';
  
  // 2. FOCO AUTOMÁTICO: Joga o teclado direto para o botão de fechar do modal aberto
  const botaoFechar = modal.querySelector('.botao-fechar');
  if (botaoFechar) botaoFechar.focus();
}

// Função para fechar a curiosidade e destravar o site atrás
function fecharModal(modal) {
  if (!modal) return;
  modal.classList.remove('ativo');
  
  // LIBERA O SCROLL: Permite rolar a página novamente ao fechar
  document.body.style.overflow = '';
}

// Eventos para abrir ao clicar em cada card
if(card1) card1.addEventListener('click', () => abrirModal(modal1));
if(card2) card2.addEventListener('click', () => abrirModal(modal2));
if(card3) card3.addEventListener('click', () => abrirModal(modal3));

// Configura os fechar e cliques de fundo para todos os modais
const todosModais = [modal1, modal2, modal3];

todosModais.forEach(modal => {
  if (modal) {
    const fechar = modal.querySelector('.botao-fechar');
    fechar.addEventListener('click', () => fecharModal(modal));
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) fecharModal(modal);
    });
  }
});

// 3. BLOQUEIA O TAB: Se o modal estiver aberto, impede a tecla Tab de sair dele
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    const modalAberto = document.querySelector('.container-curiosidade.ativo');
    if (modalAberto) {
      const elementosFocaveis = modalAberto.querySelectorAll('button, [href], input, select, textarea, [tabindex="0"]');
      const primeiroElemento = elementosFocaveis[0];
      const ultimoElemento = elementosFocaveis[elementosFocaveis.length - 1];

      // Se pressionar Shift + Tab e estiver no primeiro item, joga para o último
      if (e.shiftKey) {
        if (document.activeElement === primeiroElemento) {
          ultimoElemento.focus();
          e.preventDefault();
        }
      } else {
        // Se pressionar Tab e estiver no último item, joga de volta para o primeiro (o botão de fechar)
        if (document.activeElement === ultimoElemento) {
          primeiroElemento.focus();
          e.preventDefault();
        }
      }
    }
  }
  
  // EXTRA EXTRA: Se o usuário apertar a tecla 'Esc' do teclado, também fecha o modal automaticamente!
  if (e.key === 'Escape') {
    const modalAberto = document.querySelector('.container-curiosidade.ativo');
    if (modalAberto) fecharModal(modalAberto);
  }
});

// Função atualizada para abrir a curiosidade sem fazer o site "saltar"
function abrirModal(modal) {
  if (!modal) return;

  // 1. Calcula a largura exata da barra de rolagem do navegador do usuário
  const larguraScroll = window.innerWidth - document.documentElement.clientWidth;
  
  // 2. Aplica um padding no site com o mesmo tamanho da barra que vai sumir
  document.body.style.paddingRight = `${larguraScroll}px`;
  
  // 3. Mantém o header fixo alinhado se ele também estiver pulando (opcional)
  const headerFixo = document.querySelector('.header-fixo');
  if (headerFixo) headerFixo.style.paddingRight = `${larguraScroll}px`;

  // 4. Bloqueia o scroll e ativa o modal
  document.body.style.overflow = 'hidden';
  modal.classList.add('ativo');
  
  const botaoFechar = modal.querySelector('.botao-fechar');
  if (botaoFechar) botaoFechar.focus();
}

// Função atualizada para fechar e resetar os espaçamentos perfeitamente
function fecharModal(modal) {
  if (!modal) return;
  modal.classList.remove('ativo');
  
  // Remove o bloqueio de scroll e limpa os paddings injetados
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  
  const headerFixo = document.querySelector('.header-fixo');
  if (headerFixo) headerFixo.style.paddingRight = '';
}

// Função original - Apenas adicionado o temporizador de 0.5s nas linhas de limpeza
function fecharModal(modal) {
  if (!modal) return;
  modal.classList.remove('ativo');
  
  // O código original abaixo agora espera 500ms (0.5 segundos) para rodar
  setTimeout(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    const headerFixo = document.querySelector('.header-fixo');
    if (headerFixo) headerFixo.style.paddingRight = '';
  }, 500);
}

function abrirModal(modal) {
  if (!modal) return;

  const larguraScroll = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = `${larguraScroll}px`;
  
  const headerFixo = document.querySelector('.header-fixo');
  if (headerFixo) headerFixo.style.paddingRight = `${larguraScroll}px`;

  document.body.style.overflow = 'hidden';
  modal.classList.add('ativo');
  
  // NOVIDADE: Procura a seção .botao-mais dentro do card que foi clicado e adiciona a classe
  // Usamos o event.currentTarget para descobrir qual card disparou o clique
  const cardClicado = event.currentTarget;
  if (cardClicado) {
    const botaoMais = cardClicado.querySelector('.botao-mais');
    if (botaoMais) botaoMais.classList.add('girar');
  }
  
  const botaoFechar = modal.querySelector('.botao-fechar');
  if (botaoFechar) botaoFechar.focus();
}

function fecharModal(modal) {
  if (!modal) return;
  modal.classList.remove('ativo');
  
  // NOVIDADE: Remove o giro de TODOS os botões de mais quando o modal começar a sumir
  document.querySelectorAll('.botao-mais').forEach(botao => {
    botao.classList.remove('girar');
  });
  
  setTimeout(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    const headerFixo = document.querySelector('.header-fixo');
    if (headerFixo) headerFixo.style.paddingRight = '';
  }, 500);
}

window.addEventListener('scroll', () => {
  const s = document.querySelector('#secao-muda-cor'), h = document.querySelector('.header-fixo');
  if (s && h) h.classList.toggle('modo-alternativo', s.getBoundingClientRect().top <= h.offsetHeight && s.getBoundingClientRect().bottom >= h.offsetHeight);
});
