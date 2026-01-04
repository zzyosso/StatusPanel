// 数据存储
let gameData = {
    stats: [],
    backpack: [],
    storage: [],
    shop: [],
    skills: [],
    skillFragments: 0,
    skillLevel: 0,
    skillExp: 0,
    skillMaxExp: 100,
    gold: 100,
    food: 0,
    pet: {
        selected: false,
        type: '',
        name: '',
        level: 1,
        exp: 0,
        maxExp: 100,
        hunger: 100,
        lastFeedTime: Date.now()
    },
    map: {
        nodes: [],
        connections: [],
        nextId: 1
    },
    skillNextId: 1
};

// 常用汉字库及拼音
const chineseCharacters = [
    { char: '大', pinyin: 'dà' },
    { char: '小', pinyin: 'xiǎo' },
    { char: '上', pinyin: 'shàng' },
    { char: '下', pinyin: 'xià' },
    { char: '左', pinyin: 'zuǒ' },
    { char: '右', pinyin: 'yòu' },
    { char: '中', pinyin: 'zhōng' },
    { char: '人', pinyin: 'rén' },
    { char: '口', pinyin: 'kǒu' },
    { char: '手', pinyin: 'shǒu' },
    { char: '足', pinyin: 'zú' },
    { char: '日', pinyin: 'rì' },
    { char: '月', pinyin: 'yuè' },
    { char: '水', pinyin: 'shuǐ' },
    { char: '火', pinyin: 'huǒ' },
    { char: '山', pinyin: 'shān' },
    { char: '石', pinyin: 'shí' },
    { char: '田', pinyin: 'tián' },
    { char: '土', pinyin: 'tǔ' },
    { char: '木', pinyin: 'mù' },
    { char: '禾', pinyin: 'hé' },
    { char: '竹', pinyin: 'zhú' },
    { char: '米', pinyin: 'mǐ' },
    { char: '目', pinyin: 'mù' },
    { char: '耳', pinyin: 'ěr' },
    { char: '头', pinyin: 'tóu' },
    { char: '天', pinyin: 'tiān' },
    { char: '云', pinyin: 'yún' },
    { char: '雨', pinyin: 'yǔ' },
    { char: '风', pinyin: 'fēng' },
    { char: '花', pinyin: 'huā' },
    { char: '草', pinyin: 'cǎo' },
    { char: '虫', pinyin: 'chóng' },
    { char: '鸟', pinyin: 'niǎo' },
    { char: '鱼', pinyin: 'yú' },
    { char: '马', pinyin: 'mǎ' },
    { char: '牛', pinyin: 'niú' },
    { char: '羊', pinyin: 'yáng' },
    { char: '狗', pinyin: 'gǒu' },
    { char: '猫', pinyin: 'māo' },
    { char: '一', pinyin: 'yī' },
    { char: '二', pinyin: 'èr' },
    { char: '三', pinyin: 'sān' },
    { char: '四', pinyin: 'sì' },
    { char: '五', pinyin: 'wǔ' },
    { char: '六', pinyin: 'liù' },
    { char: '七', pinyin: 'qī' },
    { char: '八', pinyin: 'bā' },
    { char: '九', pinyin: 'jiǔ' },
    { char: '十', pinyin: 'shí' },
    { char: '百', pinyin: 'bǎi' },
    { char: '千', pinyin: 'qiān' },
    { char: '万', pinyin: 'wàn' },
    { char: '爸', pinyin: 'bà' },
    { char: '妈', pinyin: 'mā' },
    { char: '哥', pinyin: 'gē' },
    { char: '姐', pinyin: 'jiě' },
    { char: '弟', pinyin: 'dì' },
    { char: '妹', pinyin: 'mèi' },
    { char: '我', pinyin: 'wǒ' },
    { char: '你', pinyin: 'nǐ' },
    { char: '他', pinyin: 'tā' },
    { char: '她', pinyin: 'tā' },
    { char: '们', pinyin: 'men' },
    { char: '是', pinyin: 'shì' },
    { char: '有', pinyin: 'yǒu' },
    { char: '在', pinyin: 'zài' },
    { char: '来', pinyin: 'lái' },
    { char: '去', pinyin: 'qù' },
    { char: '看', pinyin: 'kàn' },
    { char: '听', pinyin: 'tīng' },
    { char: '说', pinyin: 'shuō' },
    { char: '读', pinyin: 'dú' },
    { char: '写', pinyin: 'xiě' },
    { char: '吃', pinyin: 'chī' },
    { char: '喝', pinyin: 'hē' },
    { char: '走', pinyin: 'zǒu' },
    { char: '跑', pinyin: 'pǎo' },
    { char: '跳', pinyin: 'tiào' },
    { char: '坐', pinyin: 'zuò' },
    { char: '站', pinyin: 'zhàn' },
    { char: '睡', pinyin: 'shuì' },
    { char: '醒', pinyin: 'xǐng' },
    { char: '开', pinyin: 'kāi' },
    { char: '关', pinyin: 'guān' },
    { char: '好', pinyin: 'hǎo' },
    { char: '坏', pinyin: 'huài' },
    { char: '多', pinyin: 'duō' },
    { char: '少', pinyin: 'shǎo' },
    { char: '长', pinyin: 'cháng' },
    { char: '短', pinyin: 'duǎn' },
    { char: '高', pinyin: 'gāo' },
    { char: '低', pinyin: 'dī' },
    { char: '快', pinyin: 'kuài' },
    { char: '慢', pinyin: 'màn' },
    { char: '红', pinyin: 'hóng' },
    { char: '黄', pinyin: 'huáng' },
    { char: '蓝', pinyin: 'lán' },
    { char: '绿', pinyin: 'lǜ' },
    { char: '白', pinyin: 'bái' },
    { char: '黑', pinyin: 'hēi' }
];

// 当前算术题答案
let currentMathAnswers = [];
// 当前识字题数据
let currentLiteracyData = [];
let literacyScore = 0;
let literacyAnswered = 0;

// 页面加载初始化
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initTabs();
    initChallengeTabs();
    initThemeSwitcher();
    renderStats();
    renderBackpack();
    renderStorage();
    renderShop();
    renderSkills(); // 初始化技能树
    renderSkillStatus(); // 初始化技能状态栏
    updateGoldDisplay();
    addDefaultStats();
    initPet(); // 初始化宠物系统
    initMap(); // 初始化地图系统
    updateDataStats(); // 更新数据统计
});

// 初始化主题切换器
function initThemeSwitcher() {
    // 加载保存的主题
    const savedTheme = localStorage.getItem('selectedTheme') || 'cyber';
    applyTheme(savedTheme);
    
    // 绑定主题按钮事件
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            applyTheme(theme);
            localStorage.setItem('selectedTheme', theme);
        });
    });
}

// 应用主题
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // 更新按钮状态
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
}

// 初始化标签页切换
function initTabs() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const panels = document.querySelectorAll('.panel');
            panels.forEach(p => p.classList.remove('active'));
            
            const targetPanel = document.getElementById(btn.dataset.tab);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });
}

// 初始化考验标签页
function initChallengeTabs() {
    const tabs = document.querySelectorAll('.challenge-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const contents = document.querySelectorAll('.challenge-content');
            contents.forEach(c => c.classList.remove('active'));
            
            const target = document.getElementById(tab.dataset.challenge + '-challenge');
            if (target) target.classList.add('active');
        });
    });
}

// 添加默认属性
function addDefaultStats() {
    if (gameData.stats.length === 0) {
        gameData.stats = [
            { id: 1, name: '生命值', current: 100, max: 100, color: 'red' },
            { id: 2, name: '精神值', current: 80, max: 100, color: 'blue' },
            { id: 3, name: '饥饿值', current: 60, max: 100, color: 'yellow' }
        ];
        saveData();
        renderStats();
    }
}

