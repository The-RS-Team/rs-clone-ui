import { Component, Input, OnInit, Output, OnDestroy } from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {FormBuilder, FormGroup} from "@angular/forms";
import {WebsocketService} from "../../../../../shared/services/socket.service";
import {Messages} from "../../../../../app.constants";
import {CardItemInterface} from "../../../../../interfaces/card-item.interface";
import {AuthService} from "../../../../../auth/auth.service";
import {Card} from "../../../../../models/card";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})

export class AddCommentComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup | any;
  public formGroupEdit: FormGroup | any;
  comments: CardItemInterface[] = [];
  isEdit = false;
  editedComment: string = '';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: false,
    uploadUrl: 'v1/image',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'heading',
        'fontName',
        'indent',
        'outdent',
        'customClasses',
        'unlink',
        'insertVideo',
        'insertHorizontalRule',
        'toggleEditorMode'
      ]
    ]
  };
  editorConfigEdit: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: false,
    uploadUrl: 'v1/image',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'heading',
        'fontName',
        'indent',
        'outdent',
        'customClasses',
        'unlink',
        'insertVideo',
        'insertHorizontalRule',
        'toggleEditorMode'
      ]
    ]
  };

  constructor(private fb: FormBuilder,
              private socketService: WebsocketService,
              public authService: AuthService) { }

  @Input() public currentCard!: Card;

  ngOnInit(): void {
    this.socketService.socket.on(Messages.newCarditem, (msg) => this.newCommentCallback(msg));
    this.socketService.socket.on(Messages.deleteCarditem, msg => this.deleteCommentCallback(msg));
    this.socketService.socket.on(Messages.updateCarditem, msg => this.updateCommentCallback(msg));

    this.formGroup = this.fb.group({
      comment: ['', []]
    });
    this.formGroupEdit = this.fb.group({
      commentEdit: ['', []]
    });
  }

  ngOnDestroy() {
    this.socketService.socket.removeAllListeners();
  }

  newCommentCallback(msg: CardItemInterface) {
      if (msg) {
        console.log(msg)
        this.currentCard.cardItems.push(msg);
    }
  }
  deleteCommentCallback(msg: any) {
      if (msg) {
        this.currentCard.cardItems = this.currentCard.cardItems.filter( el => el.id != msg.raw[0]);;
    }
  }
  updateCommentCallback(msg: CardItemInterface) {
      if (msg) {
        console.log(msg)
        let index = this.currentCard.cardItems.findIndex( (el: CardItemInterface) => el.id === msg.id);
          this.currentCard.cardItems[index].info = msg.info;
       }
  }

  showEditor() {
    this.editorConfig.showToolbar = true;
  }

  saveComment() {
    if (this.formGroup.value.comment === '') return;
    this.editorConfig.showToolbar = false;

    if (this.currentCard?.id && this.authService.currentUser?.user_id) {
      this.socketService.socket.emit(Messages.newCarditem, {
            info: this.formGroup.value.comment,
            cardId: this.currentCard?.id,
            userId: this.authService.currentUser?.user_id
          })
    }
    this.formGroup.reset({'comment': ''});
  }

  deleteComment(comment: CardItemInterface) {
    this.socketService.socket.emit(Messages.deleteCarditem, comment.id);
    this.comments = this.comments?.filter( el => {
      return el.id != comment.id;
    })
  }

  editComment(comment: CardItemInterface) {
    this.formGroupEdit.patchValue({
      commentEdit: comment.info
    })
    this.isEdit = true;
    this.editorConfigEdit.showToolbar = true;
    if (comment.id) {
      this.editedComment = comment.id;
    }
  }

  saveEditedComment() {
    this.isEdit = false;
    this.socketService.socket.emit(Messages.updateCarditem, {
      info: this.formGroupEdit.value.commentEdit,
      id: this.editedComment,
    })
    this.editedComment = '';

  }

  // getUserById(id: string) {
  //   let commentUser: UserInterface | undefined;
  //   this.boardService.getUserById(id)
  //       .subscribe( user => {
  //         commentUser = user;
  //   })
  //   console.log(commentUser)
  //   return commentUser;
  // }
}
