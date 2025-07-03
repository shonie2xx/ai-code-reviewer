import { Language, Specialty } from '@/store/reviewStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CODE_SNIPPETS: Record<Language, string> = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
};

export const SPECIALISTS = ['Security Specialist'] as Specialty[];

export const getCodeLength = (code: string, language: Language) => {
  const lines = code.split('\n');

  const commentPatterns: Record<Language, RegExp[]> = {
    typescript: [/^\s*\/\//, /^\s*\/\*/, /^\s*\*/],
    javascript: [/^\s*\/\//, /^\s*\/\*/, /^\s*\*/],
    python: [/^\s*#/],
  };

  const patterns = commentPatterns[language] || [];

  const codeLines = lines.filter((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine === '') return false;
    return !patterns.some((pattern) => pattern.test(line));
  });

  return codeLines.join('\n');
};
