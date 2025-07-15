// Mock Data for the Media Engagement Portal
const mockData = {
    products: [
        {
            name: "Maybelline Foundation",
            location: "NYC Store",
            impressions: 100,
            timeFrame: "Last 1 hour",
            engagement: 85,
            category: "Beauty"
        },
        {
            name: "Gillette Razor",
            location: "SFO Store",
            impressions: 2,
            timeFrame: "Yesterday",
            engagement: 45,
            category: "Personal Care"
        },
        {
            name: "Dove Shampoo",
            location: "LA Store",
            impressions: 67,
            timeFrame: "Last 6 hours",
            engagement: 92,
            category: "Personal Care"
        },
        {
            name: "Tylenol",
            location: "Chicago Store",
            impressions: 23,
            timeFrame: "Last 24 hours",
            engagement: 78,
            category: "Pharmacy"
        },
        {
            name: "Vitamin C",
            location: "Seattle Store",
            impressions: 156,
            timeFrame: "Last 2 hours",
            engagement: 88,
            category: "Vitamins"
        }
    ],
    stores: [
        {
            name: "NYC Store",
            location: "New York, NY",
            impressions: 245,
            timeFrame: "Last 24 hours",
            performance: "High"
        },
        {
            name: "SFO Store",
            location: "San Francisco, CA",
            impressions: 89,
            timeFrame: "Last 24 hours",
            performance: "Medium"
        },
        {
            name: "LA Store",
            location: "Los Angeles, CA",
            impressions: 178,
            timeFrame: "Last 24 hours",
            performance: "High"
        },
        {
            name: "Woonsocket Store",
            location: "Woonsocket, RI",
            impressions: 34,
            timeFrame: "Last 24 hours",
            performance: "Low"
        }
    ],
    pricing: [
        {
            location: "NYC Store - Prime Time",
            details: "High traffic, premium location",
            recommendedPrice: "$150/hour",
            reason: "High engagement rate (85%)"
        },
        {
            location: "SFO Store - Off Peak",
            details: "Lower traffic, standard location",
            recommendedPrice: "$45/hour",
            reason: "Low engagement rate (45%)"
        },
        {
            location: "LA Store - Peak Hours",
            details: "High traffic, premium location",
            recommendedPrice: "$120/hour",
            reason: "Excellent engagement rate (92%)"
        },
        {
            location: "Woonsocket Store - Off Peak",
            details: "Lower traffic, standard location",
            recommendedPrice: "$10/hour",
            reason: "Low engagement rate (45%)"
        }
    ]
};

// Global variables
let currentTimeFilter = '1h';
let isRefreshing = false;

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentTime();
    populateDashboard();
    setInterval(updateCurrentTime, 1000);
    setInterval(simulateRealTimeUpdates, 30000); // Update every 30 seconds
});

// Update current time display
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('currentTime').textContent = timeString;
}

// Populate dashboard with data
function populateDashboard() {
    populateProductList();
    populateStoreList();
    populatePricingList();
    updateMetrics();
}

