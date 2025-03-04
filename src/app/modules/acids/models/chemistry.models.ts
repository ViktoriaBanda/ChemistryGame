export enum ChemicalType {
  ACID,
  BASE,
  INDICATOR,
  METAL,
  SALT
}

export enum ContainerType {
  FLASK,
  PIPETTE,
  TEST_TUBE,
  BEAKER,
  CRYSTAL
}

export interface ChemicalElement {
  id: number;
  name: string;
  type: ChemicalType;
  color: string;
  container: ContainerType;
  reactions?: { [key: string]: string }; // индикатор -> цвет реакции
}

export interface Reaction {
  metal: ChemicalElement | null;
  indicator: ChemicalElement | null;
  resultColor: string;
}
