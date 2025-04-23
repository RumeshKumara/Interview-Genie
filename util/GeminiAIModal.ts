import { GoogleGenAI } from "@google/genai"; // Fixed incorrect import

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: "text/plain",
  };
  const model = "gemini-1.5-flash";
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Job Position: Full Stack Developer, Job Description: React, Nodejs, MySQL, Years of Experience: 2, Depends on this information please give me 5 Interview question with answers in JSON Format, Give Question and Answers as field in JSON`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `\`\`\`json
[
  {
    "Question": "Describe your experience with React.js, focusing on specific components, state management, and any challenging projects you've worked on.",
    "Answer": "I have two years of experience using React.js to build single-page applications. I'm proficient in using functional components with hooks, specifically useState and useEffect, for managing component state.  For more complex state management, I've utilized Context API and Redux in past projects.  One challenging project involved building a dynamic dashboard with real-time data updates. This required efficient state management to avoid performance bottlenecks and ensure a smooth user experience. I leveraged Redux's capabilities to handle asynchronous actions and optimize data fetching."
  },
  {
    "Question": "Explain your understanding of Node.js and its role in building backend systems. Give examples of frameworks or libraries you've used.",
    "Answer": "Node.js is a JavaScript runtime environment that allows server-side execution of JavaScript code. It's known for its non-blocking, event-driven architecture, which makes it efficient for handling concurrent requests. I've used Node.js extensively to build RESTful APIs.  I'm familiar with Express.js, a popular framework for creating web servers and routing requests. I have also used middleware for tasks like authentication and request validation. In one project, I utilized Node.js and Express to create a microservice architecture, improving scalability and maintainability."
  },
  {
    "Question": "How do you handle database interactions with MySQL in your applications?  Discuss your experience with SQL queries and database design.",
    "Answer": "I typically interact with MySQL databases using Node.js and an ORM (Object-Relational Mapper) like Sequelize or TypeORM. This abstracts away the complexities of raw SQL, allowing for more efficient and maintainable code. I'm comfortable writing SQL queries for data retrieval, insertion, updates, and deletions.  My experience includes designing database schemas, normalizing data to reduce redundancy, and optimizing queries for performance.  I understand the importance of indexing for efficient searches and have implemented them in previous projects to improve response times."
  },
  {
    "Question": "Describe a situation where you had to debug a complex issue in a full-stack application.  What steps did you take to identify and resolve the problem?",
    "Answer": "In a recent project, we encountered an intermittent error where user data wasn't being saved correctly. The error wasn't consistently reproducible, making debugging challenging. My approach involved using browser developer tools to inspect network requests, checking server-side logs, and meticulously reviewing the code for potential issues in both the frontend (React) and backend (Node.js).  I eventually identified a race condition in an asynchronous operation that was causing the data to be overwritten. I resolved the problem by implementing proper synchronization mechanisms and added more robust error handling to prevent this from happening again."
  },
  {
    "Question": "How do you approach testing in your development workflow? What types of testing are you familiar with and how do you implement them?",
    "Answer": "Testing is a crucial part of my development process. I utilize a combination of unit, integration, and end-to-end testing.  For unit testing, I typically use Jest and React Testing Library in the frontend and Jest and Supertest in the backend.  I write unit tests to verify individual components and functions work as expected. Integration tests are used to ensure that different parts of the application work together correctly. End-to-end tests, using tools like Cypress, help verify the overall application flow.  I believe in writing tests early and often, using a Test-Driven Development (TDD) approach whenever feasible to ensure code quality and prevent bugs."
  }
]
\`\`\`
`,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  try {
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });
    for await (const chunk of response) {
      console.log(chunk.text);
    }
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

main();