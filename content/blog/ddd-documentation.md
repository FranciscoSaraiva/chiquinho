---
type: post
title: "Revolutionize Your Documentation with These Simple Tricks!"
date: 2023-04-26T12:45:14+01:00
tags: [software, web, documentation, domain-driven-design]
description: "An exploration of guidelines with examples on Documentation with Domain-Driven Design"
cover: "/images/blog/ddd-documentation/1-cover.png"
coverCaption: "He used these tricks! 👆"
showTableOfContents: true
draft: false
---

## Intro

If you clicked because of the title, then perfect, it worked! This article is actually about my grandmother's recipes. I'm joking, but if you've read this sentence you've invested enough time already to read the rest of this post right?

As development teams further improve their ever growing documentation of their codebase, it's important to remind some points, guidelines and suggestions.

This is meant for the design approach of Domain-Driven Design **(DDD)**, and so it only makes sense to seek guidance from the expert himself, Eric Evans. In his book ***"Domain-Driven Design: Tackling Complexity in the Heart of Software"***, he provides valuable insights and approaches to documentation while implementing **DDD**.

## Use Ubiquitous Language

>*"The most powerful tool for gaining and maintaining alignment is rigorous, ubiquitous language."*

**"Ubiquitous Language"** is the term Eric Evans refers to as a language that is shared between a team, developers, domain experts or any other stakeholder.
It is modelled within a context where concepts, terms, attributes and properties are identified and with as little to no ambiguity as possible.

In short, it’s the language you use day to day with your team, within the context of the product, that everyone understands when mentioned.

Take ***Object***, ***Type*** and ***Value*** for example, these are all entities in the existing context of the Engineering team, but in terms of Product team, these are probably known as something else, like ***Item***, ***Category*** and ***Price***. It’s all going to depend on the team for the language to become ubiquitous, as well as which and how to write it.

{{<figure src="/images/blog/ddd-documentation/2-language.png"
          alt="Depending on context, the ubiquity of words can have the same meaning."
          position="center"
          style="border-radius: 8px;"
          id="language"
          caption="Depending on context, the ubiquity of words can have the same meaning.">}}

So, one of the key principles of **DDD** is the use of a **ubiquitous language**, which is shared within the development team for a certain domain or project. Your documentation should reflect this language and should be written in a way that makes sense to all members of the team, regardless of their technical background.

Another tip, when referring to important concepts or entities within your domain, make sure to capitalize the word or add some bold to emphasize it, it catches the reader’s eyes much better. Any model/entity within your domain that’s important to alert the reader, you can write in between like:

>“… **Object** is responsible… each **Type** has **Value**’s associated… etc”

## Document Domain Concepts

>*"The domain model is the distilled knowledge of the domain experts, represented as a system of interconnected concepts and associated behaviors."*

**Domain Concepts** are the crucial aspects of your domain. If you don't write documentation or include descriptions for your concepts, people from outside the domain won't have a good grasp or any at all of what they are and how they work.

**Concepts** should include descriptions, their purpose, their behaviour and constraints or rules that apply to them. You should document any relationships that exist between concepts like associations, dependencies and or hierarchies. Having some explanation of what things are goes a long way into looking at the domain later on.

{{<figure src="/images/blog/ddd-documentation/3-domain.png"
          alt="Context and explanation of the Domain Concepts goes a long way to the understanding of it."
          position="center"
          style="border-radius: 8px;"
          id="domain"
          caption="Context and explanation of the Domain Concepts goes a long way to the understanding of it.">}}

## Use Examples

>*"Examples of using the model are an essential part of the language in which the domain experts and developers collaborate."*

**Examples** are a powerful way to illustrate how domain concepts work in practice. Whenever possible be sure to include examples of how things and concepts work, how to implement new code or even how to replicate a feature. Say for example, that your domain code base has a structure that abides by particular rules or a specific implementation, for a newcomer it is not directly visible such implementation at a short glance as a whole.

Having examples and instructions on how to implement something leads to a faster development without much deviations from the existing work, while also providing a guided overview of the existing implementation and how it was built.

For product and features, give a small overview of steps to replicate something, be it the creation of an entity and the intricancies related to it or the flow of feature. It gives the happy path for a user to explore and find something and learn with it, nothing is better for learning and remembering than to doing it instead of just reading.

{{<figure src="/images/blog/ddd-documentation/4-example.png"
          alt="Examples are a great way to transmit quick and fast information on a concept."
          position="center"
          style="border-radius: 8px;"
          id="example"
          caption="Examples are a great way to transmit quick and fast information on a concept.">}}

## Define API Contracts

>*"Explicitly defined APIs offer several benefits: they allow the teams on either side of the interface to work independently, they allow different parts of the system to evolve at different rates, and they make the system more flexible and adaptable to change."*

Here's a section we know very well. If you're building an API, its documentation serves as a **Contract** for its users. They are the set of rules that define how interactions with the API should be handled. These should include information such as data format, allowed HTTP methods and any error messages.

It's important to lay down the **Contract** for the users because it is them that most depend on the documentation to be correct and up-to-date. If you're using a specification language, familiarize yourself with it, reading and learning their documentation. Whenever possible, provide descriptions and rules pertaining to the endpoints, attributes, body of data and responses, with examples in each so they can see what sort of formats and data should be expected.

{{<figure src="/images/blog/ddd-documentation/5-api.png"
          alt="Be specific in descriptions and explanations of fields and behaviours so the API users can confidently know what's expected."
          position="center"
          style="border-radius: 8px;"
          id="api"
          caption="Be specific in descriptions and explanations of fields and behaviours so the API users can confidently know what's expected.">}}

## Use Diagrams

>*"UML diagrams provide a way to visualize the objects and relationships that make up the domain model, which can be a powerful aid in understanding the system and communicating it to others."*

