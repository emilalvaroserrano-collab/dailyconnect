import type { Lesson, TutorialCard } from "@/lib/types";

export type CatalogTutorial = TutorialCard & { lesson: Lesson };

// Bump when the AI MasterPlan curriculum changes. Legacy lesson records remain
// in storage for existing learners, but only this curriculum is shown.
export const CATALOG_VERSION = 3;

export const CATALOG: CatalogTutorial[] = [
  {
    "id": "ai-foundations",
    "title": "AI Foundations: Start Here",
    "description": "Understand the tools, the roadmap, and what AI can and cannot do.",
    "difficulty": "Start",
    "durationMin": 30,
    "thumbnail": "/covers/masterplan/ai-foundations.svg",
    "reel": "",
    "muxPlaybackId": "",
    "tags": [
      "AI MasterPlan",
      "Foundations"
    ],
    "sortOrder": 0,
    "lesson": {
      "chapters": [
        {
          "id": "c1",
          "title": "Your AI developer roadmap",
          "minutes": 10,
          "body": "Start with one practical objective: build a customer booking app. List its users, the main problem, and the outcome. Artificial Intelligence can help generate ideas, text, and code, but you remain responsible for checking factual accuracy, privacy, and reliability. AI MasterPlan follows one loop: idea, prompt, build, test, debug, improve, deploy."
        },
        {
          "id": "c2",
          "title": "Understand models and tools",
          "minutes": 10,
          "body": "A large language model (LLM) predicts and produces responses from context. A chat assistant is not automatically a production backend. Compare a conversational assistant, an AI coding environment, a database, and an automation service. Learn what each tool does before mixing them."
        },
        {
          "id": "c3",
          "title": "Set up your learning workspace",
          "minutes": 10,
          "body": "Create one workspace for notes, prompts, screenshots, and project versions. Define a sample problem, success criteria, and a list of constraints. Start with a small deliverable you can verify today, not ten apps at once."
        }
      ],
      "exercises": [
        {
          "id": "e1",
          "prompt": "Write a one-paragraph description of an application you want to build.",
          "hint": "Mention the target user, pain point, and desired result."
        },
        {
          "id": "e2",
          "prompt": "Separate your tools into AI, editor, backend, and automation.",
          "hint": "Know which component owns each responsibility."
        },
        {
          "id": "e3",
          "prompt": "Define three checks that prove your first app works.",
          "hint": "Use actions a real user can perform."
        }
      ]
    }
  },
  {
    "id": "prompt-engineering",
    "title": "Prompt Engineering for Builders",
    "description": "Turn vague ideas into specifications AI can implement and you can verify.",
    "difficulty": "Start",
    "durationMin": 35,
    "thumbnail": "/covers/masterplan/prompt-engineering.svg",
    "reel": "",
    "muxPlaybackId": "",
    "tags": [
      "AI MasterPlan",
      "Prompting"
    ],
    "sortOrder": 1,
    "lesson": {
      "chapters": [
        {
          "id": "c1",
          "title": "From ideas to requirements",
          "minutes": 12,
          "body": "Weak prompt: create a website. Strong prompt: build a mobile-friendly service booking site with service selection, date, confirmation, and an admin view. Specify audience, screens, validation, states, and constraints. Ask for a plan before editing code."
        },
        {
          "id": "c2",
          "title": "Use structured development prompts",
          "minutes": 12,
          "body": "Describe your stack, repository context, file boundaries, intended behavior, acceptance tests, and what must not change. Work in one feature at a time. Ask for assumptions and require the AI to cite which files it modified."
        },
        {
          "id": "c3",
          "title": "Review the result like a developer",
          "minutes": 11,
          "body": "Do not assume generated code is correct. Check empty forms, bad input, navigation, loading states, permissions, and mobile widths. When something breaks, report the exact error, reproduction steps, and expected behavior before requesting a fix."
        }
      ],
      "exercises": [
        {
          "id": "e1",
          "prompt": "Rewrite a vague website prompt into an implementation-ready brief.",
          "hint": "Include pages, data, validations, and tests."
        },
        {
          "id": "e2",
          "prompt": "Write one debugging prompt with steps to reproduce.",
          "hint": "Actual vs expected result."
        },
        {
          "id": "e3",
          "prompt": "Create a short acceptance checklist for mobile and desktop.",
          "hint": "Cover navigation and edge cases."
        }
      ]
    }
  },
  {
    "id": "vibe-coding",
    "title": "Vibe Coding: Idea to Working Prototype",
    "description": "Use AI coding tools without confusing a generated screen for finished software.",
    "difficulty": "Start",
    "durationMin": 40,
    "thumbnail": "/covers/masterplan/vibe-coding.svg",
    "reel": "",
    "muxPlaybackId": "",
    "tags": [
      "AI MasterPlan",
      "Vibe Coding"
    ],
    "sortOrder": 2,
    "lesson": {
      "chapters": [
        {
          "id": "c1",
          "title": "Understand the loop",
          "minutes": 13,
          "body": "Choose one AI-assisted development tool and open a project. Build incrementally: one page, one form, one state transition. Review the generated files after each change. Ask why a dependency is needed before adding it."
        },
        {
          "id": "c2",
          "title": "Build and run locally",
          "minutes": 14,
          "body": "Have the tool produce a responsive homepage and booking form. Launch the development server, open the actual UI, submit a sample booking, and inspect console errors. A screenshot is not a working app; real clicks and data flow are what matter."
        },
        {
          "id": "c3",
          "title": "Debug with evidence",
          "minutes": 13,
          "body": "Capture an error message and identify the smallest failing feature. Reproduce it, isolate the cause, update the minimum code, and rerun the test. Commit known-good milestones so you can roll back if the next AI edit breaks the project."
        }
      ],
      "exercises": [
        {
          "id": "e1",
          "prompt": "Build a booking form with a working confirmation state.",
          "hint": "Do not stop at static UI."
        },
        {
          "id": "e2",
          "prompt": "Record one failed test and how you fixed it.",
          "hint": "Include the exact steps."
        },
        {
          "id": "e3",
          "prompt": "Write your idea-to-deploy checklist.",
          "hint": "Plan, build, test, debug, deploy."
        }
      ]
    }
  },
  {
    "id": "frontend-ui",
    "title": "Build Your First Responsive Website",
    "description": "Design production-minded interfaces for phones, desktop, and embedded WebViews.",
    "difficulty": "Start",
    "durationMin": 45,
    "thumbnail": "/covers/masterplan/frontend-ui.svg",
    "reel": "",
    "muxPlaybackId": "",
    "tags": [
      "AI MasterPlan",
      "Frontend"
    ],
    "sortOrder": 3,
    "lesson": {
      "chapters": [
        {
          "id": "c1",
          "title": "Design the user journey",
          "minutes": 15,
          "body": "Map Home, Services, Book, Confirmation, and Profile. Use consistent typography, visible calls to action, accessible labels, and readable contrast. Start with a narrow mobile layout, then expand for desktop."
        },
        {
          "id": "c2",
          "title": "Implement real interactions",
          "minutes": 15,
          "body": "Build reusable UI components for a service card, booking form, button, and header. Add input validation, disabled and loading states, error messages, and confirmation feedback. Navigation links must lead somewhere real."
        },
        {
          "id": "c3",
          "title": "Test mobile behavior",
          "minutes": 15,
          "body": "Check a 390-pixel viewport, landscape orientation, on-screen keyboard, safe-area insets, and touch target sizes. Make sure no text or buttons hide beneath bottom navigation. Allow zoom and respect reduced-motion preferences."
        }
      ],
      "exercises": [
        {
          "id": "e1",
          "prompt": "Sketch five screens for a booking app.",
          "hint": "Focus on the path from discovery to confirmation."
        },
        {
          "id": "e2",
          "prompt": "Build and validate a mobile booking form.",
          "hint": "Test empty and invalid values."
        },
        {
          "id": "e3",
          "prompt": "Audit your app for WebView navigation and safe areas.",
          "hint": "Check keyboard and bottom-bar overlap."
        }
      ]
    }
  },
  {
    "id": "backend-apis",
    "title": "Backend and API Fundamentals",
    "description": "Connect frontend actions to validated requests and meaningful server responses.",
    "difficulty": "Intermediate",
    "durationMin": 45,
    "thumbnail": "/covers/masterplan/backend-apis.svg",
    "reel": "",
    "muxPlaybackId": "",
    "tags": [
      "AI MasterPlan",
      "APIs"
    ],
    "sortOrder": 4,
    "lesson": {
      "chapters": [
        {
          "id": "c1",
          "title": "Know the frontend/backend boundary",
          "minutes": 15,
          "body": "The frontend handles presentation and user interaction. The backend verifies requests, applies business rules, and talks to trusted services. Never put secret API keys into browser code or commit them to GitHub."
        },
        {
          "id": "c2",
          "title": "Design your first endpoint",
          "minutes": 15,
          "body": "Define POST /bookings with validated service, date, and contact fields. Return predictable success and error results. Handle empty input, duplicate bookings, and failures. Log useful errors without logging credentials or personal data."
        },
        {
          "id": "c3",
          "title": "Integrate and test",
          "minutes": 15,
          "body": "Call the backend from the UI using a loading state and a clear error message. Test a successful request, validation failure, network failure, and retry behavior. Understand HTTP status codes and request/response JSON."
        }
      ],
      "exercises": [
        {
          "id": "e1",
          "prompt": "Design a booking API request and response.",
          "hint": "Specify error cases."
        },
        {
          "id": "e2",
          "prompt": "Identify what belongs on the server vs client.",
          "hint": "Keep API secrets out of the browser."
        },
        {
          "id": "e3",
          "prompt": "Document three tests for your endpoint.",
          "hint": "Success, invalid input, and unavailable service."
        }
      ]
    }
  },
  {
    "id": "database-auth",
    "title": "Databases, Accounts, and Security",
    "description": "Store useful application data safely and implement authenticated access.",
    "difficulty": "Intermediate",
    "durationMin": 50,
    "thumbnail": "/covers/masterplan/database-auth.svg",
    "reel": "",
    "muxPlaybackId": "",
    "tags": [
      "AI MasterPlan",
      "Database"
    ],
    "sortOrder": 5,
    "lesson": {
      "chapters": [
        {
          "id": "c1",
          "title": "Model your information",
          "minutes": 17,
          "body": "Design users, services, and bookings with unique IDs and created-at timestamps. Consider ownership and relationships. Avoid storing unnecessary sensitive details. Know the difference between a browser state value and persistent server data."
        },
        {
          "id": "c2",
          "title": "Authentication and permissions",
          "minutes": 17,
          "body": "Authentication proves who signed in; authorization decides what they may access. A customer should only view their own bookings. Admin permissions must be checked on the backend, not just by hiding a button."
        },
        {
          "id": "c3",
          "title": "Build a secure data workflow",
          "minutes": 16,
          "body": "Validate input server-side, use parameterized queries or a safe ORM, handle duplicate requests, and avoid exposing tokens in logs. Test that one user cannot access another user’s records. Back up and recover critical data."
        }
      ],
      "exercises": [
        {
          "id": "e1",
          "prompt": "Define a bookings table and its required columns.",
          "hint": "Use IDs and timestamps."
        },
        {
          "id": "e2",
          "prompt": "Write an access rule for customer and admin roles.",
          "hint": "Authorization must be server-side."
        },
        {
          "id": "e3",
          "prompt": "Test a cross-user access attempt.",
          "hint": "It should be rejected."
        }
      ]
    }
  },
  {
    "id": "ai-integration",
    "title": "Integrate AI into Your App",
    "description": "Add useful model-powered features with clear boundaries and verification.",
    "difficulty": "Intermediate",
    "durationMin": 45,
    "thumbnail": "/covers/masterplan/ai-integration.svg",
    "reel": "",
    "muxPlaybackId": "",
    "tags": [
      "AI MasterPlan",
      "AI Integration"
    ],
    "sortOrder": 6,
    "lesson": {
      "chapters": [
        {
          "id": "c1",
          "title": "Choose a narrow AI feature",
          "minutes": 15,
          "body": "Begin with a customer FAQ assistant that can answer from a small, approved knowledge base. Define what it may answer and when it must hand off to a human. Protect customer information and never assume generated output is factual."
        },
        {
          "id": "c2",
          "title": "Create a server-side AI endpoint",
          "minutes": 15,
          "body": "Send the user question to a backend handler, keep provider credentials server-side, add timeouts and token limits, and return a structured result. Include loading, retry, and friendly failure states in the UI."
        },
        {
          "id": "c3",
          "title": "Evaluate and improve answers",
          "minutes": 15,
          "body": "Create a small test set of real customer questions. Check factual accuracy, privacy, and handoff behavior. Change one prompt or retrieval rule at a time and rerun the test set before launch."
        }
      ],
      "exercises": [
        {
          "id": "e1",
          "prompt": "Describe one AI feature and its allowed knowledge.",
          "hint": "List two things it must refuse to guess."
        },
        {
          "id": "e2",
          "prompt": "Draw the browser → backend → model → browser flow.",
          "hint": "Secrets remain server-side."
        },
        {
          "id": "e3",
          "prompt": "Write five evaluation questions.",
          "hint": "Include one intentionally unanswerable question."
        }
      ]
    }
  },
  {
    "id": "business-automation",
    "title": "Business Automation from Zero",
    "description": "Connect triggers, data, and actions into dependable workflows.",
    "difficulty": "Intermediate",
    "durationMin": 45,
    "thumbnail": "/covers/masterplan/business-automation.svg",
    "reel": "",
    "muxPlaybackId": "",
    "tags": [
      "AI MasterPlan",
      "Automation"
    ],
    "sortOrder": 7,
    "lesson": {
      "chapters": [
        {
          "id": "c1",
          "title": "Map a repetitive business process",
          "minutes": 15,
          "body": "Start with an intake form. Define the trigger, validated input, required records, notification, and who reviews exceptions. Write the workflow before opening an automation editor."
        },
        {
          "id": "c2",
          "title": "Build a small automation",
          "minutes": 15,
          "body": "Connect form submission to a database record and an internal notification. Add status tracking so retries do not create duplicates. Do not auto-send sensitive or customer-facing decisions without approval."
        },
        {
          "id": "c3",
          "title": "Make the workflow reliable",
          "minutes": 15,
          "body": "Test missing fields, unavailable services, duplicate submissions, retries, and human escalation. Track failures and recovery. A useful workflow is one that the owner can monitor and fix."
        }
      ],
      "exercises": [
        {
          "id": "e1",
          "prompt": "Draw a trigger → action → review automation.",
          "hint": "Label each system."
        },
        {
          "id": "e2",
          "prompt": "Define what happens if a request is submitted twice.",
          "hint": "Avoid duplicated work."
        },
        {
          "id": "e3",
          "prompt": "Write a failure recovery checklist.",
          "hint": "Include logging and escalation."
        }
      ]
    }
  },
  {
    "id": "ai-agents",
    "title": "Build a Practical AI Agent",
    "description": "Create a tool-using support assistant with limits, human oversight, and logs.",
    "difficulty": "Advanced",
    "durationMin": 45,
    "thumbnail": "/covers/masterplan/ai-agents.svg",
    "reel": "",
    "muxPlaybackId": "",
    "tags": [
      "AI MasterPlan",
      "AI Agents"
    ],
    "sortOrder": 8,
    "lesson": {
      "chapters": [
        {
          "id": "c1",
          "title": "What makes an agent different?",
          "minutes": 15,
          "body": "An AI agent can decide which approved tools to call to complete a bounded task. Define goal, available tools, permissions, memory, and stopping conditions. It should never access private data or execute transactions outside authorized scope."
        },
        {
          "id": "c2",
          "title": "Connect knowledge and actions",
          "minutes": 15,
          "body": "Prototype an assistant that answers common questions from approved documentation and can create a draft support ticket. Keep ticket submission behind a human-confirmed action. Save an audit trail without exposing secrets."
        },
        {
          "id": "c3",
          "title": "Test your agent like a product",
          "minutes": 15,
          "body": "Run scenarios for normal requests, ambiguity, malicious instructions, missing records, and human takeover. Measure accuracy, latency, and failed tool calls. Start narrow and expand only when the results are consistent."
        }
      ],
      "exercises": [
        {
          "id": "e1",
          "prompt": "Write an agent specification: goal, tools, limits, handoff.",
          "hint": "Be precise about permissions."
        },
        {
          "id": "e2",
          "prompt": "List five test conversations.",
          "hint": "Include an out-of-scope request."
        },
        {
          "id": "e3",
          "prompt": "Define when a human must take control.",
          "hint": "Safety and service quality."
        }
      ]
    }
  },
  {
    "id": "capstone-launch",
    "title": "Capstone: Build, Test, and Deploy",
    "description": "Put the entire AI MasterPlan workflow into one working project.",
    "difficulty": "Advanced",
    "durationMin": 50,
    "thumbnail": "/covers/masterplan/capstone-launch.svg",
    "reel": "",
    "muxPlaybackId": "",
    "tags": [
      "AI MasterPlan",
      "Capstone"
    ],
    "sortOrder": 9,
    "lesson": {
      "chapters": [
        {
          "id": "c1",
          "title": "Choose one achievable product",
          "minutes": 17,
          "body": "Build either a booking portal, support assistant, or a simple operations dashboard. Define users, screens, schema, integrations, and done criteria. A completed small project is better than a stalled ambitious system."
        },
        {
          "id": "c2",
          "title": "Quality check and deployment",
          "minutes": 17,
          "body": "Test real flows, mobile WebView behavior, server validation, access control, responsive layout, and failure states. Configure environment variables through the deployment provider, never inside frontend source. Deploy to a preview URL before production."
        },
        {
          "id": "c3",
          "title": "Present your working outcome",
          "minutes": 16,
          "body": "Prepare a short demo: the original problem, what the app does, how to use it, how you tested it, and what still needs improvement. Save the code, checklist, and lessons learned as a portfolio-ready case study."
        }
      ],
      "exercises": [
        {
          "id": "e1",
          "prompt": "Build a working capstone with at least one saved record.",
          "hint": "Demonstrate the end-to-end flow."
        },
        {
          "id": "e2",
          "prompt": "Perform a mobile and desktop acceptance test.",
          "hint": "Use real interactions."
        },
        {
          "id": "e3",
          "prompt": "Write a short project walkthrough.",
          "hint": "Explain the problem, solution, and constraints."
        }
      ]
    }
  }
];
