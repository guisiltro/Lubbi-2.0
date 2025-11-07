// Inicializar AOS
AOS.init({ duration: 1200, once: true });

// Elementos do DOM
const loginContainer = document.getElementById("loginContainer");
const btnLogin = document.getElementById("btnLogin");
const scrollProgress = document.getElementById("scrollProgress");
const trafficLightLinks = document.querySelectorAll('.traffic-light-nav a');
const ratingStars = document.querySelectorAll('.rating-star');
const submitRating = document.getElementById('submitRating');
const reviewsContainer = document.getElementById('reviewsContainer');
const navToggle = document.getElementById('navToggle');
const topNav = document.querySelector('.top-nav');
const colorBlindBtn = document.getElementById('colorBlindBtn');
const resetThemeBtn = document.getElementById('resetThemeBtn');
const copyNextLink = document.getElementById('copyNextLink');
const nextLink = document.getElementById('nextLink');

// Dados da equipe
const teamMembers = [
    {
        id: 1,
        name: "Dr. Roberto Almeida",
        role: "Líder de Projeto & Engenheiro Biomédico",
        bio: "Com mais de 15 anos de experiência em engenharia biomédica, Dr. Roberto lidera o desenvolvimento do LUBBI com foco em inovação e precisão diagnóstica.",
        img: "https://images.unsplash.com/photo-1551836026-d5c88acf2d6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 2,
        name: "Dra. Camila Santos",
        role: "Especialista em IA & Ciência de Dados",
        bio: "PhD em Ciência da Computação com especialização em Inteligência Artificial. Dra. Camila desenvolve os algoritmos de diagnóstico do LUBBI.",
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 3,
        name: "Carlos Mendonça",
        role: "Engenheiro de Software & Desenvolvedor Full Stack",
        bio: "Especialista em desenvolvimento de software com foco em sistemas embarcados e aplicações web. Carlos é responsável pela arquitetura do sistema LUBBI.",
        img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
        id: 4,
        name: "Mariana Oliveira",
        role: "Designer UX/UI & Especialista em Experiência do Usuário",
        bio: "Com formação em Design de Interação, Mariana cria interfaces intuitivas que facilitam a interação entre pacientes e o sistema LUBBI.",
        img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    }
];

// Descrições detalhadas para cada funcionalidade do robô
const featureDetails = {
    'sensor-temp': {
        title: 'Sensor de Temperatura Infravermelho',
        description: 'segure a mão esquerda do robo',
        details: [
            'Precisão: ±0.1°C',
            'Tempo de medição: 2 segundos',
            'Alcance: 5-15 cm',
            'Faixa de medição: 35°C - 42°C'
        ]
    },
    'sensor-bpm': {
        title: 'Sensor de Frequência Cardíaca',
        description: 'Segure a mão direita do robo',
        details: [
            'Precisão: ±2 BPM',
            'Monitoramento contínuo',
            'Detecção de arritmias',
            'Análise em tempo real'
        ]
    },
    'touchscreen': {
        title: 'Interface Touchscreen',
        description: 'Toque na tela touch para ver os dados',
        details: [
            'Tela 10" sensível ao toque',
            'Interface intuitiva',
            'Resposta tátil',
            'Design acessível'
        ]
    },
    'wheels': {
        title: 'Sistema de Locomoção',
        description: 'Sistema de locomoção autonomo',
        details: [
            'Rodas omnidirecionais',
            'Navegação autônoma',
            'Sensores de obstáculos',
            'Precisão de movimento'
        ]
    },
    'ai-diagnosis': {
        title: 'Diagnóstico por IA',
        description: 'Analise de risco por IA em tempo integral',
        details: [
            'Análise em tempo real',
            'Banco de dados médico',
            'Aprendizado contínuo',
            'Suporte à decisão clínica'
        ]
    },
    'communication': {
        title: 'Sistema de Comunicação',
        description: 'Plataformampara transmissão de dados e comunicação com equipe médica.',
        details: [
            'Transmissão em tempo real',
            'Comunicação com equipe',
            'Armazenamento em nuvem',
            'Relatórios automáticos'
        ]
    }
};

// Configurações
const API_BASE_URL = 'http://localhost:3000/api';

// Contador de visitantes
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount = parseInt(visitorCount) + 1;
localStorage.setItem('visitorCount', visitorCount);
document.getElementById('stat-visitors').textContent = visitorCount.toLocaleString();

