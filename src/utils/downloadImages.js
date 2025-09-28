// Utility script to download images from Webifant website
// This would typically be run with Node.js fetch capabilities

const imagesToDownload = [
    {
        url: "https://webifant.com/new/wp-content/uploads/2024/01/logo.png",
        filename: "webifant-logo.png",
        description: "Webifant Security Logo"
    },
    {
        url: "https://webifant.com/new/wp-content/uploads/2024/01/hero-bg.jpg",
        filename: "hero-background.jpg",
        description: "Hero section background"
    },
    {
        url: "https://webifant.com/new/wp-content/uploads/2024/01/cybersecurity-assessment.jpg",
        filename: "cybersecurity-assessment.jpg",
        description: "Cybersecurity Assessment Service"
    },
    {
        url: "https://webifant.com/new/wp-content/uploads/2024/01/digital-forensics.jpg",
        filename: "digital-forensics.jpg",
        description: "Digital Forensics Service"
    },
    {
        url: "https://webifant.com/new/wp-content/uploads/2024/01/security-management.jpg",
        filename: "security-management.jpg",
        description: "Security Management Service"
    },
    {
        url: "https://webifant.com/new/wp-content/uploads/2024/01/consulting-training.jpg",
        filename: "consulting-training.jpg",
        description: "Consulting and Training Service"
    },
    {
        url: "https://webifant.com/new/wp-content/uploads/2024/01/tailored-solutions.jpg",
        filename: "tailored-solutions.jpg",
        description: "Tailored Security Solutions"
    },
    {
        url: "https://webifant.com/new/wp-content/uploads/2024/01/penetration-testing.jpg",
        filename: "penetration-testing.jpg",
        description: "Penetration Testing Service"
    },
    {
        url: "https://webifant.com/new/wp-content/uploads/2024/01/founder.jpg",
        filename: "founder.jpg",
        description: "Founder Portrait"
    },
    {
        url: "https://webifant.com/new/wp-content/uploads/2024/01/team.jpg",
        filename: "team.jpg",
        description: "Team Photo"
    },
    {
        url: "https://webifant.com/new/wp-content/uploads/2024/01/office-us.jpg",
        filename: "office-us.jpg",
        description: "US Office"
    },
    {
        url: "https://webifant.com/new/wp-content/uploads/2024/01/office-nigeria.jpg",
        filename: "office-nigeria.jpg",
        description: "Nigeria Office"
    }
];

// Placeholder images for services (using Unsplash cybersecurity-themed images)
const placeholderImages = [
    {
        filename: "cybersecurity-assessment.jpg",
        url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
        description: "Cybersecurity Assessment"
    },
    {
        filename: "digital-forensics.jpg",
        url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        description: "Digital Forensics"
    },
    {
        filename: "security-management.jpg",
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        description: "Security Management"
    },
    {
        filename: "consulting-training.jpg",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
        description: "Consulting and Training"
    },
    {
        filename: "tailored-solutions.jpg",
        url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
        description: "Tailored Security Solutions"
    },
    {
        filename: "penetration-testing.jpg",
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        description: "Penetration Testing"
    },
    {
        filename: "hero-background.jpg",
        url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=800&fit=crop",
        description: "Hero Background"
    },
    {
        filename: "founder.jpg",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        description: "Founder Portrait"
    },
    {
        filename: "team.jpg",
        url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
        description: "Team Photo"
    },
    {
        filename: "office-us.jpg",
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        description: "US Office"
    },
    {
        filename: "office-nigeria.jpg",
        url: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800&h=600&fit=crop",
        description: "Nigeria Office"
    }
];

export { placeholderImages }; 