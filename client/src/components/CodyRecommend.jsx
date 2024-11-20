import {Box, Card, CardContent, CardMedia, Chip, CircularProgress, IconButton, Typography} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import {useSelector} from "react-redux";
import {getCodyImg, getCodyRecommend} from "../api.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
const CodyRecommend = (props) => {
    const user = useSelector(state => state.user);
    const [recommendText, setRecommendText] = useState();
    const [recommendCategory, setRecommendCategory] = useState([]);
    const [weathertLoading, setWeathertLoading] = useState(true);
    const [CodyImgLoading, setCodyImgLoading] = useState(true);
    const [outfitRecommendation, setOutfitRecommendation] = useState(null);
    const getCody = async ()=>{
        try {
            const result = await getCodyRecommend(
                user.age,
                "남성",
                props.WeatherData.TMP,
                props.WeatherData.SKY,
                props.WeatherData.TMX,
                props.WeatherData.TMN,
                props.WeatherData.PTY
                );
            console.log("추천 내용: ",result);
            setRecommendText(result.weatherComment);
            setRecommendCategory(Object.entries(result.outfitRecommendation));

            const transformedRecommendation = {};
            Object.keys(result.outfitRecommendation).forEach((category) => {
                transformedRecommendation[category] = {
                    item: result.outfitRecommendation[category],
                    imageUrls: []
                };
            });
            setOutfitRecommendation(transformedRecommendation);
            await Promise.all(Object.keys(transformedRecommendation).map(category =>
                fetchImagesForCategory(category, transformedRecommendation[category].item)
            ));
            setWeathertLoading(false);
        }catch(error){
            console.log(error);
        }
    }
    const fetchImagesForCategory = async (category, item) => {
        if (!item) {
            console.warn(`No item found for category: ${category}`);
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/crawling`, {
                category,
                item,
                gender: "남성",
            },{withCredentials:true});
            console.log("Crawling API Response:", response.data);
            setOutfitRecommendation(prevRecommendation => ({
                ...prevRecommendation,
                [category]: {
                    ...prevRecommendation[category],
                    imageUrls: response.data.imageUrls || []
                }
            }));
            setCodyImgLoading(false);
        } catch (error) {
            console.error(`Error fetching images for ${category}:`, error);
        }
    };

    useEffect(() => {
        getCody();
    }, [props.WeatherData]);

    return (
        <>
            <Card
                sx={{
                    width: '95%',
                    height: '125px',
                    mt: 1,
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#e6e6fa',
                    position: 'relative',
                }}
            >
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography fontSize="large" fontWeight="bold" sx={{ lineHeight: 1, mb: 1 }}>
                            날씨 TIP
                        </Typography>
                        {weathertLoading ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                    textAlign: "center",
                                }}
                            >
                                <CircularProgress color="primary" sx={{ mb: 2 }} />
                            </Box>
                        ) : (
                            <Typography variant="body2">{recommendText}</Typography>
                        )}
                    </Box>

                </CardContent>
                <IconButton
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                    }}
                    onClick={()=>getCody()}
                >
                    <RefreshIcon />
                </IconButton>
            </Card>
            <Box
                sx={{
                    width: '95%',
                    maxWidth:'100%',
                    display: 'flex',
                    flexDirection: 'row',
                    overflowX: 'auto',
                    gap: 1,
                    mt: 1,
                    pb: 1,
                    '&::-webkit-scrollbar': {
                        height: '8px',
                        display: 'block',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '4px',
                    },
                }}
            >
                {recommendCategory.map(([category, item], index) => (
                    <Chip
                        key={index}
                        label={`#${item}`}
                        sx={{ fontSize: "15px", margin: "4px" }}
                    />
                ))}
            </Box>

            <Box sx={{ pl: 2,pr:2 ,maxWidth:'600px', mb:8}}>
                <Typography variant="h4" sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}>
                    오늘의 옷 추천
                </Typography>
                {CodyImgLoading ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "200px",
                        }}
                    >
                        <CircularProgress color="primary" />
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            고민 중입니다!
                        </Typography>
                    </Box>
                ) : (
                    outfitRecommendation &&
                    ["상의", "하의", "아우터", "신발"].map((category) => {
                        const details = outfitRecommendation[category];
                        if (!details) return null;

                        return (
                            <Box key={category} sx={{ mb: 4 }}>
                                {/* 카테고리 제목 */}
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                                    {category}
                                </Typography>
                                {/* 추천 아이템 */}
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    <strong>추천 아이템:</strong> {details.item}
                                </Typography>
                                {/* 이미지 갤러리 */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        overflowX: "auto",
                                    }}
                                >
                                    {details.imageUrls &&
                                        details.imageUrls.map((url, index) => (
                                            <Card
                                                key={index}
                                                sx={{
                                                    minWidth: 120,
                                                    borderRadius: 2,
                                                    flexShrink: 0,
                                                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={url}
                                                    alt={`${category} 이미지 ${index + 1}`}
                                                    sx={{ height: 120, objectFit: "cover" }}
                                                />
                                            </Card>
                                        ))}
                                </Box>
                            </Box>
                        );
                    })
                )}
            </Box>
        </>


    );
};

export default CodyRecommend
