import {Box, Card, CardContent, Typography,} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SnowImg from '../assets/weatherImg/snow.png';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {useEffect, useState} from "react";
import {weatherInfo} from "../api.jsx";
const Weather = () =>{
    console.log('weather on')
    const [loading, setLoading] = useState(true);
    const [bgImg, setBgImg] = useState();
    const [PTY, setPTY] = useState();
    const [SKY, setSKY] = useState();
    const [TMP, setTMP] = useState();
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const SkyToText = (value)=>{
        switch (value) {
            case '1':
                setSKY('맑음');
                break;
            case '3':
                setSKY('구름많음');
                break;
            case '4':
                setSKY('흐림');
                break;
            default:
                setSKY('정보 없음')
        }
    }
    const PtyToIcon = (value)=>{
        // 백그라운드 이미지 설정도 추가해야함
        switch (value) {
            case '0':
                setPTY(<WbSunnyIcon fontSize="medium"/>);
                break;
            case '1':
                setPTY('비');
                break;
            case '2':
                setPTY('비/눈');
                break;
            case '3':
                setPTY(<AcUnitIcon fontSize="medium"/>);
                break;
            case '4':
                setPTY('소나기');
                break;
            default:
                setSKY('정보 없음')
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
            console.log('전역 위치:',latitude);
            console.log(result);
            PtyToIcon(result.values.PTY);
            setTMP(result.values.TMP);
            SkyToText(result.values.SKY)
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
        <Card sx={{ width: '100%',
            height: '150px',
            mt: 1,
            backgroundImage: `url(${SnowImg})`,
            borderRadius: '20px',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between' }}>
            {loading ? (
                <Box sx={{
                    display: 'flex',
                    flex:2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    mb: 1,
                    ml: 2
                }}>
                    <Typography variant='h5'>
                        날씨 정보 불러오는 중...
                    </Typography>
                </Box>
            ):(
                <>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                            {PTY}
                            <Typography fontSize="large" fontWeight='bold' sx={{ mx: 1, lineHeight:1}}>
                                {SKY}
                            </Typography>
                        </Box>
                    </CardContent>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 ,ml:2}}>
                        <Typography variant='h3'>
                            {TMP}°
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            mb: 1,
                            mr: 2,
                        }}
                    >
                        <LocationOnIcon fontSize="small" />
                        <Typography fontSize="small" fontWeight="bold" sx={{ ml: 0.5 }}>
                            지역이름
                        </Typography>
                    </Box>
                </>
                )}
        </Card>

    );
}
export default Weather;
