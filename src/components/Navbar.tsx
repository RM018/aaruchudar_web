"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
	const [show, setShow] = useState(true);
	const [activeTab, setActiveTab] = useState('home');
	const [mobileOpen, setMobileOpen] = useState(false);
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

	const navItems = [
		{ id: 'home', label: 'Home', href: '/', icon: '🏠' },
		{ id: 'blog', label: 'Blog', href: '/blog', icon: '📜' },
		{ id: 'research', label: 'Research', href: '/research', icon: '🔬' },
		{ id: 'quiz', label: 'Quiz', href: '/quiz', icon: '🧠' },
		{ id: 'contact', label: 'Contact', href: '/contact', icon: '📧' },
		{ id: 'product', label: 'Product', href: '/productpage', icon: '🛍️' }
	];

	return (
		<>
			{/* Desktop / Large Screen Navbar */}
			<header
				className={`hidden md:block fixed z-[999] left-1/2 -translate-x-1/2 transition-all duration-500 ${
					show ? "top-0" : "-top-28"
				}`}
				role="navigation"
				aria-label="Primary Navigation"
			>
				<div className="max-w-3xl mx-auto bg-gray-900/95 rounded-full px-6 lg:px-8 py-2.5 shadow-2xl border border-white/10 backdrop-blur-lg flex items-center justify-between gap-6">
					<Link href="/" className="flex items-center gap-2 pr-4 border-r border-white/15" aria-label="Home">
						<div className="w-9 h-9 bg-white/90 rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105">
							<Image src="/logo2.png" alt="Aaruchudar logo" width={36} height={36} className="object-cover" />
						</div>
						<span className="text-base font-bold text-white tracking-tight">Aaruchudar&nbsp;</span>
					</Link>

					<nav className="flex items-center gap-3 lg:gap-4" aria-label="Main menu">
						{navItems.map((item) => {
							const isActive = activeTab === item.id;
							return (
								<Link
									key={item.id}
									href={item.href}
									onClick={() => setActiveTab(item.id)}
									className={`relative p-1.5 rounded-full transition-all duration-300 ease-in-out group ${
										isActive
											? 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg shadow-orange-500/40 scale-105'
											: 'hover:bg-gray-800 hover:scale-105'
									}`}
									aria-label={item.label}
									aria-current={isActive ? 'page' : undefined}
								>
									<span className={`text-lg ${isActive ? '' : 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}`}>{item.icon}</span>
									<span className="sr-only">{item.label}</span>
								</Link>
							);
						})}
					</nav>

					<Link
						aria-label="Login"
						className={`relative p-1.5 rounded-full transition-all duration-300 ease-in-out group ${activeTab === 'login' ? 'bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg shadow-blue-500/40 scale-105' : 'hover:bg-gray-800 hover:scale-105'}`}
						href="/login"
						onClick={() => setActiveTab('login')}
					>
						<span className={`text-lg ${activeTab === 'login' ? '' : 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}`}>👤</span>
						<span className="sr-only">Login</span>
					</Link>
				</div>
			</header>

			{/* Mobile Top Bar */}
			<div className={`md:hidden fixed top-0 left-0 right-0 z-[998] transition-transform ${show ? 'translate-y-0' : '-translate-y-full'}`}>
				<div className="flex items-center justify-between bg-gray-900/95 backdrop-blur-md px-4 py-3 border-b border-white/10">
					<Link href="/" className="flex items-center gap-2" aria-label="Home">
						<Image src="/logo2.png" alt="Logo" width={32} height={32} className="rounded-lg" />
						<span className="text-base font-semibold text-white">Aaruchudar</span>
					</Link>
					<div className="flex items-center gap-2">
						<Link href="/login" aria-label="Login" onClick={() => setActiveTab('login')} className={`p-2 rounded-full ${activeTab === 'login' ? 'bg-blue-500/20 text-blue-400' : 'text-white/70 hover:bg-white/10'}`}>👤 </Link>
						<button
							aria-label="Toggle menu"
							aria-expanded={mobileOpen}
							onClick={() => setMobileOpen((o) => !o)}
							className="p-2 rounded-md text-white/80 hover:bg-white/10 active:scale-95 transition"
						>
							{mobileOpen ? '✕' : '☰'}
						</button>
					</div>
				</div>
				{/* Mobile dropdown panel */}
				<div
					className={`bg-gray-900/95 backdrop-blur-md border-b border-white/10 px-4 overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-80 py-4' : 'max-h-0 py-0'}`}
				>
					<nav className="grid grid-cols-2 gap-3" aria-label="Mobile navigation">
						{navItems.map(item => {
							const isActive = activeTab === item.id;
							return (
								<Link
									key={item.id}
									href={item.href}
									onClick={() => { setActiveTab(item.id); setMobileOpen(false); }}
									className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${isActive ? 'bg-orange-500/20 text-orange-400' : 'text-white/70 hover:bg-white/10'}`}
								>
									<span>{item.icon}</span>
									{item.label}
								</Link>
							);
						})}
					</nav>
				</div>
			</div>

			{/* Mobile Bottom Nav */}
			<nav className="md:hidden fixed bottom-0 left-0 right-0 z-[998] bg-gray-900/95 backdrop-blur-md border-t border-white/10 flex justify-around py-2">
				{navItems.map(item => {
					const isActive = activeTab === item.id;
					return (
						<Link
							key={item.id}
							href={item.href}
							onClick={() => setActiveTab(item.id)}
							className={`flex flex-col items-center gap-0 px-2 py-1 rounded-md text-xs font-medium ${isActive ? 'text-orange-400' : 'text-white/60'} active:scale-95`}
							aria-label={item.label}
						>
							<span className={`text-xl leading-none ${isActive ? 'scale-110' : ''}`}>{item.icon}</span>
							<span className="mt-0.5">{item.label}</span>
						</Link>
					);
				})}
			</nav>
		</>
	);
}

export default Navbar;