**Diagrams** are a helpful way to visualize concepts and relationships in a broader way. Whenever there are concepts that are extensive or require a large explanation, it is best to illustrate them via UML diagrams as it is an universal visual language.

How structures are organized, components interact in your project or how an endpoint travels from start to finish; there's a lot of logic going on behind the scenes. It is a good idea to visually aid these explanations with diagrams.

Take for example a **Use Case** for a feature, it can be a bit extensive to explain in words, but with a diagram it can be much more easily understood.

Now for the behaviour description, for example, let's take the following scenario, in which we want two entities in our platform to connect with each other. It can be a new entity, or an already existing entity in our platform.
The following behaviour can be described as:

---

*First, if an "Invite to Sign Up" is opened by someone, the JSON Web Token (JWT) is validated, if not an error page is presented and the invitation left invalid. If it is valid, the user's session will be checked in our platform, in the case there is, the entity in the session is checked and if it matches that of the invite, a message warning the user of the existing entity is shown and an "Invite to Connect" is sent to the admninistrators to add the invited user to their platform and connect their entity to the one inviting.*

*If the user has no session the Sign Up form is presented and the user can fill a form to create a new entity. Now when the form is submitted, the data is checked and matched to existing entities to check for duplicates, if no entities are matched, then it is assumed it's a new company and the account is created and the connection made. In the case entites are matched, a selection screen is presented to the user to confirm if any of the presented matched entities, is their own. If the user cannot confirm any of the entities, the form is submitted and the previous behaviour is done by creating a new account.*

*If the user finds their entity and selects it, the other previous case of sending an "Invite to Connect" is sent to the administrators warning to add the invited user to their platform and to connect both entities.*

---

Are you still reading? Now look at the following figure, much more simply explained via a flowchart diagram than simply putting it to words right?

{{<figure src="/images/blog/ddd-documentation/6-diagrams.png"
          alt="Visual information can be a powerful aid to pass information and diagrams do the job."
          position="center"
          style="border-radius: 8px;"
          id="diagrams"
          caption="Visual information can be a powerful aid to pass information and diagrams do the job.">}}

## Keep Documentation Up-To-Date

>*"Documentation should not be viewed as a separate task or an afterthought, but as an integral part of the development process that requires ongoing attention and maintenance."*

Lastly but no less important, it is crucial to ensure that your documentation remains **up-to-date**. Documentation is important and should be something you do alongside the work you do and implement.

The longer you forget about it and leave it behind, the harder it'll bite you later. You might find yourself spending large amounts of time just writing documentation at the end if so, with half or more details already lost to time. Making a habit out of adding and updating your documentation with your changes, ensures the documentation is present and never wrong or forgotten. Also make sure when reviewing other people's code, to remind the person of any possible changes or additions to the documentation, it is also your job to remind others collectively.

## A Possible Minimum Standard

With these points in making a good documentation, can we argue there's a standard to follow? There's no one-size-fits all for documentation in DDD, but we can take these importants points and find a suggested minimum structure for domains:

1. **Domain Overview**: Here we give a summary of the domain, as well as key concepts along with business rules or regulations pertaining to it.
2. **Glossary**: With Ubiquitous language being an important aspect, it makes sense to add a glossary or dictionary of terms and concepts of the domain, along with their relationships.
3. **Domain Model**: Where we give a description and visual representation of the domain model, with entity-relationship diagrams and descriptions of what they are.
4. **Use Cases**: Examples of how the domain is used in practice, with step by step instructions of how to do something, sample code snippets and important aspects.
5. **API Documentation**: Self explanatory, this aspect we have already layed well into our work.
6. **Maintaners**: If it makes sense to include the maintaners or the original writers of the documentation for contact and doubts about a topic.

Also remember, there's no such thing as too much information, the more explained or information is written on a subject, the better to fully understand it, as long as the explanation does not deviate from the topic at, if there's many lingering dependencies or relations, point to them to make the documentation interconnected.

{{<figure src="/images/blog/ddd-documentation/8-standard.png"
          alt="Imagine the power of our codebase with every domain holding these topics..."
          position="center"
          style="border-radius: 8px;"
          id="standard"
          caption="Imagine the power of our codebase with every domain holding these topics...">}}

## Conclusion

Conclusion, there's no 100% correct way to documentation in **DDD**, but there are key points that should be included when writing it.

Having a cohesive consistent language that's used throughout the writing is important to pass on which concepts and topics are discussed. Explaining and providing descriptions of the domain gives an introduction to readers to familiarize themselves with the concepts. Providing examples to complement the documentation helps readers to know in a practical way how concepts work. Providing visual aids in explanations such as UML diagrams transmits data in a much more appealing and direct way than simply putting it to words. Defining the rules and contracts of your API to help their users to know what's expected of the backend. And lastly and incredibly important, make the process of creating and updating documentation a habit and an important task you do alongside your work, ensuring it is always present and at their latest iterations.

Out of these key concepts we can pick up the minimum that a documentation should include topics such as, an **overview** of the domain, a **glossary** of the words and explanations, the specifications and description of the **domain model**, include **use cases** in practical terms of the domain and when needed have an **API contract** to establish the agreement between the provider of the API and the users who depend on it.

Making a habit of out all of these points, you can ensure that your documentation is always up-to-date and that it is a valuable resource for your team and for anyone who needs to understand your domain.

## Reference Material

- [Domain Language website](https://www.domainlanguage.com/)
- [Book "Domain-Driven Design: Tackling Complexity in the Heart of Software"](https://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215)
- ["Document Your Domain" by The Pragmatic Programmers on Medium](https://medium.com/pragmatic-programmers/document-your-domain-8a1365dc10ae)
