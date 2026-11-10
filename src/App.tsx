import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FurnitureCarousel } from "./components/FurnitureCarousel";
import { Testimonials } from "./components/Testimonials";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#inicio">
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <FurnitureCarousel />
        <Testimonials />
      </main>
    </>
  );
}
