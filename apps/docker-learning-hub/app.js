const LMS_STORAGE_KEY = "docker-learning-hub-state";
const TOTAL_LESSONS = 30;

function isLessonPagePathname(pathname = window.location.pathname) {
  return /\/lessons\/lesson-\d+\.html$/.test(pathname);
}

function rootHref(fileName) {
  return `${isLessonPagePathname() ? "../" : "./"}${fileName}`;
}

function lessonHref(number) {
  return isLessonPagePathname() ? `./lesson-${number}.html` : `./lessons/lesson-${number}.html`;
}

function hrefTargetsFile(href, fileName) {
  return href === fileName || href === `./${fileName}` || href === `../${fileName}` || href.endsWith(`/${fileName}`);
}

const PHASES = [
  {
    id: "phase-1a",
    title: "Phase 1: Beginner Foundation",
    shortTitle: "Beginner Foundation",
    start: 1,
    end: 5,
    nextLesson: 6,
    celebrationTitle: "Beginner foundation complete",
    celebrationBody: "You built the basic Docker mental model. Now you are ready to move into real workflow lessons."
  },
  {
    id: "phase-1b",
    title: "Phase 1 Continued: Core Workflow",
    shortTitle: "Core Workflow",
    start: 6,
    end: 10,
    nextLesson: 11,
    celebrationTitle: "Core workflow complete",
    celebrationBody: "You now understand multi-container flow, configuration, debugging, and readiness. The next level is stronger intermediate Docker practice."
  },
  {
    id: "phase-2",
    title: "Phase 2: Strong Intermediate Level",
    shortTitle: "Strong Intermediate",
    start: 11,
    end: 17,
    nextLesson: 18,
    celebrationTitle: "Phase 2 complete",
    celebrationBody: "You upgraded from basic usage into cleaner images, better Dockerfiles, and stronger production thinking."
  },
  {
    id: "phase-3",
    title: "Phase 3: Advanced Practical Learning",
    shortTitle: "Advanced Practical",
    start: 18,
    end: 25,
    nextLesson: 26,
    celebrationTitle: "Phase 3 complete",
    celebrationBody: "You now understand Docker in deployments, full-stack systems, CI/CD, monitoring, and team workflows."
  },
  {
    id: "phase-4",
    title: "Phase 4: Beyond Docker Basics",
    shortTitle: "Beyond Basics",
    start: 26,
    end: 30,
    nextLesson: null,
    celebrationTitle: "Roadmap complete",
    celebrationBody: "You finished the current roadmap and reached architecture-level Docker learning. This is a strong base for deeper platform work."
  }
];

function makeLesson(number, phaseId, title, educatorNote, realWorld, outcomes, checkpoint) {
  return {
    number,
    phaseId,
    title,
    href: lessonHref(number),
    educatorNote,
    realWorld,
    outcomes,
    checkpoint
  };
}

const LESSONS = [
  makeLesson(
    1,
    "phase-1a",
    "Docker basics",
    "This lesson matters because weak Docker understanding usually creates command memorization without confidence. If the basic mental model is clear, later topics become much easier.",
    "A real team often adopts Docker because one laptop has one setup, another laptop has a different setup, and the server has a third setup. Docker reduces that mismatch.",
    [
      "Explain Docker in plain language without using too much jargon.",
      "Describe the difference between an image and a container.",
      "Explain why isolation and repeatability matter."
    ],
    [
      "Can you explain Docker using a simple analogy like a box, recipe, or lunch kit?",
      "Can you explain why 'it works on my machine' happens?",
      "Can you describe what port mapping does in one sentence?"
    ]
  ),
  makeLesson(
    2,
    "phase-1a",
    "Images, containers, and Dockerfile",
    "This lesson turns Docker from a broad concept into a concrete build flow. Most later Docker work depends on understanding these three pieces together.",
    "When a teammate says 'rebuild the image and run the container again', this lesson explains exactly what that sentence means.",
    [
      "Differentiate image, container, and Dockerfile clearly.",
      "Explain the container lifecycle from created to removed.",
      "Describe what build-time versus run-time means."
    ],
    [
      "Can you explain why deleting a container does not delete the image?",
      "Can you describe the role of `FROM`, `RUN`, and `CMD`?",
      "Can you say what `docker build` creates and what `docker run` starts?"
    ]
  ),
  makeLesson(
    3,
    "phase-1a",
    "Build your first real Dockerized app",
    "This lesson is where Docker becomes practical. Instead of definitions, you learn the full path from app files to a running container.",
    "In real work, this is the skill that lets you move a small service from source code into a shareable runtime unit.",
    [
      "Build a simple image from a Dockerfile.",
      "Run a real application in a container.",
      "Verify that the containerized app works from the browser."
    ],
    [
      "Can you explain what each app file does in the sample project?",
      "Can you describe why `EXPOSE` and `-p` are not the same thing?",
      "Can you explain the end-to-end flow from source to running app?"
    ]
  ),
  makeLesson(
    4,
    "phase-1a",
    "Volumes and persistent data",
    "This lesson fixes one of the most important beginner misunderstandings: containers are replaceable, but important data should not disappear with them.",
    "Databases, uploaded files, reports, and generated content usually need persistence outside the container's temporary writable layer.",
    [
      "Explain why volumes exist.",
      "Describe named volumes in simple terms.",
      "Understand why persistence matters for app data."
    ],
    [
      "Can you explain what happens to data if a container is removed without a volume?",
      "Can you tell the difference between container storage and a named volume?",
      "Can you name two real services that should usually use volumes?"
    ]
  ),
  makeLesson(
    5,
    "phase-1a",
    "Networks and container communication",
    "This lesson connects isolated containers into a useful system. Once containers must talk to each other, networking becomes essential.",
    "Most real Docker projects have at least an application service and a database service, which means service-to-service communication matters immediately.",
    [
      "Explain what Docker networks do.",
      "Use service or container names instead of `localhost` between containers.",
      "Differentiate host-to-container access from container-to-container communication."
    ],
    [
      "Can you explain why `localhost` inside a container often causes confusion?",
      "Can you explain what `docker network create` is used for?",
      "Can you describe the difference between `-p` and shared networking?"
    ]
  ),
  makeLesson(
    6,
    "phase-1b",
    "Docker Compose",
    "This lesson is the first real productivity jump because it stops long multi-command setups from being repeated manually all the time.",
    "Compose becomes extremely useful the moment a project has an app, a database, and maybe one or two more supporting services.",
    [
      "Explain what Compose solves.",
      "Read a beginner Compose file with confidence.",
      "Understand why services, ports, and volumes belong in one shared definition."
    ],
    [
      "Can you say what `docker compose up` and `docker compose down` do?",
      "Can you explain why service names matter in Compose setups?",
      "Can you explain what `depends_on` helps with and what it does not guarantee?"
    ]
  ),
  makeLesson(
    7,
    "phase-1b",
    "Environment variables and configuration",
    "This lesson teaches one of the most important software habits: separating code from configuration.",
    "The same app often needs different database hosts, API keys, or runtime modes in development, testing, and production.",
    [
      "Explain what environment variables are.",
      "Use Compose and app code to read configuration cleanly.",
      "Understand the role of `.env` files in local setups."
    ],
    [
      "Can you describe why hardcoding config creates problems?",
      "Can you explain the difference between `${PORT}` in Compose and `process.env.PORT` in app code?",
      "Can you explain why secrets in `.env` files still need care?"
    ]
  ),
  makeLesson(
    8,
    "phase-1b",
    "Build a small real Docker project",
    "This lesson is where the earlier pieces begin working together as one system instead of separate topics.",
    "A real beginner project usually has several moving parts at once: app code, Dockerfile, Compose, environment variables, and persistent storage.",
    [
      "Describe the role of each file in a small Dockerized project.",
      "Connect app configuration, service names, and persistence together.",
      "Understand why Compose becomes the central project entry point."
    ],
    [
      "Can you explain the purpose of `Dockerfile`, `.env`, and `compose.yaml` together?",
      "Can you describe why the database needs a volume?",
      "Can you explain how the app learns the database host?"
    ]
  ),
  makeLesson(
    9,
    "phase-1b",
    "Docker debugging and troubleshooting",
    "This lesson is important because real confidence comes from recovering when things break, not only from copying successful commands.",
    "Most Docker problems repeat: wrong ports, wrong hosts, missing files, missing rebuilds, or crashed startup commands.",
    [
      "Use logs, inspection, and shell access to understand failures.",
      "Follow a simple debugging order instead of guessing.",
      "Recognize the most common beginner failure patterns."
    ],
    [
      "If a container exits immediately, do you know the first two commands to run?",
      "Can you explain why app code changes may not show up until the image is rebuilt?",
      "Can you explain how to inspect files or env vars inside a running container?"
    ]
  ),
  makeLesson(
    10,
    "phase-1b",
    "Health checks and readiness",
    "This lesson introduces a real operations mindset: a container being 'running' does not guarantee the service is actually ready.",
    "Databases, APIs, and background services often need startup time, so readiness and health become important in more reliable environments.",
    [
      "Explain the difference between running and healthy.",
      "Understand the role of a health endpoint or check command.",
      "See why startup order alone is not enough."
    ],
    [
      "Can you explain why `depends_on` does not fully solve readiness?",
      "Can you describe what a `/health` endpoint is for?",
      "Can you explain what `interval`, `timeout`, and `retries` mean in a health check?"
    ]
  ),
  makeLesson(
    11,
    "phase-2",
    "Docker image optimization",
    "This lesson upgrades your mindset from 'it runs' to 'it runs efficiently'. That shift matters in teams, CI/CD, and production delivery.",
    "When images are pulled repeatedly in pipelines or across environments, size and build speed become very noticeable costs.",
    [
      "Explain why image size and caching matter.",
      "Use `.dockerignore` and instruction order more intentionally.",
      "Understand why smaller base images can help."
    ],
    [
      "Can you explain why `COPY . .` is often too broad?",
      "Can you explain why dependency files are often copied before source files?",
      "Can you explain how optimization improves team workflows too?"
    ]
  ),
  makeLesson(
    12,
    "phase-2",
    "Dockerfile best practices",
    "This lesson is about writing Dockerfiles that other developers can trust, read, and maintain without confusion.",
    "A good Dockerfile becomes part of project documentation because it explains how the application is built and started.",
    [
      "Use clearer base image choices and stable versioning.",
      "Separate build-time and run-time instructions cleanly.",
      "Write Dockerfiles that stay readable under team use."
    ],
    [
      "Can you explain why `latest` is often a weak long-term choice?",
      "Can you explain why `WORKDIR` improves readability?",
      "Can you explain the difference between a weak Dockerfile and a stronger one?"
    ]
  ),
  makeLesson(
    13,
    "phase-2",
    "Bind mounts vs volumes",
    "This lesson prevents a very common storage confusion that shows up in development and deployment decisions.",
    "Teams often use bind mounts for local iteration and named volumes for persistent service data, especially databases.",
    [
      "Explain the difference between host-managed and Docker-managed storage.",
      "Choose a storage style based on development or persistence needs.",
      "Recognize the risks of bind mounts hiding in-container files."
    ],
    [
      "Can you tell a bind mount from a volume just by reading the left side of `-v`?",
      "Can you explain why bind mounts are good for local code changes?",
      "Can you explain why volumes are usually cleaner for service persistence?"
    ]
  ),
  makeLesson(
    14,
    "phase-2",
    "Multi-stage builds",
    "This lesson introduces one of the most useful production-oriented Docker techniques: separating building from running.",
    "Applications often need heavy tools during build time, but those tools should not stay inside the final runtime image.",
    [
      "Explain what multiple `FROM` lines mean.",
      "Understand why builder and runtime stages are different.",
      "Describe how multi-stage builds reduce final image clutter."
    ],
    [
      "Can you explain why build tools should usually stay out of runtime images?",
      "Can you describe what `COPY --from=builder` achieves?",
      "Can you explain why this pattern supports cleaner production images?"
    ]
  ),
  makeLesson(
    15,
    "phase-2",
    "Docker Hub and registries",
    "This lesson moves images beyond one laptop and into shared environments, which is necessary for real deployment and teamwork.",
    "Registries are what allow the exact same image to move from local development into servers and automated systems.",
    [
      "Explain what a container registry is.",
      "Understand build, tag, push, and pull flow.",
      "Recognize why tags matter for version clarity."
    ],
    [
      "Can you explain why a local image is not enough for deployment?",
      "Can you explain what `docker tag` adds to the workflow?",
      "Can you explain why relying only on `latest` creates confusion?"
    ]
  ),
  makeLesson(
    16,
    "phase-2",
    "Docker security basics",
    "This lesson gives you safer defaults early so security does not feel like a completely separate topic later.",
    "Smaller images, trusted bases, careful secret handling, and avoiding unnecessary root usage are practical habits that scale well.",
    [
      "Recognize that container isolation is not complete security by itself.",
      "Identify safer image and secret handling habits.",
      "Understand why smaller and cleaner images help security too."
    ],
    [
      "Can you explain why secrets should not be baked into images?",
      "Can you explain why trusted base images matter?",
      "Can you explain why non-root runtime users are often preferred?"
    ]
  ),
  makeLesson(
    17,
    "phase-2",
    "Development vs production setup",
    "This lesson teaches a mature Docker mindset: the most convenient local setup is not always the most appropriate production setup.",
    "Development and production serve different goals, so their Docker behavior should not be copied blindly from one to the other.",
    [
      "Explain the different priorities of dev and prod Docker.",
      "Recognize why bind mounts and live editing are development conveniences.",
      "Understand why production favors stable, fixed images."
    ],
    [
      "Can you explain why local code bind mounts are usually a development pattern?",
      "Can you explain why production values predictability over convenience?",
      "Can you explain one example of a dev shortcut that should be questioned in production?"
    ]
  ),
  makeLesson(
    18,
    "phase-3",
    "Deploying Docker apps",
    "This lesson moves Docker from 'something that runs locally' into 'something that serves real users somewhere else'.",
    "Deployment adds practical concerns like versioning, runtime config, storage, availability, and recoverability.",
    [
      "Describe the basic deployment flow from image build to server run.",
      "Understand why registries and tagging matter in deployment.",
      "Recognize why deployment is more than just `docker run`."
    ],
    [
      "Can you explain what extra decisions appear once the app leaves your laptop?",
      "Can you describe why restart behavior matters in deployed systems?",
      "Can you explain the role of a registry in deployment flow?"
    ]
  ),
  makeLesson(
    19,
    "phase-3",
    "Reverse proxy with Nginx",
    "This lesson introduces a public-entry-point mindset, where traffic is managed before it reaches individual application containers.",
    "Many real deployments need domain routing, HTTPS handling, path-based forwarding, or static file serving, and Nginx often handles those concerns.",
    [
      "Explain what a reverse proxy is.",
      "Understand why public and internal ports are often separated.",
      "Recognize where Nginx adds value beyond just forwarding requests."
    ],
    [
      "Can you explain why not every container should be exposed directly?",
      "Can you explain what Nginx does with `/api` style routing?",
      "Can you explain why Nginx often handles HTTPS instead of the app itself?"
    ]
  ),
  makeLesson(
    20,
    "phase-3",
    "Dockerizing full stack applications",
    "This lesson turns Docker into a system design tool by showing how multiple services work together in one application.",
    "Real apps usually have a frontend, backend, database, and sometimes a proxy or cache, so Docker must coordinate several roles at once.",
    [
      "Describe the role of frontend, backend, and database containers.",
      "Understand why Compose becomes central in multi-service apps.",
      "Connect networking, environment variables, and persistence in one architecture."
    ],
    [
      "Can you explain why splitting services is often cleaner than one giant container?",
      "Can you explain how frontend and backend communication differs from backend and database communication?",
      "Can you explain which earlier Docker lessons become especially important in a full stack setup?"
    ]
  ),
  makeLesson(
    21,
    "phase-3",
    "Working with databases in Docker",
    "This lesson gives databases the special attention they deserve, because data lifecycle is often more sensitive than app container lifecycle.",
    "Databases bring persistence, readiness, migration, and backup concerns that are easy to underestimate if you treat them like simple stateless apps.",
    [
      "Explain why database containers need stronger storage planning.",
      "Differentiate a volume from a backup strategy.",
      "Understand why migrations and readiness matter in database flows."
    ],
    [
      "Can you explain why deleting and recreating a DB container is more serious than recreating a web app container?",
      "Can you explain why a volume is not automatically a backup?",
      "Can you explain why backend services often fail if the database is not ready yet?"
    ]
  ),
  makeLesson(
    22,
    "phase-3",
    "CI/CD with Docker",
    "This lesson connects Docker to professional delivery pipelines, where builds, tests, pushes, and deployments are automated.",
    "Docker works very well in CI/CD because it creates a consistent build artifact that can be tested and deployed repeatedly.",
    [
      "Explain how Docker fits into CI pipelines.",
      "Explain how Docker fits into CD pipelines.",
      "Understand why one tested artifact is better than rebuilding differently at deployment time."
    ],
    [
      "Can you explain why testing one image and deploying another is risky?",
      "Can you explain why tagging matters in pipeline flow?",
      "Can you explain how Docker improves repeatability in automation?"
    ]
  ),
  makeLesson(
    23,
    "phase-3",
    "Monitoring and logs",
    "This lesson introduces the operational truth that a running service is not the same as an understood service.",
    "Once users depend on the application, logs and monitoring become necessary for trust, diagnosis, and performance awareness.",
    [
      "Explain the difference between logs and monitoring.",
      "Understand what kinds of questions each helps answer.",
      "Recognize why runtime visibility is part of deployment quality."
    ],
    [
      "Can you explain what logs tell you that uptime alone does not?",
      "Can you explain what monitoring reveals over time?",
      "Can you explain why guesswork is dangerous after deployment?"
    ]
  ),
  makeLesson(
    24,
    "phase-3",
    "Docker Compose advanced patterns",
    "This lesson shows how simple Compose setups evolve into more structured project systems once complexity increases.",
    "As services grow and environments differ, YAML organization becomes a maintainability issue, not just a syntax issue.",
    [
      "Explain why a single simple Compose file can become hard to manage later.",
      "Understand the idea of environment-specific Compose structure.",
      "Recognize when reuse and deduplication start mattering."
    ],
    [
      "Can you explain why duplication becomes a Compose problem in larger projects?",
      "Can you explain why dev and prod often need different Compose behavior?",
      "Can you explain what 'advanced Compose' is really trying to improve?"
    ]
  ),
  makeLesson(
    25,
    "phase-3",
    "Docker in team projects",
    "This lesson reframes Docker as a collaboration tool, not only a runtime tool.",
    "In shared projects, Docker reduces setup mismatch, shortens onboarding, and makes workflows more predictable when it is structured well.",
    [
      "Explain why consistency matters more in team environments.",
      "Recognize how Docker helps onboarding and shared expectations.",
      "Identify the difference between 'Docker exists in the repo' and 'Docker is helping the team'."
    ],
    [
      "Can you explain how Docker reduces environment mismatch between developers?",
      "Can you explain what team-level conventions matter around naming and commands?",
      "Can you explain why documentation still matters even when Docker is used?"
    ]
  ),
  makeLesson(
    26,
    "phase-4",
    "Introduction to Kubernetes",
    "This lesson opens the door to orchestration by explaining why Docker knowledge eventually grows into platform-level management needs.",
    "Teams usually reach Kubernetes after they need more than one host, more than manual restarts, and more than hand-managed scaling.",
    [
      "Explain the difference between container runtime concerns and orchestration concerns.",
      "Understand why Kubernetes appears after strong Docker basics.",
      "Describe the high-level problem Kubernetes tries to solve."
    ],
    [
      "Can you explain why Kubernetes is not a replacement for Docker fundamentals?",
      "Can you explain why orchestration becomes relevant only after system complexity grows?",
      "Can you explain the simple difference between packaging and orchestration?"
    ]
  ),
  makeLesson(
    27,
    "phase-4",
    "Scaling containers",
    "This lesson teaches the next operational leap: one working container is not always enough for reliability or demand.",
    "Traffic spikes, availability needs, and update strategies all become easier to reason about once replicas enter the picture.",
    [
      "Explain what scaling means in a container environment.",
      "Understand why stateless services are easier to scale.",
      "Recognize the relationship between replicas, traffic routing, and shared state."
    ],
    [
      "Can you explain why scaling is more than starting extra copies?",
      "Can you explain one problem stateful apps introduce during scaling?",
      "Can you explain why load balancing matters when replicas exist?"
    ]
  ),
  makeLesson(
    28,
    "phase-4",
    "Container orchestration concepts",
    "This lesson introduces the core ideas that make large container systems manageable: desired state, recovery, scheduling, and stable service identity.",
    "These are the concepts that make platform tools feel less magical and more understandable.",
    [
      "Explain desired state in simple terms.",
      "Understand why scheduling and service discovery matter.",
      "Recognize that orchestration is continuous system management, not a one-time command."
    ],
    [
      "Can you explain why a scheduler exists?",
      "Can you explain what service discovery solves?",
      "Can you explain what recovery means in an orchestrated system?"
    ]
  ),
  makeLesson(
    29,
    "phase-4",
    "Production security and hardening",
    "This lesson strengthens your security mindset by treating production as an environment that deserves stricter control than local development.",
    "Hardening becomes real when you ask not only 'can this run?' but also 'how much power and exposure should this runtime have?'",
    [
      "Explain least privilege in a container context.",
      "Recognize why secret handling and runtime permissions deserve special care.",
      "Understand how smaller runtime surfaces help security."
    ],
    [
      "Can you explain why production security is stricter than local convenience?",
      "Can you explain why extra packages can create extra risk?",
      "Can you explain one way hardening reduces attack surface?"
    ]
  ),
  makeLesson(
    30,
    "phase-4",
    "Real-world deployment architectures",
    "This final lesson connects everything into one systems view so Docker is seen as part of a broader architecture, not an isolated tool.",
    "Real deployments include routing, storage, security, automation, visibility, and sometimes orchestration all working together around containerized services.",
    [
      "Explain how Docker fits into a larger system picture.",
      "Connect packaging, deployment, monitoring, and scaling into one mental model.",
      "Recognize the shift from single-container thinking to architecture thinking."
    ],
    [
      "Can you explain where Docker sits relative to CI/CD, proxies, storage, and orchestration?",
      "Can you explain why real architectures involve more than one image and one server?",
      "Can you summarize the learning arc from code to system?"
    ]
  )
];

