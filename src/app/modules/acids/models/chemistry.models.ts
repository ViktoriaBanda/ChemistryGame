export enum ChemicalType {
  ACID,
  BASE,
  INDICATOR,
  METAL,
  SALT,
  OXIDE
}

export enum ContainerType {
  FLASK,
  PIPETTE,
  TEST_TUBE,
  BEAKER,
  METAL
}

export interface ChemicalElement {
  id: number;
  name: string;
  type: ChemicalType;
  color: string;
  container: ContainerType;
  reactions?: { [key: string]: string };
}

export interface Reaction {
  first: ChemicalElement | null;
  second: ChemicalElement | null;
  resultColor: string;
}
