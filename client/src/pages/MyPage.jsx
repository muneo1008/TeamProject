
import {Avatar, Box, Button, IconButton, Paper, Stack, Typography} from "@mui/material";
import {removeCookies} from "../Cookie.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Profile from "../components/Profile.jsx"
import UserSnap from "../components/UserSnap.jsx";

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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
            }}>
            <Profile/>
            <UserSnap/>
        </Box>
    );
}
export default MyPage;
