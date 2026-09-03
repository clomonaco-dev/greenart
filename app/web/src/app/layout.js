import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

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
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
