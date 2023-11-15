import { FC, ReactNode } from 'react'

interface FooterCardProps {
  icon: ReactNode
  path: string
}

const FooterCard: FC<FooterCardProps> = ({icon}) => {
  return <a href="#" referrerPolicy='no-referrer' target='_blank'
  className='flex justify-center items-center border border-gray-300 rounded-md px-3 py-2 transition hover:scale-105'
  >
    {icon}
  </a>
}

export default FooterCard