// 渲染状态栏
function renderStats() {
    const container = document.getElementById('stats-container');
    if (gameData.stats.length === 0) {
        container.innerHTML = '<div class="empty-message">暂无属性，点击上方按钮添加</div>';
        return;
    }
    
    container.innerHTML = gameData.stats.map(stat => `
        <div class="stat-item ${stat.color}">
            <div class="stat-header">
                <span class="stat-name">${stat.name}</span>
                <div class="stat-values">
                    <span class="stat-current">${stat.current}</span>
                    <span class="stat-max">/ ${stat.max}</span>
                </div>
                <div class="stat-controls">
                    <button class="stat-btn" onclick="adjustStat(${stat.id}, -10)">-10</button>
                    <button class="stat-btn" onclick="adjustStat(${stat.id}, -1)">-</button>
                    <button class="stat-btn" onclick="adjustStat(${stat.id}, 1)">+</button>
                    <button class="stat-btn" onclick="adjustStat(${stat.id}, 10)">+10</button>
                    <button class="stat-btn edit" onclick="editStat(${stat.id})">✎</button>
                    <button class="stat-btn delete" onclick="deleteStat(${stat.id})">✕</button>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill ${stat.color}" style="width: ${(stat.current / stat.max) * 100}%"></div>
            </div>
        </div>
    `).join('');
    
    updateStatSelects();
}

// 更新属性选择下拉框
function updateStatSelects() {
    const selects = ['item-effect-stat', 'shop-item-effect-stat'];
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            const currentValue = select.value;
            select.innerHTML = '<option value="">无效果</option>' + 
                gameData.stats.map(stat => `<option value="${stat.id}">${stat.name}</option>`).join('');
            select.value = currentValue;
        }
    });
}

// 调整属性值
function adjustStat(id, amount) {
    const stat = gameData.stats.find(s => s.id === id);
    if (stat) {
        stat.current = Math.max(0, Math.min(stat.max, stat.current + amount));
        saveData();
        renderStats();
    }
}

// 编辑属性
function editStat(id) {
    const stat = gameData.stats.find(s => s.id === id);
    if (stat) {
        document.getElementById('edit-stat-id').value = id;
        document.getElementById('edit-stat-current').value = stat.current;
        document.getElementById('edit-stat-max').value = stat.max;
        openModal('edit-stat-modal');
    }
}

// 确认编辑属性
function confirmEditStat() {
    const id = parseInt(document.getElementById('edit-stat-id').value);
    const current = parseInt(document.getElementById('edit-stat-current').value);
    const max = parseInt(document.getElementById('edit-stat-max').value);
    
    const stat = gameData.stats.find(s => s.id === id);
    if (stat) {
        stat.max = max;
        stat.current = Math.min(current, max);
        saveData();
        renderStats();
        closeModal('edit-stat-modal');
    }
}

// 删除属性
function deleteStat(id) {
    if (confirm('确定要删除这个属性吗？')) {
        gameData.stats = gameData.stats.filter(s => s.id !== id);
        saveData();
        renderStats();
    }
}

// 添加新属性
function addNewStat() {
    document.getElementById('stat-name').value = '';
    document.getElementById('stat-current').value = 100;
    document.getElementById('stat-max').value = 100;
    document.getElementById('stat-color').value = 'cyan';
    openModal('stat-modal');
}

// 确认添加属性
function confirmAddStat() {
    const name = document.getElementById('stat-name').value.trim();
    const current = parseInt(document.getElementById('stat-current').value);
    const max = parseInt(document.getElementById('stat-max').value);
    const color = document.getElementById('stat-color').value;
    
    if (!name) {
        alert('请输入属性名称');
        return;
    }
    
    const newId = gameData.stats.length > 0 ? Math.max(...gameData.stats.map(s => s.id)) + 1 : 1;
    gameData.stats.push({
        id: newId,
        name,
        current: Math.min(current, max),
        max,
        color
    });
    
    saveData();
    renderStats();
    closeModal('stat-modal');
}

// 渲染背包
function renderBackpack() {
    const container = document.getElementById('backpack-items');
    if (gameData.backpack.length === 0) {
        container.innerHTML = '<div class="empty-message">背包空空如也</div>';
        return;
    }
    
    container.innerHTML = gameData.backpack.map(item => `
        <div class="item-card">
            <div class="item-name">${item.name}</div>
            <div class="item-quantity">数量: ${item.quantity}</div>
            ${item.effectStat ? `<div class="item-effect">效果: ${getStatName(item.effectStat)} +${item.effectValue}</div>` : ''}
            <div class="item-description">${item.description || '无描述'}</div>
            <div class="item-actions">
                ${item.effectStat ? `<button class="item-btn use" onclick="useItem('backpack', ${item.id})">使用</button>` : ''}
                <button class="item-btn transfer" onclick="transferItem('backpack', 'storage', ${item.id})">存入仓库</button>
                <button class="item-btn delete" onclick="deleteItem('backpack', ${item.id})">丢弃</button>
            </div>
        </div>
    `).join('');
}

// 渲染仓库
function renderStorage() {
    const container = document.getElementById('storage-items');
    if (gameData.storage.length === 0) {
        container.innerHTML = '<div class="empty-message">仓库空空如也</div>';
        return;
    }
    
    container.innerHTML = gameData.storage.map(item => `
        <div class="item-card">
            <div class="item-name">${item.name}</div>
            <div class="item-quantity">数量: ${item.quantity}</div>
            ${item.effectStat ? `<div class="item-effect">效果: ${getStatName(item.effectStat)} +${item.effectValue}</div>` : ''}
            <div class="item-description">${item.description || '无描述'}</div>
            <div class="item-actions">
                <button class="item-btn transfer" onclick="transferItem('storage', 'backpack', ${item.id})">取出到背包</button>
                <button class="item-btn delete" onclick="deleteItem('storage', ${item.id})">删除</button>
            </div>
        </div>
    `).join('');
}

// 渲染商店
function renderShop() {
    const container = document.getElementById('shop-items');
    if (gameData.shop.length === 0) {
        container.innerHTML = '<div class="empty-message">商店暂无商品</div>';
        return;
    }
    
    container.innerHTML = gameData.shop.map(item => `
        <div class="item-card shop-item-card">
            <div class="item-name">${item.name}</div>
            <div class="item-price">💰 ${item.price} 金币</div>
            ${item.effectStat ? `<div class="item-effect">效果: ${getStatName(item.effectStat)} +${item.effectValue}</div>` : ''}
            <div class="item-description">${item.description || '无描述'}</div>
            <div class="item-actions">
                <button class="item-btn buy" onclick="buyItem(${item.id})">购买</button>
                <button class="item-btn delete" onclick="deleteShopItem(${item.id})">下架</button>
            </div>
        </div>
    `).join('');
}

// 获取属性名称
function getStatName(statId) {
    const stat = gameData.stats.find(s => s.id === parseInt(statId));
    return stat ? stat.name : '未知属性';
}

// 显示添加物品模态框
function showAddItemModal(target) {
    document.getElementById('item-target').value = target;
    document.getElementById('item-name').value = '';
    document.getElementById('item-quantity').value = 1;
    document.getElementById('item-effect-stat').value = '';
    document.getElementById('item-effect-value').value = 0;
    document.getElementById('item-description').value = '';
    updateStatSelects();
    openModal('item-modal');
}

// 确认添加物品
function confirmAddItem() {
    const target = document.getElementById('item-target').value;
    const name = document.getElementById('item-name').value.trim();
    const quantity = parseInt(document.getElementById('item-quantity').value);
    const effectStat = document.getElementById('item-effect-stat').value;
    const effectValue = parseInt(document.getElementById('item-effect-value').value);
    const description = document.getElementById('item-description').value.trim();
    
    if (!name) {
        alert('请输入物品名称');
        return;
    }
    
    const targetArray = gameData[target];
    const newId = targetArray.length > 0 ? Math.max(...targetArray.map(i => i.id)) + 1 : 1;
    
    targetArray.push({
        id: newId,
        name,
        quantity,
        effectStat: effectStat || null,
        effectValue: effectValue || 0,
        description
    });
    
    saveData();
    if (target === 'backpack') renderBackpack();
    else if (target === 'storage') renderStorage();
    closeModal('item-modal');
}

