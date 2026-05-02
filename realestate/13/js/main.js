document.addEventListener("DOMContentLoaded", () => {
    // Note: The WhatsApp button natively operates via the href mailto/wa.me link,
    // requiring no JS interception to remain robust and fail-safe.

    console.log("Parabot system initialized. WhatsApp lead generation active.");
});
document.addEventListener("DOMContentLoaded", () => {

    // --- Mobile Menu Toggle Logic ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 767) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Dynamic Component Injection Logic ---
    loadGlobalFooter();
});

// Function to load the external footer into a specific container
function loadGlobalFooter() {
    const footerContainer = document.getElementById('global-footer-container');

    // Only attempt to load if the container exists on the page
    if (footerContainer) {
        fetch('components/footer.html')
            .then(response => {
                if (!response.ok) throw new Error("Failed to load footer component");
                return response.text();
            })
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }
}