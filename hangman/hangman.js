const words = {
    countries: [
        'AFGHANISTAN', 'ALBANIA', 'ALGERIA', 'ANDORRA', 'ANGOLA', 'ANTIGUA AND BARBUDA', 'ARGENTINA', 
        'ARMENIA', 'AUSTRALIA', 'AUSTRIA', 'AZERBAIJAN', 'BAHAMAS', 'BAHRAIN', 'BANGLADESH', 'BARBADOS', 
        'BELARUS', 'BELGIUM', 'BELIZE', 'BENIN', 'BHUTAN', 'BOLIVIA', 'BOSNIA AND HERZEGOVINA', 'BOTSWANA', 
        'BRAZIL', 'BRUNEI', 'BULGARIA', 'BURKINA FASO', 'BURUNDI', 'CABO VERDE', 'CAMBODIA', 'CAMEROON', 
        'CANADA', 'CENTRAL AFRICAN REPUBLIC', 'CHAD', 'CHILE', 'CHINA', 'COLOMBIA', 'COMOROS', 'CONGO', 
        'COSTA RICA', 'CROATIA', 'CUBA', 'CYPRUS', 'CZECH REPUBLIC', 'DENMARK', 'DJIBOUTI', 'DOMINICA', 
        'DOMINICAN REPUBLIC', 'ECUADOR', 'EGYPT', 'EL SALVADOR', 'EQUATORIAL GUINEA', 'ERITREA', 'ESTONIA', 
        'ESWATINI', 'ETHIOPIA', 'FIJI', 'FINLAND', 'FRANCE', 'GABON', 'GAMBIA', 'GEORGIA', 'GERMANY', 'GHANA', 
        'GREECE', 'GRENADA', 'GUATEMALA', 'GUINEA', 'GUINEA-BISSAU', 'GUYANA', 'HAITI', 'HONDURAS', 'HUNGARY', 
        'ICELAND', 'INDIA', 'INDONESIA', 'IRAN', 'IRAQ', 'IRELAND', 'ITALY', 'JAMAICA', 'JAPAN', 
        'JORDAN', 'KAZAKHSTAN', 'KENYA', 'KIRIBATI', 'KOSOVO', 'KUWAIT', 'KYRGYZSTAN', 'LAOS', 'LATVIA', 
        'LEBANON', 'LESOTHO', 'LIBERIA', 'LIBYA', 'LIECHTENSTEIN', 'LITHUANIA', 'LUXEMBOURG', 'MADAGASCAR', 
        'MALAWI', 'MALAYSIA', 'MALDIVES', 'MALI', 'MALTA', 'MARSHALL ISLANDS', 'MAURITANIA', 'MAURITIUS', 
        'MEXICO', 'MICRONESIA', 'MOLDOVA', 'MONACO', 'MONGOLIA', 'MONTENEGRO', 'MOROCCO', 'MOZAMBIQUE', 
        'MYANMAR', 'NAMIBIA', 'NAURU', 'NEPAL', 'NETHERLANDS', 'NEW ZEALAND', 'NICARAGUA', 'NIGER', 'NIGERIA', 
        'NORTH KOREA', 'NORTH MACEDONIA', 'NORWAY', 'OMAN', 'PAKISTAN', 'PALAU', 'PALESTINE', 'PANAMA', 
        'PAPUA NEW GUINEA', 'PARAGUAY', 'PERU', 'PHILIPPINES', 'POLAND', 'PORTUGAL', 'QATAR', 'ROMANIA', 
        'RUSSIA', 'RWANDA', 'SAINT KITTS AND NEVIS', 'SAINT LUCIA', 'SAINT VINCENT AND THE GRENADINES', 
        'SAMOA', 'SAN MARINO', 'SAO TOME AND PRINCIPE', 'SAUDI ARABIA', 'SENEGAL', 'SERBIA', 'SEYCHELLES', 
        'SIERRA LEONE', 'SINGAPORE', 'SLOVAKIA', 'SLOVENIA', 'SOLOMON ISLANDS', 'SOMALIA', 'SOUTH AFRICA', 
        'SOUTH KOREA', 'SOUTH SUDAN', 'SPAIN', 'SRI LANKA', 'SUDAN', 'SURINAME', 'SWEDEN', 'SWITZERLAND', 
        'SYRIA', 'TAIWAN', 'TAJIKISTAN', 'TANZANIA', 'THAILAND', 'TIMOR-LESTE', 'TOGO', 'TONGA', 'TRINIDAD AND TOBAGO', 
        'TUNISIA', 'TURKEY', 'TURKMENISTAN', 'TUVALU', 'UGANDA', 'UKRAINE', 'UNITED ARAB EMIRATES', 'UNITED KINGDOM', 
        'UNITED STATES', 'URUGUAY', 'UZBEKISTAN', 'VANUATU', 'VATICAN CITY', 'VENEZUELA', 'VIETNAM', 'YEMEN', 'ZAMBIA', 'ZIMBABWE'
    ],
    colors: [
        'RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE', 'PINK', 'BROWN', 
        'BLACK', 'WHITE', 'GRAY', 'CYAN', 'MAGENTA', 'MAROON', 'OLIVE', 'LIME', 
        'TEAL', 'NAVY', 'AQUA', 'FUCHSIA', 'SILVER', 'GOLD', 'BEIGE', 'IVORY', 
        'CORAL', 'TURQUOISE', 'VIOLET', 'INDIGO', 'CRIMSON', 'KHAKI', 'LAVENDER'
    ],
    fruits: [
        'APPLE', 'BANANA', 'CHERRY', 'GRAPE', 'MANGO', 'ORANGE', 'PEACH', 'PEAR', 
        'PINEAPPLE', 'STRAWBERRY', 'WATERMELON', 'AVOCADO', 'BLACKBERRY', 'BLUEBERRY', 
        'COCONUT', 'FIG', 'GUAVA', 'KIWI', 'LEMON', 'LIME', 'LYCHEE', 'MELON', 
        'NECTARINE', 'PAPAYA', 'PASSIONFRUIT', 'PERSIMMON', 'PLUM', 'POMEGRANATE', 
        'RASPBERRY', 'TANGERINE', 'APRICOT', 'CANTALOUPE', 'CRANBERRY', 'DATE', 
        'DRAGONFRUIT', 'GRAPEFRUIT', 'HONEYDEW', 'JACKFRUIT', 'KUMQUAT', 'MANDARIN', 
        'MULBERRY', 'OLIVE', 'POMELO', 'QUINCE', 'RAMBUTAN', 'STARFRUIT', 'SOURSOP', 
        'BOYSENBERRY', 'CUSTARD APPLE', 'DURIAN', 'LONGAN', 'SAPODILLA'
    ],
    animals: [
        'DOG', 'CAT', 'LION', 'TIGER', 'ELEPHANT', 'GIRAFFE', 'ZEBRA', 'MONKEY', 
        'KANGAROO', 'PANDA', 'SNAKE', 'CROCODILE', 'DOLPHIN', 'SHARK', 'BEAR', 'WOLF', 
        'HORSE', 'DEER', 'RABBIT', 'SQUIRREL', 'HIPPOPOTAMUS', 'RHINOCEROS', 'BAT', 
        'CHAMELEON', 'EAGLE', 'OWL', 'PEACOCK', 'PARROT', 'TURTLE', 'OCTOPUS', 
        'WHILE', 'PENGUIN', 'SEAL', 'OTTER', 'FLAMINGO', 'OSTRICH', 'GORILLA', 'BUFFALO', 
        'JAGUAR', 'LEOPARD', 'ANT', 'BEE', 'BUTTERFLY', 'SPIDER', 'SCORPION', 'FROG', 
        'CRAB', 'LOBSTER', 'STARFISH', 'SQUID', 'MOOSE', 'KOALA', 'SLOTH', 'DONKEY', 
        'GOAT', 'SHEEP', 'COW', 'PIG', 'CHICKEN', 'DUCK', 'GOOSE', 'TURKEY', 'LLAMA', 
        'HYENA', 'PANTHER', 'CROW', 'RAVEN', 'HEDGEHOG', 'FERRET', 'CHIPMUNK', 
        'MEERKAT', 'ARMADILLO', 'BADGER', 'WALRUS', 'SWAN', 'BEAVER', 'TAPIR', 
        'GAZELLE', 'PUMA', 'EMU', 'IGUANA', 'TARANTULA', 'GECKO', 'VULTURE', 
        'HARE', 'DINGO', 'WHALE', 'JELLYFISH', 'ANCHOVY', 'TROUT', 'SALMON', 'MANTIS'
    ],
    sports: [
        'SOCCER', 'BASKETBALL', 'CRICKET', 'TENNIS', 'BASEBALL', 'GOLF', 'VOLLEYBALL', 
        'RUGBY', 'HOCKEY', 'TABLE TENNIS', 'BADMINTON', 'SWIMMING', 'CYCLING', 
        'BOXING', 'WRESTLING', 'GYMNASTICS', 'SKIING', 'SNOWBOARDING', 'SKATEBOARDING', 
        'SURFING', 'ATHLETICS', 'FENCING', 'ARCHERY', 'JUDO', 'KARATE', 'TAEKWONDO', 
        'WEIGHTLIFTING', 'EQUESTRIAN', 'ROWING', 'CANOEING', 'DIVING', 'TRIATHLON', 
        'HANDBALL', 'WATER POLO', 'SQUASH', 'RACQUETBALL', 'CURLING', 'BOBSLEIGH', 
        'LUGE', 'MARTIAL ARTS', 'SOFTBALL', 'LACROSSE', 'FIELD HOCKEY', 'MOTOCROSS', 
        'DRIFTING', 'BMX', 'PARAGLIDING', 'ROCK CLIMBING', 'KITE SURFING', 'YACHTING', 
        'PADDLEBOARDING', 'CROQUET', 'DARTS', 'POLO', 'BILLIARDS', 'NETBALL', 'BOWLING'
    ],
    capitals: [
        'WASHINGTON', 'LONDON', 'PARIS', 'BERLIN', 'ROME', 'MADRID', 'MOSCOW', 
        'BEIJING', 'TOKYO', 'CANBERRA', 'OTTAWA', 'BRASILIA', 'Dhaka', 'CAPE TOWN', 
        'ANKARA', 'BUCHAREST', 'ATHENS', 'CAIRO', 'BANGKOK', 'SEOUL', 'KUALA LUMPUR', 
        'JAKARTA', 'HANOI', 'KABUL', 'BAGHDAD', 'TEHRAN', 'DAMASCUS', 'MEXICO CITY', 
        'LIMA', 'SANTIAGO', 'KIEV', 'OSLO', 'STOCKHOLM', 'COPENHAGEN', 'LISBON', 'VIENNA'
    ],
    flowers: [
        'ROSE', 'TULIP', 'DAISY', 'SUNFLOWER', 'LILY', 'ORCHID', 'MARIGOLD', 'JASMINE', 
        'DAFFODIL', 'PEONY', 'LAVENDER', 'CARNATION', 'LOTUS', 'POPPY', 'HYACINTH', 
        'CHRYSANTHEMUM', 'BEGONIA', 'GERANIUM', 'PETUNIA', 'VIOLET', 'IRIS', 
        'FREESIA', 'ASTER', 'GLADIOLUS', 'HIBISCUS', 'BOUGAINVILLEA'
    ],
    professions: [
        'DOCTOR', 'ENGINEER', 'TEACHER', 'LAWYER', 'NURSE', 'SCIENTIST', 'ARTIST', 
        'MUSICIAN', 'CHEF', 'ARCHITECT', 'PILOT', 'PHOTOGRAPHER', 'WRITER', 'ACTOR', 
        'DANCER', 'ATHLETE', 'POLICE OFFICER', 'FIREFIGHTER', 'PROGRAMMER', 'DESIGNER', 
        'ACCOUNTANT', 'FARMER', 'JOURNALIST', 'THERAPIST', 'PSYCHOLOGIST', 'BANKER', 
        'VETERINARIAN', 'PLUMBER', 'ELECTRICIAN', 'MECHANIC', 'BARBER', 'DENTIST'
    ],
    elements: [
        'HYDROGEN', 'HELIUM', 'LITHIUM', 'BERYLLIUM', 'BORON', 'CARBON', 'NITROGEN', 
        'OXYGEN', 'FLUORINE', 'NEON', 'SODIUM', 'MAGNESIUM', 'ALUMINUM', 'SILICON', 
        'PHOSPHORUS', 'SULFUR', 'CHLORINE', 'ARGON', 'POTASSIUM', 'CALCIUM', 'IRON', 
        'COPPER', 'ZINC', 'NICKEL', 'SILVER', 'GOLD', 'PLATINUM', 'LEAD', 'TIN', 
        'URANIUM', 'RADON', 'TITANIUM', 'COBALT', 'MERCURY'
    ],
    languages: [
        'ENGLISH', 'SPANISH', 'FRENCH', 'GERMAN', 'CHINESE', 'HINDI', 'ARABIC', 
        'PORTUGUESE', 'RUSSIAN', 'JAPANESE', 'KOREAN', 'ITALIAN', 'DUTCH', 'GREEK', 
        'TURKISH', 'SWEDISH', 'NORWEGIAN', 'DANISH', 'FINNISH', 'POLISH', 'CZECH', 
        'HEBREW', 'BENGALI', 'VIETNAMESE', 'THAI', 'URDU', 'PERSIAN', 'MALAY', 
        'TAMIL', 'TELUGU'
    ]
};


