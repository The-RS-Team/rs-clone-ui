import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserInterface } from './../../interfaces/user.interface';
import { BoardsService } from '../boards/boards.service';
import { LocalStorageService } from './../../shared/services/local-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public user: UserInterface | undefined;


  constructor(public authService: AuthService,
              private boardService: BoardsService,
              private storage: LocalStorageService) {

  }
  
  ngOnInit(): void {
    this.user = this.storage.getItem('user');
    this.getUser()
  }

  getUser() {
    if (this.authService.currentUser) {
      this.boardService.getUserById(this.authService.currentUser.user_id)
      .subscribe(resp => this.user = resp)
    }
  }
}
