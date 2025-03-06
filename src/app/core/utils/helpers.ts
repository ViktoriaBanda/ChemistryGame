import { Chemical, ChemicalNames } from "../../modules/acids/models/chemistry.models";

export function getChemicalName(chemical: Chemical): string {
  return ChemicalNames[chemical];
}
