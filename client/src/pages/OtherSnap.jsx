
import {Box} from "@mui/material";
import OtherProfile from "../components/OtherProfile.jsx";
import OtherSnaps from "../components/OtherSnaps.jsx";
import {useState} from "react";

const OtherSnap = ()=>{
    const [snapNum, setSnapNum] = useState(0);
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
            }}>
            <OtherProfile snapNum={snapNum}/>
            <OtherSnaps setSnapNum={setSnapNum}/>
        </Box>
    );

};
export default OtherSnap;
