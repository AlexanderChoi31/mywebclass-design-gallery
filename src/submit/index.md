---
layout: base.njk
title: Submit Feedback
description: Submit your feedback or contact us
---

<div class="section">
    <div class="container">
        <h1>Submit Feedback</h1>
        <p style="color: var(--color-text-secondary); max-width: 600px;">
            We'd love to hear your thoughts on the design gallery. Fill out the form below 
            and we'll get back to you as soon as possible.
        </p>
    </div>
</div>

<div class="section">
    <div class="container">
        <div style="max-width: 600px;">
            <form id="submission-form" method="POST" action="/.netlify/functions/submit" netlify data-netlify="true">
                <div class="form-group">
                    <label for="name">Name *</label>
                    <input type="text" id="name" name="name" required placeholder="Your name">
                </div>
                
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required placeholder="your@email.com">
                </div>
                
                <div class="form-group">
                    <label for="theme">Favorite Theme</label>
                    <select id="theme" name="theme">
                        <option value="">Select a theme</option>
                        <option value="onyx">Onyx</option>
                        <option value="paper">Paper</option>
                        <option value="neon">Neon</option>
                        <option value="brutal">Brutal</option>
                        <option value="calm">Calm</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="message">Message *</label>
                    <textarea id="message" name="message" rows="6" required placeholder="Your feedback or message..."></textarea>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" name="newsletter" value="yes">
                        Subscribe to newsletter (optional)
                    </label>
                </div>
                
                <div id="form-status" style="display: none;"></div>
                
                <button type="submit" class="btn" id="submit-btn">Submit</button>
            </form>
        </div>
    </div>
</div>

<script>
document.getElementById('submission-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submit-btn');
    const statusDiv = document.getElementById('form-status');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    statusDiv.style.display = 'none';
    
    const formData = new FormData(form);
    
    try {
        const response = await fetch('/.netlify/functions/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            statusDiv.className = 'alert alert-success';
            statusDiv.innerHTML = '<strong>Success!</strong> Your submission has been received. Thank you!';
            statusDiv.style.display = 'block';
            form.reset();
            
            // Track submission
            if (window.trackSubmission) {
                window.trackSubmission({
                    type: 'feedback',
                    theme: formData.get('theme')
                });
            }
        } else {
            throw new Error(result.error || 'Submission failed');
        }
    } catch (error) {
        statusDiv.className = 'alert alert-error';
        statusDiv.innerHTML = '<strong>Error:</strong> ' + error.message + '. Please try again.';
        statusDiv.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    }
});
</script>

