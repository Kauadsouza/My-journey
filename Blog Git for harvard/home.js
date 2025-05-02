document.addEventListener('DOMContentLoaded', function() {
  // Initialize Particles.js
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#58a6ff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#30363d", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      }
    }
  });

  // Typewriter Effect
  const typed = new Typed('.typed-text', {
    strings: ["Line by Line", "Bug by Bug", "Project by Project"],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });

  // Animated Stats Counter
  function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Set realistic values
  const codingStartDate = new Date('2022-06-01');
  const daysCoding = Math.floor((new Date() - codingStartDate) / (1000 * 60 * 60 * 24));
  const projectCount = 14; // Update with your actual count
  const postCount = 8;    // Update with your actual count

  animateValue('days-coding', 0, daysCoding, 2000);
  animateValue('projects-count', 0, projectCount, 1500);
  animateValue('blog-posts', 0, postCount, 1000);

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('light-theme')) {
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
    }
  }

  // Check for saved theme preference
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    updateThemeIcon();
  }

  // Search Toggle
  const searchToggle = document.getElementById('search-toggle');
  const searchBar = document.getElementById('search-bar');
  
  searchToggle.addEventListener('click', function() {
    searchBar.classList.toggle('active');
  });

  // Tab Functionality
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and content
      tabButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Add active class to clicked button and corresponding content
      this.classList.add('active');
      const tabId = this.getAttribute('data-tab');
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });

  // Load Recent Activity (simulated API call)
  function loadRecentActivity() {
    // Simulate loading blog posts
    setTimeout(() => {
      const blogTab = document.getElementById('blog-tab');
      blogTab.innerHTML = `
        <div class="activity-item">
          <h4>How Repeating a Grade Changed Everything</h4>
          <p class="activity-meta">May 15, 2024 · 5 min read</p>
          <p>My personal story of turning academic failure into motivation...</p>
          <a href="blog/how-repeating-grade-changed-everything.html">Read more →</a>
        </div>
        <div class="activity-item">
          <h4>My First Python Project: Lessons Learned</h4>
          <p class="activity-meta">May 8, 2024 · 3 min read</p>
          <p>Building a simple calculator taught me more than I expected...</p>
          <a href="blog/first-python-project.html">Read more →</a>
        </div>
      `;
    }, 500);
    
    // Simulate loading projects
    setTimeout(() => {
      const projectsTab = document.getElementById('projects-tab');
      projectsTab.innerHTML = `
        <div class="activity-item">
          <h4>CodePath Chronicles Blog</h4>
          <p class="activity-meta">JavaScript, HTML, CSS · May 2024</p>
          <p>A responsive blog documenting my coding journey...</p>
          <a href="projects/blog-project.html">View details →</a>
        </div>
        <div class="activity-item">
          <h4>Study Planner App</h4>
          <p class="activity-meta">Python, Flask · April 2024</p>
          <p>Web app to help students organize their Harvard prep...</p>
          <a href="projects/study-planner.html">View details →</a>
        </div>
      `;
    }, 800);
    
    // Simulate loading milestones
    setTimeout(() => {
      const milestonesTab = document.getElementById('milestones-tab');
      milestonesTab.innerHTML = `
        <div class="activity-item">
          <h4>First Open Source Contribution</h4>
          <p class="activity-meta">May 1, 2024</p>
          <p>Contributed to a documentation fix for a popular JavaScript library...</p>
        </div>
        <div class="activity-item">
          <h4>Completed CS50 Introduction to CS</h4>
          <p class="activity-meta">March 15, 2024</p>
          <p>Finished Harvard's introductory computer science course...</p>
        </div>
      `;
    }, 1200);
  }

  loadRecentActivity();

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input').value;
      // Simulate subscription
      this.innerHTML = '<p class="success-message">Thank you for subscribing!</p>';
      // In a real app, you would send this to your backend
    });
  }

  // Highlight code blocks
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});