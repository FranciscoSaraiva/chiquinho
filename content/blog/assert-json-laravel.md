---
type: post
title: "TIL: assertDatabaseHas JSON data in Laravel"
date: 2024-01-29T18:13:00+01:00
author: "francisco.saraiva@infraspeak.com"
tags: [software, til, php, phpunit, laravel, tests, pgsql]
description: "In today's episode of TIL, aka I remembered to ask ChatGPT something."
cover: "/images/blog/assert-json-laravel/1-til-json-laravel-cover.png"
coverCaption: "Anyone notice how many elephants are used in logos in software?"
draft: false
---

## Intro

Often there are times when we want to assert JSON data in a json column of a PostgreSQL database.

This is common for services or repositories that store data in JSON format and we want to check if the data was properly stored with the correct format.

---

## The Problem

Usually when asserting a field in the database you follow the following format:

```php
$this->assertDatabaseHas('table', [
    'field' => 'value',
]);
```

Where you pass the table name and an array of fields and values to assert, that you wish to find in the database.

But how do we assert a JSON field?

Perhaps you've tried something like this:

```php
$this->assertDatabaseHas('table', [
    'json_field' => [
        'field' => 'value',
    ],
]);
```

This will not work. The reason is that the `assertDatabaseHas` method uses the `where` method of the query builder, which in turn uses the `=` operator to compare the values. Therefore, it will not work for JSON fields.

But knowing that a `where` is used in the query, and it builds that query using the `=` operator, we can try deducing something.

Ever wanted to fetch queries in runtime? Let's check how `assertDatabaseHas` builds a query:

```php
DB::enableQueryLog();

$this->assertDatabaseHas('table', [
    'field' => 'value',
]);

dd(DB::getQueryLog());
```

This will output the following:

```php
array:1 [
  0 => array:3 [
    "query" => "select * from "table" where "field" = ?"
    "bindings" => array:1 [
      0 => "value"
    ]
    "time" => 0.5
  ]
]
```

We can see that the query is built with the `=` operator, and the value is passed as a binding.

---

## The Solution

Laravel allows to perform JSON column type queries using the `->` operator. As for example a query built like this:

```php
DB::table('table')
    ->where('json_field->field', 'value')
    ->get();
```

This will build a query like this:

```php
array:2 [
  "query" => "select * from "table" where "json_field"->>'field' = ?"
  "bindings" => array:1 [
    0 => "value"
  ]
]
```

Note that the `->>` operator is used instead of the `=` operator. Laravel when comparing an equality with a JSON field, uses the `->>` operator.

Take for example the following json stored inside a 'client' json field in a table:

```json
{
    "name": "Chico",
    "email": "chicomedia@email.com",
    "number_of_clients": 10
}
```

Then, how can we assert this entry exists in the database? As simple as:

```php
$this->assertDatabaseHas('table', [
    'client->name' => 'Chico',
    'client->email' => 'chicomedia@email.com',
    'client->number_of_clients' => 10,
]);
```

The query that is built, using the DB facade like before:

```php
[
    "query" => "select * from "table" where "client"->>'name' = ? and "client"->>'email' = ? and "client"->>'number_of_clients' = ?"
    "bindings" => [
        0 => "Chico",
        1 => "chicomedia@email.com",
        2 => 10,
]
```

And that's it! Now you can assert JSON data in your tests.

---

## Bonus content

Did you know you can pass aliases in the `assertDatabaseHas` method?

```php
$this->assertDatabaseHas('table as t', [
    't.client->name' => 'Chico',
    't.client->email' => 'chicomedia@email.com',
    't.client->number_of_clients' => 10,
]);
```

Just thought it was worth mentioning, maybe it can be useful in some cases. *(I don't know which ones, but it's there if you need it).*
