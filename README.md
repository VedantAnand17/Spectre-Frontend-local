# Spectre CTF Registration Portal

A modern registration portal for the Spectre CTF competition built with React, Vite, and Tailwind CSS. Features a sleek, responsive design with smooth animations and comprehensive user management.

## Features

- 🔐 Secure user authentication system
- 📱 Fully responsive design
- 🎨 Modern UI with glassmorphism effects
- ⚡ Fast performance with Vite
- 🔄 Real-time form validation
- 📨 Toast notifications for user feedback
- 🛣️ Protected routes with React Router
- 🎯 Team management system
- 🌐 RESTful API integration

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** 
  - Tailwind CSS
  - shadcn/ui components
  - CSS animations
- **State Management:** React Context
- **Form Handling:** Native React forms
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios
- **Notifications:** React Toastify
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd spectre-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── api/          # API configuration and endpoints
├── components/   # Reusable UI components
│   ├── ui/      # Base UI components (shadcn/ui)
│   └── Card.jsx # Registration card component
├── context/     # React context providers
│   └── AuthContext.jsx # Authentication context
├── lib/         # Utility functions
├── pages/       # Page components
│   ├── Landing.jsx   # Home page
│   ├── Login.jsx     # Login page
│   ├── Register.jsx  # Registration page
│   └── Profile.jsx   # User profile page
└── main.jsx     # Application entry point
```

## Features in Detail

### Authentication
- Email-based authentication
- Secure password handling
- Protected routes for authenticated users
- Persistent session management

### User Interface
- Glassmorphism design elements
- Responsive layout for all screen sizes
- Interactive form elements
- Loading states and animations
- Toast notifications for user feedback

### Team Management
- Team creation and joining
- Team member management
- Team leader controls
- Join request system

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Vite](https://vitejs.dev/) for the blazing fast build tool
- [React Router](https://reactrouter.com/) for client-side routing