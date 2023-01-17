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
const result = await db.doQuery("select * from employee");
```

```js
const result = await db.doQuery("select * from employee where id=?", [1]);
```

Select queries will result a promise with result javascript object:

```js
{
  queryResult: [
    {
      id: 1,
      firstname: "Jane",
      lastname: "Doe",
      department: "IT",
      salary: "4000.00",
    },
  ];
}
```

For example an insert statement will retunr on object:

```js
const result = await bd.doQuery("insert into employee values(?,?,?,?,?)", [123, "Joe", "Dan", "It", 4000]);
```

The statement to be sent to database engine will be:
insert into employee values (123,'Joe','Dan','It',4000)

will return on object:

```js
{
    queryResult:{rowChanged:1,insertId:0,status:0},
    resultSet:false
}
```

In Error case it rejects error-string