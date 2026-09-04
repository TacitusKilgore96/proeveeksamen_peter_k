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
    <footer className='bg-[#162E44] text-[#FFFFFF]'>
          <div className='flex justify-around p-10'>

          <div className="[&_img]:h-5">
                <h2 className='uppercase text-xl'>Kontakt</h2>
            <div className="flex">
              <img src="/phone-solid-full(1).svg" alt="telefon" />
              <p>{data?.phone ?? "Ikke tilgængelig"}</p>
            </div>
            <div className="flex">
              <img src="/images/envelope-solid-full.svg" alt="mail" />
              <p>{data?.email ?? "Ikke tilgængelig"}</p>
            </div>
            <div className="flex">
              <img src="/images/location-arrow-solid-full.svg" alt="lokation" />
              <p>{data?.address ?? "Ikke tilgængelig"}</p>
            </div>
          </div>
          <div>
            <h2 className='uppercase'>Hurtig Links</h2>
            <ul className="list-disc marker:text-[#01B3a7] grid grid-flow-col grid-rows-3 grid-cols-2 gap-x-10 gap-y-1 m-0 pl-4">
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
            <a href="/contact" className="inline-block bg-[#01B3a7] p-5 hover:bg-[#018d83]">Kontakt</a>
          </div>
          </div>

      <div className='bg-[#11263A] p-5'> 
        <p className="opacity-30">© 2021 Space Venture. All rights reserved.</p>
        <div className="flex justify-center gap-5 [&_a]:flex [&_a]:h-9 [&_a]:w-9 [&_a]:items-center [&_a]:justify-center [&_img]:h-7 [&_img]:opacity-30 [&_img]:transition-[height,opacity] [&_img]:duration-200 [&_img]:hover:h-9 [&_img]:hover:opacity-100">
            <a href="#"><img className="brightness-0 invert" src="/images/social_icons/facebook-f-brands-solid-full(1).svg" alt="facebook" /></a>
            <a href="#"><img className="brightness-0 invert" src="/images/social_icons/twitter-brands-solid-full(1).svg" alt="twitter" /></a>
            <a href="#"><img className="brightness-0 invert" src="/images/social_icons/google-plus-g-brands-solid-full.svg" alt="googleplus" /></a>
            <a href="#"><img className="brightness-0 invert" src="/images/social_icons/instagram-brands-solid-full(1).svg" alt="instagram" /></a>
          </div>
      </div>
    </footer>
  )
}

export default Footer
