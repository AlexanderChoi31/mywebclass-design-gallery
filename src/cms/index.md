---
layout: base.njk
title: CMS Content
description: Content managed by Sanity CMS
---

<div class="section">
    <div class="container">
        <h1>CMS-Driven Content</h1>
        <p style="color: var(--color-text-secondary); max-width: 600px;">
            This page demonstrates content pulled from Sanity CMS. The content below 
            is dynamically generated from the CMS.
        </p>
    </div>
</div>

<div class="section">
    <div class="container">
        <div id="cms-content" style="max-width: 800px;">
            <div style="padding: var(--space-xl); background-color: var(--color-bg-secondary); border-radius: var(--radius-lg);">
                <p style="color: var(--color-text-muted);">
                    <em>Loading content from Sanity CMS...</em>
                </p>
            </div>
        </div>
    </div>
</div>

<script>
// Fetch content from Sanity CMS
async function loadCMSContent() {
    const contentDiv = document.getElementById('cms-content');
    
    try {
        // This would normally fetch from Sanity
        // For now, we'll use a placeholder
        const response = await fetch('/.netlify/functions/sanity-content');
        
        if (response.ok) {
            const data = await response.json();
            contentDiv.innerHTML = `
                <article>
                    <h2>${data.title || 'CMS Content'}</h2>
                    <div>${data.content || '<p>No content available.</p>'}</div>
                </article>
            `;
        } else {
            // Fallback content
            contentDiv.innerHTML = `
                <article>
                    <h2>About MyWebClass</h2>
                    <p>
                        MyWebClass Design Gallery showcases five distinct design themes, 
                        each with its own personality and use case. This content is managed 
                        through Sanity CMS, allowing for easy updates without code changes.
                    </p>
                    <h3>CMS Integration</h3>
                    <p>
                        The Sanity CMS integration allows content editors to update 
                        website content through a user-friendly interface. Changes are 
                        automatically reflected on the site after publishing.
                    </p>
                    <div class="card" style="margin-top: var(--space-lg);">
                        <h4>CMS Features</h4>
                        <ul style="list-style: disc; margin-left: var(--space-lg);">
                            <li>Real-time content updates</li>
                            <li>Rich text editing</li>
                            <li>Media management</li>
                            <li>Version control</li>
                        </ul>
                    </div>
                </article>
            `;
        }
    } catch (error) {
        console.error('Error loading CMS content:', error);
        contentDiv.innerHTML = `
            <div class="alert alert-error">
                <strong>Error:</strong> Unable to load content from CMS. Please try again later.
            </div>
        `;
    }
}

// Load content on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCMSContent);
} else {
    loadCMSContent();
}
</script>

