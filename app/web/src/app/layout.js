import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata = {
  title: {
    default: "GreenArt | Controlled Cultivation",
    template: "%s | GreenArt",
  },
  description:
    "GreenArt — premium controlled light cannabis cultivation developed for selected international B2B partners.",
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
