import { useState } from "react"

import { styles } from "../../styles"
import { navLinks } from "../../constants"
import { menu, close } from "../../assets"
import { Link } from "react-router-dom"

const Navbar = () => {

  const [toggle, setToggle] = useState(false)

  const scrollToView = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300); 
    setToggle(false)
  }

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary opacity-90`}
    >
      <div className='w-full flex justify-between items-center max-w-6xl mx-auto'>
        <Link
          to="/"
          className='flex items-center gap-2'
          onClick={() => {
            window.scroll(0, 0)
          }}
        >
          <p className='text-white text-[32px] font-medium cursor-pointer flex'>
            Negocio +
          </p>
        </Link>

        <ul className='list-none hidden xl:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className="text-secondary hover:text-white text-[18px] font-medium cursor-pointer"
            >
              <Link
                to={nav.to}
                onClick={() => scrollToView(nav.id)}
              >
                {nav.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className='xl:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            onClick={() => setToggle(!toggle)}
            alt='menu'
            className='w-[28px] h-[28px] object-contain cursor-pointer'
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-primary w-full absolute top-14 right-0 my-2 px-16 min-w-[140px] z-10`}
          >
            <ul className='list-none flex justify-end items-end flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className="font-poppins font-medium cursor-pointer text-[16px] hover:text-white text-secondary"
                  onClick={() => {
                    setToggle(!toggle);
                  }}
                >
                  <Link
                    to={nav.to}
                    onClick={() => scrollToView(nav.id)}
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