// Barra de progresso do scroll
window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
    
    // Header scroll effect
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Atualizar navegação semáforo
    updateTrafficLightNav();
    updateNavbarActive();
});

// Atualizar navegação semáforo baseada na posição do scroll
function updateTrafficLightNav() {
    const sections = document.querySelectorAll('section, .hero, .team-section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id') || 'top';
        }
    });
    
    trafficLightLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Atualizar navbar ativo baseado na posição do scroll
function updateNavbarActive() {
    const sections = document.querySelectorAll('section, .hero');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id') || 'top';
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Inicialização da página
window.onload = () => {
    // Verificar se já fez login anteriormente
    const hasLoggedIn = localStorage.getItem('hasLoggedIn');
    if (hasLoggedIn) {
        loginContainer.style.display = "none";
    } else {
        loginContainer.style.display = "flex";
    }
    
    updateTrafficLightNav();
    updateNavbarActive();
    startStatsAnimation();
    loadReviews();
    initializeAIChatbot();
    initializeAccessibility();
    initRobotInteractionSystem();
    initRobotScrollIcon();
    
    // Inicializar com status desconectado
    updateConnectionStatus('Sistema LUBBI Pronto para Uso', 'ready');
};

// ===== SISTEMA DE INTERAÇÃO DO ROBÔ LUBBI =====

function initRobotInteractionSystem() {
    const featureCards = document.querySelectorAll('.feature-card-circle');
    const actionIndicator = document.getElementById('actionIndicator');
    const indicatorText = document.getElementById('indicatorText');
    
    let activeCard = null;
    
    // Configurações de animação
    const animations = {
        'sensor-temp': {
            elements: ['rightArm', 'rightHand', 'rightSensor'],
            action: () => activateTemperatureSensor(),
            text: 'Sensor de Temperatura Ativo'
        },
        'sensor-bpm': {
            elements: ['leftArm', 'leftHand', 'leftSensor'],
            action: () => activateHeartbeatSensor(),
            text: 'Sensor Cardíaco Ativo'
        },
        'touchscreen': {
            elements: ['robotBody', 'touchScreen'],
            action: () => activateTouchScreen(),
            text: 'Tela Touchscreen Ativa'
        },
        'wheels': {
            elements: ['leftWheel', 'rightWheel'],
            action: () => activateWheels(),
            text: 'Sistema de Locomoção Ativo'
        },
        'ai-diagnosis': {
            elements: ['robotHead'],
            action: () => activateAIDiagnosis(),
            text: 'Diagnóstico por IA Ativo'
        },
        'communication': {
            elements: ['robotHead'],
            action: () => activateCommunication(),
            text: 'Sistema de Comunicação Ativo'
        }
    };
    
    // Event listeners para os cards
    featureCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            const feature = this.getAttribute('data-feature');
            
            // Se o card já está ativo, desativa
            if (this.classList.contains('active')) {
                deactivateCard();
                return;
            }
            
            // Ativa o card clicado
            activateCard(this, feature);
        });
    });
    
    // Fechar card ativo ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.feature-card-circle') && activeCard) {
            deactivateCard();
        }
    });
    
    // Ativar card
    function activateCard(card, feature) {
        // Desativa card anterior se houver
        if (activeCard) {
            deactivateCard();
        }
        
        // Ativa o novo card
        card.classList.add('active');
        activeCard = card;
        
        // Ativa a animação correspondente
        if (animations[feature]) {
            animations[feature].action();
            
            // Atualiza indicador
            indicatorText.textContent = animations[feature].text;
            actionIndicator.classList.add('active');
        }
    }
    
    // Desativar card
    function deactivateCard() {
        if (activeCard) {
            activeCard.classList.remove('active');
            activeCard = null;
            
            // Desativa indicador
            actionIndicator.classList.remove('active');
            
            // Reseta animações do robô
            resetRobotAnimations();
            
            // Reseta status da tela
            const screenStatus = document.getElementById('screenStatus');
            if (screenStatus) screenStatus.textContent = 'AGUARDANDO COMANDO';
        }
    }
    
    // Funções específicas de cada funcionalidade
    function activateTemperatureSensor() {
        const rightArm = document.getElementById('rightArm');
        const rightSensor = document.getElementById('rightSensor');
        const tempValue = document.getElementById('tempValue');
        const screenStatus = document.getElementById('screenStatus');
        
        if (rightArm) rightArm.classList.add('animate');
        if (rightSensor) rightSensor.classList.add('sensor-active');
        
        if (tempValue) tempValue.textContent = '36.5°C';
        if (screenStatus) screenStatus.textContent = 'MEDIÇÃO DE TEMPERATURA';
        
        setTimeout(() => {
            if (rightArm) rightArm.classList.remove('animate');
        }, 1000);
    }
    
    function activateHeartbeatSensor() {
        const leftArm = document.getElementById('leftArm');
        const leftSensor = document.getElementById('leftSensor');
        const bpmValue = document.getElementById('bpmValue');
        const screenStatus = document.getElementById('screenStatus');
        
        if (leftArm) leftArm.classList.add('animate');
        if (leftSensor) leftSensor.classList.add('sensor-active');
        
        if (bpmValue) bpmValue.textContent = '72';
        if (screenStatus) screenStatus.textContent = 'MONITORAMENTO CARDÍACO';
        
        setTimeout(() => {
            if (leftArm) leftArm.classList.remove('animate');
        }, 1000);
    }
    
    function activateTouchScreen() {
        const touchScreen = document.getElementById('touchScreen');
        const screenStatus = document.getElementById('screenStatus');
        
        if (touchScreen) touchScreen.classList.add('active');
        if (screenStatus) screenStatus.textContent = 'INTERFACE ATIVA';
        
        setTimeout(() => {
            if (touchScreen) touchScreen.classList.remove('active');
        }, 500);
    }
    
    function activateWheels() {
        const leftWheel = document.getElementById('leftWheel');
        const rightWheel = document.getElementById('rightWheel');
        const robot = document.getElementById('robot');
        const screenStatus = document.getElementById('screenStatus');
        
        if (leftWheel) leftWheel.classList.add('rotate');
        if (rightWheel) rightWheel.classList.add('rotate');
        if (robot) robot.style.animation = 'gentle-float 2s ease-in-out';
        if (screenStatus) screenStatus.textContent = 'NAVEGAÇÃO AUTÔNOMA';
        
        setTimeout(() => {
            if (leftWheel) leftWheel.classList.remove('rotate');
            if (rightWheel) rightWheel.classList.remove('rotate');
            if (robot) robot.style.animation = 'gentle-float 6s ease-in-out infinite';
        }, 2000);
    }
    
    function activateAIDiagnosis() {
        const eyes = document.querySelectorAll('.eye');
        const mouth = document.querySelector('.mouth');
        const screenStatus = document.getElementById('screenStatus');
        
        eyes.forEach(eye => {
            eye.style.animation = 'blink 0.5s infinite';
        });
        
        if (mouth) {
            mouth.style.height = '30px';
            mouth.style.borderRadius = '15px';
        }
        
        if (screenStatus) screenStatus.textContent = 'PROCESSANDO DIAGNÓSTICO';
        
        setTimeout(() => {
            if (screenStatus) screenStatus.textContent = 'DIAGNÓSTICO CONCLUÍDO';
            
            setTimeout(() => {
                eyes.forEach(eye => {
                    eye.style.animation = 'blink 4s infinite';
                });
                if (mouth) {
                    mouth.style.height = '25px';
                    mouth.style.borderRadius = '0 0 30px 30px';
                }
            }, 1500);
        }, 2000);
    }
    
    function activateCommunication() {
        const head = document.querySelector('.head');
        const screenStatus = document.getElementById('screenStatus');
        
        if (head) head.style.animation = 'gentle-float 1s ease-in-out infinite';
        if (screenStatus) screenStatus.textContent = 'TRANSMITINDO DADOS';
        
        setTimeout(() => {
            if (head) head.style.animation = '';
        }, 2000);
    }
    
    // Reset de todas as animações do robô
    function resetRobotAnimations() {
        // Braços
        const leftArm = document.getElementById('leftArm');
        const rightArm = document.getElementById('rightArm');
        if (leftArm) leftArm.classList.remove('animate');
        if (rightArm) rightArm.classList.remove('animate');
        
        // Sensores
        const leftSensor = document.getElementById('leftSensor');
        const rightSensor = document.getElementById('rightSensor');
        if (leftSensor) leftSensor.classList.remove('sensor-active');
        if (rightSensor) rightSensor.classList.remove('sensor-active');
        
        // Rodas
        const leftWheel = document.getElementById('leftWheel');
        const rightWheel = document.getElementById('rightWheel');
        if (leftWheel) leftWheel.classList.remove('rotate');
        if (rightWheel) rightWheel.classList.remove('rotate');
        
        // Tela
        const touchScreen = document.getElementById('touchScreen');
        if (touchScreen) touchScreen.classList.remove('active');
        
        // Cabeça
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            eye.style.animation = 'blink 4s infinite';
        });
        
        const mouth = document.querySelector('.mouth');
        if (mouth) {
            mouth.style.height = '25px';
            mouth.style.borderRadius = '0 0 30px 30px';
        }
        
        const head = document.querySelector('.head');
        if (head) head.style.animation = '';
        
        // Robô
        const robot = document.getElementById('robot');
        if (robot) robot.style.animation = 'gentle-float 6s ease-in-out infinite';
    }
}

