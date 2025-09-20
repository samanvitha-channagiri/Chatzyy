# 💬 Chatzy - Real-time Chat Application

A modern, full-stack real-time chat application built with the MERN stack. Chatzy provides seamless communication with instant messaging, image sharing, and a beautiful, responsive interface.

## ✨ Features

- **🔐 Authentication & Authorization**
  - Secure user registration and login
  - JWT-based authentication with HTTP-only cookies
  - Password hashing with bcrypt
  - Protected routes and middleware

- **💬 Real-time Messaging**
  - Instant message delivery using Socket.io
  - Real-time online/offline user status
  - Message history persistence
  - Auto-scroll to latest messages

- **🖼️ Media Sharing**
  - Image upload and sharing in chats
  - Cloudinary integration for image storage
  - Base64 image processing and optimization
  - Image preview before sending

- **🎨 Modern UI/UX**
  - 32+ Beautiful DaisyUI themes
  - Responsive design for all devices
  - Smooth animations and transitions
  - Loading states and skeleton screens
  - Toast notifications for user feedback

- **👥 User Management**
  - User profiles with customizable avatars
  - User search and contact list
  - Online presence indicators
  - Account information display

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Cloudinary** - Image upload and storage
- **Cookie Parser** - Parse HTTP cookies
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications

## 📁 Project Structure

```
Chatzy/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── lib/
│   │   │   ├── cloudinary.js
│   │   │   ├── db.js
│   │   │   ├── socket.js
│   │   │   └── utils.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   ├── models/
│   │   │   ├── message.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   ├── seeds/
│   │   │   └── user.seed.js
│   │   └── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── skeletons/
│   │   │   ├── AuthImagePattern.jsx
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoChatSelected.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── constants/
│   │   │   └── index.js
│   │   ├── lib/
│   │   │   ├── axios.js
│   │   │   └── utils.js
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   └── SignUpPage.jsx
│   │   ├── store/
│   │   │   ├── useAuthStore.js
│   │   │   ├── useChatStore.js
│   │   │   └── useThemeStore.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Chatzyy.git
   cd Chatzyy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   
   Create `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/chatzy
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatzy
   
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   PORT=5001
   
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. **Seed Database (Optional)**
   ```bash
   cd backend
   node src/seeds/user.seed.js
   ```

5. **Start Development Servers**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5001

## 📡 API Endpoints

### Authentication Routes
```
POST /api/auth/signup      - Register new user
POST /api/auth/login       - User login
POST /api/auth/logout      - User logout
PUT  /api/auth/update-profile - Update user profile
GET  /api/auth/check       - Check authentication status
```

### Message Routes
```
GET  /api/messages/user    - Get all users for sidebar
GET  /api/messages/:id     - Get messages with specific user
POST /api/messages/send/:id - Send message to user
```

## 🎨 Available Themes

Chatzy supports 32+ beautiful themes powered by DaisyUI:

- light, dark, cupcake, bumblebee, emerald, corporate
- synthwave, retro, cyberpunk, valentine, halloween
- garden, forest, aqua, lofi, pastel, fantasy
- wireframe, black, luxury, dracula, cmyk, autumn
- business, acid, lemonade, night, coffee, winter
- dim, nord, sunset

## 🔧 Configuration

### Socket.io Configuration
The app uses Socket.io for real-time communication with the following events:
- `connection` - User connects
- `disconnect` - User disconnects  
- `getOnlineUsers` - Broadcast online users
- `newMessage` - Send/receive messages

### Database Models

**User Model:**
```javascript
{
  email: String (required, unique),
  fullName: String (required),
  password: String (required, min 6 chars),
  profilePic: String (default: "")
}
```

**Message Model:**
```javascript
{
  senderId: ObjectId (ref: User),
  receiverId: ObjectId (ref: User),
  text: String,
  image: String
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Heroku/Railway/Render
1. Set environment variables in your hosting platform
2. Update CORS origins in `backend/src/index.js`
3. Deploy using platform-specific instructions

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```



## 👨‍💻 Author

**Samanvitha Channagiri**
- GitHub: [@samanvitha-channagiri](https://github.com/samanvitha-channagiri)
- Email: [your-email@example.com](mailto:your-email@example.com)

## 🙏 Acknowledgments

- [Socket.io](https://socket.io/) for real-time communication
- [DaisyUI](https://daisyui.com/) for beautiful UI components
- [Cloudinary](https://cloudinary.com/) for image storage
- [Lucide](https://lucide.dev/) for beautiful icons

---

