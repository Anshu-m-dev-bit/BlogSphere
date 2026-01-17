import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { services } from "../appwrite/config"
import { Button, Container } from "../components"
import parse from "html-react-parser"
import { useSelector } from "react-redux"

export default function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (!slug) return navigate("/")

    services.getPost(slug).then((post) => {
      if (post) setPost(post)
      else navigate("/")
    })
  }, [slug, navigate])

  const deletePost = () => {
    services.deletePost(post.$id).then((status) => {
      if (status) {
        services.deleteImage(post.thumbnail)
        navigate("/")
      }
    })
  }

  if (!post) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center text-indigo-300">
        Loading post...
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-160px)] py-8 bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 border border-blue-300/40 bg-gradient-to-br dark:from-blue-950 dark:via-indigo-950 dark:to-slate-900 border dark:border-indigo-800/40">
      <Container>

        {/* OUTER CARD */}
        <div className="
          max-w-7xl mx-auto px-4
          h-[calc(100vh-1px)]
          bg-cyan-50
          dark:bg-indigo-950/70
          border dark:border-indigo-800/40
          text-gray-900
          dark:text-gray-100
          rounded-2xl
          shadow-xl
          flex flex-col
          overflow-hidden
        ">

          {/* HEADER (FIXED) */}
          <div className="
            flex items-center justify-between
            px-8 py-6 bg-cyan-50 border-cyan-200/40
            border-b dark:border-indigo-800/40
            dark:bg-indigo-950
            shrink-0
          ">
            <h1 className="text-2xl font-bold dark:text-indigo-100 text-gray-700">
              {post.title}
            </h1>

            {isAuthor && (
              <div className="flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="bg-cyan-500 hover:bg-cyan-750 dark:bg-indigo-600 hover:dark:bg-indigo-700">
                    Edit
                  </Button>
                </Link>
                <Button
                  onClick={deletePost}
                  className="bg-yellow-400 hover:bg-yellow-500 dark:bg-red-600 hover:dark:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* SCROLLABLE CONTENT */}
          <div className="
            flex-1
            overflow-y-auto
            px-10 py-8
            space-y-6
          ">

            {/* IMAGE (scrolls with content) */}
            {post.thumbnail && (
              <img
                src={services.getFilePreview(post.thumbnail)}
                alt={post.title}
                className="
                  w-full
                  max-h-[420px]
                  object-cover
                  rounded-xl
                  border-blue-300/40
                  border dark:border-indigo-800/40
                "
              />
            )}

            {/* CONTENT */}
            <div className="
              prose prose-invert
              max-w-none
              text-gray-900
              dark:text-indigo-100
            ">
              {parse(post.content)}
            </div>
          </div>

        </div>
      </Container>
    </div>
  )
}
