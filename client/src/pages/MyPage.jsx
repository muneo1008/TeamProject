
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Profile from "../components/Profile.jsx"
import UserSnap from "../components/UserSnap.jsx";
import {useState} from "react";

const MyPage = ()=>{

    const user = useSelector(state => state.user);
    console.log(user)
    const [snapNum, setSnapNum] = useState(0);

    return(
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
            }}>
            <Profile snapNum={snapNum}/>
            <UserSnap setSnapNum={setSnapNum}/>
        </Box>
    );
}
export default MyPage;
