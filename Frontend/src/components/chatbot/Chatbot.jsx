import { useState } from "react";
import Survey from "./Survey";
import Loader from "./Loader";
import Message from "./Message";
import "./Chat.css";
import {
  // fetchAdvices,
  fetchBotResponse,
  fetchEmailSender,
  fetchSaveAnswer,
  formatResults,
} from "./utils";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Chatbot = () => {
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [surveyActive, setSurveyActive] = useState(false);
  const [message, setMessage] = useState("");

  const handleSurveyResults = async (results) => {
    setIsLoading(true);
    setSurveyActive(false);

    const filteredSections = results.filter(
      (section) => section.percentage < 70
    ).map((section) => ({
      section: section.section,
      responses: section.responses.filter(
        (response) => response.answer === "0" || response.answer === "1"
      ),
    }));

    const resultsPercentage = formatResults(results);
    await sleep(1000);

    addResponse(`Tus resultados son\n${resultsPercentage}`, false);

    await sleep(1000);

    await fetchEmailSender(
      {
        from: "onboarding@resend.dev",
        to: results[0].responses[1].answer,
        subject: "Consultorías para tu negocio 🚀",
        results: filteredSections,
      },
      addResponse
    );

    fetchSaveAnswer(results, addResponse, setIsLoading);
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
      startSurvey(true);
    } else {
      await fetchBotResponse(message, addResponse, setIsLoading);
    }
  };

  const addResponse = (text, isUserMessage) => {
    setResponses((prev) => [...prev, { text, isUserMessage }]);
  };

  const startSurvey = (value) => {
    setSurveyActive(value);
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 border-b-[6px] lg:border-b-[10px] border-b-primary rounded-t-xl max-h-[800px] min-h-[500px]">
        <ul>
          {responses.map((response, index) => (
            <Message
              key={index}
              text={response.text}
              isUserMessage={response.isUserMessage}
            />
          ))}
          {isLoading && (
            <div className="bg-gray-100 text-sm lg:text-bae p-3 rounded-full w-fit max-w-[70%]">
              <Loader />
            </div>
          )}
        </ul>
        {surveyActive && <Survey onFinish={handleSurveyResults} addResponse={addResponse} startSurvey={startSurvey} />}
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
              isLoading || surveyActive
                ? "opacity-50 cursor-not-allowed"
                : ""
            } flex-1 p-3 rounded-md border border-gray-300 text-sm lg:text-base`}
          />
          <button
            type="submit"
            disabled={isLoading || surveyActive}
            className={`${
              isLoading || surveyActive
                ? "opacity-50 cursor-not-allowed"
                : ""
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
