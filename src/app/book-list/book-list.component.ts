import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BooksService } from "../services/books.service";
import { Dictionary } from "../shared/models/Dictionary";
import { Book } from "../shared/models/Book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [BooksService]
})
export class BookListComponent implements OnInit {
  Books: Book[];
  BooksCount: number;
  SearchString: string = 'Hobbit';
  constructor(private bookSrv: BooksService, private router: Router) { }

  ngOnInit(): void {
    this.searchBooks(this.SearchString);
  } 

  viewBook(isbn: string) {
    if (isbn && isbn.length > 0) {
      this.router.navigate(['/view/' + isbn]);
    }
  }

  searchBooks(searchString: string) {
    if (!searchString || searchString.length == 0) return
    this.SearchString = searchString;
    let SearchParams = new Dictionary<string,string>();
    SearchParams.Add('q',searchString);
    this.bookSrv.searchBooks(SearchParams).subscribe(data => {
      if (data) {
        this.Books = data;
        this.BooksCount = data.length;
        console.log('BookListComponent -> searchBooks -> this.Books: ', this.Books);
      }
    });
  }

}
