import React from "react";
import "./ShopApp.css"

function ShopApp(){

    let arr = [
        {
            "albumId": 1,
            "id": 1,
            "title": "Shirt",
            "price": "799",
            "Phone no": "9123992276",
            "url": "https://via.placeholder.com/600/92c952",
            "thumbnailUrl": "https://via.placeholder.com/150/92c952"
          },
          {
            "albumId": 1,
            "id": 2,
            "title": "Shirt",
            "price": "699",
            "Phone no": "9123992276",
            "url": "https://via.placeholder.com/600/771796",
            "thumbnailUrl": "https://via.placeholder.com/150/771796"
          },
          {
            "albumId": 1,
            "id": 3,
            "title": "Shirt",
            "price": "599",
            "Phone no": "9123992276",
            "url": "https://via.placeholder.com/600/24f355",
            "thumbnailUrl": "https://via.placeholder.com/150/24f355"
          },
          {
            "albumId": 1,
            "id": 4,
            "title": "Shirt",
            "price": "799",
            "Phone no": "9123992276",
            "url": "https://via.placeholder.com/600/d32776",
            "thumbnailUrl": "https://via.placeholder.com/150/d32776"
          },
          {
            "albumId": 1,
            "id": 5,
            "title": "Shirt",
            "price": "899",
            "Phone no": "9123992276",
            "url": "https://via.placeholder.com/600/f66b97",
            "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
          },
          {
            "albumId": 1,
            "id": 6,
            "title": "Shirt",
            "price": "1799",
            "Phone no": "9123992276",
            "url": "https://via.placeholder.com/600/56a8c2",
            "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
          },
          {
            "albumId": 1,
            "id": 7,
            "title": "Shirt",
            "price": "2799",
            "Phone no": "9123992276",
            "url": "https://via.placeholder.com/600/b0f7cc",
            "thumbnailUrl": "https://via.placeholder.com/150/b0f7cc"
          },
          {
            "albumId": 1,
            "id": 8,
            "title": "Shirt",
            "price": "799",
            "Phone no": "9123992276",
            "url": "https://via.placeholder.com/600/54176f",
            "thumbnailUrl": "https://via.placeholder.com/150/54176f"
          },
          {
            "albumId": 1,
            "id": 9,
            "title": "Shirt",
            "price": "799",
            "Phone no": "9123992276",
            "url": "https://via.placeholder.com/600/51aa97",
            "thumbnailUrl": "https://via.placeholder.com/150/51aa97"
          },
          {
            "albumId": 1,
            "id": 10,
            "title": "Shirt",
            "price": "799",
            "Phone no": "9123992276",
            "url": "https://via.placeholder.com/600/810b14",
            "thumbnailUrl": "https://via.placeholder.com/150/810b14"
          },
          {
            "albumId": 1,
            "id": 11,
            "title": "Shirt",
            "price": "799",
            "Phone no": "9123992276",
            "url": "https://via.placeholder.com/600/1ee8a4",
            "thumbnailUrl": "https://via.placeholder.com/150/1ee8a4"
          },
          {
            "albumId": 1,
            "id": 12,
            "title": "Shirt",
            "price": "999",
            "Phone no": "9123992276",
            "url": "https://via.placeholder.com/600/66b7d2",
            "thumbnailUrl": "https://via.placeholder.com/150/66b7d2"
          },
          {
            "albumId": 1,
            "id": 12,
            "title": "Shirt",
            "price": "999",
            "Phone no": "9123992276",
            "url": "https://via.placeholder.com/600/66b7d2",
            "thumbnailUrl": "https://via.placeholder.com/150/66b7d2"
          },
          {
            "albumId": 1,
            "id": 12,
            "title": "Shirt",
            "price": "999",
            "Phone no": "9123992276",
            "url": "https://via.placeholder.com/600/66b7d2",
            "thumbnailUrl": "https://via.placeholder.com/150/66b7d2"
          },
    ]
    return(
        <React.Fragment>
            <h1>Shopping App</h1>
            <div className="app">
                {arr.map((index) => {
                    if(index.price > 799){
                    return(

                        <div className="box">
                            Id: {index.id}; <br />
                            Title: {index.title} <br />
                            Price: ₹{index.price} <br />
                            Phone no.: {index["Phone no"]} <br />
                            url: {index.url} <br />
                            thumbnailUrl: {index.thumbnailUrl} <br />
                        </div>
                    )}
                })}
            </div>
        </React.Fragment>
    )
}
export default ShopApp;