// ===== ÍCONE DO ROBÔ PARA SCROLL =====

function initRobotScrollIcon() {
    // Criar elemento do ícone do robô
    const robotIcon = document.createElement('div');
    robotIcon.className = 'robot-scroll-icon';
    robotIcon.innerHTML = '<i class="fas fa-robot"></i>';
    document.body.appendChild(robotIcon);
    
    // Adicionar funcionalidade de scroll para o topo
    robotIcon.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Esconder/mostrar baseado no scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            // Scroll para baixo - esconder
            robotIcon.style.opacity = '0.6';
            robotIcon.style.transform = 'translateY(100px)';
        } else {
            // Scroll para cima - mostrar
            robotIcon.style.opacity = '1';
            robotIcon.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== EVENTOS DE LOGIN E NAVEGAÇÃO =====

// Sistema de Login
btnLogin.addEventListener('click', function() {
    const username = document.getElementById('username').value.trim();
    
    if (username === '') {
        showNotification('Por favor, digite seu nome para continuar', 'error');
        return;
    }
    
    // Salvar informações de login
    localStorage.setItem('hasLoggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('loginTime', new Date().toISOString());
    
    // Esconder o overlay de login com animação
    loginContainer.style.opacity = '0';
    loginContainer.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        loginContainer.style.display = 'none';
        showNotification(`Bem-vindo(a), ${username}! Sistema LUBBI inicializado.`, 'success');
        
        // Atualizar estatísticas (opcional)
        updateUserStats(username);
    }, 500);
});

