import { Box } from '@mui/material'
import React from 'react'

export default function Footer() {
    return (
        <footer style={{ width: '100%', height: '9%' }}>
            <Box sx={{ height: '100%', width: 'mx-auto', display: { xs: 'none', md: 'flex' }, justifyContent: "center", alignItems: 'center', gap: '15px', fontSize: '14px', fontWeight: '400' }}>
                <h2 style={{ color: ' #6B6B6B', cursor: 'pointer' }}>Help</h2>
                <h2 style={{ color: ' #6B6B6B', cursor: 'pointer' }}>Status</h2>
                <h2 style={{ color: ' #6B6B6B', cursor: 'pointer' }}>About</h2>
                <h2 style={{ color: ' #6B6B6B', cursor: 'pointer' }}>Careers</h2>
                <h2 style={{ color: ' #6B6B6B', cursor: 'pointer' }}>Press</h2>
                <h2 style={{ color: ' #6B6B6B', cursor: 'pointer' }}>Blog</h2>
                <h2 style={{ color: ' #6B6B6B', cursor: 'pointer' }}>Privacy</h2>
                <h2 style={{ color: ' #6B6B6B', cursor: 'pointer' }}>Terms</h2>
                <h2 style={{ color: ' #6B6B6B', cursor: 'pointer' }}>Text to speech</h2>
                <h2 style={{ color: ' #6B6B6B', cursor: 'pointer' }}>Teams</h2>
            </Box>
            <Box sx={{ height: '100%', width: 'mx-auto', backgroundColor: 'black', display: { xs: 'flex', md: 'none' }, fontSize: '14px', fontWeight: '400', alignItems: 'center', gap: '20px', paddingLeft: '20px' }}>
                <h2 style={{ color: ' white', cursor: 'pointer' }}>About</h2>
                <h2 style={{ color: ' white', cursor: 'pointer' }}>Help</h2>
                <h2 style={{ color: ' white', cursor: 'pointer' }}>Terms</h2>
                <h2 style={{ color: ' white', cursor: 'pointer' }}>Privacy</h2>
            </Box>
        </footer>
    )
}
