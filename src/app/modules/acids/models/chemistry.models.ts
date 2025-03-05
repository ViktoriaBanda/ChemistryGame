export enum ChemicalType {
  ACID,
  BASE,
  INDICATOR,
  METAL,
  SALT,
  OXIDE,
  IMPACT
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
  hasReaction?: boolean;
  description?: string;
  hasGas?: boolean;
  hasPrecipitate?: boolean;
  precipitate?: ReactionResult;
}

export interface ChemicalElement {
  id: number;
  name: string;
  type: ChemicalType;
  color?: string;
  container?: ContainerType;
  reactions?: { [key: string]: ReactionResult };
}

export interface Reaction {
  first: ChemicalElement | null;
  second: ChemicalElement | null;
  third?: ChemicalElement | null;
  result: ReactionResult;
}
