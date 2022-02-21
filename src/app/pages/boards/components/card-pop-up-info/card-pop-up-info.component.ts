import {
    Component,
    ElementRef,
    Inject,
    OnInit, Optional, Output,
    ViewChild,
} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {BoardsService} from "../../boards.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {OpenFileComponent} from "./open-file/open-file.component";
import {Subscription} from "rxjs";
import {FileInterface} from "../../../../interfaces/file.interface";
import {Card} from "../../../../models/card";
import {WebsocketService} from "../../../../shared/services/socket.service";
import {Messages} from "../../../../app.constants";
import {CardInterface} from "../../../../interfaces/card.interface";
import {FilesService} from "../../files.servise";

@Component({
    selector: "app-card-pop-up-info",
    templateUrl: "./card-pop-up-info.component.html",
    styleUrls: ["./card-pop-up-info.component.scss"],
})
export class CardPopUpInfoComponent implements OnInit {
    @ViewChild("descriptionTextarea") descriptionTextarea: ElementRef | undefined;
    @ViewChild("test") test: ElementRef | undefined;
    @ViewChild("link") link: ElementRef | undefined;

    public imageEl: HTMLImageElement | undefined;
    public files: any[] = [];
    public filesCount = 0;

    public file: File | undefined;
    fileName = "";
    fileValue: any;

    private sub$ = new Subscription();

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialog: MatDialog,
                public dialogRef: MatDialogRef<CardPopUpInfoComponent>,
                private _snackBar: MatSnackBar,
                private sanitization: DomSanitizer,
                private http: HttpClient,
                private boardsService: BoardsService,
                private filesService: FilesService,
                private socketService: WebsocketService,) {
    }

    ngOnInit(): void {
        this.getFilesByCardId(this.data.id);

        this.getCardItems();
        this.socketService.on(Messages.getCarditems, (info: any) => {
            this.data.cardItems = info;
        })

        this.socketService.on(Messages.updateCard, this.updateCardCallback.bind(this));
        this.socketService.on(Messages.newFile, this.newFileCallback.bind(this));
        this.socketService.on(Messages.deleteFile, this.deleteFileCallback.bind(this));
    }


    newFileCallback(file: FileInterface) {
        this.getFilesByCardId(this.data.id);
    }

    deleteFileCallback(file: any) {
        console.log(file, 'FILE DELETE')
        console.log(this.files, "DO")
        this.files = this.files.filter(el => el.id !== file.id)
        console.log(this.files, "Aftre")
        this.getFilesByCardId(this.data.id);


    }

    updateCardCallback(card: CardInterface) {
    }

    public changeCardParam(title: string, description: string, src?: string | null) {
        this.data.title = title;
        this.data.description = description;
        this.data.cover = src;

        const item = {
            id: this.data.id,
            title: this.data.title,
            columnId: this.data.columnId,
            position: this.data.position,
            description: this.data.description,
            cover: this.data.cover
        }
        this.socketService.emit(Messages.updateCard, item);
    }


    public convertFiles(files: any): void {
        files = files.map((file: any) => {
            if (!file) {
                return;
            }
            let binary = "";
            let bytes = new Uint8Array(file.buffer.data);
            let len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            let base64 = window.btoa(binary);

            file.src = "data:" + file.mimetype + ";base64," + base64;

            return file;
        });
    }

    openDialog(file: FileInterface) {
        console.log(file, 'FILE')

        if (!file) return;
        console.log(file.mimetype, 'FILE MIME')
        if (file.mimetype.split("/")[0] !== "image" &&
            file.mimetype.split("/")[0] !== "gif") {
            // let downloadLink = document.createElement("a");
            let binary = "";
            let bytes = new Uint8Array(file.buffer.data);
            let len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            let base64 = window.btoa(binary);
            const downloadLink = document.createElement("a");
            downloadLink.href = "data:" + file.mimetype + ";base64," + base64;
            downloadLink.setAttribute("download", file.originalname);
            downloadLink.click();
            return;
        }
        const dialogRef = this.dialog.open(OpenFileComponent, {
            panelClass: "my-class",
            data: file,
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }

    getFilesByCardId(id: string): void {
        this.sub$.add(
            this.filesService
                .getAllFiles(id)
                .subscribe((files) => {
                    this.files = files;
                    this.convertFiles(this.files);
                }));
    }

    getCardItems() {
        this.socketService.emit(Messages.getCarditems, this.data.id)
    }

    getFile(id: any) {
        this.filesService.getFileById(id).subscribe((blob) => {
        });
    }

    onFileSelected(event: Event) {

        // @ts-ignore
        const file: File = event.target?.files[0];
        if (!file) return;
        if (file!.size > 1000000) {
            this._snackBar.open('The file size should not exceed 1 MB', 'Close', {
                duration: 5000,
            });
            return;
        }
        const fileToUpload = {
            originalname: file.name,
            size: file.size,
            mimetype: file.type,
            encoding: '',
            buffer: file,
            cardId: this.data.id,
        }
        this.socketService.emit(Messages.newFile, fileToUpload);
        this.changeCardParam(this.data.title, this.data.description);
        this.getFilesByCardId(this.data.id);
    }

    onDeleteFile(fileId: string): void {
        this.socketService.emit(Messages.deleteFile, fileId);
        this.getFilesByCardId(this.data.id);

    }

    public ngOnDestroy() {
        this.dialogRef.close(this.files);
        this.sub$.unsubscribe();
        this.socketService.socket.removeListener(Messages.updateCard);
        this.socketService.socket.removeListener(Messages.newFile);
    }
}
