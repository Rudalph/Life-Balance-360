"use client"
import React, { useState } from 'react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { LuNewspaper } from "react-icons/lu";
import { RiRobot2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

const Page = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    console.log("...")
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://chat-bot-api-sunhacks.onrender.com/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAnswer(data.answer);
      setChatHistory([...chatHistory, { question, answer: data.answer }]);
      setQuestion(""); // Clear input after submission
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className='w-full fixed bottom-0 flex justify-center align-middle items-center mb-10'>
        <div className="flex w-full max-w-3xl items-center space-x-2 relative sm: ml-2 mr-2">
          <Input
            type="text"
            placeholder="Ask your legal doubts...."
            value={question}
            onChange={handleQuestionChange}
            className="p-6 border border-gray-300 focus:border-gray-300"
          />
          <Button
            type="button"
            onClick={handleSubmit}
            className="absolute right-1 px-2 py-1 bg-transparent hover:bg-transparent text-[#10847E]"
          >
            <RiSendPlaneFill size={27} />
          </Button>
        </div>
      </div>


      <div className='mt-10'>
        {/* Chat bubbles */}
        <div className="chat chat-start">
          <div className="chat-header">
            Your Question
          </div>

        </div>
        <div className='mt-10 flex justify-center overflow-hidden'>
          <div className='mt-10 w-4/5 items-center align-middle overflow-y-auto style={{ maxWidth: 100%, maxHeight: 100vh }}'>
            {chatHistory.map((chat, index) => (
              <div key={index}>
                <div className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className=" w-32rounded-full text-[#10847E]">
                      <RiRobot2Line size={50}/>
                    </div>
                  </div>
                  <div className="chat-bubble bg-[#DEF8ED] text-black">{chat.question}</div>
                </div>

                <div className="chat chat-end p-5">
                  <div className="chat-image avatar">
                    <div className=" w-32rounded-full text-[#10847E]">
                    <FaRegUser size={50}/>
                    </div>
                  </div>
                  <div className="chat-bubble bg-[#DEF8ED] text-black">{chat.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Page;
