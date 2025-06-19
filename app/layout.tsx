import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "SupaShop - The Future of E-commerce",
	description:
		"Join the waitlist for SupaShop, bridging Web2 and Web3 e-commerce",
	icons: {
		icon: {
			url: "/favicon.png",
			type: "image/x-icon",
		},
		apple: {
			url: "/favicon.png",
			type: "image/png",
		},
		shortcut: {
			url: "/favicon.png",
			type: "image/png",
		},
	},
	openGraph: {
		title: "SupaShop - The Future of E-commerce",
		description:
			"Join the waitlist for SupaShop, bridging Web2 and Web3 e-commerce",
		siteName: "SupaShop",
		images: [
			{
				url: "/favicon.png",
				width: 1200,
				height: 630,
				alt: "SupaShop - The Future of E-commerce",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "SupaShop - The Future of E-commerce",
		description:
			"Join the waitlist for SupaShop, bridging Web2 and Web3 e-commerce",
		images: ["/favicon.png"],
		creator: "@joinsupashop",
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		noarchive: false,
		nosnippet: false,
		noimageindex: false,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