const LESSON_DETAIL_MAP = {
  1: {
    estimatedMinutes: "18-25 min",
    difficulty: "Absolute beginner",
    deepDive: "Docker is easiest to understand as a consistency tool. It takes the app, its runtime, and the important setup pieces, then packages them so the same thing can run on a laptop, another developer's machine, or a server with far fewer surprises.",
    lab: "Explain Docker to yourself using two analogies: one technical and one layman-friendly. Then write one sentence for image, one sentence for container, and one sentence for port mapping.",
    mistakes: ["Memorizing commands before understanding the image-container relationship.", "Thinking Docker is only for deployment and not useful in development.", "Confusing container isolation with a full virtual machine."],
    keyTerms: ["Container", "Image", "Isolation", "Port mapping"]
  },
  2: {
    estimatedMinutes: "20-28 min",
    difficulty: "Beginner",
    deepDive: "This lesson gives Docker its structure. The Dockerfile defines packaging steps, the image stores the reusable blueprint, and the container is the live running result. If these three ideas are clear, most Docker commands start making sense naturally.",
    lab: "Take one Dockerfile example and explain what each line changes in the build flow. Then describe what happens before and after `docker run`.",
    mistakes: ["Thinking the Dockerfile is the running app.", "Mixing up `RUN` and `CMD`.", "Assuming images disappear when containers are deleted."],
    keyTerms: ["Dockerfile", "Build", "Runtime", "Lifecycle"]
  },
  3: {
    estimatedMinutes: "25-35 min",
    difficulty: "Beginner",
    deepDive: "This is the first lesson where Docker stops feeling theoretical. You go from source files to a built image to a running application. That path is the foundation of almost every real Docker workflow.",
    lab: "Rebuild the sample app from scratch: create the app file, write the Dockerfile, build the image, run the container, and verify the output in the browser.",
    mistakes: ["Using the wrong container port in `-p` mapping.", "Forgetting to rebuild after changing the Dockerfile.", "Treating `EXPOSE` as if it automatically publishes the app to the host."],
    keyTerms: ["Build context", "EXPOSE", "Publish", "Container startup"]
  },
  4: {
    estimatedMinutes: "18-26 min",
    difficulty: "Beginner",
    deepDive: "Volumes matter because containers are meant to be replaceable. Important data should outlive a single container instance, especially for databases, uploads, and generated content.",
    lab: "Create a small volume, write a file from one container, remove the container, and verify the file still exists from another container using the same volume.",
    mistakes: ["Storing important data only in container-local storage.", "Thinking volumes are only for databases.", "Removing volumes without realizing that useful data may be deleted with them."],
    keyTerms: ["Persistent data", "Named volume", "Writable layer", "Data lifecycle"]
  },
  5: {
    estimatedMinutes: "18-28 min",
    difficulty: "Beginner",
    deepDive: "Networking is the step that turns separate containers into a system. Once services must communicate, host-to-container access and container-to-container access need to be understood as different flows.",
    lab: "Imagine an app container and a database container on the same network. Write down what host the app should use for the database and explain why `localhost` would be wrong inside the app container.",
    mistakes: ["Using `localhost` between different containers.", "Thinking `-p` creates service-to-service communication.", "Relying on temporary IP addresses instead of stable service names."],
    keyTerms: ["Bridge network", "Service name", "Host access", "Container communication"]
  },
  6: {
    estimatedMinutes: "20-30 min",
    difficulty: "Beginner to early intermediate",
    deepDive: "Compose turns several Docker concepts into one runnable project definition. Instead of remembering a long list of commands, you define services, ports, storage, and environment structure in one place.",
    lab: "Read a small Compose file and describe what each service depends on, which ports are exposed, and which storage or config values are attached.",
    mistakes: ["Treating Compose as only a convenience feature rather than a project definition tool.", "Using `localhost` inside service-to-service config when service names are the right host values.", "Assuming `depends_on` means the dependent service is fully ready."],
    keyTerms: ["Service", "Compose file", "depends_on", "Project definition"]
  },
  7: {
    estimatedMinutes: "18-28 min",
    difficulty: "Beginner to early intermediate",
    deepDive: "Environment variables separate code from environment-specific settings. That means the same app can behave differently in development, testing, and production without code changes.",
    lab: "Write three config values for a sample app such as `PORT`, `DB_HOST`, and `NODE_ENV`, then explain how Compose and app code would each use them.",
    mistakes: ["Hardcoding values directly in source code.", "Using the wrong variable name so app code never reads the intended config.", "Treating `.env` as automatically secure just because it is local."],
    keyTerms: ["Environment variable", ".env", "Interpolation", "Runtime config"]
  },
  8: {
    estimatedMinutes: "22-35 min",
    difficulty: "Beginner to early intermediate",
    deepDive: "This lesson is about integration. It shows that Docker becomes much more useful when multiple earlier lessons come together as one coherent project instead of isolated commands.",
    lab: "Take the sample project layout and explain the role of each file: Dockerfile, Compose file, environment file, and source files.",
    mistakes: ["Understanding files individually but not understanding the project flow as a whole.", "Forgetting how service names connect the app to the database.", "Ignoring storage when the project includes persistent data."],
    keyTerms: ["Project structure", "Service connection", "Config flow", "Persistence"]
  },
  9: {
    estimatedMinutes: "20-30 min",
    difficulty: "Beginner to early intermediate",
    deepDive: "Debugging creates real confidence. Most Docker troubleshooting becomes easier when you stop guessing and follow a repeatable order: status, logs, ports, environment, files, and service names.",
    lab: "Write your own short debugging checklist for: container exits immediately, browser cannot open the app, and app cannot connect to database.",
    mistakes: ["Jumping randomly between commands instead of checking logs first.", "Assuming a running container means a working app.", "Forgetting to inspect inside the container when file or env issues are suspected."],
    keyTerms: ["Logs", "Inspect", "Runtime shell", "Troubleshooting order"]
  },
  10: {
    estimatedMinutes: "18-28 min",
    difficulty: "Early intermediate",
    deepDive: "Health checks teach an operations mindset. In real systems, a container can be technically running while the application inside it is still starting, misconfigured, or unable to serve requests.",
    lab: "Design a simple `/health` endpoint idea for a web app and explain what success or failure should look like.",
    mistakes: ["Assuming `running` means `ready`.", "Using health checks that depend on tools not present in the image.", "Configuring health checks too aggressively for slow-starting services."],
    keyTerms: ["Readiness", "Liveness", "Health check", "Startup timing"]
  },
  11: {
    estimatedMinutes: "20-30 min",
    difficulty: "Intermediate",
    deepDive: "Optimization is where Docker quality becomes visible in daily work. Smaller, cleaner, better-cached images reduce waiting time, improve pipeline performance, and usually make runtime behavior easier to reason about.",
    lab: "Take a simple Dockerfile and identify at least three possible optimization ideas: base image, ignore file, and instruction order.",
    mistakes: ["Optimizing so aggressively that clarity becomes worse.", "Copying everything into the image without questioning it.", "Ignoring how layer caching affects rebuild speed."],
    keyTerms: ["Layer caching", ".dockerignore", "Base image", "Runtime footprint"]
  },
  12: {
    estimatedMinutes: "20-32 min",
    difficulty: "Intermediate",
    deepDive: "A Dockerfile is both build logic and documentation. Strong Dockerfiles are readable, stable, intentional, and easy for a teammate to understand months later.",
    lab: "Compare one weak Dockerfile and one strong Dockerfile. Explain which one is easier to maintain and why.",
    mistakes: ["Using `latest` without thinking about stability.", "Mixing too many concerns into a messy command order.", "Treating readability as optional in build files."],
    keyTerms: ["Readability", "Version pinning", "Build-time", "Run-time"]
  },
  13: {
    estimatedMinutes: "18-26 min",
    difficulty: "Intermediate",
    deepDive: "Storage decisions affect both development speed and production reliability. Bind mounts prioritize direct host integration, while volumes prioritize Docker-managed persistence.",
    lab: "Write one example that clearly uses a bind mount and one that clearly uses a named volume. Explain why each choice fits its use case.",
    mistakes: ["Using bind mounts everywhere without considering host dependence.", "Expecting volumes to reflect live file changes like a bind mount.", "Not realizing bind mounts can hide existing files inside the container path."],
    keyTerms: ["Bind mount", "Host path", "Named volume", "Persistence strategy"]
  },
  14: {
    estimatedMinutes: "18-26 min",
    difficulty: "Intermediate",
    deepDive: "Multi-stage builds are powerful because they separate the environment needed to build the app from the smaller environment needed to run it. This keeps production images much cleaner.",
    lab: "Draw the difference between a builder stage and a runtime stage. Then explain why only some files move from one stage to the next.",
    mistakes: ["Keeping all build tools in the final image.", "Thinking multiple `FROM` lines create multiple running containers automatically.", "Copying too much from the builder into the runtime stage."],
    keyTerms: ["Builder stage", "Runtime stage", "Artifact copy", "Clean final image"]
  },
  15: {
    estimatedMinutes: "18-26 min",
    difficulty: "Intermediate",
    deepDive: "Registries are what make Docker useful beyond a single machine. Once images must move through teams, environments, or automation, tagging and pushing become essential.",
    lab: "Write the local-to-registry flow in your own words: build, tag, push, pull, run.",
    mistakes: ["Using unclear tags for everything.", "Confusing image names with tags.", "Building locally but never thinking about how deployment systems will get the image."],
    keyTerms: ["Registry", "Docker Hub", "Tag", "Push and pull"]
  },
  16: {
    estimatedMinutes: "20-28 min",
    difficulty: "Intermediate",
    deepDive: "Security basics become stronger when they are treated as defaults, not afterthoughts. Trusted images, smaller runtimes, and cleaner secrets handling reduce risk early.",
    lab: "Take a sample image design and list three ways you would make it safer without changing the app's business behavior.",
    mistakes: ["Assuming isolation alone makes a container safe.", "Leaving secrets in images or source history.", "Running with more privileges than the app actually needs."],
    keyTerms: ["Least privilege", "Trusted image", "Secret handling", "Attack surface"]
  },
  17: {
    estimatedMinutes: "18-28 min",
    difficulty: "Intermediate",
    deepDive: "Development and production are different environments with different goals. Good Docker practice respects that instead of trying to use the exact same behavior everywhere.",
    lab: "Write a short comparison table between development Docker and production Docker in terms of editing, image stability, and risk tolerance.",
    mistakes: ["Copying local convenience patterns directly into production.", "Overcomplicating local development with unnecessary production restrictions too early.", "Assuming one Compose shape fits every environment equally well."],
    keyTerms: ["Development workflow", "Production stability", "Runtime predictability", "Environment strategy"]
  },
  18: {
    estimatedMinutes: "20-30 min",
    difficulty: "Advanced practical",
    deepDive: "Deployment changes the question from 'can this container run?' to 'can this service be relied on in another environment?' That shift adds versioning, restart strategy, configuration, exposure, and storage concerns.",
    lab: "Describe the full path from your laptop to a running server container in five steps without using vague language.",
    mistakes: ["Deploying `latest` without version clarity.", "Ignoring restart or availability behavior.", "Forgetting that production configuration usually differs from local defaults."],
    keyTerms: ["Deployment", "Server runtime", "Image version", "Availability"]
  },
  19: {
    estimatedMinutes: "18-28 min",
    difficulty: "Advanced practical",
    deepDive: "A reverse proxy gives structure to incoming traffic. It becomes the stable public face of the system while the application services behind it stay more focused on their own responsibilities.",
    lab: "Imagine a frontend at `/` and an API at `/api`. Explain how a reverse proxy makes that arrangement cleaner.",
    mistakes: ["Exposing every service directly without a clear entry layer.", "Thinking Nginx replaces the backend rather than routing to it.", "Ignoring how HTTPS and domain handling fit into the proxy layer."],
    keyTerms: ["Reverse proxy", "Ingress traffic", "Routing", "Public entry point"]
  },
  20: {
    estimatedMinutes: "22-34 min",
    difficulty: "Advanced practical",
    deepDive: "Full stack Docker work is where earlier concepts finally behave like a real application system. Frontend, backend, database, and sometimes proxy or cache each have a separate responsibility but still need coordinated runtime behavior.",
    lab: "Sketch a full stack Docker architecture with browser, frontend, backend, and database. Draw the request flow between them.",
    mistakes: ["Trying to force a whole application into one oversized container.", "Forgetting which services need persistence and which do not.", "Not planning how frontend and backend config differ."],
    keyTerms: ["Frontend service", "Backend service", "Database service", "System composition"]
  },
  21: {
    estimatedMinutes: "20-32 min",
    difficulty: "Advanced practical",
    deepDive: "Databases demand more caution because they hold the most sensitive long-lived state in the system. Persistence, schema change, recovery, and readiness all matter more here than in many app containers.",
    lab: "Explain the difference between persistence, backup, and migration as if you were teaching a teammate.",
    mistakes: ["Treating a database container like a stateless app.", "Mistaking a mounted volume for a backup plan.", "Ignoring schema evolution when changing the application."],
    keyTerms: ["Migration", "Backup", "Persistence", "Schema change"]
  },
  22: {
    estimatedMinutes: "18-28 min",
    difficulty: "Advanced practical",
    deepDive: "Docker becomes especially powerful in CI/CD because it creates a repeatable artifact that can move through build, test, and deployment steps with less mismatch.",
    lab: "Describe a simple pipeline where the same image is built, checked, tagged, pushed, and then deployed.",
    mistakes: ["Testing one image and deploying another.", "Using weak tagging in automation.", "Relying only on manual local Docker builds instead of pipeline enforcement."],
    keyTerms: ["Pipeline", "Artifact", "Promotion", "Automated delivery"]
  },
  23: {
    estimatedMinutes: "18-26 min",
    difficulty: "Advanced practical",
    deepDive: "Observation is part of operating containers properly. Logs tell you what happened in detail, while monitoring helps you see system health and patterns over time.",
    lab: "Write down three questions logs answer and three questions monitoring answers.",
    mistakes: ["Thinking uptime alone is enough to understand health.", "Ignoring logs until a crisis happens.", "Deploying services without any plan for runtime visibility."],
    keyTerms: ["Observability", "Logs", "Monitoring", "Runtime signals"]
  },
  24: {
    estimatedMinutes: "18-26 min",
    difficulty: "Advanced practical",
    deepDive: "As projects grow, Compose becomes less about syntax and more about structure. Clean separation, reduced duplication, and environment-specific organization keep larger setups maintainable.",
    lab: "Imagine a project with separate local and production needs. Write one reason why a split Compose structure might help.",
    mistakes: ["Keeping every environment concern in one huge Compose file.", "Repeating service definitions until the file becomes hard to trust.", "Adding complexity without improving clarity."],
    keyTerms: ["Overrides", "Environment structure", "Reuse", "Compose maintainability"]
  },
  25: {
    estimatedMinutes: "18-26 min",
    difficulty: "Advanced practical",
    deepDive: "Docker becomes far more valuable when it helps teams share the same expectations. Setup consistency, onboarding speed, and fewer environment mismatches are big collaboration wins.",
    lab: "Imagine onboarding a new developer. List the Docker-related things they should be able to do on day one without extra hidden steps.",
    mistakes: ["Using Docker in the repo but still relying on undocumented local machine tricks.", "Letting team naming and env patterns drift randomly.", "Assuming Docker removes the need for documentation."],
    keyTerms: ["Onboarding", "Shared workflow", "Consistency", "Team environment"]
  },
  26: {
    estimatedMinutes: "18-28 min",
    difficulty: "Beyond basics",
    deepDive: "Kubernetes becomes easier to understand when you stop seeing it as a mysterious replacement for Docker and instead see it as a coordination layer for containerized systems at larger scale.",
    lab: "Explain in your own words why a team with one app on one server may not need Kubernetes yet, but a larger platform might.",
    mistakes: ["Treating Kubernetes as a starting point before learning container basics.", "Thinking Kubernetes removes the need for Docker knowledge.", "Assuming orchestration is useful only for very large companies."],
    keyTerms: ["Kubernetes", "Cluster", "Desired state", "Orchestration"]
  },
  27: {
    estimatedMinutes: "18-26 min",
    difficulty: "Beyond basics",
    deepDive: "Scaling is where service design quality becomes more visible. Stateless services usually scale more cleanly, while stateful behavior needs more deliberate routing and storage design.",
    lab: "Take one imaginary app and decide whether it is easier to scale as stateless or stateful. Explain why.",
    mistakes: ["Starting more replicas without thinking about sessions or local state.", "Assuming scaling automatically fixes poor app design.", "Ignoring how load distribution affects user experience."],
    keyTerms: ["Replica", "Load balancing", "Stateless", "Stateful"]
  },
  28: {
    estimatedMinutes: "18-28 min",
    difficulty: "Beyond basics",
    deepDive: "Orchestration concepts matter because large systems cannot depend on manual commands for everything. Desired state, scheduling, recovery, and service discovery make the system more self-maintaining.",
    lab: "Write a one-paragraph explanation of desired state for someone who only knows `docker run`.",
    mistakes: ["Reducing orchestration to just scaling.", "Ignoring the importance of stable service identity.", "Thinking recovery is a one-time event instead of a continuous system concern."],
    keyTerms: ["Scheduling", "Recovery", "Service discovery", "Desired state"]
  },
  29: {
    estimatedMinutes: "18-26 min",
    difficulty: "Beyond basics",
    deepDive: "Hardening is about reducing unnecessary power and reducing unnecessary trust. The more public and persistent the system becomes, the more valuable these boundaries are.",
    lab: "Take a development-style container setup and identify three changes you would make before trusting it in production.",
    mistakes: ["Leaving developer conveniences in production.", "Ignoring access scope and privilege level.", "Treating secrets casually in runtime and image design."],
    keyTerms: ["Hardening", "Least privilege", "Runtime controls", "Secret discipline"]
  },
  30: {
    estimatedMinutes: "20-30 min",
    difficulty: "Beyond basics",
    deepDive: "This lesson closes the roadmap by showing that Docker is one layer in a bigger engineering system. Containers matter, but so do routing, storage, delivery, visibility, and team process around them.",
    lab: "Write your own end-to-end map from source code to deployed service, including at least image build, storage, routing, monitoring, and operations.",
    mistakes: ["Seeing Docker as the whole production architecture.", "Ignoring the surrounding systems that make containerized apps reliable.", "Thinking one tool should solve every platform problem alone."],
    keyTerms: ["System architecture", "Service platform", "Operational layers", "End-to-end delivery"]
  }
};

