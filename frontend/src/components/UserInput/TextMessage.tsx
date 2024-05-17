import classNames from "classnames";
import { motion } from "framer-motion"
import Avatar from "../Avatar/Avatar";
import { SyncLoader } from "react-spinners";
import useChatLogStore from "./store";
import Markdown from "react-markdown";
import CodeHighlight from "../CodeHighlight/CodeHighlight";
import PDFTable from "./PDFTable";

const TextMessage = ({ answer, referenceDocuments, cursorRef }: any) => {
  const variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };
  const loading = useChatLogStore((state) => state.loading);
  return (
    <>
      <div
        className={classNames("py-4 bg-gray-100 dark:bg-[#40414f] px-2 md:px-0")}
      >
        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          className=" max-w-2xl mx-auto md:flex md:items-center group"
        >

          <div className="flex items-start w-full">
            <div className="mr-4  rounded-md flex items-center flex-shrink-0">
              <Avatar className=" h-11 w-11" src="/imgs/bot.webp" />
            </div>

            {loading ? (
              <div className=" self-center">
                <SyncLoader color="gray" size={8} speedMultiplier={0.5} />
              </div>
            ) : (
              <div
                className={classNames(
                  "  animate-preulse overflow-x-hidden whitespace-pre-wrap text-white",
                  // { "text-red-500": error, "dark:text-gray-300": !error }
                )}
              >

                <Markdown
                  children={answer}
                  components={{
                    code(props) {
                      const { children, className, node, ...rest } = props;
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <CodeHighlight language={match[1]}>
                          {String(children).replace(/\n$/, "")}
                        </CodeHighlight>
                      ) : (
                        <code {...rest} className={className?.concat("language")}>
                          {children}
                        </code>
                      );
                    },
                  }}
                />

                {/* {msa && <Table msa={msa} />} */}
                {/* {referenceDocuments && <PDFTable referenceDocuments={referenceDocuments} />} */}


                {!loading && !answer && (
                  <span
                    className="ml-1 blink bg-gray-500 dark:bg-gray-200 h-4 w-1 inline-block"
                    ref={cursorRef}
                  ></span>
                )}
              </div>
            )}
          </div>
          <div className="mt-2 md:mt-0  text-right self-start">
          </div>
        </motion.div>

      </div>
    </>

  );
}
export default TextMessage;