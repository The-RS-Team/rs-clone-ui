import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UserInterface } from './../../interfaces/user.interface';
import { BoardsService } from '../boards/boards.service';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  public user: UserInterface | undefined;
  private $sub = new Subscription();

  constructor(public authService: AuthService,
              private boardService: BoardsService,
              private storage: LocalStorageService) {
  }
  
  ngOnInit(): void {
    this.user = this.storage.getItem('user');
  }

  getUser(): void {
    if (this.authService.currentUser) {
      this.$sub.add(this.boardService.getUserById(this.authService.currentUser.user_id)
      .subscribe(resp => this.user = resp))
    }
  }

  ngOnDestroy(): void {
      this.$sub.unsubscribe();
  }
}
