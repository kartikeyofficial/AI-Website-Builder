/**
 * KUMAR KARTIKEY - FULL STACK JAVA DEVELOPER PORTFOLIO
 * High-performance, vanilla JavaScript interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC TYPING EFFECT FOR HERO
  initTypingEffect();

  // 2. THEME SWITCHER (Dark/Light mode with localStorage persistence)
  initThemeSwitcher();

  // 3. NAVBAR SCROLL & ACTIVE LINK TRACKING
  initNavScroll();

  // 4. MOBILE MENU TOGGLE
  initMobileMenu();

  // 5. REST API SANDBOX SIMULATOR (Spring Boot DispatcherServlet Mock)
  initApiSandbox();

  // 6. SKILLS FILTERING
  initSkillsFilter();

  // 7. PROJECTS FILTERING
  initProjectsFilter();

  // 8. CODE SNIPPET VIEWER
  initCodeSnippets();

  // 9. PROJECT DETAILS MODAL
  initProjectModals();

  // 10. RESUME MODAL & PRINT
  initResumeModal();

  // 11. CONTACT FORM HANDLER
  initContactForm();

  // 12. BACK TO TOP BUTTON
  initBackToTop();

  // 13. HERO CODE COPY BUTTON
  initHeroCopy();

  // 14. FOOTER YEAR
  document.getElementById('current-year').textContent = new Date().getFullYear();
});

/* ==========================================================================
   1. TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typedTextEl = document.getElementById('typed-text');
  if (!typedTextEl) return;

  const roles = [
    'Full Stack Java Developer',
    'Spring Boot & Microservices Specialist',
    'Distributed Systems & Kafka Enthusiast',
    'Cloud-Native Java 21 Architect',
    'Robust Backend + Clean Frontend Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 95;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Short pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   2. THEME SWITCHER
   ========================================================================== */
function initThemeSwitcher() {
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = localStorage.getItem('kartikey-theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('kartikey-theme', newTheme);
      showToast(`Switched to ${newTheme} mode`, 'info');
    });
  }
}

/* ==========================================================================
   3. NAVBAR SCROLL & ACTIVE LINK
   ========================================================================== */
