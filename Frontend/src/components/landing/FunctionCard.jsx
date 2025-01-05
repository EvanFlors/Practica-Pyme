import { motion } from "framer-motion"
import { fadeIn } from "../../utils/motion"

const FunctionCard = ({ index, icon, title, description }) => {
  return (
    <div className="md:w-1/4 w-2/3">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full p-[1px] rounded-[20px]"
      >
        <div className="py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          <div className="bg-white mb-6 rounded-full overflow-hidden w-[150px] h-[150px] flex justify-center items-center">
            <img src={icon} alt={title} className="w-2/3 h-2/3 object-cover" />
          </div>
          <h3 className="text-white text-[25px] font-bold text-center pb-5">
            { title }
          </h3>
          <p className="text-white text-[25px] font-thin text-center">
            { description }
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default FunctionCard