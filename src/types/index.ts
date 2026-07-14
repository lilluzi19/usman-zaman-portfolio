export type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
  video: string;
  featured?: boolean;
};

export type Skill = {
  number: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  aosDelay: number;
};