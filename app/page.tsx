"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	CheckCircle,
	Mail,
	Users,
	Zap,
	Shield,
	CreditCard,
	Wallet,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FloatingElements } from "@/components/floating-elements";
import axios from "@/utils/axios";

function DynamicLogo() {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="h-12 w-48" />; // Placeholder to prevent layout shift
	}

	return (
		<Image
			src={theme === "dark" ? "/supashop-logo-gray.png" : "/supashop-logo.png"}
			alt="SupaShop Logo"
			width={200}
			height={60}
			className="h-12 md:h-20 w-auto transition-opacity duration-300"
		/>
	);
}

export default function WaitlistPage() {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [waitlistCount, setWaitlistCount] = useState(1247); // Mock count
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) {
			toast({
				title: "Email Required",
				description: "Please enter your email address to join the waitlist.",
				variant: "destructive",
			});
			return;
		}

		setIsLoading(true);

		try {
			// Simulate API call
			await axios.get(`/waitlist?email=${email}`);

			// Success case
			setIsSubmitted(true);
			setWaitlistCount((prev) => prev + 1);
			setEmail("");

			toast({
				title: "Welcome to the waitlist! 🎉",
				description: "You'll be the first to know when SupaShop launches.",
				className: "border-[#ff7900]",
			});
		} catch (error) {
			// Error case
			toast({
				title: "Something went wrong",
				description: "Failed to join the waitlist. Please try again later.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				// Fetch the current waitlist count from the API
				const response = await axios.get("/waitlist/count");
				console.log(response.data.data.count);
				setWaitlistCount((prev) => prev + response.data.data.count);
			} catch (error) {
				console.error("Failed to fetch waitlist count:", error);
			}
		})();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-black dark:to-gray-900 transition-colors duration-300 relative overflow-hidden">
			{/* Floating Background Elements */}
			<FloatingElements />

			{/* Content Container */}
			<div className="relative z-10">
				{/* Header */}
				<header className="container mx-auto px-4 py-6">
					<div className="flex items-center justify-between">
						<DynamicLogo />
						<ThemeToggle />
					</div>
				</header>

				{/* Main Content */}
				<main className="container mx-auto px-4 py-12">
					<div className="max-w-4xl mx-auto">
						{/* Hero Section */}
						<div className="text-center mb-16">
							<Badge
								variant="outline"
								className="mb-6 px-4 py-2 text-sm font-medium border-[#ff7900] text-[#ff7900] relative z-10">
								Coming Soon
							</Badge>
							<h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 relative z-10">
								The Future of
								<span className="block animated-gradient bg-clip-text text-transparent">
									E-commerce is Here
								</span>
							</h1>
							<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed relative z-10">
								SupaShop is revolutionizing online shopping by bridging Web2 and Web3.
								Experience seamless crypto payments, enhanced security, and the next
								generation of digital commerce.
							</p>

							{/* Waitlist Counter */}
							<div className="flex items-center justify-center gap-2 mb-12 relative z-10">
								<Users className="h-5 w-5 text-[#ff7900]" />
								<span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
									<span className="text-[#ff7900] text-2xl font-bold">
										{waitlistCount.toLocaleString()}
									</span>{" "}
									people already joined
								</span>
							</div>
						</div>

						{/* Waitlist Form */}
						<Card className="max-w-md mx-auto mb-16 shadow-lg border-0 dark:bg-black dark:border-gray-800 relative z-10 backdrop-blur-sm bg-white/80 dark:bg-black/80">
							<CardContent className="p-8">
								{isSubmitted ? (
									<div className="text-center">
										<CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
											You're on the list!
										</h3>
										<p className="text-gray-600 dark:text-gray-200">
											We'll notify you as soon as SupaShop launches.
										</p>
									</div>
								) : (
									<form
										onSubmit={handleSubmit}
										className="space-y-4">
										<div className="text-center mb-6">
											<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
												Join the Waitlist
											</h3>
											<p className="text-gray-600 dark:text-gray-200">
												Be the first to experience the future of e-commerce
											</p>
										</div>

										<div className="relative">
											<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
											<Input
												type="email"
												placeholder="Enter your email address"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												className="pl-10 h-12 border-gray-200 dark:border-gray-800 focus:border-[#ff7900] focus:ring-[#ff7900]"
												required
											/>
										</div>

										<Button
											type="submit"
											disabled={isLoading}
											className="w-full h-12 bg-[#ff7900] hover:bg-[#e66d00] text-white font-semibold relative overflow-hidden group">
											<span className="relative z-10">
												{isLoading ? "Joining..." : "Join Waitlist"}
											</span>
											<div className="absolute inset-0 bg-gradient-to-r from-[#ff7900] to-[#ff9500] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										</Button>

										<p className="text-xs text-gray-500 dark:text-gray-300 text-center">
											We respect your privacy. No spam, ever.
										</p>
									</form>
								)}
							</CardContent>
						</Card>

						{/* Features Grid */}
						<div className="grid md:grid-cols-3 gap-8 mb-16 relative z-10">
							<div className="text-center p-6 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 dark:border-gray-800/50">
								<div className="w-16 h-16 bg-[#ff7900]/10 rounded-full flex items-center justify-center mx-auto mb-4">
									<Wallet className="h-8 w-8 text-[#ff7900]" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Roqqu Wallet Integration
								</h3>
								<p className="text-gray-600 dark:text-gray-200">
									Seamless Web3 wallet integration for secure crypto transactions
								</p>
							</div>

							<div className="text-center p-6 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 dark:border-gray-800/50">
								<div className="w-16 h-16 bg-[#ff7900]/10 rounded-full flex items-center justify-center mx-auto mb-4">
									<CreditCard className="h-8 w-8 text-[#ff7900]" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Dual Payment System
								</h3>
								<p className="text-gray-600 dark:text-gray-200">
									Accept both cryptocurrency and traditional fiat payments
								</p>
							</div>

							<div className="text-center p-6 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 dark:border-gray-800/50">
								<div className="w-16 h-16 bg-[#ff7900]/10 rounded-full flex items-center justify-center mx-auto mb-4">
									<Shield className="h-8 w-8 text-[#ff7900]" />
								</div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
									Enhanced Security
								</h3>
								<p className="text-gray-600 dark:text-gray-200">
									Advanced blockchain security for all your transactions
								</p>
							</div>
						</div>

						{/* About Section */}
						<div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-sm border border-white/20 dark:border-gray-800/50 relative z-10">
							<div className="max-w-3xl mx-auto text-center">
								<Zap className="h-12 w-12 text-[#ff7900] mx-auto mb-6" />
								<h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
									Powered by Apus Industries Limited
								</h2>
								<p className="text-gray-600 dark:text-gray-200 leading-relaxed mb-6">
									We're building the bridge between traditional e-commerce and the
									decentralized future. SupaShop combines the familiarity of Web2
									shopping with the innovation and security of Web3 technology.
								</p>
								<p className="text-gray-600 dark:text-gray-200 leading-relaxed">
									Starting with crypto and fiat payment integration through Roqqu wallet,
									we're laying the foundation for a comprehensive Web3 e-commerce
									ecosystem. More exciting features are coming soon!
								</p>
							</div>
						</div>
					</div>
				</main>

				{/* Footer */}
				<footer className="container mx-auto px-4 py-8 text-center text-gray-500 dark:text-gray-300 relative z-10">
					<p>
						&copy; {new Date().getFullYear()} Apus Industries Limited. All rights
						reserved.
					</p>
				</footer>
			</div>
		</div>
	);
}
