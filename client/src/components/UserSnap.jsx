import { Box, Tabs, Tab, ImageList, ImageListItem, Typography, CircularProgress } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useEffect, useState } from "react";
import { likedSnaps, mySnaps } from "../api.jsx";
import { useNavigate } from "react-router-dom";

const UserSnap = (props) => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);
    const [snapData, setSnapData] = useState([]); // 스냅 데이터를 저장할 상태
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 변수 추가

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const getMySnaps = async () => {
        try {
            const result = await mySnaps();
            console.log('마이스냅: ', result);
            props.setSnapNum(result.length);
            setSnapData(result);
            setIsLoading(false); // 데이터 로딩 완료 시 로딩 상태 변경
        } catch (err) {
            console.log(err);
            setIsLoading(false); // 오류 발생 시에도 로딩 상태 변경
        }
    };

    const getLikedSnaps = async () => {
        try {
            const result = await likedSnaps();
            console.log('좋아요스냅: ', result);
            setSnapData(result);
            setIsLoading(false); // 데이터 로딩 완료 시 로딩 상태 변경
        } catch (err) {
            console.log(err);
            setIsLoading(false); // 오류 발생 시에도 로딩 상태 변경
        }
    };

    useEffect(() => {
        switch (selectedTab) {
            case 0:
                getMySnaps();
                break;
            case 1:
                getLikedSnaps();
                break;
            default:
                break;
        }
    }, [selectedTab]);

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    centered
                    indicatorColor="none"
                    sx={{
                        borderBottom: '1px solid lightgray',
                        height: '70px',
                        backgroundColor: 'white',
                        "& .MuiTab-root": {
                            minWidth: 0,
                            width: '50%',
                        },
                    }}
                >
                    <Tab
                        icon={selectedTab === 0 ? <BookmarkIcon sx={{ color: 'gray', fontSize: 40 }} /> : <BookmarkBorderIcon sx={{ color: 'gray', fontSize: 40 }} />}
                        sx={{ backgroundColor: selectedTab === 0 ? 'lightgray' : 'transparent' }}
                    />
                    <Tab
                        icon={selectedTab === 1 ? <FavoriteIcon sx={{ color: 'gray', fontSize: 40 }} /> : <FavoriteBorderIcon sx={{ color: 'gray', fontSize: 40 }} />}
                        sx={{ backgroundColor: selectedTab === 1 ? 'lightgray' : 'transparent' }}
                    />
                </Tabs>
            </Box>

            {/* 로딩 상태일 때 로딩 아이콘 표시 */}
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                    <CircularProgress />
                </Box>
            ) : (
                // 스냅 데이터가 없을 경우 메시지 표시
                snapData.length === 0 ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2 }}>
                        {selectedTab === 0 ? '게시물이 없습니다' : '좋아요한 게시물이 없습니다'}
                    </Typography>
                ) : (
                    <ImageList sx={{ marginTop: 0, width: '100%' }} cols={3} rowHeight={250} gap={3}>
                        {snapData.map((snap) => (
                            <ImageListItem key={snap.snapId}>
                                <img
                                    srcSet={`${snap.snapImageUrls[0]}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${snap.snapImageUrls[0]}?w=164&h=164&fit=crop&auto=format`}
                                    onClick={() => { navigate(`/snap/${snap.snapId}`) }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                )
            )}
        </>
    );
};

export default UserSnap;
