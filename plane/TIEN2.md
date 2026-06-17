md_content = """# 霓虹風格個人作品集：詳細規劃與專案架構

這份文件詳細說明了從設計概念到程式碼結構的規劃，旨在打造一個高質感、互動性強的霓虹主題個人作品集。

---

## 一、 核心視覺與 UX 設計概念

為了強調「前端開發能力」與「霓虹主題」，網頁應具備：

### 1. 視覺系統

- **色調定義 (CSS Variables)：**
  - 背景底色：`#050505` (深邃黑)
  - 品牌霓虹色：`#FF00DE` (電光粉)、`#00F3FF` (電光藍)、`#ADFF00` (螢光綠)
- **動態特效：**
  - **呼吸發光 (Breathe Glow)：** 使用 `box-shadow` 與 `filter: drop-shadow` 營造燈管真實光暈。
  - **不規則閃爍 (Random Flicker)：** 利用 `@keyframes` 控制 `opacity` 的隨機跳動，模擬老舊霓虹燈管。

### 2. 使用者流程 (User Flow)

1.  **進入 (Hero)：** 透過 `Typed.js` 或 CSS 打字機效果引導進入核心概念。
2.  **探索 (Showcase)：** 捲動觸發進場動畫，展示霓虹製作工藝。
3.  **互動 (Action)：** 作品卡片懸停 (Hover) 觸發開燈效果。
4.  **轉換 (Purchase)：** 訂製表單 (Form) 提供客製化選擇，增強互動技術展示。

---

## 二、 網頁架構規劃 (One-Page Scroll)

### Section 1: Hero (首頁區)

- **視覺：** 背景光斑移動特效 (滑鼠追蹤技術)。
- **核心：** 動態標題 + CTA 按鈕 (「探索設計」、「立即訂製」)。

### Section 2: 關於我們 (The Neon Art)

- **內容：** 介紹霓虹製作技術與熱情。
- **互動：** 捲動到此處時，燈管從「熄滅狀態」動畫點亮。

### Section 3: 作品展示 (Portfolio Gallery)

- **呈現：** Grid 網格佈局。
- **互動：** 每個卡片具備 `onMouseEnter` 事件，觸發發光效果與顯示 Tech Stack。

### Section 4: 訂製與聯繫 (Shop & Form)

- **功能：** 提供選單 (字體、顏色、尺寸)。
- **技術展示：** 使用 `React Hook Form` 處理數據，並以 `EmailJS` 將訂單資料發送至信箱。

---

## 三、 建議專案資料夾結構

採用模組化思維，確保程式碼維護性與可讀性。

```text
my-neon-portfolio/
├── public/              # 靜態資源：Favicon、字體檔
├── src/
│   ├── assets/          # 全域資源
│   │   ├── styles/      # 核心 CSS 變數 (variables.css)、全域樣式
│   │   └── images/      # SVG 圖示、作品預覽圖
│   ├── components/      # 重複使用 UI 元件
│   │   ├── common/      # 導覽列、頁尾、按鈕
│   │   ├── layout/      # 分頁容器
│   │   └── neon/        # 核心霓虹元件：
│   │       ├── NeonText.jsx    # 閃爍文字元件
│   │       ├── NeonCard.jsx    # 互動式卡片
│   │       └── NeonSwitch.jsx  # 燈光開關互動
│   ├── hooks/           # 自定義 Logic
│   │   └── useGlow.js   # 封裝滑鼠光暈追蹤邏輯
│   ├── pages/           # 頁面主體
│   │   └── Home.jsx     # 整合各個 Section 的母頁
│   ├── context/         # 全域狀態
│   ├── utils/           # 輔助函式 (API 請求設定、EmailJS 配置)
│   ├── App.jsx          # 主入口與路由設定
│   └── main.jsx         # React DOM 渲染
├── .env                 # 存放 API Keys
├── vite.config.js       # Vite 配置
└── package.json








```
