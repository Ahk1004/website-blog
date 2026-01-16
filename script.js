// ===== DOM ELEMENTS =====
const blogGrid = document.getElementById('blogGrid');
const modalOverlay = document.getElementById('modal');
const mImg = document.getElementById('mImg');
const mTitle = document.getElementById('mTitle');
const mCat = document.getElementById('mCat');
const mText = document.getElementById('mText');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

// ===== RENDER POSTS =====
function renderPosts(filter = 'all') {
    blogGrid.innerHTML = '';
    
    const posts = filter === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === filter);

    posts.forEach(post => {
        const card = document.createElement('article');
        card.className = 'post-card fade-in';
        card.onclick = () => openModal(post.id);
        
        card.innerHTML = `
            <img src="${post.image}" alt="${post.title}" class="post-img" loading="lazy">
            <div class="post-content">
                <span class="tag">${post.category}</span>
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
                <span class="read-link">Read Story &rarr;</span>
            </div>
        `;
        blogGrid.appendChild(card);
    });

    triggerAnimations();
}

// ===== FILTERING =====
function filterPosts(cat) {
    document.querySelectorAll('.tab').forEach(btn => {
        btn.classList.remove('active');
        if(btn.textContent === cat || (cat === 'all' && btn.textContent === 'All')) {
            btn.classList.add('active');
        }
    });
    renderPosts(cat);
}

// ===== MODAL LOGIC =====
function openModal(id) {
    const post = blogPosts.find(p => p.id === id);
    if(!post) return;

    mImg.src = post.image;
    mTitle.innerText = post.title;
    mCat.innerText = post.category;
    mText.innerText = post.content;
    
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

modalOverlay.addEventListener('click', (e) => {
    if(e.target === modalOverlay) closeModal();
});

// ===== SMOOTH SCROLL ANIMATIONS =====
function triggerAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ===== MOBILE MENU =====
if(menuBtn) {
    menuBtn.addEventListener('click', () => {
        const isFlex = navLinks.style.display === 'flex';
        navLinks.style.display = isFlex ? 'none' : 'flex';
        
        if(!isFlex) {
            // Simple mobile menu styling via JS for simplicity
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '60px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = '#050505';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        }
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    triggerAnimations();
});