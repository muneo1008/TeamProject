import React, { useState } from 'react';
import { Box, Avatar, Typography, IconButton, TextField, Button, Card, CardMedia, Fab } from '@mui/material';
import { FavoriteBorder, Favorite, Comment, Close } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMediaQuery } from '@mui/material';

const SnapDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
        id: parseInt(id),
        user: { name: `${id}의 게시물 디테일`, profileImage: "https://via.placeholder.com/150", bio: "내 패션 어떰!" },
        images: [
            "https://via.placeholder.com/400",
            "https://via.placeholder.com/400",
            "https://via.placeholder.com/400"
        ],
        createdAt: "2024-11-17T12:00:00Z",
        isLiked: false,
        comments: [
            { id: 1, user: { name: "user1", profileImage: "https://via.placeholder.com/150" }, text: "굿!" },
            { id: 2, user: { name: "user2", profileImage: "https://via.placeholder.com/150" }, text: "예뻐요!" },
            { id: 3, user: { name: "user3", profileImage: "https://via.placeholder.com/150" }, text: "하이" },
            { id: 4, user: { name: "user4", profileImage: "https://via.placeholder.com/150" }, text: "좋아요" }
        ],
    });
    const [newComment, setNewComment] = useState("");
    const [commentsOpen, setCommentsOpen] = useState(false);

    const handleLikeToggle = () => {
        setPost((prevPost) => ({
            ...prevPost,
            isLiked: !prevPost.isLiked
        }));
    };

    const handleAddComment = () => {
        setPost((prevPost) => ({
            ...prevPost,
            comments: [...prevPost.comments, { id: Date.now(), user: { name: "currentUser", profileImage: "https://via.placeholder.com/150" }, text: newComment }]
        }));
        setNewComment("");
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
    };

    const isDesktop = useMediaQuery('(min-width:768px)');

    return (
        <Box sx={{ minHeight: "100vh", padding: 2, display: 'flex', flexDirection: 'column',
        }}>
            {/* 이미지 슬라이드 */}
            <Slider {...sliderSettings}>
                {post.images.map((image, index) => (
                    <Card key={index} sx={{ position: "relative" }}>
                        <CardMedia component="img" image={image} sx={{ height: 400, objectFit: "cover" }} />
                    </Card>
                ))}
            </Slider>

            {/* 스냅 작성자 정보 */}
            <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}>
                <Avatar
                    src={post.user.profileImage}
                    alt={post.user.name}
                    sx={{ width: 40, height: 40, marginRight: 1 }}
                />
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {post.user.name}
                    </Typography>
                    <Typography variant="body2">
                        {post.user.bio}
                    </Typography>
                </Box>
            </Box>


            {/* 좋아요와 댓글 버튼 */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 1,borderBottom:'1px solid #e0e0e0' }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton sx={{ color: post.isLiked ? "red" : "gray" }} onClick={handleLikeToggle}>
                        {post.isLiked ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                </Box>

                {/* 댓글 아이콘 */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => setCommentsOpen(true)}>
                        <Comment />
                    </IconButton>
                </Box>
            </Box>

            <Box sx={{ marginTop: 2 }}>
                {post.comments.slice(0, 3).map((comment) => (
                    <Box key={comment.id} sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                        <Avatar src={comment.user.profileImage} sx={{ width: 30, height: 30, marginRight: 1 }} />
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                {comment.user.name}
                            </Typography>
                            <Typography variant="body2">{comment.text}</Typography>
                        </Box>
                    </Box>
                ))}

                {post.comments.length > commentsOpen && (
                    <Button onClick={() => setCommentsOpen(true)} sx={{ color: "primary.main", marginTop: 1 }}>
                        댓글 더보기
                    </Button>
                )}
            </Box>
            {/* 댓글 영역 */}
            {commentsOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        right: 0,
                        top: '70%', // 화면 중앙에서 시작
                        backgroundColor: 'white',
                        boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.2)',
                        transition: 'transform 0.3s ease-in-out', // 애니메이션 추가
                        zIndex: 1300,
                        minHeight: '60vh', // 최소 높이 설정
                        maxHeight: '70vh', // 최대 높이 설정
                        overflowY: 'auto', // 스크롤 가능
                        pt:1,
                        width: isDesktop ? '600px' : '100%', // 화면 크기마다 너비 다르게 설정
                        left: '50%', // 데스크탑일 때 중앙으로 오도록 설정
                        transform: commentsOpen ? 'translate(-50%, -50%)' : 'translate(-50%, 100%)', // 애니메이션 적용
                    }}
                >
                    {/* 닫기 버튼과 댓글 목록 */}
                    <Box sx={{ position: 'relative' }}>
                        {/* 닫기 버튼 */}
                        <Box sx={{
                            position: 'absolute',
                            right: 10,
                            zIndex: 1400,
                        }}>
                            <IconButton onClick={() => setCommentsOpen(false)}>
                                <Close />
                            </IconButton>
                        </Box>

                        {/* 댓글 목록 */}
                        <Box sx={{ marginBottom: 2, overflowY: 'auto', maxHeight: '49vh', pl: 1,pt:1 }}>
                            {post.comments.length > 0 ? (
                                post.comments.map((comment) => (
                                    <Box
                                        key={comment.id}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom: 1,
                                            borderBottom: '1px solid #e0e0e0',
                                            paddingBottom: 1,
                                        }}
                                    >
                                        <Avatar src={comment.user.profileImage} sx={{ width: 40, height: 40, marginRight: 1 }} />
                                        <Box>
                                            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                                {comment.user.name}
                                            </Typography>
                                            <Typography variant="body2">{comment.text}</Typography>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary">아직 댓글이 없습니다.</Typography>
                            )}
                        </Box>
                    </Box>
                </Box>


            )}

            {/* 댓글 입력 */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'white',
                    zIndex: 1400,
                    padding: 2,
                    display: commentsOpen ? 'flex' : 'none',
                    flexDirection: 'row',
                    gap: 1,
                    width: isDesktop ? '568px' : '100%',
                }}
            >
                <TextField
                    label="댓글 추가..."
                    variant="outlined"
                    fullWidth
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{
                        flexGrow: 1,
                        marginBottom: 0,
                        pl:1
                    }}
                />
                <Button variant="contained" onClick={handleAddComment} sx={{mr:1}}>
                    추가
                </Button>
            </Box>


            {/* Backdrop - 댓글 창 외 영역 비활성화 */}
            {commentsOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1200,
                    }}
                    onClick={() => setCommentsOpen(false)}
                />
            )}
        </Box>
    );
};

export default SnapDetail;
