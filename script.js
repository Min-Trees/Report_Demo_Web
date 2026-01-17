// Criteria data structure
const criteriaData = {
    categories: [
        {
            name: "Tư duy máy tính, tư duy thuật toán",
            maxScore: 1.5,
            items: [
                { id: "c1", content: "Đầy đủ 3 phần: header - body - footer cho mỗi webpage", maxScore: 0.25 },
                { id: "c2", content: "Bố cục đáp ứng đa thiết bị (Tối thiểu trang chủ phải được responsive)", maxScore: 0.25 },
                { id: "c3", content: "Sử dụng dữ liệu từ nguồn API bên ngoài và hiển thị lên trang web", maxScore: 0.25 },
                { id: "c4", content: "Thiết kế giao diện tối ưu, tận dụng CSS Grid để xây dựng UI", maxScore: 0.25 },
                { id: "c5", content: "Xây dựng trang đăng nhập / đăng ký và lưu dữ liệu bằng Local Storage", maxScore: 0.25 },
                { id: "c6", content: "Xây dựng đầy đủ những tính năng CRUD", maxScore: 0.25 }
            ]
        },
        {
            name: "Tư duy sáng tạo",
            maxScore: 1.0,
            items: [
                { id: "c7", content: "Ý tưởng phù hợp nhu cầu người dùng và độ tuổi", maxScore: 0.25 },
                { id: "c8", content: "Nội dung độc đáo, sáng tạo, hạn chế sử dụng lại ý tưởng của sản phẩm mẫu", maxScore: 0.25 },
                { id: "c9", content: "Bố cục rõ ràng, hình ảnh, màu sắc đẹp mắt (có sử dụng icon, mã màu RGB, Hex code..)", maxScore: 0.25 },
                { id: "c10", content: "Trang web có giá trị thực tế, truyền tải thông tin đúng đắn và có ý nghĩa trong đời sống", maxScore: 0.25 }
            ]
        },
        {
            name: "Kỹ năng giao tiếp, hợp tác",
            maxScore: 0.5,
            items: [
                { id: "c11", content: "Tự tin trình bày dự án rõ ràng, mạch lạc, có tương tác với các bạn khác", maxScore: 0.25 },
                { id: "c12", content: "Có thái độ tốt và đánh giá được sản phẩm sau khi nhận góp ý từ BGK", maxScore: 0.25 }
            ]
        },
        {
            name: "Giải quyết vấn đề",
            maxScore: 1.0,
            items: [
                { id: "c13", content: "Xác định các vấn đề xã hội và phân loại, tối ưu các nội dung hiển thị", maxScore: 0.25 },
                { id: "c14", content: "Hoàn thiện các giao diện của dự án đáp ứng đúng yêu cầu ứng dụng trong lĩnh vực giải trí/ kinh doanh", maxScore: 0.50 },
                { id: "c15", content: "Trả lời tốt các vấn đề mà BGK đặt ra về cách lập trình dự án", maxScore: 0.25 }
            ]
        },
        {
            name: "Kỹ năng sử dụng máy tính",
            maxScore: 1.0,
            items: [
                { id: "c16", content: "Quản lý tốt các tài nguyên của dự án (lưu trữ hình ảnh, đặt tên file, ...)", maxScore: 0.25 },
                { id: "c17", content: "Thiết kế bài trình chiếu có hiệu ứng sinh động, không có lỗi định dạng, đầy đủ nội dung và hỗ trợ tốt cho phần thuyết trình", maxScore: 0.25 },
                { id: "c18", content: "Lưu trữ mã nguồn lên github và triển khai dự án lên Internet với github page hoặc qua các hosting khác", maxScore: 0.25 },
                { id: "c19", content: "Ứng dụng ít nhất 1 tính năng hỗ trợ của AI trong sản phẩm: chatbox, gợi ý giao diện website..", maxScore: 0.25 }
            ]
        }
    ]
};

// Score levels
const scoreLevels = {
    "chua-dat": { label: "Chưa đạt", multiplier: 0 },
    "hoan-thanh": { label: "Hoàn thành", multiplier: 0.5 },
    "tot": { label: "Tốt", multiplier: 1 }
};

