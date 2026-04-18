# ThinkLikeMusab

A DSA blog focused on **how to think**, not just how to solve.

Most DSA content gives you the clean solution. This gives you the messy, honest thought process — the wrong attempts, the realizations, and finally the code.

🔗 Live → https://think-like-musab.vercel.app

---

## What This Is

ThinkLikeMusab is a personal DSA learning journal built as a full-stack blog. Every post documents a real problem-solving journey:

- The initial (often wrong) approach  
- The insight that changed the direction  
- The optimized solution with explanation  
- Complexity analysis  

---

## Tech Stack

| Layer         | Tech                         |
|--------------|------------------------------|
| Frontend      | React + Vite                 |
| Styling       | Tailwind CSS v4              |
| Routing       | React Router v6              |
| Markdown      | ReactMarkdown + remark-gfm   |
| Notifications | React Hot Toast              |
| Icons         | Lucide React                 |
| Deployment    | Vercel                       |

---

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Posts.jsx
│   │   ├── Categories.jsx
│   │   └── About.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Contribute.jsx
│   └── data/
│       └── Post.js        # All post content lives here
```

---

## Running Locally

```bash
# Clone the repo
git clone https://github.com/piratesofsi/ThinkLikeMusab.git

cd ThinkLikeMusab/frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## Contributing

Contributions are welcome. If you have a better explanation, a new problem, or a fix — open a PR.

### How to add a new post

1. Open `src/data/Post.js`
2. Add a new object to the `posts` array:

```js
{
  id: "your-problem-slug",
  question: "Question 10",
  title: "ThinkLikeMusab #10 – Problem Name",
  tags: ["Arrays", "Sorting"],
  description: "One line summary",
  content: `
## Problem
...your markdown content here...
  `
}
```

3. Done — it will automatically appear everywhere.

---

## Guidelines

- Write in first person — document real thinking, not textbook answers  
- Use `>` blockquotes for insights  
- Include dry runs where helpful  
- Always include time and space complexity  

---

## Available Tags

`Arrays` · `Sorting` · `Graphs` · `Trees` · `Dynamic Programming` · `Greedy` · `Linked Lists` · `Strings` · `Binary Search`

---

## Author

**Musab** — 3rd year Computer Engineering student, MERN stack developer  

GitHub: https://github.com/piratesofsi

---

## License

MIT
