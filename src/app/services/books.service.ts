import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { HttpService } from "./http.service";
import { retry, catchError, map } from 'rxjs/operators';
import { Config } from "../shared/config";
import { Dictionary } from "../shared/models/Dictionary";
import { Book, BookInfo } from "../shared/models/Book";

@Injectable()
export class BooksService { 

    constructor (private http: HttpClient, private httpServ: HttpService ) { }

    public searchBooks(urlParams: Dictionary<string, string>): Observable<Book[]> {
        let url = '/search.json';
        let result: Observable<Book[]> = this.httpServ.GetRequest(url, urlParams).pipe(
            map( data => {
                let books: Book[] = data['docs'].map( function (item) {
                    let book = new Book;
                    book.isbn = item.isbn ? item.isbn[0] : undefined,
                    book.title = item.title;
                    book.authors = item.author_name;
                    book.publishYear = item.publish_year;
                    return book;
                });
                return books;
            } )
        );
        console.log('BooksService -> searchBooks(urlParams) -> result: ', result);
        return result
    }

    public getBookByISBN(isbn: string): Observable<BookInfo> {
        let urlParams = new Dictionary<string,string>();
        urlParams.Add('bibkeys', 'ISBN:' + isbn);
        urlParams.Add('jscmd', 'data');
        urlParams.Add('format', 'json');
        console.log('getBook()');
        let url = '/api/books';
        let result: Observable<BookInfo> = this.httpServ.GetRequest(url, urlParams).pipe(
            map( data => {
                console.log('BooksService -> this.getBookByISBN -> data from api: ', data);
                let dataBook = data['ISBN:'+isbn];
                let book = new BookInfo;
                book.title = dataBook.title;
                book.isbn = isbn;
                book.publishYear = dataBook.publish_date;
                book.coverUrl = dataBook.cover ? dataBook.cover.medium : 'https://via.placeholder.com/180x230?text=No+photo';
                book.pagesCount = dataBook.number_of_pages;
                book.authors = [];
                if (dataBook.authors) {
                    dataBook.authors.forEach(author => {
                        book.authors.push(author.name);
                    });
                }
                return book
            } )
        );

        console.log('BooksService -> this.getBookByISBN -> result: ', result);
        return result
    }
}