import React from 'react'
import { services } from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, thumbnail }) {
  return (
    <Link to={`/post/${$id}`} className="group block h-full">
      <div
        className="
          relative
          h-full
          overflow-hidden
          rounded-2xl

          bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 border border-blue-300/40

          bg-gradient-to-br dark:from-blue-950 dark:via-indigo-950 dark:to-slate-900
          border dark:border-indigo-800/40

          shadow-md
          transition-all duration-300 ease-out

          hover:shadow-xl
          hover:-translate-y-1
          hover:dark:border-indigo-500/50
        "
      >
        {/* Thumbnail */}
        <div className="relative h-48 w-full overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="
                h-full w-full
                object-cover
                transition-transform duration-500
                group-hover:scale-110
              "
            />
          ) : (
            <div className="h-full w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-cyan-700 dark:text-indigo-300 text-sm">
              No image
            </div>
          )}

          {/* Image overlay */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-t
              from-black/70
              via-black/20
              to-transparent
            "
          />
        </div>

        {/* Content */}
        <div className="p-5 space-y-2">
          <h2
            className="
              text-lg font-semibold
              text-cyan-700 
              dark:text-indigo-100
              line-clamp-2

              transition-colors duration-300
              group-hover:text-cyan-900
              group-hover:dark:text-indigo-300
            "
          >
            {title}
          </h2>

          <span className="inline-block text-sm text-cyan-700 dark:text-indigo-400 group-hover:text-cyan-300 group-hover:dark:text-indigo-300">
            Read more →
          </span>
        </div>

        {/* Subtle glow */}
        <div
          className="
            pointer-events-none
            absolute inset-0
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-500
            bg-indigo-500/5
          "
        />
      </div>
    </Link>
  )
}

export default PostCard
