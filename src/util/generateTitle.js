import { DateTime } from "luxon";
import { getTitleFromUrl } from "./asyncActions.js";

export const generateLinkTitle = async (url) => {
  let titleFromUrl = await getTitleFromUrl(url);
  return titleFromUrl.title;
};

export const generateDiaryTitle = () => {
  let now = DateTime.local();
  let today = now.toFormat("EEEE dd MMMM yyyy");
  return `Work diary for ${today}`;
};
