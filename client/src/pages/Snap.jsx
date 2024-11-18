import { Avatar, Box, Typography, IconButton } from "@mui/material";
import testImg from '../assets/test.jpg';
import AddIcon from '@mui/icons-material/Add';

const Snap = () => {
    // 테스트용
    const posts = Array(5).fill({
        imgSrc: `${testImg}`,
        profileImg: "profileImgURL",
        nickname: "닉네임",
        timeElapsed: "5분 전",
    });

    const handleAddClick = () => {
        // 스냅 추가 버튼
        console.log("스냅 추가 버튼 누름");
    };

    return (
        <Box sx={{ position: 'relative', width: '100%' }}>
            {posts.map((post, index) => (
                <Box key={index} sx={{ position: 'relative', mt: 2 }}>
                    <Box
                        component="img"
                        src={post.imgSrc}
                        sx={{ width: '100%', height: '40vh', borderRadius: 2 }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            padding: '4px 8px',
                            borderRadius: 2,
                            color: 'white',
                        }}
                    >
                        <Avatar src={post.profileImg} sx={{ width: 32, height: 32, marginRight: 1 }} />
                        <Box>
                            <Typography variant="body2">{post.nickname}</Typography>
                            <Typography variant="caption">{post.timeElapsed}</Typography>
                        </Box>
                    </Box>
                </Box>
            ))}

            <IconButton
                onClick={handleAddClick}
                sx={{
                    position: '',
                    bottom: 70,
                    right: 16,
                    backgroundColor: '#c283f1',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#9a4cc2',
                    },
                    boxShadow: 2,
                    borderRadius: '50%',
                    padding: 2,
                }}
            >
                <AddIcon sx={{ fontSize: 25 }} />
            </IconButton>
        </Box>
    );
}

export default Snap;
