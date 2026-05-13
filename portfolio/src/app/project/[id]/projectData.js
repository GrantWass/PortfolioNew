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
      "Leveraged external APIs to fetch my running data, display it on a map, and visualize my recent running data while considering in-house alternatives",
      "Designed and implemented the frontend and backend architecture, including the user interface, data processing, and data visualization",
      "Iteratively improved the user interface and user experience by incorporating feedback from friends",
    ],
    whatILearned:
      "This project came from my curiosity about where I run the most. After taking a web development class, I wanted to apply what I’d learned to something both practical and fun. I figured out how to use the Google Maps API to show my running routes and the Garmin Connect API to pull in my running data. It was my first time dealing with external APIs and messy data, and it made me realize I needed a more performant backend, which led to learning about caching, batching, and concurrency. Plus, having full control over the design let me try out different UI ideas and layouts.",
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
  "neural-network": {
    title: "Interactive Neural Network Visualizer",
    summary:
      "A web-based tool (nn-visual.com) that visually demonstrates how neural networks learn, enabling users to observe forward and backward propagation in real time.",
    images: ["/nn.png"],
    whatIDid: [
      "Designed and built a fully interactive neural network visualizer using React and TypeScript, with an intuitive UI for exploring forward and backward propagation.",
      "Implemented core neural network logic from scratch, including weight initialization, activation functions, and gradient-based training updates.",
      "Created real-time visuals to display how activations, weights, and gradients change during training for each layer and node.",
      "Integrated Chart.js to display live tracking of loss and accuracy over training epochs.",
      "Enabled user customization of network architecture, learning rate, training data, and other hyperparameters through a clean interface.",
    ],
    whatILearned:
      "This project deepened my understanding of neural network internals by building each component from the ground up. I gained practical experience with React, TypeScript, and state management for real-time UI updates. Implementing backpropagation manually helped solidify key machine learning concepts. I also learned how to design user-friendly visualizations for complex topics, and improved my ability to communicate technical processes interactively. Hosting and deployment further taught me how to bring standalone projects to production.",
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
      "Designed the app primarily using two reusable components, a card and a popup modal",
      "Hosted my website on AWS using route 53 to mangae DNS, Cloudfront to serve the website as my CDN, and an S3 bucket to store the website",
    ],
    whatILearned:
      "This project started as a way for me to learn web hosting on AWS. During this developement I was studying for an AWS Cloud Practicioner Certification and wanted to use this project as a way to apply my knowledge. This project cemented my passion for web development and software development as being able to see my work live on the internet was a very rewarding experience.",
  },
  "travela": {
    title: "Travela",
    summary: "Social travel planning on an interactive map. See where friends actually went, what they did, and where they stayed — built for travelers looking for real, affordable trip inspiration.",
    images: ["/travela_home.png", "/travela_trip.png"],
    whatIDid: [
      "Built a map-first travel discovery app where users add trips, activities, and lodging notes as pop-ups on an interactive world map",
      "Implemented friend-based filtering so users can view all travelers, just their friends, or just their own trips",
      "Designed the full-stack architecture using Next.js and deployed on Vercel",
    ],
    whatILearned:
      "A social travel discovery app that turns trip planning into a map-first experience. Fills the gap between Google Maps (logistics-led) and TripAdvisor (review-led) with something story-led and people-led. Building this taught me how to design around real user behavior — people want to see what their friends actually did, not curated reviews from strangers.",
    url: "https://travel-map-nine.vercel.app/",
    github: "https://github.com/GrantWass/travel-map",
  },

  "ultron": {
    title: "Ultron",
    summary: "AI-powered error tracking for JavaScript apps. Drop-in SDK that captures errors, network requests, Web Vitals, and session replay — with AI fix suggestions that read your actual source code.",
    images: ["./ultron_home.png", "./ultron.png"],
    whatIDid: [
      "Built a lightweight SDK that installs in under a minute and captures unhandled JavaScript errors, network failures, Web Vitals, and session replay",
      "Integrated Claude to generate AI fix suggestions by connecting a GitHub repository and reading actual source code — not generic stack trace analysis",
      "Designed the full-stack platform with Next.js and Supabase, including authentication, billing via Stripe, and event ingestion via AWS Lambda",
      "Architected the SDK to be a drop-in alternative to Sentry with a smaller footprint and smarter error context",
    ],
    whatILearned:
      "A full-stack error monitoring platform built as a lightweight alternative to Sentry. The differentiator is AI-generated fix suggestions: connect a GitHub repository and the AI reads the actual source to propose real code fixes — not boilerplate advice based on stack traces. Building this taught me how to design SDK ergonomics, manage event pipelines at scale, and integrate LLMs into a product flow in a way that's genuinely useful rather than a gimmick.",
    url: "https://ultron.live",
    github: "https://github.com/GrantWass/ultron",
  },

};

export default projectData;
