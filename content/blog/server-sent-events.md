---
type: post
title: "Server-Sent Events: Real-Time Communication For Cool Kids"
date: 2023-09-27T15:17:14+01:00
tags: [server-sent events, streaming, rtc, http, real-time communication]
description: "An introduction to Server Sent Events (SSE) and how they can be used to stream data from the server to the client."
cover: "/images/blog/server-sent-events/cover.jpeg"
coverCaption: "Please note that \"Style\" is subjective"
showTableOfContents: true
draft: false
---

## Introduction

In today's fast-paced digital landscape, staying up-to-date with real-time information is essential.
Whether it's receiving instant notifications, tracking live data updates, or monitoring critical systems, the demand for real-time communication between web servers and clients has never been higher.
*And so, introducing! **Server-Sent Events (SSE)***!

**SSE** are a server push technology that enables real-time communication between web servers and clients, that allows the client to receive data from the server in real-time through an **HTTP** connection.

Imagine a technology that enables your web applications to receive real-time updates from the server without the complexity of managing many connections or the overhead of constant polling.
SSE does that, providing a straightforward and efficient way to establish a persistent connection between the server and client, allowing data to flow in one direction: from server to client.

In this blog post, we'll take you on a journey into the world of Server-Sent Events. Explaining how they work, the benefits they offer, and practical examples.

---

## Historical Context

Real-time communication between web servers and clients has been a long-standing challenge for web developers.
This ever evolving need has been closely tied to the development of the **HTTP** protocol, which is the foundation of the **World Wide Web**.

### HTTP 1.0: The Stateless Web

The first version of **HTTP**, **HTTP 1.0**, was released in 1996, and it was a significant step forward in the evolution of the web.
It introduced the concept of stateless communication, where each request is independent of the previous one, and the server doesn't need to maintain any information about the client's state.

Every time a client makes a request, the server responds and then closes the connection, which is the default behavior of **HTTP 1.0**.
This architecture made real-time communication challenging, as it required the client to constantly poll the server for updates.

{{<figure src="/images/blog/server-sent-events/http10.png"
alt="HTTP 1 laid the foundation for communication between servers and clients."
position="center"
style="border-radius: 8px;"
id="language"
caption="HTTP 1 laid the foundation for communication between servers and clients.">}}

### HTTP 1.1: Persistent Connections

In 1999, **HTTP 1.1** was released, introducing the concept of persistent connections. 
This allowed the client to reuse the same connection for multiple requests, instead of establishing a new **Transmission Control Protocol (TCP)** connection for each request.
While this reduced the overhead associated with establishing new connections on each interaction, it still lacked efficiency for real-time communication. 

{{<figure src="/images/blog/server-sent-events/http11.png"
alt="HTTP 1.1 introduced the concept of persistent connections."
position="center"
style="border-radius: 8px;"
id="language"
caption="HTTP 1.1 introduced the concept of persistent connections.">}}

### Web Sockets: Bidirectional Breakthrough

In 2011, **Web Sockets (WS)** were introduced, providing a bidirectional communication channel between the server and the client.
This allowed the server to send data to the client without the need for the client to request it.

**WS** provided a bidirectional communication channel over a single **TCP** connection, enabling real-time communication between the server and the client.
This technology opened up new possibilities for chat applications, online gaming, financial trading platforms and much more.

While this was a significant breakthrough, it required a dedicated server and a custom protocol, which made it difficult to implement and maintain.
The way it works is that the client sends a special **HTTP** request to the server, which then upgrades the connection and switches to a custom protocol.
This protocol is not compatible with **HTTP**, so it requires a dedicated server to handle the communication.

{{<figure src="/images/blog/server-sent-events/websockets.png"
alt="Web Sockets provided a bidirectional communication channel over a single TCP connection."
position="center"
style="border-radius: 8px;"
id="language"
caption="Web Sockets provided a bidirectional communication channel over a single TCP connection.">}}

### Server-Sent Events: Unidirectional Simplicity

While **WS** were a game-changer for real-time communication, they came with added complexity, especially on the server side or simple use cases.
In 2012, **SSE** were introduced, providing a simple and efficient way to establish a persistent connection between the server and the client.

Unlike **WS**, **SSE** is a unidirectional communication channel, where the server sends data to the client, but the client can't send data back to the server.
This makes **SSE** ideal for use cases where the client only needs to receive data from the server, such as notifications, updates, or messages.

Being **HTTP**-based, **SSE** is compatible with existing web servers and doesn't require any special configuration or custom protocols.

