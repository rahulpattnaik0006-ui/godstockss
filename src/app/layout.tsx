import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      </head>
      <body className="bg-[#090a0c] text-[#f1f5f9] antialiased min-h-screen overflow-x-hidden selection:bg-[#c5a059] selection:text-black">
        {children}
      </body>
    </html>
  );
}