function mcq(prompt, options, answer, explanation) {
  return { prompt, options, answer, explanation };
}

const QUIZ_BANK = {
  1: [
    mcq("What is the simplest purpose of Docker?", ["To replace all operating systems", "To package an app and its dependencies consistently", "To write backend code faster", "To remove the need for servers"], 1, "Docker focuses on packaging applications so they run more consistently across environments."),
    mcq("Which analogy best matches the relationship between image and container?", ["Image = network, Container = volume", "Image = recipe, Container = cooked dish", "Image = browser, Container = port", "Image = server, Container = user"], 1, "A Docker image is the blueprint or recipe, while the container is the running result.")
  ],
  2: [
    mcq("What does a Dockerfile mainly contain?", ["Runtime logs", "Instructions for building an image", "Database backups", "Browser routing rules"], 1, "A Dockerfile describes how Docker should build the image step by step."),
    mcq("What is the difference between `docker build` and `docker run`?", ["Build removes images and run removes containers", "Build creates an image and run starts a container", "Build starts a service and run edits a Dockerfile", "They do the same thing"], 1, "Building creates the reusable image, while running creates and starts a container from that image.")
  ],
  3: [
    mcq("Why is Lesson 3 important for beginners?", ["It replaces the need for Dockerfiles", "It connects theory to a real application workflow", "It teaches Kubernetes first", "It is only about CSS"], 1, "Lesson 3 turns Docker from pure concept into an end-to-end build and run flow."),
    mcq("What does `-p 3000:3000` do in `docker run`?", ["Maps host port 3000 to container port 3000", "Creates a named volume", "Builds the image", "Removes old containers"], 0, "The first port is on the host machine and the second port is inside the container.")
  ],
  4: [
    mcq("Why do Docker volumes exist?", ["To replace images", "To keep important data outside the container lifecycle", "To store source code in Git", "To build smaller images"], 1, "Volumes help data survive even when containers are recreated or removed."),
    mcq("What is the safest way to think about container-local writable storage?", ["Always permanent", "Safe for all database data", "Temporary unless persistence is attached", "Automatically backed up"], 2, "Container-local writable storage should not be trusted as permanent application storage.")
  ],
  5: [
    mcq("If one container needs to talk to a database container on the same Docker network, what host is usually better than `localhost`?", ["The database service or container name", "The browser URL", "The Dockerfile name", "The image tag"], 0, "Inside Docker networking, service or container names are usually the correct stable host values."),
    mcq("What is `-p 8080:80` mainly for?", ["Container-to-container communication", "Host-to-container access", "Named volume mapping", "Image optimization"], 1, "Published ports are mainly for letting the host system reach the service inside the container.")
  ],
  6: [
    mcq("What problem does Docker Compose solve first?", ["It writes JavaScript automatically", "It organizes multi-container setups in one definition", "It removes networks", "It replaces registries"], 1, "Compose gives you one place to define services, ports, volumes, and dependencies."),
    mcq("What does `docker compose up` usually do?", ["Deletes your images", "Starts the services defined in the Compose file", "Exports notes", "Creates a certificate"], 1, "Compose up starts the described project services together.")
  ],
  7: [
    mcq("Why are environment variables useful?", ["They let the same code run with different configuration", "They replace containers", "They remove the need for Dockerfiles", "They are only for CSS themes"], 0, "Environment variables separate configuration from source code."),
    mcq("What does `${PORT}` inside a Compose file usually mean?", ["Use the container IP", "Read the value of PORT from the environment or `.env` context", "Expose all ports automatically", "Create a new volume"], 1, "Compose interpolates `${PORT}` from the available environment values.")
  ],
  8: [
    mcq("Why is Lesson 8 a milestone for learners?", ["It combines many earlier Docker ideas into one project flow", "It removes the need for volumes", "It is only about theory", "It teaches orchestration first"], 0, "This lesson is about seeing Docker as a project system instead of isolated commands."),
    mcq("In a small real Docker project, what does `compose.yaml` usually coordinate?", ["Only static images", "Services, ports, config, and storage together", "Only lesson notes", "Only terminal colors"], 1, "Compose becomes the center of the multi-service project setup.")
  ],
  9: [
    mcq("If a container stops immediately, what is one of the first things you should check?", ["The CSS file", "Container logs", "The domain name", "The operating system wallpaper"], 1, "Logs are often the fastest way to see why startup failed."),
    mcq("Why is `docker ps -a` often more useful than `docker ps` during debugging?", ["It shows all containers including stopped ones", "It edits images", "It resets volumes", "It changes environment variables"], 0, "Stopped containers often contain the failure you are trying to inspect.")
  ],
  10: [
    mcq("Why are health checks useful?", ["They make images larger", "They help distinguish running from actually ready", "They remove networking", "They replace debugging"], 1, "Health checks help Docker judge whether the app inside the container is responding properly."),
    mcq("Why is `depends_on` not the full readiness solution?", ["Because it only helps startup order, not actual service readiness", "Because it removes logs", "Because it rebuilds the image", "Because it deletes the volume"], 0, "A dependency may start before it is truly ready to serve requests.")
  ],
  11: [
    mcq("Why does `.dockerignore` improve builds?", ["It lets Docker skip unnecessary files in the build context", "It creates volumes", "It adds health checks", "It exposes ports automatically"], 0, "Ignoring unnecessary files reduces clutter and often speeds builds."),
    mcq("Why is copying dependency files before source files often helpful?", ["It improves layer caching for dependency installation", "It creates more networks", "It makes images impossible to share", "It replaces registries"], 0, "If dependency files do not change, Docker can often reuse the cached install layer.")
  ],
  12: [
    mcq("Why is `FROM node:latest` often less stable than a specific tag?", ["Because `latest` can change over time", "Because it disables the Docker daemon", "Because it creates certificates", "Because it always breaks Compose"], 0, "Specific tags improve predictability across time and environments."),
    mcq("What is one good reason to use `WORKDIR`?", ["It makes later instructions cleaner and more readable", "It automatically adds a database", "It creates port mappings", "It publishes the image"], 0, "WORKDIR helps avoid repeated long paths and improves structure.")
  ],
  13: [
    mcq("What is the main difference between a bind mount and a volume?", ["A bind mount uses a real host path, while a volume is Docker-managed storage", "A volume always uses the browser", "A bind mount is only for production", "They are identical"], 0, "Bind mounts connect to host paths directly, while volumes are managed by Docker."),
    mcq("Which choice is usually better for local live code editing?", ["Bind mount", "Named volume", "Registry tag", "Health check"], 0, "Bind mounts are commonly used in development so local file changes appear inside the container.")
  ],
  14: [
    mcq("What is the main benefit of a multi-stage build?", ["It keeps build tools out of the final runtime image", "It removes the need for networking", "It disables caching", "It replaces health checks"], 0, "Builder stages and runtime stages help keep the final image smaller and cleaner."),
    mcq("What does `COPY --from=builder ...` usually mean?", ["Copy files from an earlier build stage into the current stage", "Download from Docker Hub automatically", "Create a new network", "Run the container immediately"], 0, "That command pulls only needed artifacts from the named builder stage.")
  ],
  15: [
    mcq("Why do registries matter?", ["They store images so other machines and environments can pull them", "They only format CSS", "They replace Compose", "They remove the need for tags"], 0, "Registries make images shareable and deployable beyond one local machine."),
    mcq("Why are tags important?", ["They help identify image versions clearly", "They create environment variables", "They restart containers", "They replace networks"], 0, "Tags help teams know exactly which image version is being used.")
  ],
  16: [
    mcq("Why should secrets usually stay out of images?", ["Because they become part of the image artifact and are harder to protect", "Because Docker cannot read environment variables", "Because images cannot run with secrets", "Because secrets are only for databases"], 0, "Baking secrets into images makes them easier to leak and harder to rotate safely."),
    mcq("Why do smaller images often support better security?", ["They usually include fewer unnecessary packages and attack points", "They always run faster in every case", "They remove the need for users", "They are only useful in development"], 0, "A smaller runtime usually means fewer extra tools and fewer potential vulnerabilities.")
  ],
  17: [
    mcq("What is a common development Docker priority?", ["Convenient editing and quick iteration", "Maximum runtime restriction at all costs", "Eliminating all logs", "Avoiding environment variables"], 0, "Development Docker is usually optimized for speed of learning and editing."),
    mcq("What is a common production Docker priority?", ["Repeatability and stability", "Keeping every debug tool installed", "Using bind mounts everywhere", "Skipping version tags"], 0, "Production usually values predictability and controlled behavior.")
  ],
  18: [
    mcq("What new concern appears strongly during deployment?", ["Versioned images and runtime configuration", "Choosing wallpaper color", "Renaming Docker itself", "Removing all logs"], 0, "Deployment requires stronger control over image version, config, restart behavior, and storage."),
    mcq("Why is a registry useful in deployment?", ["The server can pull the image from a shared location", "It automatically writes your app code", "It creates volumes", "It skips configuration"], 0, "Without a shared image source, deployment gets harder to repeat.")
  ],
  19: [
    mcq("What is a reverse proxy mainly doing?", ["Receiving requests first and routing them to the correct service", "Building images", "Writing Dockerfiles", "Running backups"], 0, "A reverse proxy stands in front of app services and forwards traffic intelligently."),
    mcq("Why use Nginx in front of containers?", ["It can centralize routing, domains, and HTTPS handling", "It replaces all app logic", "It removes the need for Compose", "It deletes old images"], 0, "Nginx is often the public-facing traffic layer in front of application containers.")
  ],
  20: [
    mcq("What usually makes a setup 'full stack' in this course?", ["Frontend, backend, and database working together", "Only one static HTML file", "Only Docker Hub usage", "Only a health check endpoint"], 0, "A full stack Docker setup usually includes multiple coordinated services."),
    mcq("Why does Compose become especially useful in full stack projects?", ["It manages multiple related services in one structure", "It removes the need for any images", "It disables networking", "It makes databases stateless"], 0, "Compose gives one place to define and run the whole application system.")
  ],
  21: [
    mcq("Why are databases special in Docker?", ["They require stronger attention to persistence and recovery", "They do not need configuration", "They never need volumes", "They replace reverse proxies"], 0, "Databases carry important long-lived state, so their lifecycle must be treated carefully."),
    mcq("What is the difference between a volume and a backup?", ["A volume keeps data attached, while a backup helps recover from failure or loss", "They are identical", "A backup is only for frontend apps", "A volume automatically creates migrations"], 0, "Persistence and recovery are related but different goals.")
  ],
  22: [
    mcq("Why is Docker good for CI/CD?", ["It gives a consistent artifact that can move through build, test, and deployment", "It eliminates all need for testing", "It removes versioning", "It prevents registries"], 0, "Docker creates a clear, repeatable unit that automation can use."),
    mcq("What is a risky pipeline pattern?", ["Testing one image and deploying a different one", "Using a registry", "Tagging an image", "Building in CI"], 0, "Artifact mismatch reduces trust in the pipeline.")
  ],
  23: [
    mcq("What do logs usually help answer first?", ["What happened inside the service", "How many developers use Docker worldwide", "Which font the browser prefers", "What the next lesson title is"], 0, "Logs are detailed event records that help explain behavior and errors."),
    mcq("What does monitoring help show over time?", ["Health and performance patterns", "Only Dockerfile syntax", "Only image tags", "Only local edits"], 0, "Monitoring helps you see whether the system remains healthy and efficient.")
  ],
  24: [
    mcq("Why do advanced Compose patterns appear?", ["Because larger projects need cleaner structure and less duplication", "Because Compose stops working after three services", "Because volumes disappear", "Because Dockerfiles cannot be used anymore"], 0, "As projects grow, YAML structure and maintainability become more important."),
    mcq("What is one reason to separate Compose files by environment?", ["To keep local and production concerns clearer", "To remove all services", "To avoid all configuration", "To stop using networking"], 0, "Different environments often need different settings and levels of convenience.")
  ],
  25: [
    mcq("Why is Docker especially useful in team projects?", ["It reduces environment mismatch and speeds onboarding", "It removes all need for communication", "It replaces version control", "It only matters for one-person projects"], 0, "Shared Docker workflows help teams stay more consistent."),
    mcq("What is one sign Docker is helping the team well?", ["New developers can start the project with fewer hidden steps", "Nobody documents anything", "Every developer uses different service names", "Production tags are random"], 0, "Good Docker team usage improves predictability and onboarding.")
  ],
  26: [
    mcq("What is the simplest relation between Docker and Kubernetes?", ["Docker runs containers, Kubernetes coordinates many of them", "Docker replaces Kubernetes completely", "Kubernetes only stores images", "They are unrelated"], 0, "Kubernetes builds on container fundamentals by adding orchestration capabilities."),
    mcq("When does Kubernetes usually become more relevant?", ["When systems need larger-scale orchestration and recovery", "Before you learn containers", "Only for CSS projects", "Only for local HTML pages"], 0, "Kubernetes becomes more useful as systems and operational demands grow.")
  ],
  27: [
    mcq("What does scaling usually mean here?", ["Running more replicas of a service", "Deleting old images", "Turning off logging", "Renaming Compose files"], 0, "Scaling adds more service instances to handle traffic or improve resilience."),
    mcq("Why are stateless services usually easier to scale?", ["They depend less on local per-container state", "They never use networks", "They replace databases", "They do not need images"], 0, "Stateless behavior makes it easier for multiple replicas to behave consistently.")
  ],
  28: [
    mcq("What is 'desired state' in orchestration thinking?", ["The target condition the platform tries to maintain", "A Docker volume name", "The size of a terminal window", "Only a lesson title"], 0, "Desired state means you declare what should exist, and the system works to keep it true."),
    mcq("Why does service discovery matter?", ["Because services need stable ways to find each other even when containers change", "Because it changes the lesson numbers", "Because it removes the need for tags", "Because it deletes failed pods automatically"], 0, "Container identities can change, so service-level identity becomes important.")
  ],
  29: [
    mcq("What does least privilege mean in a container context?", ["Give the runtime only the access it actually needs", "Always run as root", "Install every package just in case", "Expose every port"], 0, "Least privilege reduces unnecessary risk and access."),
    mcq("Why is production hardening stricter than local development?", ["Because production carries more real risk and exposure", "Because local development is always unsafe", "Because Docker does not work locally", "Because themes require it"], 0, "Production systems need stronger controls due to real traffic, secrets, and uptime concerns.")
  ],
  30: [
    mcq("What does Lesson 30 mainly help you see?", ["How Docker fits into a larger system architecture", "How to uninstall Docker", "How to remove all networks", "How to skip deployment"], 0, "The final lesson connects Docker to the bigger platform picture around it."),
    mcq("Which short summary best describes the course arc?", ["Code -> Image -> Container -> Service -> System", "Volume -> Port -> Browser -> CSS", "Tag -> Theme -> Modal -> Badge", "Docker -> Delete -> Restart -> End"], 0, "That progression summarizes how the learning expands from packaging into architecture thinking.")
  ]
};

