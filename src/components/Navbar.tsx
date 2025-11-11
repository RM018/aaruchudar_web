"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
	const [show, setShow] = useState(true);
	const [menuOpen, setMenuOpen] = useState(false);
	const lastScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
				setShow(false);
			} else {
				setShow(true);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = ["Home", "Blog", "Research", "About", "Know Us!"];

	return (
		<header
			className={`fixed z-[999] w-full left-0 right-0 px-6 md:px-24 lg:px-32 py-3 flex items-center transition-all duration-500 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] border-b border-white/10 backdrop-blur-lg shadow-sm ${
				show ? "top-0" : "-top-28"
			}`}
			role="navigation"
			aria-label="Primary Navigation"
		>
			<div className="max-w-[1200px] w-full mx-auto flex items-center justify-between">
				{/* Logo + Title */}
				<div className="flex items-center gap-3">
					<Link href="/" className="flex items-center gap-3">
						<div className="w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105">
							<Image src="/logo2.png" alt="Aaruchudar logo" width={40} height={40} className="object-cover" />
						</div>
						<span className="text-xl font-bold text-white tracking-wide">Aaruchudar</span>
					</Link>
				</div>

				{/* Desktop nav + scroll buttons */}
				<nav className="hidden md:flex items-center gap-8">
					<div className="flex gap-8 items-center">
						{navItems.map((item, idx) => (
							<div key={idx} className="relative group">
								<Link
									href="#"
									className="font-semibold text-base px-5 py-2 rounded-lg transition-all duration-300 text-[#e5e5e5] bg-[rgba(255,255,255,0.05)] hover:bg-white hover:text-black hover:-translate-y-0.5"
								>
									{item}
								</Link>
								<div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
							</div>
						))}
					</div>

					<div className="flex gap-3 ml-6">
						<button
							aria-label="Scroll Up"
							className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-all duration-300 hover:scale-110 shadow-lg"
							onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						>
							<span className="text-xl font-bold">↑</span>
						</button>
						<button
							aria-label="Scroll Down"
							className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-all duration-300 hover:scale-110 shadow-lg"
							onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
						>
							<span className="text-xl font-bold">↓</span>
						</button>
					</div>
				</nav>

				{/* Mobile: hamburger */}
				<div className="md:hidden flex items-center">
					<button
						aria-label="Toggle menu"
						aria-expanded={menuOpen}
						onClick={() => setMenuOpen((s) => !s)}
						className="p-2 bg-white/90 rounded-md shadow-sm"
					>
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 6H20" stroke="black" strokeWidth="2" strokeLinecap="round" />
							<path d="M4 12H20" stroke="black" strokeWidth="2" strokeLinecap="round" />
							<path d="M4 18H20" stroke="black" strokeWidth="2" strokeLinecap="round" />
						</svg>
					</button>
				</div>
			</div>

			{/* Mobile menu panel */}
			<div className={`md:hidden w-full bg-[#111]/90 backdrop-blur-sm transition-max-h duration-300 overflow-hidden ${menuOpen ? "max-h-96" : "max-h-0"}`}>
				<div className="max-w-[1200px] w-full mx-auto px-6 py-4 flex flex-col gap-3">
					{navItems.map((item, idx) => (
						<Link
							key={idx}
							href="#"
							className="block px-4 py-2 rounded-md text-[#e5e5e5] bg-[rgba(255,255,255,0.02)] hover:bg-white hover:text-black transition-colors"
							onClick={() => setMenuOpen(false)}
						>
							{item}
						</Link>
					))}
				</div>
			</div>
		</header>
	);
}

export default Navbar;
