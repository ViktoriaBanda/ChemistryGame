import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Topic {
  id: number;
  name: string;
  route: string;
  subtopics: Subtopic[];
}

interface Subtopic {
  id: number;
  name: string;
  route: string;
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

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.topics = [
      {
        id: 1,
        name: 'Химические свойства кислот',
        route: 'acids',
        subtopics: [
          {
            id: 1,
            name: 'Индикаторы',
            route: 'indicators'
          },
          {
            id: 2,
            name: 'Взаимодействие с металлами',
            route: 'metals'
          },
          {
            id: 3,
            name: 'Взаимодействие с основными оксидами',
            route: 'oxides'
          },
          {
            id: 4,
            name: 'Взаимодействие с основаниями',
            route: 'bases'
          },
          {
            id: 5,
            name: 'Взаимодействие с солями',
            route: 'salts'
          }
        ]
      },
      {
        id: 2,
        name: 'Химические свойства оснований',
        route: 'bases',
        subtopics: []
      }
    ];
  }

  selectTopic(topic: Topic) {
    this.selectedTopic = topic;
    this.selectedSubtopic = null;
  }

  selectSubtopic(subtopic: Subtopic) {
    this.selectedSubtopic = subtopic;
    if (this.selectedTopic) {
      this.router.navigate([this.selectedTopic.route, subtopic.route]);
    }
  }
}
