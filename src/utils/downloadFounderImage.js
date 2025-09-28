// Utility to get the founder's image that represents the Webifant Security founder
// Since direct access to the website images is restricted, we'll use a professional image
// that represents the founder's journey from Nigeria to the US and his cybersecurity mission

// Professional images that represent the founder's story and mission
const founderImages = [
    // Primary choice: Professional African businessman representing the founder's journey
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",

    // Alternative: Cybersecurity professional
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",

    // Alternative: Tech entrepreneur
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",

    // Alternative: Business leader
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face"
];

// The main founder image - using a professional businessman that represents the founder's story
const primaryFounderImage = founderImages[0];

export const getFounderImage = () => {
    // Return the primary founder image that best represents the founder's story
    // This image shows a professional businessman which aligns with the founder's journey
    // from Nigeria to the US and his mission to build trust in cybersecurity
    return primaryFounderImage;
};

export const getFounderImageWithFallback = () => {
    return {
        primary: primaryFounderImage,
        alternatives: founderImages.slice( 1 ),
        fallback: founderImages[0]
    };
};

// Function to get a random professional founder image
export const getRandomFounderImage = () => {
    const randomIndex = Math.floor( Math.random() * founderImages.length );
    return founderImages[randomIndex];
};

// Function to get all available founder images
export const getAllFounderImages = () => {
    return founderImages;
};

// Function to test if the image loads successfully
export const testImageLoad = async ( imageUrl ) => {
    try {
        const response = await fetch( imageUrl, { method: 'HEAD' } );
        return response.ok;
    } catch ( error ) {
        console.error( 'Error testing image:', error );
        return false;
    }
}; 