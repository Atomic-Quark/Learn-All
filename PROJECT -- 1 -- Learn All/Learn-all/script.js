// Global State
const appState = {
    theme: localStorage.getItem('theme') || 'dark',
    user: JSON.parse(localStorage.getItem('user')) || null,
    apiKey: localStorage.getItem('gemini_api_key') || null,
    searchIndex: []
};

// Search Index Data
const searchData = [
    { title: 'HTML Basics', category: 'Web', url: 'learn.html?topic=html', keywords: 'html, web, structure, tags, elements' },
    { title: 'CSS Styling', category: 'Web', url: 'learn.html?topic=css', keywords: 'css, style, design, responsive, flexbox, grid' },
    { title: 'JavaScript Logic', category: 'Web', url: 'learn.html?topic=javascript', keywords: 'javascript, js, logic, functions, events, dom' },
    { title: 'Python Programming', category: 'General', url: 'learn.html?topic=python', keywords: 'python, backend, data, ai, scripting' },
    { title: 'Java Development', category: 'General', url: 'learn.html?topic=java', keywords: 'java, android, enterprise, oop' },
    { title: 'C++ Systems', category: 'Systems', url: 'learn.html?topic=cpp', keywords: 'cpp, c++, systems, game, performance' },
    { title: 'C Language', category: 'Systems', url: 'learn.html?topic=c', keywords: 'c, systems, embedded, low level' },
    { title: 'C# .NET', category: 'General', url: 'learn.html?topic=csharp', keywords: 'c#, .net, windows, game, unity' },
    { title: 'PHP Backend', category: 'Web', url: 'learn.html?topic=php', keywords: 'php, backend, server, database' },
    { title: 'Artificial Intelligence', category: 'AI', url: 'learn.html?topic=ai', keywords: 'ai, artificial intelligence, neural networks' },
    { title: 'Machine Learning', category: 'AI', url: 'learn.html?topic=ml', keywords: 'ml, machine learning, models, data' },
    { title: 'Deep Learning', category: 'AI', url: 'learn.html?topic=dl', keywords: 'dl, deep learning, neural networks, tensorflow' },
    { title: 'Data Structures', category: 'CS', url: 'learn.html?topic=dsa', keywords: 'dsa, algorithms, data structures, arrays, trees' },
    { title: 'DBMS', category: 'CS', url: 'learn.html?topic=dbms', keywords: 'dbms, database, sql, storage' }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initLoading();
    initTheme();
    initAuth();
    initSearch();
    initAnimations();
    initUI();
    initMouseGlow();
    initLearning();
});

// Loading Animation
function initLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        if (document.readyState === 'complete') {
            finishLoading(overlay);
        } else {
            window.addEventListener('load', () => finishLoading(overlay));
        }
    }
}

function finishLoading(overlay) {
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => { overlay.style.display = 'none'; }, 500);
    }, 500);
}

// Theme Management
function initTheme() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle?.querySelector('i');

    html.setAttribute('data-theme', appState.theme);
    updateThemeIcon(icon, appState.theme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', appState.theme);
            localStorage.setItem('theme', appState.theme);
            updateThemeIcon(icon, appState.theme);
        });
    }
}

function updateThemeIcon(icon, theme) {
    if (!icon) return;
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Auth
function initAuth() {
    const authButtons = document.getElementById('auth-buttons');
    const userProfile = document.getElementById('user-profile');
    const logoutBtn = document.getElementById('logout-btn');

    if (appState.user) {
        if (authButtons) authButtons.classList.add('hidden');
        if (userProfile) {
            userProfile.classList.remove('hidden');
            userProfile.classList.add('flex');
            const navUserName = document.getElementById('nav-user-name');
            if (navUserName) navUserName.textContent = appState.user.name || 'User';
            updateProfileStats();
        }
    } else {
        if (authButtons) authButtons.classList.remove('hidden');
        if (userProfile) {
            userProfile.classList.add('hidden');
            userProfile.classList.remove('flex');
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }
}

// Search
function initSearch() {
    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');

    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
            searchResults.classList.add('hidden');
            return;
        }

        const results = searchData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.keywords.includes(query)
        );

        renderSearchResults(results, searchResults);
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('hidden');
        }
    });
}

