import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpService } from "../shared/http.service";
import { Dictionary } from "../shared/classes/Dictionary";
import { Book } from "../shared/types/Book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [HttpService]
})
export class BookListComponent implements OnInit {
  Books: Book[];
  BooksCount: number;
  SearchString: string = 'Hobbit';
  constructor(private httpService: HttpService, private router: Router) { }

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
    this.httpService.searchBooks(SearchParams).subscribe(data => {
      if (data) {
        this.Books = data;
        this.BooksCount = data.length;
        console.log('this.Books: ', this.Books);
      }
    });
  }

}
