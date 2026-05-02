import os
import re
import glob

# The exact footer from index.html (with proper indentation)
FOOTER_HTML = """    <footer class="main-footer">
        <div class="container footer-grid">
            <div class="footer-info">
                <a href="index.html" class="logo white-logo">
                    <svg width="24" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <div class="logo-text"><strong>UNIPIX</strong><span>UNIVERSITY</span></div>
                </a>
                <p>Unipix University is one of the world's leading academic institutions.</p>
            </div>
            <div class="footer-links">
                <h4>Our Campus</h4>
                <ul>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="academics.html">Academics</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>Pages</h4>
                <ul>
                    <li><a href="event.html">Events</a></li>
                    <li><a href="blog.html">Blogs</a></li>
                </ul>
            </div>
            <div class="footer-subscribe">
                <h4>Subscribe</h4>
                <div class="subscribe-form">
                    <input type="email" placeholder="Your Email">
                    <button class="btn btn-red">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </footer>"""

def update_files():
    html_files = glob.glob(r"c:\Users\Harsha\Documents\10-Templates\6\*.html")
    for file_path in html_files:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        updated = False
        
        # 1. Update Navigation Bar Color to match index.html
        # Find header with style="background:var(--primary);" and remove the style
        # Also catch style="background: var(--primary);" etc.
        header_pattern = r'<header class="navbar container nav-container" style="background:\s*var\(--primary\);?">'
        new_header = r'<header class="navbar container nav-container">'
        
        if re.search(header_pattern, content):
            content = re.sub(header_pattern, new_header, content)
            updated = True
        
        # 2. Update Footer in detail to match index.html
        # We replace everything from <footer class="main-footer"> to </footer>
        footer_pattern = re.compile(r'<footer class="main-footer">.*?</footer>', re.DOTALL)
        if re.search(footer_pattern, content):
            # Ensure we're not just matching identical footers by avoiding replacing same with same if it's already perfect,
            # but replacing it entirely is safer.
            # We must be careful not to touch index.html if it's perfectly matching, but doing re.sub is fine anyway.
            # Compare strictly if we need, but blind replace works fine.
            content = re.sub(footer_pattern, FOOTER_HTML, content)
            updated = True

        if updated:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated {os.path.basename(file_path)}")

if __name__ == "__main__":
    update_files()
