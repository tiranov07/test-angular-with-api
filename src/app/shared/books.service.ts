import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from './config';
import { Dictionary } from './classes/Dictionary';
import { Book, BookInfo } from './types/Book';

@Injectable()
export class BooksService { 

}