import { IconType } from "react-icons";
import {
  LuBuilding2,
  LuTrees,
  LuMountain,
  LuPalmtree,
  LuThermometerSnowflake,
} from "react-icons/lu";

export interface Category {
  label: string;
  description: string;
  icon: IconType;
}

export const CATEGORIES = [
  {
    label: "Urban",
    icon: LuBuilding2,
    description: "Around cities or towns.",
  },
  {
    label: "Forests",
    icon: LuTrees,
    description: "Around forests and nature.",
  },
  {
    label: "Mountains",
    icon: LuMountain,
    description: "Around mountains.",
  },
  {
    label: "Beach",
    icon: LuPalmtree,
    description: "Caribean style.",
  },
  {
    label: "Winter",
    icon: LuThermometerSnowflake,
    description: "To enjoy a coffe and skiing.",
  },
];
