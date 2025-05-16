import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for portfolio data
  app.get("/api/resume", (_req, res) => {
    res.json({
      name: "Harshad Dhokane",
      location: "Pune, Maharashtra",
      email: "work.harshad@gmail.com",
      linkedIn: "https://www.linkedin.com/in/harshad-dhokane/",
      github: "https://github.com/harshad-dhokane/",
      summary: "Results-driven Computer Science professional with expertise in AI/ML and full-stack development."
    });
  });

  app.get("/api/projects", (_req, res) => {
    res.json([
      {
        id: 1,
        name: "Internly - Internship Tracking Application",
        description: "A full-stack internship tracking platform",
        technologies: ["React", "TypeScript", "Tailwind CSS"],
        githubUrl: "https://github.com/harshad-dhokane/internly"
      },
      {
        id: 2,
        name: "College Suggestion Bot",
        description: "AI-powered college recommendation system",
        technologies: ["Node.js", "Express", "MongoDB"],
        githubUrl: "https://github.com/harshad-dhokane/college-suggestion-bot"
      }
    ]);
  });

  app.get("/api/wallpapers", (_req, res) => {
    res.json([
      "https://images.unsplash.com/photo-1502790671504-542ad42d5189?auto=format&fit=crop&w=1920&h=1080",
      "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?auto=format&fit=crop&w=1920&h=1080",
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1920&h=1080",
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1920&h=1080"
    ]);
  });

  const httpServer = createServer(app);

  return httpServer;
}
