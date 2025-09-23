import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage, type LanguageType } from "../store/slices/languageSlice";

export default function LanguageSwitcher() {
  const language = useSelector((state: any) => state.language.current) as LanguageType;
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value as LanguageType));
  };

  const texts: Record<LanguageType, { greeting: string }> = {
    en: { greeting: "Rikkei Academy" },
    vi: { greeting: "Học viện Rikkei " },
  };

  return (
    <div style={{ padding: "20px" }}>
      <p>{texts[language].greeting}</p>
      <select value={language} onChange={handleChange}>
        <option value="en">English</option>
        <option value="vi">Tiếng Việt</option>
      </select>
    </div>
  );
}
