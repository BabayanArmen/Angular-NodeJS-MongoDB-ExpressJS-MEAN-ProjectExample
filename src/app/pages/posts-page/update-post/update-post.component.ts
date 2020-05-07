import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  postId: string;
  form: FormGroup;

  //// This is for queryParamMap example, we don't need it in this project
  // title: string;
  // content: string;
  //////////////////////////////////////////////////////////////////////

  constructor(private activatedRoute: ActivatedRoute,
              private postsService: PostsService
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.postId = paramMap.get('id');
    })

    this.form = new FormGroup({
      title: new FormControl(null, [Validators. required]),
      content: new FormControl(null, [Validators.required])
    })

    //// This is for queryParamMap example, we don't need it in this project
    // this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
    //   this.title = paramMap.get('title');
    //   this.content = paramMap.get('content');
    // })
    ////////////////////////////////////////////////////////////////////////

  }

  onEditPost() {
    this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content)
    this.form.reset();
  }


}
