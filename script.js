// 数据存储
let gameData = {
    stats: [],
    backpack: [],
    storage: [],
    shop: [],
    skills: [],
    equippedSkills: [], // 装备在首页的技能ID列表（最多6个）
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
    pets: [], // 多宠物收集
    // 角色外观数据
    character: {
        name: '冒险者',
        skinColor: '#FFDAB9',
        hairStyle: 'default',
        hairColor: '#4a3728',
        eyeStyle: 'default',
        outfitStyle: 'casual',
        outfitColor: '#4FC3F7',
        accessory: ''
    },
    map: {
        nodes: [],
        connections: [],
        nextId: 1
    },
    skillNextId: 1,
    // 番茄钟设置
    pomodoro: {
        workTime: 25,  // 工作时间（分钟）
        breakTime: 5,   // 休息时间（分钟）
        longBreakTime: 15, // 长休息时间
        sessions: 0,    // 完成的番茄数
        isRunning: false,
        isBreak: false,
        remainingTime: 25 * 60 // 剩余秒数
    },
    // 提醒设置
    reminders: {
        drinkWater: { enabled: true, interval: 30 }, // 喝水提醒（分钟）
        rest: { enabled: true, interval: 45 },       // 休息提醒
        stretch: { enabled: true, interval: 60 },    // 伸展提醒
        petHunger: { enabled: true }                 // 宠物饥饿提醒
    }
};

// 番茄钟相关变量
let pomodoroTimer = null;
let reminderTimers = {};

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
    initBookmarkTabs();
    initChallengeTabs();
    initThemeSwitcher();
    renderStats();
    renderBackpack();
    renderStorage();
    renderShop();
    renderSkills();
    renderSkillStatus();
    updateGoldDisplay();
    addDefaultStats();
    initPet();
    initMap();
    updateDataStats();
    renderHomeStats();
    renderHomeBackpack();
    renderHomeSkills();
    updateHeaderCurrency();
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

// 初始化标签页切换 - 书签导航
function initBookmarkTabs() {
    const bookmarkTabs = document.querySelectorAll('.bookmark-tab');
    bookmarkTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            bookmarkTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const panels = document.querySelectorAll('.panel');
            panels.forEach(p => p.classList.remove('active'));
            
            const targetPanel = document.getElementById(tab.dataset.tab);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });
}

// 切换到指定标签页
function switchToTab(tabName) {
    const bookmarkTabs = document.querySelectorAll('.bookmark-tab');
    bookmarkTabs.forEach(t => t.classList.remove('active'));
    
    const targetTab = document.querySelector(`.bookmark-tab[data-tab="${tabName}"]`);
    if (targetTab) targetTab.classList.add('active');
    
    const panels = document.querySelectorAll('.panel');
    panels.forEach(p => p.classList.remove('active'));
    
    const targetPanel = document.getElementById(tabName);
    if (targetPanel) targetPanel.classList.add('active');
    
    // 如果切换到地图页面，重新绑定事件并重绘连接线
    if (tabName === 'map') {
        setTimeout(() => {
            reinitMap();
        }, 100);
    }
}

// 旧的导航初始化函数保持兼容
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
    renderHomeStats(); // 同步更新首页属性
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
        renderHomeBackpack(); // 同步更新首页背包
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
    
    renderHomeBackpack(); // 同步更新首页背包
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
        const itemName = item.name;
        let effectText = '';
        
        // 应用效果
        if (item.effectStat) {
            const stat = gameData.stats.find(s => s.id === parseInt(item.effectStat));
            if (stat) {
                const oldValue = stat.current;
                stat.current = Math.min(stat.max, stat.current + item.effectValue);
                const actualGain = stat.current - oldValue;
                effectText = ` (${stat.name} +${actualGain})`;
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
        
        // 同步更新首页显示
        renderHomeStats();
        renderHomeBackpack();
        
        // 显示使用提示
        showNotification(`使用了 ${itemName}${effectText}`);
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
    const goldEl = document.getElementById('gold-amount');
    if (goldEl) goldEl.textContent = gameData.gold;
    updateHeaderCurrency(); // 同步更新头部货币
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
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
    }
}

// 点击模态框外部关闭
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        e.target.style.display = 'none';
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
if (!document.getElementById('animation-styles')) {
    const animationStyle = document.createElement('style');
    animationStyle.id = 'animation-styles';
    animationStyle.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(animationStyle);
}

// 宠物系统
// 宠物进化阶段：基础(1-5级) -> 成长(6-10级) -> 成熟(11-20级) -> 究极(21+级)
const petEvolutionStages = {
    'cat': ['🐱', '😺', '😸', '🦁'],      // 小猫 -> 开心猫 -> 笑猫 -> 狮子
    'dog': ['🐶', '🐕', '🦮', '🐺'],      // 小狗 -> 狗 -> 导盲犬 -> 狼
    'rabbit': ['🐰', '🐇', '🐾', '🦄'],   // 小兔 -> 兔子 -> 爪印 -> 独角兽
    'bear': ['🐻', '🧸', '🐻‍❄️', '🦊'],   // 小熊 -> 玩具熊 -> 北极熊 -> 狐狸神
    'panda': ['🐼', '🐨', '🦝', '🐉'],    // 小熊猫 -> 考拉 -> 浣熊 -> 龙
    'fox': ['🦊', '🐺', '🦁', '🐲']       // 小狐狸 -> 狼 -> 狮子 -> 龙
};

const petEvolutionNames = {
    'cat': ['小猫咪', '开心猫', '微笑猫', '狮子王'],
    'dog': ['小狗狗', '忠诚犬', '守护犬', '狼神'],
    'rabbit': ['小兔子', '奔跑兔', '神速兔', '独角兽'],
    'bear': ['小熊熊', '抱抱熊', '极地熊', '熊神'],
    'panda': ['小熊猫', '萌萌达', '功夫熊猫', '神龙'],
    'fox': ['小狐狸', '灵狐', '狮王', '神龙']
};

// 获取进化阶段（0-3）
function getEvolutionStage(level) {
    if (level <= 5) return 0;
    if (level <= 10) return 1;
    if (level <= 20) return 2;
    return 3;
}

// 获取当前进化的emoji
function getPetEmoji(type, level) {
    const stage = getEvolutionStage(level);
    return petEvolutionStages[type]?.[stage] || petEvolutionStages[type]?.[0] || '🐱';
}

// 旧版兼容
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
    updateHomeMapPet(); // 更新首页地图上的宠物显示
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
    
    // 获取进化阶段的emoji
    const currentStage = getEvolutionStage(gameData.pet.level);
    const petEmojiChar = getPetEmoji(gameData.pet.type, gameData.pet.level);
    
    // 更新宠物emoji和名字
    document.getElementById('pet-emoji').textContent = petEmojiChar;
    document.getElementById('pet-name-display').textContent = gameData.pet.name;
    
    // 更新进化阶段显示
    const stageNames = ['基础形态', '成长形态', '成熟形态', '究极形态'];
    const stageEl = document.getElementById('pet-stage');
    if (stageEl) {
        stageEl.textContent = stageNames[currentStage];
        stageEl.className = 'pet-stage stage-' + currentStage;
    }
    
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
    petEmojiEl.className = 'pet-emoji level-' + gameData.pet.level + ' stage-' + currentStage;
    
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
    updateHeaderCurrency(); // 同步更新头部货币
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
    if (petEmoji) {
        petEmoji.classList.add('happy');
        setTimeout(() => petEmoji.classList.remove('happy'), 500);
    }
    
    speakPetMessage(happyMessages[Math.floor(Math.random() * happyMessages.length)]);
    updatePetDisplay();
    updateFoodDisplay(); // 更新食物显示
    updateHomeMapPet(); // 更新首页宠物心情
    saveData();
}

