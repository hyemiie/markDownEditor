# CollabMD Markdown Editor



## Features

- **Real-time markdown editing and rendering**  
  Write markdown syntax while instantly seeing it rendered as formatted, readable content.

- **User authentication and access control**  
 Users have to register and log in to access the application. Only authenticated users can create, view, edit, or share documents, ensuring controlled access to files and collaborative features.

- **Split editor and preview view**  
  Edit content and view the rendered output side by side for fast feedback while writing.

- **Export documents as `.md` files**  
  Download markdown files through the backend for local use or sharing.

### Real-time collaboration (collaborative-change branch)

- **Document sharing**: Share files with other authenticated users to work on the same document.

- **Simultaneous editing** : Multiple users can edit a document at the same time, with changes reflected in real time.

- **Comments and discussions**: Users can write and view comments on a document, working like a chat session tied to the file.

---
CollabMD is a markdown editor built for real-time collaboration. It allows users to write markdown and see the formatted output immediately, with features that streamline editing and feedback.

The editor includes advanced text editing tools, and in the collaborative-change branch, I added multi-user support so multiple users can edit and comment on the same document at once.


---
## Technologies I Used

- **Frontend**: React, CSS Modules, Marked.js.

- **Backend**: Node.js, Express.

- **Database**: MongoDB.

- **Extras**: CORS, Body-Parser, FileSystem (fs).

---

## How to Use Locally

### 1. Clone the repo

```bash
git clone https://github.com/hyemiie/markDownEditor.git
cd markDownEditor
```


### 2. Checkout to the desired branch

After cloning the repo, switch to the branch you want to work with, for example:

```bash
git checkout collaborative-change
```

### 3. Create a .env file

In the root of the project, create a .env file and add your MongoDB URI:

```bash
MONGO_URI=your_mongo_db_uri_here
```

### 4. Install dependencies

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

### 5. Run the app
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

## Why I Built This
As someone who writes technical articles regularly, I got curious about what it'd take to build a markdown editor that's clean and fast as well. Building CollabMD let me:

- Render markdown in real time — see changes instantly while typing, improving the writing experience.

- Support advanced editing — multi-cursor, keyboard shortcuts, and smooth text manipulation.

- Design a clear architecture — separate frontend and backend for maintainability and scalability.

- Enable collaboration — let multiple users edit and comment on the same document simultaneously.

Through this project, I learned how to synchronize concurrent changes, manage user sessions, and build a collaborative workflow that works reliably
---
## Contributing
Want to suggest a feature or fix a bug?
Fork the repo, make your changes, and open a pull request — I’m open to ideas.

GitHub: [@hyemiie](https://github.com/hyemiie)  
Email: yemiojedapo1@gmail.com
