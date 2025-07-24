document.addEventListener('DOMContentLoaded', function() {
  // Elementos do DOM
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle?.querySelector('i');
  
  // Verifica e aplica o tema salvo
  function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const isLightMode = savedTheme === 'light';
    
    document.body.classList.toggle('light-mode', isLightMode);
    if (themeIcon) {
      themeIcon.classList.replace(isLightMode ? 'fa-moon' : 'fa-sun', 
                                isLightMode ? 'fa-sun' : 'fa-moon');
    }
  }

  // Configura o tema
  function setupThemeToggle() {
    if (!themeToggle || !themeIcon) return;
    
    themeToggle.addEventListener('click', function() {
      const isLightMode = document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
      
      themeIcon.classList.replace(isLightMode ? 'fa-moon' : 'fa-sun',
                                isLightMode ? 'fa-sun' : 'fa-moon');
    });
  }

  // Configura o formulário de contato
  function setupContactForm() {
    if (!contactForm || !formStatus) return;
    
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const lang = localStorage.getItem('language') || 'pt-BR';
      const isPortuguese = lang === 'pt-BR';
      
      // Feedback visual
      formStatus.textContent = isPortuguese ? 
        'Enviando mensagem...' : 'Sending message...';
      formStatus.style.color = 'var(--text-secondary)';
      
      try {
        // Simulação de envio (substitua por chamada real à API)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Sucesso
        formStatus.textContent = isPortuguese ? 
          'Mensagem enviada com sucesso!' : 'Message sent successfully!';
        formStatus.style.color = 'var(--success)';
        contactForm.reset();
        
        // Limpa a mensagem após 5 segundos
        setTimeout(() => {
          formStatus.textContent = '';
        }, 5000);
      } catch (error) {
        // Tratamento de erro
        formStatus.textContent = isPortuguese ? 
          'Erro ao enviar mensagem. Tente novamente.' : 'Error sending message. Please try again.';
        formStatus.style.color = 'var(--danger)';
      }
    });
  }

  // Inicialização
  applySavedTheme();
  setupThemeToggle();
  setupContactForm();
});