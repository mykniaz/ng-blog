import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent {
  @Input() post: Post;
}
