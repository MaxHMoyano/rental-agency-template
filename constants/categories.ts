import { IconType } from "react-icons";
import {
  Building2,
  Trees,
  Mountain,
  Palmtree,
  ThermometerSnowflake,
} from "lucide-react";

export interface Category {
  label: string;
  description: string;
  icon: IconType;
}

export const CATEGORIES = [
  {
    label: "Urban",
    icon: Building2,
    description: "Around cities or towns.",
  },
  {
    label: "Forests",
    icon: Trees,
    description: "Around forests and nature.",
  },
  {
    label: "Mountains",
    icon: Mountain,
    description: "Around mountains.",
  },
  {
    label: "Beach",
    icon: Palmtree,
    description: "Caribean style.",
  },
  {
    label: "Winter",
    icon: ThermometerSnowflake,
    description: "To enjoy a coffe and skiing.",
  },
];
