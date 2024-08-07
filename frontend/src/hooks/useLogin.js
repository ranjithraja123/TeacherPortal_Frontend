import React, { useState } from 'react'
import { useAuthContext } from '../context/AuthContext.jsx'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


const useLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()
    const login = async (email, password) => {
        const success = handleInputErrors(email,password) 
        if(!success) return

        setLoading(true)
        try {
            const res = await fetch('/api/auth/login', {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password })
            });
          
            if (res.status === 401) {

            //   toast.error('Unauthorized access. Please check your credentials.')
                            throw new Error("Unauthorized access. Please check your credentials.");

            }
          
            const data = await res.json();
          
            if (data.error) {
              throw new Error(data.error);
            }
          
            localStorage.setItem("teacher-login", JSON.stringify(data));
            localStorage.setItem("token", data.token);
            navigate('/dataTable')
          
            setAuthUser(data);
          } catch (error) {
            toast.error(error.message);
          } finally {
            setLoading(false);
          }
          
    }
    return {loading,login}


}

export default useLogin


function handleInputErrors(email,password){
    if(!email || !password){
        toast.error('please fill all fields')
        return false
    }
   

    return true
}
