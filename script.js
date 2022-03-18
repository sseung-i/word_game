const get = (ele) => document.querySelector(ele);
const getAll = (ele) => document.querySelectorAll(ele);

let result = '';
let myResult = '';
let tryNum = 0;
const limit = 7;

const template = `<div class="input_line">
                <input class="words" type="text" onchange="inputVal(this)">
                <input class="words" type="text" onchange="inputVal(this)">
                <input class="words" type="text" onchange="inputVal(this)">
                <input class="words" type="text" onchange="inputVal(this)">
                <input class="words" type="text" onchange="inputVal(this)">
            </div>`
            

const inputVal = (target) => {
    let value = target.value.toUpperCase();
    target.value = value;
}

const setResult = () => {
    const arr = ['const', 'black', 'white'];
    
    for (let i = 0; i < 1; i++) {
        let ranNum = parseInt(Math.random()*10, 10)
        if(ranNum <= arr.length) {
            return result = arr[ranNum].toUpperCase();
        } else {
            i--
        }
    }
}

const setRestart = () => {
    setResult()
    myResult = '' ;
    tryNum = 0;
    get('.try span').innerText = `${tryNum}`
    get('.try_input').innerHTML = '';
    get('.try_btn').classList.remove('hidden_btn')
    get('.restart_btn').classList.add('hidden_btn')
    // console.log(result)
}


get('.try_btn').addEventListener('click', () => {
    if(tryNum === 0) {
        tryNum++;
        get('.try span').innerText = `${tryNum}`
        get('.try_input').innerHTML = template
    } else {
        const words = getAll('.words');
        for(let i = 0; i < result.length; i++) {
            if (words[i].value === result[i]) {
                words[i].style.backgroundColor = 'green'
                words[i].style.color = '#fff'
            } else if (result.includes(words[i].value)) {
                words[i].style.backgroundColor = 'orange'
                words[i].style.color = '#fff'
            } else {
                words[i].style.backgroundColor = '#eee'
                words[i].style.color = '#000'
            }

            words[i].disabled = true;
            words[i].removeAttribute('onchange');
            words[i].classList.remove('words');

            myResult += words[i].value;
        }
        //만약 정답이면 추가작업없이 끝
        if(myResult === result) {
            alert(`${tryNum}차시도, 정답입니다!`)
            get('.restart_btn').classList.remove('hidden_btn')
            get('.try_btn').classList.add('hidden_btn')
        } else if (tryNum === limit) {
            alert(`
            ${tryNum}회 틀리셨습니다T.T
            정답은 ${result} 입니다.
            다시 도전 해 보세요~ :)
            `)
        } else {
            myResult = '';
            tryNum++;
            get('.try span').innerText = `${tryNum}`
            get('.try_input').insertAdjacentHTML('beforeend', template);
        }
    }
})

get('.restart_btn').addEventListener('click', () => {
    setRestart()
})

const init = () => {
    setResult()
    // console.log(result)
}

init()