// 使用物品
function useItem(source, itemId) {
    const sourceArray = gameData[source];
    const item = sourceArray.find(i => i.id === itemId);
    
    if (item && item.quantity > 0) {
        // 应用效果
        if (item.effectStat) {
            const stat = gameData.stats.find(s => s.id === parseInt(item.effectStat));
            if (stat) {
                stat.current = Math.min(stat.max, stat.current + item.effectValue);
            }
        }
        
        // 减少数量
        item.quantity--;
        if (item.quantity <= 0) {
            gameData[source] = sourceArray.filter(i => i.id !== itemId);
        }
        
        saveData();
        renderStats();
        renderBackpack();
        
        // 显示使用提示
        showNotification(`使用了 ${item.name}`);
    }
}

// 转移物品
function transferItem(from, to, itemId) {
    const fromArray = gameData[from];
    const toArray = gameData[to];
    const item = fromArray.find(i => i.id === itemId);
    
    if (item) {
        // 检查目标是否已有同名物品
        const existingItem = toArray.find(i => i.name === item.name);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            const newId = toArray.length > 0 ? Math.max(...toArray.map(i => i.id)) + 1 : 1;
            toArray.push({ ...item, id: newId });
        }
        
        // 从原位置删除
        gameData[from] = fromArray.filter(i => i.id !== itemId);
        
        saveData();
        renderBackpack();
        renderStorage();
    }
}

// 删除物品
function deleteItem(source, itemId) {
    if (confirm('确定要删除这个物品吗？')) {
        gameData[source] = gameData[source].filter(i => i.id !== itemId);
        saveData();
        if (source === 'backpack') renderBackpack();
        else if (source === 'storage') renderStorage();
    }
}

// 显示添加商品模态框
function showAddShopItemModal() {
    document.getElementById('shop-item-name').value = '';
    document.getElementById('shop-item-price').value = 10;
    document.getElementById('shop-item-effect-stat').value = '';
    document.getElementById('shop-item-effect-value').value = 0;
    document.getElementById('shop-item-description').value = '';
    updateStatSelects();
    openModal('shop-modal');
}

// 确认添加商品
function confirmAddShopItem() {
    const name = document.getElementById('shop-item-name').value.trim();
    const price = parseInt(document.getElementById('shop-item-price').value);
    const effectStat = document.getElementById('shop-item-effect-stat').value;
    const effectValue = parseInt(document.getElementById('shop-item-effect-value').value);
    const description = document.getElementById('shop-item-description').value.trim();
    
    if (!name) {
        alert('请输入商品名称');
        return;
    }
    
    const newId = gameData.shop.length > 0 ? Math.max(...gameData.shop.map(i => i.id)) + 1 : 1;
    
    gameData.shop.push({
        id: newId,
        name,
        price,
        effectStat: effectStat || null,
        effectValue: effectValue || 0,
        description
    });
    
    saveData();
    renderShop();
    closeModal('shop-modal');
}

// 购买物品
function buyItem(itemId) {
    const item = gameData.shop.find(i => i.id === itemId);
    
    if (!item) return;
    
    if (gameData.gold < item.price) {
        alert('金币不足！');
        return;
    }
    
    gameData.gold -= item.price;
    
    // 添加到背包
    const existingItem = gameData.backpack.find(i => i.name === item.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        const newId = gameData.backpack.length > 0 ? Math.max(...gameData.backpack.map(i => i.id)) + 1 : 1;
        gameData.backpack.push({
            id: newId,
            name: item.name,
            quantity: 1,
            effectStat: item.effectStat,
            effectValue: item.effectValue,
            description: item.description
        });
    }
    
    saveData();
    updateGoldDisplay();
    renderBackpack();
    showNotification(`购买了 ${item.name}`);
}

// 删除商品
function deleteShopItem(itemId) {
    if (confirm('确定要下架这个商品吗？')) {
        gameData.shop = gameData.shop.filter(i => i.id !== itemId);
        saveData();
        renderShop();
    }
}

// 编辑金币
function editGold() {
    const newGold = prompt('请输入金币数量:', gameData.gold);
    if (newGold !== null) {
        const amount = parseInt(newGold);
        if (!isNaN(amount) && amount >= 0) {
            gameData.gold = amount;
            saveData();
            updateGoldDisplay();
        }
    }
}

// 更新金币显示
function updateGoldDisplay() {
    document.getElementById('gold-amount').textContent = gameData.gold;
}

// 生成算术题
function generateMathQuestions() {
    const container = document.getElementById('math-questions');
    const submitBtn = document.getElementById('submit-math');
    const resultDiv = document.getElementById('math-result');
    
    currentMathAnswers = [];
    let questionsHtml = '';
    
    for (let i = 1; i <= 10; i++) {
        const isAddition = Math.random() > 0.5;
        let num1, num2, answer;
        
        if (isAddition) {
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * (20 - num1)) + 1;
            answer = num1 + num2;
        } else {
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * num1) + 1;
            answer = num1 - num2;
        }
        
        currentMathAnswers.push(answer);
        
        const operator = isAddition ? '+' : '-';
        questionsHtml += `
            <div class="question-item">
                <span class="question-number">${i}.</span>
                <span class="question-text">${num1} ${operator} ${num2} = </span>
                <input type="number" class="question-input" id="math-answer-${i}" placeholder="?">
                <span class="question-result" id="math-result-${i}"></span>
            </div>
        `;
    }
    
    container.innerHTML = questionsHtml;
    submitBtn.style.display = 'block';
    resultDiv.innerHTML = '';
    resultDiv.className = 'result-display';
}

// 提交算术答案
function submitMathAnswers() {
    let correct = 0;
    
    for (let i = 1; i <= 10; i++) {
        const input = document.getElementById(`math-answer-${i}`);
        const result = document.getElementById(`math-result-${i}`);
        const userAnswer = parseInt(input.value);
        
        if (userAnswer === currentMathAnswers[i - 1]) {
            result.textContent = '✓';
            result.style.color = '#00ff41';
            correct++;
        } else {
            result.textContent = '✗';
            result.style.color = '#ff0040';
        }
    }
    
    const resultDiv = document.getElementById('math-result');
    const percentage = (correct / 10) * 100;
    resultDiv.innerHTML = `得分: ${correct}/10 (${percentage}%)`;
    resultDiv.className = 'result-display ' + (correct >= 6 ? 'success' : 'fail');
    
    // 奖励食物：每5题对的奖励1个食物
    const foodReward = Math.floor(correct / 5);
    if (foodReward > 0) {
        rewardFood(foodReward);
    }
    
    // 奖励技能经验和碎片
    if (correct >= 6) {
        addSkillExp(correct * 2); // 每题2点经验
        gainSkillFragment(); // 随机获得碎片
    }
}

