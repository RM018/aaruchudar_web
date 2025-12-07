"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = `mailto:hello@aaruchudar.com?subject=Contact from ${encodeURIComponent(
    name || "Anonymous"
  )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-indigo-50 pt-16 md:pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6 py-10 md:px-10 lg:px-16">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 mt-2">
            Have questions or want to collaborate? Send us a message and we’ll get back to you.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white/90 shadow-md backdrop-blur-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = mailtoHref;
            }}
            className="space-y-4 p-6 md:p-8"
          >
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 rounded-md px-3 py-2 bg-white text-gray-900 placeholder:text-gray-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 rounded-md px-3 py-2 bg-white text-gray-900 placeholder:text-gray-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-1" htmlFor="message">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 rounded-md px-3 py-2 bg-white text-gray-900 placeholder:text-gray-400 min-h-32"
                placeholder="How can we help?"
              />
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                Send
              </button>
              <a href={mailtoHref} className="text-sm text-indigo-700 hover:text-indigo-800 underline">
                Or email us directly
              </a>
            </div>
          </form>
        </div>

        <div className="mt-8 text-sm text-gray-700">
          <p><span className="font-medium">Email:</span> hello@aaruchudar.com</p>
          <p><span className="font-medium">Phone:</span> +91 00000 00000</p>
          <p><span className="font-medium">Address:</span> Chennai, India</p>
        </div>
      </div>
    </section>
  );
}
