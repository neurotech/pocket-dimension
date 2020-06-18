import { DateTime } from "luxon";
import { getTitleFromUrl } from "./asyncActions.js";

export const generateNoteTitle = () => {
  let adjectives = [
    "aged",
    "ancient",
    "aqueous",
    "arcane",
    "arid",
    "autumn",
    "billowing",
    "bitter",
    "black",
    "blooming",
    "blue",
    "boggy",
    "bold",
    "broken",
    "burning",
    "cautious",
    "clear",
    "cold",
    "cool",
    "crimson",
    "crispy",
    "cryptic",
    "damp",
    "dark",
    "dawn",
    "delicate",
    "divine",
    "droughty",
    "dry",
    "empty",
    "falling",
    "fast",
    "fierce",
    "floral",
    "flowing",
    "fragrant",
    "frightening",
    "frosty",
    "frozen",
    "furious",
    "gentle",
    "glistening",
    "gloomy",
    "glowing",
    "gnawing",
    "green",
    "hidden",
    "holy",
    "hot",
    "icy",
    "immense",
    "keen",
    "late",
    "limitless",
    "lingering",
    "lit",
    "little",
    "lively",
    "lonely",
    "long",
    "lucid",
    "lucky",
    "lurking",
    "meager",
    "meandering",
    "mild",
    "misty",
    "morning",
    "muddy",
    "murmuring",
    "nameless",
    "naughty",
    "old",
    "patient",
    "perky",
    "polished",
    "polite",
    "profound",
    "protected",
    "proud",
    "pure",
    "purple",
    "quiet",
    "red",
    "restless",
    "rocky",
    "rough",
    "rousing",
    "scarlet",
    "shy",
    "silent",
    "skinny",
    "small",
    "snarling",
    "snowy",
    "solitary",
    "sparkling",
    "spring",
    "still",
    "stormy",
    "stout",
    "straight",
    "sturdy",
    "summer",
    "swampy",
    "throbbing",
    "torrid",
    "twilight",
    "upright",
    "wandering",
    "weathered",
    "white",
    "wild",
    "winding",
    "winter",
    "wispy",
    "withered",
    "young",
    "young",
  ];

  let nouns = [
    "abyss",
    "arrow",
    "avalanche",
    "badger",
    "bastion",
    "bayou",
    "beam",
    "bird",
    "blaze",
    "blossom",
    "boulder",
    "breeze",
    "brook",
    "bush",
    "butterfly",
    "cave",
    "cavern",
    "chamber",
    "cherry",
    "citadel",
    "cliff",
    "cloud",
    "crag",
    "creek",
    "darkness",
    "dawn",
    "deer",
    "dew",
    "ditch",
    "dream",
    "dust",
    "eagle",
    "earth",
    "echo",
    "feather",
    "field",
    "fire",
    "firefly",
    "firn",
    "flame",
    "flower",
    "fog",
    "forest",
    "fox",
    "frog",
    "frost",
    "garden",
    "glacier",
    "glade",
    "glitter",
    "glow",
    "gorge",
    "grass",
    "hail",
    "harbor",
    "hawk",
    "haze",
    "heap",
    "hill",
    "ibex",
    "ice",
    "island",
    "lake",
    "leaf",
    "marsh",
    "meadow",
    "mist",
    "moon",
    "moor",
    "morning",
    "mountain",
    "night",
    "nightingale",
    "oak",
    "oasis",
    "ocean",
    "owl",
    "paper",
    "peak",
    "pine",
    "pond",
    "puddle",
    "rabbit",
    "rain",
    "raven",
    "ray",
    "reed",
    "reef",
    "resonance",
    "ridge",
    "river",
    "rock",
    "roe",
    "savannah",
    "sea",
    "shadow",
    "shape",
    "shore",
    "silence",
    "sky",
    "smoke",
    "snow",
    "snowflake",
    "sound",
    "spark",
    "spring",
    "star",
    "stone",
    "stream",
    "summit",
    "sun",
    "sunset",
    "surf",
    "swamp",
    "thunder",
    "thunderstorm",
    "tree",
    "twilight",
    "violet",
    "voice",
    "water",
    "waterfall",
    "wave",
    "wetland",
    "whale",
    "wildflower",
    "wind",
    "wolf",
    "wood",
  ];

  let randomAdjective = adjectives.sort(function () {
    return 0.5 - Math.random();
  })[1];
  let randomNoun = nouns.sort(function () {
    return 0.5 - Math.random();
  })[1];

  return `${randomAdjective}-${randomNoun}`;
};

export const generateLinkTitle = async (url) => {
  let titleFromUrl = await getTitleFromUrl(url);
  return titleFromUrl.title;
};

export const generateDiaryTitle = () => {
  let now = DateTime.local();
  let today = now.toFormat("EEEE dd MMMM yyyy");
  return `Work diary for ${today}`;
};