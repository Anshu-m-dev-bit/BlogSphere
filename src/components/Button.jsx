import React from 'react'

function Button({
    children,
    type = 'button',
    bgColor = 'bg-green-300 dark:bg-blue-600',
    textColor = 'text-gray-500 dark:text-white',
    className = '',
    ...props
}) {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center
        px-5 py-2.5
        cursor-pointer
        rounded-xl
        text-sm font-semibold
        transition-all duration-300
        shadow-md shadow-blue-900/20
        hover:shadow-lg hover:shadow-blue-900/30
        active:scale-95
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${bgColor}
        ${textColor}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
