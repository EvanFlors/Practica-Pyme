import { motion } from "framer-motion"

import { slideIn } from "../../utils/motion"
import { styles } from "../../styles"
import { test } from "../../assets"
import SectionWrapper from "../../hoc/SectionWrapper"
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div className="mt-16 xl:flex-row flex-col flex gap-10 overflow-auto">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-1 bg-primary p-8"
      >
        <p className={`${styles.sectionSubText}`}>
          Descubre
        </p>
        <h3 className={`${styles.sectionHeadText}`}>
          Nuevas formas de mejorar tu negocio.
        </h3>
        <p className={`${styles.sectionContentText}`}>
        Respuestas inteligentes y soluciones estratégicas 
        para cada emprendimiento o reto empresarial. Potencia 
        tu negocio con ideas diseñadas para impulsar y sostener 
        tu crecimiento.
        </p>

        <div className="flex justify-start items-center pt-12 ">
          <Link
            to="chat"
            className="bg-secondary hover:opacity-90 hover:shadow-lg transition-all duration-300 rounded-md px-10 py-4 mr-5 text-white tracking-widest"
          >
            Comenzar Ahora
          </Link>
          <button
            className="border-4 border-secondary hover:bg-secondary hover:shadow-lg transition-all duration-300 rounded-md px-10 py-4 text-white tracking-widest"
          >
            Saber más
          </button>
      </div>
        
      </motion.div>

      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <img 
          src={test} 
          alt="Example" 
          className="h-full w-full object-contain"
        />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Hero, "hero")