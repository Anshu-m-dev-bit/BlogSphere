import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Container, LogoutBtn, Logo } from '../index'
import { Link } from 'react-router-dom'
import ThemeBtn from '../ThemeChanger/ThemeBtn'

function Header() {
  const authStatus = useSelector(state => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  return (
    <header
      className="
        sticky top-0 z-50
        backdrop-blur-xl
        border-b
        shadow-lg
        transition-colors

        /* 🌞 Light theme */
        bg-gradient-to-r
        from-sky-200
        via-indigo-200
        to-blue-300
        border-blue-200/40
        shadow-blue-200/40

        /* 🌙 Dark theme */
        dark:bg-gradient-to-r
        dark:from-blue-900
        dark:via-indigo-900
        dark:to-blue-950
        dark:border-white/10
        dark:shadow-blue-950/40
      "
    >
      <Container>
        <nav className="flex items-center py-4">
          
          {/* Logo */}
          <div className="mr-8 flex items-center gap-2">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="transition-transform duration-300 group-hover:scale-105">
                <Logo width="160px" />
              </div>
            </Link>

            {/* Theme toggle */}
            <ThemeBtn />
          </div>



          {/* Navigation */}
          <ul className="ml-auto flex items-center gap-3">
            {navItems.map((items) =>
              items.active ? (
                <li key={items.name}>
                  <button
                    onClick={() => navigate(items.slug)}
                    className={`
                      cursor-pointer
                      relative
                      px-5 py-2.5
                      text-sm font-semibold
                      text-gray-700
                      rounded-full
                      transition-all duration-300
                      hover:text-blue-600
                      hover:bg-blue-50
                      active:scale-95
                      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                      after:absolute after:inset-x-3 after:-bottom-1
                      after:h-[2px] after:bg-blue-500
                      after:scale-x-0 hover:after:scale-x-100
                      after:transition-transform after:duration-300
                      ${location.pathname === items.slug
                        ? `
                          bg-green-300
                          dark:bg-blue-400
                          dark:text-white
                          shadow-lg shadow-blue-900/40
                          after:scale-x-100
                        `
                        : `
                          dark:text-white
                          hover:dark:text-blue-600
                          hover:dark:bg-blue-50
                        `
                      }
                      
                    `}
                  >
                    {items.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li className="ml-3 cursor-pointer">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
