import React, { useState, useEffect, useMemo } from 'react'
import { services } from '../appwrite/config'
import { Container, PostCard } from '../components'
import Skeletal from '../components/Skeletal'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()


  useEffect(() => {
    services.getAllPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents)
        }
      })
      .catch((error) => {
        console.log('Error while fetching posts: ', error)
      })
      .finally(() => setLoading(false))
  }, [])

  // ✅ FILTER POSTS SAFELY
  const userPosts = useMemo(() => {
    if (!userData?.$id) return []
    return posts.filter((post) => post.userId === userData.$id)
  }, [posts, userData])

  return (
    <div className="w-full min-h-[calc(100vh-160px)] py-10">
      <Container>

        {/* Page Heading (only if user has posts) */}
        {!loading && userPosts.length > 0 && (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold dark:text-indigo-100">
              Your Posts
            </h1>
            <p className="mt-2 text-indigo-400">
              All the stories you’ve published so far
            </p>
          </div>
        )}

        {/* Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
          "
        >
          {loading && <Skeletal count={8} />}

          {!loading &&
            userPosts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
        </div>

        {/* Empty State */}
        {!loading && userPosts.length === 0 && (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-gray-700 dark:text-indigo-100">
              You haven’t posted any stories yet
            </h2>

            <p className="mt-2 text-indigo-400">
              Start sharing your thoughts with the world ✨
            </p>

            <button
              onClick={() => navigate('/add-post')}
              className="
                mt-6
                px-6 py-3
                rounded-full
                bg-green-300
                dark:bg-indigo-500
                text-gray-500
                dark:text-white
                font-semibold
                hover:bg-green-400
                hover:dark:bg-indigo-600
                transition
                shadow-lg
              "
            >
              Add your first post
            </button>
          </div>
        )}

      </Container>
    </div>
  )
}

export default AllPosts
