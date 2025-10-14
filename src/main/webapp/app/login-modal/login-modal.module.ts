import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginModalComponent } from './login-modal.component';

@NgModule({
  declarations: [LoginModalComponent],
  imports: [CommonModule, FormsModule],
  exports: [LoginModalComponent]
})
export class LoginModalModule {}
