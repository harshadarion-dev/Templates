import os
import glob

# Mapping of old footer links to new footer links
old_block = """                    <ul>
                        <li><a href="services.html">Timber frame houses</a></li>
                        <li><a href="services.html">Saunas</a></li>
                        <li><a href="services.html">Design</a></li>
                        <li><a href="services.html">Finishing</a></li>
                    </ul>"""

new_block = """                    <ul>
                        <li><a href="service-houses.html">Timber frame houses</a></li>
                        <li><a href="service-saunas.html">Saunas</a></li>
                        <li><a href="service-design.html">Design</a></li>
                        <li><a href="services.html">Finishing</a></li>
                    </ul>"""

files = glob.glob("*.html")
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if old_block in content:
        content = content.replace(old_block, new_block)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Updated footer in {f}")

print("Footer links update complete.")
