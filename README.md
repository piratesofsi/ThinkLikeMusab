
---

# ThinkLikeMusab

A DSA blog focused on **how to think**, not just how to solve.

Most DSA content gives you the clean solution. This gives you the messy, honest thought process — the wrong attempts, the realizations, and finally the code.

🔗 **Live** → [https://think-like-musab.vercel.app](https://think-like-musab.vercel.app)

---

## 🧠 What This Is

ThinkLikeMusab is a full-stack DSA learning journal. Every post documents a real problem-solving journey:

* The initial (often wrong) approach
* The insight that changed the direction
* The optimized solution with explanation
* Complexity analysis

Contributors can submit posts through the site. All submissions are reviewed before going live.

---

## ⚙️ Tech Stack

| Layer         | Tech                                 |
| ------------- | ------------------------------------ |
| Frontend      | React + Vite                         |
| Styling       | Tailwind CSS v4                      |
| Routing       | React Router v6                      |
| Markdown      | ReactMarkdown + remark-gfm           |
| Notifications | React Hot Toast                      |
| Icons         | Lucide React                         |
| Backend       | Node.js + Express                    |
| Database      | MongoDB + Mongoose                   |
| Auth          | JWT + bcryptjs                       |
| Email         | Nodemailer                           |
| Deployment    | Vercel (frontend) + Render (backend) |

---

## 📁 Project Structure

```
ThinkLikeMusab/
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Posts.jsx
│       │   ├── Categories.jsx
│       │   ├── About.jsx
│       │   ├── Contribute.jsx
│       │   └── Admin.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   └── Contribute.jsx
│       └── utils/
│           └── api.js
└── backend/
    ├── models/
    │   ├── Post.js
    │   └── User.js
    ├── routes/
    │   ├── posts.js
    │   └── auth.js
    ├── middleware/
    │   └── auth.js
    ├── config/
    │   └── db.js
    ├── seed.js
    └── server.js
```

---

## 🚀 Running Locally

### 🔹 Frontend

```bash
git clone https://github.com/piratesofsi/ThinkLikeMusab.git
cd ThinkLikeMusab/frontend
npm install
npm run dev
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

---

### 🔹 Backend

```bash
cd ThinkLikeMusab/backend
npm install
npm run dev
```

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
PORT=5000
```

---

### 🌱 Seed the Database

```bash
cd backend
node seed.js
```

---

## 🔗 API Routes

| Method | Route                    | Auth | Description              |
| ------ | ------------------------ | ---- | ------------------------ |
| GET    | `/api/posts`             | No   | Get all approved posts   |
| POST   | `/api/posts/submit`      | No   | Submit a post for review |
| GET    | `/api/posts/admin`       | Yes  | Get all posts (admin)    |
| PUT    | `/api/posts/approve/:id` | Yes  | Approve a post           |
| PUT    | `/api/posts/reject/:id`  | Yes  | Reject a post            |
| DELETE | `/api/posts/:id`         | Yes  | Delete a post            |
| POST   | `/api/auth/login`        | No   | Admin login              |

---

## ✍️ Contributing

Anyone can contribute a post through the site at `/contribute`.

### 🔄 How it works

1. Go to `/contribute`
2. Fill in the title, description, tags, and content (Markdown)
3. Submit — it goes into review
4. Once approved, it appears on the site automatically

---

### 🧾 Writing Guidelines

* Write in first person — document real thinking, not textbook answers
* Use `>` blockquotes for key insights — they render as callout boxes
* Include dry runs or examples where helpful
* Always include time and space complexity

---

### 📝 Markdown Reference

| Syntax            | Result          |     |   |       |
| ----------------- | --------------- | --- | - | ----- |
| `## Heading`      | Section heading |     |   |       |
| `### Sub heading` | Sub section     |     |   |       |
| `**bold**`        | Bold text       |     |   |       |
| `` `code` ``      | Inline code     |     |   |       |
| `> insight`       | Callout box     |     |   |       |
| `- item`          | Bullet list     |     |   |       |
| `1. item`         | Numbered list   |     |   |       |
| `---`             | Divider         |     |   |       |
| `                 | col             | col | ` | Table |

#### Code Blocks

Use triple backticks outside tables:

```java
// Java example
int x = 10;
```

```cpp
// C++ example
int x = 10;
```

```javascript
// JavaScript example
const x = 10;
```

---

## 🏷️ Available Tags

`Arrays` · `Sorting` · `Graphs` · `Trees` · `Dynamic Programming` · `Greedy` · `Linked Lists` · `Strings` · `Binary Search`

---

## 👨‍💻 Author

**Musab Shaikh**
3rd Year Computer Engineering Student
MERN Stack Developer

🔗 GitHub → [https://github.com/piratesofsi](https://github.com/piratesofsi)

---

## 📄 License

MIT
