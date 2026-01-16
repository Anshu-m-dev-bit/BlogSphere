import React, { useEffect, useState } from 'react'
import { services } from "../appwrite/config"
import { Container, PostCard, Button, Logo } from '../components'
import { Query } from 'appwrite'
import { useSelector } from 'react-redux'
import Skeletal from '../components/Skeletal'
import { Link } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    if (!authStatus) return
  
    services.getAllPosts([Query.equal("status", true)])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents)
        }
      })
      .finally(() => setLoading(false))
  }, [authStatus])  

  useEffect(() => {
    if (!authStatus) return

    services.getAllPosts([Query.equal("status", true)])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents)
        }
      })
  }, [authStatus])

  /* ─────────────────────────────── */
  /* NOT LOGGED IN STATE */
  /* ─────────────────────────────── */
  if (!authStatus) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Container>
          <div className="
            mx-auto max-w-xl
            text-center
            rounded-3xl
            bg-white/70 backdrop-blur-xl
            border border-blue-100
            shadow-xl
            px-10 py-14
          ">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome to your writing space
            </h1>
            <p className="mt-4 text-gray-600 text-base leading-relaxed">
              Discover stories, ideas, and perspectives — or start writing your own.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link to="/login">
                <Button className="px-8 py-3 text-base">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  bgColor="bg-transparent"
                  textColor="text-blue-600"
                  className="
                    px-8 py-3 text-base
                    border border-blue-600
                    hover:bg-blue-50
                  "
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  /* ─────────────────────────────── */
  /* LOGGED IN BUT NO POSTS */
  /* ─────────────────────────────── */
  if (authStatus && posts.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Container>
          <div className="
            mx-auto max-w-xl
            text-center
            rounded-3xl
            bg-indigo-950 border border-indigo-800/40 backdrop-blur-xl
            shadow-xl
            px-10 py-14
          ">
            <h2 className="text-3xl font-bold text-gray-800">
              No posts yet
            </h2>
            <p className="mt-3 text-gray-600">
              Be the first one to share a story with the world.
            </p>

            <Link to="/add-post" className="inline-block mt-8">
              <Button className="px-10 py-3 text-base">
                Write your first post
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  /* ─────────────────────────────── */
  /* POSTS AVAILABLE */
  /* ─────────────────────────────── */
  return (
    <div className="flex-1 py-12">
      <Container>
        {/* Page heading */}
        <div className="flex flex-col items-center text-center relative mb-14">
          {/* Right-aligned New Post button */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <Link to="/add-post">
              <Button className="px-6 py-2.5">
                New Post
              </Button>
            </Link>
          </div>

          {/* Center Logo - much bigger */}
          <Link to="/" className="group">
            <div className="transition-transform duration-300">
              <Logo width="160px" />
            </div>
          </Link>

          {/* Fancy Text */}
          <h1 className="mt-4 text-3xl font-bold text-gray-800 dark:text-gray-100">
            Latest Posts
          </h1>
          <p className="mt-1 text-gray-600 italic">
            Fresh ideas, real stories, honest writing
          </p>
        </div>
        {/* Posts Grid */}
        <div
          className="
            grid gap-6
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {loading && <Skeletal count={6} />}

          {!loading && posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
