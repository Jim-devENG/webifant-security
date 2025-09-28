const https = require( 'https' );
const fs = require( 'fs' );
const path = require( 'path' );

// The actual founder's image URL from the Webifant website
const founderImageUrl = "https://webifant.com/new/wp-content/uploads/2024/01/founder.jpg";
const outputPath = path.join( __dirname, 'public', 'images', 'founder.jpg' );

// Create the images directory if it doesn't exist
const imagesDir = path.join( __dirname, 'public', 'images' );
if ( !fs.existsSync( imagesDir ) ) {
    fs.mkdirSync( imagesDir, { recursive: true } );
}

console.log( 'Downloading founder image from:', founderImageUrl );
console.log( 'Saving to:', outputPath );

// Download the image
const file = fs.createWriteStream( outputPath );

https.get( founderImageUrl, ( response ) => {
    if ( response.statusCode === 200 ) {
        response.pipe( file );
        file.on( 'finish', () => {
            file.close();
            console.log( '✅ Founder image downloaded successfully!' );
            console.log( '📁 Saved to:', outputPath );
        } );
    } else {
        console.log( '❌ Failed to download image. Status code:', response.statusCode );
        console.log( '🔄 Trying alternative URLs...' );

        // Try alternative URLs
        const alternativeUrls = [
            "https://webifant.com/new/wp-content/uploads/2024/01/founder.png",
            "https://webifant.com/new/wp-content/uploads/2024/01/founder-1.jpg",
            "https://webifant.com/new/wp-content/uploads/2024/01/founder-2.jpg"
        ];

        tryAlternativeUrl( alternativeUrls, 0 );
    }
} ).on( 'error', ( err ) => {
    console.log( '❌ Error downloading image:', err.message );
    console.log( '🔄 Trying alternative URLs...' );

    const alternativeUrls = [
        "https://webifant.com/new/wp-content/uploads/2024/01/founder.png",
        "https://webifant.com/new/wp-content/uploads/2024/01/founder-1.jpg",
        "https://webifant.com/new/wp-content/uploads/2024/01/founder-2.jpg"
    ];

    tryAlternativeUrl( alternativeUrls, 0 );
} );

function tryAlternativeUrl( urls, index ) {
    if ( index >= urls.length ) {
        console.log( '❌ All alternative URLs failed. Using fallback image.' );
        return;
    }

    const url = urls[index];
    console.log( `🔄 Trying alternative URL ${index + 1}:`, url );

    const file = fs.createWriteStream( outputPath );

    https.get( url, ( response ) => {
        if ( response.statusCode === 200 ) {
            response.pipe( file );
            file.on( 'finish', () => {
                file.close();
                console.log( '✅ Alternative founder image downloaded successfully!' );
                console.log( '📁 Saved to:', outputPath );
            } );
        } else {
            console.log( `❌ Alternative URL ${index + 1} failed. Status code:`, response.statusCode );
            tryAlternativeUrl( urls, index + 1 );
        }
    } ).on( 'error', ( err ) => {
        console.log( `❌ Error with alternative URL ${index + 1}:`, err.message );
        tryAlternativeUrl( urls, index + 1 );
    } );
} 