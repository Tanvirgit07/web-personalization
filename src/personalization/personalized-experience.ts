import type {
  PersonalizedExperience,
  UserContext,
} from "../types/index.js";

import {
  getDynamicUI,
} from "../ui/dynamic-ui-engine.js";

import {
  getContextContent,
} from "../content/context-content-engine.js";

import {
  getLocalRecommendations,
} from "../recommendations/local-recommendation-engine.js";

export function getPersonalizedExperience(
  context: UserContext
): PersonalizedExperience {
  const ui = getDynamicUI(context);

  const content =
    getContextContent(context);

  const recommendations =
    getLocalRecommendations(context);

  return {
    ui,
    content,
    recommendations,
  };
}