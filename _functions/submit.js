/**
 * Netlify Function: Submit Form
 * Handles form submissions and sends Discord notification
 * Works with or without Airtable (optional)
 */

const fetch = require('node-fetch');

// Helper to parse form data
function parseFormData(body, contentType) {
  if (contentType && contentType.includes('application/json')) {
    return JSON.parse(body);
  }
  
  // Parse URL-encoded form data
  const params = new URLSearchParams(body);
  return {
    name: params.get('name'),
    email: params.get('email'),
    theme: params.get('theme') || '',
    message: params.get('message'),
    newsletter: params.get('newsletter') || ''
  };
}

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse form data (handles both JSON and form-encoded)
    const formData = parseFormData(event.body, event.headers['content-type']);
    const { name, email, theme, message, newsletter } = formData;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const timestamp = new Date().toISOString();

    // Save to Airtable (optional - only if credentials are provided)
    let airtableResult = null;
    if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_API_KEY !== 'placeholder') {
      try {
        // Dynamically require Airtable only if needed
        const Airtable = require('airtable');
        const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
          .base(process.env.AIRTABLE_BASE_ID);

        const tableName = process.env.AIRTABLE_TABLE_NAME || 'Submissions';
        
        airtableResult = await base(tableName).create([
          {
            fields: {
              Name: name,
              Email: email,
              Theme: theme || 'none',
              Message: message,
              Newsletter: newsletter === 'yes',
              'Submitted At': timestamp
            }
          }
        ]);
      } catch (airtableError) {
        console.error('Airtable error:', airtableError);
        // Continue even if Airtable fails
      }
    }

    // Send Discord notification
    let discordResult = null;
    if (process.env.DISCORD_WEBHOOK_SUBMISSIONS) {
      try {
        const discordMessage = {
          content: '📝 New Form Submission',
          embeds: [
            {
              title: 'New Submission',
              color: 0x5865F2,
              fields: [
                { name: 'Name', value: name, inline: true },
                { name: 'Email', value: email, inline: true },
                { name: 'Theme', value: theme || 'None', inline: true },
                { name: 'Message', value: message.substring(0, 1000) },
                { name: 'Newsletter', value: newsletter === 'yes' ? 'Yes' : 'No', inline: true },
                { name: 'Time', value: timestamp, inline: true }
              ],
              timestamp: timestamp
            }
          ]
        };

        discordResult = await fetch(process.env.DISCORD_WEBHOOK_SUBMISSIONS, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordMessage)
        });
      } catch (discordError) {
        console.error('Discord error:', discordError);
        // Continue even if Discord fails
      }
    }

    // Log submission
    console.log('Submission received:', {
      name,
      email,
      theme,
      airtableSuccess: !!airtableResult,
      discordSuccess: discordResult?.ok
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        success: true,
        message: 'Submission received successfully',
        airtableId: airtableResult?.[0]?.id || null
      })
    };
  } catch (error) {
    console.error('Submission error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

