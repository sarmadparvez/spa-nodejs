export interface Driver {
  name: string;
  gender: Gender;
  cityOrigin: string;
  language: Language;
  phone: string;
  info: string;
  carMake: string;
  kmDriven: number;
  location: [string, string];
}

export enum Language {
  de = 'de',
  en = 'en',
  nl = 'nl',
  fr = 'fr',
  es = 'es',
  ar = 'ar',
}

export enum Gender {
  'male' = 'male',
  'female' = 'female',
}
