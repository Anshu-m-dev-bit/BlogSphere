import React, { forwardRef, useId } from 'react'

const Input = forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
    const id = useId()

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="
                        mb-2 block
                        text-sm font-semibold
                        dark:text-gray-300
                    "
                >
                    {label}
                </label>
            )}

            <input
                id={id}
                ref={ref}
                type={type}
                {...props}
                className={`
                    w-full
                    px-4 py-3
                    rounded-xl

                    bg-blue-50
                    text-gray-900
                    placeholder:text-gray-500


                    dark:bg-blue-950
                    dark:text-white
                    dark:placeholder:text-gray-400

                    border border-white/15
                    shadow-inner

                    transition-all duration-300

                    hover:border-white/25

                    focus:bg-blue-100
                    focus:border-blue-500
                    

                    focus:outline-none
                    focus:dark:border-blue-500
                    focus:ring-2 focus:dark:ring-blue-500/40
                    focus:dark:bg-blue-950

                    disabled:opacity-50
                    disabled:cursor-not-allowed

                    ${className}
                `}
            />
        </div>
    )
})

export default Input