// Também permitir login com Enter
document.getElementById('username').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        btnLogin.click();
    }
});

// Função para atualizar estatísticas do usuário (opcional)
function updateUserStats(username) {
    // Você pode adicionar lógica aqui para rastrear usuários específicos
    console.log(`Usuário ${username} acessou o sistema`);
    
    // Exemplo: incrementar contador de usuários únicos
    let uniqueUsers = JSON.parse(localStorage.getItem('uniqueUsers') || '[]');
    if (!uniqueUsers.includes(username)) {
        uniqueUsers.push(username);
        localStorage.setItem('uniqueUsers', JSON.stringify(uniqueUsers));
    }
}

// Toggle menu mobile
navToggle.addEventListener('click', () => {
    topNav.classList.toggle('active');
});

// Fechar menu mobile ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        topNav.classList.remove('active');
    });
});

// Scroll suave para links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        const targetID = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetID);
        if(targetElement) targetElement.scrollIntoView({behavior: 'smooth'});
    });
});

// Toggle menu mobile
navToggle.addEventListener('click', () => {
    topNav.classList.toggle('active');
});

// Fechar menu mobile ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        topNav.classList.remove('active');
    });
});

// Scroll suave para links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        const targetID = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetID);
        if(targetElement) targetElement.scrollIntoView({behavior: 'smooth'});
    });
});

// Animação dos stats da home
function startStatsAnimation() {
    const timeStat = document.getElementById('stat-time');
    if (timeStat) {
        let current = 0;
        const target = 45;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            timeStat.textContent = Math.floor(current) + 'Seg';
        }, 16);
    }
}

// ===== SISTEMA DE AVALIAÇÕES =====

let currentRating = 0;

