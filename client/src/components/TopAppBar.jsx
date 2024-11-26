import {Box, Toolbar, Typography} from "@mui/material";
import { useLocation } from "react-router-dom";
import Logo from '../assets/logo.png'
const TopAppBar = () => {
    const location = useLocation();

    // '/snap'으로 정확히 일치하는 경우에만 앱바 숨김
    if (location.pathname === "/snap") {
        return null;
    }

    return (
        <Toolbar
            sx={{
                maxWidth: '600px',
                width: '552px',
                backgroundColor: '#ffffff',
                position: 'static',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                zIndex: 1100,
                '@media (max-width: 768px)': {
                    maxWidth: '100%',
                    width: '100%',
                    paddingRight: '10px',
                },
            }}
        >
            <Box
                component="img"
                src={Logo}
                alt="Logo"
                sx={{
                    height: 40,
                    width: 'auto',
                }}
            />
        </Toolbar>
    );
};

export default TopAppBar;
