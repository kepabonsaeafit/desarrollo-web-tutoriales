export class Book {

  constructor(
    public id: number,
    public title: string,
    public category: string,
    public price: number,
    public stock: number
  ) { }

  public static findById(books: Book[], id: number): Book | undefined {
    return books.find(book => book.id === id);
  }

}
