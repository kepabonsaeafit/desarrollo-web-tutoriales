export type Book = {
  id: string
  title: string
  author: string
  year: number
  summary: string
}

export const books: Book[] = [
  {
    id: '1',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    year: 2013,
    summary: 'A classic introduction to human-centered design and why some products satisfy while others frustrate.',
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    year: 2008,
    summary: 'Principles and heuristics for writing readable, maintainable software in teams.',
  },
  {
    id: '3',
    title: "You Don't Know JS Yet",
    author: 'Kyle Simpson',
    year: 2020,
    summary: 'A deep dive into JavaScript mechanics, from scope and closures to async patterns.',
  },
  {
    id: '4',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    year: 2017,
    summary: 'Foundations for building reliable, scalable, and maintainable data systems.',
  },
]
