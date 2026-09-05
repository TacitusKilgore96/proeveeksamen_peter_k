"use client"

import { useEffect, useState } from "react";
import useRequestData from "@/hooks/useRequestData";
import Members from "@/components/members/page";

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [unsubscribeEmail, setUnsubscribeEmail] = useState("");
  const [unsubscribeStatus, setUnsubscribeStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const {
    makeRequest: makeAboutRequest,
    data: aboutData,
    isLoading: isAboutLoading,
    error: aboutError,
  } = useRequestData();

  const handleNewsletterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterStatus("sending");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/newssubscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      if (!response.ok) throw new Error("Nyhedsbrev kunne ikke tilmeldes");

      setNewsletterEmail("");
      setNewsletterStatus("success");
    } catch (error) {
      console.error("Fejl ved tilmelding til nyhedsbrev:", error);
      setNewsletterStatus("error");
    }
  };

  const handleUnsubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUnsubscribeStatus("sending");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/newssubscription/afmeld/${encodeURIComponent(unsubscribeEmail)}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Afmelding kunne ikke gennemføres");

      setUnsubscribeEmail("");
      setUnsubscribeStatus("success");
    } catch (error) {
      console.error("Fejl ved afmelding af nyhedsbrev:", error);
      setUnsubscribeStatus("error");
    }
  };
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
    <main className="bg-[#FFFFFF]">

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
            <img className="object-contain" src="/images/om-os.jpg" alt="" />

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

        {/* Nyhedsbrev */}

        <section className="relative flex h-110 items-center justify-center overflow-hidden bg-[url(/images/newsmail-bg.jpg)] bg-cover bg-right-bottom mt-15 mb-15 before:absolute before:inset-0 before:bg-black/35">
          <div className="relative z-10 isolate flex h-95 w-full items-center justify-center overflow-hidden bg-[url(/images/newsmail-bg.jpg)] bg-cover bg-center p-15 text-center before:absolute before:inset-0 before:z-0 before:bg-black/35">
            <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-4">
              <h1 className="text-5xl font-extrabold text-[#FFFFFF]">Tilmeld dig og få 25% rabat</h1>
              <p className="text-[#ffffffb5] p-5 text-l font-bold">Tilmeld dig vores nyhedsbrev og få 25% rabat på din første tur!</p>
              <form onSubmit={handleNewsletterSubmit} className="flex w-[70%] gap-4">
                <input
                  className="min-w-0 flex-1 bg-[#ffffff47] px-5 py-3 text-l font-bold placeholder:text-[#FFFFFF]"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  placeholder="Din E-mail"
                />
                <button type="submit" disabled={newsletterStatus === "sending"} className="w-[30%] shrink-0 bg-[#01B3A7] font-bold text-l text-[#FFFFFF]">
                  {newsletterStatus === "sending" ? "Sender..." : "Tilmeld"}
                </button>
              </form>
              {newsletterStatus === "success" && <p className="text-[#FFFFFF]">Du er nu tilmeldt.</p>}
              {newsletterStatus === "error" && <p className="text-red-200">Tilmeldingen kunne ikke gennemføres.</p>}
              <form onSubmit={handleUnsubscribe} className="flex items-center gap-2 text-sm text-white">
                <input
                  className="bg-white/20 p-3 placeholder:text-white"
                  type="email"
                  required
                  value={unsubscribeEmail}
                  onChange={(event) => setUnsubscribeEmail(event.target.value)}
                  placeholder="Email til afmelding"
                />
                <button type="submit" disabled={unsubscribeStatus === "sending"} className="p-3 bg-red-400">
                  {unsubscribeStatus === "sending" ? "Afmelder..." : "Afmeld"}
                </button>
              </form>
              {unsubscribeStatus === "success" && <p className="text-[#FFFFFF]">Du er afmeldt.</p>}
              {unsubscribeStatus === "error" && <p className="text-red-200">Emailen blev ikke fundet.</p>}
            </div>
          </div>
        </section>

        {/* nyhedsbrev */}

      {(isAboutLoading || isTeamLoading) && <p>Loader...</p>}
      {(aboutError || teamError) && <p>Der opstod en fejl</p>}
    </main>
  );
}
