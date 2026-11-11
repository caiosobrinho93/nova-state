import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FurnitureCarousel } from "./components/FurnitureCarousel";
import { Testimonials } from "./components/Testimonials";
import { MaterialsCatalog } from "./components/MaterialsCatalog";

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
        <MaterialsCatalog />
      </main>
    </>
  );
}
