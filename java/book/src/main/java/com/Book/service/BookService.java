package com.book.service;

import com.book.obj.Book;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class BookService {

        static HashMap<String, Book> BookIdMap = getBookIdMap();

        public BookService() {
            super();
        }
        private Book getBookFromCsvData(int bookId, ArrayList<String> csvBook) {
            if (csvBook == null) {
                return null;
            }
            String id, title, pages;
            Book tempBook = null;
            if (csvBook.size() >=3) {
                id = Integer.toString(bookId);//csvBook.get(0);
                title = csvBook.get(1);
                pages = csvBook.get(2);
                tempBook = new Book(id, title, pages);
            }
            return tempBook;
        }
        private void generateBookIdMap() {
            ArrayList<ArrayList<String>> arr = new ArrayList<ArrayList<String>>();
            CSVFileService CSVFileService = new CSVFileService();
//            arr = CSVFileService.readFile("meta-data/book-record.csv", 0);
            ReadExcel readExcel = new ReadExcel();
            //arr = readExcel.readFile("meta-data/book-record.xlsx", 0);
            arr = readExcel.readFile("meta-data/Daily-Report-Card.xlsx", 0);
            System.out.println(arr);
            BookIdMap = new HashMap<String, Book>();
            // Creating some objects of book while initializing
//                book javaBook=new Book("1", "Head first java","400");
//                BookIdMap.put("1", javaBook);
            Book tempBook;
            int bookId = 1;
            if (arr != null) {
                for (int i=0; i<arr.size(); i++) {
                    tempBook = this.getBookFromCsvData(bookId, arr.get(i));
                    if (tempBook != null) {
                        bookId++;
                        BookIdMap.put(tempBook.getId(), tempBook);
                    }

                }
            }
        }
        public List<Book> getAllBooks()
        {
            this.generateBookIdMap();
            List<Book> books = new ArrayList<>(BookIdMap.values());
            return books;
        }

        public Book getBook(String id) {
            this.generateBookIdMap();
            Book book= BookIdMap.get(id);
            if (book == null) {
                book = new Book(id, "Book Not Found", "0");
            }
            return book;
        }
        public Book addBook(Book book)
        {
//            book.setId(getMaxId()+1);
//            BookIdMap.put(book.getId(), book);
            return book;
        }

        public Book updateBook(Book book)
        {
//            if(book.getId()<=0)
//                return null;
//            BookIdMap.put(book.getId(), book);
            return book;

        }
        public void deleteBook(int id)
        {
            BookIdMap.remove(id);
        }

        public static HashMap<String, Book> getBookIdMap() {
            return BookIdMap;
        }

        // Utility method to get max id
        public static int getMaxId()
        { int max=0;
            for (String id:BookIdMap.keySet()) {
//                if(max<=id)
//                    max=id;

            }
            return max;
        }
    }
