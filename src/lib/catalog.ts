import type { Lesson, TutorialCard } from "@/lib/types";

export type CatalogTutorial = TutorialCard & { lesson: Lesson };

const lesson = (
  chapters: Lesson["chapters"],
  exercises: Lesson["exercises"],
): Lesson => ({ chapters, exercises });

export const CATALOG_VERSION = 2;

export const CATALOG: CatalogTutorial[] = [
  {
    id: "projects",
    title: "How to use ChatGPT Projects",
    description: "Set up ChatGPT Projects so the same instructions and files are there every morning.",
    difficulty: "Start",
    durationMin: 22,
    thumbnail: "/covers/projects.jpg",
    reel: "/reels/projects.mp4",
    muxPlaybackId: "",
    tags: ["ChatGPT", "Setup"],
    sortOrder: 0,
    lesson: lesson(
      [
        {
          id: "c1",
          title: "Create the project",
          minutes: 7,
          body: "Open ChatGPT and choose Projects in the sidebar, then New project. Name it the way you would search for it later: the client, the job, and the result, such as 'Northwind weekly brief'. Open Project settings and write custom instructions in three lines. Line one: who the reader is. Line two: what the model must not invent, such as prices, dates, or quotes. Line three: the shape of a finished answer, such as 'five bullets, then one question for me'. Claude Projects uses the same idea under Projects if you work there instead. If you cannot write those three lines, you are not ready to save the chat.",
        },
        {
          id: "c2",
          title: "Add only the files that matter",
          minutes: 8,
          body: "In the project, use Add files. Upload the source of truth: a style guide, a price list, last month's brief. Skip old archives you would not hand a new hire. Start a chat inside that project, not a blank chat, so the instructions stay attached. Ask a question you already know the answer to. If the reply misses the file, the file is too long. Split it into a shorter document and upload that. Do not pile on more instructions to hide a bad file.",
        },
        {
          id: "c3",
          title: "Save one prompt you can reuse",
          minutes: 7,
          body: "Pin a starter message at the top of the project chat. It should say the job, the inputs you will paste, and the output format. Tomorrow, paste new notes under that same message. You should get the same shape back. That repeat is the reason to use Projects instead of a fresh chat. If the second day drifts, tighten the third instruction line before you add tools or GPTs.",
        },
      ],
      [
        { id: "e1", prompt: "Write the three custom-instruction lines for a real ChatGPT Project.", hint: "Reader, what not to invent, finished shape." },
        { id: "e2", prompt: "Name two files you would upload, and one you would leave out.", hint: "Leave out anything you would not hand a new hire." },
        { id: "e3", prompt: "Draft the reusable starter message in under 80 words.", hint: "Job, inputs, output format." },
      ],
    ),
  },
  {
    id: "cursor",
    title: "How to use Cursor",
    description: "Install Cursor, write one rule, and make the editor follow it on the next edit.",
    difficulty: "Intermediate",
    durationMin: 26,
    thumbnail: "/covers/cursor.jpg",
    reel: "/reels/cursor.mp4",
    muxPlaybackId: "",
    tags: ["Cursor", "Coding"],
    sortOrder: 1,
    lesson: lesson(
      [
        {
          id: "c1",
          title: "Open the project and the rules file",
          minutes: 8,
          body: "Install Cursor from cursor.com and open the folder you actually work in with File, then Open Folder. Cursor reads rules from .cursor/rules in that folder. Create one rule file for one mistake you keep repeating. Write three lines: the bad pattern, the good pattern, and the folders it applies to. A rule that describes your whole taste gets ignored. A rule that forbids one concrete thing gets followed. Use Chat in the side pane only after the rule file is saved.",
        },
        {
          id: "c2",
          title: "Ask for a small edit",
          minutes: 9,
          body: "Select the function that went wrong last time. Press Cmd-K or Ctrl-K and ask for one change, not a rewrite of the app. Name the file and the behavior you want. If the edit touches tests and app code for no reason, reject it and narrow the selection. Put shared rules in .cursor/rules at the root. Put a rule that only the tests care about in a rule whose globs match the test folder. If two rules disagree, delete one today.",
        },
        {
          id: "c3",
          title: "Check that the rule fired",
          minutes: 9,
          body: "Ask Cursor to do the task that used to go wrong. If it misses, the rule has no example. Paste a six-line before-and-after from your own code into the rule file and ask again. Do not switch models until the example is in the file. Agent mode can edit many files. Use it only when the single-file edit already followed the rule. Rules without an example are wishes.",
        },
      ],
      [
        { id: "e1", prompt: "Turn one review comment into a three-line Cursor rule.", hint: "Bad pattern, good pattern, where it applies." },
        { id: "e2", prompt: "Say whether that rule is global or limited to one folder.", hint: "If only tests care, do not make it global." },
        { id: "e3", prompt: "Add a six-line before-and-after from your code.", hint: "Your code, not a toy." },
      ],
    ),
  },
  {
    id: "n8n",
    title: "How to use n8n with an AI node",
    description: "Build one n8n workflow: a trigger, an OpenAI or Claude step, and a human approve button.",
    difficulty: "Intermediate",
    durationMin: 30,
    thumbnail: "/covers/n8n.jpg",
    reel: "/reels/n8n.mp4",
    muxPlaybackId: "",
    tags: ["n8n", "Automation"],
    sortOrder: 2,
    lesson: lesson(
      [
        {
          id: "c1",
          title: "Start a workflow from one inbox",
          minutes: 10,
          body: "In n8n, create a workflow and add the trigger you really have: Gmail Trigger, or a Webhook if a form posts in. Do not add five apps. On paper, write the path: trigger, classify, draft, stop. The stop is the product. Add a Gmail or Slack node that sends the draft to you, not to the customer. A draft that sends itself will embarrass you once, and then you will turn the workflow off.",
        },
        {
          id: "c2",
          title: "Classify before you draft",
          minutes: 10,
          body: "Add an OpenAI node, or an HTTP Request node to the Claude API. The first prompt only returns one label: billing, scheduling, noise, or needs-a-human. Add an IF or Switch node on that label. Only billing and scheduling continue to a second AI node that writes a draft. Noise goes to an archive step. Needs-a-human stops. Constraining the labels is what keeps the workflow small enough to trust. Put 'do not invent prices or dates' in the draft prompt, and tell it to leave a blank when the email did not say.",
        },
        {
          id: "c3",
          title: "Approve, then log the miss",
          minutes: 10,
          body: "The last step before anything is sent to a customer is a manual check: you read the draft in Slack or email and you send it yourself. Every time you rewrite a draft, paste the original and your edit into a note. After ten, add the repeated fix to the system prompt on the AI node. Turn the workflow Active only after three real messages pass the check. Automation that never eats its corrections just gets louder.",
        },
      ],
      [
        { id: "e1", prompt: "Name the n8n trigger and the two labels allowed to draft.", hint: "Everything else waits for you." },
        { id: "e2", prompt: "Write who reads the draft, and in which app.", hint: "If nobody is named, it will auto-send." },
        { id: "e3", prompt: "Write the system line that forbids invented prices or dates.", hint: "Say what to do instead: leave a blank." },
      ],
    ),
  },
  {
    id: "ollama",
    title: "How to use Ollama",
    description: "Install Ollama, pull a small model, and call it from the terminal and a short script.",
    difficulty: "Start",
    durationMin: 24,
    thumbnail: "/covers/ollama.jpg",
    reel: "/reels/ollama.mp4",
    muxPlaybackId: "",
    tags: ["Ollama", "Local"],
    sortOrder: 3,
    lesson: lesson(
      [
        {
          id: "c1",
          title: "Install it and pull one model",
          minutes: 8,
          body: "Download Ollama from ollama.com and install it. In the terminal, run ollama pull llama3.2, or another small model that answers on your machine in a few seconds. Do not start with the largest file you can download. Write down the exact name from ollama list. 'The local one' is how you lose a week. Run ollama run llama3.2 and ask one question so you know the app is awake. This loop needs no ChatGPT account. The model stays on your computer.",
        },
        {
          id: "c2",
          title: "Call the local API",
          minutes: 8,
          body: "Ollama listens at http://localhost:11434. From the terminal, POST a JSON prompt to /api/generate with the model name and stream set to false. Then send the same request from a ten-line script in Python or Node. Print the status and the text field. If you wrap it in a framework today, you will not know which layer failed tomorrow. Keep the script boring: input, request, print.",
        },
        {
          id: "c3",
          title: "Know when to leave the machine",
          minutes: 8,
          body: "Use Ollama for drafts, sorting, and anything you cannot send to ChatGPT or Claude. It is the wrong tool when you need today's news or a long, careful document. Write that limit as a comment at the top of the script. When the task crosses the limit, call a hosted model on purpose instead of hoping a bigger local download will fix it.",
        },
      ],
      [
        { id: "e1", prompt: "Write the exact ollama pull command you would run, and why that model is small enough.", hint: "Seconds, not a slideshow." },
        { id: "e2", prompt: "Sketch the ten-line script: input, request, print.", hint: "No framework. localhost:11434." },
        { id: "e3", prompt: "Write the comment that says what this model must not do.", hint: "Fresh facts, or a finished long document." },
      ],
    ),
  },
  {
    id: "evals",
    title: "How to test a prompt before you trust it",
    description: "Score twenty real examples in a sheet, then rerun them in ChatGPT or Claude.",
    difficulty: "Advanced",
    durationMin: 28,
    thumbnail: "/covers/evals.jpg",
    reel: "/reels/evals.mp4",
    muxPlaybackId: "",
    tags: ["ChatGPT", "Quality"],
    sortOrder: 4,
    lesson: lesson(
      [
        {
          id: "c1",
          title: "Build the sheet from real misses",
          minutes: 9,
          body: "Open a spreadsheet. Make columns: input, wanted answer, model answer, facts, format, usable. Collect twenty real inputs from the last month, ten that went well and ten that cost you time. Do not invent clever cases. Paste each input into ChatGPT or Claude with the prompt you want to judge, and paste the reply into model answer. Twenty rows is a test. Five rows is a vibe.",
        },
        {
          id: "c2",
          title: "Score with three yes or no checks",
          minutes: 10,
          body: "For each row, type 0 or 1 in three columns. Facts: it used only what you gave. Format: it matched the shape you asked for. Usable: a colleague would send it without a rewrite. Average the three. Do not use a ten-point scale. You cannot explain the difference between a 6 and a 7, and the sheet will lie to you. The tool is the spreadsheet. The model is only the thing being scored.",
        },
        {
          id: "c3",
          title: "Change one line and rerun",
          minutes: 9,
          body: "Edit one line of the prompt. Run the same twenty inputs again in a new chat so old memory does not help. If the average does not move, the edit was taste, not a fix. Keep the winner, date it in the sheet, and delete the loser. A test you do not compare is a diary. When the score is stable, then you can paste that prompt into a Project or an n8n node.",
        },
      ],
      [
        { id: "e1", prompt: "Write five real rows: the input, and the answer you wanted.", hint: "Use misses from this month." },
        { id: "e2", prompt: "Write your three yes or no checks.", hint: "Facts, format, usable without a rewrite." },
        { id: "e3", prompt: "Name the single prompt line you would change first.", hint: "One line, then rerun the same rows." },
      ],
    ),
  },
  {
    id: "rag",
    title: "How to use NotebookLM",
    description: "Load your own sources into NotebookLM and make it cite them or say it does not know.",
    difficulty: "Intermediate",
    durationMin: 32,
    thumbnail: "/covers/rag.jpg",
    reel: "/reels/rag.mp4",
    muxPlaybackId: "",
    tags: ["NotebookLM", "Search"],
    sortOrder: 5,
    lesson: lesson(
      [
        {
          id: "c1",
          title: "Add sources, not a dump",
          minutes: 10,
          body: "Open NotebookLM and create a notebook for one job. Use the Add source button for the files a person would actually read: the brief, the policy, the price sheet. Google Docs, PDFs, and copied text all work. Do not upload every archive you have. If a document covers two topics, split it before you upload so the citations stay on one subject. The notebook can only know what you added.",
        },
        {
          id: "c2",
          title: "Ask, then open the citation",
          minutes: 12,
          body: "Ask a question in the chat. NotebookLM attaches citations to the answer. Click each citation and check that the sentence really says what the answer claims. If you cannot find the sentence, the answer is a guess. Write your own replies the same way when you leave NotebookLM: passage first, answer second, so someone else can check in five seconds. The Audio Overview is a recap, not a source. Do not quote it as the file.",
        },
        {
          id: "c3",
          title: "Make it stay quiet",
          minutes: 10,
          body: "Ask a question you know is not in the sources. A correct notebook says it cannot find that, or answers only from a weak citation you can reject. If it invents a price, a date, or a policy, narrow the sources and ask again with the line: 'If the sources do not say, answer: not in the files.' A tool that cannot say nothing will eventually invent. When you need the same behavior in your own app, this is the test to copy: retrieve, show the sentence, or stay quiet.",
        },
      ],
      [
        { id: "e1", prompt: "List the three sources you would add to one NotebookLM notebook.", hint: "One job. No archives." },
        { id: "e2", prompt: "Write a question whose citation you could check in five seconds.", hint: "Passage first, answer second." },
        { id: "e3", prompt: "Write a question that should return 'not in the files.'", hint: "Pick a fact you know is absent." },
      ],
    ),
  },
  {
    id: "product",
    title: "How to make product images in ChatGPT",
    description: "Use ChatGPT image generation for one object, one light, and a set you would actually post.",
    difficulty: "Start",
    durationMin: 20,
    thumbnail: "/covers/product.jpg",
    reel: "/reels/product.mp4",
    muxPlaybackId: "",
    tags: ["ChatGPT", "Images"],
    sortOrder: 6,
    lesson: lesson(
      [
        {
          id: "c1",
          title: "Describe the object so it cannot wander",
          minutes: 6,
          body: "In ChatGPT, start a new chat and ask for an image. Describe the object as if you were insuring it: material, color, proportion, and what it is not. 'A cup' will change shape every frame. 'A matte stoneware cup, low and wide, no logo, no text' will stay. Generate one image. If the object changes, tighten those words before you chase lighting. Gemini's image tool takes the same kind of description if you are working there. Do not switch tools until one description holds still.",
        },
        {
          id: "c2",
          title: "Keep one light and change the angle",
          minutes: 7,
          body: "Pick a single light and repeat it in every prompt: hard light from the left, or a soft window from the right. Change only the angle and the crop. Say that in the prompt: 'same cup, same light, three-quarter view'. Ten frames with ten moods look like a stock site. Ten frames with one light look like one brand. If ChatGPT drifts, reply on the same image with 'keep the object, only change the camera'. Starting a fresh chat starts a fresh object.",
        },
        {
          id: "c3",
          title: "Reject before you post",
          minutes: 7,
          body: "Throw out extra objects, warped edges, and any text you did not ask for. Do not hide a bad frame in the caption. The set is the frames you would print. Three clean frames beat twelve almosts. Download the keepers from the chat. If you need type on the image, add it later in a normal editor. Image models still misspell words.",
        },
      ],
      [
        { id: "e1", prompt: "Write the insurance description of an object you sell or use.", hint: "Material, color, proportion, no logo, no text." },
        { id: "e2", prompt: "Name the one light in a sentence you can paste into ChatGPT.", hint: "Direction and hardness. Same object." },
        { id: "e3", prompt: "List the three reject rules you will enforce before posting.", hint: "Extra objects, warped edges, stray text." },
      ],
    ),
  },
  {
    id: "voice",
    title: "How to use ChatGPT voice",
    description: "Turn on voice mode, keep one question at a time, and hand off anything that should not be spoken.",
    difficulty: "Intermediate",
    durationMin: 27,
    thumbnail: "/covers/voice.jpg",
    reel: "/reels/voice.mp4",
    muxPlaybackId: "",
    tags: ["ChatGPT", "Voice"],
    sortOrder: 7,
    lesson: lesson(
      [
        {
          id: "c1",
          title: "Write the first twenty seconds",
          minutes: 9,
          body: "Before you tap the voice icon in the ChatGPT app, write the opening as lines, not as a personality. Who you are, why this session exists, and the one question that moves the task forward. Example: 'You are helping me outline today's tutorial. Ask which tool we are covering, then wait.' Paste that into the chat, then start voice. Read your lines out loud. If you run out of breath, the listener will stop. A backstory with no job just chatters.",
        },
        {
          id: "c2",
          title: "One question, then wait",
          minutes: 9,
          body: "Tell voice mode: ask one question, then stop talking. Do not stack questions. Do not fill silence with a second offer. Silence is the person thinking. If it talks over you, interrupt and repeat the rule. Tap the voice button again to end the session when the task is done. You can use the same rule later in a phone agent such as Vapi or ElevenLabs, but learn the pause here first, where you can stop it with a thumb.",
        },
        {
          id: "c3",
          title: "Hand off what should not be spoken",
          minutes: 9,
          body: "Payments, medical detail, and anything the person must compare should not be spoken at them. Say so in the instructions: offer to write it in the chat, or tell them to talk to a person. Practice one of those exits out loud before you pick a fancier voice. A pleasant voice on the wrong task is still the wrong task. When the spoken answer matters, copy it into the text thread so you can check it.",
        },
      ],
      [
        { id: "e1", prompt: "Write the first twenty seconds as lines you can read aloud.", hint: "Who, why, one question." },
        { id: "e2", prompt: "Write the instruction: one question, then wait.", hint: "No second offer." },
        { id: "e3", prompt: "Name two topics this voice session must hand back to text or a person.", hint: "If they must compare it, don't speak it." },
      ],
    ),
  },
];
