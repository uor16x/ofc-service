import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GameService, UserService } from '../../../common/services';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-host-modal',
  templateUrl: './host-modal.component.html',
  styleUrls: ['./host-modal.component.scss'],
})
export class HostModalComponent implements OnInit {
  newGameForm = this.fb.group({
    name: ['', [Validators.required]],
    stake: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly gameService: GameService,
    private readonly modalController: ModalController,
    private readonly userService: UserService
  ) {}

  ngOnInit() {}

  async onHost() {
    const formValue = this.newGameForm.value;
    const createGameData = {
      ...formValue,
      hostName: await this.userService.getNickname(),
    };
    this.gameService.hostGame(createGameData).subscribe();
    this.gameService.getAllGames();
    this._closeModal();
  }

  private _closeModal() {
    this.modalController.dismiss();
  }

  onBack() {
    this._closeModal();
  }
}
