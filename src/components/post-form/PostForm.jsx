import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index'
import { services } from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    setValue,
  } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'inactive',
    },
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    console.log(data)
    if (post) {
      const file = data.image?.[0]
        ? await services.uploadImage(data.image[0])
        : null

      if (file) {
        services.deleteImage(post.thumbnail)
      }

      const dbPost = await services.updatePosts(post.$id, {
        ...data,
        thumbnail: file ? file.$id : post.thumbnail,
      })

      if (dbPost) navigate(`/post/${post.$id}`)
    } else {
      let fileId = null

      if (data.image?.length > 0) {
        const file = await services.uploadImage(data.image[0])
        if (file) fileId = file.$id
      }

      const dbPost = await services.createPosts({
        ...data,
        thumbnail: fileId,
        userId: userData.$id,
      })

      if (dbPost) navigate(`/post/${dbPost.$id}`)
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-')
    }
    return ''
  }, [])

  useEffect(() => {
    const subscription = watch((values, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(values.title), {
          shouldValidate: true,
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, slugTransform, setValue])

  return (
    <form
  onSubmit={handleSubmit(submit)}
  className="
    max-w-6xl mx-auto
    space-y-8
  "
>
  {/* Title */}
  <div
    className="
      dark:bg-indigo-950/70
      border dark:border-indigo-800/40
      rounded-2xl
      p-6
      shadow-lg
    "
  >
    <Input
      label="Title"
      placeholder="Your story starts here…"
      className="
        dark:text-indigo-100
        placeholder:text-indigo-500
      "
      {...register('title', { required: true })}
    />
  </div>

  {/* Editor */}
  <div
    className="
      dark:bg-indigo-950/70
      dark:text-white
      border border-indigo-800/40
      rounded-2xl
      p-6
      shadow-lg
    "
  >
    <RTE
      label="Content"
      name="content"
      control={control}
      defaultValue={getValues('content')}
    />
  </div>

  {/* Meta Section */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Slug */}
    <div
      className="
        dark:bg-indigo-950/70
        border dark:border-indigo-800/40
        rounded-2xl
        p-6
        shadow-lg
      "
    >
      <Input
        label="Slug"
        placeholder="your-post-slug"
        className="
          text-gray-800
          dark:text-indigo-100
          placeholder:text-green-300
          placeholder:dark:text-indigo-500
        "
        {...register('slug')}
      />
    </div>

    {/* Thumbnail */}
    <div
      className="
        dark:bg-indigo-950/70
        border dark:border-indigo-800/40
        rounded-2xl
        p-6
        shadow-lg
      "
    >
      <Input
        label="Thumbnail"
        type="file"
        className="text-indigo-300 file:text-indigo-200 cursor-pointer"
        {...register('image')}
      />
    </div>

    {/* Status + Submit */}
    <div
      className="
        dark:bg-indigo-950/70
        border dark:border-indigo-800/40
        rounded-2xl
        p-6
        shadow-lg
        space-y-5
      "
    >
      <Select
        label="Status"
        className="
          bg-indigo-900
          text-gray-100
          border-indigo-700
        "
        options={['inactive', 'active']}
        {...register('status', {
          setValueAs: (value) => value === 'active',
        })}
      />

      <Button
      type='submit'
        className="
          w-full
          dark:bg-indigo-600
          hover:dark:bg-indigo-700
          dark:text-white
          font-semibold
          py-3
          rounded-xl
          transition-all
          duration-200
          hover:shadow-lg
          hover:-translate-y-[1px]
        "
      >
        {post ? 'Update' : 'Publish'}
      </Button>
    </div>
  </div>
</form>


  )
}