// 生成识字题
function generateLiteracyQuestion() {
    const container = document.getElementById('literacy-question');
    const resultDiv = document.getElementById('literacy-result');
    
    // 随机选择2个不同的汉字
    const shuffled = [...chineseCharacters].sort(() => Math.random() - 0.5);
    currentLiteracyData = shuffled.slice(0, 2);
    literacyScore = 0;
    literacyAnswered = 0;
    
    let html = '<div class="character-display">';
    
    currentLiteracyData.forEach((charData, index) => {
        // 生成选项（包含正确答案和3个干扰项）
        const options = [charData.pinyin];
        const otherPinyins = chineseCharacters
            .filter(c => c.pinyin !== charData.pinyin)
            .map(c => c.pinyin);
        
        while (options.length < 4) {
            const randomPinyin = otherPinyins[Math.floor(Math.random() * otherPinyins.length)];
            if (!options.includes(randomPinyin)) {
                options.push(randomPinyin);
            }
        }
        
        // 打乱选项顺序
        options.sort(() => Math.random() - 0.5);
        
        html += `
            <div class="character-card">
                <div class="character">${charData.char}</div>
                <div class="pinyin-options" id="pinyin-options-${index}">
                    ${options.map(opt => `
                        <button class="pinyin-btn" onclick="checkPinyin(${index}, '${opt}', '${charData.pinyin}')">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    resultDiv.innerHTML = '';
    resultDiv.className = 'result-display';
}

// 检查拼音答案
function checkPinyin(index, selected, correct) {
    const optionsContainer = document.getElementById(`pinyin-options-${index}`);
    const buttons = optionsContainer.querySelectorAll('.pinyin-btn');
    
    buttons.forEach(btn => {
        btn.classList.add('disabled');
        if (btn.textContent === correct) {
            btn.classList.add('correct');
        } else if (btn.textContent === selected && selected !== correct) {
            btn.classList.add('wrong');
        }
    });
    
    if (selected === correct) {
        literacyScore++;
    }
    literacyAnswered++;
    
    // 如果两道题都答完了，显示结果并奖励食物
    if (literacyAnswered === 2) {
        const resultDiv = document.getElementById('literacy-result');
        resultDiv.innerHTML = `得分: ${literacyScore}/2 (${(literacyScore / 2) * 100}%)`;
        resultDiv.className = 'result-display ' + (literacyScore === 2 ? 'success' : 'fail');
        
        if (literacyScore === 2) {
            rewardFood(1);
            addSkillExp(20); // 全对奖励20经验
            gainSkillFragment(); // 随机获得碎片
        }
    }
}

// 模态框操作
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// 点击模态框外部关闭
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// 通知提示
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00ffff, #ff00ff);
        color: #000;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// 宠物系统
const petEmojis = {
    'cat': '🐱',
    'dog': '🐶',
    'rabbit': '🐰',
    'bear': '🐻',
    'panda': '🐼',
    'fox': '🦊'
};

const encouragingMessages = [
    '你真棒！继续加油！',
    '太厉害了！',
    '你是最棒的！',
    '好样的，继续努力！',
    '我相信你！',
    '你可以做得更好！',
    '再接再厉！',
    '很有进步哦！',
    '你真聪明！',
    '我为你骄傲！'
];

const hungryMessages = [
    '咕咕咕，我饿了...',
    '主人，我想吃东西~',
    '给我一些食物好不好？',
    '我的肚子好饿...',
    '有好吃的吗？'
];

const happyMessages = [
    '谢谢你喂我！',
    '好好吃呀！',
    '我吃饱了，真开心！',
    '主人最好啦！',
    '真美味！'
];

// 选择宠物
function selectPet(type) {
    gameData.pet.selected = true;
    gameData.pet.type = type;
    gameData.pet.name = getPetDefaultName(type);
    gameData.pet.lastFeedTime = Date.now();
    
    document.getElementById('pet-select-screen').style.display = 'none';
    document.getElementById('pet-main-screen').style.display = 'block';
    
    updatePetDisplay();
    saveData();
    showNotification(`选择了${gameData.pet.name}作为你的宠物伙伴！`);
    speakPetMessage('你好！很高兴认识你！');
}

function getPetDefaultName(type) {
    const names = {
        'cat': '小猫咪',
        'dog': '小狗狗',
        'rabbit': '小兔子',
        'bear': '小熊熊',
        'panda': '小熊猫',
        'fox': '小狐狸'
    };
    return names[type] || '小宠物';
}

// 更新宠物显示
function updatePetDisplay() {
    if (!gameData.pet.selected) return;
    
    // 更新宠物emoji和名字
    document.getElementById('pet-emoji').textContent = petEmojis[gameData.pet.type];
    document.getElementById('pet-name-display').textContent = gameData.pet.name;
    
    // 更新等级和经验
    document.getElementById('pet-level').textContent = gameData.pet.level;
    const expPercent = (gameData.pet.exp / gameData.pet.maxExp) * 100;
    document.getElementById('pet-exp-fill').style.width = expPercent + '%';
    document.getElementById('pet-exp-text').textContent = `${gameData.pet.exp}/${gameData.pet.maxExp}`;
    
    // 更新饥饿度
    updateHunger();
    document.getElementById('pet-hunger-fill').style.width = gameData.pet.hunger + '%';
    
    // 更新等级样式
    const petEmojiEl = document.getElementById('pet-emoji');
    petEmojiEl.className = 'pet-emoji level-' + gameData.pet.level;
    
    // 根据饥饿度更新表情
    if (gameData.pet.hunger < 30) {
        petEmojiEl.classList.add('hungry');
    } else {
        petEmojiEl.classList.remove('hungry');
    }
    
    // 更新食物显示
    updateFoodDisplay();
}

// 更新食物显示
function updateFoodDisplay() {
    const foodAmountEl = document.getElementById('pet-food-amount');
    if (foodAmountEl) {
        foodAmountEl.textContent = gameData.food;
    }
}

// 更新饥饿度
function updateHunger() {
    const now = Date.now();
    const timePassed = now - gameData.pet.lastFeedTime;
    const hoursPassed = timePassed / (1000 * 60 * 60);
    
    // 每小时减少5点饥饿度
    const hungerDecrease = Math.floor(hoursPassed * 5);
    gameData.pet.hunger = Math.max(0, 100 - hungerDecrease);
    gameData.pet.lastFeedTime = now;
    
    // 如果太饿了，说话
    if (gameData.pet.hunger < 30 && Math.random() < 0.3) {
        speakPetMessage(hungryMessages[Math.floor(Math.random() * hungryMessages.length)]);
    }
}

// 喂食宠物
function feedPet() {
    if (gameData.food <= 0) {
        showNotification('没有食物了！完成题目可以获得食物哦');
        speakPetMessage('完成题目就有食物啦！');
        return;
    }
    
    gameData.food--;
    gameData.pet.hunger = Math.min(100, gameData.pet.hunger + 20);
    gameData.pet.exp += 10;
    gameData.pet.lastFeedTime = Date.now();
    
    // 检查升级
    if (gameData.pet.exp >= gameData.pet.maxExp) {
        levelUpPet();
    }
    
    // 动画效果
    const petEmoji = document.getElementById('pet-emoji');
    petEmoji.classList.add('happy');
    setTimeout(() => petEmoji.classList.remove('happy'), 500);
    
    speakPetMessage(happyMessages[Math.floor(Math.random() * happyMessages.length)]);
    updatePetDisplay();
    saveData();
}

// 宠物升级
function levelUpPet() {
    gameData.pet.level++;
    gameData.pet.exp = 0;
    gameData.pet.maxExp = Math.floor(gameData.pet.maxExp * 1.5);
    
    // 升级动画
    const petEmoji = document.getElementById('pet-emoji');
    petEmoji.style.animation = 'none';
    setTimeout(() => {
        petEmoji.style.animation = '';
    }, 10);
    
    showNotification(`🎉 ${gameData.pet.name}升级了！现在是${gameData.pet.level}级！`);
    speakPetMessage(`太棒了！我升到${gameData.pet.level}级了！`);
}

// 和宠物玩耍
function playWithPet() {
    if (gameData.pet.hunger < 20) {
        speakPetMessage('我太饿了，没力气玩...');
        showNotification('宠物太饿了，先喂食吧');
        return;
    }
    
    gameData.pet.hunger = Math.max(0, gameData.pet.hunger - 5);
    gameData.pet.exp += 5;
    
    // 检查升级
    if (gameData.pet.exp >= gameData.pet.maxExp) {
        levelUpPet();
    }
    
    const petEmoji = document.getElementById('pet-emoji');
    petEmoji.classList.add('happy');
    setTimeout(() => petEmoji.classList.remove('happy'), 500);
    
    const playMessages = [
        '好开心呀！',
        '和你玩真有趣！',
        '我们再玩一次吧！',
        '太好玩了！',
        '我喜欢和你玩！'
    ];
    speakPetMessage(playMessages[Math.floor(Math.random() * playMessages.length)]);
    updatePetDisplay();
    saveData();
}

// 重命名宠物
function renamePet() {
    const newName = prompt('给宠物取个新名字：', gameData.pet.name);
    if (newName && newName.trim()) {
        gameData.pet.name = newName.trim();
        updatePetDisplay();
        saveData();
        showNotification(`改名成功！现在叫${gameData.pet.name}`);
        speakPetMessage('我喜欢我的新名字！');
    }
}

// 重置宠物
function resetPet() {
    if (confirm('确定要重新选择宠物吗？当前宠物的进度将会丢失。')) {
        gameData.pet = {
            selected: false,
            type: '',
            name: '',
            level: 1,
            exp: 0,
            maxExp: 100,
            hunger: 100,
            lastFeedTime: Date.now()
        };
        
        document.getElementById('pet-select-screen').style.display = 'block';
        document.getElementById('pet-main-screen').style.display = 'none';
        saveData();
        showNotification('已重置宠物，请重新选择');
    }
}

// 宠物说话
function speakPetMessage(message) {
    const bubble = document.getElementById('pet-speech-bubble');
    bubble.textContent = message;
    bubble.style.animation = 'none';
    setTimeout(() => {
        bubble.style.animation = 'speechAppear 0.3s ease';
    }, 10);
}

// 奖励食物
function rewardFood(amount) {
    gameData.food += amount;
    updateFoodDisplay();
    
    // 显示食物获得动画
    const foodIcon = document.createElement('div');
    foodIcon.className = 'food-reward-animation';
    foodIcon.textContent = '🍖';
    document.body.appendChild(foodIcon);
    setTimeout(() => foodIcon.remove(), 1000);
    
    showNotification(`获得${amount}个食物！`);
    
    // 宠物鼓励
    if (gameData.pet.selected) {
        speakPetMessage(encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)]);
    }
}

