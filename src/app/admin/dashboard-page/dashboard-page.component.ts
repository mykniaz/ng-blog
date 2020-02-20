import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../../shared/interfaces';
import {PostsService} from '../../shared/components/posts.service';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];

  loadPostsSub: Subscription;
  removePostSub: Subscription;
  search = '';

  constructor(private postsService: PostsService, private alertService: AlertService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loadPostsSub = this.postsService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  removePost(id: string) {
    this.removePostSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);

      this.alertService.success('Post was removed successfully!');
    });
  }

  ngOnDestroy(): void {
    if (this.loadPostsSub) {
      this.loadPostsSub.unsubscribe();
    }

    if (this.removePostSub) {
      this.removePostSub.unsubscribe();
    }
  }
}
