export const CITIES = [
  "Bardhaman",
  "Cooch Behar",
  "Contai",
  "Darjeeling",
  "East Midnapore",
  "Hooghly",
  "Howrah",
  "Kalimpong",
  "Kolkata",
  "Murshidabad",
  "Nadia",
  "North 24 Parganas",
  "North Dinajpur",
  "Purulia",
] as const;

export type City = (typeof CITIES)[number];
