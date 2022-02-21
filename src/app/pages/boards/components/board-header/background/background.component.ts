import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BoardsService} from "../../../boards.service";
import {ActivatedRoute} from "@angular/router";
import {BoardInterface} from "../../../../../interfaces/board.interface";
import {UnsplashImg} from "../../../../../interfaces/unsplash-img.interface";
import {BoardComponent} from "../../board/board.component";

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})

export class BackgroundComponent implements OnInit {
  public bgType = '';
  public bgColors = ['#0079bf87', '#d2903487', '#51983987', '#b0463287', '#89609e87', '#cd5a9187', '#4bbf6b87', '#00aecc87', '#838c9187'];
  public unsplashImages: UnsplashImg[] = [];

  constructor(private boardService: BoardsService,
              private activatedRoute: ActivatedRoute) {
  }

  @ViewChild(BoardComponent) boardComp: BoardComponent | undefined;

  @Input() boardWrapper: HTMLElement | undefined;
  @Input() board: BoardInterface | undefined;
  
  ngOnInit(): void {
    this.getUnsplashImage();
  }

  choseType(key: string): void {
    this.bgType = key;
  }

  setBg(item: string, key: string): void {
    let bg = {};

    if (key == 'color') {
      bg = {background: item}
      this.boardWrapper!.style!.background = item;
    }
    if (key === 'unsplash') {
      this.boardWrapper!.style!.background = `url(${item})`;
      bg = {background: `url(${item})`,
      'background-size': 'cover' }
    }

    const board = {
      id: this.activatedRoute.snapshot.queryParams['id'],
      background: JSON.stringify(bg)
    }
      this.boardService.updateBoard(board as BoardInterface)
          .subscribe(_ => {
          })
  }

  getUnsplashImage(): void {
      this.boardService.getUnsplashImg()
          .subscribe(imgs => {
            this.unsplashImages = imgs["results"]
          })
  }
}
