import { motion } from "framer-motion"

import { slideIn } from "../../utils/motion"
import { styles } from "../../styles"
import { test } from "../../assets"
import SectionWrapper from "../../hoc/SectionWrapper"

const Consultants = () => {
  return (
    <div className="xl:flex-row flex-col-reverse flex gap-10 overflow-auto">
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <img 
          src={test} 
          alt="Example" 
          className="h-full w-full object-contain"
        />
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="flex-1 p-8"
      >
        <p className={`${styles.sectionSubText}`}>
          Trabajamos con
        </p>
        <h3 className={`${styles.sectionHeadText}`}>
          Consultores expertos.
        </h3>
        <p className={`${styles.sectionContentText}`}>
          Contamos con un equipo de consultores altamente capacitados 
          en diversas áreas lo que nos permite ofrecerte respuestas 
          más precisas y adaptadas a las necesidades de tu negocio.
        </p>

        <div
          className="flex justify-center items-center pt-12"
        >
          <button
            className="bg-secondary hover:opacity-90 hover:shadow-lg transition-all duration-300 rounded-md px-10 py-4 text-white tracking-widest"
          >
            Conocer Consultores
          </button>
        </div>
        
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Consultants, "consultants", "[#297781]")
