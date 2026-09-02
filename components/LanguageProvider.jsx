"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { translations } from "@/data/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("greenart-language");

    if (stored && translations[stored]) {
      setLanguageState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  function setLanguage(nextLanguage) {
    if (!translations[nextLanguage]) return;

    setLanguageState(nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.localStorage.setItem("greenart-language", nextLanguage);
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t(key) {
        return translations[language]?.[key] ?? translations.en[key] ?? key;
      },
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
