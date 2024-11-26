import { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Card,
    CardMedia,
    IconButton,
    Typography,
    Fab,
    useMediaQuery,
    Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { getSnapLikedBySnapId, getSnapList, likeFalse, likeTrue } from "../api.jsx";

const categories = ["캐주얼", "스트릿", "빈티지", "모던", "댄디", "스포티", "꾸안꾸", "꾸꾸꾸"];

const SnapList = (props) => {
    const isDesktop = useMediaQuery("(min-width:768px)");
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleLikeToggle = async (e, post) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if (post.isLiked) {
                await likeFalse(post.id);
            } else {
                await likeTrue(post.id);
            }
            getSnapListInfo();
        } catch (err) {
            console.log(err);
        }
    };

    const getSnapListInfo = async () => {
        try {
            const result = await getSnapList();
            const fetchedPosts = await Promise.all(
                result.map(async (snap) => {
                    const likeInfo = await getSnapLikedBySnapId(snap.snapId);
                    return {
                        id: snap.snapId,
                        user: {
                            uid: snap.author.id,
                            name: snap.author.nickname,
                            profileImage: snap.author.profileImageUrl,
                        },
                        image: snap.snapImageUrls[0],
                        createdAt: snap.snapCreatedDate,
                        categories: snap.categories,
                        isLiked: likeInfo.liked,
                    };
                })
            );
            setPosts(fetchedPosts);
            setFilteredPosts(fetchedPosts);
        } catch (err) {
            console.log(err);
        }
    };

    const filterByCategory = (category) => {
        setSelectedCategory(category);
        if (category === "") {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter((post) => post.categories.includes(category)));
        }
    };

    useEffect(() => {
        getSnapListInfo();
    }, []);

    return (
        <Box sx={{ minHeight: "100vh", position: "relative", overflow: "hidden", pb: 7 }}>
            <Box
                sx={{
                    display: "flex",
                    gap: 0.8,
                    p:1,
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    bgcolor: "white",
                }}
            >
                <Chip
                    label="전체"
                    clickable
                    sx={{
                        bgcolor: selectedCategory === "" ? "#9e9ee2" : "default",
                        color: selectedCategory === "" ? "black" : "default",
                    }}
                    onClick={() => filterByCategory("")}
                />
                {categories.map((category) => (
                    <Chip
                        key={category}
                        label={category}
                        clickable
                        sx={{
                            bgcolor: selectedCategory === category ? "#9e9ee2" : "default",
                            color: selectedCategory === category ? "black" : "default",
                        }}
                        onClick={() => filterByCategory(category)}
                    />
                ))}
            </Box>

            {filteredPosts.map((post) => (
                <Card
                    key={post.id}
                    sx={{ position: "relative", mb: 1 }}
                    onClick={() => navigate(`/snap/${post.id}`)}
                >
                    <CardMedia
                        component="img"
                        image={post.image}
                        sx={{ objectFit: "cover", height: "600px" }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            top: 16,
                            left: 16,
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.8)",
                        }}
                    >
                        <Avatar
                            src={post.user.profileImage}
                            alt={post.user.name}
                            sx={{ width: 40, height: 40, marginRight: 1 }}
                            onClick={(e) => {
                                navigate(`/member/${post.user.uid}`);
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        />
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                {post.user.name}
                            </Typography>
                            <Typography variant="caption">
                                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 16,
                            right: 16,
                            display: "flex",
                            gap: 1,
                            color: "white",
                            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.8)",
                        }}
                    >
                        <IconButton
                            sx={{ color: post.isLiked ? "red" : "white" }}
                            onClick={(e) => handleLikeToggle(e, post)}
                        >
                            {post.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </Box>
                </Card>
            ))}

            <Fab
                sx={{
                    position: "fixed",
                    bottom: 80,
                    left: isDesktop ? "calc(50% - 275px)" : 16,
                    bgcolor: "#e6e6fa",
                }}
                onClick={() => props.setShowSnapList(false)}
            >
                <AddIcon />
            </Fab>
        </Box>
    );
};

export default SnapList;
