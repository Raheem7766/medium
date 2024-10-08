import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { toast } from "react-toastify";
import {
    BiLink,
    BiLogoFacebookCircle,
    BiLogoTwitter,
    BiLogoLinkedinSquare,
} from "react-icons/bi";

import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
} from "react-share";

const ShareModal = ({ open, onClose,setOpenShareModal }) => {
    const path = window.location.href;

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(path);
            toast.success("Link has been copied");
            setOpenShareModal(false);
        } catch (error) {
            toast.error(error.message);
            setOpenShareModal(false);
        }
    };

    return (
        <Box open={open} onClose={onClose}>
            <Box sx={{
                display: open ? 'block' : 'none',
                position: 'absolute',
                backgroundColor: 'white',
                boxShadow: 1,
                borderRadius: 1,
                zIndex: 1,
                // padding: 2,
                width: 'max-content',
                top: '40%',
                left: '60%',
                // transform:'translate(30%,-70%)'
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',color:'black' }}>
                    <Button onClick={copyLink} startIcon={<BiLink />} sx={{color:'black'}}>
                        Copy Link
                    </Button>
                    <TwitterShareButton url={path}>
                        <Button startIcon={<BiLogoTwitter />} sx={{color:'black'}}>
                            Share On Twitter
                        </Button>
                    </TwitterShareButton>
                    <FacebookShareButton url={path}>
                        <Button startIcon={<BiLogoFacebookCircle />} sx={{color:'black'}}>
                            Share On Facebook
                        </Button>
                    </FacebookShareButton>
                    <LinkedinShareButton url={path}>
                        <Button startIcon={<BiLogoLinkedinSquare />} sx={{color:'black'}}>
                            Share On LinkedIn
                        </Button>
                    </LinkedinShareButton>
                </Box>

            </Box>
        </Box>
    );
};

export default ShareModal;
