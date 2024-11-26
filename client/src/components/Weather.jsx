import {Box, Card, CardContent, CircularProgress, Typography,} from "@mui/material";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SnowImg from '../assets/weatherImg/snow.png';
import CloudyImg from '../assets/weatherImg/cloudy.png';
import RainImg from '../assets/weatherImg/rain.png';
import ShowerImg from '../assets/weatherImg/shower.png';
import SnowRainImg from '../assets/weatherImg/snowRain.png';
import SunImg from '../assets/weatherImg/sun.png';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ShowerIcon from '@mui/icons-material/Shower';
import {useEffect, useState} from "react";
import {weatherInfo} from "../api.jsx";
const Weather = (props) =>{
    console.log('weather on')
    const [loading, setLoading] = useState(true);
    const [bgImg, setBgImg] = useState();
    const [PTY, setPTY] = useState();
    const [SKY, setSKY] = useState();
    const [TMP, setTMP] = useState();
    const [POP, setPOP] = useState();
    const [TMN, setTMN] = useState();
    const [TMX, setTMX] = useState();
    const [WSD, setWSD] = useState();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const SkyToText = (value)=>{
        switch (value) {
            case '1':
                setSKY('맑음');
                setBgImg(SunImg);
                setPTY(<WbSunnyIcon fontSize="medium"/>);
                break;
            case '3':
                setSKY('구름많음');
                setBgImg(CloudyImg);
                setPTY(<CloudIcon fontSize="medium"/>);
                break;
            case '4':
                setSKY('흐림');
                setBgImg(CloudyImg);
                setPTY(<CloudIcon fontSize="medium"/>);
                break;
            default:
                setSKY('정보 없음')
        }
    }
    const PtyToIcon = (value)=>{
        switch (value) {
            case '0':
                break;
            case '1':
                setPTY(<ShowerIcon/>);
                setBgImg(RainImg);
                break;
            case '2':
                setPTY(<ShowerIcon/>);
                setBgImg(SnowRainImg);
                break;
            case '3':
                setPTY(<AcUnitIcon fontSize="medium"/>);
                setBgImg(SnowImg);
                break;
            case '4':
                setPTY(<ShowerIcon/>);
                setBgImg(ShowerImg);
                setSKY('비');
                break;
            default:
                setSKY('정보 없음');
        }
    }
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);
                },
                (error) => {
                    console.log('위치 정보를 가져올 수 없습니다:', error);
                }
            );
        } else {
            console.log('이 브라우저에서는 geolocation을 지원하지 않습니다.');
        }
    };
    const getWeather = async ()=>{
        try{
            const result = await weatherInfo(latitude, longitude);

            setTMP(result.values.TMP);

            SkyToText(result.values.SKY);
            setTMN(result.values.TMN);

            setTMX(result.values.TMX);

            setPOP(result.values.POP);

            setWSD(result.values.WSD);
            PtyToIcon(result.values.PTY);
            props.setWeatherData(result.values);
            setLoading(false);
        }catch (error){
            console.log('날씨 정보 불러오기 실패: ', error);
            setLoading(true);
        }
    }
    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        if (latitude && longitude) {
            getWeather();
        }
    }, [latitude, longitude]);

    return (
        <Card sx={{
            width: '95%',
            height: '150px',
            mt: 1,
            backgroundImage: `url(${bgImg})`,
            borderRadius:'10px',
            backgroundPosition: 'center',
            backgroundSize: '115%',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'

        }}>
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        flex: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        mb: 1,
                        ml: 2,
                    }}
                >
                    <CircularProgress color="primary" sx={{ mb: 2 }} />
                </Box>
            ) : (
                <>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            {PTY}
                            <Typography
                                fontSize="large"
                                fontWeight="bold"
                                sx={{ mx: 1, lineHeight: 1 }}
                            >
                                {SKY}
                            </Typography>
                        </Box>
                    </CardContent>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, ml: 2 }}>
                        <Typography variant="h3">{TMP}°</Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'rows',
                            mb: 1,
                            ml: 2,
                            gap: 1,
                        }}
                    >
                        {/* 날씨 부가 정보 */}
                        <Box sx={{alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" fontWeight="bold">
                                🌡️ 최고/최저: {TMX}° / {TMN}° 🌧️ 강수확률: {POP}% 💨 풍속: {WSD}m/s
                            </Typography>
                        </Box>
                    </Box>
                </>
            )}

        </Card>

    );
}
export default Weather;
