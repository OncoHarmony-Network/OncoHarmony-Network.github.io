(function () {
    function loadBusuanzi() {
        if (document.getElementById('busuanzi-script')) {
            return;
        }

        var script = document.createElement('script');
        script.id = 'busuanzi-script';
        script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
        script.async = true;
        document.body.appendChild(script);
    }

    function executeScripts(container) {
        container.querySelectorAll('script').forEach(function (oldScript) {
            var newScript = document.createElement('script');

            Array.from(oldScript.attributes).forEach(function (attr) {
                newScript.setAttribute(attr.name, attr.value);
            });

            newScript.textContent = oldScript.textContent;
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }

    function loadFooter() {
        var container = document.getElementById('footer-container');
        if (!container) {
            return Promise.resolve();
        }

        return fetch('components/footer.html')
            .then(function (response) {
                return response.text();
            })
            .then(function (html) {
                container.innerHTML = html;
                executeScripts(container);
                loadBusuanzi();
            })
            .catch(function (error) {
                console.error('Error loading footer:', error);
            });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadFooter);
    } else {
        loadFooter();
    }

    window.loadFooter = loadFooter;
})();
