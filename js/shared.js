// Shared utilities and components

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when clicking a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// AI Assistant Component
class AIAssistant {
    constructor() {
        this.isOpen = false;
        this.messages = [
            { role: 'model', text: 'Hi! I can answer questions about UnitSync deployment, compliance, and features. How can I help?' }
        ];
        this.isLoading = false;
        this.apiKey = null; // Will be set if available
        this.container = null;
        this.init();
    }

    init() {
        this.container = document.getElementById('ai-assistant');
        if (!this.container) return;
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
                ${this.isOpen ? this.renderChatWindow() : this.renderToggleButton()}
            </div>
        `;
        this.attachEventListeners();
    }

    renderChatWindow() {
        const messagesHTML = this.messages.map(msg => `
            <div class="flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}">
                <div class="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === 'user'
                        ? 'bg-[#2E5BFF] text-white rounded-br-none'
                        : 'bg-white text-slate-700 border border-slate-200 shadow-sm rounded-bl-none'
                }">
                    ${msg.text}
                </div>
            </div>
        `).join('');

        const loadingHTML = this.isLoading ? `
            <div class="flex justify-start">
                <div class="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-3 flex space-x-1">
                    <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                    <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                    <div class="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                </div>
            </div>
        ` : '';

        return `
            <div class="mb-4 w-[350px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[500px] animate-fade-in-up">
                <div class="bg-[#2E5BFF] p-4 flex justify-between items-center text-white">
                    <div class="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                        <span class="font-semibold">UnitSync Assistant</span>
                    </div>
                    <button id="closeAssistant" class="hover:bg-white/20 rounded-full p-1 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>

                <div id="chatMessages" class="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4 min-h-[300px]">
                    ${messagesHTML}
                    ${loadingHTML}
                    <div id="messagesEnd"></div>
                </div>

                <form id="assistantForm" class="p-3 bg-white border-t border-slate-100 flex gap-2">
                    <input
                        type="text"
                        id="assistantInput"
                        placeholder="Ask about HIPAA, features..."
                        class="flex-1 px-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:border-[#2E5BFF] focus:ring-1 focus:ring-[#2E5BFF] text-sm"
                    />
                    <button
                        type="submit"
                        id="assistantSubmit"
                        class="bg-[#2E5BFF] text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        ${this.isLoading ? 'disabled' : ''}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                    </button>
                </form>
            </div>
        `;
    }

    renderToggleButton() {
        return `
            <button id="openAssistant" class="bg-[#2E5BFF] hover:bg-blue-600 text-white p-4 rounded-full shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </button>
        `;
    }

    attachEventListeners() {
        const openBtn = document.getElementById('openAssistant');
        const closeBtn = document.getElementById('closeAssistant');
        const form = document.getElementById('assistantForm');

        if (openBtn) {
            openBtn.addEventListener('click', () => {
                this.isOpen = true;
                this.render();
                this.scrollToBottom();
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.isOpen = false;
                this.render();
            });
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    async handleSubmit() {
        const input = document.getElementById('assistantInput');
        if (!input || !input.value.trim() || this.isLoading) return;

        const userMsg = input.value.trim();
        input.value = '';

        this.messages.push({ role: 'user', text: userMsg });
        this.isLoading = true;
        this.render();
        this.scrollToBottom();

        try {
            const responseText = await this.sendMessageToGemini(userMsg);
            this.messages.push({ role: 'model', text: responseText });
        } catch (error) {
            console.error('Error:', error);
            this.messages.push({
                role: 'model',
                text: 'Sorry, I encountered an error. Please try again.',
                isError: true
            });
        } finally {
            this.isLoading = false;
            this.render();
            this.scrollToBottom();
        }
    }

    async sendMessageToGemini(message) {
        // Fallback message if API key not configured
        const fallbackMessage = "I'm currently running in demo mode without a live brain. Please configure the API Key to chat with me!";

        // Since we don't have API key in this demo, return fallback
        // In production, you would use the Gemini API here
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        return fallbackMessage;
    }

    scrollToBottom() {
        setTimeout(() => {
            const messagesEnd = document.getElementById('messagesEnd');
            if (messagesEnd) {
                messagesEnd.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
}

// AB Test Toggle Component
class ABTestToggle {
    constructor() {
        this.container = null;
        this.showTooltip = false;
        this.init();
    }

    init() {
        this.container = document.getElementById('ab-test-toggle');
        if (!this.container) return;
        this.render();
        this.attachEventListeners();
    }

    getCurrentVariant() {
        const path = window.location.pathname;
        if (path.includes('variant-b') || path.includes('book-demo-b')) {
            return 'B';
        }
        return 'A';
    }

    getToggleUrl() {
        const path = window.location.pathname;
        if (path.includes('book-demo-a')) {
            return 'book-demo-b.html';
        } else if (path.includes('book-demo-b')) {
            return 'book-demo-a.html';
        } else if (path.includes('variant-b')) {
            return 'index-new.html';
        } else {
            return 'variant-b.html';
        }
    }

    render() {
        const currentVariant = this.getCurrentVariant();
        const nextVariant = currentVariant === 'A' ? 'B' : 'A';

        this.container.innerHTML = `
            <div class="relative">
                ${this.showTooltip ? `
                    <div class="absolute bottom-full right-0 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg whitespace-nowrap shadow-lg">
                        Switch to Variant ${nextVariant}
                        <div class="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                    </div>
                ` : ''}

                <button
                    id="variantToggle"
                    class="group relative w-14 h-14 bg-[#2E5BFF] hover:bg-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center active:scale-95"
                    aria-label="Switch to variant ${nextVariant}"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:rotate-12"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>

                    <div class="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-[#2E5BFF] font-bold text-xs border-2 border-[#2E5BFF] shadow-md">
                        ${currentVariant}
                    </div>

                    <div class="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
            </div>
        `;
        this.attachEventListeners();
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('variantToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                window.location.href = this.getToggleUrl();
            });

            toggleBtn.addEventListener('mouseenter', () => {
                this.showTooltip = true;
                this.render();
            });

            toggleBtn.addEventListener('mouseleave', () => {
                this.showTooltip = false;
                this.render();
            });
        }
    }
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    new AIAssistant();
    new ABTestToggle();
});

// Supabase client initialization
const SUPABASE_URL = 'https://fjivnqssxnhvlhcnamaa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaXZucXNzeG5odmxoY25hbWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMDE3ODIsImV4cCI6MjA4MDY3Nzc4Mn0.BlLYXYXSzhgBfiTbP3RtTCAUnQWA1TZNjO5zXIpB25k';

let supabaseClient = null;
if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// FAQ Accordion functionality
function initFAQAccordion() {
    const faqButtons = document.querySelectorAll('.faq-toggle');
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            const answer = document.getElementById(`faq-answer-${index}`);
            const icon = button.querySelector('.faq-icon');

            if (answer.classList.contains('hidden')) {
                answer.classList.remove('hidden');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>`;
            } else {
                answer.classList.add('hidden');
                answer.style.maxHeight = '0';
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;
            }
        });
    });
}
