/**
 * Discord Webhook Utility
 * Reusable module for sending Discord notifications
 */

const fetch = require('node-fetch');

/**
 * Send message to Discord webhook
 */
async function sendDiscordMessage(webhookUrl, message, options = {}) {
  if (!webhookUrl) {
    console.warn('Discord webhook URL not configured');
    return null;
  }

  try {
    const payload = {
      content: message,
      ...options
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error('Discord webhook error:', error);
    return null;
  }
}

/**
 * Send build status notification
 */
async function sendBuildStatus(status, message, details = {}) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_BUILD_STATUS;
  if (!webhookUrl) return null;

  const color = status === 'success' ? 0x00ff00 : 0xff0000;
  const title = status === 'success' ? '✅ Build Successful' : '❌ Build Failed';

  return sendDiscordMessage(webhookUrl, null, {
    embeds: [
      {
        title,
        description: message,
        color,
        fields: Object.entries(details).map(([name, value]) => ({
          name,
          value: String(value),
          inline: true
        })),
        timestamp: new Date().toISOString()
      }
    ]
  });
}

/**
 * Send review queue notification
 */
async function sendReviewQueue(message, details = {}) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_REVIEW_QUEUE;
  if (!webhookUrl) return null;

  return sendDiscordMessage(webhookUrl, '🔍 **READY FOR FINAL REVIEW**', {
    embeds: [
      {
        title: 'Review Packet Generated',
        description: message,
        color: 0x5865F2,
        fields: Object.entries(details).map(([name, value]) => ({
          name,
          value: String(value),
          inline: true
        })),
        timestamp: new Date().toISOString()
      }
    ]
  });
}

module.exports = {
  sendDiscordMessage,
  sendBuildStatus,
  sendReviewQueue
};

