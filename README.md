# Career Dashboard

A professional, modern career management dashboard built with Next.js, React, and TypeScript. Track job applications, interview performance, daily habits, and finances all in one beautiful, responsive application.

## Features

### 📊 Dashboard
- **Key Metrics**: Overview of applications, interview scores, income, and completion rates
- **Analytics**: Visual charts showing application status distribution and interview performance trends
- **Financial Summary**: Income, expenses, and net balance tracking
- **Recent Activity**: Transaction history visualization

### 📅 Today
- Daily progress tracking
- Habit completion monitoring
- Interview scheduling
- Application tracking
- Quick stats and progress indicators

### 🎯 Focus
- Job application management
- Application status tracking (Applied, Interview, Rejected, Offer)
- Application notes and details
- Quick statistics on applications

### 📝 Notes
- Capture thoughts and insights
- Organize by categories (Learning, Writing, Freelancing, Interview Prep)
- Timeline view of all notes
- Easy note management

### 📈 Progress
- Career overview statistics
- Financial tracking (Income, Expenses, Balance)
- Transaction management
- Detailed financial history

## Tech Stack

- **Framework**: Next.js 16.1.6
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React
- **Storage**: Browser LocalStorage

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/belloibrahv/career-dashboard.git
cd career-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
career-dashboard/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with navigation
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx      # Top navigation bar
│   ├── Dashboard.tsx       # Dashboard home page
│   ├── Today.tsx           # Daily tracking
│   ├── Focus.tsx           # Job applications
│   ├── Notes.tsx           # Notes management
│   └── Progress.tsx        # Progress tracking
├── lib/
│   └── store.ts            # Zustand store
├── public/
│   └── ibtech.png          # Logo
└── package.json
```

## Data Persistence

All data is automatically saved to browser LocalStorage. No backend database required. Data persists across browser sessions.

## Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub (already done)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import the GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

Your app will be live at `https://your-project.vercel.app`

### Environment Variables

No environment variables required for basic functionality.

## Design Philosophy

The dashboard follows a calm, professional design philosophy:
- **Warm, natural color palette**: Sand, clay, charcoal, terracotta, olive
- **Minimal, clean UI**: Focus on clarity over noise
- **Generous spacing**: Visual breathing room
- **Smooth animations**: Gentle transitions
- **Professional typography**: Readable, comfortable

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized for fast load times
- Responsive design for all screen sizes
- Smooth animations and transitions
- Efficient state management with Zustand

## Features Roadmap

- [ ] Export data to CSV
- [ ] Dark mode
- [ ] Interview question bank
- [ ] Resume builder
- [ ] Email notifications
- [ ] Mobile app
- [ ] Backend integration
- [ ] Multi-user support

## Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.

## License

This project is open source and available under the MIT License.

## Support

For support, email support@ibtech.com or open an issue on GitHub.

## Author

Built with ❤️ by [IBTech](https://ibtech.com)

---

**Happy career tracking! 🚀**
