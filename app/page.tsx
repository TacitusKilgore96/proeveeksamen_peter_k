"use client"

import { useEffect } from "react";
import useRequestData from "@/hooks/useRequestData";
import Members from "@/components/members/page";

export default function Home() {
  const {
    makeRequest: makeAboutRequest,
    data: aboutData,
    isLoading: isAboutLoading,
    error: aboutError,
  } = useRequestData();
  const {
    makeRequest: makeTeamRequest,
    data: teamData,
    isLoading: isTeamLoading,
    error: teamError,
  } = useRequestData();

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        makeAboutRequest("/about", "GET"),
        makeTeamRequest("/team", "GET"),
      ]);
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
          <a className="group mb-10 inline-flex items-center justify-center gap-2 p-10 text-2xl" href="#">
            <span className="transition-transform duration-200 group-hover:-translate-x-1">Vores ture</span>
            <span className="inline-block origin-center transition-transform duration-200 group-hover:scale-x-170">→</span>
          </a>
        </div>
        </section>

        {/* Lidt om os */}
        <section className="bg-[#FFFFFF]">
          <div className="flex justify-center gap-20 p-25">
            <img src="/images/om-os.jpg" alt="" />

            <div className="grid justify-center gap-4 p-10 w-[40%]">
              <h1 className="text-5xl font-extrabold">Lidt om os</h1>
              <h2 className="text-[#01B3a7] text-2xl">{aboutData?.title}</h2>
              <div className="relative h-0.5 w-full bg-gray-300">
                <span className="absolute inset-y-0 left-0 w-1/2 scale-y-200 bg-[#01B3a7]" />
              </div>
              <p>
                {aboutData?.content?.replace(/<[^>]*>/g, '') ?? ""}
                </p>
              <button type="button" onClick={() => window.location.href = "/contact"} className="inline-block bg-[#01B3a7] hover:bg-[#018d83] text-[#FFFFFF] p-4 w-[40%]">Kontakt os</button>
            </div>

          </div>
        </section>

        <Members teamData={teamData} />

        {/* nyhedsbrev */}

      {(isAboutLoading || isTeamLoading) && <p>Loader...</p>}
      {(aboutError || teamError) && <p>Der opstod en fejl</p>}
    </main>
  );
}
