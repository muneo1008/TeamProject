import {Avatar, Box, Button, Typography} from "@mui/material";
import Typewriter from 'typewriter-effect';
import {savePersonalColor} from "../api.jsx";
import {useSelector} from "react-redux";

const PersonalColorResult = (props) => {
    const user = useSelector((state) => state.user);
    const handleSavePersonalColor = async () => {
        try {
            const result = await savePersonalColor(props.personalColor);
            console.log(result);
        }catch (err){
            console.log(err);
        }
    }

    const personalColorDetails = {
        "봄 라이트": {
            "description": "피부도 밝고 눈동자 색도 밝은 브라운 컬러로 대비감이 약한 편입니다. 밝은 색의 메이크업과 헤어 컬러를 선택하세요.",
            "tips": [
                "주요 컬러: 연한 파스텔 톤, 부드러운 핑크, 라벤더, 민트",
                "포인트 컬러: 밝은 오렌지, 연두색",
                "재질 및 악세서리: 부드럽고 가벼운 면, 니트, 화이트나 실버톤 악세서리"
            ]
        },
        "봄 클리어": {
            "description": "피부도 밝지만 눈동자가 어두운 갈색이나 검정빛을 띄고 있어 대비감이 강합니다. 비비드한 색상과 과감한 배색으로 스타일링하세요.",
            "tips": [
                "주요 컬러: 선명한 블루, 아이보리, 민트",
                "포인트 컬러: 밝은 핑크, 라임",
                "재질 및 악세서리: 고급스러운 실크, 리넨, 메탈 악세서리"
            ]
        },
        "봄 스트롱": {
            "description": "강렬한 원색이 잘 어울리는 타입으로 진한 순색 상의와 어두운 하의를 매치하여 생동감 있게 스타일링하세요.",
            "tips": [
                "주요 컬러: 화사한 레드, 코랄, 선명한 옐로우",
                "포인트 컬러: 네온 색상, 핫핑크",
                "재질 및 악세서리: 가벼운 울, 트위드 소재, 금속 악세서리"
            ]
        },
        "여름 라이트": {
            "description": "밝고 창백한 피부를 가지고 있으며 색을 많이 쓰기보다는 연한 색상으로 덜어내는 것이 포인트입니다.",
            "tips": [
                "주요 컬러: 부드러운 파스텔 블루, 베이지, 라이트 핑크",
                "포인트 컬러: 라벤더, 아이보리",
                "재질 및 악세서리: 시원한 리넨, 면 소재, 실버나 화이트 악세서리"
            ]
        },
        "여름 클리어": {
            "description": "창백한 피부와 까만 눈동자로 대비감이 강합니다. 밝은 쿨톤 색상과 과감한 배색으로 생동감 있는 스타일링을 연출하세요.",
            "tips": [
                "주요 컬러: 차가운 톤의 블루, 청록색, 실버",
                "포인트 컬러: 민트, 연보라",
                "재질 및 악세서리: 시원하고 깨끗한 실크, 메탈 악세서리"
            ]
        },
        "여름 뮤트": {
            "description": "장밋빛의 잿빛 피부를 가진 뮤트톤으로 은은하고 부드러운 스타일링이 잘 어울립니다.",
            "tips": [
                "주요 컬러: 차분한 회색, 소프트 블루, 먼지 낀 핑크",
                "포인트 컬러: 딥그린, 차콜",
                "재질 및 악세서리: 매트한 소재, 크레이프, 우드 악세서리"
            ]
        },
        "가을 뮤트": {
            "description": "골드빛 피부와 갈색 눈동자로 부드럽고 우아한 느낌을 주는 색상이 잘 어울립니다.",
            "tips": [
                "주요 컬러: 따뜻한 오렌지, 베이지, 브라운",
                "포인트 컬러: 딥그린, 골드",
                "재질 및 악세서리: 울, 캐시미어, 가죽 악세서리"
            ]
        },
        "가을 딥": {
            "description": "건강한 태닝 느낌의 피부와 웜톤 진한 색상이 잘 어울리며 고상한 스타일을 연출할 수 있습니다.",
            "tips": [
                "주요 컬러: 딥 레드, 와인, 다크 그린",
                "포인트 컬러: 머스터드, 카키",
                "재질 및 악세서리: 두꺼운 니트, 트위드, 골드 악세서리"
            ]
        },
        "가을 다크": {
            "description": "남성에게 주로 보이는 타입으로 어두운 톤과 상하의 톤차이가 적은 스타일이 적합합니다.",
            "tips": [
                "주요 컬러: 다크 초콜릿, 브론즈, 차콜 그레이",
                "포인트 컬러: 올리브, 벽돌색",
                "재질 및 악세서리: 두꺼운 울, 가죽, 골드나 브론즈 악세서리"
            ]
        },
        "겨울 스트롱": {
            "description": "올리브톤 피부와 강한 대비감을 가진 타입으로 선명한 색상과 단순한 스타일링이 잘 어울립니다.",
            "tips": [
                "주요 컬러: 블랙, 화이트, 레드",
                "포인트 컬러: 네이비, 진한 보라",
                "재질 및 악세서리: 울, 가죽, 실버 악세서리"
            ]
        },
        "겨울 딥": {
            "description": "까맣고 고급스러운 느낌의 스타일을 선호하며 무게감 있는 색상을 사용하여 깔끔한 룩을 연출하세요.",
            "tips": [
                "주요 컬러: 딥 블랙, 차콜, 다크 블루",
                "포인트 컬러: 보라, 숯색",
                "재질 및 악세서리: 가죽, 코듀로이, 은색이나 흰색 악세서리"
            ]
        },
        "겨울 다크": {
            "description": "어두운 노란빛 피부와 검정 눈동자로 톤 차이가 적은 어두운 색상을 사용하는 것이 좋습니다.",
            "tips": [
                "주요 컬러: 딥 네이비, 다크 그레이, 다크 레드",
                "포인트 컬러: 에메랄드, 골드",
                "재질 및 악세서리: 울, 캐시미어, 메탈릭 악세서리"
            ]
        }
    };
    const currentDetails = personalColorDetails[props.personalColor] || {};
    return(
        <Box
            sx={{
                width: '100%',
                minHeight: '87vh',
                bgcolor: '#E6E6FA',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: 2,

            }}
        >
            <Typography variant="h4" sx={{ mb: 3 }}>
                퍼스널 컬러 진단 결과
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <Avatar
                    src={user.profileImgUrl}
                    sx={{ width: 200, height: 200, mb: 1 }}
                />
                <Typography variant="h6">{user.nickname}님의</Typography>
            </Box>
            <Typography variant="h6">
                <Typewriter
                    options={{
                        strings: [`퍼스널 컬러는 <strong>${props.personalColor}</strong>입니다!`],
                        autoStart: true,
                        loop: false,
                        deleteSpeed: Infinity,
                        delay: 80,
                    }}
                />
            </Typography>
            <Box sx={{ textAlign: 'center', mt: 2, mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>{props.personalColor}</strong> 컬러는 당신의 피부 톤을 돋보이게 하고, 자신감 넘치는 외모를 연출할 수 있는 색상입니다.
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                    {currentDetails.description || "해당 퍼스널 컬러에 대한 설명을 준비 중입니다."}
                </Typography>
                {currentDetails.tips && (
                    <Box>
                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                            코디 Tip
                        </Typography>
                        {currentDetails.tips.map((tip, index) => (
                            <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                                - {tip}
                            </Typography>
                        ))}
                    </Box>
                )}
            </Box>
            <Button
                variant="contained"
                onClick={() => {
                    props.setPersonalColor(null);
                    props.setImage(null);
                }}
                sx={{ mb: 1 }}
            >
                다시 진단하기
            </Button>
            <Button
                variant="contained"
                onClick={handleSavePersonalColor}
            >
                나의 퍼스널컬러로 지정하기
            </Button>
        </Box>
    );

}
export default PersonalColorResult;
