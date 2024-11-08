import {IconButton, Toolbar, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";

const TopAppBar = () => {
    const navigate = useNavigate();
    return (
        <>
            <Toolbar sx={{maxWidth:'600px',width:'100%', backgroundColor:'#ffffff',
                '@media (max-width: 768px)': {
                    maxWidth: '100%',
                },}}>
                {/*<IconButton*/}
                {/*    edge="start"*/}
                {/*    color="inherit"*/}
                {/*    onClick={handleBackClick}*/}
                {/*    sx={{ mr: 2 }}*/}
                {/*>*/}
                {/*    <ArrowBackIcon />*/}
                {/*</IconButton>*/}
                <Typography variant="h5">
                    Cody_on
                </Typography>
            </Toolbar>
        </>

    );
};
export default TopAppBar;
