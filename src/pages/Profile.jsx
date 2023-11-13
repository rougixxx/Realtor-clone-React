import { useState } from "react"
import {getAuth, updateProfile} from "firebase/auth"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export default function Profile() {
    const auth = getAuth()
    const navigate = useNavigate()
    const [changeDetails, setChangingDetails] = useState(false)

    

    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const {name, email} = formData
    function onLogout() {
        auth.signOut()
        navigate("/")
    }
    function onChange(e) {
        setFormData((prev) =>  ({
            ...prev,
            [e.target.id]: e.target.value
        }))
           
        
    }
    async function onSubmit() {
        try {
            if (auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                })
                const docRef = doc(db, "users", auth.currentUser.uid )
                await updateDoc(docRef, {
                    name
                })
            }
            toast.success("Profile details updated")

        } catch(error) {
            toast.error("we could not apply the changes for your Profile")
        }
    }
    return (
        <>
        <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">

            <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
            <div className="w-full md:w-[50%] mt-6 px-3">
                <form  >

                    {/* Name input */}
                    <input type="text" id="name" value={name} disabled={!changeDetails} onChange={onChange}
                    className={`w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out ${changeDetails && "bg-red-200 focus:bg-red-200"}`}/>

                    {/* email input */}
                    <input type="email" id="email" value={email} disabled
                        className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transistion ease-in-out"
                     />
                     <div className="flex justify-between whitespace-nowrap text-sm sm:text-xl mb-6">
                        <p className="flex items-center">
                            Do you want to change your name?
                            <span className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                            onClick={ () => {
                                changeDetails && onSubmit();
                                setChangingDetails((prev) => !prev)}} >
                                {changeDetails ? "Apply Changes": "Edit"}
                              </span>
                        </p>
                        <p className="text-blue-600 hover:text-blue-700 transition duration-200 ease-in-out cursor-pointer"
                        onClick={onLogout}>Sign Out</p>
                     </div>

                </form>
            </div>
        </section>
        </>
    )
}