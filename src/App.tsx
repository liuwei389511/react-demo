/** @format */

import aiIcon from "./assets/robot/ai-icon.png";
import userIcon from "./assets/robot/user-icon.png";
import img6 from "./assets/robot/img6.png";

import "./App.css";

function App() {
  const message: any = [
    {
      role: "AI",
      content:
        " Hi, 我是AI大模型~ <br />很高兴遇见你你可以向我提问，我来帮你看看~ ",
    },
  ];
  const answerValue: string = "";

  const handleChat = (e: any) => {
    if (e.key === "Enter") {
      // 处理回车键事件
      console.log("Enter key pressed");
      // 例如，提交表单或者执行其他操作
    }
  };

  return (
    <>
      <div className="ask">
        <h2 className="ask-title"> DeepSeekAl 聊天</h2>
        <div className="chat-container">
          <div className="chat-messages">
            {message.map((item: any, i: number) => {
              return item.role == "AI" ? (
                <div key={"chat" + i} className="message ai-message">
                  <img src={aiIcon} alt="AI图标" />
                  <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                </div>
              ) : (
                <div key={"chat" + i} className="message user-message" v-else>
                  <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                  <img src={userIcon} alt="用户图标" />
                </div>
              );
            })}
            {answerValue && (
              <div className="message ai-message">
                <img src={aiIcon} alt="AI图标" />
                <p dangerouslySetInnerHTML={{ __html: answerValue }}></p>
              </div>
            )}
          </div>
        </div>
        <div className="ask-text">
          <input
            type="text"
            placeholder="请输入您的问题"
            v-model="askValue"
            onKeyUp={handleChat}
          />
          <img src={img6} alt="" onClick={handleChat} />
        </div>
      </div>
    </>
  );
}

export default App;
