
import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { IconButton, Paper, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import ImageListItem from "@mui/material/ImageListItem";
import ImageList from "@mui/material/ImageList";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Account = () => {
    const [selectedIcon, setSelectedIcon] = React.useState(null);

    const handleIconClick = (icon) => {
        setSelectedIcon(icon === selectedIcon ? null : icon);
    };

    return (
        <>
            <Box position="relative" display="flex" alignItems="center" justifyContent="center" p={5}>
                <IconButton
                    aria-label="settings"
                    sx={{ position: 'absolute', top: 9, right: 0 }}
                >
                    <SettingsIcon />
                </IconButton>

                <Stack alignItems="center" spacing={1} mr={2}>
                    <Avatar
                        alt="User"
                        src="/src/images/image.jpg"
                        sx={{ width: 150, height: 150 }}
                    />
                    <Typography variant="body2" fontWeight="bold" sx={{fontSize:'1.2rem'}} >
                        이수민
                    </Typography>
                </Stack>

                <Paper elevation={3} sx={{ px: 2, py: 1, borderRadius: 2, mx: 1, backgroundColor: 'beige' }}>
                    <Typography variant="caption" display="block" fontWeight="bold" color="textSecondary" sx={{fontSize:'0.7rem'}}>
                        퍼스널컬러
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{fontSize:'1.1rem'}}>
                        가을 뮤트 웜
                    </Typography>
                </Paper>

                <Stack alignItems="center" spacing={0.5} mx={1}>
                    <Typography variant="caption" color="textSecondary" fontWeight="bold" sx={{position:'absolute',top:80, left: 370}}>
                        게시물
                    </Typography>
                    <Stack direction="row" alignItems="center">
                        <Typography variant="h4" fontWeight="medium" sx={{fontSize:'4.2rem'}}>
                            16
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" color="textSecondary" ml={0.5}
                                    sx={{ position: 'absolute', bottom: 100, right: 35 }}>
                            개
                        </Typography>
                    </Stack>
                </Stack>
            </Box>

            <Box sx={{ width: 500 }}>
                <BottomNavigation
                    showLabels
                    sx={{
                        borderBottom: '1px solid lightgray',
                        height: '70px',
                        backgroundColor: 'white',
                    }}
                >
                    <BottomNavigationAction
                        icon={selectedIcon === 'bookmark' ? <BookmarkIcon sx={{ color: 'gray', fontSize: 50 }} /> : <BookmarkBorderIcon sx={{ color: 'gray', fontSize: 50 }} />}
                        sx={{
                            backgroundColor: selectedIcon === 'bookmark' ? 'lightgray' : 'transparent',
                            minWidth: 0,
                            width: '100%',
                        }}
                        onClick={() => handleIconClick('bookmark')}
                    />
                    <BottomNavigationAction
                        icon={selectedIcon === 'favorite' ? <FavoriteIcon sx={{ color: 'gray', fontSize: 50 }} /> : <FavoriteBorderIcon sx={{ color: 'gray', fontSize: 50 }} />}
                        sx={{
                            backgroundColor: selectedIcon === 'favorite' ? 'lightgray' : 'transparent',
                            minWidth: 0,
                            width: '100%',
                        }}
                        onClick={() => handleIconClick('favorite')}
                    />
                    <BottomNavigationAction
                        icon={selectedIcon === 'star' ? <StarIcon sx={{ color: 'gray', fontSize: 50 }} /> : <StarOutlineIcon sx={{ color: 'gray', fontSize: 50 }} />}
                        sx={{
                            backgroundColor: selectedIcon === 'star' ? 'lightgray' : 'transparent',
                            minWidth: 0,
                            width: '100%',
                        }}
                        onClick={() => handleIconClick('star')}
                    />
                </BottomNavigation>
            </Box>

            <ImageList sx={{ width: 500, marginTop: 0 }} cols={3} rowHeight={250} gap={3}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );
};

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    },
];

export default Account;
