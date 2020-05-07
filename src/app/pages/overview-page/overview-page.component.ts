import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { Post } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {
  // posts: Post[];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    // this.postsService.getOverview().subscribe((data) => {
    //   this.posts = data;
    // })
  }

}
