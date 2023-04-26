import { useContext } from "react";
import DisplayManagerContext from "../context/DisplayManagerProvider";

const useDisplayManger = () => {
    return (useContext(DisplayManagerContext))
};
export default useDisplayManger;