// Populate product performance list
function populateProductList() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    mockData.products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-location">${product.location} • ${product.category}</div>
            </div>
            <div class="product-stats">
                <div class="product-impressions">${product.impressions}</div>
                <div class="product-time">${product.timeFrame}</div>
            </div>
        `;
        productList.appendChild(productItem);
    });
}

// Populate store performance list
function populateStoreList() {
    const storeList = document.getElementById('storeList');
    storeList.innerHTML = '';

    mockData.stores.forEach(store => {
        const storeItem = document.createElement('div');
        storeItem.className = 'store-item';
        storeItem.innerHTML = `
            <div class="store-info">
                <div class="store-name">${store.name}</div>
                <div class="store-location">${store.location}</div>
            </div>
            <div class="store-stats">
                <div class="store-impressions">${store.impressions}</div>
                <div class="store-time">${store.timeFrame}</div>
            </div>
        `;
        storeList.appendChild(storeItem);
    });
}

// Populate pricing recommendations
function populatePricingList() {
    const pricingList = document.getElementById('pricingList');
    pricingList.innerHTML = '';

    mockData.pricing.forEach(pricing => {
        const pricingItem = document.createElement('div');
        pricingItem.className = 'pricing-item';
        pricingItem.innerHTML = `
            <div class="pricing-info">
                <div class="pricing-location">${pricing.location}</div>
                <div class="pricing-details">${pricing.details}</div>
            </div>
            <div class="pricing-recommendation">
                <div class="pricing-amount">${pricing.recommendedPrice}</div>
                <div class="pricing-reason">${pricing.reason}</div>
            </div>
        `;
        pricingList.appendChild(pricingItem);
    });
}

// Update key metrics
function updateMetrics() {
    const totalImpressions = mockData.products.reduce((sum, product) => sum + product.impressions, 0);
    const activeStores = mockData.stores.length;
    const productsDisplayed = mockData.products.length;
    const revenueGenerated = calculateRevenue();

    document.getElementById('totalImpressions').textContent = totalImpressions.toLocaleString();
    document.getElementById('activeStores').textContent = activeStores;
    document.getElementById('productsDisplayed').textContent = productsDisplayed;
    document.getElementById('revenueGenerated').textContent = `$${revenueGenerated.toLocaleString()}`;
}

// Calculate revenue based on impressions and pricing
function calculateRevenue() {
    let totalRevenue = 0;
    mockData.products.forEach(product => {
        // Simple revenue calculation based on impressions and engagement
        const basePrice = 0.50; // $0.50 per impression
        const engagementMultiplier = product.engagement / 100;
        totalRevenue += product.impressions * basePrice * engagementMultiplier;
    });
    return Math.round(totalRevenue);
}

// Filter data by time
function filterByTime() {
    const timeFilter = document.getElementById('timeFilter').value;
    currentTimeFilter = timeFilter;
    
    // Add loading state
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.add('loading'));
    
    // Simulate API call delay
    setTimeout(() => {
        // Update data based on time filter
        updateDataForTimeFilter(timeFilter);
        cards.forEach(card => card.classList.remove('loading'));
    }, 1000);
}

// Update data based on time filter
function updateDataForTimeFilter(timeFilter) {
    // In a real application, this would fetch data from an API
    // For now, we'll simulate different data based on time filter
    const timeMultipliers = {
        '1h': 1,
        '24h': 24,
        '7d': 168,
        '30d': 720
    };
    
    const multiplier = timeMultipliers[timeFilter] || 1;
    
    // Update product impressions based on time filter
    mockData.products.forEach(product => {
        const baseImpressions = product.impressions;
        product.impressions = Math.round(baseImpressions * multiplier);
        
        // Update time frame display
        switch(timeFilter) {
            case '1h':
                product.timeFrame = 'Last 1 hour';
                break;
            case '24h':
                product.timeFrame = 'Last 24 hours';
                break;
            case '7d':
                product.timeFrame = 'Last 7 days';
                break;
            case '30d':
                product.timeFrame = 'Last 30 days';
                break;
        }
    });
    
    // Re-populate the dashboard
    populateDashboard();
}

// Refresh data function
function refreshData() {
    if (isRefreshing) return;
    
    isRefreshing = true;
    const refreshBtn = document.querySelector('.btn-primary');
    const originalText = refreshBtn.innerHTML;
    
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
    refreshBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Generate new random data
        generateNewData();
        populateDashboard();
        
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
        isRefreshing = false;
        
        // Show success message
        showNotification('Data refreshed successfully!', 'success');
    }, 2000);
}

// Generate new random data
function generateNewData() {
    mockData.products.forEach(product => {
        // Add some randomness to impressions
        const variation = Math.random() * 0.4 + 0.8; // ±20% variation
        product.impressions = Math.round(product.impressions * variation);
        
        // Update engagement slightly
        const engagementVariation = Math.random() * 20 - 10; // ±10 variation
        product.engagement = Math.max(0, Math.min(100, product.engagement + engagementVariation));
    });
    
    mockData.stores.forEach(store => {
        const variation = Math.random() * 0.4 + 0.8;
        store.impressions = Math.round(store.impressions * variation);
    });
}

// Simulate real-time updates
function simulateRealTimeUpdates() {
    // Randomly update one product's impressions
    const randomProduct = mockData.products[Math.floor(Math.random() * mockData.products.length)];
    const increment = Math.floor(Math.random() * 5) + 1;
    randomProduct.impressions += increment;
    
    // Update the display
    populateProductList();
    updateMetrics();
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#c6f6d5' : '#bee3f8'};
        color: ${type === 'success' ? '#22543d' : '#2a4365'};
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add click handlers for interactive elements
document.addEventListener('click', function(e) {
    // Product item click
    if (e.target.closest('.product-item')) {
        const productItem = e.target.closest('.product-item');
        const productName = productItem.querySelector('.product-name').textContent;
        showProductDetails(productName);
    }
    
    // Store item click
    if (e.target.closest('.store-item')) {
        const storeItem = e.target.closest('.store-item');
        const storeName = storeItem.querySelector('.store-name').textContent;
        showStoreDetails(storeName);
    }
});

// Show product details modal
function showProductDetails(productName) {
    const product = mockData.products.find(p => p.name === productName);
    if (!product) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${product.name}</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <p><strong>Location:</strong> ${product.location}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Impressions:</strong> ${product.impressions}</p>
                <p><strong>Engagement Rate:</strong> ${product.engagement}%</p>
                <p><strong>Time Frame:</strong> ${product.timeFrame}</p>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    `;
    
    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #e2e8f0;
    `;
    
    const modalClose = modal.querySelector('.modal-close');
    modalClose.style.cssText = `
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #a0aec0;
    `;
    
    document.body.appendChild(modal);
}

// Show store details modal
function showStoreDetails(storeName) {
    const store = mockData.stores.find(s => s.name === storeName);
    if (!store) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${store.name}</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">×</button>
            </div>
            <div class="modal-body">
                <p><strong>Location:</strong> ${store.location}</p>
                <p><strong>Impressions:</strong> ${store.impressions}</p>
                <p><strong>Performance:</strong> ${store.performance}</p>
                <p><strong>Time Frame:</strong> ${store.timeFrame}</p>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    `;
    
    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #e2e8f0;
    `;
    
    const modalClose = modal.querySelector('.modal-close');
    modalClose.style.cssText = `
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #a0aec0;
    `;
    
    document.body.appendChild(modal);
} 