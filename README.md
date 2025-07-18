# 🍽️ Food Lover – A Dynamic & Modular Restaurant Website

Food Lover is a dynamic restaurant website built with JavaScript and Webpack, featuring API-based content rendering and Telegram Bot integration.

---

## ⚙️ Installation

First, install all dependencies:

```bash
npm install
```
To run Webpack use the command:
```bash
npx webpack
```
Start the mock backend API using:
```bash
npx json-server db.json
```
This will serve the data from db.json at:
http://localhost:3000
Available endpoints:

/offers
/daytimes
/leftMenuData
/rightMenuData

Make sure to replace your Bot Token and Chat ID inside modules/forms.js:

```bash
const telegramTokenBot = 'YOUR_BOT_TOKEN';
const chatId = 'YOUR_CHAT_ID';
```







