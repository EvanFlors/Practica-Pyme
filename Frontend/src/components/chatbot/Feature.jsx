const Feature = ({ iconSrc, title, description }) => (
  <div className="flex items-start gap-4">
    <img
      src={iconSrc}
      alt={title}
      className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]"
    />
    <div>
      <p className="text-[16px] lg:text-[20px] font-semibold">{title}</p>
      <p className="text-[14px] lg:text-[18px] opacity-70">{description}</p>
    </div>
  </div>
)

export default Feature