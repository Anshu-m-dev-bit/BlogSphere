import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authService } from '../appwrite/auth'
import { login as storeLogin } from '../store/authSlice'
import { Input, Button, Logo } from './index'
import { useForm } from 'react-hook-form'

function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')

  const createAccount = async (data) => {
    setError('')
  
    try {
      const account = await authService.createAccount(data)
  
      if (account) {
        const userData = await authService.getCurrentUser()
        dispatch(storeLogin(userData))
        navigate('/')
      }
    } catch (err) {
      const message = err?.message?.toLowerCase() || ''
  
      if (message.includes('already exists') || message.includes('user already exists')) {
        setError('An account with this email already exists. Please login instead.')
      } else {
        setError('Signup failed. Please try again.')
      }
  
      console.log('Appwrite Error:', err) 
    }
  }
  

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 w-full">
      <div className="w-full max-w-lg rounded-2xl bg-cyan-50 dark:bg-indigo-950 border border-cyan-800/40 dark:border-indigo-800/40 shadow-xl p-10">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo width="110px" />
        </div>

        {/* Heading */}
        <h2 className="text-center text-3xl font-bold dark:text-gray-100">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Join and start writing your posts ✍️
        </p>

        {/* Login link */}
        <p className="mt-3 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-blue-500 hover:text-blue-400 hover:underline transition"
          >
            Sign in
          </Link>
        </p>

        {/* Error Message */}
        {error && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(createAccount)} className="mt-8">
          <div className="space-y-6">
            <Input
              label="Full Name"
              placeholder="Your full name"
              {...register('name', { required: true })}
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email must be valid',
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              {...register('password', { required: true })}
            />

            <Button type="submit" className="w-full py-3 text-base font-semibold">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
