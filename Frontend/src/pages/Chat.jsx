import Navbar from "../components/common/Navbar"
import Hero from "../components/chatbot/Hero"
import FAQ from "../components/chatbot/FAQ"
import Footer from "../components/common/Footer"

const Chat = () => {
  return (
    <div className="relative z-0 bg-primary min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <FAQ />
      <Footer />
    </div>
  )
}

export default Chat
