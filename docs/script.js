document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');

    // Hardcoded content of nav.html
    sidebar.innerHTML = `
        <a href="https://github.com/nathawe">
          <img src="logo.png" alt="Logo">
        </a>
        <nav id="sidebar-nav">
            <ul><li><a href="index.html">Home</a></li></ul>
            <ul><li><a href="how_to_git.html">How to Git</a></li></ul>
            <ul><li><a href="how_to_install.html">How to Install</a></li></ul>
            <ul><li><a href="how_to_nextjs.html">How to Next JS</a></li></ul>
            <ul><li><a href="how_to_wordpress.html">How to WordPress</a></li></ul> 
            <ul id="setbottom"><li><a href="debug.html">DEBUGGING</a></li></ul>
        </nav>
    `;

    // Initialize collapsible sections
    initializeCollapsible();

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

function initializeCollapsible() {
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
}
