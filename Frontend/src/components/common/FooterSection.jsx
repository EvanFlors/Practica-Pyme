const FooterSection = ({ title, subcontent }) => {
  return (
    <div className="lg:w-[15vw] w-[40vw] m-10">
      <h2 className="text-[25px] font-bold">
        {title}
      </h2>
      <div className="w-full h-[3px] bg-black mb-5"></div>
      {subcontent}
    </div>
  )
}

export default FooterSection