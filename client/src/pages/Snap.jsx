import {Avatar, Box, Typography} from "@mui/material";
import testImg from '../assets/test.jpg';
const Snap = ()=>{
    // 테스트용
    const posts = Array(5).fill({
        imgSrc: `${testImg}`,
        profileImg: "profileImgURL",
        nickname: "닉네임",
        timeElapsed: "5분 전",
    });

    return (
        <Box sx={{ position: 'relative', width: '100%'}}>
            {posts.map((post, index) => (
                <Box key={index} sx={{ position: 'relative', mt: 2 }}>
                    <Box
                        component="img"
                        src={post.imgSrc}
                        alt="게시물 이미지"
                        sx={{ width: '100%', borderRadius: 2}}
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
        </Box>
    );
}
export default Snap;
