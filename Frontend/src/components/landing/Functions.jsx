import { motion } from "framer-motion"
import { slideIn } from "../../utils/motion"
import { styles } from "../../styles"
import { chatFunctions } from "../../constants"
import FunctionCard from "./FunctionCard"
import SectionWrapper from "../../hoc/SectionWrapper"

const Functions = () => {
  return (
    <>
      <div className="flex justify-center">
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="p-8"
        >
          <p className={`${styles.sectionSubText} text-center`}>
            Opciones
          </p>
          <h3 className={`${styles.sectionHeadText}`}>
            ¿Cómo funciona?
          </h3>
        </motion.div>
      </div>
      <div className="flex flex-wrap gap-20 justify-center">
        {chatFunctions.map((funct, index) => (
          <FunctionCard key={funct.title} index={index} {...funct} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Functions, "functions")
