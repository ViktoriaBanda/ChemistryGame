import { Component, OnInit } from '@angular/core';

interface Topic {
  id: number;
  name: string;
  subtopics: Subtopic[];
}

interface Subtopic {
  id: number;
  name: string;
  elements: ChemicalElement[];
}

interface ChemicalElement {
  id: number;
  name: string;
  type: 'acid' | 'indicator';
  color: string;
  reactions?: { [key: string]: string }; // индикатор -> цвет реакции
}

interface Reaction {
  acid: ChemicalElement | null;
  indicator: ChemicalElement | null;
  resultColor: string;
}

@Component({
  selector: 'app-chemistry-game',
  templateUrl: './chemistry-game.component.html',
  styleUrls: ['./chemistry-game.component.scss'],
})
export class ChemistryGameComponent implements OnInit {
  topics: Topic[] = [];
  selectedTopic: Topic | null = null;
  selectedSubtopic: Subtopic | null = null;

  acids: ChemicalElement[] = [];
  indicators: ChemicalElement[] = [];

  selectedAcid: ChemicalElement | null = null;
  selectedIndicator: ChemicalElement | null = null;

  currentReaction: Reaction = {
    acid: null,
    indicator: null,
    resultColor: 'transparent'
  };

  animating = false;

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    // Инициализация данных темы, подтем, кислот и индикаторов
    this.topics = [
      {
        id: 1,
        name: 'Химические свойства кислот',
        subtopics: [
          {
            id: 1,
            name: 'Индикаторы',
            elements: [
              // Кислоты
              {
                id: 1,
                name: 'Соляная кислота (HCl)',
                type: 'acid',
                color: 'rgba(240, 240, 240, 0.8)'
              },
              {
                id: 2,
                name: 'Серная кислота (H2SO4)',
                type: 'acid',
                color: 'rgba(240, 240, 240, 0.8)'
              },
              {
                id: 3,
                name: 'Азотная кислота (HNO3)',
                type: 'acid',
                color: 'rgba(240, 240, 240, 0.8)'
              },
              {
                id: 4,
                name: 'Уксусная кислота (CH3COOH)',
                type: 'acid',
                color: 'rgba(240, 240, 240, 0.8)'
              },

              // Индикаторы
              {
                id: 5,
                name: 'Лакмус',
                type: 'indicator',
                color: 'purple',
                reactions: {
                  'Соляная кислота (HCl)': 'red',
                  'Серная кислота (H2SO4)': 'red',
                  'Азотная кислота (HNO3)': 'red',
                  'Уксусная кислота (CH3COOH)': 'pink'
                }
              },
              {
                id: 6,
                name: 'Метиловый оранжевый',
                type: 'indicator',
                color: 'orange',
                reactions: {
                  'Соляная кислота (HCl)': 'red',
                  'Серная кислота (H2SO4)': 'red',
                  'Азотная кислота (HNO3)': 'red',
                  'Уксусная кислота (CH3COOH)': 'orange-red'
                }
              },
              {
                id: 7,
                name: 'Фенолфталеин',
                type: 'indicator',
                color: 'transparent',
                reactions: {
                  'Соляная кислота (HCl)': 'transparent',
                  'Серная кислота (H2SO4)': 'transparent',
                  'Азотная кислота (HNO3)': 'transparent',
                  'Уксусная кислота (CH3COOH)': 'transparent'
                }
              },
              {
                id: 8,
                name: 'Универсальный индикатор',
                type: 'indicator',
                color: 'green',
                reactions: {
                  'Соляная кислота (HCl)': 'red',
                  'Серная кислота (H2SO4)': 'red',
                  'Азотная кислота (HNO3)': 'red',
                  'Уксусная кислота (CH3COOH)': 'orange'
                }
              }
            ]
          },
          {
            id: 2,
            name: 'Взаимодействие с металлами',
            elements: []
          },
          {
            id: 3,
            name: 'Взаимодействие с основаниями',
            elements: []
          }
        ]
      },
      {
        id: 2,
        name: 'Химические свойства оснований',
        subtopics: []
      }
    ];
  }

  selectTopic(topic: Topic) {
    this.selectedTopic = topic;
    this.selectedSubtopic = null;
    this.resetExperiment();
  }

  selectSubtopic(subtopic: Subtopic) {
    this.selectedSubtopic = subtopic;

    // Разделение элементов на кислоты и индикаторы
    this.acids = subtopic.elements.filter(el => el.type === 'acid');
    this.indicators = subtopic.elements.filter(el => el.type === 'indicator');

    this.resetExperiment();
  }

  selectAcid(acid: ChemicalElement) {
    this.selectedAcid = acid;
    this.currentReaction.acid = acid;
    this.updateResult();
  }

  selectIndicator(indicator: ChemicalElement) {
    this.selectedIndicator = indicator;
    this.currentReaction.indicator = indicator;
    this.updateResult();
  }

  updateResult() {
    if (this.currentReaction.acid && this.currentReaction.indicator) {
      const reactions = this.currentReaction.indicator.reactions || {};
      const resultColor = reactions[this.currentReaction.acid.name] || 'transparent';

      // Анимация изменения цвета
      this.animateColorChange(resultColor);
    }
  }

  animateColorChange(newColor: string) {
    this.animating = true;

    // Имитация постепенного изменения цвета
    setTimeout(() => {
      this.currentReaction.resultColor = newColor;
      this.animating = false;
    }, 1000);
  }

  resetExperiment() {
    this.selectedAcid = null;
    this.selectedIndicator = null;
    this.currentReaction = {
      acid: null,
      indicator: null,
      resultColor: 'transparent'
    };
  }
}
