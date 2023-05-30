# SUKAHATI ASSESMENT

## Marketing Needs Analysis

- based on marketing needs, here are the endpoint backend architecture that i suggested

### ERD

![ERD](public/images/ERD.png)

#### explanations

- a user can only have one brand and multiple brand substations. by this, user can buy product('s) by its brand subtation
- a user can only have one authentication token. Everytime a user trying to login and succeeded, current token will be removed and create a new one
- cities table are created so in the future it can be expaned to another needs such as to know how many substation in one city, or if the company need to know how much product needed to be sent in one city.

## Features

- User registration: Allows users to register with a brand and create associated substations.
- User Authorization: user must login to be able to buy products.
- User Transaction : user can buy multiple product via its substation.
- Admin : an admin can get user info to look at their average product needs per transactions. admin also can get user transaction info.
- JSON message format: API follows a JSON message format for request and response payloads.
- Clear response messages: Provides clear and descriptive response messages for successful and error scenarios.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`

## Configuration

1. create a `.env` file,
2. Modify the `.env` file and set the environment variables according to your configuration.

## Usage

1. start migrating : `npm run migrate-dev`
2. generate seeds : `npm run gen-seeds-dev`
3. Start the server: `npm start`
4. Send API requests to the appropriate endpoints (see API documentation below).

## API Documentation

### Register a User

Endpoint: `/api/auth/register`
Method: `POST`
Request Body:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "phone": "081234567890", //indonesian format
  "password": "my_password",
  "brandName": "My Brand",
  "substationData": [
    {
      "name": "Substation 1",
      "address": "123 Substation St, City",
      "city_id": "city id on database",
      "phone": "081234567890" //indonesian format
    },
    {
      "name": "Substation 2",
      "address": "456 Substation St, City",
      "city_id": "city id on database",
      "phone": "081234567890" //indonesian format
    }
  ]
}
```

- register error message example

```json
{
  "status": 400,
  "message": "email already taken!"
}
```

```json
{
  "status": 400,
  "message": "Phone number already taken"
}
```

- register success response

```json
{
  "status": 201,
  "message": "Success",
  "data": {
    "message": "Register Success"
  }
}
```

### User Login

Endpoint: `/api/auth/login`
Method: `POST`
Request Body:

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "my_password"
}
// user can login with username or email but not both
```

- login response

```json
{
  "status": 200,
  "message": "Success",
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4N2NkMTU3Ny00M2JkLTQ4MzMtOWY3OC1lODk0YmRhZGJkYTQiLCJ1c2VybmFtZSI6ImpvaG5kb2UxIiwiYnJhbmRJZCI6IjNlYWJhMWZmLTZjYTctNDczOC04YzEzLThjZGE2YTE0YmQ2OCIsImlhdCI6MTY4NTQzNjE2MSwiZXhwIjoxNjg1NDM5NzYxLCJpc3MiOiJsb2dpbiJ9.brbubZb1_psaqgCmIKa5yzRnPenfTwfKoAKUPV6uqfk"
}
```

- login error response if username or email is not included

```json
{
  "status": 400,
  "message": "email/username is required"
}
```

- wrong email/username/password login response

```json
{
  "status": 401,
  "message": "email/username/password is wrong"
}
```

### User New Transaction

Endpoint: `/api/transaction/new`
Method: `POST`
Request Body:

```json
{
  "substationId": "user substation id",
  "orders": [
    {
      "productId": "product id on database",
      "quantity": 150
    },
    {
      "productId": "product id on database",
      "quantity": 250
    },
    {
      "productId": "product id on database",
      "quantity": 100
    }
  ]
}
```

- new user transaction response

```json
{
  "status": 201,
  "message": "Success",
  "data": {
    "id": "07e404d4-8ba2-4edc-8315-f931f7c8b941",
    "brandName": "NFC Bogor",
    "status": "Pending",
    "product": [
      {
        "product_name": "Karkas",
        "classification": "0.4 - 0.7",
        "price": 43500,
        "quantity": 150,
        "subtotal": 4567500
      },
      {
        "product_name": "Ati Ampela",
        "classification": "Bersih",
        "price": 22500,
        "quantity": 250,
        "subtotal": 1125000
      },
      {
        "product_name": "Boneless",
        "classification": "Dada",
        "price": 53500,
        "quantity": 100,
        "subtotal": 5350000
      }
    ]
  }
}
```

## User Cancel Transaction

Endpoint: `/api/transaction/cancel/{transactionId}`
Method: `PATCH`
Request Body:

- cancel transaction response

```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "id": "c0e62a7e-1807-41f3-8acf-2547e7123a62",
    "status": "Cancelled",
    "updated_at": "2023-05-30T06:59:48.065Z"
  }
}
```

-- transaction not found

```json
{
  "status": 404,
  "message": "Transaction not found"
}
```

## Admin GET User Info

Endpoint: `/api/admin/brands/{brandId}`
Method: `get`

- response

```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "brandName": "Happy Chicken",
    "products": [
      {
        "product": {
          "id": "f7c2635d-36b0-4590-96bb-feb4cf100a5e",
          "product_name": "Karkas",
          "classification": "0.4 - 0.7",
          "type": "Ayam Utuh",
          "unit": "Ekor",
          "multiplier": "0.7",
          "price": 43500,
          "createdAt": "2023-05-29T17:27:26.801Z",
          "updatedAt": "2023-05-29T17:27:26.801Z",
          "deletedAt": null
        },
        "averageQuantity": 150
      },
      {
        "product": {
          "id": "95b8d5e5-600d-4648-8c85-d8677b2393ec",
          "product_name": "Ati Ampela",
          "classification": "Bersih",
          "type": "Ekses",
          "unit": "pcs",
          "multiplier": "0.2",
          "price": 22500,
          "createdAt": "2023-05-29T17:27:26.801Z",
          "updatedAt": "2023-05-29T17:27:26.801Z",
          "deletedAt": null
        },
        "averageQuantity": 250
      },
      {
        "product": {
          "id": "065d5347-47a0-4dc9-8df9-c17afc21653a",
          "product_name": "Boneless",
          "classification": "Dada",
          "type": "Ayam Parting",
          "unit": "kg",
          "multiplier": "1",
          "price": 53500,
          "createdAt": "2023-05-29T17:27:26.801Z",
          "updatedAt": "2023-05-29T17:27:26.801Z",
          "deletedAt": null
        },
        "averageQuantity": 100
      }
    ]
  }
}
```

- response if not found

```json
{
  "status": 404,
  "message": "User/brand not found"
}
```

## Admin GET User Transaction

Endpoint: `/api/admin/transactions/{transactionId}`
Method: `get`

- response

```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "id": "c0e62a7e-1807-41f3-8acf-2547e7123a62",
    "brandName": "Happy Chicken Bandung 1",
    "status": "Pending",
    "product": [
      {
        "product_name": "Karkas",
        "classification": "0.4 - 0.7",
        "price": 43500,
        "quantity": 150,
        "subtotal": 4567500
      },
      {
        "product_name": "Ati Ampela",
        "classification": "Bersih",
        "price": 22500,
        "quantity": 250,
        "subtotal": 1125000
      },
      {
        "product_name": "Boneless",
        "classification": "Dada",
        "price": 53500,
        "quantity": 100,
        "subtotal": 5350000
      }
    ]
  }
}
```

- response if not found

```json
{
  "status": 404,
  "message": "Transaction not found"
}
```
