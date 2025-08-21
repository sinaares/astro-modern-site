// src/utils/content.ts
import fs from 'fs/promises';
import path from 'path';

export interface PageContent {
  pageTitle: string;
  pageDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  mainContent: string;
  buttonText: string;
  updatedAt?: string;
}

const defaultContent: Record<string, PageContent> = {
  home: {
    pageTitle: "Welcome to Our Website",
    pageDescription: "This is the home page of our amazing website",
    heroTitle: "Welcome to Our Amazing Website",
    heroSubtitle: "We provide excellent services for our customers",
    mainContent: "This is the main content area where you can write about your company, services, or any other information you want to share with your visitors.",
    buttonText: "Get Started"
  },
  about: {
    pageTitle: "About Us",
    pageDescription: "Learn more about our company and team",
    heroTitle: "About Our Company",
    heroSubtitle: "We are passionate about what we do",
    mainContent: "Here you can write about your company history, mission, vision, and values. Tell your visitors who you are and what makes you special.",
    buttonText: "Learn More"
  },
  services: {
    pageTitle: "Our Services",
    pageDescription: "Discover the services we offer",
    heroTitle: "Our Services",
    heroSubtitle: "Professional solutions for your needs",
    mainContent: "Describe your services here. List what you offer, how you can help your customers, and what makes your services special.",
    buttonText: "Contact Us"
  },
  contact: {
    pageTitle: "Contact Us",
    pageDescription: "Get in touch with our team",
    heroTitle: "Contact Us",
    heroSubtitle: "We'd love to hear from you",
    mainContent: "Provide your contact information here. Include your address, phone number, email, and business hours.",
    buttonText: "Send Message"
  },
  blog: {
    pageTitle: "Our Blog",
    pageDescription: "Read our latest articles and updates",
    heroTitle: "Our Blog",
    heroSubtitle: "Stay updated with our latest news",
    mainContent: "This is where you can share blog posts, news, updates, or any other content you want to publish regularly.",
    buttonText: "Read More"
  }
};

export async function getPageContent(pageName: string): Promise<PageContent> {
  try {
    const dataDir = path.join(process.cwd(), 'src/data');
    const filePath = path.join(dataDir, `${pageName}.json`);
    
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    // Return default content if file doesn't exist
    return defaultContent[pageName] || defaultContent.home;
  }
}

export async function getAllPageContent(): Promise<Record<string, PageContent>> {
  const pages = ['home', 'about', 'services', 'contact', 'blog'];
  const content: Record<string, PageContent> = {};
  
  for (const page of pages) {
    content[page] = await getPageContent(page);
  }
  
  return content;
}