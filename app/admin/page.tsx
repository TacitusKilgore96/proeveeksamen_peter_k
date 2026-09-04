"use client"

import { useEffect } from "react"
import useRequestData from "@/hooks/useRequestData"

// Beskriver strukturen på én kontakt fra API'et.
type Contact = {
  _id: string
  name: string
  email: string
  phone: string
  message: string
  read: boolean
  received: string
}

type NewsSubscription = {
  _id: string
  email: string
}

const Admin = () => {
  // Hooken håndterer API-kald, data, loading og fejl.
  const { makeRequest, data, isLoading, error } = useRequestData()
  const {
    makeRequest: makeSubscriptionRequest,
    data: subscriptionData,
    isLoading: isSubscriptionLoading,
    error: subscriptionError,
  } = useRequestData()

  // Henter alle kontakter fra admin-endpointet.
  const loadContacts = () => makeRequest("/contact/admin", "GET")
  const loadSubscriptions = () => makeSubscriptionRequest("/newssubscription/admin", "GET")

  // Henter kontakter automatisk, når admin-siden åbnes.
  useEffect(() => {
    loadContacts()
    loadSubscriptions()
  }, [])

  // Skifter kontaktens read-status mellem læst og ulæst.
  const handleReadChange = async (contact: Contact) => {
    // PATCH opdaterer kun read-feltet på den valgte kontakt.
    await makeRequest(`/contact/admin/${contact._id}`, "PATCH", {
      body: { read: !contact.read },
    })
    // Henter listen igen, så den nye status vises.
    await loadContacts()
  }

  // Sletter en kontakt efter brugerens bekræftelse.
  const handleDelete = async (contactId: string) => {
    if (!window.confirm("Er du sikker på, at kontakten skal slettes?")) return

    // DELETE fjerner kontakten fra databasen.
    await makeRequest(`/contact/admin/${contactId}`, "DELETE")
    // Opdaterer listen efter sletningen.
    await loadContacts()
  }

  const handleDeleteSubscription = async (subscriptionId: string) => {
    if (!window.confirm("Er du sikker på, at abonnementet skal slettes?")) return

    await makeSubscriptionRequest(`/newssubscription/admin/${subscriptionId}`, "DELETE")
    await loadSubscriptions()
  }

  // Sikrer, at data altid behandles som en liste.
  const contacts = (data ?? []) as Contact[]
  const subscriptions = (subscriptionData ?? []) as NewsSubscription[]

  return (
    <section className="">
        <div className="grid justify-center bg-[#01B3a7] w-full">

            {/* kontaktlisten. */}

            <div className="grid gap-5 bg-[#F7F7F7] p-5">
                {isLoading && <p>Henter kontakter...</p>}
                {error && <p>Kontakterne kunne ikke hentes.</p>}

                <h1 className="text-5xl text-center font-extrabold">Kontaktlisten</h1>
                <h2 className="text-xl text-center font-extrabold">Data for alle indsendte kontaktformulare vises her</h2>

                {/* Opretter ét kort for hver kontakt fra API'et. */}

                {!isLoading && !error && contacts.map((contact) => (

                  // _id bruges som en unik key til React.
                  <article className="bg-white p-5 shadow-sm" key={contact._id}>

                    {/* Kontaktens data vises fra API'et. */}

                    <h2 className="text-xl font-bold">{contact.name}</h2>
                    <p>{contact.email}</p>
                    <p>{contact.phone}</p>
                    <p className="mt-3">{contact.message}</p>
                    <p className="mt-3 text-sm text-gray-500">
                      {new Date(contact.received).toLocaleString("da-DK")}
                    </p>

                    {/* Knapper til at ændre status eller slette kontakten. */}

                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleReadChange(contact)}
                        className="bg-[#01B3A7] px-4 py-2 text-white hover:bg-[#018d83]"
                      >
                        Markér som {contact.read ? "ulæst" : "læst"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(contact._id)}
                        className="bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                      >
                        Slet
                      </button>
                    </div>
                  </article>
                ))}
            </div>

            <div className="grid gap-5 bg-[#F7F7F7] p-5">
              <h1 className="text-center text-5xl font-extrabold">Nyhedsbrev</h1>
              <h2 className="text-center text-xl font-extrabold">Tilmeldte emailadresser</h2>
              {isSubscriptionLoading && <p>Henter abonnementer...</p>}
              {subscriptionError && <p>Abonnementerne kunne ikke hentes.</p>}
              {!isSubscriptionLoading && !subscriptionError && subscriptions.map((subscription) => (
                <article className="flex items-center justify-between bg-white p-5 shadow-sm" key={subscription._id}>
                  <p>{subscription.email}</p>
                  <button
                    type="button"
                    onClick={() => handleDeleteSubscription(subscription._id)}
                    className="bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Slet
                  </button>
                </article>
              ))}
            </div>
        </div>
    </section>
  )
}

export default Admin