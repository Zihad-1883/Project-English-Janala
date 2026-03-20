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
        console.log(level)
        const levelBtn = document.createElement('button');
        levelBtn.innerHTML = `
            <button class="btn btn-outline btn-primary"><img src="./assets/fa-book-open.png" alt="">Lesson - ${level.level_no}</button>
        `
        levelContainer.appendChild(levelBtn)
    });
    
}