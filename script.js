const get = (ele) => document.querySelector(ele);
const getAll = (ele) => document.querySelectorAll(ele);

let result = '' ;
let myResult = '' ;
let tryNum = 0;
const limit = 7;

getAll('.info span').innerText = `${limit}`

const template = `<div class="input_line">
                <input class="words" type="text" maxlength="1" onchange="inputVal(this)">
                <input class="words" type="text" maxlength="1" onchange="inputVal(this)">
                <input class="words" type="text" maxlength="1" onchange="inputVal(this)">
                <input class="words" type="text" maxlength="1" onchange="inputVal(this)">
                <input class="words" type="text" maxlength="1" onchange="inputVal(this)">
            </div>`
            

const inputVal = (target) => {
    const english = /[a-zA-Z]/;
    if(!english.test(`${target.value}`)) target.value = '';
    let value = target.value.toUpperCase();
    target.value = value;
}

fetch('./db.json')
.then((res) => res.json())
.then(data => {
    setResult(data)
})

const setResult = (data) => {
    for (let i = 0; i < 1; i++) {
        let ranNum = parseInt(Math.random()*100, 10)
        if(ranNum <= data.length) {
            result = data[ranNum].toUpperCase();
        } else {
            i--
        }
    }
    console.log(result)
}

const setRestart = () => {
    fetch('./db.json')
    .then((res) => res.json())
    .then(data => {
        setResult(data)
    })
    console.log('다시시작해')
    myResult = '' ;
    tryNum = 0;
    get('.try span').innerText = `${tryNum}`
    get('.try_input').innerHTML = '';
    get('.try_btn').classList.remove('hidden_btn')
    get('.restart_btn').classList.add('hidden_btn')
}


get('.try_btn').addEventListener('click', () => {
    let empty = 0;
    if(tryNum === 0) {
        tryNum++;
        get('.try span').innerText = `${tryNum}`
        get('.try_input').innerHTML = template
    } else {
        const words = getAll('.words');

        words.forEach((x) => !(x.value) ? empty = 1 : empty = empty)
        if(empty === 1) {
            console.log(empty)
            alert('빈칸을 채워주세요!')
            return
        }


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

            //다음줄 생성과 동시에 해줄 것
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