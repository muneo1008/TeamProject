
import {Button} from "@mui/material";
import {removeCookies} from "../Cookie.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


const MyPage = ()=>{

    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    console.log(user)

    const handleLogout = () => {
        removeCookies('token');
        navigate('/');
        console.log('토큰 삭제 로그아웃 완료');
    }
    return(
        <>
            닉네임: {user.nickName}
            이메일: {user.email}
            <Button onClick={handleLogout}>로그아웃</Button>
        </>
    );
}
export default MyPage;
