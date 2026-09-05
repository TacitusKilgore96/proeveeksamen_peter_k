"use client"
import { useEffect } from "react"
import useRequestData from "@/hooks/useRequestData"

type GalleryItem = {
  _id: string
  imagetext: string
  image: string
}

const Rumfaergen = () => {

  const {
      makeRequest: makeGalleryRequest,
      data: galleryData,
      isLoading: isGalleryLoading,
      error: galleryError,
    } = useRequestData();

  const gallery = (galleryData ?? []) as GalleryItem[];
  const getImageUrl = (image: string) =>
    `${process.env.NEXT_PUBLIC_API_URL}/images/gallery/${image}`;

    useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        makeGalleryRequest("/gallery", "GET"),
      ]);
    };

    loadData();
  }, []);

  return (

    <div>
      {/* hero */}
      <div className="relative">
          <img className="block h-110 w-full object-cover" src="/images/banner-spaceship.jpg" alt="" />
          
          <div className="absolute inset-x-0 top-1/2 text-center text-[#FFFFFF]">
            <h1 className="uppercase text-5xl font-extrabold">Rumfærgen</h1>
          </div>

        </div>
        
        {/* main Content */}
        <div className="flex justify-center gap-20 p-25">
            <img className="object-contain w-auto h-auto" src="/images/om-os.jpg" alt="" />

            <div className="max-w-170 grid gap-5">
              <h1 className="text-7xl text-[#98989850]">Hvorfor vælge os?</h1>
              <h2 className="text-[#01B3a7] text-2xl uppercase">top hastighed: 1.000.000 KM/T</h2>
              <div className="relative h-0.5 w-full bg-gray-300">
                <span className="absolute inset-y-0 left-0 w-1/2 scale-y-200 bg-[#01B3a7]" />
              </div>
              <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                 eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                  voluptas sit aspernatur aut
                  <br /><br />
                   odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                   quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.</p>
            </div>

          </div>

        {/* Galleri */}
        <div>
          <h1 className="text-center text-5xl font-extrabold p-10">Galleri</h1>
          {isGalleryLoading && <p>Henter billeder...</p>}
          {galleryError && <p>Galleriet kunne ikke hentes.</p>}
          <div className="grid grid-cols-4 gap-5">
            {!isGalleryLoading && !galleryError && gallery.slice(0, 4).map((item) => (
              <figure key={item._id}>
                <img
                  className="h-64 w-full object-cover"
                  src={getImageUrl(item.image)}
                  alt={item.imagetext}
                />
              </figure>
            ))}
          </div>

        </div>

    </div>
    
  )
}

export default Rumfaergen