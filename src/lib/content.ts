import matter from "gray-matter";

export function parseMd<T = Record<string, unknown>>(raw: string): { data: T; content: string } {
  const { data, content } = matter(raw);
  return { data: data as T, content };
}

export interface Notice {
  id: number;
  date: string;
  title: string;
  tag: string;
  content?: string;
}

export interface QuickLink {
  label: string;
  desc: string;
  href: string;
  icon: string;
}

export interface Conference {
  year: number;
  title: string;
  link: string;
  internal: boolean;
  date?: string;
  location?: string;
  keynote?: string;
  highlights?: string[];
  participants?: string;
}

export interface Lab {
  name: string;
  professor: string;
  univ: string;
  url: string;
}

export interface SocietyItem {
  abbr?: string;
  name: string;
  url: string;
  note?: string;
  publisher?: string;
  desc?: string;
}

export interface SocietiesData {
  coreMIR: SocietyItem[];
  adjacent: SocietyItem[];
  domestic: SocietyItem[];
  journals: SocietyItem[];
  resources: SocietyItem[];
}
