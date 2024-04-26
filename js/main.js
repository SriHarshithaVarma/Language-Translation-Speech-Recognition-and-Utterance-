var speak = document.getElementById('speak');
var translate = document.getElementById('translate');
var textarea_user = document.getElementById('textarea_act');
var textarea_trans = document.getElementById('textarea_translated');
var listen = document.getElementById('Listenbtn');
const selectTag = document.querySelectorAll("select");
var transcript

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected"
        }
        else if (id == 1 && country_code == "hi-IN") {
            selected = "selected"
        }
        let option = ` <option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);

    }
});

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

selectTag[0].addEventListener('change', function () {
    recognition.lang = this.value;
});

recognition.interimResults = true;
recognition.continuous = true;

speak.addEventListener('click', function () {
    recognition.stop();
    recognition.start();
    textarea_user.innerHTML = '...speaking';

})

recognition.onresult = function (e) {
    transcript = e.results[0][0].transcript;
    textarea_user.innerHTML = transcript;
};

translate.addEventListener('click', function () {
    let text = transcript;
    translateFrom = selectTag[0].value;
    translateTo = selectTag[1].value;
    if (!text) {
        return;
    }
    textarea_trans.innerHTML = '...translating';
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        textarea_trans.innerHTML = data.responseData.translatedText;

    })
});

listen.addEventListener('click', function () {
    var saythis = new SpeechSynthesisUtterance();
    saythis.text = textarea_trans.innerHTML;
    saythis.lang = selectTag[1].value;
    speechSynthesis.speak(saythis);
})





