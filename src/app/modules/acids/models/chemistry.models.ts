export enum ChemicalType {
  ACID = 'ACID',
  ALKALI = 'ALKALI',
  INDICATOR = 'INDICATOR',
  METAL = 'METAL',
  SALT = 'SALT',
  OXIDE = 'OXIDE',
  IMPACT = 'IMPACT'
}

export enum Chemical {
  // Кислоты
  HCl = 'HCl',
  H2SO4 = 'H2SO4',

  // Металлы
  Mg = 'Mg',
  Zn = 'Zn',
  Cu = 'Cu',

  // Индикаторы
  LITMUS = 'LITMUS',
  METHYL_ORANGE = 'METHYL_ORANGE',
  PHENOLPHTHALEIN = 'PHENOLPHTHALEIN',

  // Щелочи
  NaOH = 'NaOH',
  MgOH2 = 'Mg(OH)2',
  CuOH2 = 'Cu(OH)2',
  NiOH2 = 'Ni(OH)2',

  // Оксиды
  CuO = 'CuO',
  MgO = 'MgO',
  NiO = 'NiO',

  // Соли
  NaCl = 'NaCl',
  MgNO32 = 'Mg(NO3)2',
  Na2CO3 = 'Na2CO3',
  BaCl2 = 'BaCl2',
  CaCO3 = 'CaCO3',
  AgNO3 = 'AgNO3',

  // Условия
  Temperature = 'Temperature',
}

export const ChemicalNames: { [key in Chemical]: string } = {
  [Chemical.HCl]: 'Соляная кислота (HCl)',
  [Chemical.H2SO4]: 'Серная кислота (H<sub>2</sub>SO<sub>4</sub>)',
  [Chemical.Mg]: 'Магний (Mg)',
  [Chemical.Zn]: 'Цинк (Zn)',
  [Chemical.Cu]: 'Медь (Cu)',
  [Chemical.LITMUS]: 'Лакмус',
  [Chemical.METHYL_ORANGE]: 'Метилоранж',
  [Chemical.PHENOLPHTHALEIN]: 'Фенолфталеин',
  [Chemical.NaOH]: 'Гидроксид натрия (NaOH)',
  [Chemical.MgOH2]: 'Гидроксид магния (Mg(OH)<sub>2</sub>)',
  [Chemical.CuOH2]: 'Гидроксид меди (Cu(OH)<sub>2</sub>)',
  [Chemical.NiOH2]: 'Гидроксид никеля (Ni(OH)<sub>2</sub>)',
  [Chemical.CuO]: 'Оксид меди (CuO)',
  [Chemical.MgO]: 'Оксид магния (MgO)',
  [Chemical.NiO]: 'Оксид никеля (NiO)',
  [Chemical.NaCl]: 'Хлорид натрия (NaCl)',

  [Chemical.MgNO32]: 'Нитрат магния (Mg(NO<sub>3</sub>)<sub>2</sub>)',
  [Chemical.Na2CO3]: 'Карбонат натрия (Na<sub>2</sub>(CO<sub>3</sub>))',
  [Chemical.BaCl2]: 'Хлорид бария (BaCl<sub>2</sub>)',
  [Chemical.CaCO3]: 'Карбонат кальция (CaCO<sub>3</sub>)',
  [Chemical.AgNO3]: 'Нитрат серебра (AgNO<sub>3</sub>)',

  [Chemical.Temperature]: 'Нагревание'
};

export enum ContainerType {
  JAR
}

export interface ReactionResult {
  chemical?: Chemical;
  color?: string;
  hasReaction?: boolean;
  description?: string;
  hasGas?: boolean;
  hasPrecipitate?: boolean;
  precipitate?: ChemicalElement;
}

export interface ChemicalElement {
  id?: number;
  chemical: Chemical;
  type: ChemicalType;
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

export interface ReactionKey {
  chemicals: Chemical[];
}

export type ReactionMap = Map<string, ReactionResult>;

export function createReactionKey(chemicals: Chemical[]): string {
  return [...chemicals].sort().join('_');
}
