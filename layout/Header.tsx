

const Header = () => {
  return (
    <div className='bg-[#162E44] text-[#FFFFFF]'>
      <div className='bg-[#FFFFFF] text-black h-17.5 flex items-center'>
        <div className="max-w-6xl w-full mx-auto px-5">
          <img className="h-5.5" src="/images/logo.png" alt="" />
        </div>
      </div>

          <div className="flex justify-between items-center max-w-6xl w-full mx-auto h-17.5 text-xl font-extrabold">

            <div className="text-[#dbd9d9] capitalize flex gap-0 justify-center h-full [&_a]:relative [&_a]:flex [&_a]:items-center [&_a]:px-5 [&_a]:before:absolute [&_a]:before:top-0 [&_a]:before:left-0 [&_a]:before:h-0.75 [&_a]:before:w-full [&_a]:before:bg-[#01B3A7] [&_a]:before:content-[''] [&_a]:before:opacity-0 [&_a]:hover:bg-white/20 [&_a]:transition-colors [&_a]:hover:before:opacity-100 [&_a]:hover:before:animate-wiggle-border">
                <a href="#">hjem</a>
                <a href="#">rumfærgen</a>
                <a href="#">ture</a>
                <a href="#">galleri</a>
                <a href="#">sikkerhed</a>
                <a href="/contact">kontakt</a>
          </div>

          <div className="flex justify-center gap-5">
            <a className="group flex h-9 w-9 items-center justify-center" href="#"><span aria-label="facebook" role="img" className="h-7 w-7 bg-white transition-colors duration-200 group-hover:bg-[#01B3A7]" style={{ maskImage: "url('/images/social_icons/facebook-f-brands-solid-full(1).svg')", WebkitMaskImage: "url('/images/social_icons/facebook-f-brands-solid-full(1).svg')", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center", maskSize: "contain", WebkitMaskSize: "contain" }} /></a>
            <a className="group flex h-9 w-9 items-center justify-center" href="#"><span aria-label="twitter" role="img" className="h-7 w-7 bg-white transition-colors duration-200 group-hover:bg-[#01B3A7]" style={{ maskImage: "url('/images/social_icons/twitter-brands-solid-full(1).svg')", WebkitMaskImage: "url('/images/social_icons/twitter-brands-solid-full(1).svg')", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center", maskSize: "contain", WebkitMaskSize: "contain" }} /></a>
            <a className="group flex h-9 w-9 items-center justify-center" href="#"><span aria-label="googleplus" role="img" className="h-7 w-7 bg-white transition-colors duration-200 group-hover:bg-[#01B3A7]" style={{ maskImage: "url('/images/social_icons/google-plus-g-brands-solid-full.svg')", WebkitMaskImage: "url('/images/social_icons/google-plus-g-brands-solid-full.svg')", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center", maskSize: "contain", WebkitMaskSize: "contain" }} /></a>
            <a className="group flex h-9 w-9 items-center justify-center" href="#"><span aria-label="instagram" role="img" className="h-7 w-7 bg-white transition-colors duration-200 group-hover:bg-[#01B3A7]" style={{ maskImage: "url('/images/social_icons/instagram-brands-solid-full(1).svg')", WebkitMaskImage: "url('/images/social_icons/instagram-brands-solid-full(1).svg')", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center", maskSize: "contain", WebkitMaskSize: "contain" }} /></a>
          </div>

        </div>
      </div>
  )
}

export default Header
