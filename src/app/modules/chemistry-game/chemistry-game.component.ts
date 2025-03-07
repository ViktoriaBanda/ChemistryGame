import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IItemSelect } from "../../core/interfaces/item-select.interface";

interface Topic extends IItemSelect {
  id: number;
  title: string;
  route: string;
  subtopics?: Topic[];
}

@Component({
  selector: 'app-chemistry-game',
  templateUrl: './chemistry-game.component.html',
  styleUrls: ['./chemistry-game.component.scss'],
})
export class ChemistryGameComponent implements OnInit {
  topics: Topic[] = [];
  selectedTopic: Topic | null = null;
  selectedSubtopic: Topic | null = null;
  isEmptyRoute: boolean;

  constructor(private _router: Router) {}

  ngOnInit() {
    this.initializeData();
    this.isEmptyRoute = this._router.url === '/';

    // Получаем текущий маршрут и выбираем соответствующие тему и подкатегорию
    this.selectTopicAndSubtopicFromRoute();

    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isEmptyRoute = this._router.url === '/';
        this.selectTopicAndSubtopicFromRoute();
      }
    });
  }

  initializeData() {
    this.topics = [
      {
        id: 1,
        title: 'Химические свойства кислот',
        route: 'acids',
        subtopics: [
          {
            id: 1,
            title: 'Индикаторы',
            route: 'indicators',
          },
          {
            id: 2,
            title: 'Взаимодействие с металлами',
            route: 'metals',
          },
          {
            id: 3,
            title: 'Взаимодействие с основными оксидами',
            route: 'oxides',
          },
          {
            id: 4,
            title: 'Взаимодействие с основаниями',
            route: 'alkali',
          },
          {
            id: 5,
            title: 'Взаимодействие с солями',
            route: 'salts',
          },
        ],
      },
      {
        id: 2,
        title: 'Химические свойства оснований',
        route: 'alkali',
        subtopics: [],
      },
    ];
  }

  // Функция для выбора темы и подкатегории по текущему роуту
  selectTopicAndSubtopicFromRoute() {
    const currentUrl = this._router.url;
    let topicFound = false;
    let subtopicFound = false;

    // Проверяем все темы и подкатегории на соответствие текущему роуту
    for (const topic of this.topics) {
      if (currentUrl.includes(topic.route)) {
        this.selectedTopic = topic;
        topicFound = true;
        for (const subtopic of topic.subtopics) {
          if (currentUrl.includes(subtopic.route)) {
            this.selectedSubtopic = subtopic;
            subtopicFound = true;
            break;
          }
        }
        if (topicFound && subtopicFound) break;
      }
    }

    // Если не нашли, сбрасываем выбранную тему и подкатегорию
    if (!topicFound) {
      this.selectedTopic = null;
    }
    if (!subtopicFound) {
      this.selectedSubtopic = null;
    }
  }

  onSelectTopic(itemSelect: IItemSelect): void {
    this.selectedTopic = this.topics.find(item => item === itemSelect);
    this.selectedSubtopic = null;
  }

  onSelectSubtopic(itemSelect: IItemSelect): void {
    this.selectedSubtopic = this.selectedTopic.subtopics.find(item => item === itemSelect);
    if (this.selectedSubtopic) {
      this._router.navigate([this.selectedTopic.route, this.selectedSubtopic.route]);
    }
  }
}
