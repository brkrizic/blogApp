import blogPicture from "../assets/react.svg";

export const dummyPost = {
    id: "1",
    userId: "1",
    title: "How to Build a Blog with React and TypeScript",
    slug: "build-blog-react-typescript",
    author: "Jane Doe",
    date: "2025-05-22",
    coverImage: blogPicture,
    excerpt:
      "In this post, we’ll walk through how to build a modern blog application using React, TypeScript, and Tailwind CSS.",
    content: `
  ## Introduction
  
  React and TypeScript make an excellent combination for building fast, type-safe apps. Let's break down how to get started building a blog app using these tools, along with Vite and Tailwind CSS.
  
  ### Tools We'll Use
  
  - React
  - TypeScript
  - Vite
  - Tailwind CSS
  - React Router
  
  ### Getting Started
  
  First, scaffold your project:
  
  \`\`\`bash
  npm create vite@latest my-blog -- --template react-ts
  cd my-blog
  npm install
  \`\`\`
  
  Now you're ready to build!
  
  ---
  
  Stay tuned for part 2, where we’ll cover routing, markdown support, and more!
  `,
    tags: ["react", "typescript", "tailwind", "vite", "blog"],
    comments: []
  };
  