# Questions and Answers - API for Project Catwalk

A back-end system to provide the resources and data for the Question and Answer service in Project Catwalk.  This service is part of a larger service that replaces the Atelier API

## Author
- [@xingvoong](https://github.com/xingvoong)

## API services

### Get questions
* GET `questions/product_id`
* Retrieves a list of questions with the given product id.

**Query Parameters**:
| Parameter   | Type        |Description|
| ----------- | ----------- |-----------|
| product_id  | integer     |Specifies the product for which to retrieve questions.|

**Success Status Code:** `200 OK`

Returns: JSON

```json
    {
        "product_id": "5",
        "results": [{
            "question_id": 37,
            "question_body": "Why is this product cheaper here than other sites?",
            "question_date": "2018-10-18T00:00:00.000Z",
            "asker_name": "williamsmith",
            "question_helpfulness": 4,
            "reported": false,
            "answers": {
                68: {
                    "id": 68,
                    "body": "We are selling it here without any markup from the middleman!",
                    "date": "2018-08-18T00:00:00.000Z",
                    "answerer_name": "Seller",
                    "helpfulness": 4,
                    "photos": []
                    // ...
                }
            }},
            {
            "question_id": 38,
            "question_body": "How long does it last?",
            "question_date": "2019-06-28T00:00:00.000Z",
            "asker_name": "funnygirl",
            "question_helpfulness": 2,
            "reported": false,
            "answers": {
                70: {
                    "id": 70,
                    "body": "Some of the seams started splitting the first time I wore it!",
                    "date": "2019-11-28T00:00:00.000Z",
                    "answerer_name": "sillyguy",
                    "helpfulness": 6,
                    "photos": [],
                },
                78: {
                    "id": 78,
                    "body": "9 lives",
                    "date": "2019-11-12T00:00:00.000Z",
                    "answerer_name": "iluvdogz",
                    "helpfulness": 31,
                    "photos": [],
                }
            }},
            // ...
        ]
    }
```

### Post Questions
- POST `questions/product_id`
- Adds a question for the given product

**Body Parameters**:

| Parameter   | Type        | Description|
| ----------- | ----------- | -----------|
| body        | text        | Text of question being asked |
| name        | text        | Username for question asker |
| email       | text        | Email address for question asker|
| product_id  | integer     | Required ID of the Product for which the question is posted|

**Success Status Code:** `200 OK`

## Demo
#### Stress testing:
#### 4000 requests per second (RPS)
![4k](https://github.com/Adept-Adobo/Question-Answer/blob/main/demo/4k.jpg?raw=true)

#### 6000 RPS
![6k](https://github.com/Adept-Adobo/Question-Answer/blob/main/demo/6k.jpg?raw=true)

## Run Locally
Check required tech is installed (see below).

Clone the project
```bash
https://github.com/Adept-Adobo/Question-Answer
```
Go to the project directory
```bash
cd Question-Answer
```
Install dependencies
```bash
npm install
```
Start the server
```bash
npm run start
```
Run K6 test
```bash
npm run test
```

## Tech Stack
**Server**: Node.js, Express

**Database**: PostgreSQL
## Requirements
- Web browser
- npm
- Linux, macOS, or Windows