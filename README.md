# Webifant Security - React Website

A professional cybersecurity company website built with React, featuring a blog system with Firebase integration. This website has been updated with real content from the Webifant Security website.

## Features

- **Real Content**: Integrated with actual Webifant Security content and branding
- **Modern Design**: Inspired by Rapid7 with bold hero sections and professional styling
- **Responsive Layout**: Mobile-first design with Tailwind CSS
- **Blog System**: Full-featured blog with Firebase Firestore backend
- **Admin Panel**: Secure admin interface for managing blog posts
- **Authentication**: Firebase Auth for secure admin login
- **Markdown Support**: Rich text editing with markdown support
- **SEO Optimized**: Meta tags and proper routing structure

## Content Integration

This website now includes real content from the Webifant Security website:

### Home Page

- Real company tagline: "Experience unbeatable online protection of your legacy"
- Actual services: Cybersecurity Assessments, Digital Forensics, Security Management, etc.
- Real testimonials from actual clients
- Founder's story and mission
- Actual company statistics and certifications

### About Page

- Real company story and mission
- Actual team certifications
- Founder's personal journey and vision
- Company values and approach

### Services Page

- Detailed service descriptions
- Real service offerings with features
- Company certifications and expertise
- Security process explanation

### Contact Page

- Real contact information:
  - Phone: +1 (908) 520-5559
  - Email: hello@webifant.com
  - US Office: 260, South Plainfield, NJ 07080, USA
  - Nigeria Office: 2, Lane 8, Owode Estate, Osogbo
- Social media links

### Blog

- Real blog posts from the original website:
  - "Why Are Small Businesses Under Cyber Attacks?"
  - "5 Reasons Cybercriminals Target Small Businesses Over Big Enterprises"
  - "Top 5 Cybersecurity Threats Every E-commerce Store Owner Should Watch Out For"

### Admin Features

- **Populate Blog**: New button to automatically add real blog posts from the Webifant website
- All existing admin features for managing content

## Tech Stack

- **Frontend**: React 18, React Router v6
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Firebase (Firestore, Authentication)
- **Forms**: React Hook Form with Yup validation
- **Markdown**: React Markdown
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd webinfant-react
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Get your Firebase config

4. Configure Firebase:
   - Open `src/firebase/config.js`
   - Replace the placeholder config with your actual Firebase project details:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
};
```

5. Create Admin User:

   - In Firebase Console, go to Authentication
   - Add a new user with email and password
   - Use these credentials to login to the admin panel

6. Start the development server:

```bash
npm start
```

The app will be available at `http://localhost:3000`

## Populating Real Content

To add the real Webifant blog posts to your database:

1. Login to the admin panel at `/admin`
2. Click the "Populate Blog" button
3. Confirm the action
4. The real blog posts from the Webifant website will be added to your database

## Project Structure

```
src/
├── firebase/           # Firebase configuration and services
│   ├── config.js      # Firebase app configuration
│   ├── authService.js # Authentication functions
│   └── blogService.js # Blog CRUD operations
├── pages/             # React components
│   ├── Home.js        # Landing page with real content
│   ├── About.js       # About page with real company info
│   ├── Services.js    # Services page with real offerings
│   ├── Contact.js     # Contact page with real contact info
│   ├── Blog.js        # Blog listing page
│   ├── BlogPost.js    # Individual blog post
│   ├── Admin.js       # Admin authentication wrapper
│   ├── AdminLogin.js  # Admin login form
│   └── AdminDashboard.js # Blog management interface
├── utils/             # Utility functions
│   └── populateBlog.js # Real blog content population
└── App.js             # Main app component
```

## Firebase Setup

### Firestore Database Rules

Set up these security rules in your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts - anyone can read, only authenticated users can write
    match /blog-posts/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Authentication Rules

- Enable Email/Password authentication in Firebase Console
- Create admin users through the Firebase Console
- Users can only access admin features if authenticated

## Deployment

### cPanel Deployment

1. Build the project:

```bash
npm run build
```

2. Upload the `build` folder contents to your cPanel public_html directory

3. Ensure the `.htaccess` file is in place for React Router support

### Other Deployment Options

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the build folder
- **Firebase Hosting**: Use `firebase deploy` command

## Admin Features

- **Login**: Secure authentication with Firebase Auth
- **Create Posts**: Rich markdown editor for blog posts
- **Edit Posts**: Update existing blog posts
- **Delete Posts**: Remove posts with confirmation
- **Preview**: View posts before publishing
- **Tags**: Organize posts with tags
- **Images**: Add featured images to posts
- **Populate Blog**: Add real Webifant blog posts automatically

## Blog Features

- **Real Content**: Actual blog posts from Webifant Security
- **Responsive Design**: Mobile-friendly blog layout
- **Search**: Search posts by title, excerpt, or author
- **Tag Filtering**: Filter posts by tags
- **Markdown Rendering**: Rich content with markdown support
- **SEO Optimized**: Proper meta tags and structure
- **Social Sharing**: Ready for social media integration

## Customization

### Styling

- Modify `tailwind.config.js` for theme customization
- Update colors in `src/index.css` for brand colors
- Edit component styles in individual `.js` files

### Content

- All content has been updated with real Webifant Security information
- Company information, services, and contact details are accurate
- Blog posts contain real cybersecurity insights and advice

### Firebase

- Extend `blogService.js` for additional blog features
- Add user management in `authService.js`
- Implement file uploads with Firebase Storage

## Security Considerations

- Firebase security rules protect your data
- Admin authentication prevents unauthorized access
- Input validation with React Hook Form
- XSS protection with React Markdown

## Docs
- API Reference: `docs/API.md`
- Components Reference: `docs/COMPONENTS.md`
- Usage Guide: `docs/USAGE.md`

## Support

For issues or questions:

1. Check Firebase Console for configuration
2. Verify Firestore rules are set correctly
3. Ensure admin user exists in Firebase Auth
4. Use the "Populate Blog" feature to add real content