{{<figure src="/images/blog/server-sent-events/sses.png"
alt="Server-Sent Events took the simplicity of HTTP and combined it with the efficiency of persistent connections like Web Sockets."
position="center"
style="border-radius: 8px;"
id="language"
caption="Server-Sent Events took the simplicity of HTTP and combined it with the efficiency of persistent connections like Web Sockets.">}}

In conclusion, the evolution of real-time communication in **HTTP** has been a long and winding road, with each iteration bringing new possibilities and challenges.
**SSE** are the latest addition to this evolution, providing a simple and efficient way to establish a persistent connection between the server and the client.

---

## How it Works

At the heart of **SSE** lies a simple yet powerful concept: establishing a persistent connection between a web server and a client to facilitate real-time communication. 
In this chapter, we'll delve deeper into the mechanics of **SSE** and understand how it works under the hood.

### The SSE Connection

**SSE** relies on the **HTTP** protocol for communication, this means it can be used with any web server that supports **HTTP**, such as Apache, Nginx, or IIS.

The main feature of **SSE** that sets it apart from other **HTTP**-based technologies is its ability to keep a single, long-lived connection open between the client (typically a web browser) and the server, indefinitely.

### Data Transmission

Once the connection is established, the server can send data to the client at any time, without the need for the client to request it.
The way SSE transmits data is through a simple and human-readable format called the **event stream format**. This simple text data must be encoded using UTF-8 and sent with the `text/event-stream` MIME type.

This format consists of a series of events, each of which contains three main components: **event**, **id**, and **data**. 

- `event`: A user-defined string that describes the type or category of the event. This allows clients to filter and process events based on their type/event.
- `id`: An optional identifier for the event, which can be used for tracking and ensuring that clients don't miss any events, even if they temporarily disconnect.
- `data`: The payload of the event, typically in plain text format. This can be any data that you want to send from the server to the client, such as notifications, updates, or messages.

There also exists a fourth component, called `retry`, which is used to specify the reconnection time in milliseconds. This is optional and only used when the client needs to reconnect to the server.
This way the client can automatically reconnect to the server if the connection is lost, ensuring that it doesn't miss any events.

### Event Stream Format

As described above the data is transmitted in a plain text format. Here's an example of a single event:

```plaintext
id: 3612173\nevent: new_notification\ndata: {"message": "You have a new notification!"}\n\n
```

Looks weird? This is how it looks formatted:

```plaintext
id: 3612173
event: new_notification
data: {"message": "You have a new notification!"}
 
```

This represents a single event. 

Notice that each line is terminated with a newline character (`\n`), and the event is terminated with two newline characters (`\n\n`).

**Every single event** must be separated by two newline characters (`\n\n`), this is how the client/browser knows when an event ends and a new one begins.

{{<figure src="/images/blog/server-sent-events/sse_browser.gif"
alt="Server-Sent Events displayed in Chrome in real time."
position="center"
style="border-radius: 8px;"
id="language"
caption="Server-Sent Events displayed in Chrome in real time.">}}

### Implementation

**SSE** work by establishing a persistent connection between the server and the client. 
This connection is established via a standard **HTTP** request, which is then kept open indefinitely.
The server and client both abide by rules defined in the **SSE** protocol, which ensures that the connection is maintained and data is transmitted correctly.

The server must serve an endpoint that handles **SSE** requests and sends events to connected clients as they occur. 
It must set the appropriate headers for **SSE**, including the `Content-Type`, `Cache-Control` headers and `Connection`, and send events in the event stream format.

The client must establish an **SSE** connection and listen for incoming events.
It must also handle errors and automatically reconnect in case of network interruptions or server failures.
For this the client uses the `EventSource` API, which is a JavaScript interface that allows the client to receive events from the server.

Refer to the following image for a simple representation:

{{<figure src="/images/blog/server-sent-events/server-client-diagram.png"
alt="A server and a client communicate via a persistent connection, with set rules of communication in SSEs."
position="center"
style="border-radius: 8px;"
id="language"
caption="A server and a client communicate via a persistent connection, with set rules of communication in SSEs">}}

####  Server-Side Implementation

On the server side, **SSE** can be implemented using various programming languages and web frameworks. The server needs to be configured to handle incoming **SSE** requests and send events to connected clients as they occur.

In your server or backend, typically you will want to create a route that handles **SSE** requests. This route will be responsible for establishing the **SSE** connection and sending events to the client.

