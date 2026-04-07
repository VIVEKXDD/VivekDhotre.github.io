import './style.css';
import angular from 'angular';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

// --- 0. Smooth Scrolling Engine (Lenis) ---
const lenis = new Lenis({
  lerp: 0.1, // Adjusts smoothness
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// --- 1. Spline Interactivity & Parallax ---
document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect for Spline Viewer based on mouse position
    const viewer = document.querySelector('spline-viewer');
    if (viewer) {
        document.addEventListener("mousemove", (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 15;
            const y = (e.clientY / window.innerHeight - 0.5) * 15;
            // Apply slight rotation for depth and parallax
            viewer.style.transform = `scale(1.05) rotateY(${x}deg) rotateX(${-y}deg)`;
        });
    }

    // --- Hero Animations ---
    const tl = gsap.timeline();
    // Start after a slight delay to ensure font loads
    setTimeout(() => {
        tl.fromTo('.hero-name-first', 
            { opacity: 0, x: -100 }, 
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
        )
        .fromTo('.hero-name-last', 
            { opacity: 0, filter: 'blur(20px) drop-shadow(0 0 0px #bc13fe)' }, 
            { opacity: 1, filter: 'blur(0px) drop-shadow(0 0 15px #bc13fe)', duration: 1, ease: 'power2.out' },
            "-=0.5"
        )
        .fromTo('.hero-tagline',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
            "-=0.3"
        )
        .fromTo('.hero-ctas',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
            "-=0.5"
        )
        .fromTo('.hero-hud-1, .hero-hud-2, .hero-hud-3',
            { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1, stagger: 0.2, ease: 'back.out(1.7)' },
            "-=0.5"
        );

        // Continuous floating for HUDs
        gsap.to('.hero-hud-1', { y: "-=15", duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        gsap.to('.hero-hud-2', { y: "+=12", x: "-=5", duration: 4.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        gsap.to('.hero-hud-3', { y: "-=10", x: "+=8", duration: 3.8, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    }, 500);

    // Initial background particles
    createBackgroundParticles();
});

// Floating background particles
function createBackgroundParticles() {
    const container = document.getElementById('canvas-container');
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'absolute rounded-full bg-white opacity-[0.03] pointer-events-none z-10';
        const size = Math.random() * 4 + 1;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        container.appendChild(p);

        gsap.to(p, {
            y: "-=100",
            x: `+=${(Math.random() - 0.5) * 50}`,
            opacity: 0,
            duration: 10 + Math.random() * 20,
            repeat: -1,
            ease: 'none',
            delay: -Math.random() * 20
        });
    }
}

// --- 2. AngularJS Setup ---
const portfolioApp = angular.module('portfolioApp', []);

portfolioApp.controller('MainCtrl', ['$scope', function($scope) {
  $scope.projects = [
    {
      title: 'CERTGUARD',
      link: 'https://github.com/VIVEKXDD/CertiGuard',
      tech: 'Next.js, React, Tailwind, Firebase, Genkit, PKI',
      problem: 'Academic certificate fraud.',
      approach: 'PKI-based hashing, dual-signature verification, AI-driven OCR, and blockchain-inspired hash chains.',
      results: 'Eliminated manual verification, tamper-proof authentication.'
    },
    {
      title: 'ClarityLegal',
      link: 'https://github.com/VIVEKXDD/CertiLegal',
      tech: 'Python, Scikit-learn, FastAPI, Next.js, Gemini',
      problem: 'Manual legal document analysis.',
      approach: 'Trained TF-IDF + Logistic Regression on 10.5k documents, improved with Gemini LLM for ambiguous cases, RAG search.',
      results: '97.8% classical model accuracy, 15ms latency vs 1.2s LLM latency.'
    },
    {
      title: 'NEXUS',
      link: 'https://github.com/VIVEKXDD/nexus1',
      tech: 'Python, LangGraph, OpenAI GPT-4o, Streamlit',
      problem: 'Manual payment anomaly resolution.',
      approach: 'LangGraph-powered multi-agent system, 30-sec auto-rollback circuit breakers, continuous learning loop.',
      results: 'Zero-risk reversible interventions, 90K/min strict token budget optimization.'
    }
  ];

  $scope.clusteredSkills = [
    // AI/ML - Orbit 1
    { name: 'PyTorch', category: 'AI/ML', proficiency: 'Advanced', desc: 'Deep Learning models' },
    { name: 'TensorFlow', category: 'AI/ML', proficiency: 'Intermediate', desc: 'Neural Networks' },
    { name: 'LangGraph', category: 'AI/ML', proficiency: 'Advanced', desc: 'Agentic workflows' },
    { name: 'Scikit-learn', category: 'AI/ML', proficiency: 'Advanced', desc: 'Classical ML' },
    { name: 'NLP & LLMs', category: 'AI/ML', proficiency: 'Advanced', desc: 'Text generation, RAG' },
    
    // Development - Orbit 2
    { name: 'Python', category: 'Development', proficiency: 'Advanced', desc: 'Core logic & Backend' },
    { name: 'Next.js', category: 'Development', proficiency: 'Advanced', desc: 'Fullstack React' },
    { name: 'AngularJS', category: 'Development', proficiency: 'Intermediate', desc: 'Web Apps' },
    { name: 'TailwindCSS', category: 'Development', proficiency: 'Advanced', desc: 'Styling engine' },
    { name: 'GSAP', category: 'Development', proficiency: 'Intermediate', desc: 'Advanced Web Animations' },

    // Data & Tools - Orbit 3
    { name: 'Google Cloud', category: 'Data & Tools', proficiency: 'Advanced', desc: 'Cloud Infra' },
    { name: 'Firebase', category: 'Data & Tools', proficiency: 'Advanced', desc: 'NoSQL & Auth' },
    { name: 'SQL', category: 'Data & Tools', proficiency: 'Intermediate', desc: 'Relational DBs' },
    { name: 'Docker', category: 'Data & Tools', proficiency: 'Intermediate', desc: 'Containerization' },
    { name: 'FastAPI', category: 'Data & Tools', proficiency: 'Advanced', desc: 'High-perf microservices' }
  ];

  $scope.scrollTo = function(id) {
    gsap.to(window, { duration: 1, scrollTo: `#${id}`, ease: "power3.inOut" });
  };
}]);

// --- Footer Controller ---
portfolioApp.controller('FooterCtrl', ['$scope', '$timeout', function($scope, $timeout) {
  $scope.copySuccess = null;

  $scope.copyText = function(text, type) {
    navigator.clipboard.writeText(text).then(() => {
      $scope.$apply(() => {
        $scope.copySuccess = type;
        
        // Bounce effect
        gsap.fromTo(`#${type}-text`, 
          { y: -5, color: '#bc13fe' }, 
          { y: 0, color: 'white', duration: 0.5, ease: 'bounce.out' }
        );

        $timeout(() => {
          $scope.copySuccess = null;
        }, 2000);
      });
    });
  };

  // Footer Scroll Animation
  setTimeout(() => {
    gsap.from('.footer-content', {
      scrollTrigger: {
        trigger: '#footer',
        start: 'top 95%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, 100);
}]);

// --- 3. Antigravity/Hover Engines ---
portfolioApp.directive('antigravityCard', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      $timeout(() => {
        const el = element[0];
        
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out'
        });

        const floatAnim = gsap.to(el, {
          y: "-=8",
          duration: 2 + Math.random(),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });

        el.addEventListener('mouseenter', () => {
          floatAnim.pause();
          gsap.to(el, { scale: 1.02, y: -10, duration: 0.3, ease: 'power2.out' });
        });

        el.addEventListener('mouseleave', () => {
          gsap.to(el, { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
          floatAnim.play();
        });
      }, 0);
    }
  };
}]);

portfolioApp.directive('skillConstellation', ['$timeout', function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      $timeout(() => {
        const container = element[0];
        const nodes = container.querySelectorAll('.skill-node');
        const svgLines = document.getElementById('skills-lines');
        const coreNode = container.querySelector('.core-intelligence-node');
        
        const containerRect = container.getBoundingClientRect();
        const cx = containerRect.width / 2;
        const cy = containerRect.height / 2;

        const clusters = {
            'AI/ML': { radius: 140, angleOffset: 0, color: '#00f3ff', nodes: [] },
            'Development': { radius: 240, angleOffset: Math.PI/2, color: '#bc13fe', nodes: [] },
            'Data & Tools': { radius: 340, angleOffset: Math.PI, color: '#22c55e', nodes: [] }
        };

        // Group nodes
        nodes.forEach(node => {
           const scopeData = angular.element(node).scope().skill;
           if(clusters[scopeData.category]) {
               clusters[scopeData.category].nodes.push(node);
           }
        });

        const nodeObjects = [];

        // Distribute nodes and create lines
        Object.keys(clusters).forEach(cat => {
            const cluster = clusters[cat];
            const numNodes = cluster.nodes.length;
            const angleStep = (Math.PI * 2) / numNodes;

            cluster.nodes.forEach((node, i) => {
                const angle = i * angleStep + cluster.angleOffset + Math.random() * 0.5;
                const x = cx + Math.cos(angle) * cluster.radius - node.offsetWidth / 2;
                const y = cy + Math.sin(angle) * cluster.radius - node.offsetHeight / 2;

                gsap.set(node, { left: x, top: y });

                // Create SVG line from core to node
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', cx);
                line.setAttribute('y1', cy);
                line.setAttribute('x2', x + node.offsetWidth / 2);
                line.setAttribute('y2', y + node.offsetHeight / 2);
                line.setAttribute('stroke', cluster.color);
                line.setAttribute('stroke-width', '1');
                line.setAttribute('stroke-dasharray', '4 4');
                line.setAttribute('opacity', '0.2');
                svgLines.appendChild(line);

                // Continuous subtle floating
                const floatAnim = gsap.to(node, {
                    x: `+=${(Math.random()-0.5)*15}`,
                    y: `+=${(Math.random()-0.5)*15}`,
                    duration: 3 + Math.random() * 2,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    onUpdate: () => {
                         // Update line endpoint
                         const trans = gsap.getProperty(node, "x") || 0;
                         const transY = gsap.getProperty(node, "y") || 0;
                         line.setAttribute('x2', x + node.offsetWidth / 2 + trans);
                         line.setAttribute('y2', y + node.offsetHeight / 2 + transY);
                    }
                });

                // Line pulse animation
                gsap.to(line, {
                    strokeDashoffset: -20,
                    duration: 2,
                    repeat: -1,
                    ease: "linear"
                });

                nodeObjects.push({ el: node, anim: floatAnim });
            });
        });

        // Slight parallax on entire container
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX - rect.left - cx;
            const mouseY = e.clientY - rect.top - cy;

            gsap.to(nodes, {
                x: (i) => mouseX * 0.05 * (i % 3 + 1),
                y: (i) => mouseY * 0.05 * (i % 3 + 1),
                duration: 1,
                ease: "power2.out"
            });
            gsap.to(coreNode, {
                x: mouseX * 0.02,
                y: mouseY * 0.02,
                duration: 1,
                ease: "power2.out"
            });
        });

        container.addEventListener('mouseleave', () => {
             // Let nodes drift back via their float loop baseline mostly
             gsap.to(nodes, { x: 0, y: 0, duration: 1, ease: 'power2.out' });
             gsap.to(coreNode, { x: 0, y: 0, duration: 1, ease: 'power2.out' });
        });

      }, 200);
    }
  }
}]);

// --- 4. Chat Service & Controller ---
portfolioApp.service('MockLLMService', ['$q', '$timeout', function($q, $timeout) {
  this.queryCard = function(prompt) {
    const defer = $q.defer();
    const p = prompt.toLowerCase();
    
    $timeout(() => {
      if (p.includes('projects') || p.includes('work')) {
        defer.resolve("I've built systems like CERTGUARD (PKI/Firebase), ClarityLegal (TF-IDF/Gemini), and NEXUS (LangGraph/GPT-4o). Have a look at the Projects section!");
      } else if (p.includes('skills') || p.includes('stack')) {
        defer.resolve("My core stack includes Python, Next.js, AngularJS, Tailwind, and ML framworks like Scikit-learn, LangGraph, and Genkit.");
      } else if (p.includes('who are you') || p.includes('name')) {
        defer.resolve("I'm the virtual assistant for Vivek Dhotre, an AI/ML Engineer who architects intelligence and designs premium systems.");
      } else {
        defer.resolve("Interesting... Tell me more, or try asking about my projects and skills!");
      }
    }, 800);

    return defer.promise;
  };
}]);

portfolioApp.controller('ChatCtrl', ['$scope', 'MockLLMService', '$timeout', function($scope, MockLLMService, $timeout) {
  $scope.isChatOpen = false;
  $scope.userInput = "";
  $scope.messages = [
    { sender: 'ai', text: "Hello. I am the Nexus Assistant. How can I guide you through Vivek's portfolio?" }
  ];

  function scrollChat() {
    $timeout(() => {
      const container = document.getElementById('chat-messages');
      if(container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 50);
  }

  $scope.toggleChat = function() {
    $scope.isChatOpen = !$scope.isChatOpen;
    if($scope.isChatOpen) {
      scrollChat();
    }
  };

  $scope.sendMessage = function() {
    if (!$scope.userInput.trim()) return;
    
    const userMsg = $scope.userInput;
    $scope.messages.push({ sender: 'user', text: userMsg });
    $scope.userInput = "";
    scrollChat();

    const loadingMsgObj = { sender: 'ai', text: '...' };
    $scope.messages.push(loadingMsgObj);
    scrollChat();

    MockLLMService.queryCard(userMsg).then(response => {
      const idx = $scope.messages.indexOf(loadingMsgObj);
      if (idx > -1) $scope.messages.splice(idx, 1);
      
      $scope.messages.push({ sender: 'ai', text: response });
      scrollChat();
    });
  };

  $scope.sendPreset = function(text) {
    if (!$scope.isChatOpen) $scope.isChatOpen = true;
    $scope.userInput = text;
    $scope.sendMessage();
  };
}]);

angular.element(document).ready(function() {
  const rootElement = document.querySelector('[ng-app]');
  if(rootElement) {
    rootElement.removeAttribute('ng-app'); 
    angular.bootstrap(rootElement, ['portfolioApp'], { strictDi: false });
  } else {
    angular.bootstrap(document, ['portfolioApp']);
  }
});
