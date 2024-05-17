import { useState, useEffect } from "react";
import useChatLogStore from "../components/UserInput/store";
import Navbar from "../components/Navbar/Navbar";
import { menuOutline } from "ionicons/icons";
import { IonIcon, setupIonicReact } from "@ionic/react";
import classNames from "classnames";
import PDFViewer from "../components/UserInput/PDFViewer";
import Header from "../components/Header/Header";
import Chats from "../components/Chat/Chats";
import GptIntro from "../components/Ui/GptIntro";
import UserQuery from "../components/UserInput/UserQuery";
import { useTheme } from "../store/store";


setupIonicReact();
const ChatLayout = () => {
  const [active, setActive] = useState(true);
  const chatLogs = useChatLogStore((state: any) => state.chatLogs);
  const isChatsVisible = chatLogs.length > 0
  const rightActive = useChatLogStore((state: any) => state.rightActive);
  const setRightActive = useChatLogStore((state: any) => state.setRightActive);
  const pdfClicked = useChatLogStore((state: any) => state.pdfClicked);
  const setPdfClicked = useChatLogStore((state: any) => state.setPdfClicked);
  const showPDFViewer = useChatLogStore((state: any) => state.showPDFViewer);
  const setShowPDFViewer = useChatLogStore((state: any) => state.setShowPDFViewer);
  const [theme] = useTheme((state) => [state.theme]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (pdfClicked) {
      setRightActive(true);
    } else {
      setRightActive(false);
    }
  }, [pdfClicked]);

  return (
    <div className="App  font-montserrat md:flex ">

      <main
        className={classNames(" w-full transition-all duration-500", {
          "md:ml-[260px]": active,
          "md:mr-[700px]": rightActive,
        })}
      >
      {isChatsVisible ? <Header /> : <GptIntro />}


      {isChatsVisible && <Chats />}
      <div
          className={classNames(
            "fixed left-0 px-2  right-0 transition-all duration-500 bottom-0 dark:shadow-lg py-1 shadow-md backdrop-blur-sm bg-white/10 dark:bg-dark-primary/10",
            {
              "dark:bg-dark-primary bg-white": isChatsVisible,
              "md:ml-[260px]": active,
              "md:mr-[700px]": rightActive,

            }
          )}
        >
      <div className="max-w-2xl md:max-w-[calc(100% - 700px)] mx-auto">
        <div className="dark:bg-inherit">
          <UserQuery />
        </div>
      </div>
      </div>
      </main>
      <div className="flex-grow">
        <div
          className={classNames(
            "navwrap fixed duration-500 top-0 right-0 bottom-0 left-[calc(100vw-700px)] z-30 bg-gray-500 md:bg-opacity-0",
            {
              "bg-opacity-60": showPDFViewer,
              "opacity-0 pointer-events-none": !showPDFViewer,
            }
          )}
        >
          <nav
            className={classNames(
              " absolute right-0 bottom-0 top-0 md:flex-grow-1 w-9/12 md:w-[700px] bg-white text-black z-10 flex flex-col transition duration-500",
              {
                "translate-x-0": showPDFViewer,
                "translate-x-[150%]": !showPDFViewer,
              }
            )}
          >
            {showPDFViewer && (
              <div className="h-full w-full">
                <PDFViewer />
              </div>
            )}
            <div className="account font-bold z-20 border-t ">
              <div className=" self-stretch mr-4 w-full mb-2">
                <button
                  className=" p-2 w-full md:w-auto rounded-md text-left flex-grow flex"
                  onClick={() => {
                    setRightActive(false);
                    setShowPDFViewer(false);
                    setPdfClicked(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="">
        <button
          type="button"
          className="shadow fixed p-2 h-8 w-8 text-sm top-4 left-4 border-2 hidden md:inline-flex dark:text-white text-gray-700 dark:border border-gray-400 rounded-md items-center justify-center"
          onClick={() => setActive(true)}
        >
          <i className="fa-regular fa-window-maximize rotate-90"></i>
        </button>
      </div>
    </div>
  )
}

export default ChatLayout