let selectedWord = '';
let correctLetters = new Set();
let wrongLetters = new Set();
let errorsLeft = 6;

function newGame() {
    const category = document.getElementById('category').value;
    const wordList = words[category];
    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
    correctLetters.clear();
    wrongLetters.clear();
    errorsLeft = 6;

    const revealCount = Math.ceil(selectedWord.length * 0.4);
    const revealPositions = new Set();
    while (revealPositions.size < revealCount) {
        const randomPos = Math.floor(Math.random() * selectedWord.length);
        revealPositions.add(randomPos);
    }
    revealPositions.forEach(pos => correctLetters.add(selectedWord[pos]));
    
    // Reset UI
    document.querySelectorAll('.figure-part, .gallows-part').forEach(part => {
        part.style.display = 'none';
    });
    document.querySelectorAll('#keyboard button').forEach(button => {
        button.disabled = false;
        button.className = '';
    });
    document.getElementById('status').textContent = '';
    
    updateDisplay();
    createKeyboard();
}

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = '';
    
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter));
        keyboard.appendChild(button);
    });
}

function handleGuess(letter) {
    letter = letter.toUpperCase();
    const button = [...document.getElementById('keyboard').children]
        .find(btn => btn.textContent === letter);
        
    if (button.disabled) return;
    
    button.disabled = true;
    
    if (selectedWord.includes(letter)) {
        correctLetters.add(letter);
        button.classList.add('correct');
    } else {
        wrongLetters.add(letter);
        errorsLeft--;
        button.classList.add('incorrect');
        updateHangman();
    }
    
    checkGameStatus();
    updateDisplay();
}

