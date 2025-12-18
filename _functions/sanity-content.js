/**
 * Netlify Function: Fetch Sanity CMS Content
 */

const { createClient } = require('@sanity/client');

exports.handler = async (event, context) => {
  try {
    // Initialize Sanity client
    const client = createClient({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET || 'production',
      apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
      useCdn: true,
      token: process.env.SANITY_READ_TOKEN
    });

    // Fetch content (adjust query based on your Sanity schema)
    const query = `*[_type == "page" && slug.current == "about"][0]{
      title,
      content,
      slug
    }`;

    const content = await client.fetch(query);

    if (!content) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Content not found' })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600'
      },
      body: JSON.stringify(content)
    };
  } catch (error) {
    console.error('Sanity error:', error);
    
    // Return fallback content if Sanity fails
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'About MyWebClass',
        content: '<p>Content from Sanity CMS will appear here once configured.</p>'
      })
    };
  }
};

