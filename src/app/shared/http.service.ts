import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from './config';
import { Dictionary } from './classes/Dictionary';
import { Book, BookInfo } from './types/Book';

@Injectable()
export class HttpService { 
    constructor ( private http: HttpClient ) {
    }
    Server: string = Config.Instance.url;

    public searchBooks(urlParams): Observable<Book[]> {
        let httpParams = this.getHttpParams(urlParams);
        let headers = new Dictionary<string, string>();
        let Options = this.GetOptions(headers, httpParams);
        let result: Observable<Book[]> = this.http.get(this.Server + '/search.json', Options).pipe(map(data=>{
            console.log('HttpService searchBooks data:', data);
            let Books: Book[] = data['docs'].map( function(item) {
                let book: Book = {
                    isbn: item.isbn ? item.isbn[0] : undefined,
                    title: item.title,
                    authors: item.author_name,
                    publishYear: item.publish_year
                }
                return book;
            } );
            return Books;
        }));
        return result
    }

    public getBookByISBN(isbn: string): Observable<BookInfo> {
        console.log('getBook()');
        let headers = new Dictionary<string, string>();
        let Options = this.GetOptions(headers);
        let Url = this.Server + '/api/books?bibkeys=ISBN:' + isbn + '&jscmd=data&format=json';
        return this.http.get(Url).pipe(map(data=>{
            console.log('api data: ', data);
            let dataBook = data['ISBN:'+isbn];
            let book: BookInfo = { 
                isbn: isbn,
                title: dataBook.title,
                authors: [],
                publishYear: dataBook.publish_year,
                coverUrl: dataBook.cover ? dataBook.cover.medium : 'https://via.placeholder.com/180x230?text=No+photo',
                pagesCount: dataBook.number_of_pages
            }
            if (dataBook.authors) {
                dataBook.authors.forEach(author => {
                    book.authors.push(author.name);
                });
            }
            return book

        }))
    }

    public getBookByLCCN(lccn: string): Observable<Book> {
        console.log('getBook()');
        let headers = new Dictionary<string, string>();
        let Options = this.GetOptions(headers);
        let Url = this.Server + '/api/books?bibkeys=lccn:' + lccn + '&jscmd=data&format=json';
        return this.http.get(Url).pipe(map(data=>{
            console.log('api data: ', data);
            let docs = JSON.parse(data['docs']);
            console.log('docs',docs);
            return docs.map( function(item) {
                let book: Book = { 
                    isbn: item.isbn,
                    title: item.title,
                    authors: item.author_name,
                    publishYear: item.publish_year,
                }
                return book
            } )

        }))
    }

    private getHttpParams(urlParams: Dictionary<string, string>) {
        if (urlParams && urlParams.Count() > 0) {
            let httpParams = new HttpParams();
            urlParams.Foreach(function (key: string, value: string) {
                httpParams = httpParams.append(key, value);
            });
            return httpParams;
        } else {
            return undefined
        }
    }

    private GetOptions(headersDictionary: Dictionary<string, string>, httpParams?: HttpParams) {
        let Headers = new HttpHeaders({
        });

        headersDictionary.Foreach(function (key: string, value: string) {
            Headers.set(key, value);
        });
        let HttpOptions: any = {};
        HttpOptions.headers = Headers;
        if (httpParams) HttpOptions.params = httpParams;
        return HttpOptions;
    }
}