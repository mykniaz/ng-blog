import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
  ],
  exports: [
    QuillModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
