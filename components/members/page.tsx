// Beskriver hvilke felter hvert teammedlem skal have fra API'et.
type Member = {
  _id: string
  name: string
  role: string
  phone: string
  image: string
}

// Beskriver de props, som komponenten modtager fra forsiden.
type MembersProps = {
  teamData: Member[] | null
}

const Members = ({ teamData }: MembersProps) => {
  // API-serveren leverer team-billeder fra denne mappe.
  const getImageUrl = (image: string) =>
    `${process.env.NEXT_PUBLIC_API_URL}/images/team/${image}`

  // De ID'er, der bestemmer hvilke teammedlemmer der skal vises.
  const members = [
    "617f7ec2066b123e4c7c9411",
    "617f7ef2066b123e4c7c9413",
    "617f7f19066b123e4c7c9415",
    "617f7f3b066b123e4c7c9417",
  ]
    // Finder hvert medlem i dataene fra /team ud fra medlemmets ID.
    .map((memberId) => teamData?.find((member) => member._id === memberId))
    // Fjerner medlemmer, som endnu ikke er hentet eller ikke findes i API-svaret.
    .filter((member): member is Member => Boolean(member))

  return (

    // Sektionen indeholder overskriften og alle teamkortene.

    <section className="bg-[#FFFFFF]">
      <h1 className="text-center text-5xl font-extrabold p-3">Vores team</h1>
      <div className="flex flex-wrap justify-center gap-5 p-10">
        {/* Laver ét kort for hvert fundet teammedlem. */}

        {members.map((member) => (

          // key hjælper React med at holde styr på de enkelte kort.
          <div className="member-card" key={member._id}>
            
            {/* Billedet hentes fra API-serverens public-mappe. */}
            <img className="absolute -top-12 h-24 w-24 rounded-full object-cover" src={getImageUrl(member.image)} alt={member.name} />
            {/* Viser data fra API'et i stedet for hardcoded tekst. */}
            <b className="text-2xl">{member.name}</b>
            <p className="mt-2 text-m text-[#01B3A7]">{member.role}</p>
            <strong className="mt-2 text-xl font-normal">{member.phone}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Members
