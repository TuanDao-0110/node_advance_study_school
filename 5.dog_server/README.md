# REST

https://developer.mozilla.org/en-US/docs/Web/HTTP

1. using CRUD method:

https://developer.mozilla.org/en-US/docs/Web/HTTP/methods 2. status code:

https://developer.mozilla.org/en-US/docs/Web/HTTP/Status 3. Methods:

GET
POST
PUT
DELETE

OPTIONS
HEAD
PATCH

# Resource

For example all dog:

```
http://localhost:4000/api/dog HTTP/1.1
```

### GET

The GET request would be:

GET http://localhost:4000/api/dog HTTP/1.1

GET /api/dog

returns all dog as a json (or some other format) array

dog number 2

```
http://localhost:4000/api/dog/2
```

return the dog with id 2

```json
{
  "id": 1,
  "name": "pongo",
  "breed": "chihuahua",
  "length": 20,
  "birth": 5
}
```

### POST

add a new dog

POST /api/dog

```json
{
  "id": 1,
  "name": "pongo",
  "breed": "chihuahua",
  "length": 20,
  "birth": 5
}
```

dog is given as json-object. Return a status object.

### PUT

update / add

PUT /api/dog/3

dog is given as json object. Return a status object.
If the dog with given number doesn't exist, it will be added,
if the dog exists, the it will be updated.
The id must match the number given in URI

### DELETE

remove dog
DELETE /api/dog/3

# Javascript (tech)

let's assume `cors` situation:

### GET

```js
const options = {
  method: "GET",
  mode: "cors",
};
const uriValue = "/api/dog/2";
const data = await fetch(uriValue, options);
const result = await data.json();
const data2 = await fetch(uriValue, { mode: "cors" });
const result2 = await data2.json();
```

### POST and PUT

```js
const dogObject = {
  id: 1,
  name: "pongo",
  breed: "chihuahua",
  length: 20,
  birth: 5,
};
```

```js
const option = {
  method: "post",
  mode: "cors",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(dogObject),
};

const postDog = "http://localhost:4000/api/dog";
const data = await fetch(postDog, options);
const result = await data.json();

const option = {
  method: "put",
  mode: "cors",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(dogObject),
};

const postDog = "http://localhost:4000/api/dog";
const data = await fetch(postDog, options);
const result = await data.json();
```

### Delete

```js
const option = {
  method: "delete",
  mode: "cors",
};
const oneDog = "http://localhost:4000/api/dog";
const data = await fetch(oneDog, options);
const result = await data.json();
```

# to create database

```shell
node createDatabase <adminpassword> dogCreateStatements.json
```