function updateHangman() {
    const parts = ['base', 'post', 'beam', 'rope', 'head', 'body', 
                 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
    const errorsMade = 6 - errorsLeft;
    
    parts.slice(0, errorsMade + 3).forEach((part, index) => {
        if (index < 4) {
            document.getElementById(part).style.display = 'block';
        } else if (index - 3 <= errorsMade) {
            document.getElementById(part).style.display = 'block';
        }
    });
}

function updateDisplay() {
    document.getElementById('wordDisplay').textContent = 
        selectedWord.split('').map(letter => 
            correctLetters.has(letter) ? letter : '_'
        ).join(' ');
}

function checkGameStatus() {
    if (errorsLeft === 0) {
        document.getElementById('status').textContent = 
            `Game Over! The word was: ${selectedWord}`;
        disableKeyboard();
    } else if ([...selectedWord].every(letter => 
               correctLetters.has(letter))) {
        document.getElementById('status').textContent = 'Congratulations! You Won!';
        disableKeyboard();
    }
}

function disableKeyboard() {
    document.querySelectorAll('#keyboard button').forEach(button => {
        button.disabled = true;
    });
}

// Event listeners
document.addEventListener('keydown', e => {
    if (/^[a-z]$/i.test(e.key)) {
        handleGuess(e.key.toUpperCase());
    }
});

// Initialize game
newGame();