import { Chemical, ChemicalNames } from "../models/chemistry.models";

export function getChemicalName(chemical: Chemical): string {
  return ChemicalNames[chemical];
}
