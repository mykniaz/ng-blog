import { Component, OnInit } from '@angular/core';
import { PostsService } from '../shared/components/posts.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs';
import {Post} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
})
export class PostPageComponent implements OnInit {
  id: string;
  post$: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
  ) {}

  ngOnInit() {
    this.post$ = this.route.params
      .pipe(switchMap(({id}: Params) => {
        return this.postsService.getById(id);
      }));
  }

}