const GLOSSARY_ENTRIES = [
  { term: "Artifact", definition: "A built output that can be stored, tested, promoted, or deployed. In Docker workflows, an image often acts as the main artifact.", lessons: [15, 22, 30] },
  { term: "Base Image", definition: "The starting image used in the `FROM` line of a Dockerfile. It affects size, compatibility, and available tools.", lessons: [2, 11, 12, 16] },
  { term: "Bind Mount", definition: "A mapping from a real host path into a container path. It is commonly used in development for live local file changes.", lessons: [4, 13, 17] },
  { term: "Build Context", definition: "The set of files Docker can see during `docker build`. `.dockerignore` helps reduce unnecessary files in that context.", lessons: [3, 11, 12] },
  { term: "Builder Stage", definition: "A stage in a multi-stage Dockerfile used for compiling or preparing artifacts before a smaller runtime stage is produced.", lessons: [14] },
  { term: "CI/CD", definition: "Continuous Integration and Continuous Delivery/Deployment. It automates building, testing, tagging, pushing, and sometimes deploying containerized apps.", lessons: [22, 30] },
  { term: "Cluster", definition: "A group of machines working together under an orchestration platform.", lessons: [26, 28] },
  { term: "Compose File", definition: "A YAML file that defines multiple Docker services, their ports, volumes, environment variables, and relationships.", lessons: [6, 8, 24] },
  { term: "Container", definition: "A running instance of a Docker image. It is the live environment where the application actually executes.", lessons: [1, 2, 3] },
  { term: "Desired State", definition: "The target condition an orchestration system tries to keep true, such as a certain number of healthy replicas.", lessons: [26, 28] },
  { term: "Dockerfile", definition: "A text file containing the instructions Docker uses to build an image.", lessons: [2, 3, 12] },
  { term: "Environment Variable", definition: "A configuration value passed into an application at runtime instead of hardcoding it into source code.", lessons: [7, 8, 17] },
  { term: "EXPOSE", definition: "A Dockerfile instruction that documents which port the containerized app uses internally. It does not publish the port to the host by itself.", lessons: [3] },
  { term: "Health Check", definition: "A test Docker runs to determine whether an application inside the container is healthy and responsive.", lessons: [10, 23] },
  { term: "Image", definition: "A reusable packaged blueprint that contains application code, dependencies, and runtime instructions.", lessons: [1, 2, 11, 15] },
  { term: "Ingress Traffic", definition: "Incoming traffic entering a deployed system, often handled first by a proxy, gateway, or ingress controller.", lessons: [19, 30] },
  { term: "Isolation", definition: "The separation that helps containers run with their own dependencies and behavior without fully mixing with the host environment.", lessons: [1] },
  { term: "Layer Cache", definition: "Docker’s build optimization system that can reuse results from earlier instructions when inputs have not changed.", lessons: [11, 12] },
  { term: "Least Privilege", definition: "A security principle where a container or service receives only the minimum access it really needs.", lessons: [16, 29] },
  { term: "Named Volume", definition: "Docker-managed persistent storage identified by a name instead of a direct host path.", lessons: [4, 13, 21] },
  { term: "Network", definition: "A Docker communication layer that allows containers to talk to each other, often using stable service names.", lessons: [5, 8, 20] },
  { term: "Node", definition: "One machine inside a cluster that can run workloads scheduled by an orchestration platform.", lessons: [26, 28] },
  { term: "Orchestration", definition: "Automated coordination of containers at scale, including scheduling, recovery, and service management.", lessons: [26, 28, 30] },
  { term: "Persistent Data", definition: "Data that should survive container restarts or replacement, usually stored outside the container’s temporary writable layer.", lessons: [4, 21] },
  { term: "Port Mapping", definition: "A host-to-container port connection such as `-p 8080:80`, which lets the host reach a service inside a container.", lessons: [1, 3, 5] },
  { term: "Registry", definition: "A storage system for Docker images so they can be shared, pulled, and deployed beyond one local machine.", lessons: [15, 18] },
  { term: "Replica", definition: "An additional running copy of a service used for scaling, resilience, or load distribution.", lessons: [27, 28] },
  { term: "Reverse Proxy", definition: "A service that receives requests first and forwards them to the correct backend service.", lessons: [19, 30] },
  { term: "Runtime Stage", definition: "The final stage of a multi-stage build that contains only what the application needs to run.", lessons: [14] },
  { term: "Scheduling", definition: "The process of deciding where workloads should run across available machines.", lessons: [28] },
  { term: "Service", definition: "A distinct application part such as an app, database, or cache that usually has its own container definition.", lessons: [6, 20, 25] },
  { term: "Service Discovery", definition: "A mechanism that lets services find each other through stable identities instead of temporary container IPs.", lessons: [5, 28] },
  { term: "Stateless", definition: "A service style where individual container instances do not depend heavily on their own local memory or local files.", lessons: [20, 27] },
  { term: "Stateful", definition: "A service style where local state, sessions, files, or coordinated data handling matter more strongly.", lessons: [21, 27] },
  { term: "Tag", definition: "A version label attached to an image name, used to identify exactly which image build is being used.", lessons: [15, 18, 22] },
  { term: "Volume", definition: "Docker-managed storage used to keep important data separate from the temporary lifecycle of a container.", lessons: [4, 13, 21] },
  { term: "WORKDIR", definition: "A Dockerfile instruction that sets the working directory for later build and runtime-related commands.", lessons: [2, 12] }
].sort((a, b) => a.term.localeCompare(b.term));

