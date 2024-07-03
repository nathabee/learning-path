document.addEventListener('DOMContentLoaded', function () { 
    const sidebar = document.getElementById('sidebar');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('search-results');
 

 
    // Array of file names and descriptions
    const files = [
        { filename: 'index.html', description: 'Home' },
        { filename: 'how_to_git.html', description: 'How to Git' },
        { filename: 'how_to_deploy_github_page.html', description: 'How to deploy Github page' },
        { filename: 'how_to_install.html', description: 'How to Install' },
        { filename: 'how_to_nextjs.html', description: 'How to Next JS' },
        { filename: 'how_to_wordpress.html', description: 'How to Wordpress' },
        { filename: 'debug.html', description: 'DEBUGGING' }
    ];

    // Function to generate sidebar HTML from files array
    function generateSidebarHTML() {
        // Generate sidebar content
        let sidebarContent = `
            <a href="https://github.com/nathawe">
            <img src="logo.png" alt="Logo">
            </a>
            <nav>
        `;
        
        files.forEach((file, index) => {
            if (file.description === "DEBUGGING") {
                sidebarContent += `<ul id="setbottom"><li><a href="${file.filename}">${file.description}</a></li></ul>`;
            } else {
                sidebarContent += `<ul><li><a href="${file.filename}">${file.description}</a></li></ul>`;
            }
        });

        sidebarContent += `</nav>`;
        sidebar.innerHTML = sidebarContent;
    }

 
    // Function to handle search
    function handleSearch() {
        // Check if search input value exists
        if (searchInput && searchInput.value) {
            const searchTerm = searchInput.value.toLowerCase();
            const searchResults = files.filter(file =>
                file.description.toLowerCase().includes(searchTerm)
            );
            displaySearchResults(searchResults);
        }
    }

    // Function to display search results
    function displaySearchResults(results) {
        let resultsHTML = '';
        results.forEach(result => {
            resultsHTML += `<li><a href="${result.filename}">${result.description}</a></li>`;
        });
        resultsContainer.innerHTML = `<ul>${resultsHTML}</ul>`;
    }

    // Check if search button exists before adding event listener
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }

    // Generate sidebar HTML on page load
    generateSidebarHTML();


    // Initialize collapsible sections
    var coll = document.querySelectorAll('.collapsible');
    coll.forEach(function (item) {
        item.addEventListener('click', function () {
            this.classList.toggle('active');
            var content = this.querySelector('.content');
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
 

    // Add event listeners to links inside the main-content navigation
    var navLinks = document.querySelectorAll('#main-content nav ul li a');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default link behavior
            var targetId = this.getAttribute('href').substring(1); // Get target ID without '#'
            var targetElement = document.getElementById(targetId);
            if (targetElement && targetElement.classList.contains('collapsible')) {
                var clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                targetElement.dispatchEvent(clickEvent); // Simulate click on collapsible element
                targetElement.scrollIntoView({ behavior: 'smooth' }); // Optional: scroll to the element
            }
        });
    });
});

 
