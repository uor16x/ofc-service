import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { Game } from '../../../common/models';
import { ModalController } from '@ionic/angular';
import { SocketService } from '../../../common/services';

@Component({
  selector: 'app-game-state',
  templateUrl: './game-state.component.html',
  styleUrls: ['./game-state.component.scss'],
})
export class GameStateComponent implements OnInit {
  editorOptions: JsonEditorOptions;
  game: Game;
  @ViewChild(JsonEditorComponent, { static: false })
  editor: JsonEditorComponent;

  constructor(
    private readonly modalController: ModalController,
    private readonly socketService: SocketService
  ) {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'tree';
  }

  ngOnInit() {}

  onClose() {
    this.modalController.dismiss();
  }

  onUpdate() {
    const updated = this.editor.get();
    this.socketService.updateGame(updated)
  }
}
