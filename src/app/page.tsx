import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import JsonLd from "@/components/seo/JsonLd";

import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

import AosInitializer from "@/components/ui/AosInitializer";
import AppProviders from "@/components/ui/AppProviders";
import GlobalBehaviours from "@/components/ui/GlobalBehaviours";
import Preloader from "@/components/ui/Preloader";

export default function HomePage() {
  return (
    <AppProviders>
      <JsonLd />

      <Preloader />

      <GlobalBehaviours />

      <AosInitializer />

      <Header />

      <main className="main">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>

      <Footer />
    </AppProviders>
  );
}