import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {Link} from 'react-router-dom';
const Snap = () => {
    const [liked, setLiked] = React.useState({});

    const handleLike = (index) => {
        setLiked((prevLiked) => ({
            ...prevLiked,
            [index]: !prevLiked[index],
        }));
    };

    return (
        <ImageList sx={{ width: '100%', height: 1200, overflowY: 'auto' }} cols={3} rowHeight={250} gap={0}>
            {itemData.map((item,index) => (
                <ImageListItem key={item.img} sx={{ position: 'relative' }}>
                    <Link
                        to={`/snap/${index}`}
                        state={{ item }}
                        style={{
                            display: 'block', // 이미지가 Link 안에서 깨지지 않도록 설정
                            width: '100%',
                            height: '100%',
                            textDecoration: 'none', // 기본 Link 스타일 제거
                        }}
                    >
                    <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease-in-out', // 부드러운 확대 애니메이션
                            transform: 'scale(1)', // 기본 크기
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} // 확대
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // 원래 크기
                    />
                    </Link>
                    <IconButton
                        onClick={() => handleLike(index)}
                        sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            color: liked[index] ? 'red' : 'white',

                        }}

                    >
                        {liked[index] ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                    </IconButton>
                </ImageListItem>
            ))}
        </ImageList>
    );
};


const itemData = [
    {
        img: 'https://image.musinsa.com/mfile_s01/2021/04/07/134ce63057f068a219a0df338fb0b723143827.jpg.musinsa.lq',

    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSpT15BFE8-IbEG2JeagFikSineWNHOWRAWLMXlZxqhM8igd5oMcyinogDqEe1YVvIIk8&usqp=CAU',
        title: 'Burger',
        name: '차은우',
        time: '3 min ago',
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFEMOOjoxiZvFENR5ujZ7K8q6IoD1HASys-01H4fCEkfXLIXpOZ6yjYBLr9LTwhB-xIoY&usqp=CAU',
        title: 'Camera',
        name: '뷔',
        time: '5 min ago',
    },
    {
        img: 'https://image.xportsnews.com/contents/images/upload/article/2023/0201/mb_1675241860402007.jpg',
        title: 'Coffee',
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4BhrOPpa934o1tAyCsdrszAmEYm5X_2qUOJdr8fKtm2Migz60R8430xtJvoHA3_mU74A&usqp=CAU',
        title: 'Hats',
    },
    {
        img: 'https://blog.kakaocdn.net/dn/bzLeUF/btrYeYo7arh/oBSOfA7uIjyLNx9fJoFmmK/img.jpg',
        title: 'Honey',
    },
    {
        img: 'https://image.msscdn.net/mfile_s01/cms-files/664c37202c4837.21260681.jpg',
        title: 'Basketball',
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZvuWxGdvLnnX70S3n_MLWOUzb1bRurOuF2Q&s',
        title: 'Fern',
    },
    {
        img: 'https://image.msscdn.net/mfile_s01/cms-files/664c379dbf23c1.61330559.jpg',
        title: 'Mushrooms',
    },
    {
        img: 'https://cdn.imweb.me/thumbnail/20221209/5325a8b3ab508.jpg',
        title: 'Tomato basil',
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6j0y4_w5P57GBrV1S6vR48LQNvC8oW5T06Q&s',
        title: 'Sea star',
    },
    {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBDkH4Y97CIrwPmVLhup2MocUe2sznzb9npBLFwd4jXBTQA5XXL05RsNt90EwOJzZ-1nE&usqp=CAU',
        title: 'Bike',
    },
];

export default Snap;
