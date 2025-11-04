import { Item } from "../../items/models/items.model";

export interface HarvestResource {
  id: string;
  type: string;
  orb: 'natural' | 'bestial' | 'mechanic' | 'elemental';
  difficulty: number;
  xpReward: number;
  exhausted?: boolean;
  remainingSteps?: number;
  item?: Item;
}