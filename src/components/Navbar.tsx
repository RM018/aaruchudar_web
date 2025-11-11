"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
	const [show, setShow] = useState(true);
	const [activeTab, setActiveTab] = useState('home');
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
		{ id: 'courses', label: 'HI Courses', href: '/hi-courses', icon: '📚' },
		{ id: 'labs', label: 'HI Labs', href: '/hi-labs', icon: '🔬' },
		{ id: 'workshops', label: 'Workshops', href: '/hi-workshops', icon: '⚡' },
		{ id: 'events', label: 'Events', href: '/hi-events', icon: '🎯' },
		{ id: 'quiz', label: 'Quiz', href: '/quiz', icon: '🧠' },
	];

	return (
		<header
			className={`fixed z-[999] left-1/2 -translate-x-1/2 transition-all duration-500 ${
				show ? "top-6" : "-top-28"
			}`}
			role="navigation"
			aria-label="Primary Navigation"
		>
			<div className="bg-gray-900 rounded-full px-96 py-2 shadow-2xl border border-white/10 backdrop-blur-lg flex items-center gap-32">
				{/* Logo + Title */}
				<Link href="/" className="flex items-center gap-8 pr-32 border-r border-white/20">
					<div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105">
						<Image src="/logo2.png" alt="Aaruchudar logo" width={40} height={40} className="object-cover" />
					</div>
					<span className="text-xl font-bold text-white tracking-wide">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span>
				</Link>

				{/* Navigation Icons */}
				<nav className="flex items-center gap-8 pr-24">
					{navItems.map((item) => {
						const isActive = activeTab === item.id;
						
						return (
							<Link
								key={item.id}
								href={item.href}
								onClick={() => setActiveTab(item.id)}
								className={`
									relative p-2 rounded-full transition-all duration-300 ease-in-out group
									${isActive 
										? 'bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg shadow-orange-500/50 scale-110' 
										: 'hover:bg-gray-800 hover:scale-105'
									}
								`}
								aria-label={item.label}
								aria-current={isActive ? 'page' : undefined}
								title={item.label}
							>
								<span className={`text-xl ${isActive ? '' : 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}`}>
									{item.icon}
								</span>
								{/* Tooltip */}
								<span className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
									{item.label}
								</span>
							</Link>
						);
					})}
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