To follow the **SSE** protocol, the server must respond to the client with the `text/event-stream` MIME type and the `Cache-Control: no-cache` header.

Here's an example of a simple **SSE** server implemented in **JavaScript**:

```javascript

const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the appropriate headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  // Function to send SSE messages to the client
  function sendSSEMessage(id, data) {
    res.write(`id: ${id} \n event: notification \n data: ${data}\n\n`);
  }

  // Simulate sending messages every 2 seconds (adjust as needed)
  let counter = 0;
  const interval = setInterval(() => {
    // Create a sample message with a timestamp
    const message = `Message ${counter}: ${new Date().toUTCString()}`;

    // Send the message to the connected client
    sendSSEMessage(counter, message);
    
    counter++;
    if (counter >= 10) {
      clearInterval(interval);
      res.end();
    }
  }, 2000);
});

// Listen on a port (e.g., 3000)
server.listen(3000, () => {
  console.log('SSE server is running on port 3000');
});
    
```


#### Client-Side Handling

For the client (typically a web browser), **SSE** is supported natively. JavaScript can be used to establish and manage **SSE** connections, listen for incoming events, and update the user interface in response to these events.

It does this via the [`EventSource` API](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events), which is a JavaScript interface that allows the client to receive events from the server. This API is supported by all major browsers, including Chrome, Firefox, Safari, and Edge.

An example of treating incoming events with `EventSource`:

```javascript
// Create an EventSource object that connects to your SSE server endpoint
const eventSource = new EventSource('https://example.com/sse');

// Define an event listener to handle incoming SSE messages of the type 'notification'
eventSource.addEventListener('notification', (event) => {
  // Parse the incoming data from the event
  const data = event.data;

  // Treat the data as needed
  console.log('Received SSE message:', data);

  // You can update the DOM or perform other actions with the data here
});

// Define an event listener for handling SSE errors (optional)
eventSource.onerror = (event) => {
  console.error('SSE Error:', event);
};

// Close the SSE connection when needed (optional)
eventSource.close();
```

The `EventSource` API provides a simple and straightforward way to handle **SSE** connections and incoming events.

But one thing the `EventSource` and **SSE** don't provide is the sending of headers, which can be useful for authentication purposes.

A workaround for this is to use the `withCredentials` property of the `EventSource` object, which allows you to send cookies from your **Cross-Origin Resource Sharing (CORS)** domain to the **SSE** server.

```javascript
const eventSource = new EventSource('https://example.com/sse', { withCredentials: true });
```

This way you can send cookies to the **SSE** server, which can be used for authentication purposes, it is currently our existing implementation in the **Notifications Service**.

---

## Pros and Cons

Like every technology, **SSE** has its pros and cons.

### Pros of Server-Sent Events

- **Simplicity and Ease of Use**:
  - **SSE** is straightforward to implement, especially when compared to more complex technologies like **WS**.
  - Both the server and client-side code can be relatively simple, making it accessible to developers of varying skill levels.
- **Efficiency**:
  - **SSE** uses a single, long-lived **HTTP** connection, reducing the overhead of repeatedly opening and closing connections, as seen in traditional polling.
  - This efficiency leads to lower server and network resource consumption.
- **Lightweight**:
  - The data sent is plain text, making the small packets of data lightweight and easy to transmit.
  - No headers or other metadata are required, further reducing the size of the data packets.
- **HTTP and HTTP 2 compatible**:
  - **SSE** is compatible with **HTTP** and **HTTP 2**, allowing it to work with existing web servers and browsers.
  - This makes it easy to integrate **SSE** into existing web applications without the need for additional infrastructure.
  - **WS** for instance needed a **Request for Comments (RFC)** to be created to be compatible with **HTTP 2**.
- **Real-Time Updates**:
  - **SSE** provides a reliable way to push real-time updates from the server to the client.
  - Clients receive updates as soon as they are available, resulting in minimal latency.
- **Automatic Reconnection**:
  - **SSE** clients automatically attempt to reconnect in case of network interruptions or server failures, ensuring a continuous real-time experience for users.
- **Event Streaming**:
  - **SSE** organizes data into events, making it easy to categorize and process different types of updates on the client-side.
- **Compatibility**:
  - **SSE** is supported in most modern web browsers, including Chrome, Firefox, Safari, and Edge, without the need for additional libraries or plugins.
- **Cross-Origin Support**:
  - **SSE** supports CORS, allowing you to send real-time updates from a different domain.

### Cons of Server-Sent Events