function initNavScroll() {
  const header = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow and shrink
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting based on scroll position
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-actions-mobile .btn');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   5. REST API SANDBOX SIMULATOR (Spring Boot Simulator)
   ========================================================================== */
function initApiSandbox() {
  const endpointBtns = document.querySelectorAll('.endpoint-btn');
  const currentMethodTag = document.getElementById('current-method');
  const apiUrlInput = document.getElementById('api-url-input');
  const sendRequestBtn = document.getElementById('send-request-btn');
  const requestPayloadBox = document.getElementById('request-payload-box');
  const requestBodyInput = document.getElementById('request-body-input');
  const statusBadge = document.getElementById('status-badge');
  const resTimeEl = document.getElementById('res-time');
  const resSizeEl = document.getElementById('res-size');
  const jsonOutput = document.getElementById('json-output');

  // Response tab toggling (body vs headers)
  const resTabs = document.querySelectorAll('.res-tab');
  const resBodyView = document.getElementById('response-body-view');
  const resHeadersView = document.getElementById('response-headers-view');

  resTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      resTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const target = tab.getAttribute('data-res-tab');
      if (target === 'body') {
        resBodyView.style.display = 'block';
        resHeadersView.style.display = 'none';
      } else {
        resBodyView.style.display = 'none';
        resHeadersView.style.display = 'block';
      }
    });
  });

  // Simulated Database & Endpoints
  const mockEndpoints = {
    profile: {
      method: 'GET',
      path: '/api/v1/developer',
      execute: () => ({
        developer: "Kumar Kartikey",
        role: "Full Stack Java Developer",
        specialization: ["Spring Boot 3", "Microservices Architecture", "Kafka", "Reactive Systems"],
        yearsOfExperience: 3,
        primaryLanguages: ["Java 17/21", "JavaScript ES6+", "SQL"],
        availability: "Open to Full-Time Engineering Roles & Strategic Contracts",
        contactEmail: "kartikey.dev.java@gmail.com",
        location: "Delhi NCR / Worldwide Remote",
        status: "ACTIVE_AND_DEPLOYABLE"
      })
    },
    skills: {
      method: 'GET',
      path: '/api/v1/skills',
      execute: () => ({
        backendFrameworks: [
          { name: "Spring Boot", level: "Expert", features: ["MVC", "Data JPA", "Security", "WebFlux"] },
          { name: "Spring Cloud", level: "Advanced", features: ["Gateway", "Eureka", "Config Server", "Resilience4j"] },
          { name: "Apache Kafka", level: "Advanced", features: ["Consumer Groups", "Partitions", "Event Streams"] },
          { name: "Hibernate / JPA", level: "Expert", features: ["Criteria API", "Lazy Loading Optimization"] }
        ],
        frontendStack: ["JavaScript ES6+", "HTML5 Semantic", "CSS3 / Grid / Flexbox", "React.js", "REST Client"],
        databases: ["PostgreSQL", "MySQL", "Redis (In-memory Caching)", "MongoDB"],
        cloudDevOps: ["Docker Multi-Stage", "Kubernetes", "AWS (EC2, S3, RDS)", "CI/CD GitHub Actions", "Maven"]
      })
    },
    projects: {
      method: 'GET',
      path: '/api/v1/projects',
      execute: () => ({
        totalFeatured: 4,
        projects: [
          {
            title: "PayFlow: Enterprise Distributed Payment Engine",
            stack: ["Java 21", "Spring Boot 3", "Kafka", "PostgreSQL", "Redis", "Resilience4j"],
            highlights: "Implemented transactional outbox pattern to eliminate message loss across 10k TPS."
          },
          {
            title: "ShopMatrix: Cloud-Native Micro-Commerce",
            stack: ["Spring Boot", "Spring Security JWT", "Elasticsearch", "Vanilla JS", "MySQL"],
            highlights: "Microservices with centralized auth and sub-50ms elasticsearch product queries."
          },
          {
            title: "CloudPulse: Reactive Metrics & Log Aggregator",
            stack: ["Spring WebFlux", "WebSockets", "Prometheus", "TimescaleDB"],
            highlights: "Non-blocking event streams piping real-time system heartbeats to UI."
          },
          {
            title: "TeamSync: Agile Task Orchestrator",
            stack: ["Java 17", "Spring Boot", "Hibernate", "Vanilla JS Kanban", "PostgreSQL"],
            highlights: "SaaS workflow app with Quartz scheduler background jobs and audit logging."
          }
        ]
      })
    },
    health: {
      method: 'GET',
      path: '/actuator/health',
      execute: () => ({
        status: "UP",
        components: {
          database: { status: "UP", details: { database: "PostgreSQL 16", connection: "HikariPool-1 - ACTIVE" } },
          redisCache: { status: "UP", details: { clusterNodes: 3, memoryUsed: "48.2MB" } },
          kafkaBroker: { status: "UP", details: { connectedBrokers: 3, consumerLag: 0 } },
          diskSpace: { status: "UP", details: { freeBytes: 15482390212, threshold: 10485760 } }
        },
        uptimeSeconds: 849204,
        javaVersion: "21.0.3 (Eclipse Adoptium)"
      })
    },
    hire: {
      method: 'POST',
      path: '/api/v1/hire-request',
      execute: (body) => {
        let sender = "Tech Recruiter";
        try {
          const parsed = JSON.parse(body);
          if (parsed.senderName) sender = parsed.senderName;
        } catch (e) {
          // ignore
        }
        return {
          status: "SUCCESS_201_CREATED",
          message: `Thank you, ${sender}! Your inquiry has been queued in Kumar Kartikey's priority inbox.`,
          queueId: "MSG-" + Math.floor(100000 + Math.random() * 900000),
          estimatedResponseTime: "< 24 Hours",
          notificationDispatched: true
        };
      }
    }
  };

  let activeEndpointKey = 'profile';

  function renderEndpoint(key) {
    const config = mockEndpoints[key];
    activeEndpointKey = key;

    // Update UI elements
    apiUrlInput.value = config.path;
    currentMethodTag.textContent = config.method;

    if (config.method === 'POST') {
      currentMethodTag.classList.add('post');
      requestPayloadBox.style.display = 'block';
    } else {
      currentMethodTag.classList.remove('post');
      requestPayloadBox.style.display = 'none';
    }

    // Trigger request
    executeRequest();
  }

  function executeRequest() {
    const config = mockEndpoints[activeEndpointKey];
    statusBadge.textContent = 'Processing...';
    statusBadge.style.background = 'rgba(245, 158, 11, 0.2)';
    statusBadge.style.color = '#f59e0b';
    jsonOutput.textContent = '// Dispatching request through Spring DispatcherServlet...';

    // Simulate real microservice latency
    const simulatedLatency = Math.floor(Math.random() * 45) + 20;

    setTimeout(() => {
      let result;
      if (config.method === 'POST') {
        result = config.execute(requestBodyInput.value);
        statusBadge.textContent = '201 CREATED';
      } else {
        result = config.execute();
        statusBadge.textContent = '200 OK';
      }

      statusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
      statusBadge.style.color = '#34d399';

      const jsonStr = JSON.stringify(result, null, 2);
      jsonOutput.textContent = jsonStr;

      resTimeEl.textContent = `${simulatedLatency}ms`;
      resSizeEl.textContent = `${(new Blob([jsonStr]).size / 1024).toFixed(2)} KB`;
    }, 280);
  }

  endpointBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      endpointBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-endpoint');
      renderEndpoint(key);
    });
  });

  if (sendRequestBtn) {
    sendRequestBtn.addEventListener('click', () => {
      executeRequest();
      showToast('Dispatched request to Spring Boot backend', 'info');
    });
  }

  // Initial execution
  renderEndpoint('profile');
}

