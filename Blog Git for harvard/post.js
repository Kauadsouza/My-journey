document.addEventListener('DOMContentLoaded', () => {
    // Highlight code blocks
    hljs.highlightAll();
    
    // Generate Table of Contents
    const headings = document.querySelectorAll('.post-body h2, .post-body h3');
    const toc = document.getElementById('toc ul');
    
    if (headings.length > 0) {
      headings.forEach(heading => {
        const id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
        heading.id = id;
        
        const li = document.createElement('li');
        li.innerHTML = `<a href="#${id}">${heading.textContent}</a>`;
        toc.appendChild(li);
      });
    } else {
      document.getElementById('toc').style.display = 'none';
    }
    
    // Calculate reading time
    const text = document.getElementById('post-body').textContent;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200);
    document.querySelector('.post-reading-time').textContent = `${readingTime} min read`;
    
    // Share functionality
    document.getElementById('share-post').addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: document.getElementById('post-title').textContent,
          url: window.location.href
        });
      } else {
        // Fallback for desktop
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    });
    
    // Edit post button
    document.getElementById('edit-post').addEventListener('click', () => {
      window.location.href = `../blog/editor.html?id=${new URLSearchParams(window.location.search).get('id')}`;
    });
    
    // Parse Markdown content (if loaded from .md file)
    if (window.location.pathname.endsWith('.md')) {
      fetch(window.location.pathname)
        .then(response => response.text())
        .then(markdown => {
          document.getElementById('post-body').innerHTML = marked.parse(markdown);
          hljs.highlightAll(); // Re-highlight new code blocks
        });
    }
  });