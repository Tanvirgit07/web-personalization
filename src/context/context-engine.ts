import type { UserContext } from "../types/index.js";
import { buildUserContext } from "./context-builder.js";

export async function getUserContext(): Promise<UserContext> {
  return buildUserContext();
}