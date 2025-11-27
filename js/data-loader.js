// Data loader class that uses js-yaml library for robust YAML parsing
class DataLoader {
    constructor() {
        this.data = {};
        this.loaded = false;
        this.callbacks = [];
        // Detect if running on GitHub Pages or local development
        this.baseUrl = this.detectBaseUrl();
    }
    
    // Detect the base URL for loading files
    detectBaseUrl() {
        const pathname = window.location.pathname;
        // Check if running on GitHub Pages with repo name in path
        if (pathname.includes('/OncoHarmony-website/')) {
            return '/OncoHarmony-website/';
        }
        // Check if running on GitHub Pages with custom domain
        if (window.location.hostname.includes('github.io')) {
            // Extract repo name from pathname
            const repoName = pathname.split('/')[1];
            if (repoName) {
                return `/${repoName}/`;
            }
        }
        // Default to relative path for local development
        return './';
    }
    
    async load() {
        if (this.loaded) return this.data;
        
        const files = [
            { name: 'members', path: 'data/members.yml' },
            { name: 'projects', path: 'data/projects.yml' },
            { name: 'publications', path: 'data/publications.yml' },
            { name: 'news', path: 'data/news.yml' },
            { name: 'general', path: 'data/general.yml' }
        ];
        
        // Try different path approaches to handle both file:// and http:// protocols
        // Start with the detected base URL
        const pathApproaches = [
            this.baseUrl,
            // Relative path (works for http://)
            './',
            // Relative path without leading dot (works for some cases)
            '',
            // Parent directory path (in case HTML is opened from subdirectory)
            '../'
        ];
        
        // Track which files have been successfully loaded
        const loadedFiles = new Set();
        
        // Try each path approach until all files are loaded or all approaches are exhausted
        for (const basePath of pathApproaches) {
            console.log(`DataLoader: Trying base path: ${basePath}`);
            
            // Only try to load files that haven't been loaded yet
            const filesToLoad = files.filter(file => !loadedFiles.has(file.name));
            
            if (filesToLoad.length === 0) {
                break; // All files loaded, exit loop
            }
            
            const promises = filesToLoad.map(async (file) => {
                try {
                    const fullPath = basePath + file.path;
                    console.log(`DataLoader: Loading ${fullPath}`);
                    
                    const response = await fetch(fullPath);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const yamlContent = await response.text();
                    this.data[file.name] = jsyaml.load(yamlContent);
                    console.log(`DataLoader: Successfully loaded ${file.name}`);
                    loadedFiles.add(file.name);
                    return true;
                } catch (error) {
                    console.error(`DataLoader: Error loading ${file.name}:`, error);
                    return false;
                }
            });
            
            await Promise.all(promises);
        }
        
        // Fill in empty objects for any files that failed to load
        files.forEach(file => {
            if (!this.data[file.name]) {
                this.data[file.name] = {};
            }
        });
        
        this.loaded = true;
        
        // Execute callbacks
        this.callbacks.forEach(callback => callback(this.data));
        
        return this.data;
    }
    
    onLoad(callback) {
        if (this.loaded) {
            callback(this.data);
        } else {
            this.callbacks.push(callback);
        }
    }
    
    getMembers() {
        return this.data.members || {};
    }
    
    getProjects() {
        return this.data.projects || {};
    }
    
    getPublications() {
        return this.data.publications || {};
    }
    
    getNews() {
        return this.data.news || {};
    }
    
    getGeneral() {
        return this.data.general || {};
    }
    
    // Reset the loader (useful for testing)
    reset() {
        this.data = {};
        this.loaded = false;
        this.callbacks = [];
    }
}

// Create a global instance
const dataLoader = new DataLoader();

// Helper function to populate HTML elements
function populateElement(selector, content) {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = content;
    }
}

// Helper function to create HTML elements
function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(key => {
        if (key === 'className') {
            element.className = attributes[key];
        } else if (key === 'innerHTML') {
            element.innerHTML = attributes[key];
        } else {
            element.setAttribute(key, attributes[key]);
        }
    });
    if (content) {
        element.textContent = content;
    }
    return element;
}

// Add error handling for js-yaml library
if (typeof jsyaml === 'undefined') {
    console.error('ERROR: js-yaml library is not loaded. Please include it before data-loader.js');
}