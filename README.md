# 🤖 Gemini Clone

A modern, responsive web application that replicates the Google Gemini AI interface with real-time chat functionality, file upload support, and a beautiful user experience.

![Gemini Clone](https://img.shields.io/badge/Status-Ready%20for%20Demo-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Google AI](https://img.shields.io/badge/Google%20AI-4285F4?logo=google&logoColor=white)

## 📋 Table of Contents

- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Integration](#-api-integration)
- [File Structure](#-file-structure)
- [Responsive Design](#-responsive-design)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [Security Notice](#-security-notice)
- [License](#-license)

## ✨ Features

### 🎯 Core Functionality
- **Real-time AI Chat**: Interactive conversation with Google Gemini AI
- **File Upload Support**: Upload images, PDFs, text files, and CSV files
- **Smart Suggestions**: Pre-built conversation starters
- **Response Control**: Stop and continue AI responses
- **Chat History**: Persistent conversation memory

### 🎨 User Experience
- **Modern UI/UX**: Clean, intuitive interface inspired by Google Gemini
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Smooth Animations**: Typing effects, hover animations, and transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Loading States**: Visual feedback during AI processing

### 🔧 Advanced Features
- **File Preview**: Image preview before sending
- **Error Handling**: Graceful error management and user feedback
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized for fast loading and smooth interactions

## 📸 Screenshots

### Desktop View
![Desktop Interface](https://via.placeholder.com/800x600/1a1f2e/edf3ff?text=Desktop+Interface)

### Mobile View
![Mobile Interface](https://via.placeholder.com/400x600/1a1f2e/edf3ff?text=Mobile+Interface)

### Dark Theme
![Dark Theme](https://via.placeholder.com/800x400/0a0e1a/edf3ff?text=Dark+Theme)

### Light Theme
![Light Theme](https://via.placeholder.com/800x400/f8faff/090c13?text=Light+Theme)

## 🛠 Tech Stack

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: ES6+ features and modern APIs
- **Google Fonts**: Poppins font family for typography
- **Material Symbols**: Google's icon library

### Backend Integration
- **Google Gemini AI API**: For AI-powered conversations
- **Fetch API**: For HTTP requests
- **FileReader API**: For file upload handling

### Development Tools
- **VS Code**: Recommended code editor
- **Live Server**: For local development
- **Git**: Version control

## 🚀 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for local development)
- Google AI API key

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gemini-clone.git
   cd gemini-clone
   ```

2. **Open in browser**
   - Use a local server (Live Server extension in VS Code)
   - Or simply open `index.html` in your browser

3. **Configure API key** (See Configuration section)

## ⚙️ Configuration

### API Key Setup

1. **Get Google AI API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the generated key

2. **Add API Key to Project**
   ```javascript
   // In script.js, replace the API_KEY constant
   const API_KEY = "your-api-key-here";
   ```

### Environment Variables (Recommended for Production)

For production deployment, use environment variables:

```javascript
const API_KEY = process.env.GOOGLE_AI_API_KEY || "your-fallback-key";
```

## 📖 Usage

### Basic Chat
1. Open the application in your browser
2. Type your message in the input field
3. Press Enter or click the send button
4. Wait for the AI response

### File Upload
1. Click the attachment icon
2. Select a file (image, PDF, text, or CSV)
3. Preview the file (for images)
4. Send your message with the file

### Theme Toggle
1. Click the theme toggle button (sun/moon icon)
2. Your preference is automatically saved

### Managing Chats
- **Stop Response**: Click the stop button during AI response
- **Continue Response**: Click play button to resume
- **Clear Chats**: Click delete button to start fresh

## 🔌 API Integration

### Google Gemini AI
The application integrates with Google's Gemini 1.5 Flash model:

```javascript
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
```

### Request Format
```javascript
{
  contents: chatHistory,
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 2048
  }
}
```

### Supported File Types
- **Images**: JPEG, PNG, GIF, WebP
- **Documents**: PDF, TXT, CSV
- **Maximum Size**: 10MB per file

## 📁 File Structure

```
gemini-clone/
├── index.html              # Main HTML file
├── style.css               # CSS styles and animations
├── script.js               # JavaScript functionality
├── images/
│   └── gemini.svg          # Gemini logo/avatar
├── README.md               # Project documentation
└── .gitignore              # Git ignore file
```

### Key Components

#### HTML Structure
- **Header**: Welcome message and branding
- **Suggestions**: Interactive conversation starters
- **Chat Container**: Dynamic message display
- **Prompt Container**: Input and control buttons

#### CSS Architecture
- **CSS Variables**: Theme colors and consistent styling
- **Flexbox/Grid**: Modern layout techniques
- **Animations**: Smooth transitions and effects
- **Media Queries**: Responsive design breakpoints

#### JavaScript Modules
- **API Integration**: Gemini AI communication
- **File Handling**: Upload and processing
- **UI Management**: Theme toggle, animations
- **Event Handling**: User interactions

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

### Mobile Optimizations
- Touch-friendly button sizes
- Optimized input fields
- Collapsible controls
- Swipe gestures support

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 80+ | ✅ Full |
| Firefox | 75+ | ✅ Full |
| Safari | 13+ | ✅ Full |
| Edge | 80+ | ✅ Full |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on multiple browsers
- Ensure responsive design
- Update documentation

## ⚠️ Security Notice

**Important**: This project currently stores the API key in client-side code, which is a security risk for production use.

### For Development
- The current setup is suitable for learning and development
- API key is visible in browser developer tools

### For Production
- Implement a backend server to handle API calls
- Use environment variables for sensitive data
- Implement proper authentication and authorization
- Consider rate limiting and usage monitoring

### Recommended Backend Solutions
- **Node.js + Express**: Simple and fast
- **Python + Flask**: Easy to implement
- **Next.js API Routes**: Full-stack JavaScript
- **Vercel Functions**: Serverless deployment

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google AI**: For providing the Gemini API
- **Material Design**: For design inspiration
- **Open Source Community**: For various tools and libraries
- **Contributors**: Everyone who helped improve this project

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/gemini-clone/issues) page
2. Create a new issue with detailed description
3. Contact the maintainers

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (usually `main`)
4. Access your site at `https://yourusername.github.io/gemini-clone`

### Netlify
1. Connect your GitHub repository
2. Set build command: `# No build step needed`
3. Set publish directory: `/`
4. Deploy automatically on push

### Vercel
1. Import project from GitHub
2. Configure environment variables
3. Deploy with zero configuration

---

**Made with ❤️ for the developer community**

*This project is for educational purposes and demonstrates modern web development techniques.*