/* ==========================================================================
   6. SKILLS FILTERING
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter-nav .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. PROJECTS FILTERING
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.projects-filter .p-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-pfilter');

      projectCards.forEach(card => {
        const tags = card.getAttribute('data-tags') || '';
        if (filter === 'all' || tags.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. CODE SNIPPET VIEWER
   ========================================================================== */
function initCodeSnippets() {
  const snipBtns = document.querySelectorAll('.snip-btn');
  const codeView = document.getElementById('code-snippet-view');
  const titleView = document.getElementById('snippet-title');
  const copyBtn = document.getElementById('copy-snippet-btn');

  const snippets = {
    security: {
      title: "SecurityConfig.java (Spring Security 6+ Stateless JWT)",
      code: `@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;
    private final UserDetailsService userDetailsService;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter, UserDetailsService userDetailsService) {
        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**", "/actuator/health").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .authenticationProvider(authProvider())
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public AuthenticationProvider authProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(new BCryptPasswordEncoder());
        return provider;
    }
}`
    },
    service: {
      title: "PaymentService.java (Resilience4j Circuit Breaker & Idempotency)",
      code: `@Service
@Slf4j
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final KafkaEventPublisher kafkaPublisher;
    private final RedisTemplate<String, Object> redisTemplate;

    @Transactional
    @CircuitBreaker(name = "paymentEngine", fallbackMethod = "handlePaymentFallback")
    public PaymentResponse processTransaction(PaymentRequest request) {
        // Idempotency check with Redis Distributed Lock
        String idempotencyKey = "PAY_KEY:" + request.getIdempotencyKey();
        Boolean acquired = redisTemplate.opsForValue()
            .setIfAbsent(idempotencyKey, "LOCKED", Duration.ofMinutes(5));

        if (Boolean.FALSE.equals(acquired)) {
            throw new DuplicateTransactionException("Transaction is currently processing or already executed.");
        }

        log.info("Processing ledger settlement for account: {}", request.getAccountId());
        Payment payment = Payment.fromRequest(request);
        paymentRepository.save(payment);

        // Publish Outbox Event to Apache Kafka
        kafkaPublisher.publish("payment.completed.v1", new PaymentEvent(payment.getId(), payment.getAmount()));

        return PaymentResponse.of(payment, "SETTLED");
    }

    public PaymentResponse handlePaymentFallback(PaymentRequest request, Throwable t) {
        log.error("Downstream gateway failure. Triggering resilient queue. Reason: {}", t.getMessage());
        return PaymentResponse.builder()
            .status("QUEUED_FOR_RETRY")
            .message("Service under peak load, transaction securely buffered.")
            .build();
    }
}`
    },
    kafka: {
      title: "KafkaEventPublisher.java (Transactional Event Streaming)",
      code: `@Component
@Slf4j
@RequiredArgsConstructor
public class KafkaEventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void publish(String topic, Object payload) {
        String eventKey = UUID.randomUUID().toString();

        CompletableFuture<SendResult<String, Object>> future = 
            kafkaTemplate.send(topic, eventKey, payload);

        future.whenComplete((result, ex) -> {
            if (ex == null) {
                log.info("Event successfully written to topic [{}] partition [{}] at offset [{}]",
                    topic,
                    result.getRecordMetadata().partition(),
                    result.getRecordMetadata().offset());
            } else {
                log.error("Critical Kafka Producer Error on topic [{}]: {}", topic, ex.getMessage(), ex);
                // Trigger dead letter queue or local durable outbox retry
            }
        });
    }
}`
    }
  };

  let currentKey = 'security';

  function displaySnippet(key) {
    currentKey = key;
    const snip = snippets[key];
    if (!snip) return;

    titleView.textContent = snip.title;
    codeView.textContent = snip.code;
  }

  snipBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      snipBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-snip');
      displaySnippet(key);
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = snippets[currentKey]?.code || '';
      navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied to clipboard!', 'success');
      }).catch(() => {
        showToast('Failed to copy code.', 'error');
      });
    });
  }

  // Initial code load
  displaySnippet('security');
}

