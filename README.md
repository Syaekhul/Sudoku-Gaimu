# 🎮 Sudoku Gaimu

> Play Sudoku anytime, anywhere - even offline!

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://sudoku-gaimu.vercel.app)
[![PWA](https://img.shields.io/badge/PWA-enabled-blue)](https://web.dev/progressive-web-apps/)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff)](https://vitejs.dev/)

## ✨ Features

- 🎯 **4 Difficulty Levels**: Easy, Medium, Hard, Expert
- 🧩 **Smart Puzzle Generator**: Unique puzzles every time
- ⏱️ **Timer & Best Times**: Track your performance
- 💡 **Hints System**: Get help when stuck (max 3 per game)
- ❌ **Mistakes Tracking**: Game over at 3 mistakes
- 💾 **Auto-Save**: Never lose progress (saves every 5 seconds)
- 📱 **PWA Support**: Install on any device & play offline
- 🎨 **Beautiful UI**: Responsive design with TailwindCSS
- 🌐 **Works Offline**: Full offline capability

## 🚀 Demo

**Live Demo**: [sudoku-gaimu.vercel.app](https://sudoku-gaimu.vercel.app)

## 📸 Screenshots

### Desktop
![Desktop Screenshot](screenshots/desktop.png)

### Mobile
![Mobile Screenshot](screenshots/mobile.png)

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **PWA**: Vite PWA Plugin + Workbox
- **Storage**: LocalStorage API
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Clone & Install
```bash
# Clone repository
git clone https://github.com/Syaekhul/Sudoku-Gaimu.git

# Navigate to directory
cd Sudoku-Gaimu

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:5173
```

## 🏗️ Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 PWA Installation

### Desktop (Chrome/Edge)
1. Open the app in browser
2. Look for install icon in address bar
3. Click "Install Sudoku Gaimu"
4. App will open in standalone window

### Mobile (Chrome/Safari)
1. Open the app in mobile browser
2. Tap "Share" or "Menu" button
3. Select "Add to Home Screen"
4. App will appear on home screen

## 🎯 Game Rules

### How to Play
1. Select difficulty level
2. Fill empty cells with numbers 1-9
3. Each row must contain 1-9 without repetition
4. Each column must contain 1-9 without repetition
5. Each 3×3 box must contain 1-9 without repetition

### Controls
- **Click cell**: Select cell
- **Type 1-9**: Enter number
- **Backspace**: Clear cell
- **Hint**: Get one correct number (max 3)
- **Reset**: New puzzle with same difficulty
- **New**: Choose new difficulty

### Win Condition
Complete the puzzle correctly!

### Lose Condition
Make 3 mistakes

## 📊 Features Breakdown

### ✅ Completed
- [x] Sudoku game logic
- [x] Puzzle generator algorithm
- [x] 4 difficulty levels
- [x] Timer & statistics
- [x] Best time tracking
- [x] Hints system
- [x] Mistakes counter
- [x] Auto-save functionality
- [x] PWA support
- [x] Offline capability
- [x] Install prompt
- [x] Responsive design
- [x] Beautiful UI

### 🚧 Future Plans
- [ ] Statistics dashboard
- [ ] Daily challenges
- [ ] Multiplayer mode
- [ ] Achievements system
- [ ] Dark mode
- [ ] Sound effects
- [ ] Undo/Redo functionality
- [ ] Notes/Pencil marks

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Syaekhul**
- GitHub: [@Syaekhul](https://github.com/Syaekhul)

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by classic Sudoku puzzles
- Built with love using React & Vite

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ by Syaekhul
