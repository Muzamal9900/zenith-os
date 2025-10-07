"use client"

import type React from "react"
import { useState } from "react"

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false)
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="mx-auto max-w-xl px-4 md:px-6 py-12 md:py-20">
      <h1 className="text-3xl md:text-4xl font-semibold text-foreground">Request a Framework Demo</h1>
      <p className="mt-3 text-sm md:text-base text-muted-foreground">
        See the skeleton in action and discuss your path: License & Build or White‑Label Delivered.
      </p>

      {submitted ? (
        <div className="mt-6 rounded-lg border border-border p-4">
          <div className="text-sm font-medium text-foreground">Thanks—your request has been recorded.</div>
          <p className="mt-2 text-sm text-muted-foreground">We’ll reach out shortly to coordinate next steps.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <input
            required
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            placeholder="Full name"
          />
          <input
            required
            type="email"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            placeholder="Work email"
          />
          <input className="rounded-md border border-border bg-background px-3 py-2 text-sm" placeholder="Company" />
          <select className="rounded-md border border-border bg-background px-3 py-2 text-sm">
            <option>License & Build (DIY)</option>
            <option>White‑Label Delivered</option>
          </select>
          <textarea
            rows={4}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
            placeholder="Notes or goals for the demo"
          />
          <button className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium">
            Submit
          </button>
        </form>
      )}
    </main>
  )
}