const LESSON_LOOKUP = Object.fromEntries(LESSONS.map((lesson) => [lesson.number, { ...lesson, ...(LESSON_DETAIL_MAP[lesson.number] || {}) }]));

function getStoredState() {
  try {
    const raw = window.localStorage.getItem(LMS_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    return JSON.parse(raw);
  } catch (error) {
    return {};
  }
}

function normaliseState(rawState) {
  const state = rawState && typeof rawState === "object" ? rawState : {};
  const lessonNotes = state.lessonNotes && typeof state.lessonNotes === "object" ? state.lessonNotes : {};
  const quizResults = state.quizResults && typeof state.quizResults === "object" ? state.quizResults : {};
  return {
    learnerName: typeof state.learnerName === "string" ? state.learnerName : "",
    theme: state.theme === "dark" || state.theme === "light" ? state.theme : "",
    furthestLesson: Number.isInteger(state.furthestLesson) ? state.furthestLesson : 0,
    lastViewedLesson: Number.isInteger(state.lastViewedLesson) ? state.lastViewedLesson : 0,
    visitedLessons: Array.isArray(state.visitedLessons)
      ? Array.from(new Set(state.visitedLessons.filter((value) => Number.isInteger(value) && value >= 1 && value <= TOTAL_LESSONS))).sort((a, b) => a - b)
      : [],
    milestonesSeen: Array.isArray(state.milestonesSeen)
      ? Array.from(new Set(state.milestonesSeen.filter((value) => Number.isInteger(value))))
      : [],
    completedLessons: Array.isArray(state.completedLessons)
      ? Array.from(new Set(state.completedLessons.filter((value) => Number.isInteger(value) && value >= 1 && value <= TOTAL_LESSONS))).sort((a, b) => a - b)
      : [],
    lessonNotes: Object.fromEntries(
      Object.entries(lessonNotes)
        .filter(([key, value]) => /^\d+$/.test(key) && Number(key) >= 1 && Number(key) <= TOTAL_LESSONS && typeof value === "string")
        .map(([key, value]) => [key, value.slice(0, 5000)])
    ),
    quizResults: Object.fromEntries(
      Object.entries(quizResults)
        .filter(([key, value]) => /^\d+$/.test(key) && Number(key) >= 1 && Number(key) <= TOTAL_LESSONS && value && typeof value === "object")
        .map(([key, value]) => [
          key,
          {
            score: Number.isInteger(value.score) ? value.score : 0,
            total: Number.isInteger(value.total) ? value.total : 0,
            completedAt: typeof value.completedAt === "string" ? value.completedAt : ""
          }
        ])
    ),
    completedAt: typeof state.completedAt === "string" ? state.completedAt : "",
    startedAt: typeof state.startedAt === "string" ? state.startedAt : "",
    updatedAt: typeof state.updatedAt === "string" ? state.updatedAt : "",
    lastVisitedPath: typeof state.lastVisitedPath === "string" ? state.lastVisitedPath : rootHref("index.html")
  };
}

function saveState(state) {
  try {
    window.localStorage.setItem(LMS_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    // Intentionally ignore storage failures in locked-down browsers.
  }
}

function getPageMeta() {
  const fileName = window.location.pathname.split("/").pop() || "index.html";

  if (fileName === "index.html" || fileName === "") {
    return { type: "overview", fileName: "index.html" };
  }

  if (fileName === "revision.html") {
    return { type: "revision", fileName };
  }

  if (fileName === "course-summary.html") {
    return { type: "summary", fileName };
  }

  if (fileName === "glossary.html") {
    return { type: "glossary", fileName };
  }

  if (fileName === "certificate.html") {
    return { type: "certificate", fileName };
  }

  if (/^lesson-\d+\.html$/.test(fileName)) {
    const lessonNumber = Number(fileName.match(/\d+/)[0]);
    return {
      type: "lesson",
      fileName,
      lesson: LESSON_LOOKUP[lessonNumber]
    };
  }

  return { type: "other", fileName };
}

function getPhaseByLesson(lessonNumber) {
  return PHASES.find((phase) => lessonNumber >= phase.start && lessonNumber <= phase.end) || PHASES[0];
}

function getGreetingPrefix() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Good morning";
  }
  if (hour < 17) {
    return "Good afternoon";
  }
  if (hour < 21) {
    return "Good evening";
  }
  return "Good night";
}

function getFriendlyName(state) {
  return state.learnerName || "Learner";
}

function isLessonComplete(state, lessonNumber) {
  return lessonNumber <= Math.max(state.furthestLesson || 0, 0) || state.completedLessons.includes(lessonNumber);
}

function saveLessonNote(state, lessonNumber, note) {
  state.lessonNotes[String(lessonNumber)] = note.slice(0, 5000);
  state.updatedAt = new Date().toISOString();
  saveState(state);
}

function saveQuizResult(state, lessonNumber, score, total) {
  const previous = state.quizResults[String(lessonNumber)];
  const previousScore = previous ? previous.score : 0;
  const bestScore = Math.max(previousScore, score);
  state.quizResults[String(lessonNumber)] = {
    score: bestScore,
    total,
    completedAt: new Date().toISOString()
  };
  state.updatedAt = new Date().toISOString();
  saveState(state);
}

function getQuizResult(state, lessonNumber) {
  return state.quizResults[String(lessonNumber)] || null;
}

function getQuizSummary(state) {
  const results = Object.values(state.quizResults);
  const attempted = results.length;
  const perfect = results.filter((item) => item.total > 0 && item.score >= item.total).length;
  const scoreTotal = results.reduce((sum, item) => sum + item.score, 0);
  const questionTotal = results.reduce((sum, item) => sum + item.total, 0);

  return {
    attempted,
    perfect,
    scoreTotal,
    questionTotal
  };
}

function toggleLessonComplete(state, lessonNumber) {
  if (lessonNumber <= Math.max(state.furthestLesson || 0, 0)) {
    return;
  }
  if (isLessonComplete(state, lessonNumber)) {
    state.completedLessons = state.completedLessons.filter((item) => item !== lessonNumber);
  } else {
    state.completedLessons.push(lessonNumber);
    state.completedLessons.sort((a, b) => a - b);
  }
  state.updatedAt = new Date().toISOString();
  saveState(state);
}

function getDerivedCompletedCount(state, furthestLesson) {
  const manualCount = Array.from(new Set(state.completedLessons)).length;
  return Math.max(furthestLesson, manualCount);
}

function resetLearningProgress(state) {
  const theme = state.theme;
  const learnerName = state.learnerName;

  state.learnerName = learnerName;
  state.theme = theme;
  state.furthestLesson = 0;
  state.lastViewedLesson = 0;
  state.visitedLessons = [];
  state.milestonesSeen = [];
  state.completedLessons = [];
  state.lessonNotes = {};
  state.quizResults = {};
  state.completedAt = "";
  state.startedAt = "";
  state.updatedAt = new Date().toISOString();
  state.lastVisitedPath = rootHref("index.html");
  saveState(state);
}

function getProgressInfo(state) {
  const furthestLesson = Math.max(0, Math.min(state.furthestLesson || 0, TOTAL_LESSONS));
  const progressPercent = Math.round((furthestLesson / TOTAL_LESSONS) * 100);
  const completedCount = getDerivedCompletedCount(state, furthestLesson);
  const completedPercent = Math.round((completedCount / TOTAL_LESSONS) * 100);
  const currentPhase = getPhaseByLesson(furthestLesson || 1);
  const continueLesson = furthestLesson > 0 ? LESSON_LOOKUP[furthestLesson] : LESSON_LOOKUP[1];
  const nextLesson = furthestLesson > 0 && furthestLesson < TOTAL_LESSONS ? LESSON_LOOKUP[furthestLesson + 1] : null;
  const lastViewedLesson = state.lastViewedLesson ? LESSON_LOOKUP[state.lastViewedLesson] : null;

  return {
    furthestLesson,
    progressPercent,
    completedCount,
    completedPercent,
    currentPhase,
    continueLesson,
    nextLesson,
    lastViewedLesson,
    visitedCount: state.visitedLessons.length
  };
}

