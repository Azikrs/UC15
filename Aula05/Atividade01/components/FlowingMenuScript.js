// ========================================
// CONFIGURAÇÕES PERSONALIZÁVEIS
// ========================================

const menuItems = [
  { 
    link: '#', 
    text: "McDonald's.", 
    image: 'img/CarrosselGastronomia/mac.png',
    // Cores específicas deste item
    corTexto: '#0b4656',
    corFundo: '#ffffff',
    corMarquee: '#DB0007',
    corTextoMarquee: '#FFC72C'
  },
  { 
    link: '#', 
    text: 'Burger King.', 
    image: 'img/CarrosselGastronomia/burgerKing.png',
    corTexto: '#0b4656',
    corFundo: '#ffffff',
    corMarquee: '#ed7902',
    corTextoMarquee: '#EC2F0E'
  },
  { 
    link: '#', 
    text: 'Outback.', 
    image: 'img/CarrosselGastronomia/outback.png',
    corTexto: '#0b4656',
    corFundo: '#ffffff',
    corMarquee: '#74242c',
    corTextoMarquee: '#f7e6d0'
  },
  { 
    link: '#', 
    text: 'Spoleto.', 
    image: 'img/CarrosselGastronomia/spoleto.png',
    corTexto: '#0b4656',
    corFundo: '#fff',
    corMarquee: '#be301a',
    corTextoMarquee: '#fff'
  }
];

// ========================================
// CORES PADRÃO (fallback)
// ========================================
const CORES_PADRAO = {
  corTexto: '#0b4656',
  corFundo: '#f9f9f9',
  corMarquee: '#0b4656',
  corTextoMarquee: '#ffffff',
  corBorda: '#e0e0e0'
};

// ========================================
// ANIMAÇÕES - Customize aqui
// ========================================
const ANIMACOES = {
  velocidadeMarquee: 12,            // Segundos (menor = mais rápido)
  duracaoTransicao: 0.6,            // Duração do efeito hover
  tipoEasing: 'expo'                // Tipo de animação (linear, ease, expo, etc)
};

// ========================================
// COMPONENTE MenuItem
// ========================================
const { useState, useRef, useEffect } = React;

function MenuItem({ 
  link, 
  text, 
  image, 
  speed, 
  corTexto = CORES_PADRAO.corTexto,
  corFundo = CORES_PADRAO.corFundo,
  corMarquee = CORES_PADRAO.corMarquee,
  corTextoMarquee = CORES_PADRAO.corTextoMarquee,
  corBorda = CORES_PADRAO.corBorda
}) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const [repetitions, setRepetitions] = useState(4);

  const animationDefaults = { duration: ANIMACOES.duracaoTransicao, ease: ANIMACOES.tipoEasing };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - 0) ** 2;
    const bottomEdgeDist = (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;

      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part');
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;

      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    setTimeout(calculateRepetitions, 100);
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text, image]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;

      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part');
      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };

    const timer = setTimeout(setupMarquee, 200);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [text, image, repetitions, speed]);

  const handleMouseEnter = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = ev => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  return (
    <div className="menu__item" ref={itemRef} style={{ borderColor: corBorda, backgroundColor: corFundo }}>
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: corTexto }}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef} style={{ backgroundColor: corMarquee }}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="marquee__part" key={idx} style={{ color: corTextoMarquee }}>
                <span>{text}</span>
                <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// COMPONENTE FlowingMenu
// ========================================
function FlowingMenu({ items = [], speed = 15 }) {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
          />
        ))}
      </nav>
    </div>
  );
}

// ========================================
// INICIALIZAÇÃO
// ========================================
setTimeout(() => {
  try {
    const container = document.getElementById('flowing-menu-root');
    console.log('Container found:', container);
    
    if (container && ReactDOM) {
      const root = ReactDOM.createRoot(container);
      root.render(
        <FlowingMenu 
          items={menuItems}
          speed={ANIMACOES.velocidadeMarquee}
        />
      );
      console.log('FlowingMenu renderizado com sucesso!');
    } else {
      console.error('Container não encontrado ou ReactDOM indisponível');
    }
  } catch (error) {
    console.error('Erro ao renderizar FlowingMenu:', error);
  }
}, 500);