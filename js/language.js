// Language Switching Functionality
let currentLanguage = 'ja';

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
    
    // Apply the current language
    switchLanguage(currentLanguage);
});

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update language buttons
    document.getElementById('ja-btn').classList.toggle('active', lang === 'ja');
    document.getElementById('en-btn').classList.toggle('active', lang === 'en');
    
    // Get all elements with language attributes
    const elements = document.querySelectorAll('[data-ja][data-en]');
    
    elements.forEach(element => {
        const jaText = element.getAttribute('data-ja');
        const enText = element.getAttribute('data-en');
        
        // Update text content based on selected language
        element.textContent = lang === 'ja' ? jaText : enText;
    });
    
    // Update page language attribute
    document.documentElement.lang = lang;
    
    // Update page title if needed
    updatePageTitle(lang);
}

function updatePageTitle(lang) {
    const titleElement = document.querySelector('title');
    if (!titleElement) return;
    
    const currentTitle = titleElement.textContent;
    
    // Define title translations
    const titleTranslations = {
        'ja': {
            'プロフェッショナルサービス': 'Professional Services',
            'サービス詳細': 'Our Services',
            '会社概要': 'About Us',
            'お問い合わせ': 'Contact Us',
            '利用規約': 'Terms of Service',
            'プライバシーポリシー': 'Privacy Policy',
            '特定商取引法に基づく表記': 'Legal Notice'
        },
        'en': {
            'Professional Services': 'プロフェッショナルサービス',
            'Our Services': 'サービス詳細',
            'About Us': '会社概要',
            'Contact Us': 'お問い合わせ',
            'Terms of Service': '利用規約',
            'Privacy Policy': 'プライバシーポリシー',
            'Legal Notice': '特定商取引法に基づく表記'
        }
    };
    
    // Update title based on current page
    if (lang === 'en') {
        for (const [ja, en] of Object.entries(titleTranslations.ja)) {
            if (currentTitle.includes(ja)) {
                titleElement.textContent = currentTitle.replace(ja, en);
                break;
            }
        }
    } else {
        for (const [en, ja] of Object.entries(titleTranslations.en)) {
            if (currentTitle.includes(en)) {
                titleElement.textContent = currentTitle.replace(en, ja);
                break;
            }
        }
    }
}

// Add smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add form validation for contact form
const contactForm = document.querySelector('.basic-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            alert(currentLanguage === 'ja' ? 
                '全ての項目を入力してください。' : 
                'Please fill in all fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert(currentLanguage === 'ja' ? 
                '有効なメールアドレスを入力してください。' : 
                'Please enter a valid email address.');
            return;
        }
        
        // Show success message
        alert(currentLanguage === 'ja' ? 
            'お問い合わせありがとうございます。後日ご連絡させていただきます。' : 
            'Thank you for your inquiry. We will contact you soon.');
        
        // Reset form
        contactForm.reset();
    });
}