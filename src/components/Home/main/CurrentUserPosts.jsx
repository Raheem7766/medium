import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

export default function CurrentUserPosts() {
    return (
        <Box
            sx={{ height: 'max-content', width: '100%', marginTop: '17px' }}
            key={post.id}
            className="post"
        >
            <div
                onClick={() => handlePostClick(post.id)}
                className="w-[100%] h-[100%] flex flex-row sm:flex-row gap-4 cursor-pointer"
            >
                <div className="w-[68%]">
                    <div className='flex gap-[5px]' style={{ alignItems: 'center' }}>
                        <div className='h-[20px] w-[20px] rounded-[50%]'>
                            {userPhotos[post.authorId] ? (
                                <Box
                                    sx={{
                                        height: '100%',
                                        width: '100%',
                                        cursor: 'pointer',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        position: 'relative'
                                    }}
                                >
                                    <img
                                        src={userPhotos[post.authorId]}
                                        alt="User Profile"
                                        style={{ height: '100%', width: '100%', borderRadius: '50%' }}
                                    />
                                </Box>
                            ) : (
                                <span>No Image</span>
                            )}
                        </div>
                        <Typography
                            className="font-semibold"
                            sx={{
                                fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' },
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {post.author}
                        </Typography>
                    </div>
                    <Typography
                        sx={{
                            fontSize: { xs: '20px', sm: '24px', md: '28px', lg: '33px' },
                            fontWeight: 'bold',
                            marginTop: '20px',
                            lineClamp: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                        noWrap
                    >
                        {post.title}
                    </Typography>
                    <Typography
                        sx={{
                            marginTop: '20px',
                            fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' },
                            color: 'gray',
                            lineClamp: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                        dangerouslySetInnerHTML={{ __html: post.description }}
                    />

                </div>
                <div className='h-[100%] w-[20%]' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {post.imageUrl && (
                        <div>
                            <img
                                src={post.imageUrl}
                                alt="postImg"
                                className="w-full h-auto object-cover"
                                style={{ maxWidth: '300px', maxHeight: '150px' }}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className='flex justify-between mt-[20px] w-full sm:w-[70%] '>
                <p>{formatDate(post)}</p>
                <div className='flex gap-[20px]'>
                    {console.log('User UID:', user?.uid)}
                    {console.log('Post Author ID:', post.authorId)}

                    {user && String(post.authorId) === String(user.uid) ? (
                        <RemoveCircleOutlineRoundedIcon
                            onClick={() => handleDelete(post.id)}
                            sx={{ fontSize: '20px', color: '#6B6B6B', cursor: 'pointer' }}
                        />
                    ) : null}

                    <BookmarkAddRoundedIcon
                        sx={{ fontSize: '20px', color: '#6B6B6B', cursor: 'pointer' }}
                    />
                    <MoreHorizOutlined
                        sx={{ fontSize: '20px', color: '#6B6B6B', cursor: 'pointer' }}
                    />
                </div>
            </div>
            <Divider sx={{ border: '1px solid #F2F2F2', width: '100%', marginTop: '20px' }} />
        </Box>
    )
}
