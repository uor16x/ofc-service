import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GameService, UserService } from '../../../common/services';
import { ModalService } from '../../../common/services/modal.service';

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
    private readonly modalService: ModalService,
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
    this._closeModal();
  }

  private _closeModal() {
    this.modalService.close();
  }

  onBack() {
    this._closeModal();
  }
}
