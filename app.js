// Mock data
let customers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', printCount: 50, avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', printCount: 30, avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', name: 'Alice Johnson', email: 'alice@example.com', printCount: 75, avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', name: 'Bob Williams', email: 'bob@example.com', printCount: 20, avatar: 'https://i.pravatar.cc/150?img=4' },
];

const metrics = {
    totalCustomers: 100,
    totalPrints: 5000,
    uniqueDesigns: 200,
    revenue: 10000,
};

const notifications = [
    { id: 1, message: 'New print job completed for John Doe' },
    { id: 2, message: 'Customer feedback received from Jane Smith' },
    { id: 3, message: 'Low ink alert for Printer #3' },
];

const chartData = [
    { name: 'Jan', prints: 400, revenue: 2400 },
    { name: 'Feb', prints: 300, revenue: 1398 },
    { name: 'Mar', prints: 200, revenue: 9800 },
    { name: 'Apr', prints: 278, revenue: 3908 },
    { name: 'May', prints: 189, revenue: 4800 },
    { name: 'Jun', prints: 239, revenue: 3800 },
];

const histogramData = [
    { range: '0-10', count: 10 },
    { range: '11-20', count: 15 },
    { range: '21-30', count: 20 },
    { range: '31-40', count: 25 },
    { range: '41-50', count: 15 },
    { range: '51+', count: 5 },
];

const aiQuestions = [
    "What is UniPrint PHC?",
    "How do I place an order?",
    "What types of printing services do you offer?",
    "How long does it take to complete an order?",
    "Do you offer design services?",
    "What file formats do you accept?",
    "Can I get a quote before placing an order?",
    "Do you offer bulk discounts?",
    "What is your return policy?",
    "How do I track my order?",
    "Do you offer rush services?",
    "What is your printing quality like?",
    "Can I see samples before ordering?",
    "Do you offer eco-friendly printing options?",
    "What payment methods do you accept?",
    "Do you ship internationally?",
    "How do I provide feedback on my order?",
    "Can I cancel or modify my order after placing it?",
    "Do you offer any loyalty programs?",
    "How can I contact customer support?"
];

const aiAnswers = [
    "UniPrint PHC is a professional printing service that offers high-quality printing solutions for businesses and individuals.",
    "To place an order, you can use our online ordering system or contact our customer service team directly.",
    "We offer a wide range of printing services including digital printing, offset printing, large format printing, and specialty printing.",
    "Order completion time varies depending on the complexity and volume of the job. Typically, it ranges from 2-5 business days.",
    "Yes, we have a team of professional designers who can help you create custom designs for your printing needs.",
    "We accept most common file formats including PDF, AI, EPS, PSD, and JPEG. For best results, we recommend using PDF files.",
    "You can request a quote through our website or by contacting our sales team.",
    "Yes, we offer discounts for bulk orders. The discount rate depends on the quantity and type of product.",
    "We have a satisfaction guarantee. If you're not happy with your order, please contact us within 7 days of receiving it.",
    "You can track your order status through our online portal using your order number.",
    "Yes, we offer rush services for an additional fee. Please contact us for more information.",
    "We pride ourselves on delivering high-quality prints. We use state-of-the-art printing equipment and premium materials.",
    "Yes, we can provide samples of our products and paper types upon request.",
    "We offer several eco-friendly options including recycled paper and soy-based inks.",
    "We accept all major credit cards, PayPal, and bank transfers for larger orders.",
    "Yes, we offer international shipping. Rates and delivery times vary by destination.",
    "You can provide feedback through our online feedback form or by contacting our customer service team.",
    "Orders can be modified or cancelled within 2 hours of placement. After that, please contact us to discuss options.",
    "Yes, we have a loyalty program that offers points for each order, which can be redeemed for discounts on future orders.",
    "Our customer support team is available via phone, email, and live chat during business hours."
];

