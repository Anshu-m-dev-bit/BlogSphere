import React from 'react'

function Logo({ width = 'auto' }) {
  return (
    <div
      className="
        flex items-center gap-2
        select-none
        cursor-pointer
        font-bold
        tracking-tight
      "
      style={{ width }}
    >
      {/* Icon */}
      <div
        className="
          flex items-center justify-center
          w-9 h-9
          rounded-xl
          bg-gradient-to-br dark:from-blue-500 dark:to-indigo-600
          bg-gradient-to-br from-green-600 dark:to-indigo-600
          dark:text-white
          shadow-md
        "
      >
        ✍️
      </div>

      {/* Brand Name */}
      <span className="text-xl text-black dark:text-white">
        Blog<span className="dark:text-blue-600 text-cyan-600">Sphere</span>
      </span>
    </div>
  )
}

export default Logo