// 初始化宠物系统
function initPet() {
    // 更新食物显示
    updateFoodDisplay();
    
    if (gameData.pet.selected) {
        document.getElementById('pet-select-screen').style.display = 'none';
        document.getElementById('pet-main-screen').style.display = 'block';
        updatePetDisplay();
        
        // 随机说一句鼓励的话
        if (Math.random() < 0.5) {
            setTimeout(() => {
                speakPetMessage(encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)]);
            }, 1000);
        }
    } else {
        // 确保显示选择界面
        document.getElementById('pet-select-screen').style.display = 'block';
        document.getElementById('pet-main-screen').style.display = 'none';
    }
    
    // 定时更新饥饿度
    setInterval(() => {
        if (gameData.pet.selected) {
            updateHunger();
            document.getElementById('pet-hunger-fill').style.width = gameData.pet.hunger + '%';
            
            // 如果宠物太饿，显示hungry状态
            const petEmojiEl = document.getElementById('pet-emoji');
            if (gameData.pet.hunger < 30) {
                petEmojiEl.classList.add('hungry');
            } else {
                petEmojiEl.classList.remove('hungry');
            }
            
            saveData();
        }
    }, 60000); // 每分钟检查一次
}

// 思维地图系统
let mapState = {
    connectMode: false,
    selectedNode: null,
    draggingNode: null,
    dragOffset: { x: 0, y: 0 }
};

// 初始化地图
function initMap() {
    const container = document.getElementById('mapContainer');
    if (!container) return; // 容器不存在则返回
    
    // 确保gameData.map存在
    if (!gameData.map) {
        gameData.map = {
            nodes: [],
            connections: [],
            nextId: 1
        };
    }
    
    // 渲染已保存的节点
    gameData.map.nodes.forEach(node => {
        createNodeElement(node);
    });
    
    // 渲染连接线
    renderConnections();
    
    // 添加容器事件监听
    container.addEventListener('mousemove', handleMapMouseMove);
    container.addEventListener('mouseup', handleMapMouseUp);
    container.addEventListener('touchmove', handleMapTouchMove, { passive: false });
    container.addEventListener('touchend', handleMapMouseUp);
    container.addEventListener('touchcancel', handleMapMouseUp);
}

// 添加节点
function addMapNode() {
    const node = {
        id: gameData.map.nextId++,
        title: `节点 ${gameData.map.nextId - 1}`,
        content: '',
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100
    };
    
    gameData.map.nodes.push(node);
    createNodeElement(node);
    saveData();
    showNotification('节点已添加');
}

// 创建节点元素
function createNodeElement(node) {
    const nodesContainer = document.getElementById('mapNodes');
    if (!nodesContainer) return;
    
    const nodeEl = document.createElement('div');
    nodeEl.className = 'map-node';
    nodeEl.id = `map-node-${node.id}`;
    nodeEl.style.left = node.x + 'px';
    nodeEl.style.top = node.y + 'px';
    nodeEl.dataset.nodeId = node.id;
    
    nodeEl.innerHTML = `
        <div class="map-node-header">
            <div class="map-node-title">${node.title}</div>
            <div class="map-node-actions">
                <button class="map-node-btn move" title="拖动">⋮⋮</button>
                <button class="map-node-btn edit" title="编辑">✎</button>
                <button class="map-node-btn delete" title="删除">×</button>
            </div>
        </div>
        <div class="map-node-content">
            <div class="map-node-content-text">${node.content || ''}</div>
        </div>
        <div class="expand-indicator">▼ 点击标题展开</div>
    `;
    
    // 获取元素引用
    const titleEl = nodeEl.querySelector('.map-node-title');
    const moveBtn = nodeEl.querySelector('.map-node-btn.move');
    const editBtn = nodeEl.querySelector('.map-node-btn.edit');
    const deleteBtn = nodeEl.querySelector('.map-node-btn.delete');
    const contentEl = nodeEl.querySelector('.map-node-content');
    const indicatorEl = nodeEl.querySelector('.expand-indicator');
    
    // 点击标题展开/折叠内容
    titleEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!mapState.connectMode) {
            contentEl.classList.toggle('expanded');
            indicatorEl.textContent = contentEl.classList.contains('expanded') ? '▲ 点击标题收起' : '▼ 点击标题展开';
        }
    });
    
    // 编辑按钮
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        editMapNode(node.id);
    });
    
    // 删除按钮
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteMapNode(node.id);
    });
    
    // 点击节点（连接模式）
    nodeEl.addEventListener('click', (e) => {
        if (mapState.connectMode && !e.target.closest('.map-node-actions')) {
            e.stopPropagation();
            handleNodeClickForConnection(node.id);
        }
    });
    
    // 桌面端拖拽 - 鼠标事件绑定到移动按钮
    moveBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        startDragging(node.id, e);
    });
    
    // 移动端拖拽 - 触摸事件
    moveBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const touch = e.touches[0];
        startDragging(node.id, touch);
    }, { passive: false });
    
    // 阻止按钮上的菜单
    moveBtn.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // 整个节点也可以长按拖动（移动端备选方案）
    let longPressTimer = null;
    nodeEl.addEventListener('touchstart', (e) => {
        if (e.target.closest('.map-node-actions') || e.target.closest('.map-node-title')) return;
        longPressTimer = setTimeout(() => {
            const touch = e.touches[0];
            startDragging(node.id, touch);
            nodeEl.classList.add('dragging');
        }, 500);
    }, { passive: true });
    
    nodeEl.addEventListener('touchend', () => {
        if (longPressTimer) clearTimeout(longPressTimer);
    });
    
    nodeEl.addEventListener('touchmove', () => {
        if (longPressTimer) clearTimeout(longPressTimer);
    }, { passive: true });
    
    nodesContainer.appendChild(nodeEl);
}

