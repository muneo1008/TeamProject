import {Box, Card, CardContent, Typography,} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SnowImg from '../assets/weatherImg/snow.png';
const Weather = () =>{


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
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                    <AcUnitIcon fontSize='medium'/>
                    <Typography fontSize="large" fontWeight='bold' sx={{ mx: 1, lineHeight:1}}>
                         눈 내림
                    </Typography>
                </Box>
            </CardContent>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 ,ml:2}}>
                <Typography variant='h3'>
                    18°
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
        </Card>

    );
}
export default Weather;