// DOM Elements
const customerList = document.getElementById('customerList');
const customerFilter = document.getElementById('customerFilter');
const sortNameBtn = document.getElementById('sortName');
const sortPrintsBtn = document.getElementById('sortPrints');
const addCustomerForm = document.getElementById('addCustomerForm');
const chatForm = document.getElementById('chatForm');
const chatMessages = document.getElementById('chatMessages');
const notificationsBtn = document.getElementById('notificationsBtn');
const settingsBtn = document.getElementById('settingsBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const logoutBtn = document.getElementById('logoutBtn');
const notificationsModal = document.getElementById('notificationsModal');
const settingsModal = document.getElementById('settingsModal');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');

// Variables
let sortField = 'name';
let sortDirection = 'asc';
let currentAIQuestion = 0;

// Functions
function renderCustomers() {
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(customerFilter.value.toLowerCase()) ||
        customer.email.toLowerCase().includes(customerFilter.value.toLowerCase())
    );

    const sortedCustomers = filteredCustomers.sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    customerList.innerHTML = sortedCustomers.map(customer => `
        <div class="customer-item">
            <div class="customer-info">
                <img src="${customer.avatar}" alt="${customer.name}" class="customer-avatar">
                <div class="customer-details">
                    <h3>${customer.name}</h3>
                    <p>${customer.email}</p>
                </div>
            </div>
            <div class="customer-prints">${customer.printCount} prints</div>
        </div>
    `).join('');
}

function handleSort(field) {
    if (field === sortField) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortField = field;
        sortDirection = 'asc';
    }
    renderCustomers();
}

function addCustomer(e) {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const newCustomer = {
        id: String(customers.length + 1),
        name,
        email,
        printCount: 0,
        avatar: `https://i.pravatar.cc/150?img=${customers.length + 1}`
    };
    customers.push(newCustomer);
    renderCustomers();
    e.target.reset();
    alert(`${name} has been added to the customer list.`);
}

function sendMessage(e) {
    e.preventDefault();
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message) {
        addMessageToChat('User', message);
        messageInput.value = '';
        setTimeout(() => {
            addMessageToChat('AI', aiAnswers[currentAIQuestion], true);
            currentAIQuestion = (currentAIQuestion + 1) % aiAnswers.length;
        }, 1000);
    }
}

function addMessageToChat(sender, message, isAI = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', isAI ? 'ai' : 'user');
    messageElement.innerHTML = `
        <p><strong>${sender}:</strong> ${message}</p>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

function showModal(modal) {
    modal.style.display = 'block';
}

function hideModal(modal) {
    modal.style.display = 'none';
}

function logout() {
    // Implement logout functionality here (e.g., clear user session, tokens, etc.)
    alert('You have been logged out.');

    // Redirect to index.html
    window.location.href = "index.html";
}


function renderNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    notificationsList.innerHTML = notifications.map(notification => `
        <div class="notification-item">
            <p>${notification.message}</p>
        </div>
    `).join('');
}

function initCharts() {
    const ctx1 = document.getElementById('customerGrowthChart').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: chartData.map(d => d.name),
            datasets: [{
                label: 'Prints',
                data: chartData.map(d => d.prints),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Customer Growth'
                }
            }
        }
    });

    const ctx2 = document.getElementById('printVolumeChart').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: histogramData.map(d => d.range),
            datasets: [{
                label: 'Print Volume',
                data: histogramData.map(d => d.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Print Volume Distribution'
                }
            }
        }
    });
}

// Event Listeners
customerFilter.addEventListener('input', renderCustomers);
sortNameBtn.addEventListener('click', () => handleSort('name'));
sortPrintsBtn.addEventListener('click', () => handleSort('printCount'));
addCustomerForm.addEventListener('submit', addCustomer);
chatForm.addEventListener('submit', sendMessage);
notificationsBtn.addEventListener('click', () => {
    renderNotifications();
    showModal(notificationsModal);
});
settingsBtn.addEventListener('click', () => showModal(settingsModal));
themeToggleBtn.addEventListener('click', toggleTheme);
toggleThemeBtn.addEventListener('click', toggleTheme);
logoutBtn.addEventListener('click', logout);

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === notificationsModal) hideModal(notificationsModal);
    if (e.target === settingsModal) hideModal(settingsModal);
});

// Tab functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.style.display = 'none');
        btn.classList.add('active');
        document.getElementById(`${tabId}Tab`).style.display = 'block';
    });
});

// Initialize
renderCustomers();
initCharts();