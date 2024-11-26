
import SnapList from "../components/SnapList.jsx"
import AddSnap from "../components/AddSnap.jsx";
import {useState} from "react";
const Snap = () => {
    const [showSnapList, setShowSnapList] = useState(true);
    return (
        <>
            {showSnapList ?
                <SnapList setShowSnapList={setShowSnapList} /> : <AddSnap setShowSnapList={setShowSnapList}/>}
        </>

    );
};

export default Snap;
