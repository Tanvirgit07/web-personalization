import { buildUserContext } from "../context/context-builder.js";
import { getFullPersonalizedMessage } from "./personalization-engine.js";
import { getPersonalizedExperience } from "./personalized-experience.js";
import { getCachedContext, setCachedContext } from "../core/cache-manager.js";
import type { PersonalizeOptions, PersonalizedResult, UserContext } from "../types/index.js";

export async function personalize(
  options?: PersonalizeOptions
): Promise<PersonalizedResult> {
  const enableCache = options?.enableCache ?? true;
  const cacheTimeoutMs = options?.cacheTimeoutMs ?? 600000;
  const includeExperience = options?.includeExperience ?? true;

  let context: UserContext | null = null;

  if (enableCache) {
    context = getCachedContext();
  }

  if (!context) {
    context = await buildUserContext(options);
    if (enableCache) {
      setCachedContext(context, cacheTimeoutMs);
    }
  }

  const message = getFullPersonalizedMessage(context);

  const result: PersonalizedResult = {
    message,
    context,
  };

  if (includeExperience) {
    result.experience = getPersonalizedExperience(context);
  }

  return result;
}