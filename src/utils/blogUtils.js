// Blog posts data - in a real app, this would come from an API or CMS
const postsData = [
    {
        slug: 'how-to-spot-phishing',
        frontmatter: {
            title: "How to Spot a Phishing Email",
            excerpt: "Learn the telltale signs of phishing emails and how to protect your organization from social engineering attacks.",
            date: "2024-04-10",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
            author: "Webifant Security Team",
            tags: ["phishing", "email security", "social engineering"]
        },
        content: `# How to Spot a Phishing Email

Phishing attacks remain one of the most common and effective methods cybercriminals use to gain unauthorized access to systems and steal sensitive information. In this guide, we'll show you how to identify phishing emails and protect your organization.

## Common Phishing Indicators

### 1. Suspicious Sender Address
Always check the sender's email address carefully. Phishers often use addresses that look similar to legitimate ones:
- \`support@microsft.com\` (instead of microsoft.com)
- \`security@paypa1.com\` (using "1" instead of "l")

### 2. Urgent or Threatening Language
Phishing emails often create a sense of urgency:
- "Your account will be suspended in 24 hours"
- "Immediate action required"
- "Security breach detected"

### 3. Poor Grammar and Spelling
Legitimate companies typically have professional communications. Multiple spelling errors or awkward phrasing are red flags.

### 4. Suspicious Links
Hover over links before clicking to see the actual destination URL. Phishers often use:
- Shortened URLs (bit.ly, tinyurl.com)
- URLs that don't match the company's domain
- IP addresses instead of domain names

### 5. Requests for Sensitive Information
Legitimate companies rarely ask for:
- Passwords via email
- Credit card numbers
- Social Security numbers
- Bank account details

## Best Practices for Protection

### Employee Training
Regular security awareness training is crucial. Teach employees to:
- Never click suspicious links
- Verify sender addresses
- Report suspicious emails immediately
- Use multi-factor authentication

### Technical Measures
- Implement email filtering solutions
- Use advanced threat protection
- Enable DMARC, SPF, and DKIM
- Regular security assessments

### Incident Response
Have a clear process for reporting and responding to phishing attempts:
1. Don't click any links or attachments
2. Report to your IT security team
3. Forward the email to your security team
4. Delete the email after reporting

## Real-World Example

Here's what a typical phishing email might look like:

\`\`\`
From: security@paypa1.com
Subject: URGENT: Your PayPal account has been limited

Dear PayPal User,

We have detected unusual activity on your account. 
Your account has been temporarily limited for security reasons.

Click here to verify your identity: [suspicious-link.com]

If you don't verify within 24 hours, your account will be permanently suspended.

PayPal Security Team
\`\`\`

**Red flags in this example:**
- Misspelled domain (paypa1.com)
- Urgent language
- Suspicious link
- Generic greeting
- Threat of account suspension

## Conclusion

Staying vigilant and educating your team about phishing indicators is the best defense against these attacks. Remember: when in doubt, don't click, and always verify with your security team.

For more information about protecting your organization from cyber threats, contact Webifant Security today.`
    },
    {
        slug: 'security-assessment-guide',
        frontmatter: {
            title: "Why Every Business Needs a Security Assessment",
            excerpt: "Discover the benefits of regular vulnerability assessments and how they can prevent costly breaches.",
            date: "2024-03-22",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
            author: "Webifant Security Team",
            tags: ["security assessment", "vulnerability", "risk management"]
        },
        content: `# Why Every Business Needs a Security Assessment

In today's interconnected digital landscape, no organization is immune to cyber threats. Regular security assessments are not just a best practice—they're essential for protecting your business, customers, and reputation.

## What is a Security Assessment?

A security assessment is a comprehensive evaluation of your organization's cybersecurity posture. It identifies vulnerabilities, assesses risks, and provides actionable recommendations to strengthen your defenses.

### Types of Security Assessments

1. **Vulnerability Assessment**
   - Automated scanning of systems and networks
   - Identifies known security weaknesses
   - Provides a baseline security posture

2. **Penetration Testing**
   - Simulated attacks by security professionals
   - Tests actual exploitability of vulnerabilities
   - Provides real-world attack scenarios

3. **Security Architecture Review**
   - Evaluates overall security design
   - Assesses compliance with security frameworks
   - Identifies architectural weaknesses

## Benefits of Regular Security Assessments

### 1. Proactive Threat Detection
Instead of waiting for a breach to discover vulnerabilities, assessments help you find and fix issues before attackers can exploit them.

### 2. Compliance Requirements
Many industries require regular security assessments:
- **Healthcare**: HIPAA compliance
- **Finance**: PCI DSS, SOX compliance
- **Government**: FISMA, FedRAMP requirements

### 3. Cost Savings
The cost of preventing a breach is significantly lower than the cost of responding to one:
- Average cost of a data breach: $4.35 million
- Cost of security assessment: $5,000 - $50,000

### 4. Customer Trust
Demonstrating proactive security measures builds confidence with customers and partners.

## What Gets Assessed

### Network Security
- Firewall configurations
- Network segmentation
- Wireless network security
- Remote access controls

### Application Security
- Web application vulnerabilities
- API security
- Code review and testing
- Third-party component analysis

### Endpoint Security
- Workstation configurations
- Mobile device management
- Anti-malware solutions
- Patch management

### Physical Security
- Access controls
- Environmental controls
- Asset management
- Incident response procedures

## Assessment Process

### Phase 1: Planning and Scoping
- Define assessment objectives
- Identify systems and assets
- Establish rules of engagement
- Obtain necessary approvals

### Phase 2: Information Gathering
- Network discovery and mapping
- Service enumeration
- Vulnerability scanning
- Configuration review

### Phase 3: Analysis and Testing
- Manual testing and validation
- Exploit development and testing
- Social engineering assessments
- Physical security testing

### Phase 4: Reporting and Remediation
- Detailed findings report
- Risk prioritization
- Remediation recommendations
- Follow-up testing

## Common Findings

### High-Risk Vulnerabilities
- Unpatched systems and software
- Default or weak passwords
- Misconfigured security controls
- Unencrypted sensitive data

### Medium-Risk Issues
- Outdated security policies
- Insufficient logging and monitoring
- Poor access management
- Inadequate backup procedures

### Low-Risk Observations
- Documentation gaps
- Process improvements
- Training recommendations
- Best practice suggestions

## Getting Started

### 1. Choose the Right Assessment
- **Start with a vulnerability assessment** for baseline security
- **Add penetration testing** for deeper analysis
- **Consider compliance-specific assessments** if required

### 2. Select a Qualified Provider
- Look for certified security professionals
- Check references and experience
- Ensure proper insurance and liability coverage
- Verify methodology and reporting standards

### 3. Prepare Your Organization
- Identify key stakeholders
- Prepare system documentation
- Establish communication protocols
- Plan for remediation activities

## Conclusion

Security assessments are an investment in your organization's future. They provide the insights needed to make informed security decisions and demonstrate your commitment to protecting sensitive information.

Don't wait for a breach to discover your vulnerabilities. Contact Webifant Security today to schedule your security assessment and take the first step toward a more secure future.`
    }
];

export function getAllPosts() {
    return postsData.sort( ( a, b ) => new Date( b.frontmatter.date ) - new Date( a.frontmatter.date ) );
}

export function getPostBySlug( slug ) {
    return postsData.find( post => post.slug === slug );
}

export function getPostSlugs() {
    return postsData.map( post => post.slug );
} 