// 宠物升级
function levelUpPet() {
    const oldStage = getEvolutionStage(gameData.pet.level);
    
    gameData.pet.level++;
    gameData.pet.exp = 0;
    gameData.pet.maxExp = Math.floor(gameData.pet.maxExp * 1.5);
    
    const newStage = getEvolutionStage(gameData.pet.level);
    
    // 升级动画
    const petEmoji = document.getElementById('pet-emoji');
    if (petEmoji) {
        petEmoji.style.animation = 'none';
        setTimeout(() => {
            petEmoji.style.animation = '';
        }, 10);
    }
    
    // 检查是否进化
    if (newStage > oldStage) {
        const stageNames = ['基础形态', '成长形态', '成熟形态', '究极形态'];
        const newEmoji = getPetEmoji(gameData.pet.type, gameData.pet.level);
        showNotification(`🌟 ${gameData.pet.name}进化了！变成了${stageNames[newStage]}！${newEmoji}`);
        speakPetMessage(`哇！我进化了！我变得更强了！`);
        
        // 进化特效
        if (petEmoji) {
            petEmoji.classList.add('evolving');
            setTimeout(() => petEmoji.classList.remove('evolving'), 2000);
        }
    } else {
        showNotification(`🎉 ${gameData.pet.name}升级了！现在是${gameData.pet.level}级！`);
        speakPetMessage(`太棒了！我升到${gameData.pet.level}级了！`);
    }
    
    updateHomeMapPet(); // 更新首页宠物显示（进化后外观可能变化）
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
    if (petEmoji) {
        petEmoji.classList.add('happy');
        setTimeout(() => petEmoji.classList.remove('happy'), 500);
    }
    
    const playMessages = [
        '好开心呀！',
        '和你玩真有趣！',
        '我们再玩一次吧！',
        '太好玩了！',
        '我喜欢和你玩！'
    ];
    speakPetMessage(playMessages[Math.floor(Math.random() * playMessages.length)]);
    updatePetDisplay();
    updateHomeMapPet(); // 更新首页宠物心情
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
        updateHomeMapPet(); // 更新首页地图（隐藏宠物）
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
    dragOffset: { x: 0, y: 0 },
    initialized: false
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
    
    // 添加容器事件监听（如果还没有添加）
    if (!mapState.initialized) {
        container.addEventListener('mousemove', handleMapMouseMove);
        container.addEventListener('mouseup', handleMapMouseUp);
        container.addEventListener('mouseleave', handleMapMouseUp);
        container.addEventListener('touchmove', handleMapTouchMove, { passive: false });
        container.addEventListener('touchend', handleMapMouseUp);
        container.addEventListener('touchcancel', handleMapMouseUp);
        
        // 全局监听鼠标松开，以处理在容器外松开的情况
        document.addEventListener('mouseup', handleMapMouseUp);
        
        mapState.initialized = true;
    }
}

