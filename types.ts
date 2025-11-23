import { LucideIcon } from 'lucide-react';

export enum PageType {
  COVER = 'COVER',
  TOC = 'TOC',
  CONTENT = 'CONTENT',
  BACK_COVER = 'BACK_COVER'
}

export type PageLayout = 'cover' | 'intro' | 'toc' | 'standard' | 'back_cover' | 'split_text_left' | 'split_text_right';

export interface ServiceStep {
  title: string;
  desc?: string;
  icon?: LucideIcon;
}

export interface PageContent {
  type: PageType;
  layout?: PageLayout;
  title?: string;
  englishTitle?: string;
  subtitle?: string;
  
  // Content Fields
  text?: string[];      // Primary text blocks
  bullets?: string[];   // Primary bullet points
  
  // Secondary Content (for split sections or boxes)
  boxTitle?: string;
  boxText?: string[];
  
  // Table Data
  table?: {
    headers: string[];
    rows: string[][];
    colWidths?: string[];
  };
  
  // Visuals
  image?: string;
  backgroundImage?: string;
  
  // Metadata
  serviceSteps?: ServiceStep[];
  pageNumber?: number;
  hasServiceApplication?: boolean;
}