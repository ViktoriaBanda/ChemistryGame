export enum ChemicalType {
  ACID,
  ALKALI,
  INDICATOR,
  METAL,
  SALT,
  OXIDE,
  IMPACT
}

export enum ContainerType {
  JAR
}

export interface ReactionResult {
  color?: string;
  hasReaction?: boolean;
  description?: string;
  hasGas?: boolean;
  hasPrecipitate?: boolean;
  precipitate?: ChemicalElement;
}

export interface ChemicalElement {
  id?: number;
  name: string;
  type?: ChemicalType;
  container?: ContainerType;
  color?: string;
  reactions?: { [key: string]: ReactionResult };
}

export interface Reaction {
  first: ChemicalElement | null;
  second: ChemicalElement | null;
  third?: ChemicalElement | null;
  result: ReactionResult;
}