/* ==========================================================================
   9. PROJECT DETAILS MODAL
   ========================================================================== */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const overlay = document.getElementById('proj-modal-overlay');
  const closeBtn = document.getElementById('pmodal-close-btn');
  const modalTitle = document.getElementById('pmodal-title');
  const modalBody = document.getElementById('pmodal-body');
  const openBtns = document.querySelectorAll('.open-modal-btn');

  const projectDetails = {
    fintech: {
      title: "PayFlow: Enterprise Distributed Payment Engine",
      tech: ["Java 21", "Spring Boot 3", "Apache Kafka", "PostgreSQL", "Redis", "Resilience4j", "Docker"],
      html: `
        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--accent-amber); margin-bottom: 0.5rem; font-size: 1rem;">Architectural Overview</h4>
          <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">
            Engineered an event-driven payment processing pipeline designed for extreme fault-tolerance. 
            The system isolates account debiting, ledger reconciliation, fraud rule heuristics, and third-party bank webhooks 
            into decoupled microservices communicating through Kafka topics.
          </p>
        </div>
        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 0.5rem; font-size: 1rem;">Engineering Highlights & Solved Problems</h4>
          <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            <li><strong>Transactional Outbox Pattern:</strong> Prevented dual-write hazards between relational database commits and Kafka messages.</li>
            <li><strong>Idempotency with Redis:</strong> Enforced distributed locks to eliminate double-charge risks during high network jitter.</li>
            <li><strong>Circuit Breaker Resilience:</strong> Configured Resilience4j circuit breakers with graceful fallback to retry dead-letter queues.</li>
            <li><strong>Throughput:</strong> Stress-tested with JMeter up to 10,000 requests/sec with average sub-45ms roundtrip latencies.</li>
          </ul>
        </div>
      `
    },
    ecommerce: {
      title: "ShopMatrix: Cloud-Native Micro-Commerce",
      tech: ["Spring Boot", "Spring Cloud Gateway", "Spring Security", "Elasticsearch", "MySQL", "JavaScript ES6"],
      html: `
        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--accent-amber); margin-bottom: 0.5rem; font-size: 1rem;">System Architecture</h4>
          <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">
            A microservices e-commerce platform incorporating Spring Cloud Gateway for rate limiting and SSL termination, 
            an independent Auth Server issuing cryptographic JWT tokens, and an Elasticsearch cluster for lightning-fast product queries.
          </p>
        </div>
        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 0.5rem; font-size: 1rem;">Key Capabilities</h4>
          <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            <li>Fuzzy search engine providing product autocompletion in under 30 milliseconds.</li>
            <li>Role-Based Access Control (RBAC) protecting admin dashboards, warehouse inventories, and customer profiles.</li>
            <li>Optimistic locking on inventory quantities preventing overselling during flash flash sales.</li>
          </ul>
        </div>
      `
    },
    telemetry: {
      title: "CloudPulse: Reactive Metrics & Log Aggregator",
      tech: ["Java WebFlux", "Reactive Streams", "WebSockets", "Prometheus", "TimescaleDB", "Tailwind CSS"],
      html: `
        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--accent-amber); margin-bottom: 0.5rem; font-size: 1rem;">Reactive Non-Blocking Engine</h4>
          <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">
            Built on top of Project Reactor and Spring WebFlux to ingest high-frequency server diagnostic events 
            without tying up thread pools. Live metrics are pushed via full-duplex WebSockets directly to the web dashboard.
          </p>
        </div>
        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 0.5rem; font-size: 1rem;">Tech Highlights</h4>
          <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            <li>Zero-allocation reactive pipeline handling 40,000 log events/sec on modest JVM hardware.</li>
            <li>Dynamic anomaly alerts triggering webhook dispatches to Slack and email.</li>
            <li>Time-series hypertable compression in TimescaleDB cutting disk utilization by 65%.</li>
          </ul>
        </div>
      `
    },
    taskmaster: {
      title: "TeamSync: Agile Task & Sprint Orchestrator",
      tech: ["Java 17", "Spring Boot", "Hibernate/JPA", "Vanilla JavaScript", "PostgreSQL", "Quartz Scheduler"],
      html: `
        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--accent-amber); margin-bottom: 0.5rem; font-size: 1rem;">Product & Architecture</h4>
          <p style="font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary);">
            A high-performance sprint collaboration workspace featuring fluid drag-and-drop Kanban boards, 
            fine-grained project permissions, and automated background jobs orchestrated by Quartz Scheduler.
          </p>
        </div>
        <div style="margin-bottom: 1.25rem;">
          <h4 style="color: var(--accent-cyan); margin-bottom: 0.5rem; font-size: 1rem;">Key Highlights</h4>
          <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            <li>Zero frontend frameworks needed: pure Vanilla JavaScript drag-and-drop with optimistic UI updates.</li>
            <li>Audited JPA entity history tracking every ticket movement and description mutation.</li>
            <li>Automated nightly email digest generation with Spring JavaMailSender and Thymeleaf templates.</li>
          </ul>
        </div>
      `
    }
  };

  function openProjectModal(key) {
    const data = projectDetails[key];
    if (!data) return;

    modalTitle.textContent = data.title;

    let techTagsHtml = '<div class="pmodal-tech-list">';
    data.tech.forEach(t => {
      techTagsHtml += `<span>${t}</span>`;
    });
    techTagsHtml += '</div>';

    modalBody.innerHTML = techTagsHtml + data.html;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectKey = btn.getAttribute('data-project');
      openProjectModal(projectKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
  if (overlay) overlay.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}

/* ==========================================================================
   10. RESUME MODAL & PRINT
   ========================================================================== */
function initResumeModal() {
  const resumeBtn = document.getElementById('open-resume-btn');
  const modal = document.getElementById('resume-modal');
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');
  const printBtn = document.getElementById('print-resume-btn');
  const hireCta = document.getElementById('modal-hire-cta');

  if (!modal) return;

  function openResume() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (resumeBtn) resumeBtn.addEventListener('click', openResume);
  if (closeBtn) closeBtn.addEventListener('click', closeResume);
  if (overlay) overlay.addEventListener('click', closeResume);
  if (hireCta) hireCta.addEventListener('click', closeResume);

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeResume();
    }
  });
}

