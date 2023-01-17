# Database Class:

1. This database class is a general purpose class for createing and using Mariabd/My sql queriesThe constructor takes all neccessary information needed to open a database as parameter object. This Layer is used between the database engine and our application.

Here is option object example of the object for constructor:

```js

{
    host: '127.0.0.1',
        // host:'localhost',
    // allowPublicKeyRetrieval: true,
        port: 3306,
        user: 'tuan',
        password: 'Milan123@',
        database: 'employeeDb'
}

```
## Method **doQuery(sql,parameter)**

### Method usage:

```js
const result = await db.doQuery('select * from employee');
```

