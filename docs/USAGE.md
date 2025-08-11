## Usage Guide

This guide covers setup, running locally, and common flows like authoring blog posts and using the admin panel.

### Prerequisites
- Node.js 16+
- Firebase project (Firestore + Authentication enabled)

### Install
```bash
npm install
```

### Configure Firebase
1. Open `src/firebase/config.js`
2. Replace the placeholder `firebaseConfig` with your project's values
3. Ensure Firestore and Authentication are enabled in the Firebase Console

### Run locally
```bash
npm start
```
App runs at `http://localhost:3000`.

### Admin authentication
- Create a user in Firebase Console → Authentication → Users → Add user (Email/Password)
- Visit `/admin` to access the admin UI

### Managing blog posts
The admin dashboard supports Create, Read, Update, Delete.

- Create:
  - Click "New Post"
  - Fill: title, excerpt, author, image, tags (comma-separated), content
  - Slug: auto-generated from title; you can customize by editing title before saving

- Edit:
  - Click the edit icon on a post
  - Modify fields and save

- Delete:
  - Click the trash icon → confirm

- View:
  - Public pages: `/blog` lists posts, `/blog/:slug` shows one post

### Example: Programmatic usage of services
```javascript
import { getAllPosts, getPostBySlug, createPost, updatePost, deletePost, generateSlug } from "./src/firebase/blogService";
import { signIn, signOutUser, getCurrentUser, onAuthStateChange } from "./src/firebase/authService";

(async () => {
  const { user } = await signIn("admin@example.com", "password123");
  if (!user) return;

  const posts = await getAllPosts();

  const slug = generateSlug("New Post");
  const created = await createPost({
    title: "New Post",
    excerpt: "Short description",
    author: "Admin",
    image: "https://via.placeholder.com/800x400",
    tags: ["security"],
    date: new Date().toISOString().split("T")[0],
    content: "# Hello world",
    slug
  });

  await updatePost(created.id, { ...created, title: "Updated Title" });
  await deletePost(created.id);

  await signOutUser();
})();
```