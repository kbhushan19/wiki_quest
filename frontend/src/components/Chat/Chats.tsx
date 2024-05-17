import useChat from "../../store/store";
import useChatStore from "../UserInput/store";

export default function Chats() {
  const chatLogs = useChatStore((state: any) => state.chatLogs);

  

  return (
    <div className="md:mt-10 w-full">
      {chatLogs.map((chat: any, index: number) => (
        <div key={index + 1}>
          {chat.message}
        </div>
      ))}

      <div className="h-48 flex-shrink-0"></div>
    </div>
  );
}
