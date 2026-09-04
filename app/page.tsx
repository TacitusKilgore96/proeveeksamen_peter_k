"use client"

import { useEffect } from "react";
import useRequestData from "@/hooks/useRequestData";

export default function Home() {
  const { makeRequest, data, isLoading, error } = useRequestData();

  useEffect(() => {
    const loadData = async () => {
      await makeRequest("/about", "GET");
    };

    loadData();
  }, []);

  return (
    <main>

      {/* hero og ture */}
      <section className="bg-[#F7F7F7]">

        <div className="relative">
          <img className="block h-155 w-full object-cover" src="/images/banner2.jpg" alt="" />
          
          <div className="absolute inset-x-0 top-1/2 mx-auto max-w-7xl -translate-y-1/2 text-[#FFFFFF]">
            <h2 className="uppercase text-xl">oplev den røde planet</h2>
            <h1 className="text-7xl">Turen går til <span className="font-extrabold">Mars</span></h1>
          </div>

        </div>

        {/* månen & mars */}

        <div className="relative -mt-12 grid justify-center text-center">
          <div className="flex gap-10 text-[#FFFFFF]">
            <div>
              <a className="group relative block overflow-hidden" href="#">
                <img className="transition-transform duration-[1000ms] ease-in-out group-hover:scale-115" src="/images/moon-btn.jpg" alt="måne" />
                <span className="absolute inset-x-0 bottom-4 text-3xl font-bold group-hover:underline decoration-2 underline-offset-4">Månen</span>
              </a>
            </div>
            <div>
              <a className="group relative block overflow-hidden" href="#">
                <img className="transition-transform duration-[1000ms] ease-in-out group-hover:scale-115" src="/images/mars-btn.jpg" alt="mars" />
                <span className="absolute inset-x-0 bottom-4 text-3xl font-bold group-hover:underline decoration-2 underline-offset-4">Mars</span>
              </a>
            </div>
          </div>
          <a className="text-xl p-10 mb-10" href="#">Vores ture →</a>
        </div>
        </section>

        {/* Lidt om os */}
        <section className="bg-[#FFFFFF]">
          <div className="flex justify-center">
            <img src="/images/om-os.jpg" alt="" />
            <div>
              <h1 className="text-2xl">Lidt om os</h1>
              <h2 className="text-[#01B3a7]">Oplev Nye Horizonter</h2>
              <p>I foråret 2075......</p>
              <a href="/contact" className="inline-block bg-[#01B3a7] hover:bg-[#018d83] text-[#FFFFFF] p-5">Kontakt os</a>
            </div>
          </div>
        </section>

        {/* Vores team */}
        <section>

        </section>

        {/* nyhedsbrev */}

      {isLoading && <p>Loader...</p>}
      {error && <p>Der opstod en fejl</p>}
    </main>
  );
}