// 开始拖拽
function startDragging(nodeId, e) {
    const node = gameData.map.nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    const nodeEl = document.getElementById(`map-node-${nodeId}`);
    const container = document.getElementById('mapContainer');
    const rect = container.getBoundingClientRect();
    
    mapState.draggingNode = nodeId;
    mapState.dragOffset = {
        x: e.clientX - rect.left + container.scrollLeft - node.x,
        y: e.clientY - rect.top + container.scrollTop - node.y
    };
    
    nodeEl.classList.add('dragging');
    e.preventDefault();
}

// 处理鼠标移动
function handleMapMouseMove(e) {
    if (mapState.draggingNode) {
        const container = document.getElementById('mapContainer');
        const rect = container.getBoundingClientRect();
        
        const node = gameData.map.nodes.find(n => n.id === mapState.draggingNode);
        if (!node) return;
        
        const nodeEl = document.getElementById(`map-node-${mapState.draggingNode}`);
        if (!nodeEl) return;
        
        // 计算新位置，考虑滚动
        let newX = e.clientX - rect.left + container.scrollLeft - mapState.dragOffset.x;
        let newY = e.clientY - rect.top + container.scrollTop - mapState.dragOffset.y;
        
        // 确保不为负数
        newX = Math.max(10, newX);
        newY = Math.max(10, newY);
        
        node.x = newX;
        node.y = newY;
        
        nodeEl.style.left = newX + 'px';
        nodeEl.style.top = newY + 'px';
        
        renderConnections();
    }
}

// 处理触摸移动（移动端）
function handleMapTouchMove(e) {
    if (mapState.draggingNode) {
        e.preventDefault();
        const touch = e.touches[0];
        handleMapMouseMove(touch);
    }
}

// 处理鼠标释放
function handleMapMouseUp() {
    if (mapState.draggingNode) {
        const nodeEl = document.getElementById(`map-node-${mapState.draggingNode}`);
        nodeEl.classList.remove('dragging');
        mapState.draggingNode = null;
        saveData();
    }
}

// 切换节点内容显示（带动画）
function toggleNodeContent(nodeId) {
    const nodeEl = document.getElementById(`map-node-${nodeId}`);
    if (!nodeEl) return;
    
    const contentEl = nodeEl.querySelector('.map-node-content');
    const indicator = nodeEl.querySelector('.expand-indicator');
    
    contentEl.classList.toggle('expanded');
    
    if (contentEl.classList.contains('expanded')) {
        indicator.textContent = '▲ 收起';
    } else {
        indicator.textContent = '▼ 展开';
    }
}

// 编辑节点
function editMapNode(nodeId) {
    const node = gameData.map.nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    const newTitle = prompt('节点标题:', node.title);
    if (newTitle !== null && newTitle.trim()) {
        node.title = newTitle.trim();
    }
    
    const newContent = prompt('节点内容:', node.content);
    if (newContent !== null) {
        node.content = newContent.trim();
    }
    
    // 更新显示
    const nodeEl = document.getElementById(`map-node-${nodeId}`);
    const titleEl = nodeEl.querySelector('.map-node-title');
    const contentTextEl = nodeEl.querySelector('.map-node-content-text');
    
    titleEl.textContent = node.title;
    contentTextEl.textContent = node.content || '点击展开查看详情';
    
    saveData();
    showNotification('节点已更新');
}

// 删除节点
function deleteMapNode(nodeId) {
    if (!confirm('确定要删除这个节点吗？相关连接也会被删除。')) return;
    
    // 删除节点
    gameData.map.nodes = gameData.map.nodes.filter(n => n.id !== nodeId);
    
    // 删除相关连接
    gameData.map.connections = gameData.map.connections.filter(
        c => c.from !== nodeId && c.to !== nodeId
    );
    
    // 删除DOM元素
    const nodeEl = document.getElementById(`map-node-${nodeId}`);
    if (nodeEl) nodeEl.remove();
    
    renderConnections();
    saveData();
    showNotification('节点已删除');
}

// 切换连接模式
function toggleConnectMode() {
    mapState.connectMode = !mapState.connectMode;
    mapState.selectedNode = null;
    
    const btn = document.getElementById('connectModeBtn');
    
    if (mapState.connectMode) {
        btn.classList.add('active');
        btn.querySelector('span').textContent = '连接中...';
        
        // 给所有节点添加连接模式样式
        document.querySelectorAll('.map-node').forEach(el => {
            el.classList.add('connect-mode');
        });
    } else {
        btn.classList.remove('active');
        btn.querySelector('span').textContent = '连接';
        
        // 移除连接模式样式
        document.querySelectorAll('.map-node').forEach(el => {
            el.classList.remove('connect-mode', 'selected');
        });
    }
}

// 处理节点点击（连接模式）
function handleNodeClickForConnection(nodeId) {
    if (!mapState.selectedNode) {
        // 选择第一个节点
        mapState.selectedNode = nodeId;
        document.getElementById(`map-node-${nodeId}`).classList.add('selected');
    } else if (mapState.selectedNode === nodeId) {
        // 取消选择
        document.getElementById(`map-node-${nodeId}`).classList.remove('selected');
        mapState.selectedNode = null;
    } else {
        // 创建连接
        const from = mapState.selectedNode;
        const to = nodeId;
        
        // 检查连接是否已存在
        const exists = gameData.map.connections.some(
            c => (c.from === from && c.to === to) || (c.from === to && c.to === from)
        );
        
        if (!exists) {
            gameData.map.connections.push({ from, to });
            renderConnections();
            saveData();
            showNotification('连接已创建');
        } else {
            showNotification('连接已存在');
        }
        
        // 重置选择
        document.getElementById(`map-node-${mapState.selectedNode}`).classList.remove('selected');
        mapState.selectedNode = null;
    }
}

// 渲染连接线
function renderConnections() {
    const svg = document.getElementById('mapSvg');
    svg.innerHTML = '';
    
    gameData.map.connections.forEach((conn, index) => {
        const fromNode = gameData.map.nodes.find(n => n.id === conn.from);
        const toNode = gameData.map.nodes.find(n => n.id === conn.to);
        
        if (!fromNode || !toNode) return;
        
        const fromEl = document.getElementById(`map-node-${conn.from}`);
        const toEl = document.getElementById(`map-node-${conn.to}`);
        
        if (!fromEl || !toEl) return;
        
        const x1 = fromNode.x + fromEl.offsetWidth / 2;
        const y1 = fromNode.y + fromEl.offsetHeight / 2;
        const x2 = toNode.x + toEl.offsetWidth / 2;
        const y2 = toNode.y + toEl.offsetHeight / 2;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('class', 'map-connection');
        line.style.pointerEvents = 'all';
        
        // 点击删除连接
        line.addEventListener('click', () => {
            if (confirm('删除这条连接？')) {
                gameData.map.connections.splice(index, 1);
                renderConnections();
                saveData();
            }
        });
        
        svg.appendChild(line);
    });
}

// 清空地图
function clearMap() {
    if (!confirm('确定要清空整个地图吗？所有节点和连接都会被删除。')) return;
    
    gameData.map.nodes = [];
    gameData.map.connections = [];
    gameData.map.nextId = 1;
    
    document.getElementById('mapNodes').innerHTML = '';
    document.getElementById('mapSvg').innerHTML = '';
    
    saveData();
    showNotification('地图已清空');
}

// ==================== 技能树系统 ====================

