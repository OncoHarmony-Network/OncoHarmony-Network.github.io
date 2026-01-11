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
                    
                    // For local development, use relative paths directly
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
        const general = this.data.general || {};
        // Calculate stats dynamically
        if (general.home && general.home.stats) {
            general.home.stats = {
                institutions: this.calculateInstitutions(),
                researchers: this.calculateResearchers(),
                publications: this.calculatePublications(),
                projects: this.calculateProjects()
            };
        }
        return general;
    }
    
    // Calculate number of institutions
    calculateInstitutions() {
        let count = 0;
        const members = this.data.members || {};
        const institutions = new Set();
        
        // Count from leadership team
        if (members.leadership_team) {
            members.leadership_team.forEach(member => {
                if (member.institution) {
                    institutions.add(member.institution.replace(/<[^>]*>/g, '').trim());
                }
            });
        }
        
        // Count from advisory board
        if (members.advisory_board) {
            members.advisory_board.forEach(member => {
                if (member.institution) {
                    institutions.add(member.institution.replace(/<[^>]*>/g, '').trim());
                }
            });
        }
        
        // Count from collaborators
        if (members.others && members.others.collaborators) {
            const collaborators = members.others.collaborators;
            if (collaborators.academic_institutions) {
                collaborators.academic_institutions.forEach(inst => institutions.add(inst.trim()));
            }
            if (collaborators.research_centers) {
                collaborators.research_centers.forEach(inst => institutions.add(inst.trim()));
            }
            if (collaborators.industry_partners) {
                collaborators.industry_partners.forEach(inst => institutions.add(inst.trim()));
            }
        }
        
        return `${institutions.size}+`;
    }
    
    // Calculate number of researchers
    calculateResearchers() {
        let count = 0;
        const members = this.data.members || {};
        
        // Count leadership team
        if (members.leadership_team) {
            count += members.leadership_team.length;
        }
        
        // Count advisory board
        if (members.advisory_board) {
            count += members.advisory_board.length;
        }
        
        // Count students
        if (members.students) {
            count += members.students.length;
        }
        
        // Count research fellows
        if (members.others && members.others.research_fellows) {
            count += members.others.research_fellows.length;
        }
        
        return `${count}+`;
    }
    
    // Calculate number of publications
    calculatePublications() {
        const publications = this.data.publications || {};
        let count = 0;
        
        if (publications.publications) {
            Object.values(publications.publications).forEach(yearPublications => {
                if (Array.isArray(yearPublications)) {
                    count += yearPublications.length;
                }
            });
        }
        
        return count > 0 ? `${count}+` : "100+";
    }
    
    // Calculate number of projects
    calculateProjects() {
        const projects = this.data.projects || {};
        let count = 0;
        
        // Count featured projects
        if (projects.featured_projects) {
            count += projects.featured_projects.length;
        }
        
        // Count all projects
        if (projects.all_projects) {
            count += projects.all_projects.length;
        }
        
        return count > 0 ? `${count}+` : "20+";
    }
    
    // Load project details
    async loadProjectDetails(projectId) {
        try {
            const paths = [
                `${this.baseUrl}data/projects/${projectId}.yml`,
                `${this.baseUrl}data/projects/${projectId}.md`
            ];
            
            for (const path of paths) {
                try {
                    const response = await fetch(path);
                    if (response.ok) {
                        const content = await response.text();
                        if (path.endsWith('.yml')) {
                            return jsyaml.load(content);
                        } else if (path.endsWith('.md')) {
                            return { content };
                        }
                    }
                } catch (error) {
                    console.error(`Error loading project details from ${path}:`, error);
                }
            }
            return null;
        } catch (error) {
            console.error('Error loading project details:', error);
            return null;
        }
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