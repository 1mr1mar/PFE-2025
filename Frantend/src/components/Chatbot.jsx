import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatRef = useRef(null);
  
  // دالة لفتح وإغلاق الشات
  const toggleChat = () => setIsOpen(!isOpen);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // دالة لإرسال الرسالة إلى السيرفر
  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const userMessage = message;
    setMessage("");

    // إضافة الرسالة الجديدة إلى المحادثة
    setChatHistory(prevHistory => [...prevHistory, { user: userMessage, bot: "..." }]);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: userMessage,
      });
      
      // إضافة رد الـ chatbot إلى المحادثة
      setChatHistory(prevHistory => {
        const newHistory = [...prevHistory];
        newHistory[newHistory.length - 1] = { user: userMessage, bot: response.data.reply };
        return newHistory;
      });
    } catch (error) {
      console.error("Error sending message:", error);
      // Update the loading message with an error message
      setChatHistory(prevHistory => {
        const newHistory = [...prevHistory];
        newHistory[newHistory.length - 1] = { 
          user: userMessage, 
          bot: "Sorry, I'm having trouble connecting. Please try again later." 
        };
        return newHistory;
      });
    }
  };

  // Function to render HTML content safely
  const renderHTML = (html) => {
    return { __html: html };
  };

  return (
    <div className="fixed bottom-20 right-5 z-[999]" ref={chatRef}>
      <button
        onClick={toggleChat}
        className="bg-yellow-gold text-green-ziti z-[9999] p-4 rounded-full shadow-lg hover:bg-yellow-gold1 transition duration-300 transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-10 w-80 h-96 bg-green-ziti border-2 border-yellow-gold rounded-lg shadow-lg">
          <div className="flex flex-col p-4 h-full">
            <div className="flex-1 overflow-y-auto">
              {chatHistory.map((chat, index) => (
                <div key={index} className="mb-4">
                  {/* User Message */}
                  <div className="flex items-start gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-gold flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-ziti" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="inline-block bg-transparent border-2 border-yellow-gold p-2 rounded-lg">
                      <strong className="text-yellow-gold">You:</strong>
                      <span className="text-yellow-gold ml-2">{chat.user}</span>
                    </div>
                  </div>

                  {/* Bot Message */}
                  <div className="flex items-start gap-2 justify-end">
                    <div className="inline-block bg-transparent border-2 border-yellow-gold p-2 rounded-lg text-yellow-gold [&>a]:text-blue-500 [&>a]:hover:text-blue-600"
                      dangerouslySetInnerHTML={renderHTML(chat.bot)}
                    />
                    <div className="w-8 h-8 rounded-full bg-yellow-gold flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-ziti" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex mt-4 gap-2">
              <input
                type="text"
                className="flex-1 border-2 border-yellow-gold bg-transparent text-yellow-gold p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-gold placeholder-yellow-gold placeholder-opacity-50"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-yellow-gold text-green-ziti p-2 rounded hover:bg-yellow-gold1 transition duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