// 渲染技能树状态
function renderSkillStatus() {
    const levelEl = document.getElementById('skill-level');
    const expEl = document.getElementById('skill-exp');
    const maxExpEl = document.getElementById('skill-max-exp');
    const expFillEl = document.getElementById('skill-exp-fill');
    const fragmentsEl = document.getElementById('skill-fragments');
    const addBtn = document.getElementById('add-skill-btn');
    
    if (levelEl) levelEl.textContent = gameData.skillLevel || 0;
    if (expEl) expEl.textContent = gameData.skillExp || 0;
    if (maxExpEl) maxExpEl.textContent = gameData.skillMaxExp || 100;
    if (fragmentsEl) fragmentsEl.textContent = gameData.skillFragments || 0;
    
    if (expFillEl) {
        const percentage = Math.min(100, ((gameData.skillExp || 0) / (gameData.skillMaxExp || 100)) * 100);
        expFillEl.style.width = `${percentage}%`;
    }
    
    // 只有拥有至少一个技能或者等级大于0时，才允许添加技能
    // 或者有足够的碎片合成第一个技能
    if (addBtn) {
        if ((gameData.skills && gameData.skills.length > 0) || (gameData.skillLevel > 0)) {
            addBtn.disabled = false;
            addBtn.title = "添加新技能";
        } else {
            addBtn.disabled = true;
            addBtn.title = "请先合成技能开启技能树";
        }
    }
}

// 合成技能
function synthesizeSkill() {
    const cost = 3; // 3个碎片合成一个技能点/开启技能树
    
    if ((gameData.skillFragments || 0) < cost) {
        showNotification(`碎片不足！需要${cost}个碎片合成。`, 'error');
        return;
    }
    
    gameData.skillFragments -= cost;
    
    // 如果是第一次合成，开启技能树（升到1级）
    if (gameData.skillLevel === 0) {
        gameData.skillLevel = 1;
        showNotification('恭喜！技能树已开启！现在可以添加技能了。');
    } else {
        // 否则获得经验值
        addSkillExp(50);
        showNotification('合成成功！获得50点技能经验。');
    }
    
    renderSkillStatus();
    saveData();
}

// 增加技能经验
function addSkillExp(amount) {
    gameData.skillExp = (gameData.skillExp || 0) + amount;
    
    // 升级逻辑
    while (gameData.skillExp >= (gameData.skillMaxExp || 100)) {
        gameData.skillExp -= (gameData.skillMaxExp || 100);
        gameData.skillLevel++;
        gameData.skillMaxExp = Math.floor((gameData.skillMaxExp || 100) * 1.2);
        showNotification(`技能树升级了！当前等级：Lv.${gameData.skillLevel}`);
    }
    
    renderSkillStatus();
    saveData();
}

// 获得技能碎片
function gainSkillFragment() {
    // 随机获得0-3个碎片
    const amount = Math.floor(Math.random() * 4);
    if (amount > 0) {
        gameData.skillFragments = (gameData.skillFragments || 0) + amount;
        showNotification(`获得了 ${amount} 个技能碎片！🧩`);
        renderSkillStatus();
        saveData();
    }
}

// 显示添加技能模态框
function showAddSkillModal(parentId = null) {
    // 检查是否开启了技能树
    if (gameData.skillLevel === 0 && (!gameData.skills || gameData.skills.length === 0)) {
        showNotification('请先收集碎片合成技能以开启技能树！', 'error');
        return;
    }

    document.getElementById('skill-modal-title').textContent = parentId ? '添加子技能' : '添加技能';
    document.getElementById('skill-edit-id').value = '';
    document.getElementById('skill-name').value = '';
    document.getElementById('skill-description').value = '';
    document.getElementById('skill-icon').value = '⭐';
    document.getElementById('skill-cost-value').value = '0';
    document.getElementById('skill-gain-value').value = '0';
    
    // 更新父技能选项
    updateSkillParentOptions(parentId);
    
    // 更新属性选项
    updateSkillStatOptions();
    
    // 确保父技能选择器可见（编辑时会隐藏）
    document.getElementById('skill-parent').parentElement.style.display = '';
    
    openModal('skill-modal');
}

// 更新父技能选项
function updateSkillParentOptions(preselectedId = null) {
    const select = document.getElementById('skill-parent');
    select.innerHTML = '<option value="">无（根技能）</option>';
    
    function addSkillOptions(skills, prefix = '') {
        skills.forEach(skill => {
            const option = document.createElement('option');
            option.value = skill.id;
            option.textContent = prefix + skill.name;
            if (preselectedId && skill.id == preselectedId) {
                option.selected = true;
            }
            select.appendChild(option);
            
            if (skill.children && skill.children.length > 0) {
                addSkillOptions(skill.children, prefix + '　');
            }
        });
    }
    
    addSkillOptions(gameData.skills);
}

// 更新技能属性选项
function updateSkillStatOptions() {
    const costSelect = document.getElementById('skill-cost-stat');
    const gainSelect = document.getElementById('skill-gain-stat');
    
    costSelect.innerHTML = '<option value="">无消耗</option>';
    gainSelect.innerHTML = '<option value="">无获得</option>';
    
    gameData.stats.forEach(stat => {
        costSelect.innerHTML += `<option value="${stat.id}">${stat.name}</option>`;
        gainSelect.innerHTML += `<option value="${stat.id}">${stat.name}</option>`;
    });
}

// 确认添加/编辑技能
function confirmAddSkill() {
    const editId = document.getElementById('skill-edit-id').value;
    const name = document.getElementById('skill-name').value.trim();
    const description = document.getElementById('skill-description').value.trim();
    const parentId = document.getElementById('skill-parent').value;
    const icon = document.getElementById('skill-icon').value || '⭐';
    const costStat = document.getElementById('skill-cost-stat').value;
    const costValue = parseInt(document.getElementById('skill-cost-value').value) || 0;
    const gainStat = document.getElementById('skill-gain-stat').value;
    const gainValue = parseInt(document.getElementById('skill-gain-value').value) || 0;
    
    if (!name) {
        showNotification('请输入技能名称', 'error');
        return;
    }
    
    const skillData = {
        name,
        description,
        icon,
        costStat: costStat || null,
        costValue,
        gainStat: gainStat || null,
        gainValue,
        children: []
    };
    
    if (editId) {
        // 编辑模式
        const skill = findSkillById(parseInt(editId));
        if (skill) {
            Object.assign(skill, skillData);
            skill.children = skill.children || [];
        }
        showNotification('技能已更新');
    } else {
        // 添加模式
        skillData.id = gameData.skillNextId++;
        
        if (parentId) {
            const parent = findSkillById(parseInt(parentId));
            if (parent) {
                if (!parent.children) parent.children = [];
                parent.children.push(skillData);
            }
        } else {
            gameData.skills.push(skillData);
        }
        showNotification('技能已添加');
    }
    
    closeModal('skill-modal');
    renderSkills();
    saveData();
}

// 根据ID查找技能
function findSkillById(id, skills = gameData.skills) {
    for (const skill of skills) {
        if (skill.id === id) return skill;
        if (skill.children && skill.children.length > 0) {
            const found = findSkillById(id, skill.children);
            if (found) return found;
        }
    }
    return null;
}

// 从技能树中删除技能
function removeSkillById(id, skills = gameData.skills) {
    for (let i = 0; i < skills.length; i++) {
        if (skills[i].id === id) {
            skills.splice(i, 1);
            return true;
        }
        if (skills[i].children && skills[i].children.length > 0) {
            if (removeSkillById(id, skills[i].children)) return true;
        }
    }
    return false;
}

