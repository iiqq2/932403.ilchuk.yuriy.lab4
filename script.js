// Переключение языка страницы и CSS-переменных для варианта 17.
// Все цвета, шрифты и градиенты объявлены в style.css.
const languageButtons = document.querySelectorAll('[data-language]');
const themeVariables = ['primary', 'accent', 'surface', 'font-heading', 'focus-border'];
const translatedElements = document.querySelectorAll('[data-i18n]');
const translations = {
  ru: {},
  en: {
    description: 'Vocabulary progress: Yuriy Ilchuk’s page. Lab 4, JavaScript basics, variant 17.',
    pageTitle: 'About me — Yuriy Ilchuk | Lab 4',
    heading: 'About me — Yuriy Ilchuk',
    intro: 'Group 932403. Language enthusiast and translator.',
    about: 'This page is about translation, learning English and communicating across cultures.',
    avatarAlt: 'Illustrated avatar of a language enthusiast holding a book',
    navigationLabel: 'Page sections',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact me',
    switchLabel: 'Language and appearance',
    languageLabel: 'Language:',
    ruButtonLabel: 'Russian language and appearance',
    enButtonLabel: 'English language and appearance',
    translationSkill: 'Text translation:',
    translationSkillText: 'conveying the meaning, tone and cultural context of the original.',
    englishSkill: 'Learning English:',
    englishSkillText: 'building vocabulary and practising grammar and pronunciation.',
    communicationSkill: 'Intercultural communication:',
    communicationSkillText: 'respecting traditions and differences in communication.',
    editingSkill: 'Editing:',
    editingSkillText: 'checking translations for clarity, accuracy and natural phrasing.',
    podcastProject: 'Translating podcasts from Ruri Ohama’s YouTube channel.',
    translateProject: 'Improving and training AI translation in ',
    engcliProject: 'Data annotation for the EngCLI project’s model.',
    engcliTitle: 'About EngCLI',
    engcliDescription: 'EngCLI is a terminal application. It uses a local model to assess your English level. You provide a link to a YouTube video, and the application creates and saves Anki flashcards based on the video’s content — only those relevant to your English level.',
    learningTitle: 'The language I am learning',
    learningText: 'English. I am developing my listening comprehension, vocabulary and translation accuracy.',
    learningTools: 'I use videos, podcasts and Anki flashcards to learn English. Find out more in the ',
    engcliLink: 'EngCLI description',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    messagePlaceholder: 'Which project would you like to discuss?',
    submitLabel: 'Send',
    languagesTitle: 'Languages I am learning',
    languagesNote: 'The levels and additional languages are sample content for the layout, not verified information about the student.',
    englishFlag: 'Flag of the United Kingdom',
    spanishFlag: 'Flag of Spain',
    frenchFlag: 'Flag of France',
    englishName: 'English',
    spanishName: 'Spanish',
    frenchName: 'French',
    levelLabel: 'Level:',
    englishCardText: 'Podcasts, translation and new expressions from videos.',
    spanishCardText: 'First greetings and everyday phrases.',
    frenchCardText: 'Getting started with pronunciation and simple conversations.',
    goToPhrase: 'See the phrase of the week',
    phrasesTitle: 'Phrase of the week',
    phrasesNote: 'Three short phrases: the original, translation, transcription and pronunciation.',
    englishPhraseTranslation: 'Thank you!',
    spanishPhraseTranslation: 'Hello!',
    frenchPhraseTranslation: 'Good morning!',
    audioEnglish: 'Listen to the English phrase',
    audioSpanish: 'Listen to the Spanish phrase',
    audioFrench: 'Listen to the French phrase',
    listen: 'Listen',
    dictionary: 'Dictionary',
    audioUnavailable: 'Speech playback is unavailable. Use the Dictionary link to hear the pronunciation.',
    progressTitle: 'Vocabulary progress',
    progressHelp: 'Enter the number of new words for 5–7 days, separated by commas, spaces or semicolons. The field contains sample data.',
    wordCountsLabel: 'New words per day',
    progressError: 'Enter 5 to 7 non-negative whole numbers. Use smaller values if the numbers are too large.',
    analyzeWords: 'Analyse progress',
    progressResults: 'Results',
    totalWords: 'Total words',
    maxWords: 'Maximum in one day',
    averageWords: 'Daily average',
    highDays: 'Days with > 50 words',
    lowDays: 'Days with ≤ 10 words',
    lowPercentage: 'Percentage of low-progress days',
    lowDaysList: 'Low-progress day numbers:'
  }
};

// Русские тексты берутся из HTML, чтобы не дублировать их в словаре.
translatedElements.forEach((element) => {
  const attribute = element.dataset.i18nAttr;
  translations.ru[element.dataset.i18n] = attribute
    ? element.getAttribute(attribute)
    : element.textContent;
});

function translatePage(language) {
  document.documentElement.lang = language;

  translatedElements.forEach((element) => {
    const text = translations[language][element.dataset.i18n];
    const attribute = element.dataset.i18nAttr;

    if (attribute) {
      element.setAttribute(attribute, text);
    } else {
      element.textContent = text;
    }

    if (element.hasAttribute('data-translation')) {
      element.lang = language;
    }
  });

  renderProgressResults();
}

function applyLanguageTheme(button) {
  translatePage(button.dataset.language);
  const palette = getComputedStyle(button);

  themeVariables.forEach((variable) => {
    const value = palette.getPropertyValue(`--theme-${variable}`).trim();
    document.documentElement.style.setProperty(`--${variable}`, value);
  });

  languageButtons.forEach((item) => {
    item.setAttribute('aria-pressed', String(item === button));
  });
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => applyLanguageTheme(button));
});

