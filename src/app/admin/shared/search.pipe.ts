import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../../shared/interfaces';

@Pipe({name: 'searchPost'})
export class SearchPipe implements PipeTransform{
  transform(posts: Post[], search = ''): Post[] {
    if (!search.trim()) {
      return posts;
    }

    return posts.filter(post => {
      const normSearch = search.toLocaleLowerCase();

      const normTitle = post.title.toLocaleLowerCase();
      const normText = post.title.toLocaleLowerCase();
      const normAuthor = post.title.toLocaleLowerCase();

      return normTitle.includes(normSearch) ||  normText.includes(normSearch) || normAuthor.includes(normSearch);
    });
  }
}
