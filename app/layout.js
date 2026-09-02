import "./globals.css";

export const metadata = {
  title: {
    default: "GreenArt",
    template: "%s | GreenArt",
  },
  description:
    "GreenArt — Technology, cultivation, quality and international B2B partnerships.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
