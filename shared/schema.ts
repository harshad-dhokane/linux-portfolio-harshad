import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Project schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies").array().notNull(),
  githubUrl: text("github_url"),
  demoUrl: text("demo_url"),
  imageUrl: text("image_url"),
  userId: integer("user_id").references(() => users.id),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Certificate schema
export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  issueDate: text("issue_date").notNull(),
  description: text("description"),
  certificateUrl: text("certificate_url"),
  userId: integer("user_id").references(() => users.id),
});

export const insertCertificateSchema = createInsertSchema(certificates).omit({
  id: true,
});

export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Certificate = typeof certificates.$inferSelect;

// Settings schema
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull().unique(),
  theme: text("theme").default("dark"),
  wallpaper: integer("wallpaper").default(0),
  customWallpaperUrl: text("custom_wallpaper_url"),
  desktopConfig: jsonb("desktop_config").$type<{
    icons: Array<{ id: string; position: { x: number; y: number } }>;
  }>(),
});

export const insertSettingsSchema = createInsertSchema(settings).omit({
  id: true,
});

export type InsertSettings = z.infer<typeof insertSettingsSchema>;
export type Settings = typeof settings.$inferSelect;