- **Unidirectional Communication:**
  - **SSE** is primarily designed for server-to-client communication. If you need bidirectional communication (i.e., the ability for clients to send data to the server), you may need to use additional technologies like WebSockets.
- **Browser Compatibility:**
  - While **SSE** is supported in most modern browsers, some older browsers may not fully support it. Be sure to check the browser compatibility matrix for your specific use case.
- **Limited Data Types:**
  - **SSE** primarily sends text-based data. While you can send **JavaScript Object Notation (JSON)** or other structured data, it may require additional parsing on the client side.
- **No Support for Binary Data:**
  - **SSE** is not suitable for transmitting binary data, which may be a requirement in certain applications.
- **Scalability Challenges:**
  - **SSE** can become less efficient when dealing with a large number of concurrent connections. Scaling **SSE** to support many clients may require careful server configuration because of the long-lived connections that are each a different process.

### Server-Sent Events vs Web Sockets vs Long Polling

**SSE** are not the only technology available for real-time communication between servers and clients.
The most popular choices of technology are **SSE**, **WS**, and **Long Polling**. Whenever you need to implement real-time communication, you'll need to choose the right technology for your use case.

- **SSE** provide a simple and efficient approach to real-time communication by being universally compatible with existing web servers and browsers.

>➕ This allows it to be easily integrated into existing web applications without the need for additional infrastructure or custom protocols, or tricky configurations with firewalls for example.
>
>➖ But simplicity brings limitations, as there is no support for binary data and the nature of uni-directional communication limits the use cases. For example creating a chat application with **SSE** would be a challenge.

{{<figure src="/images/blog/server-sent-events/server-sent-events.png"
alt="Server-Sent Events receive only data back in the form of events."
position="center"
style="border-radius: 8px;"
id="language"
caption="Server-Sent Events receive only data back in the form of events.">}}

- **WS** are a more complex technology that provides bidirectional communication between the server and the client.

>➕ It works based on a custom protocol, over a single **TCP** connection. A client initiates a **WS** handshake by sending a special **HTTP** request to the server, which then upgrades the connection to switch to **WS** communication.
It provides a reliable asynchronous communication for data to flow in both directions, while maintaining a fairly lightweight connection.
>
>➖ While being powerful it comes at the cost of complexity and rules to implement and maintain, connections that are terminated cannot be retried and older browsers may not support it.

{{<figure src="/images/blog/server-sent-events/web-sockets.png"
alt="Web Sockets strength rely on the bidirectional communication they provide."
position="center"
style="border-radius: 8px;"
id="language"
caption="Web Sockets strength rely on the bidirectional communication they provide">}}

- **Long Polling** is a technique that uses repeated **HTTP** requests to simulate real-time communication between the server and the client.
The act of Long or Short polling has to do with the frequency of the requests, in Long Polling the requests are made less frequently than in Short Polling.

> ➕ This is the simplest approach to real-time communication.
>
> ➖ But also the least effective. It is inefficient and resource-intensive, as it requires the client to constantly poll the server for updates.
> It is not really suited for real-time, requests are long and the server will experience higher latency.

{{<figure src="/images/blog/server-sent-events/long-polling.png"
alt="Long Polling is the simplest way to check for real time updates, but at a high cost."
position="center"
style="border-radius: 8px;"
id="language"
caption="Long Polling is the simplest way to check for real time updates, but at a high cost.">}}

The choice of technology will always fall on the use case and requirements of the application.

Ask yourself the following questions:

- Is my project small or big?
- Do I need to send data from the client to the server?
- Do I need to send binary data?
- Do I need to support multiple clients?

Depending on the answers, one of the three might fit your needs better than the others.

---

## Use Cases

**SSE** are particularly best-suited for scenarios that involve one-way, server-to-client real-time updates. Their simplicity and efficiency make them an excellent choice for various use cases:

- **Real-Time Notifications**: **SSE** are perfect for sending real-time notifications to users. For instance, social media platforms can use **SSE** to inform users about new messages, comments, likes, or friend requests without the need for constant polling.
- **Live Feeds and Updates**: **SSE** are ideal for delivering live content updates, such as news articles, sports scores, or stock prices. News websites can push breaking news updates to readers, creating an immersive and dynamic experience.
- **Monitoring and Dashboards**: **SSE** enable the real-time monitoring of data and system status. IT administrators can use **SSE** to keep an eye on server health, network performance, or application metrics, with instant alerts for any issues.
- **Online Collaborative Tools**: **SSE** are valuable in collaborative applications like document editors, where changes made by one user need to be instantly visible to others. This enables seamless real-time collaboration without constant manual refreshing.
- **Location-Based Services**: **SSE** can be used in location-based applications to provide users with real-time updates on nearby points of interest, events, or traffic conditions as they move through an area.
- **Online Gaming**: Although **SSE** is not typically used for real-time multiplayer gaming, it can be employed for delivering game-related notifications and updates, such as chat messages, player status changes, or in-game events.
- **IoT Data Streaming**: **SSE** can facilitate real-time data streaming from IoT devices to web applications. This is useful for monitoring and controlling IoT devices remotely, such as smart home appliances or industrial sensors.
- **Live Chat and Customer Support**: **SSE** can enhance customer support systems by providing real-time chat capabilities between users and support agents. Users receive responses as soon as they are sent, resulting in a smoother support experience.
- **User Engagement Features**: **SSE** can be used to boost user engagement by delivering dynamic content updates. For example, an e-commerce site can show users real-time product availability, price changes, or stock notifications.
- **Data Visualization**: **SSE** are valuable in data visualization applications where real-time updates are critical, such as financial dashboards displaying live stock market data or live weather updates.

In these use cases, **SSE** shine by offering a simple and efficient mechanism for delivering real-time updates to clients.

**SSE** streamline the development process and minimize server and network resource consumption, making them an excellent choice for scenarios where one-way communication is sufficient.
However, for applications requiring bidirectional communication or more complex interactions, Web Sockets or other technologies may be more appropriate.

The decision of which technology to use depends on the specific requirements of your application. For a look at the Use Cases for our notification center, you can see the [documentation here](https://infraspeak.gitlab.io/web/web-core-client/docs/product/notifications-center/notifications-center.html).

---

## Conclusion

**SSE** are a simple and efficient way to establish a persistent connection between the server and the client, allowing data to flow seamlessly in one direction: from server to client.

The problem with tackling real-time communication has been a long-standing challenge for developers and has evolved over the years with the development of the **HTTP** protocol.
Many technologies have been developed to address this challenge, such as **WS**, long polling, and **SSE**.
**SSE** have emerged as a simple solution and efficient solution for delivering real-time updates to clients.

**SSE** work by establishing a persistent connection between the server and the client, allowing data to flow seamlessly in one direction: from server to client.
It uses the **HTTP** protocol in its simplest form, making it compatible with existing web servers and browsers without the need for additional infrastructure or custom protocols.
Any server can implement **SSE**, and almost any browser can receive **SSE**, by following the **SSE** protocol rules and using the `EventSource` API respectively.

**SSE** biggest strength is its simplicity and efficiency, making it an excellent choice for scenarios where one-way communication is sufficient.
When it comes to simplicity, efficiency, lightweight data, and ease of use, **SSE** are a great technology.
Even though **SSE** have very strong points to them, they also come with some limitations, such as unidirectional communication, browser compatibility, and scalability challenges.

Use cases for **SSE** include real-time notifications, live feeds and updates, monitoring and dashboards, online collaborative tools, location-based services, online gaming, IoT data streaming, live chat and customer support, user engagement features, and data visualization.
It is according to the use case and requirements that will dictate if **SSE** are the right technology to use.

Hopefully, this blog post has given you a better understanding of **SSE** and how they can be used to stream data from the server to the client and their various use cases, advantages and disadvantages but also most importantly, knowing they exist, how and when to use them.

## Resources

- [Cover image by Thibault Devillers in Server-Sent Events for iOS](https://blog.axway.com/learning-center/software-development/api-development/server-sent-events-for-ios)
- [Icons used in diagrams](https://www.flaticon.com/authors/pixel-perfect)
- [Mozilla documentation on Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [Mozilla documentation on using Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
- [System Design: Long polling, WebSockets, Server-Sent Events (SSE) by Karan Pratap Singh](https://dev.to/karanpratapsingh/system-design-long-polling-websockets-server-sent-events-sse-1hip)
- [Server-Sent Events Crash Course by Hussein Nasser](https://www.youtube.com/watch?v=4HlNv1qpZFY)
- [SSE vs WebSockets vs Long Polling by Martin Chaov. JS Fest 2018](https://www.youtube.com/watch?v=n9mRjkQg3VE&ab_channel=FestGroup)
- [Facebook Documentation on Server-Sent Events for live feed when streaming](https://developers.facebook.com/docs/graph-api/server-sent-events/)
