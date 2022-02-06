import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {
  menu: HTMLElement | undefined;
  isMenuOpen = false;
  isSubMenu = false;
  settings = '';

  constructor() { }

  @ViewChild('menuWrapper') menuWrapper: ElementRef | undefined;

  @Input()
  boardWrapper: HTMLElement | undefined;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.menu = this.menuWrapper?.nativeElement;
  }

  openMenu() {
    this.menu!.className = 'menu opened';
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.menu!.className = 'menu';
    this.isMenuOpen = false;
  }

  openSettings(key: string) {
    this.isSubMenu = true;
    switch (key) {
      case 'bg':
        this.settings = 'bg';
        break;
    }
  }

  goBack(path: string) {
    this.settings = path;
  }

}
