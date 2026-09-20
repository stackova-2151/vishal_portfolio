export interface ProjectImages {
  mobile: string[];
  admin?: string | string[];
}

export type GalleryImageType = "mobile" | "web" | "admin";

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
  images: ProjectImages;
  liveUrl: string | null;
  playStoreUrl: string | null;
  githubUrl: string | null;
}
