import {
  ChemicalElement,
  ChemicalType,
  ContainerType,
  Reaction,
  ReactionResult
} from "./acids/models/chemistry.models";

export abstract class ReactionBase {
  acids: ChemicalElement[] = [];
  animating = false;
  isResultAlreadyExist = false;

  currentReaction: Reaction = {
    first: null,
    second: null,
    result: {}
  };

  selectedAcid: ChemicalElement | null = null;
  selectedReagent: ChemicalElement | null = null;

  // Состояние групп веществ
  isGroupExpanded: { [key: string]: boolean } = {
    acids: true,
    metals: true
  };

  constructor() {
    this.acids = [
      {
        id: 1,
        name: 'Соляная кислота (HCl)',
        type: ChemicalType.ACID,
        color: 'rgba(255, 255, 255, 0.6)',
        container: ContainerType.FLASK
      },
      {
        id: 2,
        name: 'Серная кислота (H2SO4)',
        type: ChemicalType.ACID,
        color: 'rgba(255, 255, 255, 0.6)',
        container: ContainerType.FLASK
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
    if (this.selectedAcid && this.selectedReagent) {
      this.setResultIsFull();
      return;
    }

    this.selectedAcid = acid;
    this.currentReaction.first = acid;
    this.updateResult();
  }

  selectReagent(indicator: ChemicalElement) {
    if (this.selectedAcid && this.selectedReagent) {
      this.setResultIsFull();
      return;
    }

    this.selectedReagent = indicator;
    this.currentReaction.second = indicator;
    this.updateResult();
  }

  updateResult() {
    if (this.currentReaction.first && this.currentReaction.second) {
      const reactions = this.currentReaction.second.reactions || {};
      const result = reactions[this.currentReaction.first.name];
      this.animateResult(result);
    } else if (this.currentReaction.first) {
      this.animating = false;
      this.currentReaction.result = { color: this.currentReaction.first.color };
    }
    else {
      this.animating = false;
    }
  }

  resetExperiment() {
    this.isResultAlreadyExist = false;
    this.selectedAcid = null;
    this.selectedReagent = null;
    this.currentReaction = {
      first: null,
      second: null,
      result: {}
    };
  }

  private setResultIsFull(): void {
    this.isResultAlreadyExist = true;
    setTimeout(() => {
      this.isResultAlreadyExist = false;
    }, 1000);
  }
}
