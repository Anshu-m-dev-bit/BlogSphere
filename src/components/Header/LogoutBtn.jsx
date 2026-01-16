import React from 'react'
import { useDispatch } from 'react-redux'
import { authService } from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutBtnHandler = () => {
        authService.logout()
            .then(() => dispatch(logout()))
    }

    return (
        <button
            onClick={logoutBtnHandler}
            className="
                cursor-pointer
                inline-flex items-center gap-2
                px-5 py-2.5
                text-sm font-semibold
                text-white
                rounded-full
                bg-gradient-to-r from-red-600 to-red-700
                shadow-md shadow-red-600/30
                transition-all duration-300
                hover:from-red-700 hover:to-red-800
                hover:shadow-lg hover:shadow-red-700/40
                active:scale-95
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
            "
        >
            <span className="text-base">⏻</span>
            Logout
        </button>
    )
}

export default LogoutBtn
