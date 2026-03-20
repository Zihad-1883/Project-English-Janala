const loadLevels = () => {
    const res = fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayLevel(data))
}
 
loadLevels()

const displayLevel = (lessons) => {
    const levelContainer = document.getElementById('level-container');
    // console.log(lessons.data);
    lessons.data.forEach(level => {
        // console.log(level)
        const levelBtn = document.createElement('button');
        levelBtn.innerHTML = `
            <button onclick = "loadWords(${level.level_no})" class="btn btn-outline btn-primary"><img src="./assets/fa-book-open.png" alt="">Lesson - ${level.level_no}</button>
        `
        levelContainer.appendChild(levelBtn)
    });
    
}

const loadWords = (id) => {
    const res = fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(res => res.json())
        .then(data => displayWords(data))
}

const displayWords = (words) => {
    // console.log(words.data.length);
    const wordsContainer = document.getElementById('words-container');
    wordsContainer.innerHTML = ``;

    if(words.data.length === 0){
        wordsContainer.innerHTML = `
            <div class="space-y-3 flex flex-col items-center p-5 col-span-full">
                <img src = "./assets/alert-error.png">
                <p class="font-bangla text-[14px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-bangla text-3xl font-medium">নেক্সট Lesson এ যান</h2>
            </div>
        `
    }

    words.data.forEach(word => {
        // console.log(word.meaning);
        
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `
            <div class="rounded-md p-13 bg-white">
                <div class="space-y-6 text-center mb-14">
                    <h2 class="text-3xl font-bold">${word.word ? word.word : "Word not found"}</h2>
                    <p class="text-xl font-medium">Meaning /Pronounciation</p>
                    <h2 class="font-bangla text-2xl font-semibold">${word.meaning ? word.meaning : "Meaning not found"} / ${word.pronunciation ? word.pronunciation : "Pronounciation not found"}"</h2>
                </div>
                <div class="flex justify-between items-center">
                    <img src="./assets/Vector.png" alt=""> 
                    <img src="./assets/fi-sr-volume.png" alt="">
                </div>
            </div>
        `
        wordsContainer.appendChild(wordDiv)
    })
    
}