// Comprehensive Cybersecurity Services Data
export const cybersecurityServices = {
    // Assessment Services
    assessment: {
        name: "Security Assessment Services",
        description: "Comprehensive security evaluations to identify vulnerabilities and risks",
        services: [
            {
                id: "vulnerability-assessment",
                name: "Vulnerability Assessment",
                category: "Assessment",
                description: "Systematic review of security weaknesses in your infrastructure",
                duration: "2-4 weeks",
                deliverables: [
                    "Vulnerability scan report",
                    "Risk prioritization matrix",
                    "Remediation recommendations",
                    "Executive summary"
                ],
                teamMembers: [
                    { name: "Sarah Chen", role: "Lead Security Analyst", email: "sarah.chen@webinfant.com" },
                    { name: "Mike Rodriguez", role: "Penetration Tester", email: "mike.rodriguez@webinfant.com" }
                ],
                priceRange: "$5,000 - $15,000"
            },
            {
                id: "penetration-testing",
                name: "Penetration Testing",
                category: "Assessment",
                description: "Simulated cyber attacks to test your security defenses",
                duration: "3-6 weeks",
                deliverables: [
                    "Detailed penetration test report",
                    "Exploit demonstration videos",
                    "Attack vector analysis",
                    "Security improvement roadmap"
                ],
                teamMembers: [
                    { name: "Alex Thompson", role: "Senior Penetration Tester", email: "alex.thompson@webinfant.com" },
                    { name: "Lisa Park", role: "Threat Analyst", email: "lisa.park@webinfant.com" }
                ],
                priceRange: "$10,000 - $25,000"
            },
            {
                id: "security-audit",
                name: "Security Audit",
                category: "Assessment",
                description: "Comprehensive security compliance and policy review",
                duration: "4-8 weeks",
                deliverables: [
                    "Security audit report",
                    "Compliance gap analysis",
                    "Policy recommendations",
                    "Risk assessment matrix"
                ],
                teamMembers: [
                    { name: "David Kim", role: "Security Auditor", email: "david.kim@webinfant.com" },
                    { name: "Emma Wilson", role: "Compliance Specialist", email: "emma.wilson@webinfant.com" }
                ],
                priceRange: "$8,000 - $20,000"
            }
        ]
    },

    // Monitoring Services
    monitoring: {
        name: "Security Monitoring Services",
        description: "24/7 threat detection and response capabilities",
        services: [
            {
                id: "siem-monitoring",
                name: "SIEM Monitoring",
                category: "Monitoring",
                description: "Real-time security information and event management",
                duration: "Ongoing",
                deliverables: [
                    "24/7 security monitoring",
                    "Real-time threat alerts",
                    "Monthly security reports",
                    "Incident response support"
                ],
                teamMembers: [
                    { name: "James Lee", role: "SOC Manager", email: "james.lee@webinfant.com" },
                    { name: "Rachel Green", role: "Security Analyst", email: "rachel.green@webinfant.com" }
                ],
                priceRange: "$3,000 - $8,000/month"
            },
            {
                id: "threat-hunting",
                name: "Threat Hunting",
                category: "Monitoring",
                description: "Proactive threat detection and analysis",
                duration: "Ongoing",
                deliverables: [
                    "Advanced threat detection",
                    "Threat intelligence reports",
                    "IOC analysis",
                    "Threat hunting playbooks"
                ],
                teamMembers: [
                    { name: "Tom Anderson", role: "Threat Hunter", email: "tom.anderson@webinfant.com" },
                    { name: "Sophie Brown", role: "Threat Intelligence Analyst", email: "sophie.brown@webinfant.com" }
                ],
                priceRange: "$5,000 - $12,000/month"
            },
            {
                id: "endpoint-detection",
                name: "Endpoint Detection & Response",
                category: "Monitoring",
                description: "Advanced endpoint protection and response",
                duration: "Ongoing",
                deliverables: [
                    "Endpoint monitoring",
                    "Malware detection",
                    "Incident response",
                    "Device management"
                ],
                teamMembers: [
                    { name: "Chris Johnson", role: "Endpoint Security Specialist", email: "chris.johnson@webinfant.com" },
                    { name: "Maria Garcia", role: "Incident Responder", email: "maria.garcia@webinfant.com" }
                ],
                priceRange: "$2,000 - $6,000/month"
            }
        ]
    },

    // Training Services
    training: {
        name: "Security Training Services",
        description: "Comprehensive cybersecurity awareness and technical training",
        services: [
            {
                id: "security-awareness",
                name: "Security Awareness Training",
                category: "Training",
                description: "Employee cybersecurity awareness and best practices",
                duration: "Ongoing",
                deliverables: [
                    "Interactive training modules",
                    "Phishing simulation exercises",
                    "Progress tracking",
                    "Compliance reporting"
                ],
                teamMembers: [
                    { name: "Emma Wilson", role: "Training Coordinator", email: "emma.wilson@webinfant.com" },
                    { name: "James Lee", role: "Security Trainer", email: "james.lee@webinfant.com" }
                ],
                priceRange: "$2,000 - $5,000/month"
            },
            {
                id: "technical-training",
                name: "Technical Security Training",
                category: "Training",
                description: "Advanced technical cybersecurity training for IT teams",
                duration: "Custom",
                deliverables: [
                    "Hands-on workshops",
                    "Certification preparation",
                    "Custom training materials",
                    "Skills assessment"
                ],
                teamMembers: [
                    { name: "Alex Thompson", role: "Technical Trainer", email: "alex.thompson@webinfant.com" },
                    { name: "Sarah Chen", role: "Security Expert", email: "sarah.chen@webinfant.com" }
                ],
                priceRange: "$5,000 - $15,000/session"
            },
            {
                id: "incident-response-training",
                name: "Incident Response Training",
                category: "Training",
                description: "Tabletop exercises and incident response simulation",
                duration: "1-2 days",
                deliverables: [
                    "Tabletop exercises",
                    "Incident response playbooks",
                    "Team coordination training",
                    "Post-incident analysis"
                ],
                teamMembers: [
                    { name: "David Kim", role: "Incident Response Lead", email: "david.kim@webinfant.com" },
                    { name: "Lisa Park", role: "Crisis Management Specialist", email: "lisa.park@webinfant.com" }
                ],
                priceRange: "$8,000 - $20,000"
            }
        ]
    },

    // Forensics Services
    forensics: {
        name: "Digital Forensics Services",
        description: "Comprehensive digital investigation and evidence analysis",
        services: [
            {
                id: "incident-forensics",
                name: "Incident Forensics",
                category: "Forensics",
                description: "Digital forensics investigation for security incidents",
                duration: "2-6 weeks",
                deliverables: [
                    "Forensic analysis report",
                    "Evidence preservation",
                    "Timeline reconstruction",
                    "Expert testimony support"
                ],
                teamMembers: [
                    { name: "Rachel Green", role: "Digital Forensics Specialist", email: "rachel.green@webinfant.com" },
                    { name: "Tom Anderson", role: "Evidence Analyst", email: "tom.anderson@webinfant.com" }
                ],
                priceRange: "$15,000 - $50,000"
            },
            {
                id: "malware-analysis",
                name: "Malware Analysis",
                category: "Forensics",
                description: "Deep analysis of malicious software and code",
                duration: "1-3 weeks",
                deliverables: [
                    "Malware analysis report",
                    "Behavioral analysis",
                    "IOC extraction",
                    "Remediation guidance"
                ],
                teamMembers: [
                    { name: "Sophie Brown", role: "Malware Analyst", email: "sophie.brown@webinfant.com" },
                    { name: "Chris Johnson", role: "Reverse Engineer", email: "chris.johnson@webinfant.com" }
                ],
                priceRange: "$8,000 - $25,000"
            },
            {
                id: "data-recovery",
                name: "Data Recovery",
                category: "Forensics",
                description: "Recovery of lost or corrupted data",
                duration: "1-4 weeks",
                deliverables: [
                    "Data recovery report",
                    "Recovered data analysis",
                    "Data integrity verification",
                    "Recovery recommendations"
                ],
                teamMembers: [
                    { name: "Maria Garcia", role: "Data Recovery Specialist", email: "maria.garcia@webinfant.com" },
                    { name: "James Lee", role: "Storage Expert", email: "james.lee@webinfant.com" }
                ],
                priceRange: "$5,000 - $20,000"
            }
        ]
    },

    // Consulting Services
    consulting: {
        name: "Security Consulting Services",
        description: "Strategic security guidance and implementation support",
        services: [
            {
                id: "security-strategy",
                name: "Security Strategy",
                category: "Consulting",
                description: "Comprehensive security strategy development",
                duration: "6-12 weeks",
                deliverables: [
                    "Security strategy document",
                    "Risk assessment",
                    "Implementation roadmap",
                    "Budget planning"
                ],
                teamMembers: [
                    { name: "Alex Thompson", role: "Security Strategist", email: "alex.thompson@webinfant.com" },
                    { name: "Sarah Chen", role: "Risk Management Expert", email: "sarah.chen@webinfant.com" }
                ],
                priceRange: "$25,000 - $75,000"
            },
            {
                id: "compliance-consulting",
                name: "Compliance Consulting",
                category: "Consulting",
                description: "Regulatory compliance guidance and implementation",
                duration: "8-16 weeks",
                deliverables: [
                    "Compliance assessment",
                    "Gap analysis report",
                    "Implementation plan",
                    "Audit preparation"
                ],
                teamMembers: [
                    { name: "Emma Wilson", role: "Compliance Specialist", email: "emma.wilson@webinfant.com" },
                    { name: "David Kim", role: "Regulatory Expert", email: "david.kim@webinfant.com" }
                ],
                priceRange: "$20,000 - $60,000"
            },
            {
                id: "architecture-review",
                name: "Security Architecture Review",
                category: "Consulting",
                description: "Comprehensive security architecture assessment",
                duration: "4-8 weeks",
                deliverables: [
                    "Architecture review report",
                    "Security recommendations",
                    "Implementation guidance",
                    "Best practices guide"
                ],
                teamMembers: [
                    { name: "Lisa Park", role: "Security Architect", email: "lisa.park@webinfant.com" },
                    { name: "Tom Anderson", role: "Infrastructure Expert", email: "tom.anderson@webinfant.com" }
                ],
                priceRange: "$15,000 - $40,000"
            }
        ]
    },

    // Management Services
    management: {
        name: "Security Management Services",
        description: "Ongoing security program management and oversight",
        services: [
            {
                id: "vciso",
                name: "Virtual CISO",
                category: "Management",
                description: "Virtual Chief Information Security Officer services",
                duration: "Ongoing",
                deliverables: [
                    "Security leadership",
                    "Strategic planning",
                    "Board reporting",
                    "Risk management"
                ],
                teamMembers: [
                    { name: "Alex Thompson", role: "Virtual CISO", email: "alex.thompson@webinfant.com" },
                    { name: "Sarah Chen", role: "Security Director", email: "sarah.chen@webinfant.com" }
                ],
                priceRange: "$8,000 - $20,000/month"
            },
            {
                id: "security-operations",
                name: "Security Operations Management",
                category: "Management",
                description: "Complete security operations center management",
                duration: "Ongoing",
                deliverables: [
                    "SOC management",
                    "Incident response",
                    "Threat monitoring",
                    "Performance reporting"
                ],
                teamMembers: [
                    { name: "James Lee", role: "SOC Manager", email: "james.lee@webinfant.com" },
                    { name: "Rachel Green", role: "Operations Lead", email: "rachel.green@webinfant.com" }
                ],
                priceRange: "$10,000 - $25,000/month"
            },
            {
                id: "risk-management",
                name: "Risk Management",
                category: "Management",
                description: "Comprehensive cybersecurity risk management",
                duration: "Ongoing",
                deliverables: [
                    "Risk assessments",
                    "Risk mitigation plans",
                    "Regular reporting",
                    "Risk monitoring"
                ],
                teamMembers: [
                    { name: "Sophie Brown", role: "Risk Manager", email: "sophie.brown@webinfant.com" },
                    { name: "Chris Johnson", role: "Risk Analyst", email: "chris.johnson@webinfant.com" }
                ],
                priceRange: "$5,000 - $15,000/month"
            }
        ]
    }
};

