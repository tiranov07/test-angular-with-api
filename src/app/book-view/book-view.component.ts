import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { HttpService } from "../shared/http.service";
import { BookInfo } from "../shared/types/Book";

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  providers: [HttpService]
})
export class BookViewComponent implements OnInit {
  Isbn: string;
  Book: BookInfo;
  @ViewChild('rating') RatingComponent;
  constructor( 
    private ActiveRoute: ActivatedRoute, 
    private http: HttpService, 
    private location: Location 
  ) { }

  ngOnInit(): void {
    this.Isbn = this.ActiveRoute.snapshot.params['isbn'];
    console.log('BookViewComponent this.Isbn: ',this.Isbn);
    if (this.Isbn && this.Isbn.length > 0) {
      this.http.getBookByISBN(this.Isbn).subscribe(data => this.Book = data);
    }
  }

  goBack() {
    this.RatingComponent.saveRating();
    this.location.back();
  }

}
