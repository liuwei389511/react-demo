/** @format */
import { useState, useRef, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import aiIcon from "../../assets/robot/ai-icon.png";
import userIcon from "../../assets/robot/user-icon.png";
import img6 from "../../assets/robot/img6.png";

import "./index.css";

interface Message {
  role: "AI" | "user";
  content: string;
}

function WeatherAgent() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState<Message[]>([
    {
      role: "AI",
      content:
        " Hi, 我是WeatherAgent AI~ 很高兴遇见你，你可以向我提问城市天气 请输入城市名称，例如北京",
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
        role: "user",
        content: askValue,
      };
      setMessage((prevMessage) => [...prevMessage, obj]);
      sendMessage();
      setAskValue("");
    }
  };

  const sendMessage = async () => {
    setThink("思考中......");
    const apiUrl: string =
      "https://my-mastra-app.liuwei3895.workers.dev/api/agents/weatherAgent/generate";
    //   "https://my-mastra-app.liuwei3895.workers.dev/api/agents/weatherAgent/stream";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agentId: "weatherAgent",
          messages: [
            {
              role: "user",
              content: askValue,
            },
          ],
        }),
      });
      const result = await response.json();
      console.log("result", result);
      if (result?.text) {
        const obj: Message = {
          role: "AI",
          content: result.text,
        };
        setMessage((prevMessage) => [...prevMessage, obj]);
        setThink("");
      }
    } catch (error: unknown) {
      console.log("error", error);
      throw new Error("Something went wrong");
    }
  };

  return (
    <>
      <div className="ask">
        <h2 className="ask-title"> WeatherAgent 聊天</h2>
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
        {/* {answerValue && (
              <div className="message ai-message">
                <img src={aiIcon} alt="AI图标" />
                <p dangerouslySetInnerHTML={{ __html: answerValue }}></p>
              </div>
            )} */}
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

export default WeatherAgent;
