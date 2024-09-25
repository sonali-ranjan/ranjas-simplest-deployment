using my.bookshop as my from '../db/schema-books';

service CatalogService {
    @readonly entity Books as projection on my.Books;
}
