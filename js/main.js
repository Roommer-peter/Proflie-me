// 1. ຕັ້ງຄຳຖາມ ແລະ ຕົວເລືອກ (ປ່ຽນຂໍ້ຄວາມໄດ້ຕາມໃຈເລີຍ)
const questions = [
    {
        question: "ເຈົ້າເລືອກທີຈະເຂົ້າລີ້ງນີ້ແລ້ວເຈົ້າຢາກຮູ້ຫຍັງກ່ຽວກັບຂ້ອຍ?",
        options: ["ຢາກຮູ້ຈັກ", "ມັກ", "ຢາກຖາມຫາຄວາມຮູ້ບ້າງຢ່າງ", "ຢາກເຂົ້າຫາ"]
    },
    {
        question: "ເຈົ້າມັກຫຍັງໃນໂຕຂ້ອຍແລະສົນໃຈຫຍັງທີ່ສຸດ?",
        options: ["ຢາກຮູ້ຈັກຊື່ໆ", "ດົນຕຮີ", "ຄອມ", "ມັກຂ້ອຍ"]
    },
    {
        question: "ຖ້າເກີດວ່າຂ້ອຍນັ້ນບໍ່ເກັ່ງເທົ່າທີເຈົ້າຕ້ອງການເຈົ້າຈະເຮັດແນວໃດ?",
        options: ["ແຊ້ດຕໍ່", "ບ໋ອກ", "ງຽບ/ຫາຍ", "ມັກທີໃຈ"]
    },
    {
        question: "ເຈົ້າມັກດ້ວຍຜົນປະໂຫຍດໃດ ເມື່ອເຈົ້າເຫັນຂ້ອຍ?",
        options: ["ຫລໍ່", "ຫນ້າຮັກຫູ້ນຫມີ່", "ຫຼີ້ນກີຕ້າເກັ່ງ/ເທ່", "ຫນ້າຮັກຄາລົມດີ/ນິໄສດີ"]
    },
    {
        question: "ຄຳຖາມສຸດທ້າຍ ຂ້ອຍນັ້ນມບໍ່ມັກທັກຫາໃຜກ່ອນ ເມື່ອເຈົ້ານັ້ນມັກເຈົ້າຈະທັກຫາຂ້ອຍບໍ່?",
        options: ["ທັກ", "ບໍ່ທັກ", "ບໍ່ກ້າທັກ", "ຈະທັກເມື່ອເຈົ້າມັກ"]
    }
];

// ເບີໂທ WhatsApp ຂອງເຈົ້າ (ໃສ່ເບີເຈົ້າບ່ອນນີ້)
const myPhoneNumber = "8562051984140"; 

let currentQuestion = 0;
let userAnswers = [];

const questionNumberEl = document.getElementById('question-number');
const questionTitleEl = document.getElementById('question-title');
const optionsContainerEl = document.getElementById('options-container');
const progressBarEl = document.getElementById('progress');
const quizBoxEl = document.getElementById('quiz-box');
const resultBoxEl = document.getElementById('result-box');
const finalScoreEl = document.getElementById('final-score');
const whatsappBtnEl = document.getElementById('whatsapp-btn');

// Load ຄຳຖາມ
function loadQuestion() {
    const q = questions[currentQuestion];
    
    questionNumberEl.innerText = `ຄຳຖາມທີ ${currentQuestion + 1}/${questions.length}`;
    questionTitleEl.innerText = q.question;
    
    // Update Progress Bar
    const progressPercent = ((currentQuestion) / questions.length) * 100;
    progressBarEl.style.width = `${progressPercent}%`;

    // Clear Old Options
    optionsContainerEl.innerHTML = '';

    // Create Options Buttons
    q.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.addEventListener('click', () => selectAnswer(opt));
        optionsContainerEl.appendChild(btn);
    });
}

// ເມື່ອເລືອກຄຳຕອບ
function selectAnswer(answer) {
    userAnswers.push({
        question: questions[currentQuestion].question,
        answer: answer
    });

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// ສະແດງຜົນ ແລະ ສ້າງ Link ແຊັດ
function showResult() {
    progressBarEl.style.width = '100%';
    quizBoxEl.classList.add('hidden');
    resultBoxEl.classList.remove('hidden');

    finalScoreEl.innerText = questions.length;

    // ສ້າງຂໍ້ຄວາມທີ່ຈະສົ່ງເຂົ້າ WhatsApp
    let message = "ສະບາຍດີ! ຂ້ອຍຕອບຄຳຖາມຢູ່ໃນເວັບຂອງເຈົ້າແລ້ວເດີ້ 💖\n\n";
    message += "ຂ້ອຍມັກເຈົ້າ ແລະ ນີ້ແມ່ນຄຳຕອບຂອງຂ້ອຍ:\n";
    
    userAnswers.forEach((item, index) => {
        message += `${index + 1}. ${item.answer}\n`;
    });

    // Encode text ສໍາລັບ URL
    const encodedMessage = encodeURIComponent(message);
    
    // ອັບເດດ WhatsApp Link
    whatsappBtnEl.href = `https://wa.me/${myPhoneNumber}?text=${encodedMessage}`;
}

// ເລີ່ມເກມ
loadQuestion();ss