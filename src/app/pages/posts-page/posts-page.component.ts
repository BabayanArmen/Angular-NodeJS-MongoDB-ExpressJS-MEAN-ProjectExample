import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../shared/interfaces';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PostsService } from 'src/app/shared/services/posts.service';
import { Subscription } from 'rxjs';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit, OnDestroy {
  posts: Post[] = []
  postsSub: Subscription;
  form: FormGroup;
  public loading = false;
  private readonly notifier: NotifierService;
  notification: Subscription;
  currentUserID: string;

  constructor(private postsService: PostsService,
              public ngxSmartModalService: NgxSmartModalService,
              notifierService: NotifierService) { this.notifier = notifierService; }

  ngOnInit() {
    this.loading = true;
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required])
    })

    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.loading = false;
    })

    this.notification = this.postsService.notificationListener()
    .subscribe((data) => {
      switch(data) {
        case 'added' : this.notifier.notify("success", "Post Added"); break;
        case 'deleted' : this.notifier.notify("error", "Post Deleted"); break;
        case 'updated' : this.notifier.notify("info", "Post Updated"); break;
      }
    })

    this.currentUserID = localStorage.getItem('currentUserID');
  }

  onAddPost() {
    this.postsService.addPost(this.form.value.title, this.form.value.content)
    this.form.reset();
  }

  onDetele(postId: string) {
    this.postsService.deletePost(postId)
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.notification.unsubscribe();
  }


}
