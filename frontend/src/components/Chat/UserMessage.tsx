import { IonIcon } from "@ionic/react";
import Avatar from "../Avatar/Avatar";
import { createOutline } from "ionicons/icons";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import useChat, { ChatMessageType } from "../../store/store";

type Props = {
  chat: ChatMessageType;
  chatIndex: number;
};

export default function UserMessage({ chat, chatIndex }: Props) {
  // const [edit, setEdit] = useState(false);
  // const [updatedQuery, setUpdatedQuery] = useState(chat.content);
  // const editTextareaRef = useRef<HTMLTextAreaElement>(null);
  // const [editChatMessage, resetChatAt] = useChat((state) => [
  //   state.editChatMessage,
  //   state.resetChatAt,
  // ]);

  // function handelChatEdit() {
  //   editChatMessage(updatedQuery, chatIndex);
  //   resetChatAt(chatIndex + 1);
  //   setEdit(false);
  // }
  // useEffect(() => {
  //   if (edit && editTextareaRef.current) {
  //     editTextareaRef.current.style.height =
  //       editTextareaRef.current.scrollHeight + "px";
  //   }
  // }, [edit]);

  return (
    <div className={classNames("py-4 px-2 md:px-0")}>
      <div className=" max-w-2xl mx-auto md:flex md:items-center group">
        <div className="flex items-start w-full max-w-[620px]">
          <div className="mr-4  rounded-md flex items-center flex-shrink-0">
            <Avatar className=" h-11 w-11" />
          </div>

         
            <p
              className={classNames(
                " dark:text-gray-200 overflow-x-auto"
              )}
            >
              {chat.content}
            </p>
         
        </div>

        <div className=" md:invisible group-hover:visible  text-right">
          
            <button
              className="edit md:ml-8 dark:text-gray-200  text-gray-500 text-xl "
              // onClick={() => setEdit((prev) => !prev)}
            >
              <IonIcon icon={createOutline} />
            </button>
         
        </div>
      </div>
     
    </div>
  );
}
