import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { BoardsService } from '../../boards/boards.service';
import { WebsocketService } from './../../../shared/services/socket.service';
import { UserInterface } from './../../../interfaces/user.interface';


@Component({
  selector: 'app-tab-accaunt',
  templateUrl: './tab-accaunt.component.html',
  styleUrls: ['./tab-accaunt.component.scss']
})


export class TabAccauntComponent implements OnInit {
  public formGroup: FormGroup | any;
  @Input() user!: UserInterface | undefined;
  
  constructor(private fb: FormBuilder,
              private socketService: WebsocketService,
              private boardService: BoardsService,
              private authService: AuthService) {

               }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nickname: ['', []],
    });
  }
  

  setNick() {
    if (this.authService.currentUser) {
      this.boardService.updateUser({
        user_id: this.authService.currentUser?.user_id,
        nickname: this.formGroup.value.nickname,
        name: this.authService.currentUser.name,
        email: this.authService.currentUser.email,
        picture: this.authService.currentUser.picture
      } as User).subscribe(
        // res => console.log(res)
        )
        this.user!.nickname = this.formGroup.value.nickname;
    }
  }
}