// Service categories for easy reference
export const serviceCategories = [
    { id: "assessment", name: "Assessment", icon: "🔍", description: "Security evaluations and testing" },
    { id: "monitoring", name: "Monitoring", icon: "👁️", description: "24/7 threat detection and response" },
    { id: "training", name: "Training", icon: "🎓", description: "Security awareness and technical training" },
    { id: "forensics", name: "Forensics", icon: "🔬", description: "Digital investigation and analysis" },
    { id: "consulting", name: "Consulting", icon: "💼", description: "Strategic security guidance" },
    { id: "management", name: "Management", icon: "⚙️", description: "Security program management" }
];

// Compliance frameworks
export const complianceFrameworks = [
    {
        id: "iso27001",
        name: "ISO 27001",
        description: "Information Security Management System",
        requirements: ["Risk assessment", "Security controls", "Management commitment", "Continuous improvement"],
        certification: true
    },
    {
        id: "soc2",
        name: "SOC 2 Type II",
        description: "Service Organization Control 2",
        requirements: ["Security", "Availability", "Processing integrity", "Confidentiality", "Privacy"],
        certification: true
    },
    {
        id: "gdpr",
        name: "GDPR",
        description: "General Data Protection Regulation",
        requirements: ["Data protection", "Privacy by design", "Consent management", "Data subject rights"],
        certification: false
    },
    {
        id: "hipaa",
        name: "HIPAA",
        description: "Health Insurance Portability and Accountability Act",
        requirements: ["Privacy rule", "Security rule", "Breach notification", "Administrative safeguards"],
        certification: false
    },
    {
        id: "pci-dss",
        name: "PCI DSS",
        description: "Payment Card Industry Data Security Standard",
        requirements: ["Network security", "Access control", "Vulnerability management", "Security monitoring"],
        certification: true
    },
    {
        id: "nist",
        name: "NIST Cybersecurity Framework",
        description: "National Institute of Standards and Technology",
        requirements: ["Identify", "Protect", "Detect", "Respond", "Recover"],
        certification: false
    }
];

