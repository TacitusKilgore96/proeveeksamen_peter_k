"use client"

import { useState } from "react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData((previousData) => ({ ...previousData, [name]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Kontaktformularen kunne ikke sendes")

      setStatus("success")
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (error) {
      console.error("Fejl ved indsendelse af kontaktformular:", error)
      setStatus("error")
    }
  }

  return (
    <div>
      <div className="mx-auto m-30 max-w-300 p-8">
        <div className="flex items-center gap-10">
          <h2 className="text-center text-5xl font-bold">Kontakt</h2>
          <span aria-hidden="true" className="h-13 w-0.5 self-center rounded-2xl bg-black/10" />
          <p>Skulle du sidde med et spørgsmål eller to, så skriv endelig til os, og vi vil kontakte dig hurtigst muligt.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-3 grid-rows-1 gap-5">
            <input type="text" id="name" name="name" required placeholder="Dit navn" value={formData.name} onChange={handleChange} className="h-full w-full border p-3" />
            <input type="email" id="email" name="email" required placeholder="E-mail" value={formData.email} onChange={handleChange} className="w-full border p-3" />
            <input type="tel" id="phone" name="phone" placeholder="Tlf" value={formData.phone} onChange={handleChange} className="w-full border p-3" />
          </div>

          <textarea id="message" name="message" required rows={5} placeholder="Besked" value={formData.message} onChange={handleChange} className="w-full border p-3" />

          <button type="submit" disabled={status === "sending"} className="mt-2 w-78 cursor-pointer bg-[#01B3A7] py-3 text-base font-bold text-white transition-colors duration-200 hover:bg-[#01968c]">
            {status === "sending" ? "Sender..." : "Send"}
          </button>
        </form>

        {status === "success" && <p className="mt-4 text-[#01B3A7]">Din besked er sendt.</p>}
        {status === "error" && <p className="mt-4 text-red-600">Beskeden kunne ikke sendes. Prøv igen.</p>}
      </div>
    </div>
  )
}

export default Contact