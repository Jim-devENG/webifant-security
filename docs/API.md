## API Reference

This document covers all public modules and exported functions in the project, with examples and usage tips.

### Firebase Configuration (`src/firebase/config.js`)

Exports:
- `db`: Firestore instance
- `auth`: Firebase Auth instance
- `storage`: Firebase Storage instance
- `default export`: The initialized Firebase `app`

Usage:
```javascript
import app, { db, auth, storage } from "../firebase/config";

// Example: use db with Firestore queries
// import { collection, getDocs } from "firebase/firestore";
```

Configuration:
- Replace placeholders in `src/firebase/config.js` with your Firebase project settings.

Example:
```javascript
// src/firebase/config.js
const firebaseConfig = {
  apiKey: "<apiKey>",
  authDomain: "<project>.firebaseapp.com",
  projectId: "<projectId>",
  storageBucket: "<bucket>",
  messagingSenderId: "<senderId>",
  appId: "<appId>"
};
```

### Auth Service (`src/firebase/authService.js`)

- `async signIn(email: string, password: string) => Promise<{ user: FirebaseUser | null, error: string | null }>`
  - Signs in with email/password.
  - Returns `{ user, error }` where `user` is set on success, otherwise `error` contains a message.
  - Example:
  ```javascript
  import { signIn } from "../firebase/authService";

  const { user, error } = await signIn(email, password);
  if (user) {
    // proceed
  } else {
    console.error(error);
  }
  ```

- `async signOutUser() => Promise<{ error: string | null }>`
  - Signs out current user.
  - Example:
  ```javascript
  import { signOutUser } from "../firebase/authService";
  await signOutUser();
  ```

- `onAuthStateChange(callback: (user: FirebaseUser | null) => void) => Unsubscribe`
  - Subscribes to auth state changes; returns an unsubscribe function.
  - Example:
  ```javascript
  import { onAuthStateChange } from "../firebase/authService";
  const unsubscribe = onAuthStateChange(user => {
    console.log("auth changed", user);
  });
  // later
  unsubscribe();
  ```

- `getCurrentUser() => FirebaseUser | null`
  - Returns the current user from `auth`.

### Blog Service (`src/firebase/blogService.js`)

Collection: `blog-posts` in Firestore.

Post shape returned by reads:
```ts
interface Post {
  id: string;
  slug: string;
  frontmatter: {
    title: string;
    excerpt: string;
    date: string;       // ISO date (YYYY-MM-DD)
    image: string;      // URL
    author: string;
    tags: string[];
  };
  content: string;      // Markdown
}
```

Exports:

- `async getAllPosts() => Promise<Post[]>`
  - Returns all posts ordered by `createdAt` desc.
  - Example:
  ```javascript
  import { getAllPosts } from "../firebase/blogService";
  const posts = await getAllPosts();
  ```

- `async getPostBySlug(slug: string) => Promise<Post | null>`
  - Returns one post matching `slug`, or `null` if not found.
  - Example:
  ```javascript
  import { getPostBySlug } from "../firebase/blogService";
  const post = await getPostBySlug("how-to-spot-phishing");
  ```

- `async createPost(postData: Omit<Post, "id">) => Promise<{ id: string } & Omit<Post, "id">>`
  - Creates a post with timestamps; returns created data with `id`.
  - Expected `postData` fields: `title, excerpt, author, image, tags, date, content, slug`.
  - Example:
  ```javascript
  import { createPost, generateSlug } from "../firebase/blogService";

  const now = new Date().toISOString().split("T")[0];
  const newPost = await createPost({
    title: "A title",
    excerpt: "Short description",
    author: "Author Name",
    image: "https://...",
    tags: ["security"],
    date: now,
    content: "# Markdown body...",
    slug: generateSlug("A title")
  });
  ```

- `async updatePost(postId: string, postData: Omit<Post, "id">) => Promise<{ id: string } & Omit<Post, "id">>`
  - Updates the given post, setting `updatedAt`.

- `async deletePost(postId: string) => Promise<boolean>`
  - Deletes the document; returns `true` on success.

- `generateSlug(title: string) => string`
  - Lowercases, strips non-alnum, collapses spaces to hyphens.
  - Example: `generateSlug("Hello World!") // "hello-world"`

### Local Blog Utilities (`src/utils/blogUtils.js`)

Static in-memory content useful for local previews or testing. Not used when Firestore is configured.

Exports:
- `getAllPosts() => Array<Post>`: Returns static posts sorted by date desc.
- `getPostBySlug(slug: string) => Post | undefined`.
- `getPostSlugs() => string[]`.

Example:
```javascript
import { getAllPosts, getPostBySlug, getPostSlugs } from "../utils/blogUtils";
const posts = getAllPosts();
const slugs = getPostSlugs();
const one = getPostBySlug(slugs[0]);
```

### Web Vitals (`src/reportWebVitals.js`)

- `default export reportWebVitals(onPerfEntry?: (metric: any) => void): void`
  - When passed a function, dynamically imports `web-vitals` and reports metrics.

Usage example (already wired in `src/index.js`):
```javascript
import reportWebVitals from "./reportWebVitals";
reportWebVitals(console.log);
```