function renderSearchResults(results, container) {
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<div class="p-4 text-center text-sm text-gray-500">No results found</div>';
    } else {
        results.forEach(result => {
            const div = document.createElement('a');
            div.href = result.url;
            div.className = 'block p-3 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-3 text-decoration-none text-inherit';
            div.innerHTML = `
                <div class="w-8 h-8 rounded bg-accent/10 flex items-center justify-center text-accent">
                    <i class="fas fa-hashtag"></i>
                </div>
                <div>
                    <div class="font-medium">${result.title}</div>
                    <div class="text-xs opacity-60">${result.category}</div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    container.classList.remove('hidden');
}

// Animations
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.card').forEach(card => observer.observe(card));
}

// UI Utilities
function initUI() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Mouse Glow Effect
function initMouseGlow() {
    document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Progress Tracking
function markTopicComplete(topicId) {
    if (!appState.user) {
        if (confirm('You are not logged in. Progress will only be saved locally. Login to sync?')) {
            // proceed
        }
    }

    const progress = JSON.parse(localStorage.getItem('user_progress')) || {};

    if (!progress[topicId]) {
        progress[topicId] = true;
        localStorage.setItem('user_progress', JSON.stringify(progress));

        // Update streak
        const lastLogin = localStorage.getItem('last_login_date');
        const today = new Date().toDateString();
        if (lastLogin !== today) {
            let streak = parseInt(localStorage.getItem('user_streak') || '0');
            streak++;
            localStorage.setItem('user_streak', streak.toString());
            localStorage.setItem('last_login_date', today);
        }

        alert('Topic marked as complete! 🎉');
        updateProfileStats();
        logUserActivity();
    } else {
        alert('You already completed this topic!');
    }
}

function updateProfileStats() {
    const streakEl = document.getElementById('stat-streak');
    const completedEl = document.getElementById('stat-completed');

    if (streakEl) {
        const streak = localStorage.getItem('user_streak') || '0';
        streakEl.textContent = `${streak} Days`;
    }

    if (completedEl) {
        const progress = JSON.parse(localStorage.getItem('user_progress')) || {};
        const count = Object.keys(progress).length;
        completedEl.textContent = `${count} Topics`;
    }
    renderStreakGraph();
}

// Activity Tracking
function logUserActivity() {
    const activity = JSON.parse(localStorage.getItem('user_activity')) || {};
    const today = new Date().toISOString().split('T')[0];
    activity[today] = (activity[today] || 0) + 1;
    localStorage.setItem('user_activity', JSON.stringify(activity));
    renderStreakGraph();
}

function renderStreakGraph() {
    const container = document.getElementById('streak-graph');
    if (!container) return;

    container.innerHTML = '';

    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364); // Approx 1 year

    const startDay = startDate.getDay(); // 0 = Sun

    for (let i = 0; i < startDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'w-3 h-3'; // Placeholder
        container.appendChild(empty);
    }

    const activity = JSON.parse(localStorage.getItem('user_activity')) || {};

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        const count = activity[dateStr] || 0;

        const day = document.createElement('div');
        day.className = 'w-3 h-3 rounded-sm transition-all duration-300 hover:scale-125 cursor-pointer';
        day.title = `${d.toDateString()}: ${count} contributions`;

        if (count === 0) day.style.backgroundColor = '#1e1e1e';
        else if (count <= 2) day.style.backgroundColor = 'rgba(139, 92, 246, 0.4)';
        else if (count <= 5) day.style.backgroundColor = 'rgba(139, 92, 246, 0.7)';
        else day.style.backgroundColor = 'var(--accent)';

        container.appendChild(day);
    }

    setTimeout(() => {
        if (container.parentElement) {
            container.parentElement.scrollLeft = container.parentElement.scrollWidth;
        }
    }, 100);
}

const courseData = {
    html: {
        title: 'HTML Mastery',
        description: 'Master the structure of the web with semantic HTML5',
        modules: [
            { id: 'intro', title: 'Introduction to HTML', content: '<h1>Introduction to HTML</h1><p>HTML (HyperText Markup Language) is the standard markup language for creating web pages.</p><h2>What is HTML?</h2><ul><li>HTML stands for Hyper Text Markup Language</li><li>HTML describes the structure of a Web page</li><li>HTML consists of a series of elements</li></ul>' },
            { id: 'elements', title: 'HTML Elements', content: '<h1>HTML Elements</h1><p>An HTML element is defined by a start tag, some content, and an end tag.</p><h2>Common Elements</h2><ul><li>&lt;p&gt; - Paragraph</li><li>&lt;h1&gt; to &lt;h6&gt; - Headings</li><li>&lt;a&gt; - Links</li><li>&lt;img&gt; - Images</li></ul>' },
            { id: 'attributes', title: 'HTML Attributes', content: '<h1>HTML Attributes</h1><p>Attributes provide additional information about elements.</p><h2>Common Attributes</h2><ul><li>class - Specifies CSS class</li><li>id - Unique identifier</li><li>style - Inline CSS</li><li>src - Source for images/scripts</li></ul>' },
            { id: 'forms', title: 'HTML Forms', content: '<h1>HTML Forms</h1><p>Forms are used to collect user input.</p><h2>Form Elements</h2><ul><li>&lt;input&gt; - Input field</li><li>&lt;textarea&gt; - Multi-line text</li><li>&lt;button&gt; - Clickable button</li><li>&lt;select&gt; - Dropdown list</li></ul>' },
            { id: 'semantic', title: 'Semantic HTML', content: '<h1>Semantic HTML</h1><p>Semantic elements clearly describe their meaning.</p><h2>Semantic Tags</h2><ul><li>&lt;header&gt; - Header content</li><li>&lt;nav&gt; - Navigation links</li><li>&lt;article&gt; - Independent content</li><li>&lt;footer&gt; - Footer content</li></ul>' }
        ]
    },
    python: {
        title: 'Python Programming',
        description: 'Versatile language for Web, Data Science, and AI',
        modules: [
            { id: 'intro', title: 'Python Introduction', content: '<h1>Python Introduction</h1><p>Python is a high-level, interpreted programming language known for its simplicity and readability.</p><h2>Why Python?</h2><ul><li>Easy to learn and read</li><li>Extensive libraries</li><li>Versatile applications</li><li>Strong community support</li></ul>' },
            { id: 'variables', title: 'Variables & Data Types', content: '<h1>Python Variables</h1><p>Variables are containers for storing data values.</p><h2>Data Types</h2><ul><li>int - Integer numbers</li><li>float - Decimal numbers</li><li>str - Text strings</li><li>bool - True/False</li><li>list - Ordered collections</li></ul>' },
            { id: 'control', title: 'Control Flow', content: '<h1>Control Flow</h1><p>Control the execution flow of your programs.</p><h2>Statements</h2><ul><li>if/elif/else - Conditional execution</li><li>for loops - Iterate over sequences</li><li>while loops - Repeat while condition is true</li><li>break/continue - Loop control</li></ul>' },
            { id: 'functions', title: 'Functions', content: '<h1>Python Functions</h1><p>Functions are reusable blocks of code.</p><h2>Key Concepts</h2><ul><li>def keyword - Define functions</li><li>Parameters - Input values</li><li>Return values - Output</li><li>Lambda functions - Anonymous functions</li></ul>' },
            { id: 'oop', title: 'Object-Oriented Programming', content: '<h1>OOP in Python</h1><p>Object-oriented programming organizes code using classes and objects.</p><h2>Core Concepts</h2><ul><li>Classes - Blueprints for objects</li><li>Objects - Instances of classes</li><li>Inheritance - Reuse code</li><li>Encapsulation - Data hiding</li></ul>' }
        ]
    },
    css: {
        title: 'CSS Mastery',
        description: 'Style your pages with modern CSS, Flexbox, and Grid',
        modules: [
            { id: 'intro', title: 'CSS Introduction', content: '<h1>CSS Introduction</h1><p>CSS (Cascading Style Sheets) controls the visual presentation of web pages.</p><h2>CSS Syntax</h2><ul><li>Selectors - Target elements</li><li>Properties - Style attributes</li><li>Values - Property settings</li><li>Declarations - Property-value pairs</li></ul>' },
            { id: 'selectors', title: 'CSS Selectors', content: '<h1>CSS Selectors</h1><p>Selectors target HTML elements to apply styles.</p><h2>Types</h2><ul><li>Element selectors</li><li>Class selectors (.class)</li><li>ID selectors (#id)</li><li>Attribute selectors</li><li>Pseudo-classes</li></ul>' },
            { id: 'box-model', title: 'CSS Box Model', content: '<h1>CSS Box Model</h1><p>Every element is a rectangular box with content, padding, border, and margin.</p><h2>Components</h2><ul><li>Content - The actual content</li><li>Padding - Space inside border</li><li>Border - Edge of the box</li><li>Margin - Space outside border</li></ul>' },
            { id: 'flexbox', title: 'Flexbox Layout', content: '<h1>Flexbox Layout</h1><p>Flexbox is a one-dimensional layout method for arranging items.</p><h2>Properties</h2><ul><li>display: flex</li><li>justify-content - Horizontal alignment</li><li>align-items - Vertical alignment</li><li>flex-direction - Row or column</li></ul>' },
            { id: 'grid', title: 'CSS Grid', content: '<h1>CSS Grid</h1><p>Grid is a two-dimensional layout system.</p><h2>Grid Properties</h2><ul><li>display: grid</li><li>grid-template-columns</li><li>grid-template-rows</li><li>gap - Spacing between items</li></ul>' }
        ]
    },
    javascript: {
        title: 'JavaScript Mastery',
        description: 'Add interactivity and logic to your web applications',
        modules: [
            { id: 'intro', title: 'JavaScript Basics', content: '<h1>JavaScript Introduction</h1><p>JavaScript is a programming language that enables interactive web pages.</p><h2>Core Features</h2><ul><li>Dynamic typing</li><li>Event-driven</li><li>Client-side execution</li><li>Asynchronous programming</li></ul>' },
            { id: 'dom', title: 'DOM Manipulation', content: '<h1>DOM Manipulation</h1><p>The DOM (Document Object Model) represents the page structure.</p><h2>Methods</h2><ul><li>getElementById()</li><li>querySelector()</li><li>createElement()</li><li>appendChild()</li></ul>' },
            { id: 'events', title: 'Event Handling', content: '<h1>Event Handling</h1><p>Events are actions that can be detected by JavaScript.</p><h2>Common Events</h2><ul><li>click - Mouse click</li><li>submit - Form submission</li><li>keypress - Keyboard input</li><li>load - Page loaded</li></ul>' },
            { id: 'async', title: 'Async JavaScript', content: '<h1>Asynchronous JavaScript</h1><p>Handle asynchronous operations effectively.</p><h2>Techniques</h2><ul><li>Callbacks</li><li>Promises</li><li>Async/Await</li><li>Fetch API</li></ul>' },
            { id: 'es6', title: 'Modern JavaScript (ES6+)', content: '<h1>Modern JavaScript</h1><p>ES6 introduced powerful new features.</p><h2>New Features</h2><ul><li>Arrow functions</li><li>Template literals</li><li>Destructuring</li><li>Modules</li><li>Classes</li></ul>' }
        ]
    },
    java: {
        title: 'Java Development',
        description: 'Enterprise-grade applications and Android development',
        modules: [
            { id: 'intro', title: 'Java Fundamentals', content: '<h1>Java Fundamentals</h1><p>Java is a class-based, object-oriented programming language.</p><h2>Key Features</h2><ul><li>Platform independent</li><li>Object-oriented</li><li>Robust and secure</li><li>Multithreaded</li></ul>' },
            { id: 'oop', title: 'OOP Concepts', content: '<h1>OOP in Java</h1><p>Java is built around object-oriented principles.</p><h2>Principles</h2><ul><li>Encapsulation</li><li>Inheritance</li><li>Polymorphism</li><li>Abstraction</li></ul>' },
            { id: 'collections', title: 'Collections Framework', content: '<h1>Java Collections</h1><p>Collections provide data structures for storing groups of objects.</p><h2>Types</h2><ul><li>List - Ordered collection</li><li>Set - Unique elements</li><li>Map - Key-value pairs</li><li>Queue - FIFO structure</li></ul>' },
            { id: 'exceptions', title: 'Exception Handling', content: '<h1>Exception Handling</h1><p>Manage errors and exceptional conditions gracefully.</p><h2>Keywords</h2><ul><li>try - Code to monitor</li><li>catch - Handle exceptions</li><li>finally - Always execute</li><li>throw - Raise exception</li></ul>' },
            { id: 'streams', title: 'Streams & Lambda', content: '<h1>Streams & Lambda</h1><p>Java 8 introduced functional programming features.</p><h2>Concepts</h2><ul><li>Lambda expressions</li><li>Stream API</li><li>Method references</li><li>Functional interfaces</li></ul>' }
        ]
    },
    cpp: {
        title: 'C++ Programming',
        description: 'High-performance systems and game development',
        modules: [
            { id: 'intro', title: 'C++ Basics', content: '<h1>C++ Introduction</h1><p>C++ is a powerful general-purpose programming language.</p><h2>Features</h2><ul><li>Object-oriented</li><li>Low-level memory manipulation</li><li>High performance</li><li>Rich standard library</li></ul>' },
            { id: 'pointers', title: 'Pointers & References', content: '<h1>Pointers</h1><p>Direct memory access and manipulation.</p><h2>Concepts</h2><ul><li>Memory addresses</li><li>Pointer arithmetic</li><li>References</li><li>Dynamic memory allocation</li></ul>' },
            { id: 'oop', title: 'OOP in C++', content: '<h1>Classes & Objects</h1><p>Building blocks of C++ applications.</p><h2>Features</h2><ul><li>Constructors/Destructors</li><li>Inheritance</li><li>Polymorphism</li><li>Virtual functions</li></ul>' },
            { id: 'stl', title: 'STL', content: '<h1>Standard Template Library</h1><p>Collection of algorithms and data structures.</p><h2>Components</h2><ul><li>Containers (vector, map)</li><li>Algorithms (sort, find)</li><li>Iterators</li><li>Functors</li></ul>' },
            { id: 'modern', title: 'Modern C++', content: '<h1>Modern C++ (11/14/17/20)</h1><p>New features for safer and faster code.</p><h2>Features</h2><ul><li>Smart pointers</li><li>Lambda expressions</li><li>Auto keyword</li><li>Move semantics</li></ul>' }
        ]
    },
    c: {
        title: 'C Language',
        description: 'The foundation of modern computing systems',
        modules: [
            { id: 'intro', title: 'C Introduction', content: '<h1>C Language</h1><p>The mother of all modern programming languages.</p><h2>Why C?</h2><ul><li>Efficiency</li><li>Portability</li><li>Low-level access</li><li>Simple syntax</li></ul>' },
            { id: 'syntax', title: 'Syntax & Types', content: '<h1>Basic Syntax</h1><p>Structure of a C program.</p><h2>Elements</h2><ul><li>main() function</li><li>Data types (int, char, float)</li><li>Variables</li><li>Constants</li></ul>' },
            { id: 'pointers', title: 'Pointers', content: '<h1>Pointers in C</h1><p>The most powerful feature of C.</p><h2>Usage</h2><ul><li>Address operator (&)</li><li>Dereference operator (*)</li><li>Pointer arithmetic</li><li>Function pointers</li></ul>' },
            { id: 'structs', title: 'Structures', content: '<h1>Structures</h1><p>User-defined data types.</p><h2>Concepts</h2><ul><li>struct definition</li><li>Accessing members</li><li>Nested structures</li><li>Unions</li></ul>' },
            { id: 'fileio', title: 'File I/O', content: '<h1>File Handling</h1><p>Reading and writing files.</p><h2>Functions</h2><ul><li>fopen()</li><li>fprintf()</li><li>fscanf()</li><li>fclose()</li></ul>' }
        ]
    },
    csharp: {
        title: 'C# .NET',
        description: 'Windows applications and Unity game development',
        modules: [
            { id: 'intro', title: 'C# Introduction', content: '<h1>C# & .NET</h1><p>Modern, object-oriented language by Microsoft.</p><h2>Features</h2><ul><li>Type safety</li><li>Garbage collection</li><li>Rich library</li><li>Cross-platform (.NET Core)</li></ul>' },
            { id: 'oop', title: 'OOP in C#', content: '<h1>Object-Oriented C#</h1><p>Core OOP principles.</p><h2>Concepts</h2><ul><li>Classes & Structs</li><li>Interfaces</li><li>Properties</li><li>Events & Delegates</li></ul>' },
            { id: 'linq', title: 'LINQ', content: '<h1>LINQ</h1><p>Language Integrated Query.</p><h2>Usage</h2><ul><li>Querying collections</li><li>Filtering & Sorting</li><li>Projections</li><li>Lambda syntax</li></ul>' },
            { id: 'async', title: 'Async Programming', content: '<h1>Async/Await</h1><p>Asynchronous programming made easy.</p><h2>Keywords</h2><ul><li>async modifier</li><li>await operator</li><li>Task class</li><li>Concurrency</li></ul>' },
            { id: 'unity', title: 'Unity Basics', content: '<h1>Unity Scripting</h1><p>Game development with C#.</p><h2>Concepts</h2><ul><li>MonoBehaviour</li><li>GameObjects</li><li>Update loop</li><li>Physics</li></ul>' }
        ]
    },
    php: {
        title: 'PHP Development',
        description: 'Server-side scripting and web development',
        modules: [
            { id: 'intro', title: 'PHP Basics', content: '<h1>PHP Introduction</h1><p>Hypertext Preprocessor for web development.</p><h2>Features</h2><ul><li>Server-side execution</li><li>Database integration</li><li>Easy to learn</li><li>Open source</li></ul>' },
            { id: 'syntax', title: 'Syntax & Variables', content: '<h1>PHP Syntax</h1><p>Writing PHP scripts.</p><h2>Basics</h2><ul><li>&lt;?php tags</li><li>Variables ($var)</li><li>Data types</li><li>Strings</li></ul>' },
            { id: 'forms', title: 'Form Handling', content: '<h1>Forms & Input</h1><p>Processing user data.</p><h2>Superglobals</h2><ul><li>$_GET</li><li>$_POST</li><li>$_REQUEST</li><li>Form validation</li></ul>' },
            { id: 'mysql', title: 'MySQL Integration', content: '<h1>Database Connectivity</h1><p>Connecting to databases.</p><h2>Methods</h2><ul><li>MySQLi</li><li>PDO</li><li>CRUD operations</li><li>Prepared statements</li></ul>' },
            { id: 'sessions', title: 'Sessions & Cookies', content: '<h1>State Management</h1><p>Maintaining user state.</p><h2>Concepts</h2><ul><li>Session start</li><li>Setting cookies</li><li>Login systems</li><li>Security</li></ul>' }
        ]
    },
    ai: {
        title: 'Artificial Intelligence',
        description: 'Build intelligent systems and neural networks',
        modules: [
            { id: 'intro', title: 'AI Fundamentals', content: '<h1>Introduction to AI</h1><p>Creating intelligent machines.</p><h2>Types</h2><ul><li>Narrow AI</li><li>General AI</li><li>Machine Learning</li><li>Deep Learning</li></ul>' },
            { id: 'search', title: 'Search Algorithms', content: '<h1>Search Strategies</h1><p>Finding solutions in problem spaces.</p><h2>Algorithms</h2><ul><li>BFS & DFS</li><li>A* Search</li><li>Minimax</li><li>Alpha-Beta Pruning</li></ul>' },
            { id: 'knowledge', title: 'Knowledge Representation', content: '<h1>Knowledge & Logic</h1><p>Representing information.</p><h2>Methods</h2><ul><li>Propositional Logic</li><li>First-Order Logic</li><li>Knowledge Graphs</li><li>Expert Systems</li></ul>' },
            { id: 'nlp', title: 'NLP Basics', content: '<h1>Natural Language Processing</h1><p>Understanding human language.</p><h2>Tasks</h2><ul><li>Tokenization</li><li>Sentiment Analysis</li><li>Named Entity Recognition</li><li>Machine Translation</li></ul>' },
            { id: 'ethics', title: 'AI Ethics', content: '<h1>Ethics & Safety</h1><p>Responsible AI development.</p><h2>Issues</h2><ul><li>Bias & Fairness</li><li>Privacy</li><li>Transparency</li><li>Job displacement</li></ul>' }
        ]
    },
    ml: {
        title: 'Machine Learning',
        description: 'Create predictive models and algorithms',
        modules: [
            { id: 'intro', title: 'ML Basics', content: '<h1>Machine Learning Intro</h1><p>Learning from data without explicit programming.</p><h2>Types</h2><ul><li>Supervised Learning</li><li>Unsupervised Learning</li><li>Reinforcement Learning</li></ul>' },
            { id: 'regression', title: 'Regression', content: '<h1>Regression Analysis</h1><p>Predicting continuous values.</p><h2>Algorithms</h2><ul><li>Linear Regression</li><li>Polynomial Regression</li><li>Metrics (MSE, R2)</li></ul>' },
            { id: 'classification', title: 'Classification', content: '<h1>Classification</h1><p>Predicting categories.</p><h2>Algorithms</h2><ul><li>Logistic Regression</li><li>Decision Trees</li><li>SVM</li><li>KNN</li></ul>' },
            { id: 'clustering', title: 'Clustering', content: '<h1>Clustering</h1><p>Grouping similar data points.</p><h2>Algorithms</h2><ul><li>K-Means</li><li>Hierarchical Clustering</li><li>DBSCAN</li></ul>' },
            { id: 'evaluation', title: 'Model Evaluation', content: '<h1>Model Evaluation</h1><p>Measuring performance.</p><h2>Metrics</h2><ul><li>Accuracy</li><li>Precision & Recall</li><li>F1 Score</li><li>Confusion Matrix</li></ul>' }
        ]
    },
    dl: {
        title: 'Deep Learning',
        description: 'Advanced neural networks and AI models',
        modules: [
            { id: 'intro', title: 'Neural Networks', content: '<h1>Neural Networks</h1><p>Inspired by the human brain.</p><h2>Components</h2><ul><li>Neurons</li><li>Layers (Input, Hidden, Output)</li><li>Weights & Biases</li><li>Activation Functions</li></ul>' },
            { id: 'training', title: 'Training Networks', content: '<h1>Training Process</h1><p>How networks learn.</p><h2>Concepts</h2><ul><li>Forward Propagation</li><li>Loss Functions</li><li>Backpropagation</li><li>Gradient Descent</li></ul>' },
            { id: 'cnn', title: 'CNNs', content: '<h1>Convolutional Neural Networks</h1><p>Processing visual data.</p><h2>Layers</h2><ul><li>Convolution</li><li>Pooling</li><li>Flattening</li><li>Fully Connected</li></ul>' },
            { id: 'rnn', title: 'RNNs', content: '<h1>Recurrent Neural Networks</h1><p>Processing sequential data.</p><h2>Types</h2><ul><li>Simple RNN</li><li>LSTM</li><li>GRU</li><li>Sequence-to-Sequence</li></ul>' },
            { id: 'frameworks', title: 'DL Frameworks', content: '<h1>Tools & Libraries</h1><p>Building DL models.</p><h2>Popular Tools</h2><ul><li>TensorFlow</li><li>PyTorch</li><li>Keras</li><li>JAX</li></ul>' }
        ]
    },
    dsa: {
        title: 'Data Structures & Algorithms',
        description: 'Master problem-solving fundamentals',
        modules: [
            { id: 'arrays', title: 'Arrays & Strings', content: '<h1>Arrays & Strings</h1><p>Fundamental linear data structures.</p><h2>Operations</h2><ul><li>Traversal</li><li>Insertion/Deletion</li><li>Searching</li><li>Sliding Window</li></ul>' },
            { id: 'linkedlist', title: 'Linked Lists', content: '<h1>Linked Lists</h1><p>Dynamic linear data structures.</p><h2>Types</h2><ul><li>Singly Linked List</li><li>Doubly Linked List</li><li>Circular Linked List</li></ul>' },
            { id: 'stacks', title: 'Stacks & Queues', content: '<h1>Stacks & Queues</h1><p>LIFO and FIFO structures.</p><h2>Applications</h2><ul><li>Function calls</li><li>Expression evaluation</li><li>Task scheduling</li><li>BFS</li></ul>' },
            { id: 'trees', title: 'Trees & Graphs', content: '<h1>Trees & Graphs</h1><p>Hierarchical and relational structures.</p><h2>Concepts</h2><ul><li>Binary Trees</li><li>BST</li><li>Graph Traversal</li><li>Shortest Path</li></ul>' },
            { id: 'sorting', title: 'Sorting & Searching', content: '<h1>Algorithms</h1><p>Organizing and finding data.</p><h2>Algorithms</h2><ul><li>Bubble/Selection/Insertion Sort</li><li>Merge/Quick Sort</li><li>Binary Search</li><li>Hashing</li></ul>' }
        ]
    },
    dbms: {
        title: 'Database Management',
        description: 'SQL, NoSQL, and data modeling mastery',
        modules: [
            { id: 'intro', title: 'DBMS Overview', content: '<h1>Introduction to DBMS</h1><p>Managing data efficiently.</p><h2>Concepts</h2><ul><li>Data Models</li><li>ACID Properties</li><li>Transactions</li><li>Normalization</li></ul>' },
            { id: 'sql', title: 'SQL Basics', content: '<h1>SQL Language</h1><p>Structured Query Language.</p><h2>Commands</h2><ul><li>SELECT</li><li>INSERT, UPDATE, DELETE</li><li>CREATE, ALTER, DROP</li><li>Joins</li></ul>' },
            { id: 'modeling', title: 'Data Modeling', content: '<h1>ER Modeling</h1><p>Designing database schemas.</p><h2>Elements</h2><ul><li>Entities</li><li>Attributes</li><li>Relationships</li><li>Keys (Primary, Foreign)</li></ul>' },
            { id: 'nosql', title: 'NoSQL Databases', content: '<h1>NoSQL</h1><p>Non-relational databases.</p><h2>Types</h2><ul><li>Document (MongoDB)</li><li>Key-Value (Redis)</li><li>Column-family</li><li>Graph</li></ul>' },
            { id: 'indexing', title: 'Indexing & Optimization', content: '<h1>Performance</h1><p>Speeding up queries.</p><h2>Techniques</h2><ul><li>B-Trees</li><li>Hash Indexes</li><li>Query Optimization</li><li>Caching</li></ul>' }
        ]
    }
};

// Learning System

// Learning System
function initLearning() {
    const urlParams = new URLSearchParams(window.location.search);
    const topic = urlParams.get('topic');
    const moduleId = urlParams.get('module');

    const sidebar = document.getElementById('course-sidebar');
    const contentArea = document.getElementById('lesson-content');

    if (!sidebar || !contentArea) return;

    if (!topic || !courseData[topic]) {
        contentArea.innerHTML = '<h1>Topic not found</h1><p>Please select a valid topic from the home page.</p>';
        return;
    }

    const course = courseData[topic];
    const courseTitle = document.getElementById('course-title');
    if (courseTitle) {
        courseTitle.textContent = course.title;
    }

    const moduleList = document.getElementById('module-list');
    if (moduleList) {
        moduleList.innerHTML = '';

        course.modules.forEach((mod, index) => {
            const link = document.createElement('a');
            link.href = `learn.html?topic=${topic}&module=${mod.id}`;
            link.className = `module-link ${moduleId === mod.id || (!moduleId && index === 0) ? 'active' : ''}`;
            link.textContent = `${index + 1}. ${mod.title}`;
            moduleList.appendChild(link);
        });
    }

    const currentModule = moduleId ? course.modules.find(m => m.id === moduleId) : course.modules[0];

    if (currentModule) {
        contentArea.innerHTML = currentModule.content;

        // Add "Mark as Complete" button
        const completeBtn = document.createElement('button');
        completeBtn.className = 'btn btn-primary mt-8';
        completeBtn.innerHTML = '<i class="fas fa-check-circle"></i> Mark as Complete';
        completeBtn.onclick = () => markTopicComplete(topic);
        contentArea.appendChild(completeBtn);

        const currentIndex = course.modules.indexOf(currentModule);
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (prevBtn && currentIndex > 0) {
            prevBtn.classList.remove('hidden');
            prevBtn.onclick = () => window.location.href = `learn.html?topic=${topic}&module=${course.modules[currentIndex - 1].id}`;
        }

        if (nextBtn && currentIndex < course.modules.length - 1) {
            nextBtn.classList.remove('hidden');
            nextBtn.onclick = () => window.location.href = `learn.html?topic=${topic}&module=${course.modules[currentIndex + 1].id}`;
        }

        // Log activity when viewing a lesson
        logUserActivity();
    }
}
