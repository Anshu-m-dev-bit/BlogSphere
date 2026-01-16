import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="
      relative overflow-hidden
      bg-gradient-to-r dark:from-blue-950 dark:via-indigo-950 dark:to-blue-900
      bg-gradient-to-r from-blue-300 via-indigo-300 to-sky-200

      border-t border-white/10
    ">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14">
        <div className="-m-6 flex flex-wrap">

          {/* Logo + Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-6 inline-flex items-center">
              <Logo width="160px" />
              </div>
              <p className="text-sm text-slate-900 dark:text-gray-300">
                © 2026. All rights reserved.
              </p>
            </div>
          </div>

          {/* Company */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-slate-900 dark:text-gray-400">
              Company
            </h3>
            <ul className="space-y-4">
              {['Features', 'Pricing', 'Affiliate Program', 'Press Kit'].map(item => (
                <li key={item}>
                  <Link
                    className="
                      text-sm font-medium text-indigo-900 dark:text-gray-300
                      transition-colors duration-200
                      hover:text-blue-700 hover:dark:text-white
                    "
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-slate-900 dark:text-gray-400">
              Support
            </h3>
            <ul className="space-y-4">
              {['Account', 'Help', 'Contact Us', 'Customer Support'].map(item => (
                <li key={item}>
                  <Link
                    className="
                      text-sm font-medium text-indigo-900 dark:text-gray-300
                      transition-colors duration-200
                      hover:text-blue-700 hover:dark:text-white
                    "
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-widest text-slate-900 dark:text-gray-400">
              Legal
            </h3>
            <ul className="space-y-4">
              {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map(item => (
                <li key={item}>
                  <Link
                    className="
                      text-sm font-medium text-indigo-900 dark:text-gray-300
                      transition-colors duration-200
                      hover:text-blue-700 hover:dark:text-white
                    "
                    to="/"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </section>
  )
}

export default Footer
