const WEIGHTS = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

function decodeCenturyAndMonth(rawMonth) {
  if (rawMonth >= 1 && rawMonth <= 12)
    return { century: 1900, month: rawMonth };
  if (rawMonth >= 21 && rawMonth <= 32)
    return { century: 2000, month: rawMonth - 20 };
  if (rawMonth >= 41 && rawMonth <= 52)
    return { century: 2100, month: rawMonth - 40 };
  if (rawMonth >= 61 && rawMonth <= 72)
    return { century: 2200, month: rawMonth - 60 };
  if (rawMonth >= 81 && rawMonth <= 92)
    return { century: 1800, month: rawMonth - 80 };
  return null;
}

function computeControlDigit(digits) {
  const sum = WEIGHTS.reduce((acc, w, i) => acc + digits[i] * w, 0);
  return (10 - (sum % 10)) % 10;
}

export function validatePesel(pesel) {
  const errors = [];

  if (!/^\d+$/.test(pesel)) {
    errors.push("PESEL może zawierać tylko cyfry 0–9.");
    return { valid: false, errors };
  }

  if (pesel.length !== 11) {
    errors.push("PESEL musi składać się z dokładnie 11 cyfr.");
    return { valid: false, errors };
  }

  const digits = pesel.split("").map((c) => parseInt(c, 10));
  const yy = digits[0] * 10 + digits[1];
  const rawMonth = digits[2] * 10 + digits[3];
  const day = digits[4] * 10 + digits[5];

  const centMonth = decodeCenturyAndMonth(rawMonth);
  if (!centMonth) {
    errors.push("Nieprawidłowe zakodowanie miesiąca/stulecia (pozycje 3–4).");
  }

  let birthDate;
  if (centMonth) {
    const year = centMonth.century + yy;
    const month = centMonth.month;
    const d = new Date(Date.UTC(year, month - 1, day));
    const isValidDate =
      d.getUTCFullYear() === year &&
      d.getUTCMonth() === month - 1 &&
      d.getUTCDate() === day;
    if (!isValidDate) {
      errors.push("Nieprawidłowy dzień miesiąca (pozycje 5–6).");
    } else {
      birthDate = d;
    }
  }

  const genderDigit = digits[9];
  const gender = genderDigit % 2 === 0 ? "K" : "M";

  const control = computeControlDigit(digits);
  if (control !== digits[10]) {
    errors.push("Błędna cyfra kontrolna (pozycja 11).");
  }

  return {
    valid: errors.length === 0,
    errors,
    birthDate,
    gender,
  };
}