function visitCurrentPage(state, meta) {
  if (!state.startedAt) {
    state.startedAt = new Date().toISOString();
  }

  if (meta.type === "lesson" && meta.lesson) {
    const lessonNumber = meta.lesson.number;
    state.lastViewedLesson = lessonNumber;
    state.lastVisitedPath = meta.lesson.href;
    state.furthestLesson = Math.max(state.furthestLesson, lessonNumber);
    if (!state.visitedLessons.includes(lessonNumber)) {
      state.visitedLessons.push(lessonNumber);
      state.visitedLessons.sort((a, b) => a - b);
    }
  } else {
    state.lastVisitedPath = rootHref(meta.fileName);
  }

  if (state.furthestLesson >= TOTAL_LESSONS && !state.completedAt) {
    state.completedAt = new Date().toISOString();
  }

  state.updatedAt = new Date().toISOString();
  saveState(state);
}

function applyTheme(state) {
  const preferredTheme = state.theme || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", preferredTheme);
  state.theme = preferredTheme;
  saveState(state);
}

function toggleTheme(state) {
  const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  state.theme = nextTheme;
  saveState(state);
  refreshDynamicUi(state, getPageMeta());
}

function animateProgress(scope, targetPercent) {
  const clamped = Math.max(0, Math.min(100, targetPercent));
  const fills = scope.querySelectorAll("[data-progress-fill]");
  const numbers = scope.querySelectorAll("[data-progress-number]");

  requestAnimationFrame(() => {
    fills.forEach((fill) => {
      fill.style.width = `${clamped}%`;
    });
  });

  numbers.forEach((node) => {
    const startValue = 0;
    const duration = 650;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const value = Math.round(startValue + (clamped - startValue) * progress);
      node.textContent = `${value}%`;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  });
}

function getPhaseStatus(phase, furthestLesson) {
  if (furthestLesson >= phase.end) {
    return { className: "done", label: "Done" };
  }
  if (furthestLesson >= phase.start || (furthestLesson === 0 && phase.start === 1)) {
    return { className: "active", label: "In progress" };
  }
  return { className: "", label: "Up next" };
}

function renderProgressCard(state) {
  const card = document.querySelector(".progress-card");
  if (!card) {
    return;
  }

  const info = getProgressInfo(state);
  const learner = getFriendlyName(state);

  card.innerHTML = `
    <strong>Learning Progress</strong>
    <p>${learner} is ${info.progressPercent}% through the current Docker roadmap.</p>
    <div class="progress-meta">
      <span>Current phase</span>
      <strong>${info.currentPhase.shortTitle}</strong>
    </div>
    <div class="progress-track progress-track-lg">
      <div class="progress-fill" data-progress-fill style="width: 0%;"></div>
    </div>
    <div class="progress-inline">
      <strong data-progress-number>0%</strong>
      <span>${info.furthestLesson || 0} of ${TOTAL_LESSONS} lessons reached • ${info.completedCount} marked complete</span>
    </div>
    <div class="progress-steps">
      ${PHASES.map((phase) => {
        const status = getPhaseStatus(phase, info.furthestLesson);
        return `
          <div class="progress-step ${status.className}">
            <span class="progress-dot"></span>
            <span>${phase.title}</span>
            <strong>${status.label}</strong>
          </div>
        `;
      }).join("")}
    </div>
  `;

  animateProgress(card, info.progressPercent);
}

function syncSidebarStatuses(state) {
  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.classList.remove("completed");
    const match = link.getAttribute("href").match(/lesson-(\d+)\.html/);
    if (!match) {
      return;
    }
    const lessonNumber = Number(match[1]);
    if (isLessonComplete(state, lessonNumber)) {
      link.classList.add("completed");
    }
  });
}

function ensureSidebarUtilityLinks(meta) {
  const nav = document.querySelector(".sidebar-nav");
  if (!nav) {
    return;
  }

  const utilityLinks = [
    {
      href: rootHref("glossary.html"),
      iconClass: "icon-sea",
      icon: "G",
      title: "Glossary",
      description: "Search key Docker terms and linked lessons"
    },
    {
      href: rootHref("certificate.html"),
      iconClass: "icon-mint",
      icon: "C",
      title: "Certificate",
      description: "Completion badge and printable certificate"
    }
  ];

  utilityLinks.forEach((item) => {
    if (nav.querySelector(`.sidebar-link[href="${item.href}"]`)) {
      return;
    }

    const link = document.createElement("a");
    link.className = "sidebar-link";
    link.href = item.href;
    link.innerHTML = `
      <span class="icon-badge ${item.iconClass}">${item.icon}</span>
      <span><strong>${item.title}</strong>${item.description}</span>
    `;
    nav.append(link);
  });

  document.querySelectorAll(".sidebar-link").forEach((link) => {
    const href = link.getAttribute("href") || "";
    link.classList.toggle("active", hrefTargetsFile(href, meta.fileName));
  });
}

function closeMobileSidebar() {
  document.body.classList.remove("lms-sidebar-open");
  document.querySelector(".layout")?.classList.remove("sidebar-open");
  const button = document.querySelector(".lms-mobile-nav-button");
  const sidebar = document.querySelector(".sidebar");
  if (button) {
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = '<span aria-hidden="true">☰</span><span>Course map</span>';
  }
  if (sidebar && window.innerWidth <= 1100) {
    sidebar.setAttribute("aria-hidden", "true");
  }
}

function syncMobileSidebarState() {
  const layout = document.querySelector(".layout");
  const sidebar = document.querySelector(".sidebar");
  const button = document.querySelector(".lms-mobile-nav-button");
  const desktop = window.innerWidth > 1100;
  const isOpen = desktop || Boolean(layout?.classList.contains("sidebar-open"));

  document.body.classList.toggle("lms-sidebar-open", !desktop && isOpen);
  if (button) {
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    button.innerHTML = isOpen
      ? '<span aria-hidden="true">×</span><span>Close map</span>'
      : '<span aria-hidden="true">☰</span><span>Course map</span>';
  }
  if (sidebar) {
    sidebar.setAttribute("aria-hidden", isOpen ? "false" : "true");
  }
}

function toggleMobileSidebar() {
  const layout = document.querySelector(".layout");
  if (!layout) {
    return;
  }
  layout.classList.toggle("sidebar-open");
  syncMobileSidebarState();
}

function ensureMobileSidebarChrome() {
  const topbar = document.querySelector(".topbar");
  const layout = document.querySelector(".layout");
  const sidebar = document.querySelector(".sidebar");

  if (!topbar || !layout || !sidebar) {
    return;
  }

  topbar.querySelector(".lms-mobile-nav-button")?.remove();

  const toggleButton = document.createElement("button");
  toggleButton.type = "button";
  toggleButton.className = "lms-mobile-nav-button";
  toggleButton.setAttribute("aria-expanded", "false");
  toggleButton.setAttribute("aria-controls", "course-sidebar");
  toggleButton.innerHTML = '<span aria-hidden="true">☰</span><span>Course map</span>';
  toggleButton.addEventListener("click", toggleMobileSidebar);
  topbar.insertBefore(toggleButton, topbar.firstChild);

  sidebar.id = "course-sidebar";

  let closeButton = sidebar.querySelector(".lms-sidebar-close");
  if (!closeButton) {
    closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "lms-sidebar-close";
    closeButton.setAttribute("aria-label", "Close course map");
    closeButton.innerHTML = "×";
    closeButton.addEventListener("click", closeMobileSidebar);
    sidebar.prepend(closeButton);
  }

  let backdrop = document.querySelector(".lms-sidebar-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("button");
    backdrop.type = "button";
    backdrop.className = "lms-sidebar-backdrop";
    backdrop.setAttribute("aria-label", "Close course map backdrop");
    backdrop.addEventListener("click", closeMobileSidebar);
    document.body.append(backdrop);
  }

  document.querySelectorAll(".sidebar-link").forEach((link) => {
    if (link.dataset.mobileCloseBound === "true") {
      return;
    }
    link.dataset.mobileCloseBound = "true";
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1100) {
        closeMobileSidebar();
      }
    });
  });

  if (document.body.dataset.mobileSidebarHandlersBound !== "true") {
    document.body.dataset.mobileSidebarHandlersBound = "true";
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1100) {
        closeMobileSidebar();
      }
      syncMobileSidebarState();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileSidebar();
      }
    });
  }

  syncMobileSidebarState();
}

function createActionLink(label, href, variant = "button-secondary") {
  const link = document.createElement("a");
  link.className = `button ${variant}`;
  link.href = href;
  link.textContent = label;
  return link;
}

function renderTopbarControls(state, meta) {
  const topbar = document.querySelector(".topbar");
  if (!topbar) {
    return;
  }

  topbar.querySelector(".lms-topbar-actions")?.remove();

  const info = getProgressInfo(state);
  const wrapper = document.createElement("div");
  wrapper.className = "lms-topbar-actions";

  const profileButton = document.createElement("button");
  profileButton.type = "button";
  profileButton.className = "lms-chip-button";
  profileButton.textContent = `${getGreetingPrefix()}, ${getFriendlyName(state)}`;
  profileButton.addEventListener("click", () => openNameModal(state, meta, true));

  const themeButton = document.createElement("button");
  themeButton.type = "button";
  themeButton.className = "lms-chip-button";
  themeButton.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "Light mode" : "Dark mode";
  themeButton.addEventListener("click", () => toggleTheme(state));

  wrapper.append(profileButton, themeButton);

  if (info.furthestLesson > 0) {
    const resume = createActionLink(`Resume Lesson ${info.furthestLesson}`, info.continueLesson.href, "button-secondary");
    resume.classList.add("lms-topbar-link");
    wrapper.append(resume);

    const restartButton = document.createElement("button");
    restartButton.type = "button";
    restartButton.className = "lms-chip-button";
    restartButton.textContent = "Restart course";
    restartButton.addEventListener("click", () => openResetModal(state, meta));
    wrapper.append(restartButton);
  }

  if (info.completedCount >= TOTAL_LESSONS) {
    const certificateButton = createActionLink("Certificate", rootHref("certificate.html"), "button-primary");
    certificateButton.classList.add("lms-topbar-link");
    wrapper.append(certificateButton);
  }

  topbar.append(wrapper);
}

function renderQuickTools(state) {
  const info = getProgressInfo(state);
  return `
    <div class="lms-quick-tools">
      <a class="button button-secondary" href="${rootHref("index.html")}">Overview</a>
      <a class="button button-secondary" href="${rootHref("revision.html")}">Revision</a>
      <a class="button button-secondary" href="${rootHref("glossary.html")}">Glossary</a>
      <a class="button button-secondary" href="${rootHref("course-summary.html")}">Summary</a>
      <a class="button button-secondary" href="${rootHref("certificate.html")}">${info.completedCount >= TOTAL_LESSONS ? "Certificate" : "Preview certificate"}</a>
    </div>
  `;
}

function renderTrackerCard(state, meta) {
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) {
    return;
  }

  sidebar.querySelector(".lms-tracker-card")?.remove();
  sidebar.querySelector(".lms-sidebar-utilities")?.remove();

  const info = getProgressInfo(state);
  const quizInfo = getQuizSummary(state);
  const tracker = document.createElement("section");
  tracker.className = "lms-tracker-card";

  const lessonContext =
    meta.type === "lesson" && meta.lesson
      ? `You are reading Lesson ${meta.lesson.number}: ${meta.lesson.title}.`
      : info.furthestLesson > 0
        ? `You have reached Lesson ${info.furthestLesson} so far.`
        : "You have not started the roadmap yet.";

  tracker.innerHTML = `
    <span class="tag">Learning Tracker</span>
    <h3>${getGreetingPrefix()}, ${getFriendlyName(state)}</h3>
    <p>${lessonContext}</p>
    <div class="lms-tracker-metrics">
      <div class="lms-tracker-metric">
        <strong data-progress-number>0%</strong>
        <span>Roadmap progress</span>
      </div>
      <div class="lms-tracker-metric">
        <strong>${info.furthestLesson || 0}/${TOTAL_LESSONS}</strong>
        <span>Furthest lesson</span>
      </div>
      <div class="lms-tracker-metric">
        <strong>${info.completedCount}/${TOTAL_LESSONS}</strong>
        <span>Lessons completed</span>
      </div>
      <div class="lms-tracker-metric">
        <strong>${quizInfo.attempted}/${TOTAL_LESSONS}</strong>
        <span>Quiz attempts saved</span>
      </div>
    </div>
    <div class="progress-track progress-track-lg">
      <div class="progress-fill" data-progress-fill style="width: 0%;"></div>
    </div>
    <div class="lms-phase-pill">${info.currentPhase.title}</div>
    ${info.completedCount >= TOTAL_LESSONS ? '<div class="lms-badge-banner">Completion badge unlocked • Course finished</div>' : '<div class="lms-badge-banner lms-badge-banner-soft">Finish all lessons to unlock your final certificate badge</div>'}
    <div class="lms-tracker-actions"></div>
    <div class="lms-tracker-note">${info.lastViewedLesson ? `Last opened: Lesson ${info.lastViewedLesson.number} • Completion score ${info.completedPercent}% • Quiz record ${quizInfo.scoreTotal}/${quizInfo.questionTotal || TOTAL_LESSONS * 2}` : "Start with Lesson 1 when you are ready."}</div>
  `;

  const actions = tracker.querySelector(".lms-tracker-actions");
  if (info.furthestLesson > 0) {
    actions.append(createActionLink(`Continue Lesson ${info.furthestLesson}`, info.continueLesson.href, "button-primary"));
    if (info.nextLesson) {
      actions.append(createActionLink(`Open Lesson ${info.nextLesson.number}`, info.nextLesson.href, "button-secondary"));
    } else {
      actions.append(createActionLink("Open Summary", rootHref("course-summary.html"), "button-secondary"));
      actions.append(createActionLink("Start again from Lesson 1", lessonHref(1), "button-secondary"));
      actions.append(createActionLink("Open Certificate", rootHref("certificate.html"), "button-secondary"));
    }
  } else {
    actions.append(createActionLink("Start Lesson 1", lessonHref(1), "button-primary"));
    actions.append(createActionLink("Open Course Map", rootHref("index.html"), "button-secondary"));
  }

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "lms-text-button";
  editButton.textContent = "Edit name";
  editButton.addEventListener("click", () => openNameModal(state, meta, true));
  actions.append(editButton);

  if (info.furthestLesson > 0) {
    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "lms-text-button";
    resetButton.textContent = "Reset progress";
    resetButton.addEventListener("click", () => openResetModal(state, meta));
    actions.append(resetButton);
  }

  const quickTools = document.createElement("section");
  quickTools.className = "lms-sidebar-utilities";
  quickTools.innerHTML = `
    <h3>Quick tools</h3>
    <p>Jump back to the overview, revision, or final summary without losing your tracker progress.</p>
    ${renderQuickTools(state)}
  `;

  const nav = sidebar.querySelector(".sidebar-nav");
  if (nav) {
    nav.insertAdjacentElement("beforebegin", tracker);
    nav.insertAdjacentElement("afterend", quickTools);
  } else {
    sidebar.append(tracker, quickTools);
  }

  animateProgress(tracker, info.progressPercent);
}

