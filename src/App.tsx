/** @format */
import { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import aiIcon from "./assets/robot/ai-icon.png";
import userIcon from "./assets/robot/user-icon.png";
import img6 from "./assets/robot/img6.png";

import "./App.css";

interface Message {
  role: "AI" | "USER";
  content: string;
}

function App() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState<Message[]>([
    {
      role: "AI",
      content:
        " Hi, 我是Deepseek AI~ 很高兴遇见你，你可以向我提问，我来帮你看看~ ",
    },
  ]);

  const [askValue, setAskValue] = useState<string>("");
  const [think, setThink] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAskValue(event.target.value);
  };

  useEffect(() => {
    const element = messagesEndRef.current!;
    element.scrollTop = element.scrollHeight;
  }, [message]);

  const handleChat = async (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLImageElement>
  ) => {
    if (("key" in e && e.key === "Enter") || e.type === "click") {
      if (!askValue) return;
      const obj: Message = {
        role: "USER",
        content: askValue,
      };
      setMessage((prevMessage) => [...prevMessage, obj]);
      sendMessage();
      setAskValue("");
    }
  };

  const sendMessage = async () => {
    setThink("思考中......");
    const apiUrl: string = "https://workertest.liuwei3895.workers.dev/graphql";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query sampleDeepseekQuery($prompt:String!){
                deepseekResponse: askDeepseek(prompt: $prompt)
            }
            `,
          variables: {
            prompt: askValue,
          },
        }),
      });
      const result = await response.json();
      if (result?.data) {
        const obj: Message = {
          role: "AI",
          content: result.data.deepseekResponse,
        };
        setMessage((prevMessage) => [...prevMessage, obj]);
        setThink("");
      }
    } catch (error: any) {
      throw new Error("Error", error);
    }
  };

  return (
    <>
      <div className="ask">
        <h2 className="ask-title"> DeepSeekAl 聊天</h2>
        <div className="chat-container">
          <div className="chat-messages" ref={messagesEndRef}>
            {message.map((item: Message, i: number) => {
              return item.role == "AI" ? (
                <div key={"chat" + i} className="message ai-message">
                  <img src={aiIcon} alt="AI图标" />
                  <div className="message-content">
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {item.content}
                    </Markdown>
                  </div>
                </div>
              ) : (
                <div key={"chat" + i} className="message user-message">
                  <div className="message-content">
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {item.content}
                    </Markdown>
                  </div>
                  <img src={userIcon} alt="用户图标" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="think">{think}</div>
        <div className="ask-text">
          <input
            type="text"
            placeholder="请输入您的问题"
            value={askValue}
            onKeyUp={handleChat}
            onChange={handleInputChange}
          />
          <img src={img6} alt="" onClick={handleChat} />
        </div>
      </div>
    </>
  );
}

export default App;
