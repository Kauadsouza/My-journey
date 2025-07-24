document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const blogPostsContainer = document.getElementById('blogPosts');
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const blogSearch = document.getElementById('blogSearch');
    const newPostBtn = document.getElementById('newPostBtn');
    const postModal = document.getElementById('postModal');
    const closeModal = document.querySelector('.close-modal');
    const cancelPost = document.getElementById('cancelPost');
    const postForm = document.getElementById('postForm');
    const sortBy = document.getElementById('sortBy');
    const themeToggle = document.getElementById('themeToggle');
    
    // Sample blog data (in a real app, this would come from a backend API)
    let blogPosts = [
        {
            id: 1,
            title: 'Getting Started with Web Development',
            excerpt: 'Learn the fundamentals of HTML, CSS, and JavaScript to start your journey as a web developer.',
            content: 'Full content would go here...',
            author: 'Jane Doe',
            date: '2023-05-15',
            tags: ['webdev', 'beginners'],
            likes: 42,
            image: 'https://source.unsplash.com/random/600x400/?webdevelopment'
        },
        {
            id: 2,
            title: 'Advanced CSS Techniques',
            excerpt: 'Explore modern CSS features like Grid, Flexbox, and custom properties to create stunning layouts.',
            content: 'Full content would go here...',
            author: 'John Smith',
            date: '2023-06-02',
            tags: ['css', 'frontend'],
            likes: 35,
            image: 'https://source.unsplash.com/random/600x400/?css'
        },
        {
            id: 3,
            title: 'JavaScript Performance Optimization',
            excerpt: 'Tips and tricks to make your JavaScript code run faster and more efficiently.',
            content: 'Full content would go here...',
            author: 'Alex Johnson',
            date: '2023-06-18',
            tags: ['javascript', 'performance'],
            likes: 28,
            image: 'https://source.unsplash.com/random/600x400/?javascript'
        }
    ];
    
    // Initialize the blog
    function initBlog() {
        renderBlogPosts(blogPosts);
        setupEventListeners();
        checkTheme();
    }
    
    // Render blog posts
    function renderBlogPosts(posts) {
        if (posts.length === 0) {
            blogPostsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book-open"></i>
                    <h3>No posts found</h3>
                    <p>Try adjusting your search or create a new post.</p>
                </div>
            `;
            return;
        }
        
        blogPostsContainer.innerHTML = posts.map(post => `
            <article class="blog-post" data-id="${post.id}">
                <div class="post-image">
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span>${post.author}</span>
                        <span>${formatDate(post.date)}</span>
                    </div>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <a href="#" class="read-more">Read more <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>
        `).join('');
    }
    
    // Format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Search functionality
    function searchPosts(query) {
        const filteredPosts = blogPosts.filter(post => 
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.author.toLowerCase().includes(query.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
            post.content.toLowerCase().includes(query.toLowerCase())
        );
        renderBlogPosts(filteredPosts);
    }
    
    // Sort functionality
    function sortPosts(sortType) {
        let sortedPosts = [...blogPosts];
        
        switch(sortType) {
            case 'newest':
                sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                sortedPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'popular':
                sortedPosts.sort((a, b) => b.likes - a.likes);
                break;
            default:
                break;
        }
        
        renderBlogPosts(sortedPosts);
    }
    
    // Toggle theme
    function toggleTheme() {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        updateThemeIcon();
    }
    
    // Update theme icon
    function updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('light-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }
    
    // Check saved theme preference
    function checkTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        }
        updateThemeIcon();
    }
    
    // Setup event listeners
    function setupEventListeners() {
        // Search toggle
        searchToggle.addEventListener('click', () => {
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active')) {
                blogSearch.focus();
            }
        });
        
        // Live search
        blogSearch.addEventListener('input', (e) => {
            searchPosts(e.target.value);
        });
        
        // New post modal
        newPostBtn.addEventListener('click', () => {
            postModal.classList.add('active');
        });
        
        // Close modal
        closeModal.addEventListener('click', () => {
            postModal.classList.remove('active');
        });
        
        cancelPost.addEventListener('click', () => {
            postModal.classList.remove('active');
        });
        
        // Click outside modal to close
        postModal.addEventListener('click', (e) => {
            if (e.target === postModal) {
                postModal.classList.remove('active');
            }
        });
        
        // Form submission
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newPost = {
                id: blogPosts.length + 1,
                title: document.getElementById('postTitle').value,
                author: document.getElementById('postAuthor').value,
                content: document.getElementById('postContent').value,
                excerpt: document.getElementById('postContent').value.substring(0, 150) + '...',
                date: new Date().toISOString().split('T')[0],
                tags: document.getElementById('postTags').value.split(',').map(tag => tag.trim()),
                likes: 0,
                image: `https://source.unsplash.com/random/600x400/?${document.getElementById('postTags').value.split(',')[0] || 'coding'}`
            };
            
            blogPosts.unshift(newPost);
            renderBlogPosts(blogPosts);
            postForm.reset();
            postModal.classList.remove('active');
            
            // Show success message
            alert('Post published successfully!');
        });
        
        // Sort posts
        sortBy.addEventListener('change', (e) => {
            sortPosts(e.target.value);
        });
        
        // Theme toggle
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Initialize the blog
    initBlog();
});