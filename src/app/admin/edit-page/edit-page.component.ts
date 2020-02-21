// RxJs
import { Subscription } from 'rxjs';
// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Services
import { PostsService } from '../../shared/components/posts.service';
// Interfaces
import { Post } from '../../shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  post: Post;
  form: FormGroup;
  loadPostSub: Subscription;
  updatePostSub: Subscription;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.loadPost(params.id);
    });
  }

  loadPost(id: string) {
    this.isLoading = true;

    this.loadPostSub = this.postsService.getById(id).subscribe((post: Post) => {
      this.post = post;

      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required),
      });

      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    const {title, text} = this.form.value;

    this.updatePostSub = this.postsService.update({
      ...this.post,
      title,
      text,
    }).subscribe((response) => {
      this.post = {...this.post, ...response};
      this.form.patchValue(response);
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.loadPostSub) {
      this.loadPostSub.unsubscribe();
    }

    if (this.updatePostSub) {
      this.updatePostSub.unsubscribe();
    }
  }
}
