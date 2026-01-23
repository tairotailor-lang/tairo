// ========================================
// TAIRO - COMPLETE JAVASCRIPT
// Dynamic Forms + WhatsApp Integration
// ========================================

// === GLOBAL VARIABLES ===
const WHATSAPP_NUMBER = '94784414956';
let currentCategory = '';
let currentSubcategory = '';

// === MOBILE MENU TOGGLE ===
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// === COPY TO CLIPBOARD ===
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        showCopyFeedback();
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.style.background = '#10b981';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        }
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showCopyFeedback();
    });
}

function showCopyFeedback() {
    const feedback = document.getElementById('copyFeedback');
    if (feedback) {
        feedback.classList.add('show');
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 2000);
    }
}

// === CATEGORIES DATA (ALL 16 CATEGORIES WITH COMPLETE DETAILS) ===
const categoriesData = {
    shirts: {
        name: 'Shirts (Men)',
        icon: '👔',
        subcategories: ['Full Sleeve Shirt', 'Half Sleeve Shirt', 'Slim Fit Shirt', 'Regular Fit Shirt', 'Office Shirt', 'Casual Shirt', 'School Uniform Shirt', 'College Uniform Shirt', 'Jubba Inner Shirt', 'Custom Design Shirt'],
        specificFields: [
            { name: 'collarType', label: 'Collar Type', type: 'select', options: ['Normal', 'Chinese', 'Stand', 'Band', 'Button-Down'] },
            { name: 'fitType', label: 'Fit Type', type: 'select', options: ['Slim Fit', 'Regular Fit', 'Loose Fit', 'Tailored'] },
            { name: 'pocketStyle', label: 'Pocket Style', type: 'select', options: ['No Pocket', 'Single', 'Double', 'Patch'] }
        ],
        measurements: [
            { name: 'chest', label: 'Chest', unit: 'inches' },
            { name: 'waist', label: 'Waist', unit: 'inches' },
            { name: 'shoulder', label: 'Shoulder Width', unit: 'inches' },
            { name: 'sleeveLength', label: 'Sleeve Length', unit: 'inches' },
            { name: 'shirtLength', label: 'Shirt Length', unit: 'inches' }
        ]
    },
    pants: {
        name: 'Pants / Trousers (Men)',
        icon: '👖',
        subcategories: ['Formal Pant', 'Casual Pant', 'School Uniform Pant', 'Office Pant', 'Ankle Pant', 'Straight Fit Pant', 'Cargo Pant', 'Custom Tailored Pant'],
        specificFields: [
            { name: 'bottomType', label: 'Length', type: 'select', options: ['Full Length', 'Ankle Length', '3/4 Length'] },
            { name: 'pleats', label: 'Pleats', type: 'select', options: ['No Pleats', 'Single Pleat', 'Double Pleat'] },
            { name: 'fitType', label: 'Fit Type', type: 'select', options: ['Slim', 'Regular', 'Relaxed', 'Straight'] }
        ],
        measurements: [
            { name: 'waist', label: 'Waist', unit: 'inches' },
            { name: 'hip', label: 'Hip', unit: 'inches' },
            { name: 'thigh', label: 'Thigh', unit: 'inches' },
            { name: 'inseamLength', label: 'Inseam Length', unit: 'inches' }
        ]
    },
    jubba: {
        name: 'Jubba / Thobe (Men)',
        icon: '🕌',
        subcategories: ['Normal Jubba', 'Saudi Jubba', 'Pakistani Jubba', 'Emirati Jubba', 'Jubba with Embroidery', 'Wedding Jubba', 'Kids Jubba', 'Custom Jubba Design'],
        specificFields: [
            { name: 'collarStyle', label: 'Collar Style', type: 'select', options: ['Normal', 'Stand', 'Band', 'No Collar'] },
            { name: 'embroideryRequired', label: 'Embroidery Required', type: 'select', options: ['Yes', 'No'] },
            { name: 'frontStyle', label: 'Front Style', type: 'select', options: ['Full Buttons', 'Half Buttons', 'Hidden'] }
        ],
        measurements: [
            { name: 'chest', label: 'Chest', unit: 'inches' },
            { name: 'waist', label: 'Waist', unit: 'inches' },
            { name: 'shoulder', label: 'Shoulder Width', unit: 'inches' },
            { name: 'sleeveLength', label: 'Sleeve Length', unit: 'inches' },
            { name: 'jubbaLength', label: 'Jubba Length', unit: 'inches' }
        ]
    },
    abaya: {
        name: 'Abaya (Women)',
        icon: '🧕',
        subcategories: ['Simple Abaya', 'Umbrella Cut Abaya', 'Front Open Abaya', 'Embroidery Abaya', 'Party Wear Abaya', 'Wedding Abaya', 'Daily Wear Abaya', 'Kids Abaya', 'Custom Abaya Design'],
        specificFields: [
            { name: 'frontStyle', label: 'Front Style', type: 'select', options: ['Front Open', 'Front Closed'] },
            { name: 'openingType', label: 'Opening Type', type: 'select', options: ['Zip', 'Buttons', 'Hook & Eye', 'Magnetic'] },
            { name: 'designType', label: 'Design Type', type: 'select', options: ['Plain', 'Embroidered', 'Stone Work', 'Lace'] },
            { name: 'hijabIncluded', label: 'Hijab Included', type: 'select', options: ['Yes', 'No'] }
        ],
        measurements: [
            { name: 'height', label: 'Height', unit: 'inches' },
            { name: 'abayaLength', label: 'Abaya Length', unit: 'inches' },
            { name: 'bust', label: 'Bust', unit: 'inches' },
            { name: 'sleeveLength', label: 'Sleeve Length', unit: 'inches' }
        ]
    },
    frock: {
        name: 'Frock (Women/Kids)',
        icon: '👗',
        subcategories: ['Long Frock', 'Short Frock', 'Party Wear Frock', 'Casual Frock', 'Kids Frock', 'Layered Frock', 'A-Line Frock', 'Ball Gown Frock', 'Custom Frock Design'],
        specificFields: [
            { name: 'neckDesign', label: 'Neck Design', type: 'select', options: ['Round', 'V-Neck', 'Boat', 'Square', 'Sweetheart'] },
            { name: 'layerType', label: 'Layer Type', type: 'select', options: ['Single', 'Double', 'Triple', 'Custom'] },
            { name: 'sleeveStyle', label: 'Sleeve Style', type: 'select', options: ['Sleeveless', 'Short', '3/4', 'Full', 'Cap'] }
        ],
        measurements: [
            { name: 'bust', label: 'Bust', unit: 'inches' },
            { name: 'waist', label: 'Waist', unit: 'inches' },
            { name: 'hip', label: 'Hip', unit: 'inches' },
            { name: 'frockLength', label: 'Frock Length', unit: 'inches' }
        ]
    },
    blouse: {
        name: 'Saree Blouse (Women)',
        icon: '👚',
        subcategories: ['Normal Blouse', 'Padded Blouse', 'Designer Blouse', 'Wedding Blouse', 'Full Sleeve Blouse', 'Half Sleeve Blouse', 'Boat Neck Blouse', 'Back Design Blouse', 'Custom Blouse Design'],
        specificFields: [
            { name: 'padding', label: 'Padding', type: 'select', options: ['Yes (Thick)', 'Yes (Medium)', 'Yes (Light)', 'No'] },
            { name: 'hookType', label: 'Hook Type', type: 'select', options: ['Standard Hook', 'Dori/Tie', 'Zip', 'Button'] },
            { name: 'backStyle', label: 'Back Style', type: 'select', options: ['Deep', 'Medium', 'High', 'Halter'] },
            { name: 'neckDesign', label: 'Neck Design', type: 'select', options: ['Round', 'V-Neck', 'Boat', 'Square'] }
        ],
        measurements: [
            { name: 'bust', label: 'Bust', unit: 'inches' },
            { name: 'underBust', label: 'Under Bust', unit: 'inches' },
            { name: 'waist', label: 'Waist', unit: 'inches' },
            { name: 'blouseLength', label: 'Blouse Length', unit: 'inches' },
            { name: 'backDepth', label: 'Back Depth', unit: 'inches' }
        ]
    },
    salwar: {
        name: 'Salwar / Shalwar (Women)',
        icon: '👘',
        subcategories: ['Salwar Suit', 'Pakistani Salwar', 'Straight Cut Salwar', 'Anarkali Salwar', 'Palazzo Salwar', 'Party Wear Salwar', 'Daily Wear Salwar', 'Kids Salwar', 'Custom Salwar Design'],
        specificFields: [
            { name: 'dupattaRequired', label: 'Dupatta Required', type: 'select', options: ['Yes', 'No'] },
            { name: 'neckDesign', label: 'Neck Design', type: 'select', options: ['Round', 'V-Neck', 'Boat', 'Chinese Collar'] },
            { name: 'salwarStyle', label: 'Salwar Style', type: 'select', options: ['Churidar', 'Straight', 'Palazzo', 'Patiala'] }
        ],
        measurements: [
            { name: 'bust', label: 'Bust', unit: 'inches' },
            { name: 'waist', label: 'Waist', unit: 'inches' },
            { name: 'topLength', label: 'Top Length', unit: 'inches' },
            { name: 'bottomLength', label: 'Bottom Length', unit: 'inches' }
        ]
    },
    skirts: {
        name: 'Skirts (Women)',
        icon: '👗',
        subcategories: ['Long Skirt', 'Short Skirt', 'Pleated Skirt', 'Office Skirt', 'Casual Skirt', 'Party Skirt', 'Layered Skirt', 'Pencil Skirt', 'Custom Skirt Design'],
        specificFields: [
            { name: 'closureType', label: 'Closure Type', type: 'select', options: ['Zip (Side)', 'Zip (Back)', 'Elastic', 'Button'] },
            { name: 'pleatType', label: 'Pleat Type', type: 'select', options: ['No Pleats', 'Box', 'Knife', 'Accordion'] }
        ],
        measurements: [
            { name: 'waist', label: 'Waist', unit: 'inches' },
            { name: 'hip', label: 'Hip', unit: 'inches' },
            { name: 'skirtLength', label: 'Skirt Length', unit: 'inches' }
        ]
    },
    tops: {
        name: 'Tops (Women)',
        icon: '👚',
        subcategories: ['Casual Top', 'Office Top', 'Party Wear Top', 'Long Top', 'Short Top', 'Kurti Top', 'Crop Top', 'Peplum Top', 'Tunic Top', 'Layered Top', 'Sleeveless Top', 'Full Sleeve Top', 'Custom Top Design'],
        specificFields: [
            { name: 'sleeveType', label: 'Sleeve Type', type: 'select', options: ['Sleeveless', 'Short', '3/4', 'Full', 'Cap'] },
            { name: 'neckType', label: 'Neck Type', type: 'select', options: ['Round', 'V-Neck', 'Boat', 'Square', 'High'] },
            { name: 'fitType', label: 'Fit Type', type: 'select', options: ['Loose', 'Regular', 'Fitted', 'Oversized'] }
        ],
        measurements: [
            { name: 'bust', label: 'Bust', unit: 'inches' },
            { name: 'waist', label: 'Waist', unit: 'inches' },
            { name: 'topLength', label: 'Top Length', unit: 'inches' },
            { name: 'shoulder', label: 'Shoulder Width', unit: 'inches' }
        ]
    },
    school: {
        name: 'School Uniforms',
        icon: '🎓',
        subcategories: ['Boys Shirt', 'Boys Pant', 'Girls Frock', 'Girls Skirt', 'Girls Blouse', 'Hijab for School', 'Sports Uniform', 'Complete Uniform Set'],
        specificFields: [
            { name: 'schoolName', label: 'School Name', type: 'text' },
            { name: 'classGrade', label: 'Class / Grade', type: 'text' },
            { name: 'badgeRequired', label: 'Logo / Badge Required', type: 'select', options: ['Yes', 'No'] }
        ],
        measurements: [
            { name: 'chest', label: 'Chest / Bust', unit: 'inches' },
            { name: 'waist', label: 'Waist', unit: 'inches' },
            { name: 'length', label: 'Length', unit: 'inches' }
        ]
    },
    kids: {
        name: 'Kids Wear',
        icon: '👶',
        subcategories: ['Kids Shirt', 'Kids Pant', 'Kids Frock', 'Kids Jubba', 'Kids Abaya', 'Birthday Dress', 'School Dress', 'Custom Kids Wear'],
        specificFields: [
            { name: 'childAge', label: 'Child Age', type: 'select', options: ['0-1Y', '1-2Y', '2-3Y', '3-4Y', '4-5Y', '5-6Y', '6-8Y', '8-10Y', '10-12Y', '12-14Y'] },
            { name: 'comfortFit', label: 'Comfort Fit', type: 'select', options: ['Yes (Loose)', 'Standard'] }
        ],
        measurements: [
            { name: 'chest', label: 'Chest', unit: 'inches' },
            { name: 'waist', label: 'Waist', unit: 'inches' },
            { name: 'length', label: 'Length', unit: 'inches' }
        ]
    },
    bags: {
        name: 'Bags & Accessories',
        icon: '👜',
        subcategories: ['Hand Bag', 'School Bag (Cloth)', 'Tote Bag', 'Travel Pouch', 'Laptop Bag (Cloth)', 'Shopping Bag', 'Custom Bag Design'],
        specificFields: [
            { name: 'handleType', label: 'Handle Type', type: 'select', options: ['Short', 'Long', 'Shoulder', 'Crossbody', 'None'] },
            { name: 'zipRequired', label: 'Zip Required', type: 'select', options: ['Yes (Main)', 'Yes (Multiple)', 'No (Open)'] },
            { name: 'bagSize', label: 'Size', type: 'select', options: ['Small', 'Medium', 'Large', 'Custom'] }
        ],
        measurements: [
            { name: 'length', label: 'Length', unit: 'inches' },
            { name: 'width', label: 'Width', unit: 'inches' },
            { name: 'height', label: 'Height', unit: 'inches' }
        ]
    },
    alterations: {
        name: 'Alterations & Repairs',
        icon: '✂️',
        subcategories: ['Pant Shortening', 'Shirt Fitting', 'Abaya Length Adjustment', 'Zip Change', 'Button Fixing', 'Waist Adjustment', 'Sleeve Adjustment', 'General Repair'],
        specificFields: [
            { name: 'alterationType', label: 'Alteration Type', type: 'text' },
            { name: 'urgencyLevel', label: 'Urgency Level', type: 'select', options: ['Regular (5-7 days)', 'Fast (2-3 days)', 'Express (Same day)'] },
            { name: 'issueDescription', label: 'Description of Issue', type: 'textarea' }
        ],
        measurements: [
            { name: 'existing', label: 'Existing Measurements', unit: 'text' },
            { name: 'required', label: 'Required New Measurements', unit: 'text' }
        ]
    },
    wedding: {
        name: 'Wedding / Special Wear',
        icon: '💒',
        subcategories: ['Wedding Dress (Bride)', 'Groom Wear', 'Bridal Abaya', 'Bridal Blouse', 'Bridal Frock', 'Bridesmaid Dress', 'Custom Wedding Outfit'],
        specificFields: [
            { name: 'trialFittingRequired', label: 'Trial Fitting Required', type: 'select', options: ['Yes (Recommended)', 'No'] },
            { name: 'embroideryLevel', label: 'Embroidery Level', type: 'select', options: ['Light', 'Medium', 'Heavy', 'Very Heavy'] },
            { name: 'eventDate', label: 'Event Date', type: 'date' }
        ],
        measurements: [
            { name: 'bust', label: 'Bust', unit: 'inches' },
            { name: 'waist', label: 'Waist', unit: 'inches' },
            { name: 'hip', label: 'Hip', unit: 'inches' },
            { name: 'length', label: 'Length', unit: 'inches' }
        ]
    },
    bulk: {
        name: 'Bulk Orders',
        icon: '📦',
        subcategories: ['School Uniform Bulk (50+ pieces)', 'Madrasa Uniform Bulk', 'Office Uniform Bulk', 'Event Dress Bulk', 'Shop Staff Uniform', 'Custom Bulk Order'],
        specificFields: [
            { name: 'estimatedQuantity', label: 'Estimated Quantity (min 50)', type: 'number' },
            { name: 'organizationName', label: 'Organization Name', type: 'text' },
            { name: 'sampleRequired', label: 'Sample Required', type: 'select', options: ['Yes (Recommended)', 'No'] }
        ],
        measurements: [
            { name: 'sizeBreakdown', label: 'Size Breakdown (XS, S, M, L, XL, XXL)', unit: 'text' }
        ]
    },
    custom: {
        name: 'Custom Design',
        icon: '🎨',
        subcategories: ['Unique Design (No matching category)', 'Fusion Wear', 'Designer Outfit', 'Special Request'],
        specificFields: [
            { name: 'designDescription', label: 'Design Description', type: 'textarea' },
            { name: 'specialFabric', label: 'Special Fabric Required', type: 'select', options: ['Yes', 'No'] },
            { name: 'consultationRequired', label: 'Consultation Required', type: 'select', options: ['Yes (Recommended)', 'No'] }
        ],
        measurements: [
            { name: 'custom', label: 'Measurements (Please describe)', unit: 'textarea' }
        ]
    }
};

