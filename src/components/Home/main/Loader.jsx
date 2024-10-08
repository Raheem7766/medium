import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import Typography from '@mui/system/typography';

const LoadingText = "LOADING";

const theme = createTheme();

export default function Loader() {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [textOffset, setTextOffset] = useState(0);

    useEffect(() => {
        const rotationInterval = setInterval(() => {
            setRotation(prev => ({
                x: (prev.x + 0.2) % 360,
                y: (prev.y + 0.2) % 360,
            }));
        }, 20);

        const textInterval = setInterval(() => {
            setTextOffset(prev => (prev + 0.05) % LoadingText.length);
        }, 50);

        return () => {
            clearInterval(rotationInterval);
            clearInterval(textInterval);
        };
    }, []);

    const generateFace = () => {
        const size = 40;
        const face = [];

        for (let y = 0; y < size; y++) {
            let line = "";
            for (let x = 0; x < size; x++) {
                const distanceFromCenter = Math.sqrt(Math.pow(x - size / 2, 2) + Math.pow(y - size / 2, 2));
                const textIndex = Math.floor((distanceFromCenter + textOffset) % LoadingText.length);
                line += LoadingText[textIndex];
            }
            face.push(line);
        }
        return face;
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: "column",
                    height: '100vh',
                    bgcolor: 'grey.100',
                }}
            >
                <h2 style={{ fontSize: '30px', fontWeight: '500', marginTop: "20px" }}>Medium</h2>
                <Box
                    sx={{
                        perspective: '1000px',
                        width: '200px',
                        height: '200px',
                        marginTop: '200px'
                    }}
                >


                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            transformStyle: 'preserve-3d',
                            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                            transition: 'transform 0.05s linear',
                        }}
                    >
                        {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
                            <Box
                                key={face}
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    bgcolor: '#F2F2F2',
                                    fontSize: '0.3rem',
                                    lineHeight: '0.5rem',
                                    fontFamily: 'monospace',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    color: 'black',
                                    ...getFaceStyles(face),
                                }}
                            >
                                <Box
                                    component="pre"
                                    sx={{
                                        m: 0,
                                        p: 0,
                                        textAlign: 'center',
                                    }}
                                >
                                    {generateFace().map((line, index) => (
                                        <Box key={index} component="div">
                                            {line}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

function getFaceStyles(face) {
    const common = { transform: 'translateZ(100px)' };
    switch (face) {
        case 'front':
            return common;
        case 'back':
            return { ...common, transform: 'rotateY(180deg) translateZ(100px)' };
        case 'right':
            return { ...common, transform: 'rotateY(90deg) translateZ(100px)' };
        case 'left':
            return { ...common, transform: 'rotateY(-90deg) translateZ(100px)' };
        case 'top':
            return { ...common, transform: 'rotateX(90deg) translateZ(100px)' };
        case 'bottom':
            return { ...common, transform: 'rotateX(-90deg) translateZ(100px)' };
        default:
            return {};
    }
}
