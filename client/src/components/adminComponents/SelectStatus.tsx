import { FC } from 'react'
import Button from '../Button'


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
}

const SelectStatus: FC<SelectStatusProps> = ({ borderColor, header, options, onClick, onChange }) => {

    return <div className={`rounded-lg p-5 border-[2px] border-${borderColor} shadow-md min-w-[200px] w-fit h-fit mx-auto sm:mx-0`}>
        <h4 className="text-red-500 text-lg font-bold mb-3">
            {header}
        </h4>
        <select className="p-3 border border-blue-400 mb-3 outline-none focus:outline-none rounded-md"
            onChange={onChange}
        >
            {options.map((option) => (
                <option value={option.value} key={option.value}>{option.text}</option>
            ))}
        </select>
        <Button
            bgColor="bg-yellow"
            text="Сменить статус"
            textColor="text-white"
            onClick={onClick}
        />
    </div>
}

export default SelectStatus