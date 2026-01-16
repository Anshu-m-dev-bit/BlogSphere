import React from 'react'

export default function SkeletalCard() {
  return (
    <div className="p-2 w-1/4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 shadow-lg animate-pulse">
        {/* Image placeholder */}
        <div className="h-48 w-full bg-gray-700/30 rounded-t-2xl"></div>

        {/* Title placeholder */}
        <div className="p-5 space-y-2">
          <div className="h-6 bg-gray-700/30 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700/30 rounded w-1/2"></div>
        </div>

        {/* Hover glow effect mimic */}
        <div className="absolute inset-0 opacity-50 bg-blue-500/10"></div>
      </div>
    </div>
  )
}
