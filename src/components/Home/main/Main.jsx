import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { Box } from '@mui/system'
import MainNav from './MainNav'
import MainContent from './MainContent'

export default function Main({ posts }) {
    const [loading, setLoading] = useState(true)

    const fetchTours = () => {
        let timer = setTimeout(() => {
            setLoading(false)
        }, 4000)
    }

    useEffect(() => {
        fetchTours()
    }, [])

    if (loading) {
        return (
            <>
                <Box>
                    <Loader />
                </Box>
            </>
        )
    }

    return (
        <Box sx={{ height: 'auto', width: '100%' }}>
            <MainNav />
            <MainContent posts={posts} />
        </Box>
    )
}
