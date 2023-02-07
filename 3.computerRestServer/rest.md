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

For example all computers:

```
http://localhost:4000/api/computers HTTP/1.1 
```

### GET

The GET request would be:

GET http://localhost:4000/api/computers HTTP/1.1

GET /api/computers

returns all computer as a json (or some other format) array

computer number 2

```
http://localhost:4000/api/computers/2
```

return the computer with id 2

```json
{
  "id": 1,
  "name": "server",
  "type": "pentium2",
  "processor": "line",
  "amount": 4
}
```

### POST

add a new computer

POST /api/computer

```json
{
  "id": 4,
  "name": "server",
  "type": "pentium2",
  "processor": "line",
  "amount": 4
}
```

computer is given as json-object. Return a status object.

### PUT

update / add

PUT /api/computers/3

computer is given as json object. Return a status object.
If the computer with given number doesn't exist, it will be added,
if the computer exists, the it will be updated.
The id must match the number given in URI

### DELETE

remove computer
DELETE /api/computer/3

# Javascript (tech)

let's assume `cors` situation:

### GET

```js
const options = {
  method: "GET",
  mode: "cors",
};
const uriValue = "/api/computer/2";
const data = await fetch(uriValue, options);
const result = await data.json();
const data2 = await fetch(uriValue, { mode: "cors" });
const result2 = await data2.json();
```

### POST and PUT

```js
const computerObject = {
  id: 4,
  name: "server",
  type: "pentium2",
  processor: "line",
  amount: 4,
};
```

```js
const option = {
  method: "post",
  mode: "cors",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(computerObject),
};

const postComputers = "http://localhost:4000/api/computers";
const data = await fetch(postComputer, options);
const result = await data.json();

const option = {
  method: "put",
  mode: "cors",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(computerObject),
};

const postComputers = "http://localhost:4000/api/computers";
const data = await fetch(postComputer, options);
const result = await data.json();
```
### Delete

```js
const option = {
  method: "delete",
  mode: "cors",
};
const oneComputer = "http://localhost:4000/api/computers";
const data = await fetch(oneComputer, options);
const result = await data.json();
```