const https = require( 'https' );
const http = require( 'http' );
const fs = require( 'fs' );
const path = require( 'path' );

// Create images directory structure
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

// Download image function
const downloadImage = ( url, filepath ) => {
    return new Promise( ( resolve, reject ) => {
        const protocol = url.startsWith( 'https' ) ? https : http;

        protocol.get( url, ( response ) => {
            if ( response.statusCode === 200 ) {
                const fileStream = fs.createWriteStream( filepath );
                response.pipe( fileStream );

                fileStream.on( 'finish', () => {
                    fileStream.close();
                    console.log( `Downloaded: ${filepath}` );
                    resolve();
                } );

                fileStream.on( 'error', ( err ) => {
                    fs.unlink( filepath, () => { } ); // Delete the file if there was an error
                    reject( err );
                } );
            } else {
                reject( new Error( `Failed to download ${url}: ${response.statusCode}` ) );
            }
        } ).on( 'error', ( err ) => {
            reject( err );
        } );
    } );
};

// Image URLs from the original Webifant website
const imageUrls = {
    // Hero section images
    'hero-bg.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/hero-bg.jpg',
    'hero-image.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/hero-image.jpg',

    // About section images
    'about-image.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/about-image.jpg',
    'founder-image.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/founder-image.jpg',

    // Services images
    'cybersecurity-assessments.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/cybersecurity-assessments.jpg',
    'digital-forensics.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/digital-forensics.jpg',
    'security-management.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/security-management.jpg',
    'consulting-training.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/consulting-training.jpg',
    'tailored-solutions.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/tailored-solutions.jpg',

    // Testimonials images
    'testimonial-1.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/testimonial-1.jpg',
    'testimonial-2.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/testimonial-2.jpg',
    'testimonial-3.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/testimonial-3.jpg',
    'testimonial-4.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/testimonial-4.jpg',

    // Blog images
    'blog-1.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/blog-1.jpg',
    'blog-2.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/blog-2.jpg',
    'blog-3.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/blog-3.jpg',

    // Logo and branding
    'logo.png': 'https://webifant.com/new/wp-content/uploads/2024/01/logo.png',
    'favicon.ico': 'https://webifant.com/new/wp-content/uploads/2024/01/favicon.ico',

    // Team images
    'team-member-1.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/team-member-1.jpg',
    'team-member-2.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/team-member-2.jpg',

    // Additional images
    'stats-bg.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/stats-bg.jpg',
    'contact-bg.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/contact-bg.jpg',
    'services-bg.jpg': 'https://webifant.com/new/wp-content/uploads/2024/01/services-bg.jpg'
};

// Alternative image URLs (in case original URLs don't work)
const alternativeImages = {
    'hero-bg.jpg': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=1080&fit=crop',
    'hero-image.jpg': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    'about-image.jpg': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    'founder-image.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    'cybersecurity-assessments.jpg': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
    'digital-forensics.jpg': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
    'security-management.jpg': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    'consulting-training.jpg': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    'tailored-solutions.jpg': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
    'testimonial-1.jpg': 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
    'testimonial-2.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    'testimonial-3.jpg': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    'testimonial-4.jpg': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    'blog-1.jpg': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
    'blog-2.jpg': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop',
    'blog-3.jpg': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop',
    'logo.png': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&h=60&fit=crop',
    'team-member-1.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    'team-member-2.jpg': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    'stats-bg.jpg': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&h=600&fit=crop',
    'contact-bg.jpg': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=600&fit=crop',
    'services-bg.jpg': 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=600&fit=crop'
};

// Download all images
const downloadAllImages = async () => {
    console.log( 'Starting image extraction...' );
    createDirectories();

    const downloadPromises = [];

    for ( const [filename, url] of Object.entries( imageUrls ) ) {
        let filepath;

        // Determine the appropriate directory based on filename
        if ( filename.includes( 'hero' ) ) {
            filepath = `src/assets/images/hero/${filename}`;
        } else if ( filename.includes( 'about' ) || filename.includes( 'founder' ) ) {
            filepath = `src/assets/images/about/${filename}`;
        } else if ( filename.includes( 'cybersecurity' ) || filename.includes( 'digital' ) ||
            filename.includes( 'security' ) || filename.includes( 'consulting' ) ||
            filename.includes( 'tailored' ) ) {
            filepath = `src/assets/images/services/${filename}`;
        } else if ( filename.includes( 'testimonial' ) ) {
            filepath = `src/assets/images/testimonials/${filename}`;
        } else if ( filename.includes( 'blog' ) ) {
            filepath = `src/assets/images/blog/${filename}`;
        } else if ( filename.includes( 'team' ) ) {
            filepath = `src/assets/images/team/${filename}`;
        } else if ( filename.includes( 'logo' ) || filename.includes( 'favicon' ) ) {
            filepath = `src/assets/images/logo/${filename}`;
        } else {
            filepath = `src/assets/images/${filename}`;
        }

        // Try original URL first, then alternative
        const downloadPromise = downloadImage( url, filepath )
            .catch( async ( err ) => {
                console.log( `Failed to download ${url}: ${err.message}` );
                console.log( `Trying alternative URL for ${filename}...` );

                const altUrl = alternativeImages[filename];
                if ( altUrl ) {
                    try {
                        await downloadImage( altUrl, filepath );
                        console.log( `Successfully downloaded alternative image for ${filename}` );
                    } catch ( altErr ) {
                        console.log( `Failed to download alternative image for ${filename}: ${altErr.message}` );
                    }
                }
            } );

        downloadPromises.push( downloadPromise );
    }

    await Promise.allSettled( downloadPromises );
    console.log( 'Image extraction completed!' );
};

// Run the script
downloadAllImages().catch( console.error ); 