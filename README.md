# CollabMD Markdown Editor



## Features

- **Real-time markdown editing and rendering**  
  Write markdown syntax while instantly seeing it rendered as formatted, readable content.

- **User authentication and access control**  
  - Users register and log in to access the application.  
  - Only authenticated users can create, view, edit, or share documents, ensuring controlled access to files and collaborative features.

- **Split editor and preview view**  
  Edit content and view the rendered output side by side for fast feedback while writing.

- **Export documents as `.md` files**  
  Download markdown files through the backend for local use or sharing.


### Real-time collaboration (collaborative-change branch)

- ** Document sharing**: Share files with other authenticated users to work on the same document.

- **Simultaneous editing** : Multiple users can edit a document at the same time, with changes reflected in real time.

- **Comments and discussions**: Users can write and view comments on a document, working like a chat session tied to the file.



---

CollabMD is a markdown editor that lets you write and preview your content in real time.You can use the demo app at https://mark-down-editor-qxuh-git-collaborative-change-hyemies-projects.vercel.app/. It's built with React on the frontend and Node.js/Express on the backend, so you can run everything together without extra setup.

The collaborative-change branch includes collaborative features where two or more users can edit the same document and share comments.

It’s built with **React** on the frontend and **Node/Express** on the backend so you can run everything together without extra setup.


---

## 🧰 Tech Stack

- **Frontend:** React, CSS Modules, Marked.js  
- **Backend:** Node.js, Express  
- **Extras:** CORS, Body-Parser, FileSystem (fs)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/hyemiie/markDownEditor.git
cd markDownEditor
```

### 2. Install dependencies

Frontend
```bash
cd client
npm install
```

Backend
```bash
cd server
npm install

```

### 3. Run the app
Open two terminals:

Terminal 1 – Start backend:
```bash
cd server
node index.js
```
Backend runs on `http://localhost:5000`

Terminal 2 – Start frontend:
```bash
cd client
npm start
```
Frontend runs on `http://localhost:3000`

---

## 💡 Why I Built This
As someone who writes technical articles regularly, I got curious about what it'd take to build a markdown editor that's clean and fast as well.
That curiosity pushed me to build Tier Markdown, a lightweight, personal editor designed to make writing feel calm and focused.


---
## 🙌 Contributing
Want to suggest a feature or fix a bug?
Fork the repo, make your changes, and open a pull request — I’m open to ideas.

GitHub: [@hyemiie](https://github.com/hyemiie)  
Email: yemiojedapo1@gmail.com
