import { FC } from 'react'
import Button from '../Button'
import { FaSpinner } from 'react-icons/fa'


export interface Options {
    value: string
    text: string
}

interface SelectStatusProps {
    borderColor: string
    header: string
    options: Options[],
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    onClick: () => Promise<void>
    defaultValue: string
    disabled: boolean
    loading: boolean
}

const SelectStatus: FC<SelectStatusProps> = ({
    borderColor, header, options, loading,
    onClick, onChange, defaultValue, disabled
}) => {

    return <div className={`rounded-lg p-3 sm:p-5 border-[2px] border-${borderColor} shadow-md md:min-w-[200px] w-full md:w-fit h-fit mx-auto sm:mx-0`}>
        <h4 className="text-red-500 text-lg font-bold mb-2 sm:mb-3">
            {header}
        </h4>
        <select className="w-full md:w-fit px-2 py-1 border border-blue-400 mb-3 outline-none focus:outline-none rounded-md hover:border-yellow transition cursor-pointer"
            onChange={onChange}
            defaultValue={defaultValue}
            disabled={disabled}
        >
            {options.map((option) => (
                <option value={option.value} key={option.value}>{option.text}</option>
            ))}
        </select>
        {!loading ? <Button
            bgColor="bg-yellow"
            text="Змінити"
            textColor="text-white"
            onClick={onClick}
            className='hover:bg-yellow/80 ml-auto md:ml-0'
            disabled={disabled}
        /> : (
            <div>
                <FaSpinner size={30} className="animate-spin" />
            </div>
        )}
    </div>
}

export default SelectStatus