// Кнопки со значком аудио озвучивают оригинал, независимо от языка интерфейса.
const audioStatus = document.querySelector('#audio-status');

document.querySelectorAll('[data-audio]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      audioStatus.hidden = false;
      return;
    }

    const phrase = document.getElementById(button.dataset.audio);
    const utterance = new SpeechSynthesisUtterance(phrase.textContent);
    utterance.lang = phrase.lang;
    utterance.onerror = (event) => {
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        audioStatus.hidden = false;
      }
    };

    audioStatus.hidden = true;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  });
});

// Лабораторная №4: функции, условия и циклы для массива новых слов.
function findMaximum(numbers) {
  if (numbers.length === 0) return null;

  let maximum = numbers[0];
  for (const number of numbers) {
    if (number > maximum) maximum = number;
  }
  return maximum;
}

function filterHighProgress(numbers) {
  const filtered = [];
  for (const number of numbers) {
    if (number > 50) filtered.push(number);
  }
  return filtered;
}

function sumWords(numbers) {
  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  return sum;
}

function parseWordCounts(text) {
  const parts = text.trim().split(/[\s,;]+/).filter(Boolean);
  if (parts.length < 5 || parts.length > 7) return null;
  if (parts.some((part) => !/^\d+$/.test(part))) return null;

  const numbers = parts.map(Number);
  if (numbers.some((number) => !Number.isSafeInteger(number))) return null;
  if (!Number.isSafeInteger(sumWords(numbers))) return null;
  return numbers;
}

function analyzeWordCounts(numbers) {
  const lowDays = [];
  // Нумерация дней в отчёте начинается с 1, а индексов массива — с 0.
  for (let index = 0; index < numbers.length; index++) {
    if (numbers[index] <= 10) lowDays.push(index + 1);
  }

  const total = sumWords(numbers);
  return {
    total,
    maximum: findMaximum(numbers),
    highDays: filterHighProgress(numbers),
    lowDays,
    lowPercentage: lowDays.length / numbers.length * 100,
    average: total / numbers.length
  };
}

let lastProgress = null;
const progressForm = document.querySelector('#progress-form');
const wordCountsInput = document.querySelector('#word-counts');
const progressError = document.querySelector('#progress-error');
const progressResults = document.querySelector('#progress-results');

function renderProgressResults() {
  if (lastProgress === null) return;

  const language = document.documentElement.lang;
  const format = (number) => number.toLocaleString(language, { maximumFractionDigits: 2 });
  document.querySelector('#total-words').textContent = format(lastProgress.total);
  document.querySelector('#max-words').textContent = format(lastProgress.maximum);
  document.querySelector('#average-words').textContent = format(lastProgress.average);
  document.querySelector('#high-days').textContent = format(lastProgress.highDays.length);
  document.querySelector('#low-days').textContent = format(lastProgress.lowDays.length);
  document.querySelector('#low-percentage').textContent = `${format(lastProgress.lowPercentage)}%`;
  document.querySelector('#low-days-list').textContent = lastProgress.lowDays.length > 0
    ? lastProgress.lowDays.join(', ')
    : '—';
  progressResults.hidden = false;
}

progressForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const numbers = parseWordCounts(wordCountsInput.value);
  if (numbers === null) {
    lastProgress = null;
    progressResults.hidden = true;
    progressError.hidden = false;
    wordCountsInput.setAttribute('aria-invalid', 'true');
    wordCountsInput.focus();
    return;
  }

  progressError.hidden = true;
  wordCountsInput.removeAttribute('aria-invalid');
  const isRussian = document.documentElement.lang === 'ru';
  const enteredName = prompt(isRussian ? 'Как вас зовут?' : 'What is your name?');
  if (enteredName === null) return;
  const name = enteredName.trim() || (isRussian ? 'друг' : 'friend');
  alert(isRussian ? `Привет, ${name}!` : `Hello, ${name}!`);

  lastProgress = analyzeWordCounts(numbers);
  renderProgressResults();
  alert(isRussian
    ? `Всего выучено ${lastProgress.total} слов, в ${lastProgress.highDays.length} днях прогресс был высоким.`
    : `You learned ${lastProgress.total} words in total; progress was high on ${lastProgress.highDays.length} ${lastProgress.highDays.length === 1 ? 'day' : 'days'}.`);

  console.log(isRussian ? 'Новые слова по дням:' : 'New words per day:', numbers);
  console.log(isRussian ? 'Максимум за день:' : 'Maximum in one day:', lastProgress.maximum);
  console.log(isRussian ? 'Дни с > 50 словами:' : 'Days with > 50 words:', lastProgress.highDays);
  console.log(isRussian ? 'Дней с малым прогрессом:' : 'Low-progress days:', lastProgress.lowDays.length);
  console.log(isRussian ? 'Процент дней с малым прогрессом:' : 'Percentage of low-progress days:', `${lastProgress.lowPercentage.toFixed(2)}%`);
  if (lastProgress.average > 30) {
    console.log(isRussian ? 'Отличный темп изучения языка!' : 'Excellent language-learning pace!');
  }
});

wordCountsInput.addEventListener('input', () => {
  lastProgress = null;
  progressResults.hidden = true;
  progressError.hidden = true;
  wordCountsInput.removeAttribute('aria-invalid');
});
