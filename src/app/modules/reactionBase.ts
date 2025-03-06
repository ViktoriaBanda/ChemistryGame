import {
  ChemicalElement,
  ChemicalType,
  ContainerType,
  Reaction,
  ReactionResult
} from "./acids/models/chemistry.models";

export abstract class ReactionBase {
  reagents: ChemicalElement[] = [];
  acids: ChemicalElement[] = [];
  animating = false;
  isResultAlreadyExist = false;
  reactionCompleted = false;

  currentReaction: Reaction = {
    first: null,
    second: null,
    third: null,
    result: {}
  };

  selectedAcid: ChemicalElement | null = null;
  selectedReagent: ChemicalElement | null = null;

  // Состояние групп веществ
  isGroupExpanded: { [key: string]: boolean } = {
    acids: true,
    metals: true,
    oxides: true,
    alkali: true
  };

  constructor() {
    this.acids = [
      {
        id: 1,
        name: 'Соляная кислота (HCl)',
        type: ChemicalType.ACID,
        color: 'rgba(255, 255, 255, 0.6)'
      },
      {
        id: 2,
        name: 'Серная кислота (H2SO4)',
        type: ChemicalType.ACID,
        color: 'rgba(255, 255, 255, 0.6)'
      },
    ];
  }

  toggleGroup(groupName: string) {
    this.isGroupExpanded[groupName] = !this.isGroupExpanded[groupName];
  }

  animateResult(result: ReactionResult) {
    this.animating = true;
    this.currentReaction.result = result;
  }

  selectAcid(acid: ChemicalElement) {
    if (this.currentReaction.first && this.currentReaction.second) {
      this.setResultIsFull();
      return;
    }

    this.selectedAcid = acid;
    this.currentReaction.first = acid;
    this.reagents.push(acid);
    this.updateResult();
  }

  selectReagent(reagent: ChemicalElement, index?: number) {
    if (this.currentReaction.first && this.currentReaction.second) {
      this.setResultIsFull();
      return;
    }
    if (this.currentReaction.second) {
      this.reagents.pop();
    }

    this.selectedReagent = reagent;
    this.currentReaction.second = reagent;
    this.reagents.push(reagent);
    this.updateResult();
  }

  updateResult() {
    if (this.currentReaction.first && this.currentReaction.second) {
      const reactions = this.currentReaction.second.reactions || {};
      const result = reactions[this.currentReaction.first.name];
      this.reactionCompleted = true;
      this.animateResult(result);
    } else if (this.currentReaction.first) {
      this.resetReactionsFlags();
      this.currentReaction.result = {color: this.currentReaction.first.color};
    } else {
      this.resetReactionsFlags();
    }
  }

  resetExperiment() {
    this.reagents = [];
    this.isResultAlreadyExist = false;
    this.selectedAcid = null;
    this.selectedReagent = null;
    this.currentReaction = {
      first: null,
      second: null,
      result: {}
    };
  }

  setResultIsFull(): void {
    this.isResultAlreadyExist = true;
    setTimeout(() => {
      this.isResultAlreadyExist = false;
    }, 1000);
  }

  resetReactionsFlags(): void {
    this.reactionCompleted = false;
    this.animating = false;
  }
}
