import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Work from "./sections/Work";
import Contact from "./sections/Contact";

function App() {
  return (
    <div className="min-h-screen bg-bg text-ink font-body">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;