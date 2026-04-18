// Configuration and State
const DATA_URL = 'data.json';
const PASSWORD_HASH = 'c0182b5e5c31b6f27d32a0129f78d88aa4840781e5e421bcc915b97d91f40d60';
const AUTH_STORAGE_KEY = 'mom-bday-authenticated';

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    initPasswordGate();
});

async function initPasswordGate() {
    if (sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true') {
        unlockSite();
        await initApp();
        return;
    }

    const form = document.getElementById('password-form');
    const input = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const password = input.value;
        const passwordHash = await sha256Hex(password);

        if (passwordHash === PASSWORD_HASH) {
            sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
            errorMessage.textContent = '';
            unlockSite();
            await initApp();
            return;
        }

        errorMessage.textContent = 'Incorrect password.';
        input.select();
    });

    input.focus();
}

function unlockSite() {
    const overlay = document.getElementById('password-overlay');
    overlay.classList.add('is-hidden');
}

async function initApp() {
    try {
        const data = await fetchData(DATA_URL);
        const randomizedData = data.sort(() => Math.random() - 0.5);
        renderScrapbook(randomizedData);
        initAnimations();
    } catch (error) {
        console.error('Error initializing scrapbook:', error);
    }
    // ... rest of the function
        
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
}

function createScrapbookElement(item) {
    const div = document.createElement('div');
    div.className = 'scrapbook-item';
    div.setAttribute('data-aos', 'fade-up');
    const dateMarkup = item.date ? `<span class="date">${formatDate(item.date)}</span>` : '';

    if (item.type === 'photo') {
        div.innerHTML = `
            <div class="card photo-card">
                <img src="${item.url}" alt="${item.caption}" onerror="this.style.display='none'">
                <div class="card-content">
                    <p class="caption">${item.caption}</p>
                    ${dateMarkup}
                </div>
            </div>
        `;
    } else if (item.type === 'note') {
        div.innerHTML = `
            <div class="card note-card">
                <div class="card-content">
                    <p class="note-text">"${item.content}"</p>
                    ${dateMarkup}
                </div>
            </div>
        `;
    }

    return div;
}

async function sha256Hex(value) {
    const encoded = new TextEncoder().encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

function formatDate(dateString) {
    if (!dateString) {
        return '';
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function initAnimations() {
    // Additional animation logic if needed
}
