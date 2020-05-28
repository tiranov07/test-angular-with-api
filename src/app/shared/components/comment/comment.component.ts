import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() BookISBN: string;
  @Input() ReadOnly: boolean = false;
  comment: string;
  constructor() { }

  ngOnInit(): void {
    this.loadComment();
  }

  saveComment() {
    console.log(`saveComment() comment: ${this.comment}`);
    if (this.comment.length > 0) {
      localStorage.setItem('comment_'+this.BookISBN, this.comment);
    }
  }

  loadComment() {
    let LsComment: string = localStorage.getItem('comment_'+this.BookISBN);
    if (LsComment && LsComment.length > 0) this.comment = LsComment;
  }

}
