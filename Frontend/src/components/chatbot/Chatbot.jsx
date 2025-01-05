import { useState } from "react";
import Survey from "./Survey";
import Loader from "./Loader";
import Message from "./Message";
import "./Chat.css";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Chatbot = () => {
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [surveyActive, setSurveyActive] = useState(false);
  const [message, setMessage] = useState("");

  const fetchAdvices = async (results) => {
    let advices = [];
  
    for (let result of results) {
      if (result.percentage < 60) {
        try {
          const response = await fetch("http://127.0.0.1:5000/get/advice", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              section: result.section,  
            }),
          });
  
          if (response.ok) {
            const data = await response.json();
  
            if (data && data.section && data.advice) {
              advices.push(data);  
            } else {
              console.error("Invalid response structure for section:", result.section);
            }
          } else {
            console.error("Failed to fetch advice for section:", result.section);
          }
        } catch (error) {
          console.error("Error fetching advice:", error);
        }
      }
    }
    
    console.log(advices)

    const resultsFormatted = advices
      .map((advice) => {
        return `${advice.section}: ${advice.advice}`; 
      })
      .join("\n");
  
    return resultsFormatted; 
  };
  const handleSurveyResults = async (results) => {
    setIsLoading(true);
    setSurveyActive(false);

    const resultsPercentage = formatResults(results);
    await sleep(1000);

    addResponse(`Tus resultados son\n${resultsPercentage}`, false);

    const advices = await fetchAdvices(results);
    await sleep(1000);

    if (advices.length > 0) {
      addResponse(`Te sugerimos lo siguiente:\n${advices}`, false);
    }

    fetchSaveAnswer(results);
    setIsLoading(false);
  };

  const handleUserMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    setIsLoading(true);
    setMessage("");

    addResponse(message, true);

    await sleep(1000);

    if (message.toLowerCase() === "start") {
      startSurvey();
    } else {
      await fetchBotResponse(message);
    }
  };

  const addResponse = (text, isUserMessage) => {
    setResponses((prev) => [...prev, { text, isUserMessage }]);
  };

  const formatResults = (results) => {
    return results.slice(1).map((result) => {
      return (
        `${result.section}: ${Math.floor(result.percentage)}%`
      )
    }).join("\n");
  };

  const startSurvey = () => {
    setSurveyActive(true);
    setIsLoading(false);
  };

  const fetchBotResponse = async (userMessage) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: JSON.stringify({ message: userMessage }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      addResponse(data.answer, false);
    } catch (error) {
      console.error(error);
      addResponse("Estoy teniendo problemas. Intente más tarde", false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSaveAnswer = async (results) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/save/response", {
        method: "POST",
        body: JSON.stringify({ results: results }),
        headers: { "Content-Type": "application/json" },
      });
      
      if (!response.ok) {
        addResponse("Estoy teniendo problemas. Intente más tarde", false);
      }
    } catch (error) {
      console.error(error);
      addResponse("Estoy teniendo problemas. Intente más tarde", false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 border-b-[6px] lg:border-b-[10px] border-b-primary rounded-t-xl max-h-[800px] min-h-[500px]">
        <ul>
          {responses.map((response, index) => (
            <Message key={index} text={response.text} isUserMessage={response.isUserMessage} />
          ))}
          {isLoading && (
            <div className="bg-gray-100 text-sm lg:text-bae p-3 rounded-full w-fit max-w-[70%]">
              <Loader />
            </div>
          )}
        </ul>
        {surveyActive && <Survey onFinish={handleSurveyResults} />}
      </div>

      <div className="p-4 bg-gray-50 rounded-b-xl">
        <form className="flex items-center gap-3" onSubmit={handleUserMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading || surveyActive}
            placeholder="Escribe tu mensaje..."
            className={`${
              isLoading || surveyActive ? "opacity-50 cursor-not-allowed" : ""
            } flex-1 p-3 rounded-md border border-gray-300 text-sm lg:text-base`}
          />
          <button
            type="submit"
            disabled={isLoading || surveyActive}
            className={`${
              isLoading || surveyActive ? "opacity-50 cursor-not-allowed" : ""
            } bg-primary text-white p-3 rounded-md hover:bg-primary-dark`}
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;
