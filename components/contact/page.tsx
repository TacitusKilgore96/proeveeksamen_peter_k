"use client"

import { useState } from 'react'


const contact = () => {

  /* samlet tilstand (state) til formularens felter */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  /* Holder styr på om formularen er klar, sender, lykkedes eller fejlede. */
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  
  /* Event handler. Kører hver gang brugeren skriver et bogstav i et af felterne. */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    /* e.target er det inputfelt, der lige er blevet ændret på. */
    /* 'name' er feltets navn (f.eks. "email"), og 'value'. er det, brugeren har indtastet. */
    const { name, value } = e.target

    /* 'formData' opdateres ved at bevare de gamle felter (...prev) */
    /* og kun overskrive det specifikke felt ([name]: value), som brugeren er i gang med at udfylde. */
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  /* Kører når brugeren trykker på "Send"-knappen. */
  const handleSubmit = async (e: React.FormEvent) => {
    /* Forhindrer browseren i at genindlæse siden efter submit. */
    e.preventDefault()

    /* Viser brugeren, at requesten er i gang. */
    setStatus('sending')

    try {
      /* Sender formularens data til API'ets POST /contact endpoint. */
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        /* POST opretter en ny kontaktbesked i databasen. */
        method: 'POST',
        /* Fortæller backend, at body indeholder JSON. */
        headers: {
          'Content-Type': 'application/json',
        },
        /* Konverterer JavaScript-objektet til JSON, som kan sendes over HTTP. */
        body: JSON.stringify(formData),
      })

      /* response.ok er true ved HTTP-status 200-299. */
      if (!response.ok) {
        throw new Error('Kontaktformularen kunne ikke sendes')
      }

      /* Viser succes og rydder felterne efter en vellykket POST. */
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      /* Fanger netværksfejl og fejlstatusser fra API'et. */
      console.error('Fejl ved indsendelse af kontaktformular:', error)
      setStatus('error')
    }
  }

  return (


    <div>

      <div className="mx-auto max-w-300 p-8 m-30">
      <div className='flex gap-10 items-center mb-10'>
        <h2 className="text-2xl font-bold text-center text-5xl">Kontakt</h2>
        <span aria-hidden="true" className="h-13 w-0.5 rounded-2xl self-center bg-black/10" />
        <p>Skulle du side med et spørgsmål eller to, så skriv endelig til os og vi vil kontakte dig hurtigst muligt.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Navn */}
        <div className='grid-rows-1 grid-cols-3 grid gap-5'>
          <div className="flex flex-col gap-1.5">
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Dit navn"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-full border p-3"
            />
          </div>
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3"
            />
          </div>
          {/* Telefon */}
          <div className="flex flex-col gap-1.5">
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Tlf"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3"
            />
          </div>
        </div>

        {/* Besked */}
        <div className="flex flex-col gap-1.5">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Besked"
            value={formData.message}
            onChange={handleChange}
            className="w-full border p-3"
          />
        </div>

        {/* Send Knap */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-2 w-78 cursor-pointer bg-[#01B3A7] py-3 text-base font-bold text-white transition-colors duration-200 hover:bg-[#01968c]"
        >
          {status === 'sending' ? 'Sender...' : 'Send'}
        </button>
      </form>
      {status === 'success' && <p className="mt-4 text-[#01B3A7]">Din besked er sendt.</p>}
      {status === 'error' && <p className="mt-4 text-red-600">Beskeden kunne ikke sendes. Prøv igen.</p>}
    </div>

    </div>
  )
}

export default contact
