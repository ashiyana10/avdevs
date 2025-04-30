## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/avdevs.git
cd avdevs
```
### 2. Install Dependencies
```bash
npm i
```
### 3. Start the Server
```bash
npm run dev
```
##  Authentication Endpoints

#### POST /api/auth/register

```bash
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /api/auth/login
```bash
{
  "email": "john@example.com",
  "password": "password123"
}
```

## 🛍Product API

### 🔹 1. List Products
**GET** `/api/products`

#### Query Parameters:
| Name        | Type     | Description                              |
|-------------|----------|------------------------------------------|
| `page`      | Number   | Page number (default: 1)                 |
| `limit`     | Number   | Number of products per page (default: 10)|
| `category`  | String   | Filter by product category               |
| `minPrice`  | Number   | Minimum price filter                     |
| `maxPrice`  | Number   | Maximum price filter                     |
| `sortBy`    | String   | Field to sort by: `name`, `price`, `createdAt` |
| `sortOrder` | String   | `asc` or `desc` (default: `asc`)         |
| `search`    | String   | Search by product name or description    |

---

### 🔹 2. Get Product Details
**GET** `/api/products/:id`

- **Description**: Returns details of a single product by ID.

---

### 🔹 3. Create Product (Protected)
**POST** `/api/products`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

#### Request Body:
```json
{
  "name": "iPhone 15",
  "price": 999.99,
  "description": "Latest iPhone model",
  "category": "Electronics"
}
```

### 🔹 4. Update Product (Protected)
**PUT** `/api/products`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

#### Request Body:
```json
{
  "name": "iPhone 15",
  "price": 999.99,
  "description": "Latest iPhone model",
  "category": "Electronics"
}
```
## 🛍️ Favourite API

### 🔹 1. List favorites (Protected)
**GET** `/api/favorites`

#### Query Parameters:
| Name        | Type     | Description                              |
|-------------|----------|------------------------------------------|
| `page`      | Number   | Page number (default: 1)                 |
| `limit`     | Number   | Number of products per page (default: 10)|

---

### 🔹 2. Add  Product to favourite (Protected)
**POST** `/api/favorites`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

#### Request Body:
```json
{
  "ID":"string"
}
```

### 🔹 3. Remove Product from favourite (Protected)
**PUT** `/api/favourites/:ID`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`


