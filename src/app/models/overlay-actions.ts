import { OverlayKind } from './overlay-types';

export const overlayActions: Record<OverlayKind, string[]> = {
  [OverlayKind.None]: [],

  // Encounters
  [OverlayKind.Anomaly]: ['Investigate', 'Avoid'],
  [OverlayKind.Monster]: ['Attack', 'Flee', 'Negotiate'],
  [OverlayKind.Beast]: ['Attack', 'Flee', 'Capture'],
  [OverlayKind.Spirit]: ['Attack', 'Flee', 'Exorcise'],
  [OverlayKind.Encounter]: ['Attack', 'Flee', 'Bribe'],

  // Civilization
  [OverlayKind.Village]: ['Explore', 'Trade', 'Talk', 'Find quest', 'Rest'],
  [OverlayKind.City]: ['Explore', 'Trade', 'Talk', 'Find quest', 'Rest'],
  [OverlayKind.Farm]: ['Trade', 'Rest', 'Talk'],
  [OverlayKind.Tower]: ['Explore', 'Talk', 'Quest'],
  [OverlayKind.Ruins]: ['Explore', 'Search treasure'],

  // Events
  [OverlayKind.Caravan]: ['Trade', 'Talk'],
  [OverlayKind.Merchant]: ['Trade', 'Buy', 'Sell'],
  [OverlayKind.Wanderer]: ['Talk', 'Help', 'Ignore'],
  [OverlayKind.Treasure]: ['Open', 'Ignore'],
  [OverlayKind.Ritual]: ['Observe', 'Disrupt', 'Join'],

  // Mystical / Resources
  [OverlayKind.Shrine]: ['Pray', 'Offer', 'Ignore'],
  [OverlayKind.Portal]: ['Enter', 'Ignore'],
  [OverlayKind.Obelisk]: ['Read', 'Ignore'],
  [OverlayKind.Mine]: ['Gather ore', 'Explore'],
  [OverlayKind.Oasis]: ['Drink', 'Rest'],
  [OverlayKind.Forest]: ['Gather wood', 'Explore']
};
