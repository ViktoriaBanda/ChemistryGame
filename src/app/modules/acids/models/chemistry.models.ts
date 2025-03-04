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
  JAR,
  METAL
}

export interface ReactionResult {
  color?: string;
  gas?: boolean;
  precipitate?: boolean;
  description?: string;
}

export interface ChemicalElement {
  id: number;
  name: string;
  type: ChemicalType;
  color: string;
  container: ContainerType;
  reactions?: { [key: string]: ReactionResult };
}

export interface Reaction {
  first: ChemicalElement | null;
  second: ChemicalElement | null;
  result: ReactionResult;
}
