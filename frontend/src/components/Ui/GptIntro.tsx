import { IonIcon } from "@ionic/react";
import { sparkles } from "ionicons/icons";
import { useSettings } from "../../store/store";
import classNames from "classnames";
import useChatLogStore from "../UserInput/store";

export default function GptIntro() {
  const [selectedModel, setModel] = useSettings((state) => [
    state.settings.selectedModal,
    state.setModal,
  ]);
  const setTabs = useChatLogStore((state) => state.setTabs);
  const tabs = useChatLogStore((state) => state.tabs);
  const isGptThreeSelected = tabs.startsWith("sow");
  return (
    <>
      <div className="modals md:w-1/5 md:min-w-[300px] mx-2 relative flex items-center rounded-md justify-between mt-5 md:mx-auto  bg-gray-200 dark:bg-[#202123] gap-2">
        {/* <button
          title="GPT-3 Turbo"
          className={classNames(
            "gpt3 uppercase  rounded-md  font-bold p-2 transition  flex-1 flex items-center  dark:text-white justify-center",
            {
              "bg-white dark:bg-dark-primary border-2 dark:border-white border-gray-700":
                isGptThreeSelected,
              "opacity-50": !isGptThreeSelected,
            }
          )}
          type="button"
          // onClick={() => setModel("gpt-3.5-turbo")}
          onClick={() => {
            // setModel("gpt-3.5-turbo");
            setTabs("sow");
          }}
        >
          <span
            className={classNames(" mr-2 transition", {
              "text-teal-400": isGptThreeSelected,
            })}
          >
            <i className="fa-solid fa-bolt "></i>
          </span>
          <span className="mr-2">SOW</span>
        </button> */}

        {/* <button
          title="GPT - 4"
          className={classNames(
            "gpt4 uppercase rounded p-2 transition  dark:text-white flex-1 flex  items-center justify-center",
            {
              "bg-white dark:bg-dark-primary border-2 dark:border-white border-gray-700":
                !isGptThreeSelected,
              "opacity-50": isGptThreeSelected,
            }
          )}
          // onClick={() => setModel("gpt-4")}
          onClick={() => {
            // setModel("gpt-4");
            setTabs("msa");
          }}
        >
          <span
            className={classNames("mr-2 transition", {
              "text-teal-400": !isGptThreeSelected,
            })}
          >
            <IonIcon icon={sparkles} />
          </span>
          <span className="mr-2">MSA</span>
        </button> */}
      </div>
      <div className=" h-96 flex items-start justify-center">
        <h1 className=" text-4xl font-bold mt-5 text-center text-gray-300">
          Contract Copilot
        </h1>
      </div>
    </>
  );
}
