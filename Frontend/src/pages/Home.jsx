import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import Benefits from "../components/landing/Benefits";
import Consultants from "../components/landing/Consultants";
import Functions from "../components/landing/Functions";
import Hero from "../components/landing/Hero";

const Home = () => {
  return (
    <div className="relative z-0 bg-primary min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Consultants />
      <Functions />
      <Benefits />
      <Footer />
    </div>
  );
};

export default Home;
