import { validatePesel } from "./utils/validatePesel.js";

describe("Funkcja validatePesel", () => {
  test("poprawny numer PESEL (2002-07-08, kobieta)", () => {
    // PESEL: 02270803624 — poprawny
    const result = validatePesel("02270803624");

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.gender).toBe("K");
    expect(result.birthDate).toBeInstanceOf(Date);
    expect(result.birthDate.getUTCFullYear()).toBe(2002);
    expect(result.birthDate.getUTCMonth()).toBe(6);
    expect(result.birthDate.getUTCDate()).toBe(8);
  });

  test("błędna długość PESEL (10 cyfr)", () => {
    const result = validatePesel("1234567890");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "PESEL musi składać się z dokładnie 11 cyfr."
    );
  });

  test("niepoprawne znaki (litera w środku)", () => {
    const result = validatePesel("02070803A28");
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("PESEL może zawierać tylko cyfry 0–9.");
  });

  test("błędna data (np. 31 lutego)", () => {
    const result = validatePesel("02223112345");
    expect(result.valid).toBe(false);
    const hasInvalidDateError = result.errors.some((e) =>
      e.includes("Nieprawidłowy dzień")
    );
    expect(hasInvalidDateError).toBe(true);
  });

  test("błędne zakodowanie miesiąca/stulecia", () => {
    const result = validatePesel("99999999999");
    expect(result.valid).toBe(false);
    const hasInvalidMonthError = result.errors.some((e) =>
      e.includes("miesiąca/stulecia")
    );
    expect(hasInvalidMonthError).toBe(true);
  });

  test("błędna cyfra kontrolna", () => {
    const result = validatePesel("02070803627"); // zmieniona ostatnia cyfra
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Błędna cyfra kontrolna (pozycja 11).");
  });
});
