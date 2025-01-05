import { evaluationScale, features } from "../../constants";
import { SectionWrapper } from "../../hoc";
import Chatbot from "./Chatbot";
import Feature from "./Feature";

const Hero = () => {
  return (
    <div className="flex flex-col xl:grid xl:grid-cols-12 gap-6 mt-10 pt-16 xl:min-h-[850px]">
      <div className="col-span-8 xl:col-span-8 bg-white rounded-xl shadow-lg flex flex-col">
        <Chatbot />
      </div>

      <div className="col-span-4 xl:col-span-4 grid grid-cols-2 gap-6 xl:grid-cols-1">
        {/* Section: "¿Por qué Negocio+?" */}
        <div className="col-span-2 xl:col-span-1 bg-white rounded-xl p-8 hidden xl:block">
          <h3 className="text-[20px] xl:text-[23px] font-semibold mb-6 xl:mb-8">
            ¿Por qué Negocio+?
          </h3>
          <div className="grid gap-y-4">
            {features.map((feature, index) => (
              <Feature key={index} {...feature} />
            ))}
          </div>
        </div>

        {/* Section: "Escala de evaluación" */}
        <div className="col-span-2 xl:col-span-1 bg-white rounded-xl p-8">
          <h3 className="text-[28px] xl:text-[23px] font-semibold mb-4 xl:mb-6">
            Escala de evaluación
          </h3>
          <div className="flex flex-col gap-4 xl:gap-6">
            {evaluationScale.map(({ label, text }, index) => (
              <p key={index} className="text-[20px] xl:text-[20px] opacity-80">
                <span className="font-bold">{label}:&nbsp;</span>
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Hero, "chat", true);
