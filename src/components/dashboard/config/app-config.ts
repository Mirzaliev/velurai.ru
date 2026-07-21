import packageJson from "../../../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Velure AI",
  version: packageJson.version,
  copyright: `© ${currentYear}, Velure AI.`,
  meta: {
    title: "Velure AI",
    description:
      "Velure AI is a modern, open-source dashboard starter template built with Next.js 16, Tailwind CSS v4, and shadcn/ui. Perfect for SaaS apps, admin panels, and internal tools—fully customizable and production-ready.",
  },
};

export const users = [
  {
    id: "1",
    name: "Arham Khan",
    username: "Aarhamkhnz",
    email: "hello@arhamkhnz.com",
    avatar: "https://avatars.githubusercontent.com/u/43849669",
    role: "administrator",
  },
  {
    id: "2",
    name: "Ammar Khan",
    username: "ammarkhnz",
    email: "hello@ammarkhnz.com",
    avatar: "",
    role: "admin",
  },
];

export const rootUser = users[0];