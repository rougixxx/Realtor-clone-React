import spinner from "../assets/spinner.svg"
export default function Spinner() {


    return (
        <div className="z-50 fixed flex justify-center items-center bg-black opacity-50 top-0 left-0 right-0 bottom-0 ">
            <div>
                <img src={spinner} alt="loading..." className="h-24" />
            </div>
        </div>
    )
}