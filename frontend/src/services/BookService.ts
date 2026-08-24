import type { BookInterface } from '@/interfaces/BookInterface';
import { useBookStore } from '@/stores/bookstore.js';
import type { CreateBookDTO } from '@/dtos/CreateBookDTO.js';

export class BookService {
  static getBooks(): BookInterface[] {
    return useBookStore().books;
  }

  static getBookById(id: number): BookInterface | undefined {
    return useBookStore().books.find((book) => book.id === id);
  }

  static createBook(book: CreateBookDTO): void {
    const id = useBookStore().books.length + 1;
    useBookStore().books.push({ id, ...book });
  }

  static deleteLastBook(): void {
    useBookStore().books.pop();
  }

  static getUniqueCategories(): string[] {
    const categories = useBookStore().books.map((book) => book.category);
    return Array.from(new Set(categories));
  }
}
