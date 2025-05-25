// script.js

const storage = {
  getDifficulty: () => localStorage.getItem('difficulty') || 'medium',
  setDifficulty: (val) => localStorage.setItem('difficulty', val),
  getUsers: () => JSON.parse(localStorage.getItem('typingUsers') || '[]'),
  setUsers: (arr) => localStorage.setItem('typingUsers', JSON.stringify(arr)),
  getLeaderboard: () => JSON.parse(localStorage.getItem('typingLeaderboard') || '[]'),
  setLeaderboard: (arr) => localStorage.setItem('typingLeaderboard', JSON.stringify(arr))
};

const words = [
  'function','variable','object','array','string','element','random','program','javascript',
  'html','css','document','window','keyboard','input','score','timer','difficulty','leaderboard',
  'username','modal','restart','settings','type','speed','challenge','response','update','render',
  'event','listener','focus','blur','calculate','start','end','duration','animate','transition',
  'gradient','shadow','outline','border','padding','margin','font','icon','button','select','option',
  'loading','success','failure','increase','decrease','click','hover','scale','rotate','translate',
  'opacity','ease','linear','bounce','ping','pulse','spin','dropdown','panel','card','container',
  'layout','flex','grid','align','justify','center','space','between','wrap','no','overflow','auto',
  'scroll','before','after','pseudo','selector','class','attribute','value','property','merge','split',
  'slice','concat','filter','map','reduce','sort','reverse','push','pop','shift','unshift','index',
  'prototype','closure','callback','promise','async','await','stack','queue','tree','graph','algorithm'
];

const wordEl = document.getElementById('word');
const inputEl = document.getElementById('text-input');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const diffEl = document.getElementById('difficulty');
const settingsBtn = document.getElementById('settings-btn');
const reloadBtn = document.getElementById('reload-btn');
const settingsPanel = document.getElementById('difficulty-panel');
const leaderboardList = document.getElementById('leaderboard-list');
const modalEl = document.createElement('div');
const userEl = document.getElementById('setting-user');
const lastEl = document.getElementById('setting-last');
const highEl = document.getElementById('setting-high');

let score = 0, lastScore = 0, time = 0, timerId, gameOver = false;
let difficulty = storage.getDifficulty();
let currentUser = null;

function updateSettings() {
  userEl.innerText = currentUser || '-';
  lastEl.innerText = lastScore;
  const entry = storage.getLeaderboard().find(i => i.username === currentUser);
  highEl.innerText = entry ? entry.score : 0;
}

function createAuthModal() {
  modalEl.id = 'login-modal';
  modalEl.className = 'absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center';
  modalEl.innerHTML = `
    <div class="bg-white rounded p-6 w-80 shadow">
      <h2 class="text-xl mb-4 text-center">Speed Typer</h2>
      <div class="flex mb-4">
        <button id="btnLogin" class="flex-1 mr-2 p-2 bg-blue-500 text-white rounded">Login</button>
        <button id="btnRegister" class="flex-1 p-2 bg-green-500 text-white rounded">Register</button>
      </div>
      <div id="authForm"></div>
    </div>
  `;
  document.body.appendChild(modalEl);
  document.getElementById('btnLogin').onclick = () => showAuthForm('login');
  document.getElementById('btnRegister').onclick = () => showAuthForm('register');
  showAuthForm('login');
}

function showAuthForm(mode) {
  const btnText = mode === 'login' ? 'Login' : 'Register';
  document.getElementById('authForm').innerHTML = `
    <input id="authUser" placeholder="Username" class="w-full mb-3 p-2 border rounded" />
    <button id="submitAuth" class="w-full p-2 bg-${mode === 'login' ? 'blue' : 'green'}-500 text-white rounded">${btnText}</button>
  `;
  document.getElementById('submitAuth').onclick = mode === 'login' ? handleLogin : handleRegister;
  modalEl.classList.remove('hidden');
}

function handleLogin() {
  const name = document.getElementById('authUser').value.trim();
  if (!name) return alert('Enter username');
  const users = storage.getUsers();
  if (!users.includes(name)) return alert('User not found');
  currentUser = name;
  modalEl.classList.add('hidden');
  startGame();
}

function handleRegister() {
  const name = document.getElementById('authUser').value.trim();
  if (!name) return alert('Enter username');
  let users = storage.getUsers();
  if (users.includes(name)) return alert('Username taken');
  users.push(name);
  storage.setUsers(users);
  let board = storage.getLeaderboard();
  board.push({ username: name, score: 0, recents: [] });
  storage.setLeaderboard(board);
  currentUser = name;
  modalEl.classList.add('hidden');
  startGame();
}

function startGame() {
  resetGame();
  difficulty = storage.getDifficulty();
  diffEl.value = difficulty;
  loadSettings();
  showRandomWord();
  inputEl.value = '';
  inputEl.focus();

  clearInterval(timerId);
  timerId = setInterval(updateTimer, 1000);

  inputEl.oninput = handleInput;
  reloadBtn.onclick = () => window.location.reload();
  reloadBtn.style.display = 'none';     

  settingsBtn.onclick = () => {
    const isOpen = !settingsPanel.classList.contains('hidden');
    if (!isOpen) {
      settingsPanel.classList.remove('hidden');
      requestAnimationFrame(() => settingsPanel.style.top = '0');
    } else {
      settingsPanel.style.top = '-4rem';
      setTimeout(() => settingsPanel.classList.add('hidden'), 500);
    }
    updateSettings();
  };
  diffEl.onchange = changeDifficulty;
  renderLeaderboard();
  updateSettings();
}

function resetGame() {
  score = 0;
  scoreEl.innerText = score;
  gameOver = false;
}

function loadSettings() {
  time = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 6 : 4;
  updateTimer();
}

function changeDifficulty() {
  difficulty = diffEl.value;
  storage.setDifficulty(difficulty);
  clearInterval(timerId);
  loadSettings();
  showRandomWord();
  resetGame();
  timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (time > 0) {
    time--;
    timeEl.innerText = time + 's';
  } else {
    clearInterval(timerId);
    finishGame();
  }
}

function showRandomWord() {
  wordEl.innerText = words[Math.floor(Math.random() * words.length)];
}

function handleInput() {
  if (gameOver) return;
  if (inputEl.value.trim() === wordEl.innerText) {
    score++;
    scoreEl.innerText = score;
    inputEl.value = '';
    showRandomWord();
    time = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 5 : 3;
    updateTimer();
  }
}

function finishGame() {
  gameOver = true;
  lastScore = score;
  let board = storage.getLeaderboard();
  const idx = board.findIndex(e => e.username === currentUser);
  if (idx !== -1) {
    board[idx].recents.unshift(score);
    if (board[idx].recents.length > 5) board[idx].recents.pop();
    board[idx].score = Math.max(board[idx].score, score);
  } else {
    board.push({ username: currentUser, score, recents: [score] });
  }
  board = [...new Map(board.map(e => [e.username, e])).values()];
  board.sort((a, b) => b.score - a.score);
  storage.setLeaderboard(board);
  renderLeaderboard();
  updateSettings();
  alert(`Game over! ${currentUser}, your score: ${score}`);
  reloadBtn.style.display = 'inline-block';
}

function renderLeaderboard() {
  leaderboardList.innerHTML = '';
  storage.getLeaderboard().forEach((e, i) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between mb-1 text-gray-800';
    li.innerHTML = `<span>${i+1}. ${e.username}</span><span>${e.score}</span>`;
    leaderboardList.appendChild(li);
  });
}

createAuthModal();