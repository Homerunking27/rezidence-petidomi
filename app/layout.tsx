import "./globals.css";

export const metadata = {
  title: "Rezidence Pětidomí",
  description: "Pět bytů v Suchém Vrbném, České Budějovice."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}