// === SHOW SUBCATEGORIES MODAL ===
function showSubcategories(categoryId) {
    currentCategory = categoryId;
    const category = categoriesData[categoryId];
    
    if (!category) return;
    
    const modal = document.getElementById('subcategoryModal');
    const modalTitle = document.getElementById('modalTitle');
    const subcategoryGrid = document.getElementById('subcategoryGrid');
    
    modalTitle.textContent = `${category.icon} ${category.name}`;
    
    // Render subcategories
    subcategoryGrid.innerHTML = category.subcategories.map(subcategory => `
        <div class="subcategory-item" onclick="selectSubcategory('${categoryId}', '${subcategory}')">
            <strong>${subcategory}</strong>
        </div>
    `).join('');
    
    modal.classList.add('active');
}

// === CLOSE MODAL ===
function closeModal() {
    document.getElementById('subcategoryModal').classList.remove('active');
}

function closeOrderModal() {
    document.getElementById('orderModal').classList.remove('active');
}

// === SELECT SUBCATEGORY ===
function selectSubcategory(categoryId, subcategory) {
    currentCategory = categoryId;
    currentSubcategory = subcategory;
    
    const category = categoriesData[categoryId];
    const subcategoryGrid = document.getElementById('subcategoryGrid');
    
    // Update all subcategory items to show as unselected
    const allItems = subcategoryGrid.querySelectorAll('.subcategory-item');
    allItems.forEach(item => {
        item.classList.remove('selected');
        const existingButtons = item.querySelector('.subcategory-actions');
        if (existingButtons) {
            existingButtons.remove();
        }
    });
    
    // Find and highlight the selected item
    allItems.forEach(item => {
        if (item.textContent.trim() === subcategory) {
            item.classList.add('selected');
            
            // Add action buttons below the subcategory
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'subcategory-actions';
            actionsDiv.innerHTML = `
                <button class="btn-glass btn-whatsapp" onclick="sendEnquiry('${categoryId}', '${subcategory}')" style="width: 100%; margin-bottom: 0.5rem;">
                    Enquire on WhatsApp
                </button>
                <button class="btn-glass" onclick="showOrderForm('${categoryId}', '${subcategory}')" style="width: 100%;">
                    Place Order
                </button>
            `;
            item.appendChild(actionsDiv);
        }
    });
}

