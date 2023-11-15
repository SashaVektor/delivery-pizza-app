import { Circles } from "react-loader-spinner"


const Spinner = () => {
    return (
        <div className='flex items-center justify-center h-[80dvh] w-full'>
            <Circles
                height="280"
                width="280"
                color="#F7D22D"
                ariaLabel="circles-loading"
                visible={true}
            />
        </div>
    )
}

export default Spinner
