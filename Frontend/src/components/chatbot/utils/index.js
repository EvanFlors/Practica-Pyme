// utils.js

export const fetchAdvices = async (results) => {
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

  return advices; 
};

export const fetchBotResponse = async (userMessage, addResponse, setIsLoading) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: JSON.stringify({ message: userMessage }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Problemas al obtener la respuesta. Intente más tarde.");
    }

    const data = await response.json();
    addResponse(data.answer, false);
  } catch (error) {
    console.error(error);
    addResponse("Estoy teniendo problemas. Intente más tarde", false);
  } finally {
    setIsLoading(false);
  }
};

export const fetchEmailSender = async ({ from, to, subject, results }, addResponse) => {
  try {
    const response = await fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, results}),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      if (response.status === 403) {
        throw new Error('El correo no existe.');
      }
      throw new Error(errorResponse.message || 'Error al enviar el correo.');
    }

    addResponse("Hemos enviado a tu correo los resultados y sugerencias.", false);
  } catch (error) {
    console.error('Error:', error);
    addResponse(`${error.message}. Intente más tarde.`, false);
  }
};

export const fetchSaveAnswer = async (results, addResponse, setIsLoading) => {
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

export const formatResults = (results) => {
  return results
    .slice(1)
    .map((result) => {
      return `${result.section}: ${Math.floor(result.percentage)}%`;
    })
    .join("\n");
};
