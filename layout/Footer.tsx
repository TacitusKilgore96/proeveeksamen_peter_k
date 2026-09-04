"use client"

import { useEffect } from "react";
import useRequestData from "@/hooks/useRequestData";

const Footer = () => {
    const { makeRequest, data, isLoading, error } = useRequestData();

    useEffect(() => {
        makeRequest("/footer", "GET");
    }, []);

    if (isLoading) return <footer>Loading...</footer>
    if (error) return <footer>Kunne ikke hente footer-data</footer>

    const footerData = data ?? {};

  return (
    <footer className="bg-[#162E44] text-[#FFFFFF]">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 px-5 py-14 sm:flex-row sm:gap-20">
            
            {/* KONTAKT */}
          <div className="grid gap-4 [&_img]:h-7 [&_img]:w-7 [&_p]:text-l [&_p]:font-bold">
                <h2 className="text-xl font-bold uppercase">Kontakt</h2>
            <div className="flex items-center gap-4">
              <img src="/phone-solid-full(1).svg" alt="telefon" />
              <p>{data?.phone ?? "Ikke tilgængelig"}</p>
            </div>
            <div className="flex items-center gap-4">
              <img src="/images/envelope-solid-full.svg" alt="mail" />
              <p>{data?.email ?? "Ikke tilgængelig"}</p>
            </div>
            <div className="flex items-center gap-4">
              <img src="/images/location-arrow-solid-full.svg" alt="lokation" />
              <p>{data?.address ?? "Ikke tilgængelig"}</p>
            </div>
          </div>

          {/* HURTIGE LINKS */}
          <div className="grid gap-4">
            <h2 className="font-bold uppercase text-xl">Hurtige links</h2>
            <ul className="m-0 grid list-disc grid-flow-col grid-cols-2 grid-rows-3 gap-x-12 gap-y-2 pl-4 text-l font-bold marker:text-[#01B3a7]">
              <a href="#">
                <li>Rumfærgen</li>
              </a>
              <a href="#">
                <li>Ture</li>
              </a>
              <a href="#">
                <li>Vores team</li>
              </a>
              <a href="#">
                <li>Galleri</li>
              </a>
              <a href="#">
                <li>Sikkerhed</li>
              </a>
            </ul>
            <button type="button" onClick={() => window.location.href = "/contact"} className="w-fit bg-[#01B3a7] px-7 py-3 text-sm hover:bg-[#018d83]">Kontakt</button>
          </div>
          </div>

      <div className="relative bg-[#11263A] py-8 h-[110%]">
        <div className="mx-auto flex max-w-6xl items-center justify-center">
        <p className="absolute left-0 text-sm opacity-30 ml-[15%]">© 2021 Space Venture. All rights reserved.</p>
        <div className="flex gap-3 [&_a]:items-center [&_a]:justify-center [&_img]:h-8 [&_img]:opacity-30 [&_img]:transition-[height,opacity] [&_img]:duration-200 [&_img]:hover:h-4 [&_img]:hover:opacity-100">
            <a href="#"><img className="brightness-0 invert" src="/images/social_icons/facebook-f-brands-solid-full(1).svg" alt="facebook" /></a>
            <a href="#"><img className="brightness-0 invert" src="/images/social_icons/twitter-brands-solid-full(1).svg" alt="twitter" /></a>
            <a href="#"><img className="brightness-0 invert" src="/images/social_icons/google-plus-g-brands-solid-full.svg" alt="googleplus" /></a>
            <a href="#"><img className="brightness-0 invert" src="/images/social_icons/instagram-brands-solid-full(1).svg" alt="instagram" /></a>
          </div>
        </div>
        <button
          type="button"
          aria-label="Gå til toppen"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute right-10 top-1/3 h-15 w-15 -translate-y-6 bg-[#01B3a7] p-5 text-2xl font-extrabold hover:bg-[#018d83] cursor-pointer"
        >
          ⌃
        </button>
      </div>
    </footer>
  )
}

export default Footer