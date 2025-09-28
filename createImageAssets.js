const fs = require( 'fs' );
const path = require( 'path' );

// Create directories
const createDirectories = () => {
    const dirs = [
        'src/assets/images',
        'src/assets/images/hero',
        'src/assets/images/services',
        'src/assets/images/about',
        'src/assets/images/testimonials',
        'src/assets/images/blog',
        'src/assets/images/team',
        'src/assets/images/logo'
    ];

    dirs.forEach( dir => {
        if ( !fs.existsSync( dir ) ) {
            fs.mkdirSync( dir, { recursive: true } );
            console.log( `Created directory: ${dir}` );
        }
    } );
};

// Image configuration with Unsplash URLs
const imageConfig = {
    hero: {
        'hero-bg.jpg': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=1080&fit=crop',
        'hero-image.jpg': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'
    },
    about: {
        'about-image.jpg': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
        'founder-image.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    },
    services: {
        'cybersecurity-assessments.jpg': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
        'digital-forensics.jpg': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
        'security-management.jpg': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
        'consulting-training.jpg': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
        'tailored-solutions.jpg': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop'
    },
    testimonials: {
        'testimonial-1.jpg': 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        'testimonial-2.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        'testimonial-3.jpg': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        'testimonial-4.jpg': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    blog: {
        'blog-1.jpg': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
        'blog-2.jpg': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
        'blog-3.jpg': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop'
    },
    team: {
        'team-member-1.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
        'team-member-2.jpg': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    logo: {
        'logo.png': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&h=60&fit=crop'
    },
    backgrounds: {
        'stats-bg.jpg': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=600&fit=crop',
        'contact-bg.jpg': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=600&fit=crop',
        'services-bg.jpg': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=600&fit=crop'
    }
};

// Create image configuration file
const createImageConfig = () => {
    const config = {
        images: imageConfig,
        imageMap: {}
    };

    // Create a flat map for easy access
    Object.entries( imageConfig ).forEach( ( [category, images] ) => {
        Object.entries( images ).forEach( ( [filename, url] ) => {
            config.imageMap[filename] = {
                url,
                category,
                path: `src/assets/images/${category}/${filename}`
            };
        } );
    } );

    fs.writeFileSync( 'src/assets/images/imageConfig.json', JSON.stringify( config, null, 2 ) );
    console.log( 'Created image configuration file' );
};

// Create README for images
const createImageReadme = () => {
    const readme = `# Webifant Security Images

This directory contains all images used in the Webifant Security React application.

## Directory Structure

- \`hero/\` - Hero section images
- \`about/\` - About page and founder images
- \`services/\` - Service-related images
- \`testimonials/\` - Client testimonial profile images
- \`blog/\` - Blog post featured images
- \`team/\` - Team member photos
- \`logo/\` - Company logo and branding
- \`backgrounds/\` - Background images for sections

## Image Sources

All images are sourced from Unsplash and are optimized for web use. The images are:
- High quality and professional
- Relevant to cybersecurity and technology
- Optimized for different screen sizes
- Free to use commercially

## Usage

Images are referenced in the React components using the image configuration file:
\`src/assets/images/imageConfig.json\`

Example usage:
\`\`\`javascript
import imageConfig from '../assets/images/imageConfig.json';

const heroImage = imageConfig.imageMap['hero-bg.jpg'].url;
\`\`\`
`;

    fs.writeFileSync( 'src/assets/images/README.md', readme );
    console.log( 'Created image README file' );
};

// Main execution
const main = () => {
    console.log( 'Creating image assets structure...' );
    createDirectories();
    createImageConfig();
    createImageReadme();
    console.log( 'Image assets structure created successfully!' );
    console.log( '\nNext steps:' );
    console.log( '1. Update React components to use the image configuration' );
    console.log( '2. Import images using the URLs from imageConfig.json' );
    console.log( '3. Test the application to ensure all images load correctly' );
};

main(); 