const projectData = {
  "run-tracker": {
    title: "Run Tracker",
    summary:
      "A web interface for tracking and analyzing my running activities, providing geospatial visualizations and analysis.",
    images: [
      "/homepage.png",
      "/interface.png",
      "/heatmap.png",
      "/discovery.png",
    ],
    whatIDid: [
      "Parsed GPX files from my activity data with lots of geospatial data to map my most frequent runnings routes in a interactive heatmap",
      "Optimized large requests performance by 5x using caching, batched requests, and concurrent processing along with other minor optimizations",
      "Leveraged external APIs and SDKs to fetch my running data, display it on a map, and visualize my recent running data while considering in-house alternatives",
    ],
    whatILearned:
      "This project stemmed from a desire to get insight on where I run the most. I had recently taken a class on web development and wanted to apply my new skills to a project that would be both a good learning experience and practical to me. I learned how to use the Google Maps API to display running routes and how to use the Garmin Connect API to fetch my running data. This was the first time I worked with external APIs and messy data. This was the first time I found the need for a performant backend, which led me to learn about caching, batching, and concurrency. This was also the first project where I had full control over the design, which allowed me to experiment with different UI designs and layouts.",
  },
  "secret-gitler": {
    title: "Secret Gitler",
    summary:
      "A browser-based, multiplayer game inspired by the popular turn-based game Secret Hitler.",
    images: [
      "/cardPick.png",
      "/defaultGame.png",
      "/gitlerHome.png",
      "/hiddenGame.png",
      "/tooltip.png",
      "/identity.png",
    ],
    whatIDid: [
      "Implemented user authentication and profile management, utilizing MongoDB for data storage and Redux to manage user login state.",
      "Implemented role-based UI to provide players with information based on their role in the game, creating a game experience that is both engaging and informative.",
      "Created a Model View Controller architecture for our React application to manage game state and increase code readability and maintainability.",
      "Developed backend logic to manage complex state updates, including voting and card selections.",
      "Acted as a project manager, frequently assigning tasks to teammates while considering their strengths and workload, allowing us to meet crucial deadlines.",
    ],
    whatILearned:
      "This was my first web development project, where I started with no prior knowledge and learned the fundamentals of web development. Throughout this project, I became proficient in React, TypeScript, MongoDB, HTML, and CSS. In addition to these languages and tools, I gained experience in teamwork, including branch management, agile methodology, and project management. At the time, these concepts were entirely new to me, making this project a significant learning opportunity. I also explored user management and authentication, modern web development architecture, and implemented web sockets for real-time gameplay.",
  },
  "old-portfolio": {
    title: "Old Portfolio",
    summary: "A simple portfolio aimed at showcasing my projects and skills.",
    images: [
      "/old1.png",
      "/old2.png",
      "/old3.png",
      "/old4.png",
      "/old5.png",
      "/old6.png",
    ],
    whatIDid: [
      "Created a simple single page application using React and Next.js",
      "Expiremented with different SEO tactics in hopes of increasing my search engine ranking",
      "Hosted my website on AWS using route 53 to mangae DNS, Cloudfront to serve the website as my CDN, and an S3 bucket to store the website",
    ],
    whatILearned:
      "This project started as a way for me to learn web hosting on AWS. During this developement I was studying for an AWS Cloud Practicioner Certification and wanted to use this project as a way to apply my knowledge. This project cemented my passion for web development and software development as being able to see my work live on the internet was a very rewarding experience.",
  },
  //   "real-estate-affordability-predictor": {
  //     title: "Real Estate Affordability Predictor",
  //     summary:
  //       "A tool designed to predict real estate affordability using machine learning models and existing databases.",
  //     images: ["/realestate1.jpg", "/realestate2.jpg"],
  //     whatIDid: [
  //       "Analyzed data using accuracy metrics and visualization tools",
  //       "Improved model accuracy by 50% using feature engineering and hyperparameter tuning",
  //       "Explored both classification and regression applications of the model",
  //     ],
  //     whatILearned:
  //       "Enhanced skills in data analysis and machine learning, gained experience with model fine-tuning and feature engineering, and learned practical applications of real estate prediction.",
  //   },
  //   "mock-compiler": {
  //     title: "Mock Compiler",
  //     summary:
  //       "A functional compiler with type checking, parsing, and lexical analysis, simulating the process of code compilation.",
  //     images: ["/compiler1.jpg", "/compiler2.jpg"],
  //     whatIDid: [
  //       "Designed and implemented the overall structure of the compiler",
  //       "Optimized recursion logic for parsing nested expressions",
  //       "Ensured modularity and scalability using software engineering principles",
  //     ],
  //     whatILearned:
  //       "Improved understanding of compiler construction, learned about lexical analysis and parsing, and gained experience in applying DRY, SRP, and SOLID principles.",
  //   },
};

export default projectData;
