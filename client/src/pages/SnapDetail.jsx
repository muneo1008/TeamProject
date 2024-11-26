import { useEffect, useState } from 'react';
import {
    Box,
    Avatar,
    Typography,
    IconButton,
    TextField,
    Button,
    Card,
    CardMedia,
    Menu,
    MenuItem,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import {FavoriteBorder, Favorite, Comment, Close, MoreVert, Edit, Delete} from '@mui/icons-material';
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMediaQuery } from '@mui/material';
import {getSnapById, getSnapCommentById, getSnapLikedBySnapId, likeFalse, likeTrue} from "../api.jsx";
import {useSelector} from "react-redux";
import EditSnap from "../components/EditSnap.jsx";


const SnapDetail = () => {
    const { id } = useParams();
    const [edit, setEdit] = useState(false);
    const [post, setPost] = useState({
        id: parseInt(id),
        user: { name: "", profileImage: "", bio: "",id:"" },
        description: "",
        images: [],
        createdAt: "",
        categories: [],
        isLiked: false,
    });
    const [comments, setComments] = useState([]);  // 댓글 데이터를 별도로 관리
    const [newComment, setNewComment] = useState("");
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isCommentDeleteDialogOpen, setIsCommentDeleteDialogOpen] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [editCommentId, setEditCommentId] = useState(null); // 현재 수정 중인 댓글 ID
    const [editCommentContent, setEditCommentContent] = useState("");

    const user = useSelector((state)=>state.user);
    const getSnapInfoById  = async (SnapId)=>{
        try {
            const result = await getSnapById(SnapId);
            const result2 = await getSnapLikedBySnapId(SnapId);
            setPost({
                id: result.snapId,
                user: {
                    name: result.author.nickname,
                    profileImage: result.author.profileImageUrl,
                    bio: result.author.personalColor || null,
                    id: result.author.id,
                },
                description: result.snapDescription,
                images: result.snapImageUrls,
                createdAt: result.snapCreatedDate,
                categories: result.categories,
                isLiked: result2.liked,
            });
            console.log(result)
        }catch (err){
            console.log('스냅 디테일 불러오기 실패',err);
        }
    }
    const getSnapCommentInfoById = async (SnapId)=>{
        try{
            const result = await getSnapCommentById(SnapId);
            const commentsData = result.map((comment) => ({
                id: comment.commentId,
                member: {
                    nickname: comment.member.nickname,
                    profileImageUrl: comment.member.profileImageUrl,
                    memberId : comment.member.memberId,
                },
                content: comment.content,
                createDate: comment.createDate,
            }));
            setComments(commentsData);  // 댓글 데이터를 별도로 관리
        }catch (err){
            console.log(err);
        }
    }

    useEffect(() => {
        // Post 정보를 불러오는 API 요청
        getSnapInfoById(id);
        // 댓글 데이터를 불러오는 API 요청
        getSnapCommentInfoById(id);

    }, [id,edit]);

    const handleLikeToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if(post.isLiked){
                await likeFalse(post.id);
            }else{
                await likeTrue(post.id);
            }
            getSnapInfoById(id);
        }catch (err){
            console.log(err);
        }
    };

    const handleAddComment = async () => {
        if (newComment.trim()) {
            const payload = { content: newComment };

            axios.post(`http://localhost:8080/api/snaps/${post.id}/comments`, payload, { withCredentials: true })
                .then((response) => {
                    const newCommentData = response.data;
                    getSnapCommentInfoById(id);
                    setNewComment("");
                })
                .catch((error) => {
                    console.error("There was an error adding the comment:", error);
                });
        }
    };
    const handleMenuClick = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleEdit = () => {
        handleMenuClose();
        setEdit(true);
        console.log("수정 클릭됨");
    };

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true); // 삭제 확인 모달 열기
    };

    const handleCloseDialog = () => {
        setIsDeleteDialogOpen(false); // 삭제 확인 모달 닫기
    };

    const handleConfirmDelete = async () => {
        setIsDeleteDialogOpen(false); // 삭제 확인 모달 닫기
        try {
            await axios.delete(`http://localhost:8080/api/snaps/${post.id}`, { withCredentials: true });
            console.log("삭제 성공");
            // 추가적으로, 삭제 후 이동할 페이지로 리다이렉트 처리
            window.location.href = '/snap'; // 예: 홈으로 이동
        } catch (error) {
            console.error("삭제 실패:", error);
        }
    };
    // 댓글 삭제 핸들러
    const handleCommentDeleteClick = (commentId) => {
        setSelectedCommentId(commentId); // 삭제할 댓글 ID 저장
        setIsCommentDeleteDialogOpen(true); // 삭제 확인 모달 열기
    };

    // 댓글 삭제 확인
    const handleConfirmCommentDelete = async () => {
        setIsCommentDeleteDialogOpen(false); // 삭제 확인 모달 닫기
        try {
            await axios.delete(`http://localhost:8080/api/snaps/${id}/comments/${selectedCommentId}`, { withCredentials: true });
            console.log("댓글 삭제 성공");
            getSnapCommentInfoById(id);
        } catch (error) {
            console.error("댓글 삭제 실패:", error);
        }
    };

    // 댓글 삭제 취소
    const handleCloseCommentDeleteDialog = () => {
        setIsCommentDeleteDialogOpen(false); // 삭제 확인 모달 닫기
        setSelectedCommentId(null); // 초기화
    };

    //댓글 수정
    const handleCommentEditClick = (commentId, currentContent) => {
        setEditCommentId(commentId); // 수정 중인 댓글 ID 설정
        setEditCommentContent(currentContent); // 기존 댓글 내용 설정
    };

    const handleEditCommentSubmit = async () => {
        try {
            await axios.put(
                `http://localhost:8080/api/snaps/${id}/comments/${editCommentId}`,
                { content: editCommentContent },
                { withCredentials: true }
            );
            console.log("댓글 수정 성공");
            setEditCommentId(null); // 수정 상태 초기화
            setEditCommentContent(""); // 수정 내용 초기화
            getSnapCommentInfoById(id); // 댓글 목록 갱신
        } catch (error) {
            console.error("댓글 수정 실패:", error);
        }
    };
    const isAuthor = user && user.nickname === post.user.name;

    const sliderSettings = {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
    };

    const isDesktop = useMediaQuery('(min-width:768px)');
    const navigate = useNavigate();
    return (
        <>
            {!edit ? (
                <Box sx={{ minHeight: "100vh", padding: 2, display: 'flex', flexDirection: 'column',mb:9 }}>
                    {/* 이미지 슬라이드 */}
                    {post.images.length > 1 ? (
                        <Slider {...sliderSettings}>
                            {post.images.map((image, index) => (
                                <Card key={index} sx={{ position: "relative" }}>
                                    <CardMedia component="img" image={image} sx={{ objectFit: "cover",maxHeight: '700px'}} />
                                    {isAuthor && (
                                        <IconButton
                                            sx={{
                                                position: "absolute",
                                                top: 8,
                                                right: 8,
                                                color: "white",
                                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                            }}
                                            onClick={handleMenuClick}
                                        >
                                            <MoreVert />
                                        </IconButton>
                                    )}
                                </Card>
                            ))}
                        </Slider>
                    ) : (
                        <Card sx={{ position: "relative" }}>
                            <CardMedia component="img" image={post.images[0]} sx={{ objectFit: "cover" }} />
                            {isAuthor && (
                                <IconButton
                                    sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        color: "white",
                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    }}
                                    onClick={handleMenuClick}
                                >
                                    <MoreVert />
                                </IconButton>
                            )}
                        </Card>
                    )}

                    <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleEdit}>수정하기</MenuItem>
                        <MenuItem onClick={handleDeleteClick}>삭제하기</MenuItem>
                    </Menu>

                    {/* 스냅 작성자 정보 */}
                    <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            src={post.user.profileImage}
                            alt={post.user.name}
                            sx={{ width: 40, height: 40, marginRight: 1 }}
                            onClick={(e)=>{navigate(`/member/${post.user.id}`);e.preventDefault();e.stopPropagation()}}
                        />
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {post.user.name}
                            </Typography>
                            {post.user.bio ? (
                                <Typography
                                    variant="body2"
                                    sx={{ backgroundColor: 'beige', padding: 0.5, borderRadius: 1 }}
                                >
                                    {post.user.bio}
                                </Typography>
                            ):null}

                        </Box>
                    </Box>

                    {/* 스냅 설명 */}
                    <Box sx={{ marginTop: 2, ml: 2 }}>
                        <Typography variant="body2" sx={{ fontSize: '1rem', color: 'text.primary' }}>
                            {post.description}
                        </Typography>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", marginTop: 1 }}>
                            {post.categories.map((category, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        padding: "4px 8px",
                                        backgroundColor: "#f0f0f0",
                                        borderRadius: "8px",
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    #{category}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    {/* 좋아요와 댓글 버튼 */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 1, borderBottom: '1px solid #e0e0e0' }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton sx={{ color: post.isLiked ? "red" : "gray" }} onClick={handleLikeToggle}>
                                {post.isLiked ? <Favorite /> : <FavoriteBorder />}
                            </IconButton>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton onClick={() => setCommentsOpen(true)}>
                                <Comment />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* 댓글 표시 */}
                    <Box sx={{ marginTop: 2 }}>
                        {comments.length === 0 && (
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                댓글이 없습니다.
                            </Typography>
                        )}

                        {comments.slice(0, commentsOpen ? comments.length : 3).map((comment) => (
                            <Box key={comment.id} sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
                                <Avatar src={comment.member.profileImageUrl} sx={{ width: 30, height: 30, marginRight: 1 }}
                                        onClick={(e)=>{navigate(`/member/${comment.member.memberId}`);e.preventDefault();e.stopPropagation()}}/>
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                        {comment.member.nickname}
                                    </Typography>
                                    <Typography variant="body2">{comment.content}</Typography>
                                </Box>
                            </Box>
                        ))}

                        {comments.length > 3 && !commentsOpen && (
                            <Button onClick={() => setCommentsOpen(true)} sx={{ color: "primary.main", marginTop: 1 }}>
                                댓글 더보기
                            </Button>
                        )}
                    </Box>

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
                                pl: 1
                            }}
                        />
                        <Button variant="contained" onClick={handleAddComment} sx={{ mr: 1 }}>
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
                                overflow: 'hidden',
                            }}
                            onClick={() => setCommentsOpen(false)}
                        />
                    )}
                    {/* 댓글 영역 */}
                    {commentsOpen && (
                        <Box
                            sx={{
                                position: 'fixed',
                                right: 0,
                                top: '70%',
                                backgroundColor: 'white',
                                boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.2)',
                                transition: 'transform 0.3s ease-in-out',
                                zIndex: 1300,
                                minHeight: '60vh',
                                maxHeight: '70vh',
                                overflowY: 'auto',
                                pt: 1,
                                width: isDesktop ? '600px' : '100%',
                                left: '50%',
                                transform: commentsOpen ? 'translate(-50%, -50%)' : 'translate(-50%, 100%)',
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
                                <Box sx={{ marginBottom: 2, overflowY: 'auto', maxHeight: '49vh', pl: 1, pt: 4 }}>
                                    {comments.length > 0 ? (
                                        comments.map((comment) => (
                                            <Box
                                                key={comment.id}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    marginBottom: 1,
                                                    borderBottom: '1px solid #e0e0e0',
                                                    paddingBottom: 3,
                                                }}
                                            >
                                                <Avatar src={comment.member.profileImageUrl} sx={{ width: 40, height: 40, marginRight: 1 }} />
                                                <Box sx={{ flexGrow: 1 }}>
                                                    {editCommentId === comment.id ? (
                                                        <TextField
                                                            value={editCommentContent}
                                                            onChange={(e) => setEditCommentContent(e.target.value)}
                                                            fullWidth
                                                        />
                                                    ) : (
                                                        <>
                                                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                                                {comment.member.nickname}
                                                            </Typography>
                                                            <Typography variant="body2">{comment.content}</Typography>
                                                        </>
                                                    )}
                                                </Box>
                                                {/* 본인의 댓글인지 확인 */}
                                                {user.nickname === comment.member.nickname && (
                                                    <Box>
                                                        {editCommentId === comment.id ? (
                                                            <>
                                                                <Button onClick={handleEditCommentSubmit} size="small">
                                                                    수정
                                                                </Button>
                                                                <Button
                                                                    onClick={() => {
                                                                        setEditCommentId(null);
                                                                        setEditCommentContent("");
                                                                    }}
                                                                    size="small"
                                                                >
                                                                    취소
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleCommentEditClick(comment.id, comment.content)}
                                                                >
                                                                    <Edit />
                                                                </IconButton>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleCommentDeleteClick(comment.id)}
                                                                >
                                                                    <Delete />
                                                                </IconButton>
                                                            </>
                                                        )}
                                                    </Box>
                                                )}
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="textSecondary">아직 댓글이 없습니다.</Typography>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {/*{게시물 삭제 확인 모달*/}
                    <Dialog open={isDeleteDialogOpen} onClose={handleCloseDialog}>
                        <DialogTitle>게시물 삭제 </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                정말 이 스냅을 삭제하시겠습니까? 삭제한 후에는 복구할 수 없습니다.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                취소
                            </Button>
                            <Button onClick={handleConfirmDelete} color="error">
                                삭제
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {/*// 댓글 삭제 확인 모달*/}
                    <Dialog open={isCommentDeleteDialogOpen} onClose={handleCloseCommentDeleteDialog}>
                        <DialogTitle>댓글 삭제</DialogTitle>
                        <DialogContent>
                            <DialogContentText>정말로 댓글을 삭제하시겠습니까?</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseCommentDeleteDialog} color="primary">
                                취소
                            </Button>
                            <Button onClick={handleConfirmCommentDelete} color="secondary">
                                삭제
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            ):(
                <EditSnap post={post} setEdit={setEdit}/>
                )}
        </>

    );
};

export default SnapDetail;
