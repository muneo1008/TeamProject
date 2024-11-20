
import Weather from "../components/Weather.jsx";
import CodyRecommend from "../components/CodyRecommend.jsx";
import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {SetNickName} from "../store.jsx";

const Home = () => {
    const [WeatherData, setWeatherData] = useState();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);


    useEffect(() => {
        dispatch(SetNickName(user.nickname));
    },[])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Weather setWeatherData={setWeatherData} />
            <CodyRecommend WeatherData={WeatherData} />
        </Box>

    );
};
export default Home
