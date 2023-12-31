import { useState } from "react"
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"
import { Link } from "react-router-dom"
import OAuth from "../components/OAuth"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function SignUp() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)

    const {name, email, password} = formData
    function onChange(e) {
            setFormData( (prev) => ({
                ...prev,
                [e.target.id]: e.target.value
            }))
    }
    async function onSubmit(e) {
        e.preventDefault()
        try {
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            updateProfile(auth.currentUser, {
              displayName: name,
            });
            const user = userCredential.user
            const formDataCopy = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()
            await setDoc(doc(db, "users", user.uid), formDataCopy)
            toast.success("the sign up was good")
            navigate("/")
        } catch (error) {
          toast.error("Something went wrong with registration")

          
        }
        
    }
    return (
      <section>
        <h1 className="text-3xl text-center font-bold mt-6">Sign Up</h1>
        <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
            <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fHww"
             alt="key image from unsplash"  className="w-full rounded-2xl"/>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20 md:relative">
            <form onSubmit={onSubmit} >
            <input type="text"  id="name" value={name} onChange={onChange}
                placeholder="Full Name"  className="mb-6 w-full bg-white border-gray-300 rounded transition ease-in-out"/>
                <input type="email"  id="email" value={email} onChange={onChange}
                placeholder="Email address"  className="mb-6 w-full bg-white border-gray-300 rounded transition ease-in-out"/>

                <div className="relative mb-6">
                <input type={showPassword ? "text" : "password"}  id="password" value={password} onChange={onChange}
                placeholder="Password"  className="w-full bg-white border-gray-300 rounded transition ease-in-out"/>
                {showPassword ? (<AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer " onClick={() => setShowPassword((prev) =>
                    !prev
                )}/>) : (<AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword( (prev) => !prev)}/>) }

                </div>
                <div className="flex justify-between whitespace-nowrap text-sm sm:text-base ">
                    <p className="mb-6 mr-auto"> Have an account?
                      <Link to="/sign-in" className="text-red-600 hover:text-red-700 transition duration-200 ml-1">Sign In</Link>
                         </p>
                         <p>
                            <Link to="/forget-password" className="text-blue-600 hover:text-blue-700 transition duration-200">Forget Password ?</Link>
                         </p>
                </div>
                <button
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Sign up
            </button>
            <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
            </form>
            {/* <button className="w-full  text-center bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700
            transition duration-150 ease-in-out active:bg-blue-800 hover:shadow-lg md:absolute  md:left-1/2 md:-translate-x-1/2 ">
                Sign Up       </button>
            <div className="flex items-center mb-4 mt-12 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
                <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth/> */}

        </div>
        </div>
        </section>

    )
}