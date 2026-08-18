# Real-Time Chat Application

A full-stack real-time chat application built with **ASP.NET Core 9**, **SignalR**, **Angular 19**, **SQLite**, **JWT Authentication**, and **WebRTC**.

The application provides authenticated user registration/login, real-time one-to-one messaging, online-user tracking, typing indicators, notifications, and peer-to-peer video calling.

---

## 🚀 Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Protected application routes
- Authentication state management
- Secure SignalR authentication using JWT access tokens

### 💬 Real-Time Chat

- One-to-one real-time messaging
- Real-time message delivery using SignalR
- Conversation/message history
- Online user detection
- Typing indicators
- New-message notifications
- Browser notifications for active users
- Automatic SignalR reconnection

### 📹 Video Calling

- One-to-one video calling
- WebRTC peer-to-peer communication
- Incoming call notifications
- Accept/reject call functionality
- End-call functionality
- WebRTC offer/answer exchange
- ICE candidate exchange
- Google STUN server for peer discovery

### 🎨 User Interface

- Angular 19 standalone components
- Angular Material
- Tailwind CSS 3.4.17
- Responsive chat layout
- Chat sidebar
- Chat window
- Right sidebar
- Typing indicator
- Video-call interface

---

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │      Angular 19      │
                         │       Frontend       │
                         └──────────┬───────────┘
                                    │
                         HTTP / JWT │
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   ASP.NET Core 9     │
                         │        Web API       │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
           ┌────────────┐    ┌────────────┐    ┌────────────┐
           │ SignalR    │    │   Entity   │    │   SQLite   │
           │ Chat Hub   │    │ Framework  │    │ Database   │
           └────────────┘    └────────────┘    └────────────┘
                  │
                  ▼
           ┌────────────┐
           │ SignalR    │
           │ Video Hub  │
           └─────┬──────┘
                 │
                 │ Signaling
                 ▼
           ┌────────────┐
           │  WebRTC    │
           │ Peer-to-   │
           │ Peer Call  │
           └────────────┘
```

---

## 🛠️ Technology Stack

### Backend

| Technology | Purpose |
|---|---|
| ASP.NET Core 9 | Backend/API |
| C# | Backend language |
| SignalR | Real-time communication |
| Entity Framework Core 9 | ORM |
| SQLite | Database |
| ASP.NET Core Identity | User management |
| JWT Bearer | Authentication |
| Swagger / OpenAPI | API documentation |

### Frontend

| Technology | Purpose |
|---|---|
| Angular 19 | Frontend framework |
| TypeScript | Frontend language |
| Angular Material | UI components |
| Tailwind CSS 3.4.17 | Styling |
| RxJS | Reactive programming |
| Microsoft SignalR | Real-time client |
| WebRTC | Video communication |

---

# 📁 Project Structure

```text
ChatApp/
│
├── API/
│   ├── Controllers/
│   ├── Data/
│   ├── Hubs/
│   ├── Models/
│   ├── Services/
│   ├── Migrations/
│   ├── Properties/
│   ├── Program.cs
│   ├── appsettings.json
│   └── API.csproj
│
├── client/
│   ├── src/
│   │   ├── app/
│   │   │   ├── chat/
│   │   │   ├── components/
│   │   │   ├── guards/
│   │   │   ├── login/
│   │   │   ├── models/
│   │   │   ├── register/
│   │   │   ├── services/
│   │   │   └── video-chat/
│   │   │
│   │   ├── environments/
│   │   │   ├── environment.ts
│   │   │   └── environment.development.ts
│   │   │
│   │   ├── assets/
│   │   ├── styles.css
│   │   └── main.ts
│   │
│   ├── angular.json
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── tsconfig.json
│
└── README.md
```

---

# ⚙️ Prerequisites

Make sure the following are installed:

- Git
- .NET 9 SDK
- Node.js
- npm
- Angular CLI 19

Verify your installations:

```bash
dotnet --version
node --version
npm --version
ng version
```

The frontend is designed around Angular 19.

---

# 📥 Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Real-Time-NET-Signalr-Angular-Chat-App/ChatApp.git
```

Navigate into the project:

```bash
cd ChatApp
```

---

# 🔧 Backend Setup

Navigate to the API:

```bash
cd API
```

Restore .NET dependencies:

```bash
dotnet restore
```

Build the project:

```bash
dotnet build
```

---

## 🗄️ Database

The application uses **SQLite** through Entity Framework Core.

If migrations are included/configured, apply them using:

```bash
dotnet ef database update
```

If Entity Framework CLI is not installed:

```bash
dotnet tool install --global dotnet-ef
```

Then:

```bash
dotnet ef database update
```

---

# 🔑 JWT Configuration

The backend requires a JWT signing key.

Configure the JWT secret in the application's configuration according to the key expected by `Program.cs`.

For local development, an example configuration can look like:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=chat.db"
  },
  "TokenKey": "CHANGE_THIS_TO_A_LONG_RANDOM_DEVELOPMENT_SECRET"
}
```

> **Never commit production JWT secrets to GitHub.**

For production, use environment variables, user secrets, or a secure secret-management system.

---

# ▶️ Run the Backend

From the `API` directory:

```bash
dotnet run
```

The API will run using the configured launch settings.

For the local configuration used during development:

```text
http://localhost:5000
```

Swagger can be accessed through the Swagger endpoint configured by the application.

---

# 🌐 Frontend Setup

Open a **new terminal**.

Navigate to the client:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Run the Angular application:

```bash
npm start
```

Alternatively:

```bash
ng serve
```

The frontend is normally available at:

```text
http://localhost:4200
```

---

# 🎨 Tailwind CSS

This project uses **Tailwind CSS 3.4.17**.

The project uses the Tailwind v3 configuration style.

### `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### `postcss.config.js`

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### `src/styles.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

