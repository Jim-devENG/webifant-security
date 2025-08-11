## Components Reference

All React components are default exports from files in `src/pages` unless noted. Components are designed for React Router v6 and Tailwind CSS styling.

### App (`src/App.js`)
- Default export `App()`: Sets up routing and layout. Includes `Footer` on every page.
- Routes:
  - `/` → `Home`
  - `/about` → `About`
  - `/services` → `Services`
  - `/faq` → `FAQ`
  - `/blog` → `Blog`
  - `/blog/:slug` → `BlogPost`
  - `/contact` → `Contact`
  - `/careers` → `Careers`
  - `/legal` → `Legal`
  - `/admin` → `Admin`

Usage:
```jsx
import App from "./App";
// Rendered by src/index.js
```

### Layout components

#### Footer (`src/pages/Footer.js`)
- Props: none
- Renders site footer with links and contact info.

Usage:
```jsx
import Footer from "./pages/Footer";
<Footer />
```

### Pages

#### Home (`src/pages/Home.js`)
- Props: none
- Landing page with hero, stats, services, testimonials, and blog preview sections.

#### About (`src/pages/About.js`)
- Props: none
- Company values and timeline.

#### Services (`src/pages/Services.js`)
- Props: none
- Services grid and "Why choose us" section.

#### FAQ (`src/pages/FAQ.js`)
- Props: none
- Interactive FAQ accordion using `framer-motion`.

#### Contact (`src/pages/Contact.js`)
- Props: none
- Contact form with basic client-side state; replace with backend or email service for production.

Example submission handling:
```jsx
// Currently sets submitted state; integrate API as needed
```

#### Careers (`src/pages/Careers.js`)
- Props: none
- Open positions showcase and culture note.

#### Legal (`src/pages/Legal.js`)
- Props: none
- Privacy, rights, disclaimer sections.

#### Blog (`src/pages/Blog.js`)
- Props: none
- Fetches posts via `getAllPosts()` from `firebase/blogService`. Supports search and tag filtering.

Example:
```jsx
import Blog from "./pages/Blog";
// Route path="/blog" element={<Blog />} in App
```

#### BlogPost (`src/pages/BlogPost.js`)
- Props: none (reads `slug` from router params)
- Fetches a single post via `getPostBySlug(slug)` and renders markdown content with `react-markdown` and custom renderers.

URL example:
```
/blog/how-to-spot-phishing
```

#### Admin (`src/pages/Admin.js`)
- Props: none
- Gatekeeper wrapper that shows `AdminLogin` when unauthenticated or `AdminDashboard` when authenticated.
- Subscribes to auth state via `onAuthStateChange`.

#### AdminLogin (`src/pages/AdminLogin.js`)
- Props:
  - `onLogin: (success: boolean) => void` — called with `true` on successful sign-in
- Behavior:
  - Validates form with `yup` and `react-hook-form`
  - Calls `signIn(email, password)` from auth service

Usage:
```jsx
<AdminLogin onLogin={(ok) => ok && console.log("Logged in") } />
```

#### AdminDashboard (`src/pages/AdminDashboard.js`)
- Props:
  - `onLogout: () => void` — called after `signOutUser()` resolves
- Behavior:
  - Lists posts using `getAllPosts()`
  - Create/edit form uses `react-hook-form` + `yup`
  - Calls `createPost`, `updatePost`, `deletePost`
  - Generates slugs with `generateSlug(title)` if creating

Minimal example of save handler shape:
```jsx
// onSubmit(data) builds postData {title, excerpt, author, image, tags[], date, content, slug}
```