
import {Avatar, Box, Button, IconButton, Paper, Stack, Typography} from "@mui/material";
import {removeCookies} from "../Cookie.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import SettingsIcon from '@mui/icons-material/Settings';


const MyPage = ()=>{

    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    console.log(user)

    const handleLogout = () => {
        removeCookies('token');
        navigate('/');
        alert('로그아웃 완료');
    }
    return(
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
                        sx={{ width: 80, height: 80 }}
                    />
                    <Typography variant="body2" fontWeight="bold">
                        {user.nickName}
                    </Typography>
                </Stack>

                <Paper elevation={3} sx={{ px: 2, py: 1, borderRadius: 2, mx: 1 , backgroundColor:'beige'}}>
                    <Typography variant="caption" display="block" fontWeight="bold" color="textSecondary">
                        퍼스널컬러
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                        가을 뮤트 웜
                    </Typography>
                </Paper>

                <Stack alignItems="center" spacing={0.5} mx={1}>
                    <Typography variant="caption" color="textSecondary">
                        게시물
                    </Typography>
                    <Stack direction="row" alignItems="center">
                        <Typography variant="h4" fontWeight="bold">
                            16
                        </Typography>
                        <Typography variant="body2" color="textSecondary" ml={0.5}>
                            개
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
            <Button onClick={handleLogout}>로그아웃</Button>
        </>
    );
}
export default MyPage;