function renderLessonExpansion(meta) {
  if (meta.type !== "lesson" || !meta.lesson) {
    return;
  }

  const panel = document.querySelector(".content .panel");
  if (!panel || panel.querySelector(".lms-lesson-expansion")) {
    return;
  }

  const lesson = meta.lesson;
  const phase = PHASES.find((item) => item.id === lesson.phaseId);
  const previousLesson = lesson.number > 1 ? LESSON_LOOKUP[lesson.number - 1] : null;
  const nextLesson = lesson.number < TOTAL_LESSONS ? LESSON_LOOKUP[lesson.number + 1] : null;
  const state = normaliseState(getStoredState());
  const savedNote = state.lessonNotes[String(lesson.number)] || "";
  const completed = isLessonComplete(state, lesson.number);
  const quiz = QUIZ_BANK[lesson.number] || [];
  const quizResult = getQuizResult(state, lesson.number);

  const wrapper = document.createElement("div");
  wrapper.className = "lms-lesson-expansion";
  wrapper.innerHTML = `
    <div class="two-up" style="margin-top: 16px;">
      <article class="card">
        <span class="tag">Educator Note</span>
        <h3 style="margin-top: 10px;">Why this lesson matters</h3>
        <p>${lesson.educatorNote}</p>
        <div class="callout"><strong>Real-world connection:</strong> ${lesson.realWorld}</div>
      </article>
      <article class="card">
        <span class="tag">Learning Outcomes</span>
        <h3 style="margin-top: 10px;">By the end of this lesson</h3>
        <ul>
          ${lesson.outcomes.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <p class="lms-phase-note">Course position: ${phase.title} • Lesson ${lesson.number} of ${TOTAL_LESSONS}</p>
      </article>
    </div>
    <div class="two-up" style="margin-top: 16px;">
      <article class="card">
        <span class="tag">Deep Dive</span>
        <h3 style="margin-top: 10px;">What to understand deeply</h3>
        <p>${lesson.deepDive || lesson.educatorNote}</p>
        <div class="lms-meta-row">
          <span class="lms-meta-pill">Difficulty: ${lesson.difficulty || "General"}</span>
          <span class="lms-meta-pill">Estimated time: ${lesson.estimatedMinutes || "15-25 min"}</span>
        </div>
      </article>
      <article class="card">
        <span class="tag">Key Terms</span>
        <h3 style="margin-top: 10px;">Words to remember</h3>
        <div class="lms-chip-list">
          ${(lesson.keyTerms || []).map((item) => `<span class="lms-study-chip">${item}</span>`).join("")}
        </div>
        <p class="lms-phase-note">If these words feel clear to you, the lesson is usually settling in properly.</p>
      </article>
    </div>
    <div class="two-up" style="margin-top: 16px;">
      <article class="card">
        <span class="tag">Practice</span>
        <h3 style="margin-top: 10px;">Try this after reading</h3>
        <p>${lesson.lab || "Explain the lesson back in your own words and connect it to a real Docker workflow."}</p>
      </article>
      <article class="card">
        <span class="tag">Common Mistakes</span>
        <h3 style="margin-top: 10px;">Watch out for these</h3>
        <ul>
          ${(lesson.mistakes || []).map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </article>
    </div>
    <article class="card lms-checkpoint-card" style="margin-top: 16px;">
      <span class="tag">Checkpoint</span>
      <h3 style="margin-top: 10px;">Before you move on</h3>
      <ul>
        ${lesson.checkpoint.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </article>
    <article class="card lms-quiz-card" style="margin-top: 16px;">
      <span class="tag">Quiz</span>
      <h3 style="margin-top: 10px;">Quick lesson quiz</h3>
      <p>Use this short check to test whether the main idea is clear before moving forward.</p>
      <div class="lms-quiz-list">
        ${quiz.map((item, index) => `
          <div class="lms-quiz-item" data-quiz-item="${index}">
            <strong class="lms-quiz-question">${index + 1}. ${item.prompt}</strong>
            <div class="lms-quiz-options">
              ${item.options.map((option, optionIndex) => `
                <label class="lms-quiz-option">
                  <input type="radio" name="quiz-${lesson.number}-${index}" value="${optionIndex}" />
                  <span>${option}</span>
                </label>
              `).join("")}
            </div>
            <p class="lms-quiz-feedback" data-quiz-feedback="${index}"></p>
          </div>
        `).join("")}
      </div>
      <div class="lms-tracker-actions" style="margin-top: 16px;">
        <button type="button" class="button button-primary" data-check-quiz>Check quiz</button>
        <span class="lms-phase-note" data-quiz-score>${quizResult ? `Best score saved: ${quizResult.score}/${quizResult.total}` : "No saved quiz score yet."}</span>
      </div>
    </article>
    <div class="two-up" style="margin-top: 16px;">
      <article class="card">
        <span class="tag">Lesson Tools</span>
        <h3 style="margin-top: 10px;">Track your progress</h3>
        <p>${completed ? "This lesson is marked complete in your browser tracker." : "Mark the lesson complete when you feel you can explain the main idea without rereading every line."}</p>
        <div class="lms-tracker-actions">
          <button type="button" class="button ${completed ? "button-secondary" : "button-primary"}" data-complete-toggle ${completed ? "disabled" : ""}>
            ${completed ? "Progress saved ✓" : "Mark as complete"}
          </button>
          <span class="lms-phase-note" data-complete-status>${completed ? "Reached lessons are auto-completed by the tracker." : "Completion is not marked yet."}</span>
        </div>
      </article>
      <article class="card">
        <span class="tag">Private Notes</span>
        <h3 style="margin-top: 10px;">Your lesson notes</h3>
        <textarea class="lms-notes-area" data-lesson-notes placeholder="Write your own short notes, doubts, or memory tricks here...">${savedNote}</textarea>
        <p class="lms-phase-note" data-notes-status>${savedNote ? "Notes loaded from local storage." : "Notes are saved only in this browser."}</p>
      </article>
    </div>
    <article class="card lms-lesson-nav-card" style="margin-top: 16px;">
      <span class="tag">Next Step</span>
      <h3 style="margin-top: 10px;">Keep the learning flow moving</h3>
      <p>${nextLesson ? `When you feel clear on Lesson ${lesson.number}, continue directly into Lesson ${nextLesson.number}: ${nextLesson.title}.` : "You reached the final lesson. Use the summary, certificate, or restart path to review the course again."}</p>
      <div class="lms-tracker-actions">
        ${previousLesson ? `<a class="button button-secondary" href="${previousLesson.href}">Back to Lesson ${previousLesson.number}</a>` : ""}
        ${nextLesson ? `<a class="button button-primary" href="${nextLesson.href}">Next Lesson ${nextLesson.number}</a>` : `<a class="button button-primary" href="${rootHref("course-summary.html")}">Open Summary</a>`}
        ${nextLesson ? `<a class="button button-secondary" href="${rootHref("revision.html")}">Open Revision</a>` : `<a class="button button-secondary" href="${rootHref("certificate.html")}">Open Certificate</a>`}
      </div>
    </article>
  `;

  panel.append(wrapper);

  const completeButton = wrapper.querySelector("[data-complete-toggle]");
  const completeStatus = wrapper.querySelector("[data-complete-status]");
  const notesArea = wrapper.querySelector("[data-lesson-notes]");
  const notesStatus = wrapper.querySelector("[data-notes-status]");
  const quizButton = wrapper.querySelector("[data-check-quiz]");
  const quizScore = wrapper.querySelector("[data-quiz-score]");

  completeButton.addEventListener("click", () => {
    const currentState = normaliseState(getStoredState());
    toggleLessonComplete(currentState, lesson.number);
    const nowCompleted = isLessonComplete(currentState, lesson.number);
    completeButton.textContent = nowCompleted ? "Progress saved ✓" : "Mark as complete";
    completeButton.className = `button ${nowCompleted ? "button-secondary" : "button-primary"}`;
    completeButton.disabled = nowCompleted;
    completeStatus.textContent = nowCompleted ? "Reached lessons are auto-completed by the tracker." : "Completion removed from local tracker.";
    refreshDynamicUi(currentState, meta);
  });

  notesArea.addEventListener("input", () => {
    const currentState = normaliseState(getStoredState());
    saveLessonNote(currentState, lesson.number, notesArea.value);
    notesStatus.textContent = `Saved locally • ${notesArea.value.length} characters`;
  });

  quizButton.addEventListener("click", () => {
    let score = 0;
    let hasMissingAnswer = false;

    quiz.forEach((item, index) => {
      const selected = wrapper.querySelector(`input[name="quiz-${lesson.number}-${index}"]:checked`);
      const feedback = wrapper.querySelector(`[data-quiz-feedback="${index}"]`);
      if (!selected) {
        feedback.textContent = "Choose one answer before checking this question.";
        feedback.className = "lms-quiz-feedback warning";
        hasMissingAnswer = true;
        return;
      }

      const chosen = Number(selected.value);
      if (chosen === item.answer) {
        score += 1;
        feedback.textContent = `Correct. ${item.explanation}`;
        feedback.className = "lms-quiz-feedback correct";
      } else {
        feedback.textContent = `Not quite. ${item.explanation}`;
        feedback.className = "lms-quiz-feedback incorrect";
      }
    });

    if (hasMissingAnswer) {
      quizScore.textContent = "Answer every question before saving a quiz result.";
      return;
    }

    const currentState = normaliseState(getStoredState());
    saveQuizResult(currentState, lesson.number, score, quiz.length);
    quizScore.textContent = `Best score saved: ${Math.max(score, getQuizResult(currentState, lesson.number)?.score || 0)}/${quiz.length}`;
    refreshDynamicUi(currentState, meta);
  });
}

function renderDashboard(state, meta) {
  if (meta.type === "lesson") {
    return;
  }

  document.querySelector(".lms-dashboard")?.remove();

  const content = document.querySelector(".content");
  if (!content) {
    return;
  }

  const info = getProgressInfo(state);
  const quizInfo = getQuizSummary(state);
  const dashboard = document.createElement("section");
  dashboard.className = "panel lms-dashboard";
  dashboard.innerHTML = `
    <div class="section-head">
      <div>
        <span class="tag">Personal Dashboard</span>
        <h2>${getGreetingPrefix()}, ${getFriendlyName(state)}</h2>
      </div>
      <p>This tracker uses local storage, so your lesson progress, theme choice, and name stay available when you come back later.</p>
    </div>
    <div class="three-up">
      <article class="card">
        <h3>Progress so far</h3>
        <p><strong data-progress-number>0%</strong> of the roadmap is complete based on your furthest lesson reached.</p>
        <div class="progress-track progress-track-lg">
          <div class="progress-fill" data-progress-fill style="width: 0%;"></div>
        </div>
        <p class="lms-phase-note">${info.completedCount} lessons marked complete • ${info.completedPercent}% completion score</p>
      </article>
      <article class="card">
        <h3>Current phase</h3>
        <p>${info.currentPhase.title}</p>
        <p class="lms-phase-note">${info.furthestLesson > 0 ? `Furthest lesson: ${info.furthestLesson}` : "Start with Lesson 1 to begin tracking."}</p>
      </article>
      <article class="card">
        <h3>Quiz record</h3>
        <p>${quizInfo.attempted ? `Saved quiz attempts: ${quizInfo.attempted}/${TOTAL_LESSONS}` : "No quiz attempts saved yet."}</p>
        <p class="lms-phase-note">${quizInfo.questionTotal ? `Best-score total: ${quizInfo.scoreTotal}/${quizInfo.questionTotal} • Perfect lesson quizzes: ${quizInfo.perfect}` : "Each lesson now includes a short quiz for active recall."}</p>
      </article>
      <article class="card">
        <h3>Continue plan</h3>
        <p>${info.nextLesson ? `Next recommended lesson: ${info.nextLesson.number}` : "You have reached the end of the current roadmap."}</p>
        <div class="lms-dashboard-actions"></div>
      </article>
    </div>
  `;

  const actionSlot = dashboard.querySelector(".lms-dashboard-actions");
  if (info.furthestLesson > 0) {
    actionSlot.append(createActionLink(`Continue Lesson ${info.furthestLesson}`, info.continueLesson.href, "button-primary"));
    if (info.nextLesson) {
      actionSlot.append(createActionLink(`Open Lesson ${info.nextLesson.number}`, info.nextLesson.href, "button-secondary"));
    } else {
      actionSlot.append(createActionLink("Open Summary", rootHref("course-summary.html"), "button-secondary"));
      actionSlot.append(createActionLink("Start Lesson 1 Again", lessonHref(1), "button-secondary"));
      actionSlot.append(createActionLink("Open Certificate", rootHref("certificate.html"), "button-secondary"));
    }
    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "button button-secondary";
    resetButton.textContent = "Reset tracker";
    resetButton.addEventListener("click", () => openResetModal(state, meta));
    actionSlot.append(resetButton);
  } else {
    actionSlot.append(createActionLink("Start Lesson 1", lessonHref(1), "button-primary"));
    actionSlot.append(createActionLink("Open Glossary", rootHref("glossary.html"), "button-secondary"));
  }

  const hero = content.querySelector(".hero");
  if (hero) {
    hero.insertAdjacentElement("afterend", dashboard);
  } else {
    content.insertAdjacentElement("afterbegin", dashboard);
  }

  animateProgress(dashboard, info.progressPercent);
}

