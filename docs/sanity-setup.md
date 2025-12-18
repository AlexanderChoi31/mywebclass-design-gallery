# Sanity CMS Setup Guide

## Overview

This project uses Sanity CMS for content management. This guide will help you set up Sanity for the MyWebClass Design Gallery.

## Step 1: Create Sanity Project

1. Go to [sanity.io](https://www.sanity.io)
2. Sign up or log in
3. Click "Create new project"
4. Choose a project name (e.g., "mywebclass-gallery")
5. Select a dataset name (default: "production")

## Step 2: Install Sanity CLI

```bash
npm install -g @sanity/cli
```

## Step 3: Initialize Sanity Schema

Create a `sanity` directory in your project:

```bash
mkdir sanity
cd sanity
sanity init
```

Follow the prompts to connect to your project.

## Step 4: Define Content Schema

Create `sanity/schemas/page.js`:

```javascript
export default {
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block'
        }
      ]
    }
  ]
}
```

## Step 5: Configure Environment Variables

Add to your `.env`:

```
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_READ_TOKEN=your-read-token
```

## Step 6: Get API Token

1. Go to Sanity Manage
2. Navigate to API → Tokens
3. Create a new token with "Read" permissions
4. Copy token to `.env`

## Step 7: Test Integration

The Netlify function `_functions/sanity-content.js` will fetch content from Sanity.

## Content Model

The current implementation expects:

- **Type**: `page`
- **Fields**: `title`, `slug`, `content`

You can extend this schema based on your needs.

## Deployment

Sanity Studio can be deployed separately or embedded. For this project, content is fetched at build time via Netlify Functions.

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)
- [Sanity Client](https://www.sanity.io/docs/js-client)

