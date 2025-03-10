export enum ChemicalType {
  ACID = 'ACID',
  ALKALI = 'ALKALI',
  INDICATOR = 'INDICATOR',
  METAL = 'METAL',
  SALT = 'SALT',
  OXIDE = 'OXIDE',
  IMPACT = 'IMPACT',
  GAS = 'GAS'
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
  AgCl = 'AgCl',
  BaSO4 = 'BaSO4',
  CaSO4 = 'CaSO4',
  AgSO4 = 'AgSO4',

  // Газ
  H2 = 'H2',
  CO2 = 'CO2',

  // Условия
  Temperature = 'Temperature',
}

export const ChemicalNames: { [key in Chemical]: string } = {
  [Chemical.HCl]: 'Соляная кислота <br> (HCl)',
  [Chemical.H2SO4]: 'Серная кислота <br> (H<sub>2</sub>SO<sub>4</sub>)',
  [Chemical.Mg]: 'Магний <br> (Mg)',
  [Chemical.Zn]: 'Цинк <br> (Zn)',
  [Chemical.Cu]: 'Медь <br> (Cu)',
  [Chemical.LITMUS]: 'Лакмус',
  [Chemical.METHYL_ORANGE]: 'Метилоранж',
  [Chemical.PHENOLPHTHALEIN]: 'Фенолфталеин',
  [Chemical.NaOH]: 'Гидроксид натрия <br> (NaOH)',
  [Chemical.MgOH2]: 'Гидроксид магния <br> (Mg(OH)<sub>2</sub>)',
  [Chemical.CuOH2]: 'Гидроксид меди <br> (Cu(OH)<sub>2</sub>)',
  [Chemical.NiOH2]: 'Гидроксид никеля <br> (Ni(OH)<sub>2</sub>)',
  [Chemical.CuO]: 'Оксид меди <br> (CuO)',
  [Chemical.MgO]: 'Оксид магния <br> (MgO)',
  [Chemical.NiO]: 'Оксид никеля <br> (NiO)',
  [Chemical.NaCl]: 'Хлорид натрия <br> (NaCl)',

  [Chemical.MgNO32]: 'Нитрат магния <br> (Mg(NO<sub>3</sub>)<sub>2</sub>)',
  [Chemical.Na2CO3]: 'Карбонат натрия <br> (Na<sub>2</sub>(CO<sub>3</sub>))',
  [Chemical.BaCl2]: 'Хлорид бария <br> (BaCl<sub>2</sub>)',
  [Chemical.CaCO3]: 'Карбонат кальция <br> (CaCO<sub>3</sub>)',
  [Chemical.AgNO3]: 'Нитрат серебра <br> (AgNO<sub>3</sub>)',
  [Chemical.AgCl]: 'Хлорид серебра <br> (AgCl)',
  [Chemical.BaSO4]: 'Сульфат бария <br> (BaSO<sub>4</sub>)',
  [Chemical.CaSO4]: 'Сульфат кальция <br> (CaSO<sub>4</sub>)',
  [Chemical.AgSO4]: 'Сульфат серебра <br> (AgSO<sub>4</sub>)',

  [Chemical.H2]: 'Водород <br> (H<sub>2</sub>)',
  [Chemical.CO2]: 'Углекислый газ <br> (CO<sub>2</sub>)',
  [Chemical.Temperature]: 'Нагревание'
};

export enum ContainerType {
  JAR
}

export interface ReactionResult {
  chemical?: Chemical;
  color?: string;
  hasReaction?: boolean;
  hasReactionWithIndicator?: boolean;
  description?: string;
  hasGas?: boolean;
  gas?: ChemicalElement;
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
