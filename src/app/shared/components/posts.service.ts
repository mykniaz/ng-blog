// Libs
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Environment
import { environment } from '../../../environments/environment';
// Interfaces
import { FbCreateResponse, Post } from '../interfaces';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(
    private http: HttpClient
  ) {}

  create(post: Post): Observable<Post> {
    return this.http.post<FbCreateResponse>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe<Post>(map<FbCreateResponse, Post>(
        (response: FbCreateResponse) => {
          const newPost: Post = {
            ...post,
            id: response.name,
            date: new Date(post.date)
          };

          return newPost;
        }
      ));
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }

  update({id, ...post}: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${id}.json`, post);
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(map(
        (post: Post) => {
          const newPost: Post = {
            ...post,
            id,
            date: new Date(post.date)
          };

          return newPost;
        }
      ));
  }

  getAll(): Observable<Post[]> {
    return this.http.get<{[key: string]: any}>(`${environment.fbDbUrl}/posts.json`)
      .pipe(map(
        (response: {[key: string]: any}) => {
          return Object.keys(response).map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date),
          }));
        }
      ));
  }
}
