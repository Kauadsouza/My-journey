document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const languageToggle = document.getElementById('language-toggle');
  const toggleOptions = document.querySelectorAll('.toggle-option');
  const toggleSlider = document.querySelector('.toggle-slider');
  
  // Verifica o idioma salvo ou usa o padrão (pt)
  const savedLang = localStorage.getItem('language') || 'pt';
  
  // Configura o estado inicial
  function setInitialLanguage() {
    if (savedLang === 'en') {
      languageToggle.classList.add('en');
      toggleOptions[0].classList.remove('active');
      toggleOptions[1].classList.add('active');
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
    toggleSlider.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    
    // Atualiza visualmente
    this.classList.toggle('en');
    toggleOptions[0].classList.toggle('active');
    toggleOptions[1].classList.toggle('active');
    
    // Salva preferência
    localStorage.setItem('language', newLang);
    
    // Atualiza o atributo lang do HTML
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
        'nav.home': 'Início',
        'nav.projects': 'Projetos',
        'nav.contact': 'Contato',
        'contact.title': 'Fale Comigo',
        'contact.subtitle': 'Entre em contato preenchendo o formulário abaixo',
        'contact.name': 'Nome',
        'contact.email': 'E-mail',
        'contact.message': 'Mensagem',
        'contact.submit': 'Enviar Mensagem',
        'contact.info.email': 'E-mail',
        'contact.info.location': 'Localização',
        'contact.info.address': 'São Paulo, Brasil',
        'contact.info.hours': 'Horário',
        'contact.info.hours-detail': 'Seg-Sex: 9:00 - 18:00',
        'footer.about': 'Desenvolvendo soluções criativas e inovadoras para a web.',
        'footer.links': 'Links',
        'footer.newsletter': 'Newsletter',
        'footer.newsletter-placeholder': 'Seu e-mail',
        'footer.subscribe': 'Assinar',
        'footer.rights': 'Todos os direitos reservados.'
      },
      'en': {
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        'contact.title': 'Contact Me',
        'contact.subtitle': 'Get in touch by filling out the form below',
        'contact.name': 'Name',
        'contact.email': 'Email',
        'contact.message': 'Message',
        'contact.submit': 'Send Message',
        'contact.info.email': 'Email',
        'contact.info.location': 'Location',
        'contact.info.address': 'São Paulo, Brazil',
        'contact.info.hours': 'Working Hours',
        'contact.info.hours-detail': 'Mon-Fri: 9:00 - 18:00',
        'footer.about': 'Developing creative and innovative web solutions.',
        'footer.links': 'Links',
        'footer.newsletter': 'Newsletter',
        'footer.newsletter-placeholder': 'Your email',
        'footer.subscribe': 'Subscribe',
        'footer.rights': 'All rights reserved.'
      }
    };
    
    // Aplica as traduções
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
    
    // Aplica placeholders traduzidos
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key]) {
        element.setAttribute('placeholder', translations[lang][key]);
      }
    });
  }

  // Inicialização
  setInitialLanguage();
});