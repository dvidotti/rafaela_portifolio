import { useRef } from 'react'

export const useGetRendersHelper = () => {
    let renders = useRef(0)
    console.log('renders : ', renders.current++)
}
