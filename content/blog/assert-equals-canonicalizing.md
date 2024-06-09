---
type: post
title: "AssertEqualsCanonicalizing() can save lives"
date: 2024-05-02T10:10:00+01:00
tags: [software, php, phpunit, laravel, tests, pipelines]
description: "The public announcement to use `assertEqualsCanonicalizing()` in your tests."
cover: "/images/blog/assert-equals-canonicalizing/cover.png"
coverCaption: "Oh no the pipeline broke again"
draft: false
---

## Intro

This following blog post discusses the use of `assertEqualsCanonicalizing()` in PHP tests. It highlights a common problem in testing data retrieved from databases, particularly with PostgreSQL, where the order of results can be non-deterministic. This can cause tests to fail unpredictably when they rely on the order of the results.

We'll be going over some examples of testing a repository function that fetches **User** entities from the database, and how the order of these entities can change, leading to potential test failures.

## The problem

Database queries and the PostgreSQL query planner in general are not deterministic. This means that the order of the results can change. This is a problem when we are testing the data that we are inserting and retrieving from the database, especially in automated pipelines where we can have multiple jobs running in parallel with ParaTest, which can cause the order of the results to change.

Say for example we have a repository function that fetches two `User` entities from the database. We insert two `User` entities in the database and then we call the repository function. We expect the two `User` entities to be returned in the same order that we inserted them.

```php
public function test_fetch_users()
{
    $user1 = new User('John Doe');
    $user2 = new User('Jane Doe');

    $this->userRepository->insert($user1);
    $this->userRepository->insert($user2);

    $users = $this->userRepository->fetchAll();

    $this->assertEquals([$user1, $user2], $users);
}
```

This test has the potential to fail because the order of the results can change. This is a problem because we are not testing the data that we are inserting and retrieving from the database, we are in fact testing the order of the results being equal as well.

This can also happen in feature tests where we are testing API responses. The order of the results can change and the tests can fail, when assering certain JSON fragments.

```php
public function test_fetch_users()
{
    $user1 = new User('John Doe');
    $user2 = new User('Jane Doe');

    $this->userRepository->insert($user1);
    $this->userRepository->insert($user2);

    $response = $this->get($this->url.'/api/users');

    $response->assertJson([
        'data' => [
            $user1->toArray(),
            $user2->toArray(),
        ],
    ]);
}
```

The test above, we are expecting that the response brings the first user and the second user second. If you have no control over the order, this also has the potential to fail.

## The solution

Introducing `assertEqualsCanonicalizing()` (More info [here](https://www.geeksforgeeks.org/phpunit-assertequalscanonicalizing-function/)). This method is available in PHPUnit 9.5.0 and later. This method asserts that two arrays, collections or traversables are equal, but without considering the order of the elements. This is exactly what we need to solve our problem.

```php
public function test_fetch_operators()
{
    $user1 = new User('John Doe');
    $user2 = new User('Jane Doe');

    $this->userRepository->insert($user1);
    $this->userRepository->insert($user2);

    $users = $this->userRepository->fetchAll();

    $this->assertEqualsCanonicalizing([$user1, $user2], $users);
}
```

## Conclusion

We have to be thoughtful when testing the data that we are inserting and retrieving from the database.

If the order of the results is not important or intended to be tested, using `assertEqualsCanonicalizing()` instead of `assertEquals()` is the best option to prevent faulty tests.

Use it wisely and save lives in your pipelines.
