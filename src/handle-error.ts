import { existsSync } from "node:fs";
import { appendFile, writeFile } from "node:fs/promises";
import { ERRORS_FILE_PATH } from "./constants";

if (!existsSync(ERRORS_FILE_PATH)) writeFile(ERRORS_FILE_PATH, '');

export function handleError(this: string, error: unknown): false {
  const date = new Date();
  const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  let errorName = 'UnknownError';
  let errorMessage = 'No message.';

  if (error instanceof Error) {
    errorName = error.name;
    errorMessage = error.message;
  }

  const message = `${dateString} - [${this}] ${errorName}: ${errorMessage}\n`;
  process.stdout.write(message);

  appendFile(ERRORS_FILE_PATH, message);

  return false;
}