function updateOverviewActions(state) {
  const heroButtons = document.querySelectorAll(".hero-actions .button");
  if (!heroButtons.length) {
    return;
  }

  const info = getProgressInfo(state);
  const primary = heroButtons[0];
  const secondary = heroButtons[1];

  if (primary) {
    primary.href = info.furthestLesson > 0 ? info.continueLesson.href : lessonHref(1);
    primary.textContent = info.furthestLesson > 0 ? `Continue Lesson ${info.furthestLesson}` : "Start Lesson 1";
  }

  if (secondary) {
    if (info.nextLesson) {
      secondary.href = info.nextLesson.href;
      secondary.textContent = `Open Lesson ${info.nextLesson.number}`;
    } else {
      secondary.href = rootHref("certificate.html");
      secondary.textContent = "Open Certificate";
    }
  }
}

function renderGlossaryPage(state, meta) {
  if (meta.type !== "glossary") {
    return;
  }

  const panel = document.querySelector(".content .panel");
  if (!panel) {
    return;
  }

  panel.innerHTML = `
    <div class="section-head">
      <div>
        <span class="tag">Glossary</span>
        <h1>Docker term glossary</h1>
      </div>
      <p>Use this searchable glossary to review the most important Docker and platform terms from the roadmap.</p>
    </div>
    <div class="three-up">
      <article class="card">
        <h3>Total terms</h3>
        <p><strong>${GLOSSARY_ENTRIES.length}</strong> linked terms collected across the course.</p>
      </article>
      <article class="card">
        <h3>Best use</h3>
        <p>Open this page when a lesson uses a word you recognize but cannot explain clearly yet.</p>
      </article>
      <article class="card">
        <h3>Study habit</h3>
        <p>Search a term, read its definition, then jump back to the linked lesson and see it in context.</p>
      </article>
    </div>
    <article class="card">
      <label class="lms-field-label" for="glossary-search">Search terms</label>
      <input id="glossary-search" class="lms-input" type="text" placeholder="Search by term or definition..." />
      <p class="lms-phase-note">This is useful when a lesson mentions a word you half-remember but want to check quickly.</p>
    </article>
    <div class="two-up lms-glossary-grid" style="margin-top: 16px;"></div>
  `;

  const search = panel.querySelector("#glossary-search");
  const grid = panel.querySelector(".lms-glossary-grid");

  function renderEntries(filter = "") {
    const query = filter.trim().toLowerCase();
    const entries = GLOSSARY_ENTRIES.filter((entry) => {
      const haystack = `${entry.term} ${entry.definition}`.toLowerCase();
      return !query || haystack.includes(query);
    });

    grid.innerHTML = entries.map((entry) => `
      <article class="card lms-glossary-card">
        <span class="tag">Term</span>
        <h3 style="margin-top: 10px;">${entry.term}</h3>
        <p>${entry.definition}</p>
        <div class="lms-chip-list">
          ${entry.lessons.map((lessonNumber) => `<a class="lms-study-chip" href="${lessonHref(lessonNumber)}">Lesson ${lessonNumber}</a>`).join("")}
        </div>
      </article>
    `).join("");

    if (!entries.length) {
      grid.innerHTML = `
        <article class="card">
          <h3>No glossary match</h3>
          <p>Try a simpler word such as container, volume, registry, scaling, or orchestration.</p>
        </article>
      `;
    }
  }

  renderEntries();
  search.addEventListener("input", () => renderEntries(search.value));
}

function renderCertificatePage(state, meta) {
  if (meta.type !== "certificate") {
    return;
  }

  const panel = document.querySelector(".content .panel");
  if (!panel) {
    return;
  }

  const info = getProgressInfo(state);
  const quizInfo = getQuizSummary(state);
  const unlocked = info.completedCount >= TOTAL_LESSONS;
  const completionDate = state.completedAt ? new Date(state.completedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "Not available yet";

  if (!unlocked) {
    panel.innerHTML = `
      <div class="section-head">
        <div>
          <span class="tag">Certificate</span>
          <h1>Certificate locked</h1>
        </div>
        <p>Finish the full lesson roadmap first, then this certificate will unlock automatically in your browser tracker.</p>
      </div>
      <div class="two-up">
        <article class="card">
          <h3>Current progress</h3>
          <p>You have completed ${info.completedCount} of ${TOTAL_LESSONS} lessons.</p>
          <div class="progress-track progress-track-lg">
            <div class="progress-fill" data-progress-fill style="width: 0%;"></div>
          </div>
          <div class="progress-inline">
            <strong data-progress-number>0%</strong>
            <span>Complete all lessons to unlock the certificate</span>
          </div>
        </article>
        <article class="card">
          <h3>How to unlock it</h3>
          <ul>
            <li>Continue the lessons until the roadmap reaches Lesson 30.</li>
            <li>Your tracker counts reached lessons automatically.</li>
            <li>Use the lesson quizzes and glossary to strengthen recall while you move through the roadmap.</li>
            <li>When the roadmap is fully complete, the certificate unlocks here and in the tracker actions.</li>
          </ul>
          <div class="lms-dashboard-actions">
            <a class="button button-primary" href="${info.furthestLesson > 0 ? info.continueLesson.href : lessonHref(1)}">${info.furthestLesson > 0 ? `Continue Lesson ${info.furthestLesson}` : "Start Lesson 1"}</a>
            <a class="button button-secondary" href="${rootHref("glossary.html")}">Open Glossary</a>
          </div>
        </article>
      </div>
    `;
    animateProgress(panel, info.completedPercent);
    return;
  }

  panel.innerHTML = `
    <div class="section-head">
      <div>
        <span class="tag">Certificate</span>
        <h1>Docker Learning Hub completion certificate</h1>
      </div>
      <p>This certificate is unlocked because the roadmap is fully completed in your browser tracker.</p>
    </div>
    <div class="lms-certificate">
      <div class="lms-certificate-badge">Completion badge unlocked</div>
      <h2>Certificate of Completion</h2>
      <p class="lms-certificate-sub">This certifies that</p>
      <h3>${getFriendlyName(state)}</h3>
      <p class="lms-certificate-sub">has completed the Docker Learning Hub roadmap</p>
      <div class="lms-certificate-meta">
        <div><strong>Lessons completed</strong><span>${TOTAL_LESSONS} / ${TOTAL_LESSONS}</span></div>
        <div><strong>Completion date</strong><span>${completionDate}</span></div>
        <div><strong>Quiz checkpoints</strong><span>${quizInfo.attempted} attempted • ${quizInfo.scoreTotal}/${quizInfo.questionTotal || TOTAL_LESSONS * 2} best-score total</span></div>
        <div><strong>Course path</strong><span>Beginner to architecture-level Docker learning</span></div>
      </div>
      <div class="lms-certificate-actions">
        <button type="button" class="button button-primary" data-print-certificate>Print certificate</button>
        <a class="button button-secondary" href="${rootHref("course-summary.html")}">Open summary</a>
      </div>
    </div>
  `;

  panel.querySelector("[data-print-certificate]")?.addEventListener("click", () => window.print());
}

function openNameModal(state, meta, isEditing = false) {
  document.querySelector(".lms-modal-backdrop")?.remove();

  const backdrop = document.createElement("div");
  backdrop.className = "lms-modal-backdrop";
  backdrop.innerHTML = `
    <div class="lms-modal-card" role="dialog" aria-modal="true" aria-labelledby="lms-name-title">
      <span class="tag">${isEditing ? "Update profile" : "Welcome"}</span>
      <h2 id="lms-name-title">${isEditing ? "Update your learner name" : "Let’s set up your learning tracker"}</h2>
      <p>${isEditing ? "Change the name shown in your tracker, greeting, and milestone messages." : "Enter your name once and this site will remember it in local storage, greet you by time of day, and track your lesson progress."}</p>
      <label class="lms-field-label" for="lms-name-input">Your name</label>
      <input id="lms-name-input" class="lms-input" type="text" maxlength="40" placeholder="Enter your name" value="${state.learnerName}" />
      <div class="lms-modal-actions">
        ${isEditing ? '<button type="button" class="button button-secondary" data-close-name>Cancel</button>' : ""}
        <button type="button" class="button button-primary" data-save-name>${isEditing ? "Save name" : "Start learning"}</button>
      </div>
    </div>
  `;

  document.body.append(backdrop);
  const input = backdrop.querySelector("#lms-name-input");
  input.focus();
  input.select();

  function saveName() {
    const value = input.value.trim();
    if (!value) {
      input.focus();
      input.classList.add("lms-input-error");
      return;
    }
    input.classList.remove("lms-input-error");
    state.learnerName = value;
    saveState(state);
    backdrop.remove();
    refreshDynamicUi(state, meta);
  }

  backdrop.querySelector("[data-save-name]").addEventListener("click", saveName);
  backdrop.querySelector("[data-close-name]")?.addEventListener("click", () => backdrop.remove());
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveName();
    }
  });
}

function openResetModal(state, meta) {
  document.querySelector(".lms-modal-backdrop")?.remove();

  const backdrop = document.createElement("div");
  backdrop.className = "lms-modal-backdrop";
  backdrop.innerHTML = `
    <div class="lms-modal-card" role="dialog" aria-modal="true" aria-labelledby="lms-reset-title">
      <span class="tag">Reset tracker</span>
      <h2 id="lms-reset-title">Restart your Docker course progress?</h2>
      <p>This will reset lesson progress, completed lessons, milestone popups, and saved lesson notes in this browser. Your name and theme will stay saved.</p>
      <div class="lms-modal-actions">
        <button type="button" class="button button-secondary" data-cancel-reset>Cancel</button>
        <button type="button" class="button button-primary" data-confirm-reset>Yes, reset and restart</button>
      </div>
    </div>
  `;

  document.body.append(backdrop);

  backdrop.querySelector("[data-cancel-reset]").addEventListener("click", () => backdrop.remove());
  backdrop.querySelector("[data-confirm-reset]").addEventListener("click", () => {
    const currentState = normaliseState(getStoredState());
    resetLearningProgress(currentState);
    window.location.href = rootHref("index.html");
  });
}

function maybeShowNamePrompt(state, meta) {
  if (!state.learnerName) {
    openNameModal(state, meta, false);
  }
}

function getMilestoneForState(state) {
  const furthest = state.furthestLesson;
  const eligible = PHASES.filter((phase) => furthest >= phase.end && !state.milestonesSeen.includes(phase.end));
  return eligible.length ? eligible[eligible.length - 1] : null;
}

function maybeShowMilestone(state, meta) {
  if (meta.type !== "lesson") {
    return;
  }

  const milestone = getMilestoneForState(state);
  if (!milestone) {
    return;
  }

  state.milestonesSeen.push(milestone.end);
  saveState(state);

  document.querySelector(".lms-celebration-backdrop")?.remove();

  const backdrop = document.createElement("div");
  backdrop.className = "lms-celebration-backdrop";
  backdrop.innerHTML = `
    <div class="lms-celebration-card" role="dialog" aria-modal="true">
      <div class="lms-burst">
        <span></span><span></span><span></span><span></span><span></span>
      </div>
      <span class="tag">Stage upgrade</span>
      <h2>Congratulations, ${getFriendlyName(state)}!</h2>
      <h3>${milestone.celebrationTitle}</h3>
      <p>${milestone.celebrationBody}</p>
      <div class="lms-celebration-actions">
        ${
          milestone.nextLesson
            ? `<a class="button button-primary" href="${lessonHref(milestone.nextLesson)}">Start Lesson ${milestone.nextLesson}</a>`
            : `<a class="button button-primary" href="${rootHref("certificate.html")}">Open certificate</a><a class="button button-secondary" href="${rootHref("course-summary.html")}">Open course summary</a>`
        }
        <button type="button" class="button button-secondary" data-close-celebration>Keep learning</button>
      </div>
    </div>
  `;

  document.body.append(backdrop);
  backdrop.querySelector("[data-close-celebration]").addEventListener("click", () => backdrop.remove());
}

function refreshDynamicUi(state, meta) {
  ensureSidebarUtilityLinks(meta);
  renderTopbarControls(state, meta);
  ensureMobileSidebarChrome();
  renderProgressCard(state);
  renderTrackerCard(state, meta);
  syncSidebarStatuses(state);
  renderLessonExpansion(meta);
  renderDashboard(state, meta);
  renderGlossaryPage(state, meta);
  renderCertificatePage(state, meta);
  updateOverviewActions(state);
}

function init() {
  const meta = getPageMeta();
  const state = normaliseState(getStoredState());

  visitCurrentPage(state, meta);
  applyTheme(state);
  refreshDynamicUi(state, meta);
  maybeShowNamePrompt(state, meta);

  window.setTimeout(() => {
    maybeShowMilestone(state, meta);
  }, 500);
}

document.addEventListener("DOMContentLoaded", init);
