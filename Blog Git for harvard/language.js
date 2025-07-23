document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const languageToggle = document.getElementById('language-toggle');
  
  // Verifica se o elemento existe
  if (!languageToggle) {
    console.error('Elemento do seletor de idioma não encontrado!');
    return;
  }

  const toggleOptions = document.querySelectorAll('.toggle-option');
  const toggleSlider = document.querySelector('.toggle-slider');
  
  // Verifica o idioma salvo ou usa o padrão (pt)
  const savedLang = localStorage.getItem('language') || 'pt';
  
  // Configura o estado inicial
  function setInitialLanguage() {
    if (savedLang === 'en') {
      languageToggle.classList.add('en');
      toggleOptions.forEach((option, index) => {
        option.classList.toggle('active', index === 1);
      });
      document.documentElement.lang = 'en';
    } else {
      document.documentElement.lang = 'pt';
    }
    loadTranslations(savedLang);
  }

  // Evento de clique no botão de idioma
  languageToggle.addEventListener('click', function() {
    const isEN = this.classList.contains('en');
    const newLang = isEN ? 'pt' : 'en';
    
    // Animação suave
    if (toggleSlider) {
      toggleSlider.style.transition = 'transform 0.3s ease';
    }
    
    // Atualiza visualmente
    this.classList.toggle('en');
    toggleOptions.forEach((option, index) => {
      option.classList.toggle('active', (isEN && index === 0) || (!isEN && index === 1));
    });
    
    // Salva preferência
    localStorage.setItem('language', newLang);
    document.documentElement.lang = newLang;
    
    // Carrega as traduções
    loadTranslations(newLang);
    
    // Feedback tátil
    this.style.transform = 'scale(0.98)';
    setTimeout(() => {
      this.style.transform = '';
    }, 100);
  });

  // Função para carregar traduções
  function loadTranslations(lang) {
    const translations = {
      'pt': {
        'title': 'NullForge Chronicles | Recursos de Programação',
        'header.title': 'NullForge Chronicles',
        'header.subtitle': 'Domine programação através da prática',
        'stats.days': 'Dias Programando',
        'stats.projects': 'Projetos',
        'stats.blog': 'Posts no Blog',
        'nav.home': 'Início',
        'nav.blog': 'Blog',
        'nav.projects': 'Projetos',
        'nav.about': 'Sobre',
        'nav.contact': 'Contato',
        'search.placeholder': 'Buscar posts, projetos...',
        'hero.title': 'Desenvolva Suas Habilidades',
        'hero.subtitle': 'Recursos práticos de programação, tutoriais e ideias de projetos para levar suas habilidades para o próximo nível.',
        'hero.blog': 'Ler Blog',
        'hero.projects': 'Ver Projetos',
        'features.title': 'Por Que Aprender Conosco',
        'features.1.title': 'Abordagem Prática',
        'features.1.text': 'Foco em aplicações reais e aprendizado baseado em projetos',
        'features.2.title': 'Caminho Estruturado',
        'features.2.text': 'Progressão clara de conceitos básicos para avançados',
        'features.3.title': 'Para Iniciantes',
        'features.3.text': 'Tutoriais que começam do absoluto básico',
        'footer.title': 'NullForge Chronicles',
        'footer.about': 'Recursos práticos de programação para desenvolvedores de todos os níveis.',
        'footer.links.title': 'Links Rápidos',
        'footer.links.1': 'Arquivo do Blog',
        'footer.links.2': 'Portfólio de Projetos',
        'footer.links.3': 'Sobre Nós',
        'footer.newsletter': 'Mantenha-se Atualizado',
        'footer.email': 'Seu email',
        'footer.subscribe': 'Assinar',
        'footer.copyright': '© 2025 NullForge. Todos os direitos reservados.'
      },
      'en': {
        'title': 'NullForge Chronicles | Programming Resources',
        'header.title': 'NullForge Chronicles',
        'header.subtitle': 'Master programming through practice',
        'stats.days': 'Days Coding',
        'stats.projects': 'Projects',
        'stats.blog': 'Blog Posts',
        'nav.home': 'Home',
        'nav.blog': 'Blog',
        'nav.projects': 'Projects',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'search.placeholder': 'Search blog posts, projects...',
        'hero.title': 'Build Your Skills',
        'hero.subtitle': 'Practical programming resources, tutorials and project ideas to take your coding skills to the next level.',
        'hero.blog': 'Read Blog',
        'hero.projects': 'View Projects',
        'features.title': 'Why Learn With Us',
        'features.1.title': 'Practical Approach',
        'features.1.text': 'Focus on real-world applications and project-based learning',
        'features.2.title': 'Structured Path',
        'features.2.text': 'Clear progression from beginner to advanced concepts',
        'features.3.title': 'Beginner-Friendly',
        'features.3.text': 'Tutorials that start from absolute basics',
        'footer.title': 'NullForge Chronicles',
        'footer.about': 'Practical programming resources for developers of all levels.',
        'footer.links.title': 'Quick Links',
        'footer.links.1': 'Blog Archive',
        'footer.links.2': 'Project Portfolio',
        'footer.links.3': 'About Us',
        'footer.newsletter': 'Stay Updated',
        'footer.email': 'Your email',
        'footer.subscribe': 'Subscribe',
        'footer.copyright': '© 2025 NullForge. All rights reserved.'
      }
    };
    
    // Aplica as traduções aos elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      } else {
        console.warn(`Translation not found for key: ${key}`);
      }
    });
    
    // Aplica placeholders traduzidos
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key]) {
        element.setAttribute('placeholder', translations[lang][key]);
      }
    });
    
    // Atualiza o título da página
    const titleKey = document.querySelector('title').getAttribute('data-i18n');
    if (translations[lang] && translations[lang][titleKey]) {
      document.title = translations[lang][titleKey];
    }
  }

  // Configuração inicial
  setInitialLanguage();
  
  // Atualiza o ano no footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});