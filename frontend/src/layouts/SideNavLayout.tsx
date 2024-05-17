import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import classnames from "classnames";
import useChatLogStore from "../components/UserInput/store";
import PDFViewer from "../components/UserInput/PDFViewer";
import { IonIcon, setupIonicReact } from "@ionic/react";
import { closeOutline, } from "ionicons/icons";


export default function SideNavLayout() {
    const [active, setActive] = useState(true);

    return (
        <>

            <Navbar active={active} setActive={setActive} />
            <button
                type="button"
                className="shadow fixed p-2 h-8 w-8 text-sm top-4 left-4 border-2 sm:inline-flex dark:text-white text-gray-700 dark:border border-gray-400 rounded-md items-center justify-center"
                onClick={() => setActive(true)}
            >
                <i className="fa-regular fa-window-maximize rotate-90"></i>
            </button>



        </>
    );
}