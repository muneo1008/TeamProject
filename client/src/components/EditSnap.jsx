import { useState, useEffect } from "react";
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
import axios from "axios";

const EditSnap = (props) => {

    const categories = ["캐주얼", "스트릿", "빈티지", "모던", "댄디", "스포티", "꾸안꾸", "꾸꾸꾸"]; // 카테고리 목록

    // 상태 관리
    const [existingImages, setExistingImages] = useState([]); // 기존 이미지 (URL 형태)
    const [newImages, setNewImages] = useState([]); // 새로 추가된 이미지 (File 형태)
    const [removedImageUrls, setremovedImageUrls] = useState([]); // 삭제된 기존 이미지의 URL
    const [description, setDescription] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);

    // 초기 데이터 로드
    useEffect(() => {
        if (props.post) {
            setDescription(props.post.description || "");
            setSelectedCategories(props.post.categories || []);
            setExistingImages(props.post.images || []); // 기존 이미지 URL
        }
    }, [props.post]);

    // 카테고리 선택 처리
    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCategories((prev) =>
            checked ? [...prev, value] : prev.filter((category) => category !== value)
        );
    };

    // 이미지 업로드 처리
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length + existingImages.length + newImages.length > 5) {
            alert("최대 5장까지만 업로드할 수 있습니다.");
            return;
        }
        setNewImages((prevImages) => [...prevImages, ...files]);
    };

    // 이미지 제거
    const handleImageRemove = (index, isExisting) => {
        if (isExisting) {
            const imageToRemove = existingImages[index];
            setremovedImageUrls((prev) => [...prev, imageToRemove]); // 삭제된 기존 이미지 URL 추가
            setExistingImages((prev) => prev.filter((_, i) => i !== index));
        } else {
            setNewImages((prev) => prev.filter((_, i) => i !== index));
        }
    };

    // 데이터 제출
    const handleSubmit = async () => {
        if (!description || (existingImages.length + newImages.length) === 0 || selectedCategories.length === 0) {
            alert("이미지, 설명, 카테고리를 모두 입력해주세요.");
            return;
        }

        try {
            const formData = new FormData();
            // 새로 추가된 이미지 (File 형태)
            newImages.forEach((image) => formData.append("newImages", image));
            // 텍스트 데이터
            formData.append("description", description);
            formData.append("categories", selectedCategories);
            formData.append("removedImageUrls", removedImageUrls); // 삭제된 기존 이미지 URL

            // PUT 요청
            const response = await axios.put(
                `http://localhost:8080/api/snaps/${props.post.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                console.log("수정 성공:", response.data);
                alert("스냅이 성공적으로 수정되었습니다!");
                props.setEdit(false);
            } else {
                console.error("수정 실패:", response);
                alert("수정 중 문제가 발생했습니다.");
            }
        } catch (error) {
            console.error("수정 오류:", error);
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
                {/* 기존 이미지 */}
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {existingImages.map((url, index) => (
                        <Box
                            key={`existing-${index}`}
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
                                src={url}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                            <IconButton
                                onClick={() => handleImageRemove(index, true)}
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
                </Stack>

                {/* 새로 추가된 이미지 */}
                <Stack direction="row" spacing={1} flexWrap="wrap" mt={2}>
                    {newImages.map((file, index) => (
                        <Box
                            key={`new-${index}`}
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
                                src={URL.createObjectURL(file)}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                            <IconButton
                                onClick={() => handleImageRemove(index, false)}
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
                </Stack>

                {/* 이미지 업로드 버튼 */}
                <Box
                    sx={{
                        mt: 2,
                        textAlign: "center",
                        cursor: "pointer",
                        backgroundColor: "#f0f0f0",
                        p: 2,
                        borderRadius: 1,
                    }}
                    onClick={() => document.getElementById("file-upload").click()}
                >
                    <Typography>+ 이미지 추가</Typography>
                </Box>
                <input
                    id="file-upload"
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                />
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

            {/* 수정 버튼 */}
            <Box
                sx={{
                    mt: 3,
                    width: "100%",
                    maxWidth: 600,
                    textAlign: "center",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "#000000",
                        color: "white",
                        width: "100%",
                        borderRadius: 1,
                        textAlign: "center",
                        padding: 1,
                        cursor: "pointer",
                        "&:hover": {
                            backgroundColor: "#333333",
                        },
                    }}
                    onClick={handleSubmit}
                >
                    <Typography fontWeight="700" variant="button">
                        게시물 수정하기
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default EditSnap;