// 渲染技能树
function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    if (!gameData.skills || gameData.skills.length === 0) {
        container.innerHTML = `
            <div class="skills-empty">
                <div class="skills-empty-icon">🌟</div>
                <h3>还没有技能</h3>
                <p>点击上方"添加技能"按钮创建你的第一个技能吧！</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '<div class="skill-tree-root"></div>';
    const root = container.querySelector('.skill-tree-root');
    
    gameData.skills.forEach(skill => {
        root.appendChild(createSkillNode(skill));
    });
    
    updateDataStats();
}

// 创建技能节点元素
function createSkillNode(skill) {
    const node = document.createElement('div');
    node.className = 'skill-node';
    node.dataset.skillId = skill.id;
    
    // 构建效果标签
    let effectsHtml = '';
    if (skill.costStat) {
        const costStatName = gameData.stats.find(s => s.id == skill.costStat)?.name || '未知';
        effectsHtml += `<span class="skill-effect-tag cost">-${skill.costValue} ${costStatName}</span>`;
    }
    if (skill.gainStat) {
        const gainStatName = gameData.stats.find(s => s.id == skill.gainStat)?.name || '未知';
        effectsHtml += `<span class="skill-effect-tag gain">+${skill.gainValue} ${gainStatName}</span>`;
    }
    
    // 检查是否可以使用（消耗足够）
    let canUse = true;
    if (skill.costStat) {
        const stat = gameData.stats.find(s => s.id == skill.costStat);
        if (!stat || stat.current < skill.costValue) {
            canUse = false;
        }
    }
    
    node.innerHTML = `
        <div class="skill-node-main">
            <div class="skill-icon">${skill.icon}</div>
            <div class="skill-info">
                <div class="skill-name">${skill.name}</div>
                ${skill.description ? `<div class="skill-desc">${skill.description}</div>` : ''}
                ${effectsHtml ? `<div class="skill-effects">${effectsHtml}</div>` : ''}
            </div>
            <div class="skill-actions">
                ${(skill.costStat || skill.gainStat) ? `
                    <button class="skill-action-btn use" onclick="useSkill(${skill.id})" ${canUse ? '' : 'disabled'} title="使用技能">▶</button>
                ` : ''}
                <button class="skill-action-btn edit" onclick="editSkill(${skill.id})" title="编辑">✎</button>
                <button class="skill-action-btn delete" onclick="deleteSkill(${skill.id})" title="删除">×</button>
            </div>
        </div>
    `;
    
    // 添加子技能
    if (skill.children && skill.children.length > 0) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'skill-children';
        
        skill.children.forEach(child => {
            childrenContainer.appendChild(createSkillNode(child));
        });
        
        // 添加"添加子技能"按钮
        const addChildBtn = document.createElement('div');
        addChildBtn.className = 'skill-add-child-btn';
        addChildBtn.innerHTML = '+ 添加子技能';
        addChildBtn.onclick = () => showAddSkillModal(skill.id);
        childrenContainer.appendChild(addChildBtn);
        
        node.appendChild(childrenContainer);
    } else {
        // 无子技能时也显示添加按钮
        const addChildContainer = document.createElement('div');
        addChildContainer.className = 'skill-children';
        const addChildBtn = document.createElement('div');
        addChildBtn.className = 'skill-add-child-btn';
        addChildBtn.innerHTML = '+ 添加子技能';
        addChildBtn.onclick = () => showAddSkillModal(skill.id);
        addChildContainer.appendChild(addChildBtn);
        node.appendChild(addChildContainer);
    }
    
    return node;
}

// 使用技能
function useSkill(skillId) {
    const skill = findSkillById(skillId);
    if (!skill) return;
    
    // 检查消耗
    if (skill.costStat) {
        const costStat = gameData.stats.find(s => s.id == skill.costStat);
        if (!costStat || costStat.current < skill.costValue) {
            showNotification(`${costStat?.name || '属性'}不足，无法使用技能`, 'error');
            return;
        }
        // 扣除消耗
        costStat.current -= skill.costValue;
    }
    
    // 获得效果
    if (skill.gainStat) {
        const gainStat = gameData.stats.find(s => s.id == skill.gainStat);
        if (gainStat) {
            gainStat.current = Math.min(gainStat.max, gainStat.current + skill.gainValue);
        }
    }
    
    renderStats();
    renderSkills();
    saveData();
    showNotification(`使用了技能：${skill.name}`);
}

// 编辑技能
function editSkill(skillId) {
    const skill = findSkillById(skillId);
    if (!skill) return;
    
    document.getElementById('skill-modal-title').textContent = '编辑技能';
    document.getElementById('skill-edit-id').value = skill.id;
    document.getElementById('skill-name').value = skill.name;
    document.getElementById('skill-description').value = skill.description || '';
    document.getElementById('skill-icon').value = skill.icon || '⭐';
    
    // 更新属性选项
    updateSkillStatOptions();
    
    // 设置消耗和获得
    setTimeout(() => {
        document.getElementById('skill-cost-stat').value = skill.costStat || '';
        document.getElementById('skill-cost-value').value = skill.costValue || 0;
        document.getElementById('skill-gain-stat').value = skill.gainStat || '';
        document.getElementById('skill-gain-value').value = skill.gainValue || 0;
    }, 50);
    
    // 隐藏父技能选择（编辑时不能改变层级）
    document.getElementById('skill-parent').parentElement.style.display = 'none';
    
    openModal('skill-modal');
}

// 删除技能
function deleteSkill(skillId) {
    if (!confirm('确定要删除这个技能吗？子技能也会被删除。')) return;
    
    removeSkillById(skillId);
    renderSkills();
    saveData();
    showNotification('技能已删除');
}

// ==================== 设置和重置 ====================

// 显示重置确认模态框
function showResetConfirmModal() {
    openModal('reset-modal');
}

// 确认重置
function confirmReset() {
    // 清除localStorage
    localStorage.removeItem('cyberGameData');
    
    // 重置gameData
    gameData = {
        stats: [],
        backpack: [],
        storage: [],
        shop: [],
        skills: [],
        skillFragments: 0,
        skillLevel: 0,
        skillExp: 0,
        skillMaxExp: 100,
        gold: 100,
        food: 0,
        pet: {
            selected: false,
            type: '',
            name: '',
            level: 1,
            exp: 0,
            maxExp: 100,
            hunger: 100,
            lastFeedTime: Date.now()
        },
        map: {
            nodes: [],
            connections: [],
            nextId: 1
        },
        skillNextId: 1
    };
    
    closeModal('reset-modal');
    showNotification('所有数据已重置');
    
    // 刷新页面
    setTimeout(() => {
        location.reload();
    }, 1000);
}

// 更新设置页数据统计
function updateDataStats() {
    const statsCount = document.getElementById('stats-count');
    const skillsCount = document.getElementById('skills-count');
    const backpackCount = document.getElementById('backpack-count');
    const mapCount = document.getElementById('map-count');
    
    if (statsCount) statsCount.textContent = gameData.stats.length;
    if (skillsCount) {
        let count = 0;
        function countSkills(skills) {
            skills.forEach(s => {
                count++;
                if (s.children) countSkills(s.children);
            });
        }
        countSkills(gameData.skills);
        skillsCount.textContent = count;
    }
    if (backpackCount) backpackCount.textContent = gameData.backpack.length;
    if (mapCount) mapCount.textContent = gameData.map?.nodes?.length || 0;
}

// 数据持久化
function saveData() {
    localStorage.setItem('cyberGameData', JSON.stringify(gameData));
}

function loadData() {
    const saved = localStorage.getItem('cyberGameData');
    if (saved) {
        const loadedData = JSON.parse(saved);
        // 合并数据，确保新属性存在
        gameData = {
            ...gameData,
            ...loadedData,
            skills: loadedData.skills || [],
            skillFragments: loadedData.skillFragments || 0,
            skillLevel: loadedData.skillLevel || 0,
            skillExp: loadedData.skillExp || 0,
            skillMaxExp: loadedData.skillMaxExp || 100,
            skillNextId: loadedData.skillNextId || 1,
            map: loadedData.map || {
                nodes: [],
                connections: [],
                nextId: 1
            }
        };
    }
}
