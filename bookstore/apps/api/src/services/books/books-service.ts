import { asClass } from 'awilix'
import { CreateBookService } from './create-book/create-book-service'
import { DeleteBookService } from './delete-book/delete-book-service'
import { FindBookService } from './find-book/find-book-service'
import { ListBooksService } from './list-books/list-books-service'
import { UpdateBookService } from './update-book/update-book-service'

export type BooksServices = {
  createBookService: CreateBookService
  deleteBookService: DeleteBookService
  findBookService: FindBookService
  listBooksService: ListBooksService
  updateBookService: UpdateBookService
}

export const booksServices = {
  createBookService: asClass(CreateBookService).scoped(),
  deleteBookService: asClass(DeleteBookService).scoped(),
  findBookService: asClass(FindBookService).scoped(),
  listBooksService: asClass(ListBooksService).scoped(),
  updateBookService: asClass(UpdateBookService).scoped()
}
