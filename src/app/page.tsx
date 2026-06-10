import CustomCursor from "@/components/ui/CustomCursor";
import Loader from "@/components/ui/Loader";
import { Navbar, Hero, About, Projects, Expertise, Experience, Education, Awards, Frames, ContactTabs, Footer, Publications } from "@/components/sections";

export default function Home() {
  return (
    <main className="relative bg-background selection:bg-foreground selection:text-background min-h-screen">
      <Loader />
      <CustomCursor />
      
      <Navbar />
      
      <div className="relative z-10">
        <Hero />
        <Projects />
        <About />
        <Frames />
        <Education />
        <Expertise />
        <Experience />
        <Awards />
        <Publications />
        <ContactTabs />
        <Footer />
      </div>
    </main>
  );
}
