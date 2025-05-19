import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const jobTypes = [
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
  { value: "any", label: "Any" },
]

export const skillsList = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "GraphQL",
  "REST API",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Sass",
  "Redux",
  "Docker",
  "AWS",
  "Azure",
  "GCP",
  "CI/CD",
  "Git",
  "Python",
  "Java",
  "C#",
  "PHP",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "Flutter",
  "React Native",
  "UI/UX Design",
  "Figma",
  "Adobe XD",
  "Product Management",
  "Agile",
  "Scrum",
  "DevOps",
  "Machine Learning",
  "Data Science",
  "Blockchain",
]
