import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Business } from "@/components/sections/business";
import { Strategy } from "@/components/sections/strategy";
import { Values } from "@/components/sections/values";
import { Products } from "@/components/sections/products";
import { Infra } from "@/components/sections/infra";
import { History } from "@/components/sections/history";
import { Partners } from "@/components/sections/partners";
import { Growth } from "@/components/sections/growth";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <Business />
        <Strategy />
        <Values />
        <Products />
        <Infra />
        <History />
        <Partners />
        <Growth />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
