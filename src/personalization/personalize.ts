import { buildUserContext } from "../context/context-builder.js";

import {
  getFullPersonalizedMessage,
} from "./personalization-engine.js";

export async function personalize(): Promise<string> {
  const context = await buildUserContext();

  return getFullPersonalizedMessage(context);
}