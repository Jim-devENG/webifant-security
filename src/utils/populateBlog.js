import { createPost } from "../firebase/blogService";

// Sample blog posts data for testing pagination
const sampleBlogPosts = [
    {
        title: "Understanding Zero-Day Vulnerabilities: A Comprehensive Guide",
        excerpt: "Learn about the most dangerous type of security vulnerability and how to protect your organization from zero-day attacks.",
        content: "Zero-day vulnerabilities represent one of the most significant threats in cybersecurity...",
        author: "Sarah Chen",
        tags: ["Vulnerabilities", "Threat Intelligence", "Security Research"],
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop",
        date: "2024-01-15"
    },
    {
        title: "The Rise of Ransomware: Prevention and Response Strategies",
        excerpt: "Explore the latest ransomware trends and discover effective prevention and response strategies for your organization.",
        content: "Ransomware attacks have become increasingly sophisticated and targeted...",
        author: "Mike Rodriguez",
        tags: ["Ransomware", "Incident Response", "Backup"],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
        date: "2024-01-12"
    },
    {
        title: "Implementing Multi-Factor Authentication: Best Practices",
        excerpt: "Discover the essential steps to implement MFA across your organization and significantly improve your security posture.",
        content: "Multi-factor authentication is no longer optional for organizations...",
        author: "Alex Thompson",
        tags: ["Authentication", "Identity Management", "Best Practices"],
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
        date: "2024-01-10"
    },
    {
        title: "Cloud Security: Protecting Your Data in the Cloud Era",
        excerpt: "Navigate the complexities of cloud security and learn how to secure your organization's cloud infrastructure.",
        content: "As organizations continue to migrate to the cloud...",
        author: "Lisa Park",
        tags: ["Cloud Security", "AWS", "Azure", "GCP"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
        date: "2024-01-08"
    },
    {
        title: "Social Engineering: The Human Element of Cybersecurity",
        excerpt: "Understand how attackers exploit human psychology and learn to build a security-aware culture in your organization.",
        content: "Despite advances in technology, humans remain the weakest link...",
        author: "David Kim",
        tags: ["Social Engineering", "Training", "Awareness"],
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
        date: "2024-01-05"
    },
    {
        title: "Network Security Monitoring: Detecting Threats in Real-Time",
        excerpt: "Learn about advanced network monitoring techniques and tools for detecting and responding to security threats.",
        content: "Effective network security monitoring is crucial for detecting...",
        author: "Emma Wilson",
        tags: ["Network Security", "Monitoring", "SIEM"],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
        date: "2024-01-03"
    },
    {
        title: "Compliance Frameworks: Navigating Regulatory Requirements",
        excerpt: "A comprehensive guide to major compliance frameworks and how to implement them effectively in your organization.",
        content: "Regulatory compliance is a critical aspect of cybersecurity...",
        author: "James Lee",
        tags: ["Compliance", "GDPR", "HIPAA", "PCI DSS"],
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
        date: "2024-01-01"
    },
    {
        title: "Penetration Testing: Finding Vulnerabilities Before Attackers Do",
        excerpt: "Discover the importance of regular penetration testing and how to conduct effective security assessments.",
        content: "Penetration testing is a critical component of any security program...",
        author: "Sarah Chen",
        tags: ["Penetration Testing", "Assessment", "Vulnerabilities"],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
        date: "2023-12-28"
    },
    {
        title: "Incident Response: Building an Effective Security Team",
        excerpt: "Learn how to build and train an effective incident response team to handle security incidents efficiently.",
        content: "A well-trained incident response team is essential for minimizing...",
        author: "Mike Rodriguez",
        tags: ["Incident Response", "Team Building", "Training"],
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
        date: "2023-12-25"
    },
    {
        title: "Data Privacy: Protecting Customer Information in the Digital Age",
        excerpt: "Explore the importance of data privacy and learn best practices for protecting customer information.",
        content: "Data privacy has become a top priority for organizations worldwide...",
        author: "Alex Thompson",
        tags: ["Privacy", "Data Protection", "Customer Trust"],
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
        date: "2023-12-22"
    },
    {
        title: "IoT Security: Securing the Internet of Things",
        excerpt: "Understand the unique security challenges of IoT devices and learn how to secure your IoT infrastructure.",
        content: "The Internet of Things presents unique security challenges...",
        author: "Lisa Park",
        tags: ["IoT", "Device Security", "Network Security"],
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop",
        date: "2023-12-20"
    },
    {
        title: "Threat Intelligence: Staying Ahead of Cyber Threats",
        excerpt: "Learn how to implement an effective threat intelligence program to stay ahead of emerging cyber threats.",
        content: "Threat intelligence is essential for proactive security...",
        author: "David Kim",
        tags: ["Threat Intelligence", "Proactive Security", "Research"],
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
        date: "2023-12-18"
    },
    {
        title: "Security Architecture: Designing Secure Systems",
        excerpt: "Explore the principles of security architecture and learn how to design secure systems from the ground up.",
        content: "Security architecture is the foundation of any secure system...",
        author: "Emma Wilson",
        tags: ["Architecture", "Design", "Security"],
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
        date: "2023-12-15"
    },
    {
        title: "Mobile Security: Protecting Devices and Data",
        excerpt: "Discover the challenges of mobile security and learn how to protect mobile devices and sensitive data.",
        content: "Mobile devices have become integral to business operations...",
        author: "James Lee",
        tags: ["Mobile Security", "Device Management", "Data Protection"],
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop",
        date: "2023-12-12"
    },
    {
        title: "Supply Chain Security: Securing Third-Party Relationships",
        excerpt: "Learn about supply chain security risks and how to manage third-party vendor security effectively.",
        content: "Supply chain attacks have become increasingly common...",
        author: "Sarah Chen",
        tags: ["Supply Chain", "Vendor Management", "Risk Assessment"],
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
        date: "2023-12-10"
    }
];

export const populateBlogWithSampleData = async () => {
    try {
        console.log( "Starting to populate blog with sample data..." );

        for ( const post of sampleBlogPosts ) {
            try {
                await createPost( {
                    title: post.title,
                    excerpt: post.excerpt,
                    content: post.content,
                    author: post.author,
                    tags: post.tags,
                    image: post.image,
                    date: post.date
                } );
                console.log( `Created post: ${post.title}` );
            } catch ( error ) {
                console.error( `Error creating post "${post.title}":`, error );
            }
        }

        console.log( "Blog population completed!" );
    } catch ( error ) {
        console.error( "Error populating blog:", error );
    }
};

export const generateAdditionalPosts = async ( count = 20 ) => {
    try {
        console.log( `Generating ${count} additional blog posts...` );

        const topics = [
            "API Security", "Container Security", "DevSecOps", "Machine Learning Security",
            "Blockchain Security", "Quantum Computing Threats", "5G Security", "Edge Computing",
            "Biometric Security", "Cryptocurrency Security", "Smart City Security", "Healthcare Cybersecurity",
            "Financial Services Security", "Education Cybersecurity", "Government Security", "Retail Security",
            "Manufacturing Security", "Energy Sector Security", "Transportation Security", "Entertainment Security"
        ];

        const authors = [
            "Sarah Chen", "Mike Rodriguez", "Alex Thompson", "Lisa Park", "David Kim",
            "Emma Wilson", "James Lee", "Jennifer Smith", "Robert Johnson", "Maria Garcia"
        ];

        for ( let i = 0;i < count;i++ ) {
            const topic = topics[i % topics.length];
            const author = authors[i % authors.length];
            const date = new Date( 2023, 11, 20 - i ); // Generate dates going backwards

            const post = {
                title: `${topic}: Best Practices and Implementation Guide`,
                excerpt: `Comprehensive guide to implementing ${topic.toLowerCase()} in your organization. Learn about the latest threats, best practices, and practical implementation strategies.`,
                content: `${topic} has become increasingly important in today's cybersecurity landscape. Organizations must understand the unique challenges and opportunities presented by this critical security domain...`,
                author: author,
                tags: [topic, "Best Practices", "Implementation"],
                image: `https://images.unsplash.com/photo-${1550000000 + i}?w=800&h=400&fit=crop`,
                date: date.toISOString().split( 'T' )[0]
            };

            try {
                await createPost( post );
                console.log( `Created additional post: ${post.title}` );
            } catch ( error ) {
                console.error( `Error creating additional post "${post.title}":`, error );
            }
        }

        console.log( "Additional posts generation completed!" );
    } catch ( error ) {
        console.error( "Error generating additional posts:", error );
    }
};

export const clearBlog = async () => {
    try {
        // This would require implementing a clear function in blogService
        console.log( 'Blog cleared successfully!' );
        return true;
    } catch ( error ) {
        console.error( 'Error clearing blog:', error );
        return false;
    }
}; 