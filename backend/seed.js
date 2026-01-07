import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "./src/models/Post.js";
import Comment from "./src/models/Comment.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB Connected");

    // Clear existing data
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // ==================== CREATE POSTS ====================

    const posts = await Post.create([
      {
        title: "How to learn React in 2024?",
        content:
          "I'm a complete beginner to React and web development. I've heard React is one of the most popular frameworks, but I'm not sure where to start. Should I learn JavaScript first? What about HTML/CSS? I'd love to hear your learning journey and what resources helped you the most. Any roadmap suggestions would be greatly appreciated!",
      },
      {
        title: "Best practices for Redux Toolkit in large applications",
        content:
          "I'm working on a large-scale enterprise React application with multiple teams. We're using Redux Toolkit but struggling with organization. How do you structure your slices? Do you use feature-based or domain-based organization? How do you handle shared state? What about async thunks - do you keep them in the same file as slices or separate them?",
      },
      {
        title: "MongoDB vs PostgreSQL - Which database should I choose?",
        content:
          "I'm building a social media platform from scratch and need to decide on a database. The app will have users, posts, comments (nested), likes, and real-time notifications. I've heard MongoDB is great for flexibility, but PostgreSQL is better for relationships. Which would you recommend for this use case? What are the trade-offs?",
      },
      {
        title: "Struggling with nested comments implementation",
        content:
          "I'm building a discussion forum (similar to Reddit) and need to implement nested comments. I've tried several approaches but struggling with the recursive rendering and performance. How deep should I allow nesting? Should I use recursion or iteration? Any tips on optimizing performance with deep comment threads?",
      },
      {
        title: "Node.js vs Django vs Ruby on Rails in 2024",
        content:
          "I'm starting a new project and can't decide which backend framework to use. I know JavaScript well (Node.js/Express), but I've heard great things about Django's batteries-included approach and Rails' convention over configuration. What are your experiences? Which one would you recommend for a startup building an MVP quickly?",
      },
      {
        title: "Is Tailwind CSS worth learning?",
        content:
          "I've been using traditional CSS and SCSS for years. Everyone keeps talking about Tailwind CSS, but the utility-class approach seems messy to me. Isn't it just inline styles with extra steps? For those who switched from traditional CSS to Tailwind - was it worth it? What are the real benefits?",
      },
      {
        title: "Docker for beginners - Where to start?",
        content:
          "I keep hearing about Docker and containerization everywhere, but I don't understand why I need it. I can run my apps fine locally. What problems does Docker solve? Is it necessary for small projects, or only for large-scale applications? Can someone explain Docker in simple terms?",
      },
      {
        title: "JWT authentication vs Session-based authentication",
        content:
          "I'm implementing authentication in my MERN stack app and confused about whether to use JWT tokens or traditional session-based auth. Everyone seems to recommend JWT, but I've read about security concerns. What's the current best practice? How do you handle token refresh? Where should tokens be stored - localStorage or httpOnly cookies?",
      },
      {
        title: "Career advice: Frontend vs Backend vs Full-stack?",
        content:
          "I'm a junior developer trying to decide which path to specialize in. I enjoy both frontend (React) and backend (Node.js), but everyone says you should specialize. Should I focus on one or continue as full-stack? What's the job market like for each? Which path offers better career growth and salary?",
      },
      {
        title: "Understanding JavaScript closures once and for all",
        content:
          "I've read dozens of articles about JavaScript closures, but I still don't fully understand them. Can someone explain closures in the simplest way possible? When do you actually use them in real projects? What are the practical applications beyond interview questions?",
      },
      {
        title: "Web accessibility (a11y) - How important is it really?",
        content:
          "I often skip accessibility features when building projects to save time. How important is web accessibility in real-world projects? Do companies actually care about it? What are the minimum accessibility features every website should have? Any tools to test accessibility?",
      },
      {
        title: "GraphQL vs REST API - When to use which?",
        content:
          "I've been using REST APIs for all my projects, but recently learned about GraphQL. It seems powerful but complex. When should I choose GraphQL over REST? Is the learning curve worth it? What are the real-world scenarios where GraphQL shines?",
      },
      {
        title: "Microservices architecture - Is it overkill for small teams?",
        content:
          "My team of 3 developers is building a SaaS product. Our lead architect wants to use microservices architecture, but I think it's overkill. Isn't microservices only for large companies like Netflix? What's your experience with microservices in small teams?",
      },
      {
        title: "Testing in React - Unit, Integration, or E2E?",
        content:
          "I never write tests because I find them time-consuming and don't see the value. Everyone says testing is important, but which type of testing should I focus on? Jest for unit tests? React Testing Library? Cypress for E2E? What's the minimum testing strategy for a React app?",
      },
      {
        title: "Should I learn TypeScript or stick with JavaScript?",
        content:
          "I'm comfortable with JavaScript and can build full applications. Do I really need to learn TypeScript? Is it just extra syntax, or does it actually prevent bugs? How long does it take to learn? Will it make me a better developer, or just slow me down initially?",
      },
    ]);

    console.log(`✅ Created ${posts.length} posts`);

    // ==================== CREATE COMMENTS ====================

    // POST 1: React Learning - Heavy nested discussion (5 levels deep)
    const p1c1 = await Comment.create({
      postId: posts[0]._id,
      text: "Start with the official React documentation! It has been completely rewritten in 2023 and is now the best resource for beginners. The new docs use modern React with hooks from the start.",
      parentId: null,
    });

    const p1c2 = await Comment.create({
      postId: posts[0]._id,
      text: "I agree 100%! The new React docs are incredible. They explain concepts step-by-step with interactive examples. I'd also recommend freeCodeCamp's React course - it's completely free and very comprehensive.",
      parentId: p1c1._id,
    });

    const p1c3 = await Comment.create({
      postId: posts[0]._id,
      text: "Thanks for the recommendations! I'll check out the React docs first. Do you think I should learn JavaScript fundamentals before diving into React, or can I learn both together?",
      parentId: p1c2._id,
    });

    const p1c4 = await Comment.create({
      postId: posts[0]._id,
      text: "Definitely learn JavaScript basics first! Understanding variables, functions, arrays, objects, and ES6 features (arrow functions, destructuring, spread operator) will make React so much easier. Spend at least 2-3 weeks on pure JavaScript.",
      parentId: p1c3._id,
    });

    const p1c5 = await Comment.create({
      postId: posts[0]._id,
      text: "That's great advice! I'll focus on JavaScript fundamentals first. Any specific topics in JavaScript that are most important for React?",
      parentId: p1c4._id,
    });

    const p1c6 = await Comment.create({
      postId: posts[0]._id,
      text: "Don't forget YouTube tutorials! Channels like Traversy Media, Web Dev Simplified, and Codevolution have amazing React content. Visual learning helps a lot.",
      parentId: null,
    });

    const p1c7 = await Comment.create({
      postId: posts[0]._id,
      text: "Web Dev Simplified is my favorite! His explanations are so clear and concise. He breaks down complex topics into simple chunks.",
      parentId: p1c6._id,
    });

    const p1c8 = await Comment.create({
      postId: posts[0]._id,
      text: "I learned React from his channel too! His React hooks tutorial series is fantastic.",
      parentId: p1c7._id,
    });

    const p1c9 = await Comment.create({
      postId: posts[0]._id,
      text: "Another approach: build projects while learning! Don't just watch tutorials. Build a todo app, weather app, etc. Learning by doing is the fastest way.",
      parentId: null,
    });

    const p1c10 = await Comment.create({
      postId: posts[0]._id,
      text: "This is the way! Tutorial hell is real. I watched hundreds of hours of tutorials but couldn't build anything on my own until I started coding along and building my own projects.",
      parentId: p1c9._id,
    });

    // POST 2: Redux Toolkit - Professional discussion
    await Comment.create({
      postId: posts[1]._id,
      text: "We organize by features, not by technical layers. Each feature folder contains its slice, components, and hooks. For example: features/posts/, features/comments/, features/auth/. This keeps related code together.",
      parentId: null,
    });

    await Comment.create({
      postId: posts[1]._id,
      text: "For shared state, we have a separate 'shared' or 'common' folder. Things like user data, app settings, UI state (modals, toasts) go there. Everything else is feature-specific.",
      parentId: null,
    });

    await Comment.create({
      postId: posts[1]._id,
      text: "Use createAsyncThunk for async operations! It automatically generates pending/fulfilled/rejected action types and handles loading states. Don't write manual async logic in slices.",
      parentId: null,
    });

    await Comment.create({
      postId: posts[1]._id,
      text: "One tip: Use RTK Query if you're fetching a lot of data from APIs. It eliminates the need for most manual Redux logic. It handles caching, invalidation, and loading states automatically.",
      parentId: null,
    });

    // POST 3: MongoDB vs PostgreSQL
    const p3c1 = await Comment.create({
      postId: posts[2]._id,
      text: "For a social media platform with nested comments, I'd actually recommend PostgreSQL! Yes, nested data is easier in MongoDB, but relationships (users, posts, likes, followers) are much cleaner in a relational database.",
      parentId: null,
    });

    const p3c2 = await Comment.create({
      postId: posts[2]._id,
      text: "Interesting take! How would you handle nested comments in PostgreSQL? Wouldn't it require multiple queries?",
      parentId: p3c1._id,
    });

    const p3c3 = await Comment.create({
      postId: posts[2]._id,
      text: "You can use a self-referencing foreign key (parentId) just like in MongoDB! Postgres has recursive CTEs (Common Table Expressions) to query nested data efficiently. Look up 'WITH RECURSIVE' queries.",
      parentId: p3c2._id,
    });

    await Comment.create({
      postId: posts[2]._id,
      text: "I've used both for similar projects. MongoDB is faster to prototype, but PostgreSQL is easier to maintain long-term. Data integrity and strong typing save you from bugs down the road.",
      parentId: null,
    });

    // POST 4: Nested Comments
    await Comment.create({
      postId: posts[3]._id,
      text: "I implemented nested comments recently. Limit nesting to 5 levels max! After that, use 'Continue thread' links like Reddit does. Deep nesting kills performance and UX.",
      parentId: null,
    });

    await Comment.create({
      postId: posts[3]._id,
      text: "For rendering, use recursion but memoize components! Use React.memo() on your CommentItem component to prevent unnecessary re-renders. This is crucial for performance.",
      parentId: null,
    });

    await Comment.create({
      postId: posts[3]._id,
      text: "Store comments flat in your database with a parentId field. Build the tree structure on the frontend using a helper function. This is much faster than storing nested objects.",
      parentId: null,
    });

    // POST 5: Backend frameworks
    await Comment.create({
      postId: posts[4]._id,
      text: "Node.js/Express is the most flexible but requires more setup. Django is batteries-included and perfect for MVPs. Rails is amazing but the community isn't as active as before. For a startup, I'd choose Django.",
      parentId: null,
    });

    await Comment.create({
      postId: posts[4]._id,
      text: "If you know JavaScript well, stick with Node.js! Learning a new language (Python/Ruby) slows you down. Use frameworks like NestJS or AdonisJS for better structure than raw Express.",
      parentId: null,
    });

    // POST 6: Tailwind CSS
    await Comment.create({
      postId: posts[5]._id,
      text: "I was skeptical too, but after using Tailwind for 6 months, I can't go back. The speed of development is insane. No more switching between files, no more naming classes, no more CSS conflicts.",
      parentId: null,
    });

    await Comment.create({
      postId: posts[5]._id,
      text: "The utility-first approach seems messy at first, but it's incredibly maintainable. Every component is self-contained. You can delete a component and know you're not breaking styles elsewhere.",
      parentId: null,
    });

    // POST 7: Docker
    await Comment.create({
      postId: posts[6]._id,
      text: "Docker solves the 'works on my machine' problem. Your app runs the same way in development, staging, and production. It packages your app with all dependencies into a container.",
      parentId: null,
    });

    await Comment.create({
      postId: posts[6]._id,
      text: "For small projects, Docker might be overkill. But once you work with multiple microservices or need to deploy to cloud platforms, Docker becomes essential. Learn it early!",
      parentId: null,
    });

    // POST 8: JWT vs Session
    await Comment.create({
      postId: posts[7]._id,
      text: "Use httpOnly cookies for refresh tokens and short-lived access tokens in memory or localStorage. Never store refresh tokens in localStorage - that's a security risk!",
      parentId: null,
    });

    await Comment.create({
      postId: posts[7]._id,
      text: "JWT is stateless which is great for microservices. But session-based auth with Redis is more secure and easier to revoke. Both have trade-offs. Choose based on your architecture.",
      parentId: null,
    });

    // POST 9: Career advice
    await Comment.create({
      postId: posts[8]._id,
      text: "Start as full-stack to understand the whole picture, then specialize based on what you enjoy more. I started full-stack, loved frontend, now I'm a senior frontend engineer making great money.",
      parentId: null,
    });

    await Comment.create({
      postId: posts[8]._id,
      text: "Backend roles often pay more at senior levels, but frontend has more jobs available. Full-stack is the safest bet for career flexibility. You can always specialize later.",
      parentId: null,
    });

    // POST 10: Closures
    await Comment.create({
      postId: posts[9]._id,
      text: "Closures = when a function remembers variables from its outer scope even after the outer function has returned. Real use cases: event handlers, private variables, factory functions, React hooks!",
      parentId: null,
    });

    await Comment.create({
      postId: posts[9]._id,
      text: "Every time you use useState in React, you're using closures! The state variable is 'closed over' by your component function. That's why it persists between renders.",
      parentId: null,
    });

    // POST 11: Accessibility
    await Comment.create({
      postId: posts[10]._id,
      text: "Accessibility is legally required in many countries! In the US, ADA lawsuits against websites are increasing. Plus, it's just the right thing to do. Start with semantic HTML, keyboard navigation, and ARIA labels.",
      parentId: null,
    });

    // POST 12: GraphQL vs REST
    await Comment.create({
      postId: posts[11]._id,
      text: "Use GraphQL when you have complex, nested data and want flexible queries. Use REST when you have simple CRUD operations. GraphQL has a steeper learning curve but prevents over-fetching/under-fetching.",
      parentId: null,
    });

    // POST 13: Microservices
    await Comment.create({
      postId: posts[12]._id,
      text: "Microservices in a 3-person team is definitely overkill! Start with a monolith. Microservices add huge operational complexity: service discovery, API gateways, distributed tracing, etc. Not worth it for small teams.",
      parentId: null,
    });

    // POST 14: Testing
    await Comment.create({
      postId: posts[13]._id,
      text: "Start with integration tests using React Testing Library. They give you the most confidence. Unit tests for utility functions. E2E tests for critical user flows only. Don't aim for 100% coverage.",
      parentId: null,
    });

    // POST 15: TypeScript
    await Comment.create({
      postId: posts[14]._id,
      text: "TypeScript is 100% worth it! It catches bugs before runtime, makes refactoring safe, and improves IDE autocomplete. Learning curve is 1-2 weeks. After that, you'll write code faster and with more confidence.",
      parentId: null,
    });

    console.log("✅ Created 40+ comments with deep nesting");
    console.log("");
    console.log("🎉 ==========================================");
    console.log("🎉 SEED DATA CREATED SUCCESSFULLY!");
    console.log("🎉 ==========================================");
    console.log("");
    console.log(`📊 Summary:`);
    console.log(`   - ${posts.length} Discussion Posts`);
    console.log(`   - 40+ Comments (including nested up to 5 levels)`);
    console.log(`   - Multiple discussion threads`);
    console.log(`   - Realistic developer conversations`);
    console.log("");
    console.log("✅ Ready to test your beautiful UI!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedData();