// 重新初始化地图（用于切换到地图页面时）
function reinitMap() {
    const container = document.getElementById('mapContainer');
    if (!container) return;
    
    // 重绘连接线
    renderConnections();
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
    
    // 同步更新首页技能显示
    renderHomeSkills();
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
        
        // 更新首页角色等级显示
        const avatarLevel = document.querySelector('.avatar-level');
        if (avatarLevel) {
            avatarLevel.textContent = `Lv.${gameData.skillLevel}`;
        }
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
    renderHomeSkills(); // 更新首页技能显示
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
    
    // 检查是否已装备
    const isEquipped = gameData.equippedSkills && gameData.equippedSkills.includes(skill.id);
    
    node.innerHTML = `
        <div class="skill-node-main">
            <div class="skill-icon">${skill.icon}</div>
            <div class="skill-info">
                <div class="skill-name">
                    ${skill.name}
                    ${isEquipped ? '<span class="equipped-badge">已装备</span>' : ''}
                </div>
                ${skill.description ? `<div class="skill-desc">${skill.description}</div>` : ''}
                ${effectsHtml ? `<div class="skill-effects">${effectsHtml}</div>` : ''}
            </div>
            <div class="skill-actions">
                <button class="skill-action-btn equip ${isEquipped ? 'equipped' : ''}" 
                        onclick="toggleEquipSkill(${skill.id})" 
                        title="${isEquipped ? '从首页卸载' : '装备到首页'}">
                    ${isEquipped ? '★' : '☆'}
                </button>
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
    
    let effectText = '';
    
    // 检查消耗
    if (skill.costStat) {
        const costStat = gameData.stats.find(s => s.id == skill.costStat);
        if (!costStat || costStat.current < skill.costValue) {
            showNotification(`${costStat?.name || '属性'}不足，无法使用技能`, 'error');
            return;
        }
        // 扣除消耗
        costStat.current -= skill.costValue;
        effectText = ` (${costStat.name} -${skill.costValue})`;
    }
    
    // 获得效果
    if (skill.gainStat) {
        const gainStat = gameData.stats.find(s => s.id == skill.gainStat);
        if (gainStat) {
            const oldValue = gainStat.current;
            gainStat.current = Math.min(gainStat.max, gainStat.current + skill.gainValue);
            const actualGain = gainStat.current - oldValue;
            if (effectText) {
                effectText += `, ${gainStat.name} +${actualGain}`;
            } else {
                effectText = ` (${gainStat.name} +${actualGain})`;
            }
        }
    }
    
    renderStats();
    renderSkills();
    saveData();
    
    // 同步更新首页显示
    renderHomeStats();
    renderHomeSkills();
    
    showNotification(`使用了技能：${skill.name}${effectText}`);
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
            },
            // 确保番茄钟数据完整性
            pomodoro: {
                ...gameData.pomodoro,
                ...(loadedData.pomodoro || {}),
                isRunning: false  // 重新加载时总是停止状态
            },
            // 确保提醒设置完整性
            reminders: {
                ...gameData.reminders,
                ...(loadedData.reminders || {})
            },
            // 确保角色数据完整性
            character: {
                ...gameData.character,
                ...(loadedData.character || {})
            }
        };
        
        // 修复番茄钟剩余时间
        if (gameData.pomodoro.remainingTime <= 0) {
            gameData.pomodoro.remainingTime = gameData.pomodoro.workTime * 60;
            gameData.pomodoro.isBreak = false;
        }
    }
}

// ========== 伪装模式功能 - VSCode风格 ==========
let disguiseMode = false;
let codeLines = [];
let currentLine = 0;
let currentCol = 0;
let userTypedCode = '';

// 性能优化：缓存DOM元素
let cachedElements = {};

// 打字统计
let typingStats = {
    startTime: null,
    totalChars: 0,
    correctChars: 0,
    errors: 0
};

// 防止重复触发
let isToggling = false;

// 示例代码库 - 数据结构与算法学习
const sampleCode = `/**
 * 数据结构与算法 - 学习笔记
 * 主题：数组、链表、二叉树、递归与动态规划
 */

// ==================== 数组相关算法 ====================

// 1. 前缀和算法 - 快速计算区间和
class PrefixSum {
    constructor(nums) {
        this.prefix = new Array(nums.length + 1).fill(0);
        // 构建前缀和数组
        for (let i = 0; i < nums.length; i++) {
            this.prefix[i + 1] = this.prefix[i] + nums[i];
        }
    }
    
    // 查询区间 [left, right] 的和
    query(left, right) {
        return this.prefix[right + 1] - this.prefix[left];
    }
}

// 2. 差分数组 - 区间修改
class Difference {
    constructor(nums) {
        this.diff = new Array(nums.length);
        this.diff[0] = nums[0];
        for (let i = 1; i < nums.length; i++) {
            this.diff[i] = nums[i] - nums[i - 1];
        }
    }
    
    // 给区间 [i, j] 增加 val
    increment(i, j, val) {
        this.diff[i] += val;
        if (j + 1 < this.diff.length) {
            this.diff[j + 1] -= val;
        }
    }
}

// 3. 双指针技巧 - 两数之和
function twoSum(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const sum = nums[left] + nums[right];
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [-1, -1];
}

// 4. 滑动窗口 - 最小覆盖子串
function minWindow(s, t) {
    const need = new Map();
    const window = new Map();
    
    for (let c of t) {
        need.set(c, (need.get(c) || 0) + 1);
    }
    
    let left = 0, right = 0;
    let valid = 0;
    let start = 0, len = Infinity;
    
    while (right < s.length) {
        const c = s[right];
        right++;
        
        if (need.has(c)) {
            window.set(c, (window.get(c) || 0) + 1);
            if (window.get(c) === need.get(c)) {
                valid++;
            }
        }
        
        while (valid === need.size) {
            if (right - left < len) {
                start = left;
                len = right - left;
            }
            
            const d = s[left];
            left++;
            if (need.has(d)) {
                if (window.get(d) === need.get(d)) {
                    valid--;
                }
                window.set(d, window.get(d) - 1);
            }
        }
    }
    
    return len === Infinity ? "" : s.substr(start, len);
}

// 5. 二分搜索 - 标准模板
function binarySearch(nums, target) {
    let left = 0, right = nums.length - 1;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// ==================== 链表相关算法 ====================

class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

// 6. 链表双指针 - 找中点
function findMiddle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

// 7. 反转链表 - 递归实现
function reverseList(head) {
    if (!head || !head.next) return head;
    const last = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return last;
}

// ==================== 二叉树相关算法 ====================

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// 8. 二叉树遍历 - 前序遍历（递归）
function preorderTraversal(root) {
    const result = [];
    function traverse(node) {
        if (!node) return;
        result.push(node.val);  // 前序位置
        traverse(node.left);
        traverse(node.right);
    }
    traverse(root);
    return result;
}

// 9. 层序遍历 - BFS
function levelOrder(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        const currentLevel = [];
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            currentLevel.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(currentLevel);
    }
    return result;
}

// 10. 回溯算法 - 全排列
function permute(nums) {
    const result = [];
    const track = [];
    const used = new Array(nums.length).fill(false);
    
    function backtrack() {
        if (track.length === nums.length) {
            result.push([...track]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            
            track.push(nums[i]);
            used[i] = true;
            backtrack();
            track.pop();
            used[i] = false;
        }
    }
    
    backtrack();
    return result;
}

// 11. 动态规划 - 零钱兑换
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (let coin of coins) {
            if (i - coin >= 0) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// 12. 分治算法 - 归并排序
function mergeSort(nums) {
    if (nums.length <= 1) return nums;
    
    const mid = Math.floor(nums.length / 2);
    const left = mergeSort(nums.slice(0, mid));
    const right = mergeSort(nums.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// 13. 广度优先搜索 - 最短路径
function shortestPath(graph, start, end) {
    const queue = [[start, 0]];
    const visited = new Set([start]);
    
    while (queue.length > 0) {
        const [node, dist] = queue.shift();
        
        if (node === end) return dist;
        
        for (let neighbor of graph[node] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, dist + 1]);
            }
        }
    }
    
    return -1;
}

console.log('算法模块加载完成！');`;

// 检测是否为桌面端
function isDesktop() {
    return window.innerWidth > 768;
}

// 只在桌面端显示老板键提示
window.addEventListener('load', function() {
    const hint = document.getElementById('boss-key-hint');
    if (hint && !isDesktop()) {
        hint.style.display = 'none';
    }
    
    // 确保快捷键可以工作 - 添加到window和document上
    console.log('Boss key listener ready. Press Ctrl+B to toggle disguise mode.');
});

// 监听老板键 Ctrl+B (仅桌面端) - 在 document 上
document.addEventListener('keydown', function(e) {
    // 使用 keyCode 66 (B) 或 key 属性进行兼容性检测
    const isBKey = e.keyCode === 66 || e.key === 'b' || e.key === 'B';
    
    // Ctrl+B 切换伪装模式
    if (e.ctrlKey && isBKey && isDesktop()) {
        e.preventDefault();
        e.stopPropagation();
        if (!isToggling) {
            isToggling = true;
            toggleDisguiseMode();
            setTimeout(() => isToggling = false, 100);
        }
        return;
    }
    
    // ESC键退出伪装模式
    if (e.key === 'Escape' && disguiseMode) {
        e.preventDefault();
        toggleDisguiseMode();
        return;
    }
    
    // 在伪装模式下处理打字
    if (disguiseMode && isDesktop() && !e.ctrlKey && !e.altKey && !e.metaKey) {
        handleTyping(e);
    }
}, true); // 使用捕获阶段

// 备用方案：在 window 上也添加监听器
window.addEventListener('keydown', function(e) {
    const isBKey = e.keyCode === 66 || e.key === 'b' || e.key === 'B';
    if (e.ctrlKey && isBKey && isDesktop() && !isToggling) {
        e.preventDefault();
        isToggling = true;
        toggleDisguiseMode();
        setTimeout(() => isToggling = false, 100);
    }
});

function toggleDisguiseMode() {
    disguiseMode = !disguiseMode;
    const disguiseContainer = document.getElementById('disguise-mode');
    const mainContainer = document.querySelector('.container');
    
    if (disguiseMode) {
        disguiseContainer.style.display = 'flex';
        mainContainer.style.display = 'none';
        startDisguiseMode();
    } else {
        disguiseContainer.style.display = 'none';
        mainContainer.style.display = 'block';
        stopDisguiseMode();
    }
}

function startDisguiseMode() {
    // 缓存DOM元素
    cachedElements = {
        refCode: document.getElementById('reference-code'),
        refLineNumbers: document.getElementById('ref-line-numbers'),
        practiceCode: document.getElementById('practice-code'),
        practiceLineNumbers: document.getElementById('practice-line-numbers'),
        cursor: document.getElementById('cursor'),
        cursorPosition: document.getElementById('cursor-position'),
        refPanel: document.querySelector('.code-reference-panel .code-editor'),
        practicePanel: document.querySelector('.code-practice-panel .code-editor')
    };
    
    // 初始化代码显示
    codeLines = sampleCode.split('\n');
    currentLine = 0;
    currentCol = 0;
    userTypedCode = '';
    
    // 重置统计
    typingStats = {
        startTime: null,
        totalChars: 0,
        correctChars: 0,
        errors: 0
    };
    
    // 显示参考代码（左侧）
    updateReferenceCode();
    
    // 初始化练习区（右侧）
    updatePracticeCode();
    updatePracticeLineNumbers();
    updateCursorPosition();
    
    // 添加同步滚动
    setupSyncScroll();
}

function stopDisguiseMode() {
    // 清理缓存
    cachedElements = {};
    
    // 输出统计信息（可选）
    if (typingStats.totalChars > 0) {
        const accuracy = Math.round((typingStats.correctChars / typingStats.totalChars) * 100);
        console.log(`打字统计: 总字数 ${typingStats.totalChars}, 正确率 ${accuracy}%`);
    }
}

// 显示参考代码（左侧 - 完整彩色代码）
function updateReferenceCode() {
    const refCode = cachedElements.refCode || document.getElementById('reference-code');
    const refLineNumbers = cachedElements.refLineNumbers || document.getElementById('ref-line-numbers');
    if (!refCode || !refLineNumbers) return;
    
    // 使用数组join优化字符串拼接
    const displayLines = codeLines.map(line => highlightCodeAdvanced(line));
    refCode.innerHTML = displayLines.join('\n');
    
    // 行号
    const lineNums = [];
    for (let i = 1; i <= codeLines.length; i++) {
        lineNums.push(i);
    }
    refLineNumbers.textContent = lineNums.join('\n');
}

// 更新练习区代码（右侧 - 用户输入）
function updatePracticeCode() {
    const practiceCode = cachedElements.practiceCode || document.getElementById('practice-code');
    if (!practiceCode) return;
    
    if (userTypedCode === '') {
        practiceCode.innerHTML = '';
        return;
    }
    
    // 使用数组优化拼接
    const inputLines = userTypedCode.split('\n');
    const displayLines = inputLines.map(line => highlightCodeAdvanced(line));
    practiceCode.innerHTML = displayLines.join('\n');
}

// 更新练习区行号
function updatePracticeLineNumbers() {
    const lineNumbers = cachedElements.practiceLineNumbers || document.getElementById('practice-line-numbers');
    if (!lineNumbers) return;
    
    const lineCount = Math.max(userTypedCode.split('\n').length, 1);
    const nums = [];
    for (let i = 1; i <= lineCount; i++) {
        nums.push(i);
    }
    lineNumbers.textContent = nums.join('\n');
}

// 增强版语法高亮
function highlightCodeAdvanced(code) {
    if (!code) return '';
    
    let result = escapeHtml(code);
    
    // 注释（最高优先级，先处理）
    result = result.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
    result = result.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>');
    
    // 字符串
    result = result.replace(/(&quot;(?:[^&quot;\\]|\\.)*&quot;)/g, '<span class="string">$1</span>');
    result = result.replace(/(&#39;(?:[^&#39;\\]|\\.)*&#39;)/g, '<span class="string">$1</span>');
    result = result.replace(/(`(?:[^`\\]|\\.)*`)/g, '<span class="string">$1</span>');
    
    // 数字
    result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');
    
    // 类名（大写开头）
    result = result.replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="class-name">$1</span>');
    
    // 关键字
    const keywords = 'const|let|var|function|async|await|if|else|for|while|return|try|catch|new|import|require|export|class|extends|this|super|static|typeof|instanceof|delete|in|of|break|continue|switch|case|default|throw|finally';
    result = result.replace(new RegExp(`\\b(${keywords})\\b`, 'g'), '<span class="keyword">$1</span>');
    
    // 布尔值和null
    result = result.replace(/\b(true|false)\b/g, '<span class="boolean">$1</span>');
    result = result.replace(/\b(null|undefined)\b/g, '<span class="null-keyword">$1</span>');
    
    // 函数名（后面跟着括号）
    result = result.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="function">$1</span>(');
    
    // 对象属性和方法
    result = result.replace(/\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g, '.<span class="property">$1</span>');
    
    return result;
}

function escapeHtml(text) {
    // 性能优化：使用字符串替换而不是创建DOM元素
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function updateCodeDisplay() {
    // 保留这个函数以兼容，但实际使用新的函数
    updatePracticeCode();
}

function updateLineNumbers() {
    // 兼容旧的调用，现在使用新函数
    updatePracticeLineNumbers();
}

function updateCursorPosition() {
    const cursor = cachedElements.cursor || document.getElementById('cursor');
    if (!cursor) return;
    
    // 计算光标位置
    const lines = userTypedCode.split('\n');
    const lineNumber = lines.length;
    const colNumber = lines[lines.length - 1].length;
    
    // 更新状态栏
    const posDisplay = cachedElements.cursorPosition || document.getElementById('cursor-position');
    if (posDisplay) {
        posDisplay.textContent = `Ln ${lineNumber}, Col ${colNumber + 1}`;
    }
    
    // 定位光标
    cursor.style.top = ((lineNumber - 1) * 20 + 10) + 'px';
    cursor.style.left = (colNumber * 8.4 + 10) + 'px';
}

function handleTyping(e) {
    // 忽略功能键
    const ignoredKeys = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Insert', 'Home', 'End', 'PageUp', 'PageDown', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (ignoredKeys.includes(e.key)) return;
    
    // 阻止默认行为
    if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Tab') {
        e.preventDefault();
    }
    
    // 开始计时
    if (!typingStats.startTime && e.key.length === 1) {
        typingStats.startTime = Date.now();
    }
    
    if (e.key === 'Enter') {
        userTypedCode += '\n';
        typingStats.totalChars++;
    } else if (e.key === 'Backspace') {
        if (userTypedCode.length > 0) {
            userTypedCode = userTypedCode.slice(0, -1);
        }
    } else if (e.key === 'Tab') {
        userTypedCode += '    ';
        typingStats.totalChars += 4;
    } else if (e.key === 'Delete') {
        // 删除光标后的字符（当前简化处理）
    } else if (e.key.length === 1) {
        userTypedCode += e.key;
        typingStats.totalChars++;
        
        // 检查是否与参考代码匹配
        const expectedChar = sampleCode[userTypedCode.length - 1];
        if (e.key === expectedChar) {
            typingStats.correctChars++;
        } else {
            typingStats.errors++;
        }
    }
    
    updatePracticeCode();
    updatePracticeLineNumbers();
    updateCursorPosition();
    updateTypingStats();
}

// 同步滚动功能
function setupSyncScroll() {
    const refPanel = cachedElements.refPanel;
    const practicePanel = cachedElements.practicePanel;
    
    if (refPanel && practicePanel) {
        refPanel.addEventListener('scroll', function() {
            practicePanel.scrollTop = refPanel.scrollTop;
        });
        
        practicePanel.addEventListener('scroll', function() {
            refPanel.scrollTop = practicePanel.scrollTop;
        });
    }
}

// 更新打字统计
function updateTypingStats() {
    const posDisplay = cachedElements.cursorPosition || document.getElementById('cursor-position');
    if (!posDisplay) return;
    
    const lines = userTypedCode.split('\n');
    const lineNumber = lines.length;
    const colNumber = lines[lines.length - 1].length;
    
    let statsText = `Ln ${lineNumber}, Col ${colNumber + 1}`;
    
    // 显示打字速度和准确率
    if (typingStats.startTime && typingStats.totalChars > 10) {
        const elapsedMinutes = (Date.now() - typingStats.startTime) / 60000;
        const wpm = Math.round((typingStats.totalChars / 5) / elapsedMinutes);
        const accuracy = Math.round((typingStats.correctChars / typingStats.totalChars) * 100);
        statsText += ` | ${wpm} WPM | ${accuracy}%`;
    }
    
    posDisplay.textContent = statsText;
}

// 添加滑出动画（避免重复声明style变量）
if (!document.getElementById('slideout-animation-style')) {
    const slideOutStyle = document.createElement('style');
    slideOutStyle.id = 'slideout-animation-style';
    slideOutStyle.textContent = `
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
    document.head.appendChild(slideOutStyle);
}

// ==================== 番茄钟系统 ====================

// 初始化番茄钟
function initPomodoro() {
    // 确保番茄钟定时器被清除
    if (pomodoroTimer) {
        clearInterval(pomodoroTimer);
        pomodoroTimer = null;
    }
    
    // 确保显示正确
    updatePomodoroDisplay();
    updatePomodoroButton();
    
    // 更新设置界面的输入框
    const workTimeInput = document.getElementById('work-time');
    const breakTimeInput = document.getElementById('break-time');
    if (workTimeInput) workTimeInput.value = gameData.pomodoro.workTime;
    if (breakTimeInput) breakTimeInput.value = gameData.pomodoro.breakTime;
    
    // 请求通知权限
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// 开始/暂停番茄钟
function togglePomodoro() {
    if (gameData.pomodoro.isRunning) {
        pausePomodoro();
    } else {
        startPomodoro();
    }
}

// 开始番茄钟
function startPomodoro() {
    gameData.pomodoro.isRunning = true;
    updatePomodoroButton();
    saveData();
    
    pomodoroTimer = setInterval(() => {
        gameData.pomodoro.remainingTime--;
        updatePomodoroDisplay();
        
        if (gameData.pomodoro.remainingTime <= 0) {
            pomodoroComplete();
        }
    }, 1000);
    
    showNotification(gameData.pomodoro.isBreak ? '🌴 休息开始！' : '🍅 番茄钟开始！专注工作！');
}

// 暂停番茄钟
function pausePomodoro() {
    gameData.pomodoro.isRunning = false;
    clearInterval(pomodoroTimer);
    pomodoroTimer = null;
    updatePomodoroButton();
    saveData();
    showNotification('⏸️ 番茄钟已暂停');
}

// 重置番茄钟
function resetPomodoro() {
    gameData.pomodoro.isRunning = false;
    gameData.pomodoro.isBreak = false;
    gameData.pomodoro.remainingTime = gameData.pomodoro.workTime * 60;
    clearInterval(pomodoroTimer);
    pomodoroTimer = null;
    updatePomodoroDisplay();
    updatePomodoroButton();
    saveData();
}

// 番茄钟完成
function pomodoroComplete() {
    clearInterval(pomodoroTimer);
    pomodoroTimer = null;
    gameData.pomodoro.isRunning = false;
    
    if (gameData.pomodoro.isBreak) {
        // 休息结束，开始新的工作
        gameData.pomodoro.isBreak = false;
        gameData.pomodoro.remainingTime = gameData.pomodoro.workTime * 60;
        showNotification('☕ 休息结束！准备开始新的番茄吧！');
        sendDesktopNotification('休息结束', '准备开始新的番茄钟吧！');
    } else {
        // 工作结束，奖励并开始休息
        gameData.pomodoro.sessions++;
        gameData.pomodoro.isBreak = true;
        
        // 每4个番茄一个长休息
        const breakTime = gameData.pomodoro.sessions % 4 === 0 
            ? gameData.pomodoro.longBreakTime 
            : gameData.pomodoro.breakTime;
        gameData.pomodoro.remainingTime = breakTime * 60;
        
        // 奖励食物
        gameData.food += 2;
        updateFoodDisplay();
        
        showNotification(`🎉 完成一个番茄！获得2个食物！已完成${gameData.pomodoro.sessions}个番茄`);
        sendDesktopNotification('番茄钟完成！', `太棒了！完成第${gameData.pomodoro.sessions}个番茄，休息一下吧！`);
        
        if (gameData.pet.selected) {
            speakPetMessage('主人好厉害！休息一下吧~');
        }
    }
    
    updatePomodoroDisplay();
    updatePomodoroButton();
    saveData();
}

// 更新番茄钟显示
function updatePomodoroDisplay() {
    const display = document.getElementById('pomodoro-time');
    if (!display) return;
    
    const minutes = Math.floor(gameData.pomodoro.remainingTime / 60);
    const seconds = gameData.pomodoro.remainingTime % 60;
    display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // 更新状态标签
    const statusEl = document.getElementById('pomodoro-status');
    if (statusEl) {
        statusEl.textContent = gameData.pomodoro.isBreak ? '休息中' : '专注中';
        statusEl.className = 'pomodoro-status ' + (gameData.pomodoro.isBreak ? 'break' : 'work');
    }
    
    // 更新完成数
    const countEl = document.getElementById('pomodoro-count');
    if (countEl) {
        countEl.textContent = gameData.pomodoro.sessions;
    }
}

// 更新番茄钟按钮
function updatePomodoroButton() {
    const btn = document.getElementById('pomodoro-toggle-btn');
    if (btn) {
        btn.textContent = gameData.pomodoro.isRunning ? '⏸️ 暂停' : '▶️ 开始';
    }
}

// ==================== 提醒系统 ====================

// 初始化提醒
function initReminders() {
    // 喝水提醒
    if (gameData.reminders.drinkWater.enabled) {
        reminderTimers.drinkWater = setInterval(() => {
            showReminder('💧', '该喝水啦！', '保持水分摄入，身体更健康！');
        }, gameData.reminders.drinkWater.interval * 60 * 1000);
    }
    
    // 休息提醒
    if (gameData.reminders.rest.enabled) {
        reminderTimers.rest = setInterval(() => {
            showReminder('👀', '该休息眼睛啦！', '看看远处，让眼睛放松一下~');
        }, gameData.reminders.rest.interval * 60 * 1000);
    }
    
    // 伸展提醒
    if (gameData.reminders.stretch.enabled) {
        reminderTimers.stretch = setInterval(() => {
            showReminder('🧘', '该活动一下啦！', '站起来伸展一下，活动筋骨！');
        }, gameData.reminders.stretch.interval * 60 * 1000);
    }
    
    // 宠物饥饿检测
    if (gameData.reminders.petHunger.enabled) {
        reminderTimers.petHunger = setInterval(() => {
            checkPetHunger();
        }, 5 * 60 * 1000); // 每5分钟检查一次
    }
}

// 显示提醒
function showReminder(emoji, title, message) {
    showNotification(`${emoji} ${title} - ${message}`);
    sendDesktopNotification(title, message);
    
    if (gameData.pet.selected) {
        speakPetMessage(`${emoji} ${title}`);
    }
}

// 检查宠物饥饿
function checkPetHunger() {
    if (!gameData.pet.selected) return;
    
    updateHunger();
    
    if (gameData.pet.hunger < 30 && gameData.reminders.petHunger.enabled) {
        sendDesktopNotification(
            `${gameData.pet.name}饿了！`,
            `宠物饥饿度只有${gameData.pet.hunger}%了，快去喂食吧！`
        );
        showNotification(`🐾 ${gameData.pet.name}饿了！饥饿度：${gameData.pet.hunger}%`);
    }
}

// 发送桌面通知
function sendDesktopNotification(title, body) {
    if (!('Notification' in window)) return;
    
    if (Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: '🍅',
            tag: 'status-panel-notification'
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(title, { body: body });
            }
        });
    }
}

// 切换提醒
function toggleReminder(type) {
    if (gameData.reminders[type]) {
        gameData.reminders[type].enabled = !gameData.reminders[type].enabled;
        
        // 清除或重启计时器
        if (reminderTimers[type]) {
            clearInterval(reminderTimers[type]);
            reminderTimers[type] = null;
        }
        
        if (gameData.reminders[type].enabled) {
            initReminders();
        }
        
        updateReminderUI();
        saveData();
    }
}

// 更新提醒UI
function updateReminderUI() {
    const types = ['drinkWater', 'rest', 'stretch', 'petHunger'];
    types.forEach(type => {
        const toggle = document.getElementById(`reminder-${type}`);
        if (toggle) {
            toggle.checked = gameData.reminders[type]?.enabled || false;
        }
    });
}

// 设置提醒间隔
function setReminderInterval(type, minutes) {
    if (gameData.reminders[type]) {
        gameData.reminders[type].interval = parseInt(minutes);
        
        // 重启计时器
        if (reminderTimers[type]) {
            clearInterval(reminderTimers[type]);
        }
        initReminders();
        saveData();
    }
}

// ==================== 多宠物系统 ====================

// 添加宠物到收集
function addPetToCollection(type) {
    const newPet = {
        id: Date.now(),
        type: type,
        name: getPetDefaultName(type),
        level: 1,
        exp: 0,
        maxExp: 100,
        hunger: 100,
        lastFeedTime: Date.now(),
        isActive: false
    };
    
    gameData.pets.push(newPet);
    saveData();
    updatePetCollectionUI();
    showNotification(`🎉 获得了新宠物：${newPet.name}！`);
}

// 切换活跃宠物
function switchActivePet(petId) {
    const pet = gameData.pets.find(p => p.id === petId);
    if (!pet) return;
    
    // 保存当前宠物状态到集合
    if (gameData.pet.selected) {
        const currentPetIndex = gameData.pets.findIndex(p => p.isActive);
        if (currentPetIndex >= 0) {
            gameData.pets[currentPetIndex] = {
                ...gameData.pets[currentPetIndex],
                level: gameData.pet.level,
                exp: gameData.pet.exp,
                maxExp: gameData.pet.maxExp,
                hunger: gameData.pet.hunger,
                lastFeedTime: gameData.pet.lastFeedTime,
                name: gameData.pet.name,
                isActive: false
            };
        }
    }
    
    // 设置新活跃宠物
    pet.isActive = true;
    gameData.pet = {
        selected: true,
        type: pet.type,
        name: pet.name,
        level: pet.level,
        exp: pet.exp,
        maxExp: pet.maxExp,
        hunger: pet.hunger,
        lastFeedTime: pet.lastFeedTime
    };
    
    updatePetDisplay();
    updatePetCollectionUI();
    saveData();
    showNotification(`切换到宠物：${pet.name}！`);
}

// 更新宠物收集UI
function updatePetCollectionUI() {
    const container = document.getElementById('pet-collection');
    if (!container) return;
    
    container.innerHTML = gameData.pets.map(pet => {
        const emoji = getPetEmoji(pet.type, pet.level);
        return `
            <div class="pet-collection-item ${pet.isActive ? 'active' : ''}" 
                 onclick="switchActivePet(${pet.id})">
                <div class="pet-collection-emoji">${emoji}</div>
                <div class="pet-collection-name">${pet.name}</div>
                <div class="pet-collection-level">Lv.${pet.level}</div>
            </div>
        `;
    }).join('');
}

// ==================== 首页渲染函数 ====================

// 渲染首页属性栏
function renderHomeStats() {
    const container = document.getElementById('home-stats-container');
    if (!container) return;
    
    if (gameData.stats.length === 0) {
        container.innerHTML = '<div class="empty-mini">暂无属性</div>';
        return;
    }
    
    // 只显示前4个属性
    const displayStats = gameData.stats.slice(0, 4);
    container.innerHTML = displayStats.map(stat => `
        <div class="mini-stat-item">
            <div class="mini-stat-header">
                <span class="mini-stat-name">${stat.name}</span>
                <span class="mini-stat-value">${stat.current}/${stat.max}</span>
            </div>
            <div class="mini-progress-bar">
                <div class="mini-progress-fill ${stat.color}" style="width: ${(stat.current / stat.max) * 100}%"></div>
            </div>
        </div>
    `).join('');
}

// 渲染首页背包快捷栏
function renderHomeBackpack() {
    const container = document.getElementById('home-backpack-items');
    if (!container) return;
    
    if (gameData.backpack.length === 0) {
        // 显示空槽位
        let emptySlots = '';
        for (let i = 0; i < 6; i++) {
            emptySlots += `
                <div class="quick-item empty" onclick="switchToTab('backpack')">
                    <span class="quick-item-icon">➕</span>
                </div>
            `;
        }
        container.innerHTML = emptySlots;
        return;
    }
    
    // 显示前6个物品
    const displayItems = gameData.backpack.slice(0, 6);
    let html = displayItems.map(item => {
        const effectText = item.effectStat ? `效果: ${getStatName(item.effectStat)} +${item.effectValue}` : '无使用效果';
        const description = item.description || '暂无描述';
        const canUse = item.effectStat ? 'usable' : '';
        
        return `
            <div class="quick-item ${canUse}" 
                 onclick="showHomeUseItemModal(${item.id})" 
                 data-item-id="${item.id}"
                 data-tooltip="${item.name}&#10;${effectText}&#10;${description}">
                <span class="quick-item-icon">${getItemEmoji(item.name)}</span>
                <span class="quick-item-name">${item.name}</span>
                <span class="quick-item-count">×${item.quantity}</span>
                <div class="quick-item-tooltip">
                    <div class="tooltip-title">${item.name}</div>
                    <div class="tooltip-effect">${effectText}</div>
                    <div class="tooltip-desc">${description}</div>
                    ${item.effectStat ? '<div class="tooltip-hint">点击使用</div>' : '<div class="tooltip-hint">点击查看详情</div>'}
                </div>
            </div>
        `;
    }).join('');
    
    // 填充空槽位
    for (let i = displayItems.length; i < 6; i++) {
        html += `
            <div class="quick-item empty" onclick="switchToTab('backpack')">
                <span class="quick-item-icon">➕</span>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// 显示首页使用物品确认弹窗
function showHomeUseItemModal(itemId) {
    const item = gameData.backpack.find(i => i.id === itemId);
    if (!item) return;
    
    // 如果物品没有效果，跳转到背包页面
    if (!item.effectStat) {
        switchToTab('backpack');
        return;
    }
    
    const stat = gameData.stats.find(s => s.id === parseInt(item.effectStat));
    const statName = stat ? stat.name : '未知属性';
    const currentValue = stat ? stat.current : 0;
    const maxValue = stat ? stat.max : 100;
    const newValue = stat ? Math.min(stat.max, stat.current + item.effectValue) : item.effectValue;
    
    const modal = document.getElementById('home-use-item-modal');
    const content = document.getElementById('home-use-item-content');
    
    content.innerHTML = `
        <div class="use-item-preview">
            <div class="use-item-icon">${getItemEmoji(item.name)}</div>
            <div class="use-item-info">
                <div class="use-item-name">${item.name}</div>
                <div class="use-item-quantity">剩余: ${item.quantity}个</div>
            </div>
        </div>
        <div class="use-item-effect">
            <div class="effect-label">使用效果</div>
            <div class="effect-detail">
                <span class="effect-stat-name">${statName}</span>
                <span class="effect-change">+${item.effectValue}</span>
            </div>
            <div class="effect-preview">
                <span class="current-value">${currentValue}</span>
                <span class="arrow">→</span>
                <span class="new-value">${newValue}</span>
                <span class="max-value">/ ${maxValue}</span>
            </div>
        </div>
        <div class="use-item-desc">${item.description || '暂无描述'}</div>
        <div class="use-item-actions">
            <button class="cyber-btn confirm" onclick="confirmUseItemFromHome(${itemId})">✓ 确认使用</button>
            <button class="cyber-btn cancel" onclick="closeModal('home-use-item-modal')">✗ 取消</button>
        </div>
    `;
    
    modal.classList.add('active');
}

// 从首页确认使用物品
function confirmUseItemFromHome(itemId) {
    useItem('backpack', itemId);
    closeModal('home-use-item-modal');
    
    // 更新首页所有相关显示
    renderHomeStats();
    renderHomeBackpack();
}

// 获取物品表情符号
function getItemEmoji(itemName) {
    const emojiMap = {
        '药水': '🧪',
        '治疗': '💊',
        '能量': '⚡',
        '武器': '⚔️',
        '盾牌': '🛡️',
        '食物': '🍖',
        '金币': '💰',
        '宝石': '💎',
        '钥匙': '🔑',
        '书': '📖',
        '卷轴': '📜',
        '魔法': '✨'
    };
    
    for (const [key, emoji] of Object.entries(emojiMap)) {
        if (itemName.includes(key)) return emoji;
    }
    return '📦';
}

// 渲染首页技能列表
function renderHomeSkills() {
    const container = document.getElementById('home-skills-list');
    const levelEl = document.getElementById('home-skill-level');
    const expFill = document.getElementById('home-skill-exp-fill');
    
    if (levelEl) levelEl.textContent = gameData.skillLevel || 0;
    if (expFill) {
        const expPercent = (gameData.skillExp / gameData.skillMaxExp) * 100;
        expFill.style.width = expPercent + '%';
    }
    
    if (!container) return;
    
    // 确保equippedSkills存在
    if (!gameData.equippedSkills) {
        gameData.equippedSkills = [];
    }
    
    let html = '';
    
    // 渲染6个槽位
    for (let i = 0; i < 6; i++) {
        const skillId = gameData.equippedSkills[i];
        
        if (skillId) {
            // 查找装备的技能
            const skill = findSkillById(skillId);
            
            if (skill) {
                // 构建效果文本
                let effectText = '';
                let effects = [];
                if (skill.costStat) {
                    const costStatName = gameData.stats.find(s => s.id == skill.costStat)?.name || '未知';
                    effects.push(`消耗: ${costStatName} -${skill.costValue}`);
                }
                if (skill.gainStat) {
                    const gainStatName = gameData.stats.find(s => s.id == skill.gainStat)?.name || '未知';
                    effects.push(`获得: ${gainStatName} +${skill.gainValue}`);
                }
                effectText = effects.length > 0 ? effects.join('\n') : '无效果';
                
                // 检查是否可以使用
                const canUse = skill.costStat || skill.gainStat;
                const hasEnough = !skill.costStat || (gameData.stats.find(s => s.id == skill.costStat)?.current >= skill.costValue);
                const usableClass = canUse ? 'usable' : '';
                const disabledClass = !hasEnough ? 'disabled' : '';
                
                html += `
                    <div class="home-skill-item ${usableClass} ${disabledClass}" 
                         onclick="showHomeUseSkillModal(${skill.id})" 
                         oncontextmenu="unequipSkillFromSlot(${i}); return false;"
                         data-skill-id="${skill.id}">
                        <span>${skill.icon || '⭐'}</span>
                        <div class="home-skill-tooltip">
                            <div class="tooltip-title">${skill.name}</div>
                            <div class="tooltip-effect">${effectText}</div>
                            ${skill.description ? `<div class="tooltip-desc">${skill.description}</div>` : ''}
                            ${canUse ? `<div class="tooltip-hint">${hasEnough ? '左键使用 | 右键卸载' : '资源不足 | 右键卸载'}</div>` : '<div class="tooltip-hint">左键查看 | 右键卸载</div>'}
                        </div>
                    </div>
                `;
            } else {
                // 技能不存在，清理槽位
                gameData.equippedSkills[i] = null;
                html += `
                    <div class="home-skill-item empty" onclick="showEquipSkillModal(${i})">
                        <span>➕</span>
                        <div class="home-skill-tooltip">
                            <div class="tooltip-hint">点击装备技能</div>
                        </div>
                    </div>
                `;
            }
        } else {
            // 空槽位
            html += `
                <div class="home-skill-item empty" onclick="showEquipSkillModal(${i})">
                    <span>➕</span>
                    <div class="home-skill-tooltip">
                        <div class="tooltip-hint">点击装备技能</div>
                    </div>
                </div>
            `;
        }
    }
    
    container.innerHTML = html;
}

// 显示首页使用技能确认弹窗
function showHomeUseSkillModal(skillId) {
    const skill = findSkillById(skillId);
    if (!skill) return;
    
    // 如果技能没有效果，跳转到技能页面
    if (!skill.costStat && !skill.gainStat) {
        switchToTab('skills');
        return;
    }
    
    // 检查是否有足够的资源
    let canUse = true;
    let costStat = null;
    let costCurrent = 0;
    let costMax = 100;
    let costAfter = 0;
    
    if (skill.costStat) {
        costStat = gameData.stats.find(s => s.id == skill.costStat);
        if (!costStat || costStat.current < skill.costValue) {
            canUse = false;
        }
        if (costStat) {
            costCurrent = costStat.current;
            costMax = costStat.max;
            costAfter = Math.max(0, costCurrent - skill.costValue);
        }
    }
    
    let gainStat = null;
    let gainCurrent = 0;
    let gainMax = 100;
    let gainAfter = 0;
    
    if (skill.gainStat) {
        gainStat = gameData.stats.find(s => s.id == skill.gainStat);
        if (gainStat) {
            gainCurrent = gainStat.current;
            gainMax = gainStat.max;
            gainAfter = Math.min(gainMax, gainCurrent + skill.gainValue);
        }
    }
    
    const modal = document.getElementById('home-use-skill-modal');
    const content = document.getElementById('home-use-skill-content');
    
    let effectsHtml = '';
    if (skill.costStat && costStat) {
        effectsHtml += `
            <div class="use-skill-effect cost">
                <div class="effect-label">消耗</div>
                <div class="effect-detail">
                    <span class="effect-stat-name">${costStat.name}</span>
                    <span class="effect-change">-${skill.costValue}</span>
                </div>
                <div class="effect-preview">
                    <span class="current-value">${costCurrent}</span>
                    <span class="arrow">→</span>
                    <span class="new-value ${canUse ? '' : 'error'}">${costAfter}</span>
                    <span class="max-value">/ ${costMax}</span>
                </div>
            </div>
        `;
    }
    
    if (skill.gainStat && gainStat) {
        effectsHtml += `
            <div class="use-skill-effect gain">
                <div class="effect-label">获得</div>
                <div class="effect-detail">
                    <span class="effect-stat-name">${gainStat.name}</span>
                    <span class="effect-change">+${skill.gainValue}</span>
                </div>
                <div class="effect-preview">
                    <span class="current-value">${gainCurrent}</span>
                    <span class="arrow">→</span>
                    <span class="new-value">${gainAfter}</span>
                    <span class="max-value">/ ${gainMax}</span>
                </div>
            </div>
        `;
    }
    
    content.innerHTML = `
        <div class="use-skill-preview">
            <div class="use-skill-icon">${skill.icon || '⭐'}</div>
            <div class="use-skill-info">
                <div class="use-skill-name">${skill.name}</div>
            </div>
        </div>
        ${effectsHtml}
        ${skill.description ? `<div class="use-skill-desc">${skill.description}</div>` : ''}
        <div class="use-skill-actions">
            <button class="cyber-btn confirm" onclick="confirmUseSkillFromHome(${skill.id})" ${canUse ? '' : 'disabled'}>✓ 确认使用</button>
            <button class="cyber-btn cancel" onclick="closeModal('home-use-skill-modal')">✗ 取消</button>
        </div>
    `;
    
    modal.classList.add('active');
}

// 从首页确认使用技能
function confirmUseSkillFromHome(skillId) {
    useSkill(skillId);
    closeModal('home-use-skill-modal');
    
    // 更新首页所有相关显示
    renderHomeStats();
    renderHomeSkills();
}

// 显示装备技能选择弹窗
function showEquipSkillModal(slotIndex) {
    if (!gameData.skills || gameData.skills.length === 0) {
        showNotification('还没有技能，请先创建技能', 'error');
        switchToTab('skills');
        return;
    }
    
    const modal = document.getElementById('equip-skill-modal');
    const content = document.getElementById('equip-skill-list');
    
    // 获取所有技能（包括子技能）
    const allSkills = getAllSkills();
    
    // 过滤掉已装备的技能
    const availableSkills = allSkills.filter(skill => 
        !gameData.equippedSkills.includes(skill.id)
    );
    
    if (availableSkills.length === 0) {
        showNotification('所有技能都已装备', 'error');
        return;
    }
    
    let html = availableSkills.map(skill => {
        let effectText = '';
        let effects = [];
        if (skill.costStat) {
            const costStatName = gameData.stats.find(s => s.id == skill.costStat)?.name || '未知';
            effects.push(`<span class="cost">-${skill.costValue} ${costStatName}</span>`);
        }
        if (skill.gainStat) {
            const gainStatName = gameData.stats.find(s => s.id == skill.gainStat)?.name || '未知';
            effects.push(`<span class="gain">+${skill.gainValue} ${gainStatName}</span>`);
        }
        effectText = effects.length > 0 ? effects.join(' ') : '<span class="no-effect">无效果</span>';
        
        return `
            <div class="equip-skill-option" onclick="equipSkillToSlot(${slotIndex}, ${skill.id})">
                <div class="equip-skill-icon">${skill.icon || '⭐'}</div>
                <div class="equip-skill-info">
                    <div class="equip-skill-name">${skill.name}</div>
                    <div class="equip-skill-effects">${effectText}</div>
                    ${skill.description ? `<div class="equip-skill-desc">${skill.description}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    content.innerHTML = html;
    modal.classList.add('active');
}

// 装备技能到指定槽位
function equipSkillToSlot(slotIndex, skillId) {
    if (!gameData.equippedSkills) {
        gameData.equippedSkills = [];
    }
    
    gameData.equippedSkills[slotIndex] = skillId;
    saveData();
    renderHomeSkills();
    closeModal('equip-skill-modal');
    showNotification('技能已装备');
}

// 从槽位卸载技能
function unequipSkillFromSlot(slotIndex) {
    if (gameData.equippedSkills && gameData.equippedSkills[slotIndex]) {
        const skill = findSkillById(gameData.equippedSkills[slotIndex]);
        gameData.equippedSkills[slotIndex] = null;
        saveData();
        renderHomeSkills();
        showNotification(`已卸载技能: ${skill?.name || '未知'}`);
    }
}

// 获取所有技能（包括子技能）
function getAllSkills(skills = gameData.skills, result = []) {
    for (const skill of skills) {
        result.push(skill);
        if (skill.children && skill.children.length > 0) {
            getAllSkills(skill.children, result);
        }
    }
    return result;
}

// 装备技能（从技能页面）
function toggleEquipSkill(skillId) {
    if (!gameData.equippedSkills) {
        gameData.equippedSkills = [];
    }
    
    const equippedIndex = gameData.equippedSkills.indexOf(skillId);
    
    if (equippedIndex !== -1) {
        // 已装备，卸载
        gameData.equippedSkills[equippedIndex] = null;
        showNotification('技能已卸载');
    } else {
        // 未装备，找一个空槽位
        let emptySlot = -1;
        for (let i = 0; i < 6; i++) {
            if (!gameData.equippedSkills[i]) {
                emptySlot = i;
                break;
            }
        }
        
        if (emptySlot !== -1) {
            gameData.equippedSkills[emptySlot] = skillId;
            showNotification('技能已装备到首页');
        } else {
            showNotification('装备槽已满，请先卸载其他技能', 'error');
            return;
        }
    }
    
    saveData();
    renderSkills();
    renderHomeSkills();
}

// 更新头部货币显示
function updateHeaderCurrency() {
    const goldEl = document.getElementById('header-gold');
    const foodEl = document.getElementById('header-food');
    
    if (goldEl) goldEl.textContent = gameData.gold || 0;
    if (foodEl) foodEl.textContent = gameData.food || 0;
}

// 更新首页地图上的宠物显示
function updateHomeMapPet() {
    const petDisplay = document.getElementById('map-pet-display');
    if (petDisplay) {
        if (gameData.pet.selected) {
            petDisplay.style.display = 'block';
            const petSprite = document.getElementById('pet-sprite-emoji');
            if (petSprite) {
                petSprite.textContent = getPetEmoji(gameData.pet.type, gameData.pet.level);
            }
            // 更新宠物心情
            const moodEl = document.getElementById('pet-mood');
            if (moodEl) {
                const hunger = gameData.pet.hunger || 100;
                if (hunger > 70) moodEl.textContent = '💕';
                else if (hunger > 40) moodEl.textContent = '😊';
                else if (hunger > 20) moodEl.textContent = '😐';
                else moodEl.textContent = '😢';
            }
        } else {
            petDisplay.style.display = 'none';
        }
    }
}

// ==================== 像素角色系统 ====================

// 角色外观配置
const characterConfig = {
    skins: [
        { id: 'fair', color: '#FFDAB9', name: '白皙' },
        { id: 'light', color: '#F5DEB3', name: '浅肤' },
        { id: 'medium', color: '#DEB887', name: '小麦' },
        { id: 'tan', color: '#D2691E', name: '棕褐' },
        { id: 'dark', color: '#8B4513', name: '深棕' }
    ],
    hairs: [
        { id: 'default', icon: '💇', color: '#4a3728', style: 'normal' },
        { id: 'blonde', icon: '👱', color: '#FFD700', style: 'normal' },
        { id: 'red', icon: '🧑‍🦰', color: '#B22222', style: 'normal' },
        { id: 'blue', icon: '💙', color: '#4169E1', style: 'normal' },
        { id: 'pink', icon: '💗', color: '#FF69B4', style: 'normal' },
        { id: 'purple', icon: '💜', color: '#9932CC', style: 'normal' },
        { id: 'green', icon: '💚', color: '#32CD32', style: 'normal' },
        { id: 'white', icon: '🤍', color: '#F5F5F5', style: 'normal' }
    ],
    eyes: [
        { id: 'default', icon: '👀', color: '#333' },
        { id: 'blue', icon: '🔵', color: '#4169E1' },
        { id: 'green', icon: '🟢', color: '#228B22' },
        { id: 'brown', icon: '🟤', color: '#8B4513' },
        { id: 'purple', icon: '🟣', color: '#9932CC' }
    ],
    outfits: [
        { id: 'casual', icon: '👕', color: '#4FC3F7', name: '休闲装' },
        { id: 'warrior', icon: '⚔️', color: '#CD853F', name: '战士装' },
        { id: 'mage', icon: '🧙', color: '#9370DB', name: '法师袍' },
        { id: 'ninja', icon: '🥷', color: '#2F4F4F', name: '忍者服' },
        { id: 'royal', icon: '👑', color: '#FFD700', name: '皇家装' },
        { id: 'sporty', icon: '🏃', color: '#FF6347', name: '运动装' },
        { id: 'sailor', icon: '⚓', color: '#000080', name: '水手服' },
        { id: 'forest', icon: '🌲', color: '#228B22', name: '森林装' }
    ],
    accessories: [
        { id: 'none', icon: '❌', emoji: '' },
        { id: 'crown', icon: '👑', emoji: '👑' },
        { id: 'bow', icon: '🎀', emoji: '🎀' },
        { id: 'hat', icon: '🎩', emoji: '🎩' },
        { id: 'cap', icon: '🧢', emoji: '🧢' },
        { id: 'flower', icon: '🌸', emoji: '🌸' },
        { id: 'star', icon: '⭐', emoji: '⭐' },
        { id: 'heart', icon: '❤️', emoji: '❤️' },
        { id: 'glasses', icon: '👓', emoji: '👓' },
        { id: 'wizard', icon: '🧙‍♂️', emoji: '🎭' }
    ]
};

// 临时预览数据
let previewCharacter = {};

// 初始化角色显示
function initCharacter() {
    // 确保角色数据存在
    if (!gameData.character) {
        gameData.character = {
            name: '冒险者',
            skinColor: '#FFDAB9',
            hairStyle: 'default',
            hairColor: '#4a3728',
            eyeStyle: 'default',
            outfitStyle: 'casual',
            outfitColor: '#4FC3F7',
            accessory: ''
        };
    }
    updateCharacterDisplay();
    updateCharacterNameTag();
    
    // 更新首页角色属性面板中的名称
    const avatarName = document.querySelector('.avatar-name');
    if (avatarName && gameData.character) {
        avatarName.textContent = gameData.character.name;
    }
    
    // 更新首页角色等级（使用技能等级）
    const avatarLevel = document.querySelector('.avatar-level');
    if (avatarLevel) {
        avatarLevel.textContent = `Lv.${gameData.skillLevel || 1}`;
    }
}

// 更新角色显示
function updateCharacterDisplay() {
    const char = gameData.character;
    
    // 更新主角色
    const head = document.getElementById('char-head');
    const hair = document.getElementById('char-hair');
    const body = document.getElementById('char-body');
    const accessory = document.getElementById('char-accessory');
    
    if (head) head.style.background = char.skinColor;
    if (hair) hair.style.background = char.hairColor;
    if (body) body.style.background = `linear-gradient(180deg, ${char.outfitColor} 0%, ${adjustColor(char.outfitColor, -20)} 100%)`;
    if (accessory) accessory.textContent = char.accessory;
}

// 更新角色名字标签
function updateCharacterNameTag() {
    const nameTag = document.getElementById('character-name-tag');
    if (nameTag && gameData.character) {
        nameTag.textContent = gameData.character.name || '冒险者';
    }
}

// 显示换装弹窗
function showDressUpModal() {
    // 复制当前角色数据到预览
    previewCharacter = { ...gameData.character };
    
    // 初始化选项
    initDressUpOptions();
    updatePreviewCharacter();
    
    // 设置名称输入框
    const nameInput = document.getElementById('character-name-input');
    if (nameInput) {
        nameInput.value = gameData.character.name || '冒险者';
    }
    
    document.getElementById('dress-up-modal').style.display = 'flex';
}

// 初始化换装选项
function initDressUpOptions() {
    // 肤色选项
    const skinContainer = document.getElementById('skin-options');
    if (skinContainer) {
        skinContainer.innerHTML = characterConfig.skins.map(skin => `
            <div class="dress-item ${previewCharacter.skinColor === skin.color ? 'selected' : ''}" 
                 onclick="selectSkin('${skin.color}')" title="${skin.name}">
                <div class="color-swatch" style="background: ${skin.color}"></div>
            </div>
        `).join('');
    }
    
    // 发型选项
    const hairContainer = document.getElementById('hair-options');
    if (hairContainer) {
        hairContainer.innerHTML = characterConfig.hairs.map(hair => `
            <div class="dress-item ${previewCharacter.hairColor === hair.color ? 'selected' : ''}" 
                 onclick="selectHair('${hair.color}')" title="${hair.icon}">
                <div class="color-swatch" style="background: ${hair.color}"></div>
            </div>
        `).join('');
    }
    
    // 眼睛选项
    const eyesContainer = document.getElementById('eyes-options');
    if (eyesContainer) {
        eyesContainer.innerHTML = characterConfig.eyes.map(eye => `
            <div class="dress-item ${previewCharacter.eyeColor === eye.color ? 'selected' : ''}" 
                 onclick="selectEyes('${eye.color}')" title="${eye.icon}">
                <span class="item-icon">${eye.icon}</span>
            </div>
        `).join('');
    }
    
    // 服装选项
    const outfitContainer = document.getElementById('outfit-options');
    if (outfitContainer) {
        outfitContainer.innerHTML = characterConfig.outfits.map(outfit => `
            <div class="dress-item ${previewCharacter.outfitColor === outfit.color ? 'selected' : ''}" 
                 onclick="selectOutfit('${outfit.color}')" title="${outfit.name}">
                <span class="item-icon">${outfit.icon}</span>
            </div>
        `).join('');
    }
    
    // 配饰选项
    const accessoryContainer = document.getElementById('accessory-options');
    if (accessoryContainer) {
        accessoryContainer.innerHTML = characterConfig.accessories.map(acc => `
            <div class="dress-item ${previewCharacter.accessory === acc.emoji ? 'selected' : ''}" 
                 onclick="selectAccessory('${acc.emoji}')" title="${acc.icon}">
                <span class="item-icon">${acc.icon}</span>
            </div>
        `).join('');
    }
}

// 选择肤色
function selectSkin(color) {
    previewCharacter.skinColor = color;
    updatePreviewCharacter();
    initDressUpOptions();
}

// 选择发型
function selectHair(color) {
    previewCharacter.hairColor = color;
    updatePreviewCharacter();
    initDressUpOptions();
}

// 选择眼睛
function selectEyes(color) {
    previewCharacter.eyeColor = color;
    updatePreviewCharacter();
    initDressUpOptions();
}

// 选择服装
function selectOutfit(color) {
    previewCharacter.outfitColor = color;
    updatePreviewCharacter();
    initDressUpOptions();
}

// 选择配饰
function selectAccessory(emoji) {
    previewCharacter.accessory = emoji;
    updatePreviewCharacter();
    initDressUpOptions();
}

// 更新预览角色
function updatePreviewCharacter() {
    const head = document.getElementById('preview-head');
    const hair = document.getElementById('preview-hair');
    const body = document.getElementById('preview-body');
    const accessory = document.getElementById('preview-accessory');
    
    if (head) head.style.background = previewCharacter.skinColor;
    if (hair) hair.style.background = previewCharacter.hairColor;
    if (body) body.style.background = `linear-gradient(180deg, ${previewCharacter.outfitColor} 0%, ${adjustColor(previewCharacter.outfitColor, -20)} 100%)`;
    if (accessory) accessory.textContent = previewCharacter.accessory || '';
}

// 随机角色
function randomizeCharacter() {
    const randomFrom = arr => arr[Math.floor(Math.random() * arr.length)];
    
    previewCharacter.skinColor = randomFrom(characterConfig.skins).color;
    previewCharacter.hairColor = randomFrom(characterConfig.hairs).color;
    previewCharacter.eyeColor = randomFrom(characterConfig.eyes).color;
    previewCharacter.outfitColor = randomFrom(characterConfig.outfits).color;
    previewCharacter.accessory = randomFrom(characterConfig.accessories).emoji;
    
    updatePreviewCharacter();
    initDressUpOptions();
}

// 保存换装
function saveDressUp() {
    const nameInput = document.getElementById('character-name-input');
    if (nameInput && nameInput.value.trim()) {
        previewCharacter.name = nameInput.value.trim();
    }
    
    gameData.character = { ...previewCharacter };
    updateCharacterDisplay();
    updateCharacterNameTag();
    
    // 更新首页角色属性显示的名称
    const avatarName = document.querySelector('.avatar-name');
    if (avatarName) {
        avatarName.textContent = gameData.character.name;
    }
    
    saveData();
    closeModal('dress-up-modal');
    showNotification('💾 角色外观已保存！');
}

// 颜色调整辅助函数
function adjustColor(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

// 角色互动 - 打招呼
function characterWave() {
    const charEl = document.getElementById('pixel-character');
    if (charEl) {
        charEl.classList.remove('waving', 'dancing');
        void charEl.offsetWidth; // 触发重排
        charEl.classList.add('waving');
        
        showInteractionBubble('👋 你好呀！');
        
        setTimeout(() => {
            charEl.classList.remove('waving');
        }, 1500);
    }
}

// 角色互动 - 跳舞
function characterDance() {
    const charEl = document.getElementById('pixel-character');
    if (charEl) {
        charEl.classList.remove('waving', 'dancing');
        void charEl.offsetWidth;
        charEl.classList.add('dancing');
        
        const danceMessages = ['💃 跳舞真开心！', '🎵 音乐响起来~', '✨ 转圈圈~', '🌟 耶！'];
        showInteractionBubble(danceMessages[Math.floor(Math.random() * danceMessages.length)]);
        
        setTimeout(() => {
            charEl.classList.remove('dancing');
        }, 1800);
    }
}

// 和宠物互动
function interactWithPet() {
    if (!gameData.pet.selected) {
        showInteractionBubble('🐾 还没有宠物呢~');
        return;
    }
    
    const petMessages = [
        `💕 ${gameData.pet.name}真可爱！`,
        `🎾 和${gameData.pet.name}玩耍~`,
        `✨ ${gameData.pet.name}好开心！`,
        `🌟 摸摸${gameData.pet.name}的头~`
    ];
    
    showInteractionBubble(petMessages[Math.floor(Math.random() * petMessages.length)]);
    
    // 宠物反应
    const petEl = document.getElementById('map-pet-display');
    if (petEl) {
        petEl.style.animation = 'none';
        void petEl.offsetWidth;
        petEl.style.animation = 'pet-happy 0.5s ease-in-out 3';
        
        setTimeout(() => {
            petEl.style.animation = 'pet-follow 1.2s ease-in-out infinite';
        }, 1500);
    }
    
    // 增加少量经验
    if (gameData.pet.exp !== undefined) {
        gameData.pet.exp += 1;
        checkPetLevelUp();
        saveData();
    }
}

// 显示互动气泡
function showInteractionBubble(text) {
    const bubble = document.getElementById('interaction-bubble');
    const bubbleText = document.getElementById('bubble-text');
    
    if (bubble && bubbleText) {
        bubbleText.textContent = text;
        bubble.style.display = 'block';
        
        // 重置动画
        bubble.style.animation = 'none';
        void bubble.offsetWidth;
        bubble.style.animation = 'bubble-appear 0.3s ease-out';
        
        // 3秒后隐藏
        setTimeout(() => {
            bubble.style.display = 'none';
        }, 3000);
    }
}

// 点击角色显示菜单（可选）
function showCharacterMenu() {
    const messages = [
        '✨ 今天也要加油哦！',
        '🌟 想换个造型吗？',
        '💪 冒险等着我们！',
        '🎮 来挑战一下吧！',
        '📚 一起学习新技能~'
    ];
    showInteractionBubble(messages[Math.floor(Math.random() * messages.length)]);
}

// 在初始化时调用
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initPomodoro();
        initReminders();
        updateReminderUI();
        updatePetCollectionUI();
        initCharacter();
        updateHomeMapPet();
    }, 1000);
});

// 添加宠物开心动画
if (!document.getElementById('pet-happy-style')) {
    const petHappyStyle = document.createElement('style');
    petHappyStyle.id = 'pet-happy-style';
    petHappyStyle.textContent = `
        @keyframes pet-happy {
            0%, 100% { transform: translateY(0) scale(1); }
            25% { transform: translateY(-10px) scale(1.1); }
            50% { transform: translateY(0) scale(1); }
            75% { transform: translateY(-10px) scale(1.1); }
        }
    `;
    document.head.appendChild(petHappyStyle);
}
