import React, { useState, useEffect } from 'react'
import { services } from '../appwrite/config'
import { Container, PostCard } from '../components'
import Skeletal from '../components/Skeletal'
import { useSelector } from 'react-redux'

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const userData = useSelector((state) => state.auth.userData)

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

  return (
    <div className="w-full min-h-[calc(100vh-160px)] py-10">
      <Container>

        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold dark:text-indigo-100 ">
            Your Posts
          </h1>
          <p className="mt-2 text-indigo-400">
            All the stories you’ve published so far
          </p>
        </div>

        {/* Grid */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        ">
          {loading && <Skeletal count={8} />}

          {!loading && posts.map((post) => {
            const isAuthor =
              post && userData
                ? post.userId === userData.$id
                : false

            if (!isAuthor) return null

            return <PostCard key={post.$id} {...post} />
          })}
        </div>

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <div className="mt-20 text-center text-indigo-400">
            <p className="text-lg">
              You haven’t published any posts yet.
            </p>
            <p className="text-sm mt-2">
              Start writing and your posts will appear here ✨
            </p>
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts
