import { Injectable } from '@angular/core';
import { Post } from '../interfaces';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private notifier = new Subject<string>();


  constructor( private http: HttpClient, private authService: AuthService ) {  }

  getPosts(){
     this.http.get('http://localhost:3000/api/posts')
      .subscribe((data: Post[]) => {
        // console.log(data);
        this.posts = data;
        this.postsUpdated.next([...this.posts]);
      })
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  notificationListener() {
    return this.notifier.asObservable();
  }

  addPost(title: string, content: string) {
    // console.log(this.authService.getToken());
    const post:Post = {_id:null, title, content, creator: localStorage.getItem('currentUserID')};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message)
        post._id = responseData.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.notifier.next('added');
      })
  }

  deletePost(postId) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post._id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts])
      this.notifier.next('deleted');
    })
  }

  updatePost(postId, title: string, content: string) {
    const post: Post = {
      _id: postId,
      title: title,
      content: content
    }
    this.http.put('http://localhost:3000/api/posts/' + postId, post)
    .subscribe((response) => {
      const index = this.posts.findIndex(p => p._id === post._id)
      this.posts[index] = post
      this.postsUpdated.next([...this.posts])
      this.notifier.next('updated');
    })
  }

    // getOverview(): Observable <Post[]> {
  //   return this.http.get<Post[]>('http://localhost:3000/api/posts')
  // }

}
