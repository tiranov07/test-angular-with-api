export class Book {
    isbn: string;
    title: string;
    authors: string[];
    publishYear: number[];
}

export class BookInfo extends Book {
    coverUrl: string;
    pagesCount: number;
}