import type { Request, Response } from 'express';
import { books } from '../data/books.js';
import { Book } from '../models/Book.js';

export class HomeController {

  static index(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {};
    viewData["title"] = "Home";
    res.render('home/index', { viewData: viewData });
  }

  static about(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {};
    viewData["title"] = "About";
    res.render('home/about', { viewData: viewData });
  }

  static contact(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {};
    viewData["title"] = "Contact";
    res.render('home/contact', { viewData: viewData });
  }

  static list(req: Request, res: Response): void {
    const viewData: { [key: string]: any } = {};
    viewData["title"] = "Books";
    viewData["books"] = books;
    res.render('home/books', { viewData: viewData });
  }

  static show(req: Request, res: Response): void {
    const id = Number.parseInt(String(req.params.id), 10);

    if (Number.isNaN(id)) {
      res.status(404).render('errors/error', {
        viewData: { title: "Not found", status: 404, message: "That book id is not valid." }
      });
      return;
    }

    const book = Book.findById(books, id);

    if (!book) {
      res.status(404).render('errors/error', {
        viewData: { title: "Not found", status: 404, message: `Book with id ${id} was not found.` }
      });
      return;
    }

    const viewData: { [key: string]: any } = {};
    viewData["title"] = book.title;
    viewData["book"] = book;
    res.render('home/show', { viewData: viewData });
  }

}
