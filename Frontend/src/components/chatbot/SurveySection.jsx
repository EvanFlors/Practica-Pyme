const SurveySection = ({ section, formData, handleChange, isFirstSection }) => {

  if (!section) {
    return null;
  }

  return(
    <div>
      <p className="text-lg font-semibold mb-4">{section.title}</p>
      {section.questions.map(({ id, text }) => (
        <div key={id} className="mb-4">
          <p className="font-semibold mb-2">{text}</p>
          <div className="mt-2 flex gap-10">
            {isFirstSection ? (
              <label className="block">
                <input
                  type="text"
                  name={id}
                  value={formData[id] || ""}
                  onChange={handleChange}
                  className="border rounded px-2 py-1"
                  required
                />
              </label>
            ) : (
              [0, 1, 2].map((value) => (
                <label key={value} className="block">
                  <input
                    type="radio"
                    name={id}
                    value={value}
                    checked={formData[id] === String(value)}
                    onChange={handleChange}
                    className="mr-2"
                    required
                  />
                  {value}
                </label>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SurveySection