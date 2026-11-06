export const metadata: Metadata = {
  title: "GodStocks | Institutional Quantitative Trading",
  description: "Algorithmic Precision & Market Telemetry Desk",
  icons: {
    icon: "/logo.png?v=2",
    shortcut: "/logo.png?v=2",
    apple: "/logo.png?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png?v=2" type="image/png" sizes="any" />
        <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      </head>
      <body className="bg-[#090a0c] text-[#f1f5f9] antialiased min-h-screen overflow-x-hidden selection:bg-[#c5a059] selection:text-black">
        {children}
      </body>
    </html>
  );
}