// Adicionar evento às estrelas
ratingStars.forEach(star => {
    star.addEventListener('click', function() {
        const rating = parseInt(this.getAttribute('data-rating'));
        currentRating = rating;
        
        ratingStars.forEach(s => {
            if (parseInt(s.getAttribute('data-rating')) <= rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
});

// Enviar avaliação
submitRating.addEventListener('click', function() {
    if (currentRating === 0) {
        showNotification('Por favor, selecione uma avaliação antes de enviar.', 'error');
        return;
    }
    
    const comment = document.getElementById('ratingComment').value.trim();
    const date = new Date().toLocaleDateString('pt-BR');
    
    const review = {
        rating: currentRating,
        comment: comment,
        date: date
    };
    
    let reviews = JSON.parse(localStorage.getItem('lubbiReviews') || '[]');
    reviews.push(review);
    localStorage.setItem('lubbiReviews', JSON.stringify(reviews));
    
    loadReviews();
    
    currentRating = 0;
    ratingStars.forEach(star => star.classList.remove('active'));
    document.getElementById('ratingComment').value = '';
    
    showNotification('Obrigado pela sua avaliação!', 'success');
});

// Carregar avaliações
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('lubbiReviews') || '[]');
    reviewsContainer.innerHTML = '';
    
    if (reviews.length === 0) {
        reviewsContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>';
        return;
    }
    
    reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= review.rating ? '★' : '☆';
        }
        
        reviewElement.innerHTML = `
            <div class="review-header">
                <div class="review-stars">${stars}</div>
                <div class="review-date">${review.date}</div>
            </div>
            <div class="review-text">${review.comment || 'Sem comentário'}</div>
        `;
        
        reviewsContainer.appendChild(reviewElement);
    });
}

// ===== CHATBOT COM IA =====

function initializeAIChatbot() {
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendMessageBtn = document.getElementById('sendMessage');

    let conversationId = `user-${Date.now()}`;

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        // Processar quebras de linha e formatação
        const formattedMessage = message
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
            
        messageDiv.innerHTML = `<p>${formattedMessage}</p>`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    async function processUserMessage(message) {
        // Mostrar indicador de digitação
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot-message typing-indicator';
        typingIndicator.innerHTML = '<p><i class="fas fa-ellipsis-h"></i> LUBBI Assistant está digitando...</p>';
        chatbotMessages.appendChild(typingIndicator);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        try {
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    conversationId: conversationId
                })
            });
            
            const data = await response.json();
            
            // Remover indicador de digitação
            typingIndicator.remove();
            
            // Adicionar resposta da IA
            if (data.success) {
                addMessage(data.response);
            } else {
                addMessage('Desculpe, ocorreu um erro ao processar sua mensagem.');
            }
            
        } catch (error) {
            typingIndicator.remove();
            
            // Fallback para IA local se o servidor estiver offline
            const fallbackResponse = generateFallbackResponse(message);
            addMessage(fallbackResponse);
        }
    }

    // Resposta de fallback local
    function generateFallbackResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Conhecimento sobre o LUBBI
        if (lowerMessage.includes('lubbi') || lowerMessage.includes('robô') || lowerMessage.includes('robot')) {
            return `🤖 **LUBBI - Robô de Triagem Inteligente**
            
O LUBBI é um robô de triagem médica avançado que utiliza sensores de última geração e inteligência artificial para fornecer diagnósticos rápidos e precisos.

**Principais Funcionalidades:**
• Medição de temperatura sem contato
• Monitoramento cardíaco em tempo real
• Interface touchscreen intuitiva
• Navegação autônoma

Posso te explicar mais sobre alguma funcionalidade específica?`;
        }
        
        if (lowerMessage.includes('temperatura') || lowerMessage.includes('febre')) {
            return `🌡️ **Sensor de Temperatura do LUBBI**
            
O LUBBI utiliza sensor infravermelho MLX90614 para medição de temperatura sem contato com precisão de ±0.1°C.

**Características:**
• Medição em 2 segundos
• Sem contato físico
• Precisão hospitalar
• Calibração automática`;
        }
        
        if (lowerMessage.includes('coração') || lowerMessage.includes('batimento') || lowerMessage.includes('bpm')) {
            return `💓 **Monitoramento Cardíaco**
            
O sensor MAX30105 do LUBBI monitora frequência cardíaca com tecnologia de fotopletismografia.

**Recursos:**
• Precisão de ±2 BPM
• Detecção de arritmias
• Monitoramento contínuo
• Análise em tempo real`;
        }
        
        if (lowerMessage.includes('conectar') || lowerMessage.includes('conexão')) {
            return `🔌 **Conexão com o LUBBI**
            
Para conectar com o LUBBI:

1. Certifique-se que o LUBBI está ligado
2. Clique no botão "Conectar ao LUBBI" na seção de Monitoramento
3. Aguarde a estabilização da conexão
4. Os dados dos sensores serão atualizados automaticamente

Problemas de conexão? Verifique se está na mesma rede WiFi do LUBBI.`;
        }
        
        if (lowerMessage.includes('equipe') || lowerMessage.includes('desenvolvedor') || lowerMessage.includes('criador')) {
            return `👨‍💻 **Equipe de Desenvolvimento**
            
O LUBBI foi desenvolvido por uma equipe multidisciplinar da FIAP especializada em:
• Engenharia Biomédica
• Inteligência Artificial
• Desenvolvimento de Software
• Design UX/UI
• Medicina e Triagem

Clique no botão "Equipe" no menu para conhecer nossos integrantes!`;
        }
        
        // Resposta padrão educada
        return `Olá! Sou o LUBBI Assistant. Posso te ajudar com informações sobre:

🤖 **O que é o LUBBI** - Conceito e funcionalidades
🌡️ **Sensores** - Tecnologias de medição
📊 **Dados em Tempo Real** - Monitoramento atual
🔌 **Conexão** - Como conectar com o LUBBI
👨‍💻 **Equipe** - Desenvolvedores do projeto

Sobre o que gostaria de saber?`;
    }

    sendMessageBtn.addEventListener('click', async () => {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatbotInput.value = '';
            await processUserMessage(message);
        }
    });

    chatbotInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const message = chatbotInput.value.trim();
            if (message) {
                addMessage(message, true);
                chatbotInput.value = '';
                await processUserMessage(message);
            }
        }
    });

    // Mensagem de boas-vindas melhorada
    addMessage(`🤖 **Bem-vindo ao LUBBI Assistant!**

Sou seu assistente virtual especializado no Robô de Triagem Inteligente LUBBI. Posso te ajudar com:

• Informações sobre o projeto LUBBI
• Detalhes técnicos dos sensores
• Instruções de conexão
• Dúvidas sobre funcionalidades

O que gostaria de saber hoje?`);
}

