import classNames from "classnames";
import { motion } from "framer-motion"
import Avatar from "../Avatar/Avatar";
import { SyncLoader } from "react-spinners";
import useChatLogStore from "./store";
import JourneyButtonsForExtractData from "./JourneyButtonsForExtractData";

const UserMessage = ({
    answer,
    contractType,
    journeysObj,
    handleClick,



}: any) => {
    const tabs = useChatLogStore((state) => state.tabs);
    return (
        <div className={classNames("py-4 px-2 md:px-0")}>
            <div className=" max-w-2xl mx-auto md:flex md:items-center group">
                <div className="flex items-start w-full max-w-[620px]">
                    <div className="mr-4 rounded-md flex items-center flex-shrink-0">
                        <Avatar className=" h-11 w-11" />
                    </div>
                    {/* {loading &&
              <div className=" self-center">
                <SyncLoader color="gray" size={8} speedMultiplier={0.5} />
              </div>
            } */}



                    <p
                        className={classNames(
                            " text-white overflow-x-auto"
                        )}
                    >
                        {answer ? answer : null}
                    </p>
                    {tabs === "sow" && journeysObj && contractType && handleClick && (
                        <JourneyButtonsForExtractData
                            contractType={contractType}
                            journeysObj={journeysObj}
                            handleClick={handleClick}


                        />
                    )}
                    {/* {journeyName === "extract-clause" && contractType && journeysObj && handleClick && (
              <JourneyButtonsForExtractClause
                contractType={contractType}
                journeysObj={journeysObj["extract-clause"]}
                handleClick={handleClick}
              />
            )} */}
                </div>
                <div className=" md:invisible group-hover:visible text-right">
                    <button
                        className="edit md:ml-8 dark:text-gray-200 text-gray-500 text-xl "
                    // onClick={() => setEdit((prev) => !prev)}
                    >
                        {/* <IonIcon icon={createOutline} /> */}
                    </button>
                </div>
            </div>
        </div >
    );
};

export default UserMessage;