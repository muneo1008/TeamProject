
import Weather from "../components/Weather.jsx";
import CodyRecommend from "../components/CodyRecommend.jsx";
import {Box} from "@mui/material";

const Home = () => {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Weather/>
            <CodyRecommend/>
        </Box>

    );
};
export default Home
