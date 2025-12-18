/**
 * Netlify Function: Submit Form
 * Handles form submissions, saves to Airtable, and sends Discord notification
 */

const Airtable = require('airtable');
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const formData = JSON.parse(event.body);
    const { name, email, theme, message, newsletter } = formData;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const timestamp = new Date().toISOString();

    // Save to Airtable
    let airtableResult = null;
    if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID) {
      try {
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
      body: JSON.stringify({
        success: true,
        message: 'Submission received successfully',
        airtableId: airtableResult?.[0]?.id
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

