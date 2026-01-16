import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import { authService } from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeChanger/context/theme'

function AppContent() {
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('theme', newTheme); 
  };


  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, toggleTheme }}>
      <div className={`relative min-h-screen flex flex-col
        ${themeMode === 'dark' ? 'bg-indigo-950 text-gray-100' : 'bg-sky-200 text-gray-900'}`}>
        {/* Header */}
        <Header />

        {/* Main content area */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService
      .getCurrentUser()
      .then(userData => {
        if (userData) dispatch(login({ userData }))
        else dispatch(logout())
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <div className="h-10 w-10 rounded-full border-4 border-blue-300 border-t-transparent animate-spin" />
        <p className="text-sm tracking-wide mt-4">Preparing your space…</p>
      </div>
    )
  }

  return <AppContent />
}

export default App
