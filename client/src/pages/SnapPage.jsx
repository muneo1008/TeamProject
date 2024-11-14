import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const SnapPage = () => {
    const location = useLocation();
    const { item } = location.state || {};

    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [showCommentField, setShowCommentField] = useState(false);
    const [comment, setComment] = useState('');

    const handleLike = () => setLiked(!liked);
    const handleBookmark = () => setBookmarked(!bookmarked);
    const toggleCommentField = () => setShowCommentField(!showCommentField);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            {item && (
                <>
                    <img
                        src={item.img}
                        alt={item.title}
                        style={{ width: '96%', height: 'auto', objectFit: 'cover' ,borderRadius:20}}
                    />
                    <Box sx={{ position: 'relative', bottom: 8, right: -210 ,display:'flex',gap:'1'}}>
                        <IconButton onClick={handleLike}>
                            {liked ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <IconButton onClick={toggleCommentField}>
                            {showCommentField ? <ChatBubbleIcon sx={{ color: 'gray' }} /> : <ChatBubbleOutlineIcon />}
                        </IconButton>
                        <IconButton onClick={handleBookmark}>
                            {bookmarked ? <BookmarkIcon sx={{ color: 'gray' }} /> : <BookmarkBorderIcon />}
                        </IconButton>
                    </Box>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        {item.title || 'No Title'}
                    </Typography>

                    {showCommentField && (
                        <Box sx={{ mt: 2, width: '50%' }}>
                            <TextField
                                fullWidth
                                label="댓글 입력.."
                                variant="outlined"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default SnapPage;
