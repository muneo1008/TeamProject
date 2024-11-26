import { useState } from "react";
import {
    Box,
    IconButton,
    Stack,
    CardMedia,
    TextField,
    useMediaQuery,
    Typography,
    Checkbox,
    FormGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const AddSnap = (props) => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const isDesktop = useMediaQuery("(min-width:768px)");
    const user = useSelector((state) => state.user);

    const categories = ["캐주얼", "스트릿", "빈티지", "모던", "댄디", "스포티", "꾸안꾸", "꾸꾸꾸"]; // 카테고리 목록

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCategories((prev) =>
            checked ? [...prev, value] : prev.filter((category) => category !== value)
        );
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length + images.length > 5) {
            alert("최대 5장까지만 업로드할 수 있습니다.");
            return;
        }
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleImageRemove = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleSubmit = async () => {
        if (!description || images.length === 0 || selectedCategories.length === 0) {
            alert("이미지, 설명, 카테고리를 모두 입력해주세요.");
            return;
        }
        try {
            const formData = new FormData();
            images.forEach((image) => formData.append("images", image));
            formData.append("description", description);
            formData.append("memberId", user.memberId);
            formData.append("categories", JSON.stringify(selectedCategories));

            const response = await axios.post(
                "http://localhost:8080/api/snaps/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                console.log("업로드 성공:", response.data);
                alert("스냅이 성공적으로 업로드되었습니다!");
                props.setShowSnapList(true);
            } else {
                console.error("업로드 실패:", response);
                alert("업로드 중 문제가 발생했습니다.");
            }
        } catch (error) {
            console.error("업로드 오류:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "background.default",
                p: 3,
                mb: 9,
                gap: 2,
            }}
        >
            {/* 헤더 */}
            <IconButton onClick={() => props.setShowSnapList(true)} sx={{ alignSelf: "flex-start" }}>
                <ArrowBackIcon />
            </IconButton>

            {/* 이미지 미리보기 */}
            <Box sx={{ width: "100%", maxWidth: 600 }}>
                {/* 대표 이미지 */}
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: images[0] ? "auto" : 300,
                        mb: 2,
                        borderRadius: 2,
                        backgroundColor: images[0] ? "transparent" : "#e0e0e0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        cursor: images[0] ? "default" : "pointer",
                    }}
                    onClick={() => !images[0] && document.getElementById("file-upload").click()}
                >
                    {images[0] ? (
                        <>
                            <CardMedia
                                component="img"
                                src={URL.createObjectURL(images[0])}
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "cover",
                                }}
                            />
                            <IconButton
                                onClick={() => handleImageRemove(0)}
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    bgcolor: "rgba(0, 0, 0, 0.5)",
                                    color: "white",
                                    "&:hover": { bgcolor: "red" },
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </>
                    ) : (
                        <div style={{ color: "#aaa", fontSize: 30 }}>+</div>
                    )}
                    <input
                        id="file-upload"
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </Box>

                {/* 나머지 이미지 */}
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {images.slice(1).map((image, index) => (
                        <Box
                            key={index + 1}
                            sx={{
                                position: "relative",
                                width: 80,
                                height: 80,
                                backgroundColor: "#e0e0e0",
                                borderRadius: 1,
                                overflow: "hidden",
                                cursor: "pointer",
                            }}
                        >
                            <CardMedia
                                component="img"
                                src={URL.createObjectURL(image)}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                            <IconButton
                                onClick={() => handleImageRemove(index + 1)}
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: 4,
                                    right: 4,
                                    bgcolor: "rgba(0, 0, 0, 0.5)",
                                    color: "white",
                                    "&:hover": { bgcolor: "red" },
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}

                    {/* 이미지 추가 아이콘 */}
                    {images.length < 5 && (
                        <Box
                            onClick={() => document.getElementById("file-upload").click()}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#E6E6FA",
                                height: 80,
                                width: 80,
                                borderRadius: "4px",
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "#D1C4E9",
                                },
                            }}
                        >
                            <AddPhotoAlternateIcon sx={{ fontSize: 60 }} />
                        </Box>
                    )}
                </Stack>
            </Box>

            {/* 설명 입력 및 카테고리 선택 */}
            <Stack sx={{ width: "100%", maxWidth: 600 }} spacing={3}>
                {/* 설명 입력 */}
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="설명"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* 카테고리 선택 */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">카테고리 선택</FormLabel>
                    <FormGroup row>
                        {categories.map((category) => (
                            <FormControlLabel
                                key={category}
                                control={
                                    <Checkbox
                                        value={category}
                                        checked={selectedCategories.includes(category)}
                                        onChange={handleCategoryChange}
                                    />
                                }
                                label={category}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            </Stack>

            {/* 업로드 버튼 */}
            <Box
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: isDesktop ? "600px" : "100%",
                    backgroundColor: "#ffffff",
                    padding: "15px 0",
                    textAlign: "center",
                    boxShadow: 3,
                    cursor: "pointer",
                    zIndex: 2000,
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "#E6E6FA",
                        padding: "12px 200px",
                        borderRadius: 2,
                        display: "inline-block",
                        "&:hover": {
                            backgroundColor: "#D1C4E9",
                        },
                    }}
                    onClick={handleSubmit}
                >
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000", fontSize: "18px" }}>
                        업로드
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AddSnap;
