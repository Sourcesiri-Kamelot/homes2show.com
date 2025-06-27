#!/usr/bin/env python3
"""
PDF Converter for Kiwon-Helo-IM-AI Pitch Deck
Converts markdown to professional PDF format
"""

import markdown
import pdfkit
import os
from pathlib import Path

def create_pdf_from_markdown(markdown_file, output_pdf, title="Kiwon-Helo-IM-AI Pitch Deck"):
    """Convert markdown file to PDF with professional styling"""
    
    # Read the markdown file
    with open(markdown_file, 'r', encoding='utf-8') as f:
        markdown_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(markdown_content, extensions=['tables', 'fenced_code'])
    
    # Add professional CSS styling
    css_style = """
    <style>
        body {
            font-family: 'Arial', 'Helvetica', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            font-size: 2.5em;
            text-align: center;
        }
        h2 {
            color: #34495e;
            border-bottom: 2px solid #e74c3c;
            padding-bottom: 8px;
            margin-top: 30px;
            font-size: 1.8em;
        }
        h3 {
            color: #2980b9;
            margin-top: 25px;
            font-size: 1.4em;
        }
        h4 {
            color: #8e44ad;
            margin-top: 20px;
            font-size: 1.2em;
        }
        pre, code {
            background-color: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 4px;
            padding: 10px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #3498db;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .highlight {
            background-color: #fff3cd;
            padding: 15px;
            border-left: 4px solid #ffc107;
            margin: 20px 0;
        }
        .page-break {
            page-break-before: always;
        }
        @page {
            margin: 1in;
            @bottom-center {
                content: "Kiwon-Helo-IM-AI Pitch Deck - Page " counter(page);
                font-size: 10px;
                color: #666;
            }
        }
    </style>
    """
    
    # Combine CSS and HTML
    full_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>{title}</title>
        {css_style}
    </head>
    <body>
        {html_content}
    </body>
    </html>
    """
    
    # PDF options
    options = {
        'page-size': 'A4',
        'margin-top': '0.75in',
        'margin-right': '0.75in',
        'margin-bottom': '0.75in',
        'margin-left': '0.75in',
        'encoding': "UTF-8",
        'no-outline': None,
        'enable-local-file-access': None
    }
    
    try:
        # Convert HTML to PDF
        pdfkit.from_string(full_html, output_pdf, options=options)
        print(f"✅ PDF created successfully: {output_pdf}")
        return True
    except Exception as e:
        print(f"❌ Error creating PDF: {e}")
        print("💡 Make sure you have wkhtmltopdf installed:")
        print("   macOS: brew install wkhtmltopdf")
        print("   Ubuntu: sudo apt-get install wkhtmltopdf")
        print("   Windows: Download from https://wkhtmltopdf.org/downloads.html")
        return False

def main():
    """Main function to convert both versions to PDF"""
    
    current_dir = Path(__file__).parent
    
    # Convert professional version
    professional_md = current_dir / "PROFESSIONAL_PITCH_DECK.md"
    professional_pdf = current_dir / "Kiwon_Helo_AI_Professional_Pitch_Deck.pdf"
    
    if professional_md.exists():
        print("🔄 Converting professional version to PDF...")
        create_pdf_from_markdown(
            professional_md, 
            professional_pdf, 
            "Kiwon-Helo-IM-AI Professional Pitch Deck"
        )
    
    # Convert creative version (with emojis)
    creative_md = current_dir / "KIWON_ULTIMATE_REALITY_PITCH_2025.md"
    creative_pdf = current_dir / "Kiwon_Helo_AI_Creative_Pitch_Deck.pdf"
    
    if creative_md.exists():
        print("🔄 Converting creative version to PDF...")
        create_pdf_from_markdown(
            creative_md, 
            creative_pdf, 
            "Kiwon-Helo-IM-AI Creative Pitch Deck"
        )
    
    print("\n✨ Conversion complete!")
    print(f"📁 Files saved in: {current_dir}")

if __name__ == "__main__":
    main()
