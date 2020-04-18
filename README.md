# e-commerce-cms
Content Management System for E-Commerce

Links:
* Client : https://shopbae.web.app
* Server : https://shopbae.herokuapp.com

## RESTful endpoints

### GET /product
> Get product item by id

_Request Header_
```
{
  "Content-Type": "application/json; charset=utf-8",
  "accessToken": "<access_token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "products": [
        {
            "id": 1,
            "name": "iPhone",
            "image_url": "https://ibox.co.id/media/catalog/product/cache/3/image/9df78eab33525d08d6e5fb8d27136e95/i/p/iphone11-ungu_3.png",
            "price": 1000,
            "stock": 10,
            "createdAt": "2020-04-18T10:13:24.576Z",
            "updatedAt": "2020-04-18T10:13:24.576Z"
        }
    ]
}
```


_Response (404 - Not Found)_
```
{
    "message": "token not not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<returned error message>"
}
```

---
### POST /product
> Add product item to database

_Request Header_
```
{
    "Content-Type": "application/json; charset=utf-8",
    "accessToken": "<access_token>"
}
```
_Request Body_
```
{
    "name": "Samsung",
    "image_url": "https://www.three.co.uk/static/images/device_pages/MobileVersion/Samsung/Galaxy_Note_10_Plus_5G/Aura_Glow/carousel/2.jpg",
    "price": 900,
    "stock": 100,
}
```
_Response (201 - OK)_
```
{
    "product": {
        "id": 2,
        "name": "Samsung",
        "image_url": "https://www.three.co.uk/static/images/device_pages/MobileVersion/Samsung/Galaxy_Note_10_Plus_5G/Aura_Glow/carousel/2.jpg",
        "price": 900,
        "stock": 100,
        "updatedAt": "2020-04-18T10:18:43.696Z",
        "createdAt": "2020-04-18T10:18:43.696Z"
    }
}
```


_Response (400 - Bad Request)_
> Validation Error (Fields are empty)
```
{
    "message": "Invalid Input"
}
```

_Response (404 - Not Found)_
```
{
    "message": "token not not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "<returned error message>"
}
```

---

### PUT /product/:id
> Edit Product item in database by id

_Request Header_
```
{
    "Content-Type": "application/json; charset=utf-8",
    "accessToken": "<access_token>"
}
```
_Request Body_
```
{
    "name": "Samsung Galaxy Note",
    "image_url": "https://www.three.co.uk/static/images/device_pages/MobileVersion/Samsung/Galaxy_Note_10_Plus_5G/Aura_Glow/carousel/2.jpg",
    "price": 900,
    "stock": 100,
}
```
_Response (200 - OK)_
```
{
    "product": {
        "id": 2,
        "name": "Samsung Galaxy Note",
        "image_url": "https://www.three.co.uk/static/images/device_pages/MobileVersion/Samsung/Galaxy_Note_10_Plus_5G/Aura_Glow/carousel/2.jpg",
        "price": 900,
        "stock": 100,
        "createdAt": "2020-04-18T10:18:43.696Z",
        "updatedAt": "2020-04-18T10:20:45.656Z"
    }
}
```

_Response (403)_
>User is not Authorized
```
{
    "message": "Access Forbidden"
}
```

_Response (401)_
> Validation Error (Fields are empty)
```
{
    "message": "Invalid Input"
}
```

_Response (404 - Not Found)_
```
{
    "message": "token not not found"
}
```


_Response (404 - Not Found)_
```
{
    "message": "Product Not Found"
}
```


_Response (500 - Internal Server Error)_
```
{
    "message": "<returned error message>"
}
```



---

### DELETE /todos/:id
> Delete product item from database by id

_Request Header_
```
{
    "Content-Type": "application/json; charset=utf-8",
    "accessToken": "<access_token>"
}
```
_Request Body_
```
not needed
```
_Response (200 - OK)_
```
{
    "message": "Product Successfully Deleted"
}
```

_Response (403)_
>User is not Authorized
```
{
  "message": "Access Forbidden"
}
```

_Response (404 - Not Found)_
```
{
    "message": "token not not found"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Product not found"
}
```


_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

---

### Post /login
> Login User to Website

_Request Header_
```
{
  "Content-Type": "application/json; charset=utf-8",
}
```

_Request Body_
```
{
   "email": "admin@gmail.com",
   "password": "password",
}
```

_Response (200 - OK)_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTU4NzIwNTYxOX0.N403FFlblWAIqnc8Z-XlungQTLNjM0DT602-8StKgvE"
}
```

_Response (400)_
```
{
    "message": "Incorrect Email/Password"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "<returned error message>"
}
```

---