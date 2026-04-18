// Configuration and State
const DATA_URL = 'data.json';

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    try {
        const data = await fetchData(DATA_URL);
        renderScrapbook(data);
        initAnimations();
    } catch (error) {
        console.error('Error initializing scrapbook:', error);
    }
        
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

function renderScrapbook(items) {
    const container = document.getElementById('scrapbook-container');
    
    items.forEach(item => {
        const element = createScrapbookElement(item);
        container.appendChild(element);
    });

    // Initialize Masonry after images are loaded
    const grid = container.querySelector('.masonry-grid');
    imagesLoaded(grid, function() {
        new Masonry(grid, {
            itemSelector: '.scrapbook-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
    });
}

function createScrapbookElement(item) {
    const div = document.createElement('div');
    div.className = 'scrapbook-item';
    div.setAttribute('data-aos', 'fade-up');

    if (item.type === 'photo') {
        div.innerHTML = `
            <div class="card photo-card">
                <img src="${item.url}" alt="${item.caption}" onerror="this.style.display='none'">
                <div class="card-content">
                    <p class="caption">${item.caption}</p>
                    <span class="date">${formatDate(item.date)}</span>
                </div>
            </div>
        `;
    } else if (item.type === 'note') {
        div.innerHTML = `
            <div class="card note-card">
                <div class="card-content">
                    <p class="note-text">"${item.content}"</p>
                    <span class="date">${formatDate(item.date)}</span>
                </div>
            </div>
        `;
    }

    return div;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function initAnimations() {
    // Additional animation logic if needed
}