/* ==========================================================================
   11. CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('form-submit-btn');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset error messages
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('subject-error').textContent = '';
    document.getElementById('message-error').textContent = '';

    let isValid = true;

    if (!nameInput.value.trim()) {
      document.getElementById('name-error').textContent = 'Please enter your name.';
      isValid = false;
    }

    if (!emailInput.value.trim()) {
      document.getElementById('email-error').textContent = 'Please enter your email.';
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      document.getElementById('email-error').textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!subjectInput.value.trim()) {
      document.getElementById('subject-error').textContent = 'Please provide a subject.';
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      document.getElementById('message-error').textContent = 'Please enter your message.';
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      document.getElementById('message-error').textContent = 'Message should be at least 10 characters long.';
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending message
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      showToast('Thank you! Your message has been sent to Kumar Kartikey.', 'success');
    }, 900);
  });
}

/* ==========================================================================
   12. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   13. HERO CODE COPY
   ========================================================================== */
function initHeroCopy() {
  const heroCopyBtn = document.getElementById('hero-copy-btn');
  if (!heroCopyBtn) return;

  heroCopyBtn.addEventListener('click', () => {
    const javaCode = `@RestController
@RequestMapping("/api/v1/developer")
public class DeveloperController {

    @GetMapping("/profile")
    public ResponseEntity<DeveloperProfile> getProfile() {
        return ResponseEntity.ok(
            DeveloperProfile.builder()
                .name("Kumar Kartikey")
                .role("Full Stack Java Developer")
                .coreBackend(List.of("Java 21", "Spring Boot", "Kafka"))
                .databases(List.of("PostgreSQL", "Redis", "MongoDB"))
                .frontend(List.of("JavaScript", "HTML5/CSS3", "REST"))
                .status("READY_TO_DEPLOY")
                .build()
        );
    }
}`;

    navigator.clipboard.writeText(javaCode).then(() => {
      showToast('DeveloperController.java copied!', 'success');
    }).catch(() => {
      showToast('Failed to copy snippet.', 'error');
    });
  });
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let icon = 'fa-circle-info';
  if (type === 'success') icon = 'fa-circle-check';
  if (type === 'error') icon = 'fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span class="toast-msg">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3500);
}
