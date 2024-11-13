import {Box, Typography} from "@mui/material";
import findPColor from '../assets/colorTest/findPColor.png'
import colorTest from '../assets/colorTest/colorTest.png'
const FashionTest = ()=>{
    return(
        <Box sx={{width:'100%',
            height:'100%',
            bgcolor:'#E6E6FA'
        }}>
            <Typography
                variant="h2"
                color="textSecondary"
                sx={{textAlign:'center',
                    mt:2,
                    mb:15}}>
                패션 테스트
            </Typography>
            <Box sx={{
                bgcolor:'#E6E6FA',
                height:'20%',
                borderTopLeftRadius:'100px',
                boxShadow:'-2px -5px 2px rgba(0,0,0,0.1)',
                pt:7,
                pl:5,
                display:'flex',
                flexDirection:'column',
            }}>
                <Typography variant="h5"
                            sx={{fontWeight:'bold'}}>
                    #퍼스널 컬러
                </Typography>
                <Box component="img" src={findPColor} sx={{width:'30%',borderRadius:'16px',mt:1}}/>
                <Typography variant="h5"
                            sx={{fontWeight:'bold',mt:2}}>
                    #패션 심리 테스트
                </Typography>
                <Box component="img" src={colorTest} sx={{width:'30%',borderRadius:'16px',mt:1}}/>
            </Box>
        </Box>
    );
}
export default FashionTest;