// Security metrics and KPIs
export const securityMetrics = {
    riskScoring: {
        low: { range: "0-25", color: "green", description: "Minimal risk" },
        medium: { range: "26-50", color: "yellow", description: "Moderate risk" },
        high: { range: "51-75", color: "orange", description: "High risk" },
        critical: { range: "76-100", color: "red", description: "Critical risk" }
    },
    complianceScoring: {
        excellent: { range: "90-100", color: "green", description: "Excellent compliance" },
        good: { range: "75-89", color: "blue", description: "Good compliance" },
        fair: { range: "60-74", color: "yellow", description: "Fair compliance" },
        poor: { range: "0-59", color: "red", description: "Poor compliance" }
    },
    incidentSeverity: {
        low: { color: "green", responseTime: "24 hours", description: "Minor incident" },
        medium: { color: "yellow", responseTime: "4 hours", description: "Moderate incident" },
        high: { color: "orange", responseTime: "1 hour", description: "High priority incident" },
        critical: { color: "red", responseTime: "15 minutes", description: "Critical incident" }
    }
};

// Common security findings and recommendations
export const securityFindings = {
    vulnerabilities: [
        {
            id: "weak-passwords",
            title: "Weak Password Policies",
            severity: "high",
            description: "Password policies do not meet security standards",
            impact: "Increased risk of unauthorized access",
            recommendation: "Implement strong password policies with complexity requirements"
        },
        {
            id: "missing-mfa",
            title: "Missing Multi-Factor Authentication",
            severity: "critical",
            description: "Critical systems lack MFA protection",
            impact: "High risk of account compromise",
            recommendation: "Deploy MFA across all critical systems and user accounts"
        },
        {
            id: "outdated-software",
            title: "Outdated Software Versions",
            severity: "medium",
            description: "Systems running outdated software with known vulnerabilities",
            impact: "Exploitable vulnerabilities in production environment",
            recommendation: "Implement regular patch management and update schedule"
        }
    ],
    recommendations: [
        {
            id: "security-awareness",
            title: "Implement Security Awareness Training",
            priority: "high",
            description: "Regular training for all employees on cybersecurity best practices",
            timeline: "30 days",
            cost: "$2,000 - $5,000/month"
        },
        {
            id: "incident-response",
            title: "Develop Incident Response Plan",
            priority: "critical",
            description: "Comprehensive incident response procedures and team training",
            timeline: "60 days",
            cost: "$10,000 - $25,000"
        },
        {
            id: "vulnerability-management",
            title: "Establish Vulnerability Management Program",
            priority: "high",
            description: "Regular vulnerability scanning and remediation process",
            timeline: "45 days",
            cost: "$5,000 - $15,000/month"
        }
    ]
}; 