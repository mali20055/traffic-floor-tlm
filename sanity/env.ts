// Sanity environment configuration.
// Values come from .env.local (see .env.example). projectId/dataset are public.

function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined || value === "") {
    throw new Error(errorMessage);
  }
  return value;
}

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Eksik ortam değişkeni: NEXT_PUBLIC_SANITY_DATASET (.env.local dosyasına ekleyin)"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Eksik ortam değişkeni: NEXT_PUBLIC_SANITY_PROJECT_ID (.env.local dosyasına ekleyin)"
);
