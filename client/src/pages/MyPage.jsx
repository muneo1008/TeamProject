
import {Avatar, Box, Button, IconButton, Paper, Stack, Typography} from "@mui/material";
import {removeCookies} from "../Cookie.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import SettingsIcon from '@mui/icons-material/Settings';

import Account from '../components/Account.jsx'
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
            <Account/>
        </>
    );
}
export default MyPage;
