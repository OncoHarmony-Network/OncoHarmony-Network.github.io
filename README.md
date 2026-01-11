# OncoHarmony Network Website

A modern, professional academic website for the OncoHarmony Network, built with HTML, Tailwind CSS, and Font Awesome. Features a dynamic data loading system using YAML files for easy content management and automatic deployment to GitHub Pages.

## Features

- **Modern Design**: Clean, professional layout with a purple gradient theme
- **Responsive**: Optimized for desktop, tablet, and mobile devices
- **Dynamic Content**: YAML-based data loading for easy content management
- **GitHub Pages Ready**: Can be directly deployed to GitHub Pages
- **Automation Friendly**: Supports automatic updates via GitHub workflows
- **Robust Data Loading**: Smart path detection for both local and GitHub Pages environments

## Pages Included

1. **Home** - Introduction to the OncoHarmony Network
2. **About** - Our vision, mission, and collaborative network
3. **Members** - Core leadership, researchers, and collaborators
4. **Publications** - Research articles and publications
5. **Projects** - Current research initiatives and tools
6. **News** - Latest updates and highlights
7. **Contact** - Collaboration opportunities and contact information

## Getting Started

### Prerequisites

- A GitHub account
- Basic knowledge of YAML for content updates
- Python 3 (for local testing)

### Local Development

1. **Clone the Repository**
   ```bash
   git clone https://github.com/OncoHarmony-Network/OncoHarmony-website.git
   cd OncoHarmony-website
   ```

2. **Start a Local Server**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:8000` in your web browser
   - The website will load with data from the YAML files

### Deployment to GitHub Pages

1. **Create a GitHub Repository**
   - Create a new repository named `OncoHarmony-Network.github.io`
   - Or use an existing repository and enable GitHub Pages in the settings

2. **Push Files to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/OncoHarmony-Network/OncoHarmony-Network.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to Repository Settings > Pages
   - Select the main branch as the source
   - Click "Save"
   - Your website will be available at `https://oncoharmony-network.github.io/`

### Updating Content

All content is stored in YAML files in the `data/` directory. To update the website, edit these files:

- **General Information**: Edit `data/general.yml` (home and about page content)
- **Team Members**: Edit `data/members.yml`
- **Publications**: Edit `data/publications.yml`
- **Projects**: Edit `data/projects.yml`
- **News**: Edit `data/news.yml`

### Customization

#### Colors

The primary color theme is purple gradient. To change it, edit the `hero-gradient` class in each HTML file:

```css
.hero-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

#### Fonts

The website uses the Inter font from Google Fonts. To change it, update the font import in each HTML file:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

#### Icons

Icons are from Font Awesome. You can browse available icons at [fontawesome.com](https://fontawesome.com/).

## Project Structure

```
OncoHarmony-website/
├── index.html          # Home page
├── about.html          # About us page
├── members.html        # Team members page
├── publications.html   # Publications page
├── projects.html       # Projects page
├── news.html           # News page
├── contact.html        # Contact page
├── js/
│   └── data-loader.js  # Dynamic data loading script
├── data/
│   ├── general.yml     # General website content
│   ├── members.yml     # Team member information
│   ├── publications.yml # Research publications
│   ├── projects.yml    # Research projects
│   └── news.yml        # Latest news and updates
└── README.md           # This file
```

## Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Font Awesome**: Icon library (via CDN)
- **js-yaml**: YAML parsing library (via CDN)
- **Google Fonts**: Inter font family
- **Python**: For local development server

## Data Loading System

The website uses a robust data loading system (`js/data-loader.js`) that:

1. **Detects Environment**: Automatically identifies if running on GitHub Pages or local development
2. **Smart Path Resolution**: Tries multiple paths to ensure files are loaded correctly
3. **Error Handling**: Gracefully handles missing files with fallback content
4. **Async Loading**: Efficiently loads all YAML files in parallel
5. **Callback Support**: Allows pages to react when data is loaded

## Maintenance

- **Regular Updates**: Keep publications, projects, news, and team members current in the YAML files
- **Backup**: Maintain backups of important content
- **Local Testing**: Always test changes locally before pushing to GitHub
- **Monitoring**: Check GitHub Pages deployment status for errors

## Automation

You can set up GitHub Actions to automatically deploy updates when you push changes to the repository. Create a `.github/workflows/deploy.yml` file with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: .
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern academic websites
- Built with open-source technologies
- Optimized for GitHub Pages deployment
- Uses js-yaml for robust YAML parsing

## Contact

For questions or support, please contact the OncoHarmony Network team.