// === SEND ENQUIRY ON WHATSAPP ===
function sendEnquiry(categoryId, subcategory) {
    const category = categoriesData[categoryId];
    const message = `Hello Tairo 👋

I would like to enquire about the following service:

Category: ${category.name}
Sub Category: ${subcategory}

Please share more details.`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// === SHOW ORDER FORM ===
function showOrderForm(categoryId, subcategory) {
    const category = categoriesData[categoryId];
    const modal = document.getElementById('orderModal');
    const modalTitle = document.getElementById('orderModalTitle');
    const orderFormFields = document.getElementById('orderFormFields');
    
    modalTitle.textContent = `${category.icon} Place Order`;
    
    // Close subcategory modal
    closeModal();
    
    // Build category-specific order form
    let formHTML = '';
    
    // Selected Category and Subcategory (readonly)
    formHTML += `
        <div class="form-group">
            <label>Selected Category</label>
            <input type="text" name="category" value="${category.name}" readonly style="background: #f3f4f6; cursor: not-allowed;">
        </div>
        <div class="form-group">
            <label>Selected Sub Category</label>
            <input type="text" name="subcategory" value="${subcategory}" readonly style="background: #f3f4f6; cursor: not-allowed;">
        </div>
        
        <h4 style="color: #7c3aed; margin: 2rem 0 1rem;">Customer Details</h4>
        
        <div class="form-group">
            <label>Customer Name *</label>
            <input type="text" name="customerName" required placeholder="Your full name">
        </div>
        <div class="form-group">
            <label>Phone Number *</label>
            <input type="tel" name="phone" required pattern="[0-9]{10}" placeholder="0784414956">
            <small style="color: #666;">10-digit mobile number</small>
        </div>
        
        <h4 style="color: #7c3aed; margin: 2rem 0 1rem;">Order Information</h4>
        
        <div class="form-group">
            <label>Order Type *</label>
            <select name="orderType" required>
                <option value="">Select order type</option>
                <option value="New">New</option>
                <option value="Alteration">Alteration</option>
                <option value="Repeat Order">Repeat Order</option>
            </select>
        </div>
        <div class="form-group">
            <label>Quantity *</label>
            <input type="number" name="quantity" required min="1" value="1" placeholder="1">
        </div>
        <div class="form-group">
            <label>Delivery Date *</label>
            <input type="date" name="deliveryDate" required>
        </div>
        <div class="form-group">
            <label>Fabric Type *</label>
            <select name="fabricType" required>
                <option value="">Select fabric source</option>
                <option value="Customer Provided">Customer Provided</option>
                <option value="From Shop">From Shop</option>
            </select>
        </div>
    `;
    
    // Add category-specific fields
    if (category.specificFields && category.specificFields.length > 0) {
        formHTML += '<h4 style="color: #7c3aed; margin: 2rem 0 1rem;">Specific Details</h4>';
        
        category.specificFields.forEach(field => {
            formHTML += '<div class="form-group">';
            formHTML += `<label>${field.label}</label>`;
            
            if (field.type === 'select') {
                formHTML += `<select name="${field.name}">`;
                formHTML += '<option value="">Select option</option>';
                field.options.forEach(option => {
                    formHTML += `<option value="${option}">${option}</option>`;
                });
                formHTML += '</select>';
            } else if (field.type === 'textarea') {
                formHTML += `<textarea name="${field.name}" placeholder="${field.label}"></textarea>`;
            } else if (field.type === 'number') {
                formHTML += `<input type="number" name="${field.name}" placeholder="${field.label}">`;
            } else if (field.type === 'date') {
                formHTML += `<input type="date" name="${field.name}">`;
            } else {
                formHTML += `<input type="text" name="${field.name}" placeholder="${field.label}">`;
            }
            
            formHTML += '</div>';
        });
    }
    
    // Add category-specific measurements
    if (category.measurements && category.measurements.length > 0) {
        formHTML += '<h4 style="color: #7c3aed; margin: 2rem 0 1rem;">Measurements</h4>';
        
        category.measurements.forEach(measurement => {
            formHTML += '<div class="form-group">';
            formHTML += `<label>${measurement.label}`;
            if (measurement.unit !== 'text' && measurement.unit !== 'textarea') {
                formHTML += ` (${measurement.unit})`;
            }
            formHTML += '</label>';
            
            if (measurement.unit === 'textarea') {
                formHTML += `<textarea name="meas_${measurement.name}" placeholder="${measurement.label}"></textarea>`;
            } else {
                formHTML += `<input type="text" name="meas_${measurement.name}" placeholder="Enter ${measurement.label.toLowerCase()}">`;
            }
            
            formHTML += '</div>';
        });
    }
    
    // Additional fields
    formHTML += '<h4 style="color: #7c3aed; margin: 2rem 0 1rem;">Additional Information</h4>';
    
    formHTML += `
        <div class="form-group">
            <label>Additional Notes (Optional)</label>
            <textarea name="notes" placeholder="Any special requirements or additional details"></textarea>
        </div>
    `;
    
    orderFormFields.innerHTML = formHTML;
    modal.classList.add('active');
}

// === SUBMIT ORDER ===
function submitOrder(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const category = categoriesData[currentCategory];
    
    // Build WhatsApp message with all fields
    let message = `🧵 NEW ORDER - TAIRO\n\n`;
    
    message += `👤 CUSTOMER DETAILS\n`;
    message += `Name: ${formData.get('customerName')}\n`;
    message += `Phone: ${formData.get('phone')}\n\n`;
    
    message += `📦 ORDER INFORMATION\n`;
    message += `Category: ${formData.get('category')}\n`;
    message += `Sub Category: ${formData.get('subcategory')}\n`;
    message += `Order Type: ${formData.get('orderType')}\n`;
    message += `Quantity: ${formData.get('quantity')}\n`;
    message += `Delivery Date: ${formData.get('deliveryDate')}\n`;
    message += `Fabric Type: ${formData.get('fabricType')}\n\n`;
    
    // Add category-specific fields
    if (category.specificFields && category.specificFields.length > 0) {
        message += `🎯 SPECIFIC DETAILS\n`;
        category.specificFields.forEach(field => {
            const value = formData.get(field.name);
            if (value) {
                message += `${field.label}: ${value}\n`;
            }
        });
        message += '\n';
    }
    
    // Add category-specific measurements
    if (category.measurements && category.measurements.length > 0) {
        message += `📏 MEASUREMENTS\n`;
        category.measurements.forEach(measurement => {
            const value = formData.get(`meas_${measurement.name}`);
            if (value) {
                message += `${measurement.label}: ${value}`;
                if (measurement.unit !== 'text' && measurement.unit !== 'textarea') {
                    message += ` ${measurement.unit}`;
                }
                message += '\n';
            }
        });
        message += '\n';
    }
    
    // Add additional notes
    const notes = formData.get('notes');
    if (notes) {
        message += `📝 ADDITIONAL NOTES\n${notes}\n\n`;
    }
    
    message += `---\nSent via Tairo Platform`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    closeOrderModal();
}

// === TAILOR REGISTRATION ===
function submitTailorForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    let message = `👩‍💼 TAILOR REGISTRATION - TAIRO\n\n`;
    message += `📋 PERSONAL DETAILS\n`;
    message += `Name: ${formData.get('name')}\n`;
    message += `Age: ${formData.get('age')}\n`;
    message += `Contact: ${formData.get('contact')}\n`;
    message += `Address: ${formData.get('address')}\n\n`;
    
    message += `🧵 PROFESSIONAL INFO\n`;
    message += `Working Hours: ${formData.get('workingHours')}\n`;
    message += `Machines: ${formData.get('machines')}\n`;
    message += `Skills: ${formData.get('skills')}\n`;
    message += `Experience: ${formData.get('experience')} years\n`;
    
    const additional = formData.get('additional');
    if (additional) {
        message += `\n📝 ADDITIONAL INFO\n${additional}\n`;
    }
    
    message += `\n---\nPlease verify my application`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// === PAYMENT PROOF SUBMISSION ===
function submitPaymentProof(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    let message = `💰 PAYMENT PROOF - TAIRO\n\n`;
    message += `Name: ${formData.get('name')}\n`;
    message += `WhatsApp: ${formData.get('whatsapp')}\n`;
    
    const amount = formData.get('amount');
    if (amount) {
        message += `Amount: ${amount}\n`;
    }
    
    const description = formData.get('description');
    if (description) {
        message += `Description: ${description}\n`;
    }
    
    message += `\n*I am sending the payment screenshot now.*\n`;
    message += `\n---\nSent via Tairo Platform`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// === CLOSE MODAL ON OUTSIDE CLICK ===
document.addEventListener('click', function(event) {
    const subcategoryModal = document.getElementById('subcategoryModal');
    const orderModal = document.getElementById('orderModal');
    
    if (event.target === subcategoryModal) {
        closeModal();
    }
    if (event.target === orderModal) {
        closeOrderModal();
    }
});

// === SMOOTH SCROLL ===
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
// Toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
}

// Auto-detect current page and set active state
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Remove active class from all links first
        link.classList.remove('active');
        
        // Get the href filename
        const linkPage = link.getAttribute('href');
        
        // Add active class to matching link
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
        
        // Special case: if we're at root or index.html, highlight home
        if ((currentPage === '' || currentPage === 'index.html') && linkPage === 'index.html') {
            link.classList.add('active');
        }
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.getElementById('navLinks');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!event.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
    }
});