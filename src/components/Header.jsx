import { useLocation, useNavigate, Link } from "react-router-dom"



export default function Header() {
    const location = useLocation()
    const navigate = useNavigate()

    function matchRoute(route) {
        if (route === location.pathname) {
            return true
        }
    }


    return (
        <div className="bg-white border-b shadow-sm sticky top-0 z-50  ">
            <header className="flex justify-between items-center max-w-6xl mx-auto px-3 ">
                <div>
                    <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="realtor logo" 
                    className="h-5 cursor-pointer" onClick={ () => navigate("/")} />

                </div>
                <div>
                    <ul className="flex space-x-10">
                        <li className={` cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] 
                        ${matchRoute("/") ?  ("text-black border-b-red-500") : ("border-b-transparent text-gray-400 ")}`} >
                             <Link to="/">Home</Link>
                            </li>
                        <li className={` cursor-pointer py-3 text-sm font-semibold  border-b-[3px]
                        ${matchRoute("/offers") ?  ("text-black border-b-red-500") : ("border-b-transparent text-gray-400 ")}`}  >
                             <Link to="/offers">Offers</Link>
                        </li>
                        <li className={` cursor-pointer py-3 text-sm font-semibold  border-b-[3px]
                        ${matchRoute("/sign-in") ?  ("text-black border-b-red-500") : ("border-b-transparent text-gray-400 ")}`}  >
                             <Link to="/sign-in">Sign In</Link>
                         </li>
                    </ul>
                </div>
               
            </header>
        </div>
    )
}