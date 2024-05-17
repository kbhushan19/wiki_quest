import { IonIcon } from "@ionic/react";
import classNames from "classnames";
import { sendOutline, send } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { ContractCopilotServices } from "../../services/contractService";
import useChatStore from "./store";
import Avatar from "../Avatar/Avatar";
import { SyncLoader } from "react-spinners";
import Markdown from "react-markdown";
import CodeHighlight from "../CodeHighlight/CodeHighlight";
import { useDebouncedCallback } from "use-debounce";
import { motion } from "framer-motion";
import Modal from '@mui/material/Modal';
import MSATable from "./MSATable";
import SOWTableView from "./SOWTableView";
import UserMessage from "./UserMessage";
import TextMessage from "./TextMessage";
const variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

export default function UserQuery() {
  const { addChatLog } = useChatStore();
  const formRef = useRef<null | HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showModal, setShowModal]: any = useState(false);
  const [files, setFiles]: any = useState([]);
  const [loading, setLoading] = useState(false)
  const chatLogs = useChatStore((state: any) => state.chatLogs);
  const query = useChatStore((state: any) => state.query);
  const setQuery = useChatStore((state: any) => state.setQuery);
  const journeyName = useChatStore((state: any) => state.journeyName);
  const cursorRef = useRef<HTMLDivElement>(null);
  const chatsRef = useRef(chatLogs);
  const tabs = useChatStore((state: any) => state.tabs);
  const loaderForSOW = useChatStore((state: any) => state.loaderForSOW);
  const setLoaderForSOW = useChatStore((state: any) => state.setLoaderForSOW);
  const loaderForMSA = useChatStore((state: any) => state.loaderForMSA);
  const setLoaderForMSA = useChatStore((state: any) => state.setLoaderForMSA);
  const loaderForGenerateAnswer = useChatStore((state: any) => state.loaderForGenerateAnswer);
  const setLoaderForGenerateAnswer = useChatStore((state: any) => state.setLoaderForGenerateAnswer);

  chatsRef.current = chatLogs;
  const scrollToBottom = useDebouncedCallback(() => {
    if (!cursorRef.current) return;
    cursorRef.current.scrollIntoView(true);
  }, 50);
  function handleOnKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (formRef.current) {
        formRef.current.requestSubmit();
        target.style.height = "30px";
      }
    }
  }

  useEffect(() => {
    callDeleteEntry();
  }, []);

  const callDeleteEntry = async () => {
    const formData = new FormData();
    formData.append('email_id', 'nishant.shrivastav@in.ey.com');
    const res = await ContractCopilotServices.deleteEntryResponse(formData);

  }
  const JourneyButtonsForExtractClause = ({ contractType, journeysObj, handleClick }: any) => {

    const renderButtons = (obj: any) => {
      <p>Please tell me what you would like to extract from this document. This seems like a {contractType}. Here are a few question people usually ask from these, however you can ask me anything from this document.`;
      </p>
      return Object.entries(obj).map(([key, value]: any) => (
        <div className="flex gap-5" key={key}>
          {value.btns.map((btn: any) => {

            return (
              <div>
                
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" key={btn.name} onClick={() => handleClick(btn.value)}>
                  {btn.name}
                </button>
              </div>
            )
          }
          )}
        </div>
      ));
    };

    return <div>{renderButtons(journeysObj)}</div>;
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleFileInput = (e: any) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  function handleOnInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;
    setQuery(target.value);
    target.style.height = "0px";
    target.style.height = `${target.scrollHeight}px`;
  }


  const handleCancel = () => {
    setShowModal(false);
    setFiles([]);
  };

  const handleRemoveFile = (index: any) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  // const handleUpload = async () => {
  //   setShowModal(false);
  //   addChatLog({ type: 'user', message: <UserMessage answer={files[0].name} /> })
  //   // Implement your file upload logic here

  //   const formData = new FormData();
  //   formData.append('email_id', 'nishant.shrivastav@in.ey.com');
  //   formData.append('files', files[0]);
  //   setLoading(false)
  //   if (journeyName === "validate-contract" && files.length > 0) {
  //     const res = await ContractCopilotServices.generateFetchValidateContractResponse(formData);
  //     if (res.status === "Success") {
  //       const responseHit = await ContractCopilotServices.getFetchValidateContractResponse({ requestid: res.data })
  //       console.log(responseHit)
  //       // addChatLog({ type: 'assistant', message: <TextMessage answer={res.answer} referenceDocuments={res?.reference_documents} /> })
  //       setLoading(false)
  //       scrollToBottom();
  //       setQuery('')
  //     }
  //     else if (res.status === "Failed") {
  //       setLoading(false)
  //       const text = `We're experiencing exceptionally high demand. Please try again later.`
  //       setError(true)
  //       addChatLog({ type: 'assistant', message: <TextMessage answer={text} /> })
  //     }
  //   } else {


  //     const res = await ContractCopilotServices.generateFilesResponse(formData);
  //     if (res.status === 'Success') {
  //       const journeysObj = {
  //         "extract-data": {
  //           btns: [
  //             { name: 'Effective Date', value: 'What is the Effective Date of the Contract?' },
  //             { name: 'Duration of Contract', value: 'What is the duration of the contract?' },
  //             { name: 'All Relevant Fields', value: 'All Relevant Fields?' }
  //           ]
  //         },
  //         "extract-clause": {
  //           btns: [
  //             { name: 'Anti-bribery', value: 'Can you explain the anti-bribery policy outlined in the agreement? if there are references made to other sections or requirements in contract, include the information from those reference and formulate answer.?' },
  //             { name: 'Indemnity', value: 'What are the criterias of Indemnity applicability?' },
  //             { name: 'Specific clauses of Interest', value: 'Specific clauses of Interest?' }
  //           ]
  //         },
  //         "validate-contract": {
  //           btns: [
  //             { name: 'Validate Contract', value: 'Validate Contract?' },
  //           ]
  //         }
  //       }
  //       addChatLog({ type: 'user', message: <UserMessage contractType={res.contract_type} journeysObj={journeysObj} handleClick={(value: any) => setQuery(value)} /> })

  //       scrollToBottom();
  //       setError(false)

  //     }
  //     else if (res.status === 'Failed') {
  //       setLoading(false)
  //     }
  //   }
  //   // After successful upload, you can close the modal
  //   setShowModal(false);
  //   setFiles([]);
  // };


  const handleUpload = async () => {
    setShowModal(false);
    addChatLog({ type: 'user', message: <UserMessage answer={files[0].name} /> });
    const formData = new FormData();
    formData.append('email_id', 'nishant.shrivastav@in.ey.com');
    formData.append('files', files[0]);
    let filesResponse = await ContractCopilotServices.generateFilesResponse(formData);
    console.log("file Response", filesResponse)
    let contractType = filesResponse.contract_type
    if (contractType === "Master Services Agreement") {
      if (filesResponse.status === 'Success') {
        const journeysObj = {
          "extract-data": {
            btns: [
              { name: 'Effective Date', value: 'What is the Effective Date of the Contract?' },
              { name: 'Duration of Contract', value: 'What is the duration of the contract?' },
              { name: 'All Relevant Fields', value: 'All Relevant Fields?' }
            ]
          }
        };
        addChatLog({ type: 'user', message: <UserMessage loading={loading} contractType={filesResponse.contract_type} journeysObj={journeysObj} handleClick={(value: any) => handleSOWExtract(value)} /> });
        scrollToBottom();

      } else if (filesResponse.status === 'Failed') {

        const text = `We're experiencing exceptionally high demand. Please try again later.`;

        addChatLog({ type: 'assistant', message: <TextMessage answer={text} /> });
      }
    } else if (contractType === "Time and Material Contract") {

      if (filesResponse.status === 'Success') {
        console.log("filesResponse", filesResponse)
        const validateResponse = await ContractCopilotServices.generateFetchValidateContractResponse(formData);
        console.log(validateResponse)
        if (validateResponse.status === "Success") {
          await getFetchValidateContractResponse(validateResponse.data);

          scrollToBottom();
          setQuery('');
        } else if (validateResponse.status === "Failed") {

          const text = `We're experiencing exceptionally high demand. Please try again later.`;

          addChatLog({ type: 'assistant', message: <TextMessage answer={text} cursorRef={cursorRef} /> });
        }
      } else if (filesResponse.status === 'Failed') {

        const text = `We're experiencing exceptionally high demand. Please try again later.`;

        addChatLog({ type: 'assistant', message: <TextMessage answer={text} cursorRef={cursorRef} /> });
      }
    }
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    addChatLog({ type: 'user', message: <UserMessage answer={query} /> })
    // setLoading(false)
    const formData = new FormData();
    formData.append('email_id', 'nishant.shrivastav@in.ey.com')
    formData.append('query', query)

    // if (journeyName === "extract-clause") {

    // }
    if (journeyName === "validate-contract" && files.length > 0) {
      const res = await ContractCopilotServices.generateFetchValidateContractResponse(formData);
      if (res.status === "Success") {
        const responseHit = await ContractCopilotServices.getFetchValidateContractResponse({ requestId: res.data })

        // addChatLog({ type: 'assistant', message: <TextMessage answer={res.answer} referenceDocuments={res?.reference_documents} /> })

        scrollToBottom();
        setQuery('')
      }
      else if (res.status === "Failed") {
        // setLoading(false)
        const text = `We're experiencing exceptionally high demand. Please try again later.`

        addChatLog({ type: 'assistant', message: <TextMessage answer={text} cursorRef={cursorRef} /> })
      }
    }
    else {

      addChatLog({ type: 'assistant', message: <ChatLoader loading={loaderForGenerateAnswer} /> });

      const res = await ContractCopilotServices.generateAnswer(formData)
      if (res.status === 'Success') {
        addChatLog({ type: 'assistant', message: <TextMessage answer={res.answer} referenceDocuments={res?.reference_documents} cursorRef={cursorRef} /> })
        setLoaderForGenerateAnswer(false);
        scrollToBottom();
        removeLoader()

        setQuery('')
      }
      else if (res.status === 'Failed') {
        // setLoading(false)
        const text = `We're experiencing exceptionally high demand. Please try again later.`
        addChatLog({ type: 'assistant', message: <TextMessage answer={text} cursorRef={cursorRef} /> })

      }
    }

  }
  const ChatLoader = ({ loading }: any) => {
    console.log(loading, "chatloader")
    return (
      <div id='removeLoader'>
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
                    "  animate-preulse overflow-x-hidden whitespace-pre-wrap",
                    // { "text-red-500": error, "dark:text-gray-300": !error }
                  )}
                >
                  {!loading && (
                    <span
                      className="ml-1 blink bg-gray-500 dark:bg-gray-200 h-4 w-1 inline-block"
                      ref={cursorRef}
                    >

                    </span>
                  )}





                </div>
              )}

            </div>
            <div className="mt-2 md:mt-0  text-right self-start">

            </div>
          </motion.div>

        </div>
      </div>
    )
  }


  const removeLoader = () => {
    const elementToDelete: any = document.getElementById('removeLoader');
    elementToDelete.remove();

  }
  const handleSOWExtract = async (value: string) => {
    const formData = new FormData();
    formData.append('email_id', 'nishant.shrivastav@in.ey.com');

    switch (value) {
      case "All Relevant Fields?":
        addChatLog({ type: 'user', message: <UserMessage answer={value} loading={true} /> });

        try {
          const { data: requestId } = await ContractCopilotServices.generateFetchExtractResponse(formData);
          setLoading(true);
          let getFetchExtractResponse = await ContractCopilotServices.getFetchExtractResponse({ requestid: requestId });

          // Display the ChatLoader component only once when the response is pending
          addChatLog({ type: 'assistant', message: <ChatLoader loading={loaderForSOW} /> });
          while (getFetchExtractResponse.status === 'Pending') {
            await new Promise(resolve => setTimeout(resolve, 2000));
            getFetchExtractResponse = await ContractCopilotServices.getFetchExtractResponse({ requestid: requestId });
          }
          // Remove the ChatLoader component from the chat log

          removeLoader()
          setLoading(false);
          if (getFetchExtractResponse.status === 'Success') {
            setLoaderForSOW(false);
            addChatLog({ type: 'user', message: <SOWTableView table={getFetchExtractResponse.data} loading={loaderForSOW} cursorRef={cursorRef} /> });
          } else if (getFetchExtractResponse.status === 'Failed') {
            setLoaderForSOW(false);
            addChatLog({ type: 'assistant', message: <TextMessage answer="We're experiencing exceptionally high demand. Please try again later." cursorRef={cursorRef} /> });
          }
        } catch (error) {
          addChatLog({ type: 'assistant', message: <TextMessage answer="We're experiencing exceptionally high demand. Please try again later." cursorRef={cursorRef} /> });
          console.error('Error in handleSOWExtract:', error);
        }
        break;

      case "What is the Effective Date of the Contract?":
      case "What is the duration of the contract?":
        formData.append('query', value);
        addChatLog({ type: 'user', message: <UserMessage answer={value} /> });
        addChatLog({ type: 'assistant', message: <ChatLoader loading={loaderForGenerateAnswer} /> });
        const res = await ContractCopilotServices.generateAnswer(formData);
        if (res.status === 'Success') {
          setLoaderForGenerateAnswer(false);
          removeLoader();
          addChatLog({ type: 'assistant', message: <TextMessage answer={res.answer} referenceDocuments={res?.reference_documents} cursorRef={cursorRef} /> });
        } else if (res.status === 'Failed') {
          addChatLog({ type: 'assistant', message: <TextMessage answer="We're experiencing exceptionally high demand. Please try again later." cursorRef={cursorRef} /> });
        }
        break;

      default:
        break;
    }
  };

  async function getFetchValidateContractResponse(requestId: any) {
    try {
      setLoaderForMSA(true);
      addChatLog({ type: 'assistant', message: <ChatLoader loaderForMSA={loaderForMSA} /> });

      let response = await ContractCopilotServices.getFetchValidateContractResponse({
        requestid: requestId
      });

      while (response.status === 'Pending') {
        await new Promise(resolve => setTimeout(resolve, 2000));
        response = await ContractCopilotServices.getFetchValidateContractResponse({
          requestid: requestId
        });
      }

      setLoaderForMSA(false);
      removeLoader();

      if (response.status === 'Success') {
        addChatLog({ type: 'user', message: <MSATable table={response.data} cursorRef={cursorRef} /> });
        scrollToBottom();
        setQuery('');
      } else if (response.status === 'Failed') {
        const text = "We're experiencing exceptionally high demand. Please try again later.";
        addChatLog({ type: 'assistant', message: <TextMessage answer={text} /> });
        // Handle the "Failed" case
        // console.error("API call failed:", response.error);
      }
    } catch (error) {
      setLoaderForMSA(false);
      removeLoader();
      // console.error("Error fetching response:", error);
    }
  }


  return (
    <div>
      <div>
        <Modal
          open={showModal}
          onClose={handleCancel}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-[#23232f] rounded-lg shadow-lg p-6 w-[500px] h-[300px]">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Upload File</h3>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={handleCancel}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-md p-4 mb-4 flex flex-col items-center justify-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <p className="text-gray-500 mb-2">Drag and drop files here</p>
                  <label
                    htmlFor="file-upload"
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    or click to upload
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </div>
                <ul>
                  {files.map((file: any, index: any) => (
                    <li key={index} className="flex items-center mb-2">
                      <i className="fas fa-file mr-2 text-gray-500"></i>
                      <p className="text-white"> {file.name}</p>
                      <button
                        className="ml-2 text-gray-500 hover:text-gray-700"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-[#23232f] hover:bg-[#ffffff] hover:text-[#23232f] hover:border-[#ffffff] border-[1px] text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#23232f] hover:bg-[#ffffff] hover:text-[#23232f] hover:border-[#ffffff] border-[1px] text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handleUpload}
                    disabled={files.length === 0}
                    style={{
                      cursor: files.length === 0 ? 'not-allowed' : 'pointer'
                    }}

                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <section className="flex items-center">
        <div className="w-full">
          <form
            className="input shadow-md dark:bg-[#40414f] bg-white  dark:border-white border-gray-700 border-2 flex items-center   rounded-md"
            onSubmit={handleFormSubmit}
            ref={formRef}
          >
            <div className="w-11/12 p-2">
              <textarea
                name="query"
                ref={textareaRef}
                className="h-6 px-2  w-full outline-none resize-none dark:bg-transparent dark:text-white placeholder:font-bold"
                placeholder="Send a message"
                onKeyDown={handleOnKeyDown}
                onChange={handleOnInputChange}
                value={query}
                autoFocus
              ></textarea>
            </div>
            <div className=" w-1/12 text-center mx-2">
              <button
                type="submit"
                className={classNames(
                  " text-center  text-gray-600 dark:text-white transition inline-flex items-center justify-center py-2 px-2 rounded-md",
                  { "bg-green-500 dark:text-gray-200 text-white": query }
                )}
              >
                <IonIcon icon={query ? send : sendOutline} />
              </button>
            </div>
          </form>
        </div>
        <div className="ml-4">
          <button
            className="bg-white  text-white font-bold py-3 px-4 rounded"
            onClick={() => setShowModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none"><g clipPath="url(#clip0_689_1204)"><path d="M15.223 5.59782L15.223 16.1395C15.223 18.1653 13.5821 19.8062 11.5563 19.8062C9.53048 19.8062 7.88965 18.1653 7.88965 16.1395L7.88965 4.68115C7.88965 3.41615 8.91631 2.38949 10.1813 2.38949C11.4463 2.38949 12.473 3.41615 12.473 4.68115L12.473 14.3062C12.473 14.8103 12.0605 15.2228 11.5563 15.2228C11.0521 15.2228 10.6396 14.8103 10.6396 14.3062L10.6396 5.59782L9.26465 5.59782L9.26465 14.3062C9.26465 15.5712 10.2913 16.5978 11.5563 16.5978C12.8213 16.5978 13.848 15.5712 13.848 14.3062L13.848 4.68115C13.848 2.65532 12.2071 1.01449 10.1813 1.01449C8.15548 1.01449 6.51465 2.65532 6.51465 4.68115L6.51465 16.1395C6.51465 18.9262 8.76965 21.1812 11.5563 21.1812C14.343 21.1812 16.598 18.9262 16.598 16.1395L16.598 5.59782L15.223 5.59782Z" fill="#1A1A24"></path></g><defs><clipPath id="clip0_689_1204"><rect width="22" height="22" fill="white" transform="translate(0.556396 22.5562) rotate(-90)"></rect></clipPath></defs></svg>
          </button>
        </div>
      </section>
    </div>
  );
}
