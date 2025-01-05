import { motion } from "framer-motion"
import { fadeIn } from "../../utils/motion"

const BenefitsCard = ({ index, title, description, side }) => {
  return (
    <motion.div 
      variants={fadeIn(side === "left" ? "right" : "left", "spring", 0.5 * index, 0.75)}
      className={`flex justify-${side === "left" ? "start" : "end"} w-full mt-6`}
    >
      <div className="w-1/2 flex flex-col justify-start mt-6">
        <h3 className="text-white text-[25px] font-bold pb-5">
          <span className="text-[#11D9EF] text-[30px]">✓&nbsp;</span>
          { title }
        </h3>
        <p className="text-white text-[25px] font-light">
          { description }
        </p>
        <div className="relative mt-6 flex items-center">
          <div className="w-full h-[1px] bg-white"></div>
          <div className={`absolute ${side}-0 bg-white rounded-full w-6 h-6`}></div>
        </div>
      </div>
    </motion.div>
  )
}

export default BenefitsCard