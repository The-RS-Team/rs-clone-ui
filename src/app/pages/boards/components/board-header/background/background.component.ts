import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BoardsService} from "../../../boards.service";
import {ActivatedRoute} from "@angular/router";
import {BoardInterface, UnsplashImg} from "../../../../../interfaces/board.interface";
import {HttpClient} from "@angular/common/http";
import {BoardComponent} from "../../board/board.component";

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})

export class BackgroundComponent implements OnInit {
  bgType = '';
  bgColors = ['#0079bf87', '#d2903487', '#51983987', '#b0463287', '#89609e87', '#cd5a9187', '#4bbf6b87', '#00aecc87', '#838c9187'];
  public unsplashImages: UnsplashImg[] = [];

  constructor(private boardService: BoardsService,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient
              ) {

  }

  @ViewChild(BoardComponent) boardComp: BoardComponent | undefined;

  @Input()
  boardWrapper: HTMLElement | undefined;

  ngOnInit(): void {
    this.getUnsplashImage();
  }

  choseType(key: string) {
    this.bgType = key;
  }

  setBg(item: string, key: string) {
    let bg = {};

    if (key == 'color') {
      bg = {background: item}
      this.boardWrapper!.style.background = item;
    }
    if (key === 'unsplash') {
      this.boardWrapper!.style.background = `url(${item})`;
      bg = {background: `url(${item})`,
      'background-size': 'cover' }
    }

    const board = {
      id: this.activatedRoute.snapshot.queryParams['id'],
      background: JSON.stringify(bg)
    }
      this.boardService.updateBoard(board as BoardInterface)
          .subscribe(board => {
          })
  }

  getUnsplashImage() {
      this.boardService.getUnsplashImg()
          .subscribe(imgs => {
            this.unsplashImages = imgs["results"]
          })
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target?.files as FileList;
    const file = files[0];

    // if (file) {
    //   this.boardService.uploadFile(file)
    //       .subscribe( file =>
    //   console.log(file))
    // }
  }
}
