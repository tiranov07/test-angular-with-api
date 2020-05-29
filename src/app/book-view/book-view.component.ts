import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { BooksService } from "../services/books.service";
import { BookInfo } from "../shared/models/Book";

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  providers: [BooksService]
})
export class BookViewComponent implements OnInit {
  Isbn: string;
  Book: BookInfo;
  @ViewChild('rating') RatingComponent;
  constructor( 
    private ActiveRoute: ActivatedRoute, 
    private bookSrv: BooksService, 
    private location: Location 
  ) { }

  ngOnInit(): void {
    this.Isbn = this.ActiveRoute.snapshot.params['isbn'];
    console.log('BookViewComponent this.Isbn: ',this.Isbn);
    if (this.Isbn && this.Isbn.length > 0) {
      this.bookSrv.getBookByISBN(this.Isbn).subscribe(data => {
        this.Book = data;
        console.log('BookViewComponent -> this.Book: ', this.Book);
      });
    }
  }

  goBack() {
    this.RatingComponent.saveRating();
    this.location.back();
  }

}
