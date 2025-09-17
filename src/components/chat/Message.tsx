import { UIMessage } from "ai"
import { MemoizedMarkdown } from "./MemoizedMarkdown"

function UserMessage({ message }: { message: UIMessage }) {
  const messageContent = message.parts.find((part) => part.type === "text")!.text

  return (
    <div className="flex justify-end">
      <div className="max-w-2xl rounded-2xl bg-[#dee7f4] p-3 break-words whitespace-pre-wrap">
        <span>{messageContent}</span>
      </div>
    </div>
  )
}

function AssistantMessage({ message }: { message: UIMessage }) {
  return (
    <div className="prose max-w-3xl break-words whitespace-pre-wrap">
      {message.parts.map((part, i) => {
        switch (part.type) {
          case "text":
            return <MemoizedMarkdown key={`${message.id}-${i}`} id={message.id} content={part.text} />
        }
      })}
    </div>
  )
}

export default function Message({ message }: { message: UIMessage }) {
  return message.role === "user" ? <UserMessage message={message} /> : <AssistantMessage message={message} />
}
