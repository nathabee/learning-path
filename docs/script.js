// Import the precomputed metadata
import filesMetadata from './metadata.js';

document.addEventListener('DOMContentLoaded', function () { 

    const sidebar = document.getElementById('sidebar');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('search-results');
 

    


    /**************************************************** */
    // Function to generate sidebar HTML from files array
    function generateSidebarHTML() {
        // Generate sidebar content
        let sidebarContent = `
            <a href="https://github.com/nathabee">
            <img src="logo.png" alt="Logo">
            </a>
            <nav>
        `;
        
        let sidebarContentEnde = "";

        filesMetadata.forEach((file, index) => {
            if (file.filename === "debug.html") {
                sidebarContentEnde += `<ul id="setbottom"><li><a href="${file.filename}">${file.description}</a></li></ul>`;
            } else {
                sidebarContent += `<ul><li><a href="${file.filename}">${file.description}</a></li></ul>`;
            }
        });

        sidebarContent += sidebarContentEnde;
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


    /**************************************************** */
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
 

    /**************************************************** */
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


    /**************************************************** */
    // Function to get the last modified date of a file


 
    // Function to display last modified files in HTML
    function displayLastModifiedFiles(modifiedFiles) {
        const listContainer = document.getElementById('last-modified-files');
        if (!listContainer) return;

        let html = '<ul>';
        modifiedFiles.forEach(file => {
            html += `<li><a href="${file.filename}">${file.description}</a> - ${file.lastModified}</li>`;
        });
        html += '</ul>';
        listContainer.innerHTML = html;
    }

    // Ensure the function to display last modified files is called
    console.log('DOMContentLoaded event fired');

    // Sort files by last modified date (descending) and display
    filesMetadata.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
    console.log('Files sorted by last modified date:', filesMetadata);

    displayLastModifiedFiles(filesMetadata.slice(0, 10));
    /**************************************************** */
    
});

 
