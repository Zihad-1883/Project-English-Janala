const loadLevels = () => {
    const res = fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayLevel(data))
}
 
loadLevels()

function removeActive(){
    const allBtn = document.querySelectorAll('.lesson-btn')
    // console.log(allBtn);
    allBtn.forEach(btn => {
        // console.log(btn)
        btn.classList.remove('active')
    })
    
}

const displayLevel = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    // console.log(lessons.data);
    lessons.data.forEach(level => {
        // console.log(level)
        const levelBtn = document.createElement('button');
        levelBtn.innerHTML = `
            <button onclick = "loadWords(${level.level_no})" id = "lesson-btn-${level.level_no}" class="btn btn-outline btn-primary lesson-btn"><img src="./assets/fa-book-open.png" alt="">Lesson - ${level.level_no}</button>
        `
        levelContainer.appendChild(levelBtn)
    });
    
}

const loadWords = (id) => {
    manageLoading(true)
    const res = fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(res => res.json())
        .then(data => {
            const clickedBtn = document.getElementById(`lesson-btn-${id}`)
            removeActive()
            clickedBtn.classList.add('active')
            displayWords(data.data)
            // console.log(data.data)
            manageLoading(false)
        })
}

const displayWords = (words) => {
    // console.log(words.data.length);
    const wordsContainer = document.getElementById('words-container');
    wordsContainer.innerHTML = ``;

    console.log(words)
    if(words.length === 0){
        wordsContainer.innerHTML = `
            <div class="space-y-3 flex flex-col items-center p-5 col-span-full">
                <img src = "./assets/alert-error.png">
                <p class="font-bangla text-[14px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bangla text-3xl font-medium">নেক্সট Lesson এ যান</h2>
            </div>
        `
    }

    words.forEach(word => {
        // console.log(word.meaning);
        // console.log(word.id)
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `
            <div class="rounded-md p-13 bg-white">
                <div class="space-y-6 text-center mb-14">
                    <h2 class="text-3xl font-bold">${word.word ? word.word : "Word not found"}</h2>
                    <p class="text-xl font-medium">Meaning /Pronounciation</p>
                    <h2 class="font-bangla text-2xl font-semibold">${word.meaning ? word.meaning : "Meaning not found"} / ${word.pronunciation ? word.pronunciation : "Pronounciation not found"}"</h2>
                </div>
                <div class="flex justify-between items-center">
                    <img onclick="loadWordDetails(${word.id})" src="./assets/Vector.png" alt=""> 
                    <img src="./assets/fi-sr-volume.png" alt="">
                </div>
            </div>
        `
        wordsContainer.appendChild(wordDiv)
    })
    
}


function loadWordDetails(id){
    const res = fetch(`https://openapi.programming-hero.com/api/word/${id}`)
        .then(res => res.json())
        .then(data => displayWordDetails(data))
}

function displayWordDetails(clickedWord){
    console.log(clickedWord.data)
    const wordDetails = document.getElementById('word-details');
    wordDetails.innerHTML = ""
    const wordDetailsDiv = document.createElement('div');
    wordDetailsDiv.innerHTML = `
        <div class="space-y-8 p-5">
                <div>
                    <h2 class="text-[36px] font-semibold">${clickedWord.data.word} (${clickedWord.data.pronunciation})</h2>
                </div>
                <div class="space-y-3">
                    <h5 class="text-2xl font-semibold">Meaning</h5>
                    <p class="text-xl font-medium font-bangla">${clickedWord.data.meaning}</p>
                </div>
                <div class="space-y-3">
                    <h5 class="text-2xl font-semibold">Example</h5>
                    <p class="text-xl font-medium">${clickedWord.data.sentence}</p>
                </div>
                <div class="space-y-3">
                    <h5 class="text-2xl font-medium font-bangla">সমার্থক শব্দ গুলো</h5>
                    <span class="text-xl bg-[#dcefff] px-3 py-2 mr-1">${clickedWord.data.synonyms[0]}</span>
                    <span class="text-xl bg-[#dcefff] px-3 py-2 mr-1">${clickedWord.data.synonyms[1]}</span>
                    <span class="text-xl bg-[#dcefff] px-3 py-2">${clickedWord.data.synonyms[2]}</span>
                </div>
        </div>            
    
               
    ` 
    wordDetails.appendChild(wordDetailsDiv)
    my_modal_5.showModal()
}
 

function manageLoading(status){
    const loadingSection = document.getElementById('loadingSection');
    if(status === true){
        loadingSection.classList.remove('hidden');
        document.getElementById('words-container').classList.add('hidden');
    }
    else if(status === false){
        loadingSection.classList.add('hidden');
        document.getElementById('words-container').classList.remove('hidden');
    }
}


// search functionality
document.getElementById('search-btn').addEventListener('click' , () => {
    const searchInput = document.getElementById('search-input')
    const searchValue = searchInput.value.trim().toLowerCase()
    console.log(searchValue)

    removeActive()
    const res = fetch('https://openapi.programming-hero.com/api/words/all')
        .then(res => res.json())
        .then(data => {
            // console.log(data.data);
            const allWords = data.data;
            const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
            console.log(filterWords)
            displayWords(filterWords)
        })
})