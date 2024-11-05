import {IconButton, Toolbar, Typography} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useNavigate} from "react-router-dom";

const TopAppBar = () => {
    const navigate = useNavigate();
    const handleBackClick = () =>{
        navigate(-1);
    }
    return (
        <>
            <Toolbar sx={{maxWidth:'600px',width:'100%', backgroundColor:'#C299FA',
                '@media (max-width: 768px)': {
                    maxWidth: '100%',
                },}}>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleBackClick}
                    sx={{ mr: 2 }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6">
                    코디On
                </Typography>
            </Toolbar>
        </>

    );
};
export default TopAppBar;
