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
      color: 'rgba(255, 255, 255, 0.6)'
    },
    {
      id: 2,
      chemical: Chemical.H2SO4,
      type: ChemicalType.ACID,
      color: 'rgba(255, 255, 255, 0.6)'
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
  protected reagentsCount: number = 2;
  protected reagents: ChemicalElement[] = [];

  toggleGroup(group: string) {
    this.isGroupExpanded[group] = !this.isGroupExpanded[group];
  }

  selectAcid(acid: ChemicalElement) {
    if (this.reagents.length === this.reagentsCount) {
      this.setResultIsFull();
      return;
    }

    this.selectedAcid = acid;
    this.reagents.push(acid);
    this.updateResult();
  }

  selectReagent(reagent: ChemicalElement, index?: number, type?: ChemicalType) {
    if (this.reagents.length === this.reagentsCount &&
      index == null && this.reagents.every(reagent => reagent?.type !== ChemicalType.INDICATOR)) {
      this.setResultIsFull();
      return;
    }

    if (index != null) {
      if(type === ChemicalType.INDICATOR) {
        let indicator = this.indicators[index];
        this.reagents = this.reagents.filter(reagent => reagent?.type !== ChemicalType.INDICATOR);
        this.reagents.push(indicator);
        this.updateResult();
        return;
      }
      if(type === ChemicalType.IMPACT) {
        let impact = this.impacts[index];
        this.reagents = this.reagents.filter(reagent => reagent?.type !== ChemicalType.IMPACT);
        this.reagents.push(impact);
        this.updateResult();
        return;
      }
    }

    this.selectedReagent = reagent;
    this.reagents.push(reagent);
    this.updateResult();
  }

  protected updateResult() {
    console.log(this.reagents.length, this.reagentsCount)
    const chemicals: Chemical[] = this.reagents.map(reagent => reagent?.chemical);
    console.log(chemicals)

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
