# Webifant Security Images

This directory contains all images used in the Webifant Security React application.

## Directory Structure

- `hero/` - Hero section images
- `about/` - About page and founder images
- `services/` - Service-related images
- `testimonials/` - Client testimonial profile images
- `blog/` - Blog post featured images
- `team/` - Team member photos
- `logo/` - Company logo and branding
- `backgrounds/` - Background images for sections

## Image Sources

All images are sourced from Unsplash and are optimized for web use. The images are:
- High quality and professional
- Relevant to cybersecurity and technology
- Optimized for different screen sizes
- Free to use commercially

## Usage

Images are referenced in the React components using the image configuration file:
`src/assets/images/imageConfig.json`

Example usage:
```javascript
import imageConfig from '../assets/images/imageConfig.json';

const heroImage = imageConfig.imageMap['hero-bg.jpg'].url;
```
