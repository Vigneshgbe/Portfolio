 // Chatbot state
 let chatbotOpen = false;
 let tooltipClosed = false;
 let tooltipTimer;

 // Rule-based responses
 const responses = {
     'about the developer': `I'm a passionate web developer with expertise in modern web technologies. I love creating innovative solutions and beautiful user experiences. Currently focused on full-stack development with a keen interest in emerging technologies.`,
     
     'skills and technologies': `My core skills include:
     • Frontend: HTML5, CSS3, JavaScript, React
     • Backend: Python, PHP, Java
     • Database: MySQL, Firebase
     • Tools: Git & Github`,
     
     'recent projects': `Here are some of my recent projects:
     • Employee Exit Interview Form - Full-stack web app
     • Quick Shoutout & Admin Dashboard - Full-stack web app
     • CX Team Overal Dashboard - Full-stack web app
     • Portfolio Website - Responsive design with modern UI
     • Task Management App - React-based productivity tool`,
     
     'contact information': `Feel free to reach out to me:
     📧 Email: vigneshgbecse@gmail.com
     💼 LinkedIn: https://www.linkedin.com/in/vigneshgbe/
     🐙 GitHub: https://github.com/Sweety-Vigneshg/
     📱 Phone: +91 8525822546`,
     
     'experience': `I have 6 months of experience in web development, working on various projects from small business websites to large-scale applications in VDart Inc, Tefugen Technologies, GreatStack. I've collaborated with cross-functional teams and have experience in both startup and corporate environments.`,
     
     'education': `I hold a Bachelor's degree in Computer Science and have completed various certifications in web development, cloud computing, and UI/UX design. I'm committed to continuous learning and staying updated with the latest technologies.`,
     
     'services': `I offer the following services:
     • Custom Website Development
     • Web Application Development
     • UI/UX Design
     • E-commerce Solutions
     • API Development & Integration
     • Website Maintenance & Support`,
     
     'portfolio': `My portfolio showcases a diverse range of projects demonstrating my skills in frontend and backend development. Each project is crafted with attention to detail, focusing on user experience and modern design principles.`,
     
     'availability': `I'm currently available for new projects and collaborations. Whether you need a complete website, web application, or consultation, I'd be happy to discuss your requirements and provide a tailored solution.`,
     
     'default': `I'd be happy to help you with that! You can ask me about:
     • My background and experience
     • Technical skills and expertise
     • Recent projects and portfolio
     • Contact information
     • Services I offer
     • Availability for new projects
     
     What specific information would you like to know?`
 };

 // Initialize tooltip timer
 function startTooltipTimer() {
     if (!tooltipClosed && !chatbotOpen) {
         tooltipTimer = setTimeout(() => {
             showTooltip();
         }, 6000);
     }
 }

 function showTooltip() {
     if (!tooltipClosed && !chatbotOpen) {
         document.getElementById('helpTooltip').classList.add('show');
     }
 }

 function closeTooltip() {
     document.getElementById('helpTooltip').classList.remove('show');
     tooltipClosed = true;
     clearTimeout(tooltipTimer);
 }

 function toggleChatbot() {
     const popup = document.getElementById('chatbotPopup');
     const tooltip = document.getElementById('helpTooltip');
     
     chatbotOpen = !chatbotOpen;
     
     if (chatbotOpen) {
         popup.classList.add('show');
         tooltip.classList.remove('show');
         clearTimeout(tooltipTimer);
         document.getElementById('chatInput').focus();
     } else {
         popup.classList.remove('show');
     }
 }

 function closeChatbot() {
     chatbotOpen = false;
     document.getElementById('chatbotPopup').classList.remove('show');
 }

 function askQuestion(question) {
     sendMessage(question);
 }

 function sendMessage(predefinedMessage = null) {
     const input = document.getElementById('chatInput');
     const message = predefinedMessage || input.value.trim();
     
     if (!message) return;
     
     // Add user message
     addMessage(message, 'user');
     
     // Clear input
     if (!predefinedMessage) {
         input.value = '';
     }
     
     // Show typing indicator
     showTypingIndicator();
     
     // Generate bot response
     setTimeout(() => {
         hideTypingIndicator();
         const response = getBotResponse(message);
         addMessage(response, 'bot');
     }, 1000 + Math.random() * 1000);
 }

 function addMessage(text, sender) {
     const messagesContainer = document.getElementById('chatMessages');
     const messageDiv = document.createElement('div');
     messageDiv.className = `message ${sender}-message`;
     messageDiv.textContent = text;
     messagesContainer.appendChild(messageDiv);
     messagesContainer.scrollTop = messagesContainer.scrollHeight;
 }

 function showTypingIndicator() {
     document.getElementById('typingIndicator').style.display = 'block';
     const messagesContainer = document.getElementById('chatMessages');
     messagesContainer.scrollTop = messagesContainer.scrollHeight;
 }

 function hideTypingIndicator() {
     document.getElementById('typingIndicator').style.display = 'none';
 }

 function getBotResponse(message) {
     const lowerMessage = message.toLowerCase();
     
     // Check for keywords and return appropriate response
     for (let key in responses) {
         if (key !== 'default' && lowerMessage.includes(key)) {
             return responses[key];
         }
     }
     
     // Check for common greetings
     if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
         return "Hello! Welcome to my portfolio. I'm here to help you learn more about my work and experience. What would you like to know?";
     }
     
     // Check for thank you messages
     if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
         return "You're welcome! Is there anything else you'd like to know about my portfolio or services?";
     }
     
     // Check for help requests
     if (lowerMessage.includes('help')) {
         return responses['default'];
     }
     
     // Default response
     return responses['default'];
 }

 function handleKeyPress(event) {
     if (event.key === 'Enter') {
         sendMessage();
     }
 }

 // Initialize the widget
 document.addEventListener('DOMContentLoaded', function() {
     startTooltipTimer();
 });

 // Close chatbot when clicking outside
 document.addEventListener('click', function(event) {
     const container = document.querySelector('.chatbot-container');
     if (!container.contains(event.target) && chatbotOpen) {
         closeChatbot();
     }
 });