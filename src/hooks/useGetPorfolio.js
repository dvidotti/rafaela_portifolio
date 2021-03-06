import { useState, useEffect } from 'react'

const apiUrl = process.env.REACT_APP_API_URL

export const useGetPortfolio = () => {
    let [projects, handleProjects] = useState([])
    let [loading, handleLoading] = useState(true)

    const getPortfolio = async () => {
        handleLoading(true)
        try {
            const bckRes = await fetch(`${apiUrl}/portfolio`, {
                headers: new Headers({
                    'content-type': 'application/json',
                    'Access-Control-Allow-Credentials': true,
                }),
                mode: 'cors',
            })
            const res = await bckRes.json()
            if (res.success) {
                let portfolio = res.data.portfolio
                handleProjects(portfolio)
                handleLoading(false)
            } else throw Error('Failed to fetch portfolio')
        } catch (error) {
            handleLoading(false)
            console.error(error)
        }
    }

    useEffect(() => {
        getPortfolio()
    }, [])

    return {
        projects,
        loading,
        getPortfolio,
    }
}
