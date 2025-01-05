import { motion } from "framer-motion"
import { slideIn } from "../../utils/motion"
import { styles } from "../../styles"
import { chatBenefits } from "../../constants"
import BenefitsCard from "./BenefitsCard"
import SectionWrapper from "../../hoc/SectionWrapper"

const Benefits = () => {
  return (
    <div className="pb-20 overflow-x-auto">
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="p-8 flex flex-col justify-center items-center text-center"
      >
        <p className={`${styles.sectionSubText}`}>
            ¿Por qué usarlo?
        </p>
        <h3 className={`${styles.sectionHeadText}`}>
          Beneficios.
        </h3>
      </motion.div>
      {chatBenefits.map((benefit, index) => (
        <BenefitsCard key={benefit.title} index={index} side={ index % 2 === 0 ? "left" : "right"} {...benefit}/>
      ))}
    </div>
  )
}

export default SectionWrapper(Benefits, "benefits", "[#297781]")