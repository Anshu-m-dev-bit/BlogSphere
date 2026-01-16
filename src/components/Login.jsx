import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authService } from '../appwrite/auth'
import { login as storeLogin } from '../store/authSlice'
import { Input, Button, Logo } from './index'
import { useForm } from 'react-hook-form'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')

  const login = async (data) => {
    setError('')
    try {
      const session = await authService.loginAccount(data)
  
      if (!session) {
        throw { code: 401 }
      }
  
      const userData = await authService.getCurrentUser()
      if (!userData) {
        throw { code: 401 }
      }
  
      dispatch(storeLogin(userData))
      navigate('/')
    } catch (err) {
      console.log(err)
  
      if (err?.code === 401) {
        setError('Invalid email or password')
      } else if (err?.code === 404) {
        setError('Account does not exist')
      } else {
        setError('Login failed. Please try again.')
      }
    }
  }
  
  

  return (
    <div className="
      min-h-[calc(100vh-120px)]
      flex items-center justify-center
      px-4
      w-full
    ">
      <div className="
        w-full max-w-lg
        rounded-2xl
        bg-cyan-50 border-cyan-800/40
        dark:bg-indigo-950 border dark:border-indigo-800/40
        shadow-xl
        p-10
      ">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo width="110px" />
        </div>

        {/* Heading */}
        <h2 className="text-center text-3xl font-bold dark:text-gray-100">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to continue writing ✍️
        </p>

        {/* Signup link */}
        <p className="mt-3 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition"
          >
            Sign up
          </Link>
        </p>

        {/* Error */}
        {error && (
          <div className="
            mt-6
            rounded-lg
            border border-red-200
            bg-red-50
            px-4 py-3
            text-sm text-red-600
            text-center
          ">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-6">
            <Input
              label="Email"
              placeholder="you@example.com"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email must be valid",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
              })}
            />

            <Button
              type="submit"
              className="w-full py-3 text-base font-semibold cursor-pointer"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
