import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private visible = false;
  private modals: IModal[] = [];

  constructor() { }

  isModalOpen(id: string) {
    // return this.visible;
    // optional chaining
    // undefined -> false
    return !!this.modals.find(e => e.id === id)?.visible;
  }

  toggleModal(id: string) {
    // this.visible = !this.visible;
    const modal = this.modals.find(e => e.id === id);
    if (modal) {
      modal.visible = !modal.visible;
    }
  }

  register(id: string) {
    this.modals.push({ id, visible: false });
  }

  unregister(id: string) {
    this.modals = this.modals.filter(e => e.id !== id);
  }
}

interface IModal {
  id: string;
  visible: boolean;
}