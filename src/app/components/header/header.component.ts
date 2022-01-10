import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-welcome-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public svgColor: string = '#0076bc';

  constructor() {
  }

  ngOnInit(): void {
  }

}
