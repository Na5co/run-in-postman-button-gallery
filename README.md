# Postman Button Studio

A professional-grade, stunning Run in Postman button designer with unique styles, advanced animations, and custom gradients.

## ✨ Features

- **10 Unique Button Designs**: Truly different styles, not just color variations
- **Professional Dark Interface**: Modern, eye-catching design tool
- **Advanced Gradient Editor**: Real-time color customization with live preview
- **Multiple Export Formats**: 
  - **Inline HTML**: Clean code for embedding directly
  - **Complete HTML**: Full page ready for deployment
- **Full Postman Integration**: Maintains official Run in Postman functionality
- **One-Click Operations**: Copy to clipboard and download instantly
- **Responsive Design**: Works beautifully on all devices

## 🎨 Button Style Gallery

1. **Neon Glow** - Futuristic pill shape with glowing effects
2. **Angular Tech** - Sharp, modern design with angular edges
3. **Soft Organic** - Unique asymmetric curves and gentle shadows
4. **Ghost Outline** - Minimalist outlined design with gradient borders
5. **3D Elevated** - Three-dimensional appearance with depth
6. **Glass Effect** - Trendy glassmorphism with blur and transparency
7. **Retro Vintage** - 80s-inspired bold typography and hard shadows
8. **Neumorphic** - Soft extruded appearance that seems to float
9. **Icon Focus** - Large icon emphasis with compact text
10. **Ultra Minimal** - Clean, flat design with subtle interactions

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd postman-button-library
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 How to Use

1. **Enter Postman Details**:
   - Collection ID (required)
   - Workspace ID (required)
   - Custom button text (optional)

2. **Choose a Style**:
   - Select from 8 pre-designed button styles
   - Each style has unique gradients, shadows, and typography

3. **Customize (Optional)**:
   - Click "Customize" to access color picker
   - Choose custom gradient colors using predefined colors or color picker
   - See live preview of your changes

4. **Generate Code**:
   - Switch between "Inline HTML" and "Full HTML" tabs
   - Copy code to clipboard with one click
   - Download complete HTML file for full page option

5. **Integrate**:
   - Paste the generated code into your website
   - The button will maintain full Postman functionality

## 🔧 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles
├── components/          # React components
│   ├── ButtonPreview.tsx
│   └── ColorPicker.tsx
├── lib/                # Utility functions
│   ├── button-styles.ts
│   └── html-generator.ts
└── types/              # TypeScript types
    └── button.ts
```

## 🎯 Features in Detail

### Button Styles
Each button style includes:
- Unique gradient combinations
- Custom border radius
- Tailored padding and typography
- Distinctive shadow effects
- Hover animations

### HTML Generation
- **Inline HTML**: Minimal code for embedding
- **Full HTML**: Complete page with necessary scripts
- **Postman Integration**: Includes official Postman Run Button script
- **Cross-browser Support**: Works across all modern browsers

### Customization Options
- **Color Picker**: Choose any color for gradients
- **Predefined Colors**: Quick selection from 12 popular colors
- **Real-time Preview**: See changes instantly
- **Custom Text**: Personalize button text

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Related

- [Postman API Documentation](https://documenter.getpostman.com/)
- [Run in Postman Button Documentation](https://learning.postman.com/docs/publishing-your-api/run-in-postman/introduction-run-button/)

## 🆘 Support

If you have any questions or need help, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

Made with ❤️ for the Postman community