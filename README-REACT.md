# Loom React - Modern Tree Writing Interface for GPT

A modern, React-based implementation of the Loom tree writing interface for GPT. This is a complete transformation of the original Python/Tkinter application into a modern web application using React, TypeScript, and the latest OpenAI API.

![Loom React](static/readme/read-view.png)

## 🚀 Features

### Core Functionality
- **Tree-based Writing**: Navigate and explore your story as a branching tree structure
- **GPT Integration**: Generate text continuations using OpenAI's latest models (GPT-4, GPT-4o, GPT-3.5-turbo)
- **Multiple Views**: Switch between Read mode and Tree visualization
- **Multi-tab Support**: Work with multiple trees simultaneously
- **Persistent Storage**: Automatic saving to browser localStorage
- **Import/Export**: Save and load trees as JSON files

### Modern Features
- **React 18**: Built with the latest React features
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern, responsive UI with dark/light theme support
- **Zustand**: Efficient state management with persistence
- **React Flow**: Beautiful interactive tree visualization
- **Hot Toast**: User-friendly notifications

## 📦 Installation

### Prerequisites
- Node.js 18+ or npm/yarn/pnpm
- OpenAI API key

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

## 🎯 Usage

### Basic Workflow

1. **Create a Tree**: Click the "+" button to create a new tree
2. **Write**: Start typing your story in Read view
3. **Generate**: Click the lightning bolt (⚡) to generate AI continuations
4. **Navigate**: Use the navigation arrows to explore different branches
5. **Visualize**: Switch to Tree view to see the structure
6. **Save**: Export your tree as JSON for later use

### Navigation

- **Read Mode**:
  - Click on text to navigate to that node
  - Use ← → arrows to navigate parent/child
  - Click children cards to explore branches

- **Tree Mode**:
  - Click nodes to navigate
  - Drag to pan
  - Scroll to zoom
  - Use minimap for overview

### Generation Settings

Click the lightning bolt and configure:
- **Model**: Choose GPT-4, GPT-4o, or GPT-3.5-turbo
- **Number of continuations**: How many alternatives to generate (1-10)
- **Max tokens**: Length of each continuation
- **Temperature**: Creativity level (0-2)
- **Top P**: Nucleus sampling parameter

## 🏗️ Architecture

### Technology Stack

```
Frontend:
├── React 18.3          - UI framework
├── TypeScript 5.6      - Type safety
├── Vite 5.4            - Build tool
├── Tailwind CSS 3.4    - Styling
├── Zustand 4.5         - State management
├── React Flow 11       - Tree visualization
├── OpenAI 4.73         - API client
└── Lucide React        - Icons

Development:
├── ESLint              - Linting
├── PostCSS             - CSS processing
└── Autoprefixer        - Browser compatibility
```

### Project Structure

```
loom/
├── src/
│   ├── components/        # React components
│   │   ├── ReadView.tsx   # Linear reading interface
│   │   ├── TreeView.tsx   # Tree visualization
│   │   └── GenerateDialog.tsx
│   ├── stores/            # Zustand stores
│   │   ├── treeStore.ts   # Tree state management
│   │   └── settingsStore.ts
│   ├── services/          # External services
│   │   └── openai.ts      # OpenAI integration
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   ├── App.tsx            # Main application
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🔧 Configuration

### Model Configuration

The app comes pre-configured with OpenAI models. You can add custom models by modifying the `settingsStore`:

```typescript
// Add custom model
useSettingsStore.getState().addModelConfig('custom-model', {
  name: 'custom-model',
  type: 'openai-chat',
  api_base: 'https://your-api.com/v1',
  api_key: 'your-key',
});
```

### Supported Model Types

- `openai-chat`: OpenAI Chat Completion API (GPT-4, GPT-3.5-turbo)
- `openai`: OpenAI Legacy Completion API
- `together`: Together AI
- `llama-cpp`: Local llama.cpp server
- `custom`: Custom OpenAI-compatible API

## 🎨 Themes

The app supports dark and light modes. Toggle with the moon/sun icon in the header.

Customize colors by editing the CSS variables in `src/index.css`.

## 📊 Data Format

Trees are stored in JSON format compatible with the original Loom:

```json
{
  "id": "tree-uuid",
  "name": "My Story",
  "rootId": "node-uuid",
  "nodes": {
    "node-uuid": {
      "id": "node-uuid",
      "text": "Once upon a time...",
      "parentId": null,
      "children": ["child-uuid"],
      "created": 1234567890,
      "modified": 1234567890,
      "bookmark": false
    }
  },
  "currentNodeId": "node-uuid",
  "created": 1234567890,
  "modified": 1234567890
}
```

## 🔐 Security Notes

⚠️ **Important**: This app runs the OpenAI client in the browser with `dangerouslyAllowBrowser: true`.

For production use, you should:
1. Set up a backend proxy server
2. Move API keys to the backend
3. Add authentication and rate limiting

## 🚧 Roadmap

- [ ] Keyboard shortcuts
- [ ] Wavefunction/Block multiverse mode
- [ ] Memory and prompt management
- [ ] Search functionality
- [ ] Export to text/markdown
- [ ] Chapters and bookmarks UI
- [ ] Collaborative editing
- [ ] Backend API integration

## 📝 Migration from Python Version

To import trees from the original Python version:

1. In Python Loom, save your tree as JSON
2. In React Loom, click "Open Tree" and select the JSON file
3. Your tree will be imported with full compatibility

## 🤝 Contributing

This is a modern reimplementation of the original Loom project. Contributions welcome!

## 📄 License

Same as original Loom project.

## 🙏 Credits

- Original Loom by the original authors
- Modernized and transformed to React by Claude
- Icons by Lucide
- UI components inspired by shadcn/ui

## 🐛 Known Issues

- Browser API key exposure (see Security Notes)
- Large trees may impact performance
- Mobile support needs improvement

## 💡 Tips

1. **Start Small**: Begin with shorter prompts for better results
2. **Experiment**: Try different temperature settings for varied creativity
3. **Bookmark**: Mark important nodes for easy navigation
4. **Save Often**: Export important trees regularly
5. **Use GPT-4**: For best results, use GPT-4 or GPT-4o models

---

Built with ❤️ using modern web technologies
