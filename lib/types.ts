export interface Project {
  id: number;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  role: string;
  status: string;
  clientProject: boolean;
  technologies: string[];
  features: string[];
  images: string[];
  liveUrl: string | null;
  playStoreUrl: string | null;
  githubUrl: string | null;
}
