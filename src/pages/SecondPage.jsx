import React, { useMemo, useState } from "react";
import { validatePesel } from "../utils/validatePesel";

const SecondPage = () => {
  const [input, setInput] = useState("");
  const info = useMemo(() => validatePesel(input), [input]);

  const displayDate = (d) => {
    if (!d) return "—";
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    const weekday = d.toLocaleDateString("pl-PL", {
      weekday: "long",
      timeZone: "UTC",
    });
    return `${y}-${m}-${day} (${weekday})`;
  };

  const onlyDigits = (s) => s.replace(/\D+/g, "");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Walidator numeru PESEL
        </h1>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(onlyDigits(e.target.value).slice(0, 11))}
          placeholder="Wpisz numer PESEL"
          className="w-full border rounded-lg px-4 py-2 mb-4 text-lg"
        />

        {input.length === 11 ? (
          info.valid ? (
            <div className="p-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
              <p className="font-semibold mb-2">✅ Numer PESEL jest poprawny</p>
              <p>Data urodzenia: {displayDate(info.birthDate)}</p>
              <p>Płeć: {info.gender === "K" ? "Kobieta" : "Mężczyzna"}</p>
            </div>
          ) : (
            <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
              <p className="font-semibold mb-2">❌ Błędy:</p>
              <ul className="list-disc ml-5 space-y-1">
                {info.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )
        ) : (
          <p className="text-gray-600">Wpisz 11 cyfr numeru PESEL</p>
        )}
      </div>
    </div>
  );
};

export default SecondPage;
