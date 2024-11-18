import { Box, Tabs, Tab, ImageList, ImageListItem } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useState } from "react";

const UserSnap = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    centered
                    disableRipple
                    indicatorColor="none"
                    sx={{
                        borderBottom: '1px solid lightgray',
                        height: '70px',
                        backgroundColor: 'white',
                        "& .MuiTab-root": {
                            minWidth: 0,
                            width: '33%',
                        },
                    }}
                >
                    <Tab
                        icon={
                            selectedTab === 0
                                ? <BookmarkIcon sx={{ color: 'gray', fontSize: 40 }} />
                                : <BookmarkBorderIcon sx={{ color: 'gray', fontSize: 40 }} />
                        }
                        sx={{
                            backgroundColor: selectedTab === 0 ? 'lightgray' : 'transparent',

                        }}
                    />
                    <Tab
                        icon={
                            selectedTab === 1
                                ? <FavoriteIcon sx={{ color: 'gray', fontSize: 40 }} />
                                : <FavoriteBorderIcon sx={{ color: 'gray', fontSize: 40 }} />
                        }
                        sx={{
                            backgroundColor: selectedTab === 1 ? 'lightgray' : 'transparent',
                        }}
                    />
                    <Tab
                        icon={
                            selectedTab === 2
                                ? <StarIcon sx={{ color: 'gray', fontSize: 40 }} />
                                : <StarOutlineIcon sx={{ color: 'gray', fontSize: 40 }} />
                        }
                        sx={{
                            backgroundColor: selectedTab === 2 ? 'lightgray' : 'transparent',
                        }}
                    />
                </Tabs>
            </Box>

            <ImageList sx={{ marginTop: 0, width: '100%' }} cols={3} rowHeight={250} gap={3}>
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

// 임시 데이터
const itemData = [
    { img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'Breakfast' },
    { img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', title: 'Burger' },
    { img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', title: 'Camera' },
    { img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c', title: 'Coffee' },
    { img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8', title: 'Hats' },
    { img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62', title: 'Honey' },
    { img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6', title: 'Basketball' },
    { img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f', title: 'Fern' },
    { img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25', title: 'Mushrooms' },
    { img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af', title: 'Tomato basil' },
    { img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1', title: 'Sea star' },
    { img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6', title: 'Bike' },
];

export default UserSnap;
