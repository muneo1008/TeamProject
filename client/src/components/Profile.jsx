import {Avatar, Box, IconButton, Paper, Stack, Typography, Button, Menu, MenuItem} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {removeCookies} from "../Cookie.jsx";

const Profile = (props) => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    // 메뉴 열기 핸들러
    const handleSettingsClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // 메뉴 닫기 핸들러
    const handleClose = () => {
        setAnchorEl(null);
    };

    // 로그아웃 처리 핸들러
    const handleLogout = () => {
        removeCookies('token');
        console.log("User logged out");
        handleClose(); // 메뉴 닫기
        navigate('/'); // 로그아웃 후 로그인 페이지로 이동
        alert('로그아웃 완료')
    };

    return (
        <Box position="relative" display="flex" alignItems="center" justifyContent="center" p={5}>
            {/* 톱니바퀴 아이콘 */}
            <IconButton
                aria-label="settings"
                onClick={handleSettingsClick}
                sx={{ position: 'absolute', top: 9, right: 0 }}
            >
                <SettingsIcon />
            </IconButton>

            {/* 로그아웃 메뉴 */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            </Menu>

            <Stack alignItems="center" spacing={1} mr={2}>
                <Avatar
                    alt="User"
                    src={user.profileImgUrl}
                    sx={{ width: 100, height: 100 }}
                />
                <Typography variant="body2" fontWeight="bold" sx={{fontSize:'1.2rem'}} >
                    {user.nickname}
                </Typography>
            </Stack>

            <Paper onClick={() => {navigate('/fashion-test')}} elevation={3} sx={{ px: 2, py: 1, borderRadius: 2, mx: 1, backgroundColor: 'beige' }}>
                <Typography variant="caption" display="block" fontWeight="bold" color="textSecondary" sx={{fontSize:'0.7rem'}}>
                    퍼스널컬러
                </Typography>
                <Typography variant="body2" fontWeight="bold" sx={{fontSize:'1.1rem'}}>
                    {user.personalColor ? (user.personalColor) : "없음"}
                </Typography>
            </Paper>

            <Stack alignItems="center" spacing={0.5} mx={1}>
                <Typography variant="caption" color="textSecondary" fontWeight="bold" sx={{position:'absolute', top:60, left: 320}}>
                    게시물
                </Typography>
                <Stack direction="row" alignItems="center">
                    <Typography variant="h2" fontWeight="medium">
                        {props.snapNum}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" color="textSecondary" ml={0.5}
                                sx={{ position: 'absolute', bottom: 80, right: 30 }}>
                        개
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Profile;
