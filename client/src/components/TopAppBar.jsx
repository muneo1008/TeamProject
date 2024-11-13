import { Toolbar, Typography} from "@mui/material";

const TopAppBar = () => {
    return (
        <>
            <Toolbar sx={{maxWidth:'600px',
                width:'552px',
                backgroundColor:'#ffffff',
                position: 'fixed',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
                zIndex:1100,
                '@media (max-width: 768px)': {
                    maxWidth: '100%',
                    width: '100%',

                    paddingRight: '10px',
                },}}>
                <Typography variant="h5">
                    Cody_on
                </Typography>
            </Toolbar>
        </>

    );
};
export default TopAppBar;