// Generate grading table
function generateGradingTable(studentId) {
    const tableBody = document.getElementById('grading-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Load saved scores
    const savedData = localStorage.getItem(`score_${studentId}`);
    const savedScores = savedData ? JSON.parse(savedData).scores : {};
    
    criteriaData.categories.forEach((category, catIndex) => {
        // Category row
        const categoryRow = document.createElement('tr');
        categoryRow.className = 'category-row';
        categoryRow.innerHTML = `
            <td colspan="5">
                <i class="fas fa-folder-open"></i> ${category.name} 
                <span class="max-score">(${category.maxScore} điểm)</span>
            </td>
        `;
        tableBody.appendChild(categoryRow);
        
        // Criteria rows
        category.items.forEach((item, itemIndex) => {
            const savedLevel = savedScores[item.id] || 'tot';
            const score = item.maxScore * scoreLevels[savedLevel].multiplier;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${catIndex + 1}.${itemIndex + 1}</td>
                <td>${item.content}</td>
                <td class="max-score">${item.maxScore.toFixed(2)}</td>
                <td>
                    <select id="${item.id}" data-max="${item.maxScore}" onchange="updateScore('${studentId}')">
                        <option value="chua-dat" ${savedLevel === 'chua-dat' ? 'selected' : ''}>Chưa đạt</option>
                        <option value="hoan-thanh" ${savedLevel === 'hoan-thanh' ? 'selected' : ''}>Hoàn thành</option>
                        <option value="tot" ${savedLevel === 'tot' ? 'selected' : ''}>Tốt</option>
                    </select>
                </td>
                <td class="score-cell" id="score-${item.id}">${score.toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        });
    });
    
    // Calculate initial total
    calculateTotal(studentId);
}

// Update score when selection changes
function updateScore(studentId) {
    const scores = {};
    let total = 0;
    
    criteriaData.categories.forEach(category => {
        category.items.forEach(item => {
            const select = document.getElementById(item.id);
            if (select) {
                const level = select.value;
                scores[item.id] = level;
                const score = item.maxScore * scoreLevels[level].multiplier;
                const scoreCell = document.getElementById(`score-${item.id}`);
                if (scoreCell) {
                    scoreCell.textContent = score.toFixed(2);
                }
                total += score;
            }
        });
    });
    
    // Update total display
    const totalElement = document.getElementById('total-score');
    if (totalElement) {
        totalElement.textContent = total.toFixed(2);
    }
    
    // Auto-save to localStorage
    saveScores(studentId);
}

// Calculate total score
function calculateTotal(studentId) {
    let total = 0;
    
    criteriaData.categories.forEach(category => {
        category.items.forEach(item => {
            const select = document.getElementById(item.id);
            if (select) {
                const level = select.value;
                const score = item.maxScore * scoreLevels[level].multiplier;
                total += score;
            }
        });
    });
    
    const totalElement = document.getElementById('total-score');
    if (totalElement) {
        totalElement.textContent = total.toFixed(2);
    }
    
    return total;
}

// Save scores to localStorage
function saveScores(studentId) {
    const scores = {};
    let total = 0;
    
    criteriaData.categories.forEach(category => {
        category.items.forEach(item => {
            const select = document.getElementById(item.id);
            if (select) {
                scores[item.id] = select.value;
                total += item.maxScore * scoreLevels[select.value].multiplier;
            }
        });
    });
    
    const data = {
        studentId: studentId,
        scores: scores,
        totalScore: total,
        savedAt: new Date().toISOString()
    };
    
    localStorage.setItem(`score_${studentId}`, JSON.stringify(data));
    
    // Show save notification
    showNotification('Đã lưu điểm thành công!', 'success');
}

// Reset scores
function resetScores(studentId) {
    if (confirm('Bạn có chắc muốn đặt lại tất cả điểm về mặc định (Tốt)?')) {
        criteriaData.categories.forEach(category => {
            category.items.forEach(item => {
                const select = document.getElementById(item.id);
                if (select) {
                    select.value = 'tot';
                }
            });
        });
        
        updateScore(studentId);
        showNotification('Đã đặt lại điểm thành công!', 'info');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : '#0891b2'};
        color: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Export to PDF
function exportPDF(studentId, studentName, projectName) {
    let tableRows = '';
    let total = 0;
    
    criteriaData.categories.forEach((category, catIdx) => {
        tableRows += `
            <tr style="background: #f3f4f6;">
                <td colspan="5" style="padding: 12px; font-weight: bold; color: #6366f1; border: 1px solid #d1d5db;">
                    ${category.name} (${category.maxScore} điểm)
                </td>
            </tr>
        `;
        
        category.items.forEach((item, itemIdx) => {
            const select = document.getElementById(item.id);
            const level = select ? select.value : 'tot';
            const score = item.maxScore * scoreLevels[level].multiplier;
            total += score;
            
            tableRows += `
                <tr style="background: white;">
                    <td style="padding: 10px; border: 1px solid #d1d5db; text-align: center;">${catIdx + 1}.${itemIdx + 1}</td>
                    <td style="padding: 10px; border: 1px solid #d1d5db;">${item.content}</td>
                    <td style="padding: 10px; border: 1px solid #d1d5db; text-align: center;">${item.maxScore.toFixed(2)}</td>
                    <td style="padding: 10px; border: 1px solid #d1d5db; text-align: center;">${scoreLevels[level].label}</td>
                    <td style="padding: 10px; border: 1px solid #d1d5db; text-align: center; font-weight: bold; color: #059669;">${score.toFixed(2)}</td>
                </tr>
            `;
        });
    });
    
    // Create new window for printing
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Bảng điểm - ${studentName}</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    color: #1f2937;
                    background: white;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .header h1 {
                    font-size: 22px;
                    margin-bottom: 8px;
                }
                .header h2 {
                    font-size: 16px;
                    color: #6366f1;
                    margin-bottom: 5px;
                }
                .header p {
                    font-size: 13px;
                    color: #6b7280;
                }
                .info-box {
                    background: #f9fafb;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    padding: 15px;
                    margin-bottom: 25px;
                }
                .info-box table {
                    width: 100%;
                }
                .info-box td {
                    padding: 6px 0;
                }
                .main-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 12px;
                }
                .main-table th {
                    background: #1f2937;
                    color: white;
                    padding: 10px;
                    border: 1px solid #374151;
                    text-align: center;
                }
                .total-box {
                    margin-top: 25px;
                    background: #6366f1;
                    color: white;
                    padding: 20px;
                    border-radius: 8px;
                    text-align: right;
                }
                .total-box .score {
                    font-size: 32px;
                    font-weight: bold;
                }
                .signatures {
                    margin-top: 50px;
                    display: flex;
                    justify-content: space-between;
                }
                .signature-box {
                    text-align: center;
                    width: 45%;
                }
                .signature-box p:first-child {
                    margin-bottom: 70px;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 11px;
                    color: #9ca3af;
                }
                @media print {
                    body { padding: 20px; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Bảng chấm điểm buổi Demo</h1>
                <h2>Web Developer - Advanced</h2>
                <p>TDM-JSA04</p>
            </div>
            
            <div class="info-box">
                <table>
                    <tr>
                        <td style="width: 180px;"><strong>Họ và tên Học viên:</strong></td>
                        <td style="color: #6366f1; font-weight: bold;">${studentName}</td>
                    </tr>
                    <tr>
                        <td><strong>Dự án:</strong></td>
                        <td>${projectName}</td>
                    </tr>
                    <tr>
                        <td><strong>Ngày Demo:</strong></td>
                        <td>17/01/2026 - 18h</td>
                    </tr>
                    <tr>
                        <td><strong>Ngày đánh giá:</strong></td>
                        <td>17/01/2026</td>
                    </tr>
                </table>
            </div>
            
            <table class="main-table">
                <thead>
                    <tr>
                        <th style="width: 50px;">STT</th>
                        <th>Nội dung</th>
                        <th style="width: 80px;">Điểm tối đa</th>
                        <th style="width: 100px;">Mức độ</th>
                        <th style="width: 80px;">Điểm đạt</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
            
            <div class="total-box">
                <span style="margin-right: 20px;">Tổng điểm đạt được:</span>
                <span class="score">${total.toFixed(2)}</span>
                <span> / 5.00</span>
            </div>
            
            <div class="signatures">
                <div class="signature-box">
                    <p>Giám khảo</p>
                    <p><strong>Mạc Phạm Hoàng Dương</strong></p>
                </div>
                <div class="signature-box">
                    <p>Giáo viên đánh giá</p>
                    <p><strong>Nguyễn Phạm Minh Trí</strong></p>
                </div>
            </div>
            
            <div class="footer">
                <p>© 2024 TDM-JSA04 - Web Development Advance</p>
            </div>
            
            <div class="no-print" style="margin-top: 30px; text-align: center;">
                <button onclick="window.print()" style="padding: 12px 30px; background: #6366f1; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">
                    🖨️ In / Lưu PDF
                </button>
                <button onclick="window.close()" style="padding: 12px 30px; background: #ef4444; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; margin-left: 10px;">
                    ✕ Đóng
                </button>
                <p style="margin-top: 15px; color: #6b7280; font-size: 13px;">
                    💡 Mẹo: Khi in, chọn "Save as PDF" để lưu thành file PDF
                </p>
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    showNotification('Đã mở trang in PDF!', 'success');
}

// Add animation keyframes
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
