import classnames from "classnames";
import { IonIcon } from "@ionic/react";
import { closeOutline, } from "ionicons/icons";
import { Link } from "react-router-dom";


export default function Navbar({
  active,
  setActive,
}: {
  active: boolean;
  setActive: (v: boolean) => void;
}) {



  return (
    <>
      <div
        className={classnames(
          "navwrap fixed duration-500 top-0 left-0 bottom-0 right-0 md:right-[calc(100vw-260px)] z-30 bg-gray-500 md:bg-opacity-0 ",
          { "bg-opacity-60 ": active, "opacity-0 pointer-events-none": !active }
        )}
      >
        <nav
          className={classnames(
            " absolute left-0 bottom-0 top-0  md:flex-grow-1 w-9/12 md:w-[260px] bg-[#202123] text-white z-10 flex flex-col transition duration-500",
            { "translate-x-0": active, "-translate-x-[150%]": !active }
          )}
        >
          <div className="flex mb-2  items-center justify-between gap-2 p-2">

            <button
              type="button"
              className="border h-10 w-10 border-gray-500 rounded-md p-2 hidden md:inline-block text-gray-200"
              onClick={() => setActive(false)}
            >
              <i className="fa-regular fa-window-maximize rotate-90"></i>
            </button>
          </div>
          <nav>
            <ul>
              <li key={'chat'}>
                <Link to='/chat'>Chat</Link>
              </li>
              <li key='prompt'>
                <Link to='/prompt'>Prompt</Link>
              </li>
              <li key='upload'>
                <Link to='/upload'>Upload</Link>
              </li>
            </ul>

          </nav>

          <button
            type="button"
            onClick={() => setActive(false)}
            className="close md:hidden absolute top-2 h-10 w-10 border-2 -right-10  p-2 flex items-center justify-center"
          >
            <span className=" text-2xl flex">
              <IonIcon icon={closeOutline} />
            </span>
          </button>
        </nav>
      </div>

    </>
  );
}
