import {
  Chemical,
  ChemicalElement,
  ChemicalType,
  ContainerType,
  createReactionKey,
  ReactionResult
} from "./acids/models/chemistry.models";

export abstract class ReactionBase {
  indicators: ChemicalElement[] = [];
  impacts: ChemicalElement[] = [];
  protected acids: ChemicalElement[] = [
    {
      id: 1,
      chemical: Chemical.HCl,
      type: ChemicalType.ACID,
      color: 'rgba(255, 255, 255, 0.3)'
    },
    {
      id: 2,
      chemical: Chemical.H2SO4,
      type: ChemicalType.ACID,
      color: 'rgba(255, 255, 255, 0.3)'
    }
  ];

  protected selectedAcid: ChemicalElement | null = null;
  protected selectedReagent: ChemicalElement | null = null;
  protected selectedThirdReagent: ChemicalElement | null = null;

  protected isGroupExpanded: { [key: string]: boolean } = {
    'acids': true,
    'metals': true,
    'indicators': true,
    'alkali': true,
    'oxides': true,
    'salts': true
  };

  protected currentReaction = {
    result: {} as ReactionResult
  };

  protected reactionCompleted = false;
  protected animating = false;
  protected isResultAlreadyExist = false;
  protected reactions: Map<string, ReactionResult>;
  protected reagentsCount: number = 2; // указывается с учетом индикаторов
  protected reagentsCountWithoutAdditions: number = 2; // указывается без учета индикаторов
  protected reagents: ChemicalElement[] = [];

  toggleGroup(group: string) {
    this.isGroupExpanded[group] = !this.isGroupExpanded[group];
  }

  selectAcid(acid: ChemicalElement) {
    if (this.reagents.length >= this.reagentsCount) {
      this.setResultIsFull();
      return;
    }

    this.reagents = this.reagents.filter(r => r?.type !== acid.type);
    this.selectedAcid = acid;
    this.reagents.push(acid);
    this.updateResult();
  }

  selectReagent(reagent: ChemicalElement, index?: number, type?: ChemicalType) {
    if (index == null && this.reagents.length >= this.reagentsCount || this.isAlreadyHasSameType(reagent?.type)) {
      this.setResultIsFull();
      return;
    }

    if (reagent) {
      this.reagents = this.reagents.filter(r => r?.type !== reagent.type);
    } else {
      this.reagents = this.reagents.filter(r => r?.type !== type);
    }

    if (index != null) {
      if (type === ChemicalType.INDICATOR) {
        let indicator = this.indicators[index];
        this.reagents.push(indicator);
        this.updateResult();
        return;
      }
      if (type === ChemicalType.IMPACT) {
        let impact = this.impacts[index];
        this.reagents.push(impact);
        this.updateResult();
        return;
      }
    }

    this.selectedReagent = reagent;
    this.reagents.push(reagent);
    this.updateResult();
  }

  isAlreadyHasSameType(typeForAdd: ChemicalType): boolean {
    let mainReagents = this.reagents.filter(reagent => reagent?.type !== ChemicalType.INDICATOR &&
      reagent?.type !== ChemicalType.IMPACT);
    return this.reagents.length >= this.reagentsCountWithoutAdditions && mainReagents.some(reagent => reagent.type === typeForAdd);
  }

  isFullWithoutAdditions(): boolean {
    return this.reagents.filter(reagent => reagent?.type !== ChemicalType.INDICATOR &&
      reagent?.type !== ChemicalType.IMPACT).length >= this.reagentsCount;
  }

  protected updateResult() {
    const chemicals: Chemical[] = this.reagents.map(reagent => reagent?.chemical);

    if (chemicals.length > 0) {
      const reactionKey = createReactionKey(chemicals);
      const result = this.reactions.get(reactionKey);

      if (result) {
        this.reactionCompleted = true;
        if (result.hasReaction || this.reagents.some(reagent => reagent?.type === ChemicalType.INDICATOR)) {
          this.animateResult(result);
        } else {
          this.animating = false;
          this.currentReaction.result = result;
        }
      } else {
        this.resetReactionsFlags();
        if (chemicals.length === 1) {
          const firstReagent = this.reagents.find(reagent => reagent?.chemical);

          const chemical = firstReagent?.chemical;
          const color = firstReagent?.color;
          this.currentReaction.result = {chemical};

          switch (firstReagent?.type) {
            case ChemicalType.ACID:
              this.currentReaction.result.color = color;
              break;
            case ChemicalType.METAL:
              this.currentReaction.result.hasPrecipitate = true;
              this.currentReaction.result.precipitate = {chemical: chemical, type: ChemicalType.METAL, color};
              break;
            case ChemicalType.OXIDE:
              this.currentReaction.result.hasPrecipitate = true;
              this.currentReaction.result.precipitate = {chemical: chemical, type: ChemicalType.OXIDE, color};
              break;
            case ChemicalType.ALKALI:
              this.currentReaction.result.hasPrecipitate = firstReagent.container === ContainerType.JAR;
              this.currentReaction.result.precipitate = {chemical: chemical, type: ChemicalType.ALKALI, color};

              this.currentReaction.result.color = firstReagent.container !== ContainerType.JAR ? color : 'transparent';
              break;
            case ChemicalType.SALT:
              this.currentReaction.result.hasPrecipitate = firstReagent.container === ContainerType.JAR;
              this.currentReaction.result.precipitate = {chemical: chemical, type: ChemicalType.SALT, color};

              this.currentReaction.result.color = firstReagent.container !== ContainerType.JAR ? color : 'transparent';
              break;
          }
        }
      }
    } else {
      this.resetReactionsFlags();
    }
  }

  protected animateResult(result: ReactionResult) {
    this.animating = true;
    this.currentReaction.result = result;
    setTimeout(() => {
      this.animating = false;
    }, 1000);
  }

  protected resetReactionsFlags() {
    this.reactionCompleted = false;
    this.isResultAlreadyExist = false;
    this.currentReaction.result = {};
  }

  resetExperiment() {
    this.selectedAcid = null;
    this.selectedReagent = null;
    this.selectedThirdReagent = null;
    this.reagents = [];
    this.currentReaction = {
      result: {}
    };
    this.resetReactionsFlags();
  }

  setResultIsFull(): void {
    this.isResultAlreadyExist = true;
    setTimeout(() => {
      this.isResultAlreadyExist = false;
    }, 1000);
  }
}