// ===== ACESSIBILIDADE =====

function initializeAccessibility() {
    // Modo Daltonismo
    colorBlindBtn.addEventListener('click', () => {
        document.body.classList.remove('blue-theme');
        document.body.classList.add('color-blind-theme');
        localStorage.setItem('theme', 'color-blind');
        showNotification('Modo de alto contraste ativado', 'success');
    });
    
    // Resetar Tema
    resetThemeBtn.addEventListener('click', () => {
        document.body.classList.remove('color-blind-theme', 'blue-theme');
        localStorage.setItem('theme', 'default');
        showNotification('Tema original restaurado', 'success');
    });
    
    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'blue') {
        document.body.classList.add('blue-theme');
    } else if (savedTheme === 'color-blind') {
        document.body.classList.add('color-blind-theme');
    }
    
    // Copiar link do NEXT
    copyNextLink.addEventListener('click', () => {
        nextLink.select();
        document.execCommand('copy');
        showNotification('Link copiado para a área de transferência!', 'success');
    });
}

// ===== FUNÇÕES UTILITÁRIAS =====

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar notificação
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Função auxiliar para status de conexão (mantida para compatibilidade)
function updateConnectionStatus(message, status) {
    const screenStatus = document.getElementById('screenStatus');
    if (screenStatus) {
        screenStatus.textContent = message;
        screenStatus.className = `screen-status-improved ${status}`;
    }
}

// Adicionar CSS para notificações
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .typing-indicator {
        opacity: 0.7;
        font-style: italic;
    }

    .typing-indicator i {
        animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }

    /* Notificações */
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--card-bg);
        color: var(--text-primary);
        padding: 15px 20px;
        border-radius: 10px;
        border-left: 4px solid var(--primary-color);
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
        max-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left-color: var(--success-color);
    }
    
    .notification-error {
        border-left-color: var(--error-color);
    }

    .notification-info {
        border-left-color: var(--accent-color);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }

    /* Status de Conexão */
    .screen-status-improved.ready {
        color: var(--success-color);
    }

    .screen-status-improved.connected {
        color: var(--success-color);
    }

    .screen-status-improved.disconnected {
        color: var(--text-secondary);
    }

    .screen-status-improved.connecting {
        color: var(--warning-color);
    }

    .screen-status-improved.error {
        color: var(--error-color);
    }
`;
document.head.appendChild(dynamicStyles);