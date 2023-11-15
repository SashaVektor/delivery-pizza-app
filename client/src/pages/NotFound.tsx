import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-[80dvh] w-full">
      <div className="flex flex-col gap-1 md:gap-2 lg:gap-6 justify-center items-center">
        <p className="text-black font-bold text-2xl md:text-6xl xl:text-9xl">
          404
        </p>
        <h5 className="text-red-500 text-xl md:text-2xl xl:text-6xl font-extrabold text-center uppercase">
          Page Not Found
        </h5>
        <Link
          to="/"
          className="border border-red-500 text-base lg:text-lg px-4 py-2 rounded-lg text-red-500 transition-all duration-150 hover:border-black hover:text-black"
        >
          Go back
        </Link>
      </div>
    </div>
  )
}

export default NotFound