The global stylesheet must be included in the Angular application's `angular.json`:

```json
"styles": [
  "src/styles.css"
]
```

---

# 🔌 SignalR

The application uses SignalR for real-time communication.

There are separate SignalR connections for:

```text
/hubs/chat
/hubs/video
```

### Chat Hub

The chat connection handles:

- Online users
- New messages
- Message history
- Typing notifications
- User activity notifications

### Video Hub

The video connection handles WebRTC signaling:

```text
SendOffer
ReceiveOffer

SendAnswer
ReceiveAnswer

SendIceCandidate
ReceiveIceCandidate

EndCall
```

SignalR is used for signaling; the actual video/audio stream is handled by WebRTC.

---

# 📹 WebRTC Video Calling

The video calling system follows the WebRTC signaling flow.

```text
User A
   │
   │ Create Offer
   ▼
SignalR Video Hub
   │
   │ Send Offer
   ▼
User B
   │
   │ Create Answer
   ▼
SignalR Video Hub
   │
   │ Send Answer
   ▼
User A
```

ICE candidates are exchanged through SignalR.

The application uses a Google STUN server:

```text
stun:stun.l.google.com:19302
```

WebRTC then establishes the peer-to-peer connection between users.

---

# 🔐 Authentication Flow

The authentication flow is:

```text
User
 │
 ▼
Angular Login
 │
 ▼
ASP.NET Core API
 │
 ▼
Validate Credentials
 │
 ▼
Generate JWT
 │
 ▼
Angular
 │
 ▼
Store Access Token
 │
 ├───────────────┐
 ▼               ▼
REST API       SignalR
                 │
                 ▼
            JWT Bearer
```

The SignalR client supplies the access token through its `accessTokenFactory`.

---

# 🧩 Main Frontend Services

### `AuthService`

Responsible for:

- Login
- Registration/authentication state
- Access token
- Current logged-in user

### `ChatService`

Responsible for:

- Chat SignalR connection
- Online users
- Message delivery
- Message history
- Typing notifications
- Chat state

### `VideoChatService`

Responsible for:

- Video SignalR connection
- WebRTC signaling
- Offers
- Answers
- ICE candidates
- Incoming calls
- Ending calls

---

# 🖥️ Main UI Components

The frontend contains components for:

```text
Chat
├── Chat Sidebar
├── Chat Window
├── Chat Right Sidebar
├── Chat Box
└── Typing Indicator
```

Video calling is handled through:

```text
Video Chat
└── Video Chat Component
```

Authentication:

```text
Login
Register
```

---

# 🧪 Development

Start the backend:

```bash
cd API
dotnet run
```

In another terminal:

```bash
cd client
npm start
```

Then visit:

```text
http://localhost:4200
```

---

# 🐛 Troubleshooting

## API does not start

Run:

```bash
dotnet restore
dotnet build
dotnet run
```

Check that the JWT secret/configuration required by the backend exists.

---

## `DbContextOptions<>` cannot be found

Ensure Entity Framework Core is installed:

```bash
dotnet add package Microsoft.EntityFrameworkCore --version 9.0.0
```

and add:

```csharp
using Microsoft.EntityFrameworkCore;
```

---

## Angular dependency conflict

Check Angular versions:

```bash
ng version
```

The project should use compatible Angular packages rather than mixing Angular 19 and Angular 20 packages.

---

## Tailwind classes are not working

Check:

```text
tailwind.config.js
postcss.config.js
src/styles.css
angular.json
```

Then restart:

```bash
npm start
```

---

## SignalR connection fails

Make sure:

1. The API is running.
2. The Angular `environment.baseUrl` points to the API.
3. The correct SignalR hub URL is configured.
4. The user is authenticated.
5. The JWT is being supplied to SignalR.

For example:

```text
http://localhost:5000/hubs/chat
```

and:

```text
http://localhost:5000/hubs/video
```

---

# 🔒 Security Notes

Do not commit:

```text
.env
appsettings.Production.json
JWT secrets
database credentials
API keys
private certificates
```

Use environment variables or a secure secret manager for production credentials.

---

# 🚀 Production Considerations

Before deploying to production:

- Use HTTPS
- Use a production-grade database if required
- Configure secure JWT secrets
- Configure CORS correctly
- Configure production environment variables
- Configure WebRTC TURN servers for users behind restrictive NAT/firewalls
- Disable development exception pages
- Configure logging and monitoring
- Build the Angular application for production

Angular production build:

```bash
npm run build
```

.NET production build:

```bash
dotnet publish -c Release
```

---

# 📌 Development URLs

| Service | URL |
|---|---|
| Angular Frontend | `http://localhost:4200` |
| ASP.NET Core API | `http://localhost:5000` |
| Chat SignalR Hub | `http://localhost:5000/hubs/chat` |
| Video SignalR Hub | `http://localhost:5000/hubs/video` |

The exact URLs can be changed through the project's Angular environment configuration and ASP.NET Core launch settings.

---

# 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/my-feature
```

3. Make your changes.
4. Test both frontend and backend.
5. Commit your changes.

```bash
git add .
git commit -m "Add my feature"
```

6. Push the branch.

```bash
git push origin feature/my-feature
```

7. Open a Pull Request.

---

# 📄 License

Refer to the repository's license information before redistributing or modifying the project.

---

# 👨‍💻 Project

**Real-Time .NET SignalR Angular Chat Application**

Built with:

**ASP.NET Core + SignalR + Angular + SQLite + JWT + WebRTC**