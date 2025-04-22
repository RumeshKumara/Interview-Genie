import {
  GoogleGenAI,
} from '@google/genai';

async function main() {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-1.5-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `Job Position: Full Stack Developer, Job Description: React, Nodejs, MySQL, Years of Experience: 2, Depends on this information please give me 5 Interview question with answers in JSON Format, Give Question and Answers as field in JSON`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
[
  {
    "Question": "Describe your experience with React.js, focusing on specific projects where you utilized its key features (e.g., components, state management, hooks).",
    "Answer": "In my previous role, I developed a React application for [Project Name], where I extensively used functional components with hooks like useState and useEffect for managing application state and handling side effects.  I implemented [specific feature, e.g., a dynamic data table using a library like Material-UI or Ant Design] which required leveraging component composition and props drilling.  I also worked with [State Management Library, e.g., Redux or Context API] to manage application state efficiently across multiple components.  A challenging aspect was [mention a specific challenge, e.g., optimizing performance for a large dataset], which I addressed by [explain your solution, e.g., implementing pagination and lazy loading]."
  },
  {
    "Question": "Explain your understanding of Node.js and its role in building web applications.  Provide an example of a project where you used Node.js.",
    "Answer": "Node.js is a JavaScript runtime environment that allows server-side execution of JavaScript code.  It uses an event-driven, non-blocking I/O model, making it efficient for handling concurrent requests.  In my previous role, I used Node.js with Express.js to build the API for [Project Name].  This API handled [list of API functionalities, e.g., user authentication, data retrieval, and data manipulation].  I used middleware to handle routing, request validation, and error handling.  I also integrated it with a MySQL database using a library like Sequelize or Mongoose."
  },
  {
    "Question": "How do you handle database interactions using MySQL in your Node.js applications?  Describe your approach to data modeling and query optimization.",
    "Answer": "I typically use an Object-Relational Mapper (ORM) like Sequelize or Mongoose to interact with a MySQL database in my Node.js applications.  This abstracts away the complexities of SQL queries and allows me to work with data in a more object-oriented way.  For data modeling, I follow best practices such as normalizing the database to reduce data redundancy.  For query optimization, I focus on using appropriate indexing strategies, minimizing the amount of data retrieved through efficient queries, and employing techniques like pagination for handling large datasets."
  },
  {
    "Question": "Describe a challenging bug you encountered while developing a full-stack application and how you solved it.",
    "Answer": "In one project, I encountered a race condition that led to inconsistent data in the database.  The issue arose when multiple users concurrently updated the same record.  To solve this, I implemented optimistic locking using timestamps in the database and checking for conflicts on the client side.  I also considered using transactions to ensure atomicity of database operations to completely prevent this type of conflict. This improved the application's reliability and data integrity."
  },
  {
    "Question": "How do you ensure the security of your applications, particularly when dealing with sensitive data like user credentials?",
    "Answer": "Security is paramount.  I employ several measures, including input validation to prevent injection attacks, using parameterized queries to avoid SQL injection vulnerabilities, and proper authentication and authorization mechanisms like JWT (JSON Web Tokens) for securing API endpoints.  For sensitive data like passwords, I always use strong hashing algorithms like bcrypt to store them securely. I also follow secure coding practices and stay up to date with the latest security vulnerabilities and best practices."
  }
]
\`\`\`
`,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();