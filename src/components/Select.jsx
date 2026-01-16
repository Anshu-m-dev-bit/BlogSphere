import React, { forwardRef, useId } from 'react'

const Select = forwardRef(function Select(
  { options, label, className = '', ...props },
  ref
) {
  const id = useId()

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-semibold dark:text-gray-100"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          ref={ref}
          className={`
            w-full
            appearance-none
            rounded-xl
            border border-blue-200
            bg-white
            px-4 py-3
            text-sm text-gray-900
            shadow-sm
            transition-all duration-200
            focus:outline-none
            focus:ring-2 focus:ring-blue-400/40
            focus:border-blue-400
            hover:border-blue-300
            cursor-pointer
            ${className}
          `}
          {...props}
        >
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="
          pointer-events-none
          absolute right-4 top-1/2 -translate-y-1/2
          text-gray-400
        ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  )
})

export default Select
