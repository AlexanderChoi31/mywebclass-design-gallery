/**
 * Email Notification Utility
 * Sends build status emails via SMTP
 * Supports Gmail, SendGrid, Mailgun, and other SMTP providers
 */

const nodemailer = require('nodemailer');

/**
 * Create email transporter based on environment variables
 */
function createTransporter() {
  // If using SendGrid (via SMTP)
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }

  // If using custom SMTP (Gmail, Mailgun, etc.)
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  // If using Gmail OAuth2 (not implemented, but structure ready)
  if (process.env.GMAIL_CLIENT_ID) {
    // Would need OAuth2 setup - keeping simple for now
    return null;
  }

  return null;
}

/**
 * Send build status email notification
 */
async function sendBuildStatusEmail(status, message, details = {}) {
  const recipientEmail = process.env.BUILD_STATUS_EMAIL_TO;
  const senderEmail = process.env.BUILD_STATUS_EMAIL_FROM || process.env.SMTP_USER || 'noreply@mywebclass.com';
  const siteName = process.env.SITE_NAME || 'MyWebClass Design Gallery';

  if (!recipientEmail) {
    console.warn('BUILD_STATUS_EMAIL_TO not configured - skipping email notification');
    return null;
  }

  const transporter = createTransporter();
  if (!transporter) {
    console.warn('Email transporter not configured - check SMTP settings');
    return null;
  }

  const isSuccess = status === 'success';
  const subject = isSuccess 
    ? `✅ Build Successful - ${siteName}`
    : `❌ Build Failed - ${siteName}`;

  const statusColor = isSuccess ? '#00ff00' : '#ff0000';
  const statusIcon = isSuccess ? '✅' : '❌';
  const statusText = isSuccess ? 'SUCCESS' : 'FAILED';

  // Build details HTML
  const detailsHtml = Object.entries(details)
    .map(([key, value]) => `<tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>${key}:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${value}</td></tr>`)
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: ${statusColor}; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
        .status { font-size: 24px; font-weight: bold; margin: 10px 0; }
        .details { background: white; padding: 15px; margin: 20px 0; border-radius: 5px; }
        table { width: 100%; border-collapse: collapse; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .timestamp { color: #666; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="status">${statusIcon} Build ${statusText}</div>
          <div>${siteName}</div>
        </div>
        <div class="content">
          <p><strong>Status:</strong> ${message}</p>
          
          ${Object.keys(details).length > 0 ? `
          <div class="details">
            <h3>Build Details:</h3>
            <table>
              ${detailsHtml}
            </table>
          </div>
          ` : ''}
          
          <div class="timestamp">
            <p>Time: ${new Date().toLocaleString()}</p>
            <p>This is an automated notification from the CI/CD pipeline.</p>
          </div>
        </div>
        <div class="footer">
          <p>MyWebClass Design Gallery - Automated Build Notifications</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Build ${statusText} - ${siteName}

Status: ${message}

${Object.entries(details).map(([key, value]) => `${key}: ${value}`).join('\n')}

Time: ${new Date().toLocaleString()}
This is an automated notification from the CI/CD pipeline.
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${siteName} Build Bot" <${senderEmail}>`,
      to: recipientEmail,
      subject: subject,
      text: text,
      html: html
    });

    console.log('Build status email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send build status email:', error);
    return null;
  }
}

/**
 * Send deployment success email
 */
async function sendDeploymentEmail(siteUrl, commitSha, details = {}) {
  const recipientEmail = process.env.BUILD_STATUS_EMAIL_TO;
  const senderEmail = process.env.BUILD_STATUS_EMAIL_FROM || process.env.SMTP_USER || 'noreply@mywebclass.com';
  const siteName = process.env.SITE_NAME || 'MyWebClass Design Gallery';

  if (!recipientEmail) {
    console.warn('BUILD_STATUS_EMAIL_TO not configured - skipping email notification');
    return null;
  }

  const transporter = createTransporter();
  if (!transporter) {
    console.warn('Email transporter not configured - check SMTP settings');
    return null;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #00ff00; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
        .button { display: inline-block; padding: 12px 24px; background: #5865F2; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🚀 Deployment Successful</h2>
          <div>${siteName}</div>
        </div>
        <div class="content">
          <p>Your site has been successfully deployed to production!</p>
          <p><strong>Site URL:</strong> <a href="${siteUrl}">${siteUrl}</a></p>
          ${commitSha ? `<p><strong>Commit:</strong> ${commitSha.substring(0, 7)}</p>` : ''}
          <a href="${siteUrl}" class="button">Visit Live Site</a>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>Time: ${new Date().toLocaleString()}</p>
            <p>This is an automated notification from the CI/CD pipeline.</p>
          </div>
        </div>
        <div class="footer">
          <p>MyWebClass Design Gallery - Automated Deployment Notifications</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
Deployment Successful - ${siteName}

Your site has been successfully deployed to production!

Site URL: ${siteUrl}
${commitSha ? `Commit: ${commitSha.substring(0, 7)}` : ''}

Time: ${new Date().toLocaleString()}
This is an automated notification from the CI/CD pipeline.
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${siteName} Build Bot" <${senderEmail}>`,
      to: recipientEmail,
      subject: `🚀 Deployment Successful - ${siteName}`,
      text: text,
      html: html
    });

    console.log('Deployment email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Failed to send deployment email:', error);
    return null;
  }
}

module.exports = {
  sendBuildStatusEmail,
  sendDeploymentEmail
};

