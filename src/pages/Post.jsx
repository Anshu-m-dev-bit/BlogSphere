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
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center text-indigo-300">
        Loading post...
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-160px)] py-8 bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900">
      <Container>

        {/* OUTER CARD */}
        <div className="
          max-w-4xl mx-auto
          h-[calc(100vh-200px)]
          bg-indigo-950/70
          border border-indigo-800/40
          rounded-2xl
          shadow-xl
          flex flex-col
          overflow-hidden
        ">

          {/* HEADER (FIXED) */}
          <div className="
            flex items-center justify-between
            px-6 py-4
            border-b border-indigo-800/40
            bg-indigo-950
            shrink-0
          ">
            <h1 className="text-2xl font-bold text-indigo-100">
              {post.title}
            </h1>

            {isAuthor && (
              <div className="flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Edit
                  </Button>
                </Link>
                <Button
                  onClick={deletePost}
                  className="bg-red-600 hover:bg-red-700"
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
            px-6 py-6
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
                  border border-indigo-800/40
                "
              />
            )}

            {/* CONTENT */}
            <div className="
              prose prose-invert
              max-w-none
              text-indigo-100
            ">
              {parse(post.content)}
            </div>
          </div>

        </div>
      </Container>
    </div>
  )
}
