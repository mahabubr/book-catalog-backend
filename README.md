## Book Catalog

# Live Link : https://book-catallog-backend-ebon.vercel.app/

### Application Routes:

### User

- api/v1/auth/signup [ POST ]
- api/v1/auth/signin [ POST ]
- api/v1/users [ GET ]
- api/v1/users/ec491db0-3f60-4ffd-a913-d2186c27e13e [ GET SINGLE ]
- api/v1/users/39e53414-06e5-4fcc-993b-de079d61ef52 [ PATCH]
- api/v1/6fdebb51-1381-4f4a-85cb-5623652dbb0b [ DELETE ]
- api/v1/profile [ GET ]

### Category

- api/v1/categories/create-category [ POST ]
- api/v1/categories [ GET ]
- api/v1/categories/ccb0e805-28c3-4f11-a106-6d92b4b537d9 [ GET SINGLE ]
- api/v1/categories/ccb0e805-28c3-4f11-a106-6d92b4b537d9 [ PATCH ]
- api/v1/categories/6206e1fd-4152-40c7-94c2-00ca7d075d8f [ DELETE ]

### Books

- api/v1/books/create-book [ POST ]
- api/v1/books [ GET ]
- api/v1//books/?page=2&size=8&sortBy=price&sortOrder=desc&minPrice=30&maxPrice=30&category=ccb0e805-28c3-4f11-a106-6d92b4b537d9&search=Science [ FILTER ]
- api/v1/books/6206e1fd-4152-40c7-94c2-00ca7d075d8f/category [ SINGLE GET CATEGORY]
- api/v1/books/1f2e3d4c-5b6a-7d8e-9f0a-2c3d4e5b6a7f [ SINGLE GET ]
- api/v1/books/1f2e3d4c-5b6a-7d8e-9f0a-2c3d4e5b6a7f [ PATCH ]
- api/v1/books/0f9a8e7d-5b4c-3d2e-1a0b-6c7f8d9a8e7d [ DELETE ]

### Orders

- api/v1/orders/create-order [ POST ]
- api/v1/orders [ GET ]
- api/v1//orders/4b6cd83d-eeb9-4021-8fdf-2b7f44fef169 [ SINGLE GET ]
