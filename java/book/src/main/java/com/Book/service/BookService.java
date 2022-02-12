package com.Book.service;

import com.Book.obj.Book;

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
            if (csvBook.size() >= 3) {
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
            arr = CSVFileService.readFile("meta-data/book-record.csv", 0);
            System.out.println(arr);
            BookIdMap = new HashMap<String, Book>();
            // Creating some objects of Book while initializing
//                Book javaBook=new Book("1", "Head first java","400");
//                Book springBook=new Book("4", "Spring in action","500");
//                Book pythonBook=new Book("3", "Learning Python","250");
//                Book hiberanteBook=new Book("2", "Hibernate in action","300");
//
//                BookIdMap.put("1", javaBook);
//                BookIdMap.put("4", springBook);
//                BookIdMap.put("3", pythonBook);
//                BookIdMap.put("2", hiberanteBook);
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
            Book Book= BookIdMap.get(id);
            return Book;
        }
        public Book addBook(Book book)
        {
//            Book.setId(getMaxId()+1);
//            BookIdMap.put(Book.getId(), Book);
            return book;
        }

        public Book updateBook(Book book)
        {
//            if(Book.getId()<=0)
//                return null;
//            BookIdMap.put(Book.getId(), Book);
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
