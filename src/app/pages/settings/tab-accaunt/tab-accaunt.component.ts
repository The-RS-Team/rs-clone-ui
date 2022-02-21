import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { BoardsService } from '../../boards/boards.service';
import { WebsocketService } from './../../../shared/services/socket.service';
import { LocalStorageService } from './../../../shared/services/local-storage.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tab-accaunt',
  templateUrl: './tab-accaunt.component.html',
  styleUrls: ['./tab-accaunt.component.scss']
})


export class TabAccauntComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup | any;
  @Input() user!: User | undefined;
  private $sub = new Subscription();
  
  constructor(private fb: FormBuilder,
              private boardService: BoardsService,
              private authService: AuthService,
              private storage: LocalStorageService) {

               }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nickname: ['', []],
    });
  }
  

  setNick(): void {
    if (this.authService.currentUser) {
      const user: User = {
        user_id: this.authService.currentUser?.user_id,
        nickname: this.formGroup.value.nickname,
        name: this.authService.currentUser.name,
        email: this.authService.currentUser.email,
        picture: this.authService.currentUser.picture,
        lang: this.authService.currentUser.lang
      }
      this.$sub.add(this.boardService.updateUser(user).subscribe(
        ))
        this.user!.nickname = this.formGroup.value.nickname;
        this.storage.setItem('user', user);
    }
  }

  ngOnDestroy(): void {
      this.$sub.unsubscribe();
  }
}
