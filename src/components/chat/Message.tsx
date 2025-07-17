import { UIMessage } from "ai"
import { MemoizedMarkdown } from "./MemoizedMarkdown"

export default function Message({ message }: { message: UIMessage }) {
  return (
    <div key={message.id} className={`whitespace-pre-wrap ${message.role === "user" && "flex justify-end"}`}>
      {message.parts.map((part, i) => {
        switch (part.type) {
          case "text":
            return <MemoizedMarkdown key={`${message.id}-${i}`} id={message.id} content={part.text} />
        }
      })}
    </div>
  )
}
