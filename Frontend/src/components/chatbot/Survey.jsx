import { useEffect, useRef, useState } from "react";
import SurveySection from "./SurveySection";

const calculateSectionPercentage = (section, formDataEntries) => {
  const totalQuestions = section.questions.length;
  let totalScore = 0;
  let maxScore = totalQuestions * 2;

  section.questions.forEach(({ id }) => {
    const answer = formDataEntries[id] ? parseInt(formDataEntries[id], 10) : 0;
    totalScore += answer;
  });

  return (totalScore / maxScore) * 100;
};

const Survey = ({ onFinish, addResponse, startSurvey }) => {
  const formRef = useRef();

  const [section, setSection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [sectionResults, setSectionResults] = useState([]);
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
      setLoading(true);
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "get/questions");
        if (!response.ok) {
          throw new Error('Problemas al obtener las preguntas. Intente más tarde.');
        }
        const data = await response.json();
        setSection(data);
      } catch (error) {
        console.error(error);
        addResponse("Problemas al obtener las preguntas. Intente más tarde.", false);
        startSurvey(false)
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const currentSection = section[currentSectionIndex];

  const isFirstSection = () => currentSectionIndex === 0;
  const isLastSection = () => currentSectionIndex === section.length - 1;

  const handleNext = () => {
    const formDataEntries = Object.fromEntries(new FormData(formRef.current).entries());
    const totalQuestions = currentSection.questions.length;

    for (let key in formDataEntries) {
      if (formDataEntries[key].trim() === "") {
          alert("Contesta todas las preguntas.");
          return;
      }
    }

    if (Object.keys(formDataEntries).length < totalQuestions) {
      alert("Contesta todas las preguntas.");
      return;
    }

    setFormData((prev) => ({ ...prev, ...formDataEntries }));

    const sectionPercentage = calculateSectionPercentage(currentSection, formDataEntries);

    const currentResults = {
      section: currentSection.title,
      responses: currentSection.questions.map(({ id, text }) => ({
        question: text,
        answer: formDataEntries[id] || "",
      })),
      percentage: sectionPercentage,
    };

    if (isLastSection()) {
      const finalResults = [...sectionResults, currentResults];
      onFinish(finalResults);
    } else {
      setSectionResults((prev) => [...prev, currentResults]);
      setCurrentSectionIndex((prev) => prev + 1);
      formRef.current.reset();
    }
  };

  const handleBack = () => {
    if (!isFirstSection()) {
      setSectionResults((prev) => prev.slice(0, -1));
      setCurrentSectionIndex((prev) => prev - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-5 bg-gray-100 w-full">
      <h2 className="text-xl font-bold mb-4">Encuesta</h2>
      <div className="flex">
        {loading ?
          (
          <p>Cargando preguntas...</p>
          ) : (
          <form ref={formRef} className="mb-6">
            <SurveySection
              section={section[currentSectionIndex]}
              formData={formData}
              handleChange={handleChange}
              isFirstSection={isFirstSection()}
            />
            <div className="flex gap-4 mt-4">
              {!isFirstSection() && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="py-2 px-4 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              >
                {isLastSection() ? "Submit" : "Next"}
              </button>
            </div>
          </form>
          )
        }
      </div>
    </div>
  );
};

export default Survey;
