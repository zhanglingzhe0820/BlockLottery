import './index.css';
import '../css/animate.min.css';
import './canvas.js';
import {
    addQipao,
    setPrizes,
    showPrizeList,
    setPrizeData,
    resetPrize
} from './prizeList';

const BACKEND_URL = "http://139.199.222.72:5000/";
const ROTATE_TIME = 3000;
const BASE_HEIGHT = 1080;
const ROW_COUNT = 7;
const COLUMN_COUNT = 17;


/**
 * 高亮矩阵
 */
const HIGHLIGHT_CELL = ['1-1', '1-2', '1-3', '2-3', '3-1', '3-2', '3-3', '4-1', '5-1', '5-2', '5-3', '1-5', '1-6', '1-7', '2-5', '2-7', '3-5', '3-7', '4-5', '4-7', '5-5', '5-6', '5-7', '1-10', '2-9', '2-10', '3-10', '4-10', '5-9', '5-10', '5-11', '1-13', '1-14', '1-15', '2-13', '2-15', '3-13', '3-14', '3-15', '4-15', '5-13', '5-14', '5-15'];

let
    TOTAL_CARDS,
    btns = {
        enter: document.querySelector('#enter'),
        lotteryBar: document.querySelector('#lotteryBar')
    },
    prizes,
    EACH_COUNT,
    COMPANY,
    // 当前的比例
    Resolution = 1;

let camera, scene, renderer, controls, threeDCards = [],
    targets = {
        table: [],
        sphere: []
    };

let selectedCardIndex = [],
    rotate = false,
    basicData = {
        prizes: [], //奖品信息
        users: [], //所有人员
        luckyUsers: {}, //已中奖人员
        leftUsers: [] //未中奖人员
    },
    interval,
    // 当前抽的奖项，从五等奖开始抽
    currentPrizeIndex,
    currentPrize,
    // 正在抽奖
    isLotting = false,
    eventId = 17,
    currentLuckys = [];

initAll();

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return 17;
}

/**
 * 初始化所有DOM
 */
function initAll() {
    eventId = getQueryVariable("eventId");
    window.AJAX({
        type: 'GET',
        url: BACKEND_URL + 'event/' + eventId,
        success(data) {
            let prizes = [
                {
                    type: '一等奖',
                    count: 100,
                    title: '特别奖',
                    img: '../img/huawei.png'
                }
            ];
            let eachCount = [0];
            for (let i = 0; i < data.rewardItemList.length; i++) {
                let rewardItem = data.rewardItemList[i];
                let prize = {
                    type: rewardItem.level,
                    count: rewardItem.num,
                    title: rewardItem.name,
                    img: '../img/huawei.png'
                };
                prizes = prizes.concat(prize);
                eachCount = eachCount.concat(rewardItem.count);
            }
            // 获取基础数据
            EACH_COUNT = eachCount;
            COMPANY = data.name;
            basicData.prizes = prizes;
            setPrizes(prizes);

            TOTAL_CARDS = ROW_COUNT * COLUMN_COUNT;

            let users = [];
            let leftUsers = [];
            let luckyUsers = {};
            for (let i = 0; i < data.peopleItems.length; i++) {
                let peopleItem = data.peopleItems[i];
                let user = new Array([peopleItem.code, peopleItem.name, peopleItem.phone.substr(peopleItem.phone.length - 6)]);
                users = users.concat(user);
                if (peopleItem.status.indexOf('待开奖') < 0 && peopleItem.status.indexOf('未中奖') < 0) {
                    let luckyUserTuple = [];
                    if (peopleItem.status in luckyUsers) {
                        luckyUserTuple = luckyUsers[peopleItem.status];
                    }
                    luckyUserTuple = luckyUserTuple.concat(user);
                    luckyUsers[peopleItem.status] = luckyUserTuple;
                } else {
                    leftUsers = leftUsers.concat(user);
                }
            }

            // 读取当前已设置的抽奖结果
            basicData.users = users;
            basicData.leftUsers = leftUsers;
            basicData.luckyUsers = luckyUsers;

            let prizeIndex = basicData.prizes.length - 1;
            for (; prizeIndex > -1; prizeIndex--) {
                if (luckyUsers[prizeIndex] && luckyUsers[prizeIndex].length >= basicData.prizes[prizeIndex].count) {
                    continue;
                }
                currentPrizeIndex = prizeIndex;
                currentPrize = basicData.prizes[currentPrizeIndex];
                break;
            }

            showPrizeList(currentPrizeIndex);
            let curLucks = basicData.luckyUsers[currentPrize.type];
            setPrizeData(currentPrizeIndex, curLucks ? curLucks.length : 0, true);

            initCards();
            // startMaoPao();
            animate();
            shineCard();
        }
    });

}

function initCards() {
    let member = basicData.users,
        showCards = [],
        length = member.length;

    let isBold = false,
        showTable = basicData.leftUsers.length === basicData.users.length,
        index = 0,
        totalMember = member.length,
        position = {
            x: (140 * COLUMN_COUNT - 20) / 2,
            y: (180 * ROW_COUNT - 20) / 2
        };

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3000;

    scene = new THREE.Scene();

    for (let i = 0; i < ROW_COUNT; i++) {
        for (let j = 0; j < COLUMN_COUNT; j++) {
            isBold = HIGHLIGHT_CELL.includes(i + '-' + j);
            var element = createCard(member[index % length], isBold, index, showTable);

            var object = new THREE.CSS3DObject(element);
            object.position.x = Math.random() * 4000 - 2000;
            object.position.y = Math.random() * 4000 - 2000;
            object.position.z = Math.random() * 4000 - 2000;
            scene.add(object);
            threeDCards.push(object);
            //

            var object = new THREE.Object3D();
            object.position.x = (j * 140) - position.x;
            object.position.y = -(i * 180) + position.y;
            targets.table.push(object);
            index++;
        }
    }

    // sphere

    var vector = new THREE.Vector3();

    for (var i = 0, l = threeDCards.length; i < l; i++) {
        var phi = Math.acos(-1 + (2 * i) / l);
        var theta = Math.sqrt(l * Math.PI) * phi;
        var object = new THREE.Object3D();
        object.position.setFromSphericalCoords(800 * Resolution, phi, theta);
        vector.copy(object.position).multiplyScalar(2);
        object.lookAt(vector);
        targets.sphere.push(object);
    }

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    //

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.5;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);

    bindEvent();

    if (showTable) {
        switchScreen('enter');
    } else {
        switchScreen('lottery');
    }
}

function setLotteryStatus(status = false) {
    isLotting = status;
}

/**
 * 事件绑定
 */
function bindEvent() {
    document.querySelector('#menu').addEventListener('click', function (e) {
        e.stopPropagation();
        // 如果正在抽奖，则禁止一切操作
        if (isLotting) {
            addQipao('抽慢一点点～～');
            return false;
        }

        let target = e.target.id;
        switch (target) {
            // 显示Tenda墙
            case 'welcome':
                switchScreen('enter');
                rotate = false;
                break;
            // 进入抽奖
            case 'enter':
                removeHighlight();
                addQipao(`马上抽取[${currentPrize.title}],不要走开。`);
                // rotate = !rotate;
                rotate = true;
                switchScreen('lottery');
                break;
            // 抽奖
            case 'lottery':
                setLotteryStatus(true);
                if (!currentPrize) {
                    //若奖品抽完
                    addQipao(`奖品已经抽完啦，下次再来吧~`);
                    return;
                }
                saveData();
                //更新剩余抽奖数目的数据显示
                changePrize();
                resetCard().then(res => {
                    // 抽奖
                    lottery();
                });
                addQipao(`正在抽取[${currentPrize.title}],调整好姿势`);
                break;
        }
    });

    window.addEventListener('resize', onWindowResize, false);
}

function saveData() {
    if (!currentPrize) {
        //若奖品抽完，则不再记录数据，但是还是可以进行抽奖
        return;
    }

    let type = currentPrize.type,
        curLucky = basicData.luckyUsers[type] || [];

    curLucky = curLucky.concat(currentLuckys);

    basicData.luckyUsers[type] = curLucky;

    if (currentPrize.count <= curLucky.length) {
        currentPrizeIndex--;
        if (currentPrizeIndex <= -1) {
            currentPrizeIndex = 0;
        }
        currentPrize = basicData.prizes[currentPrizeIndex];
    }

    return Promise.resolve();
}

function switchScreen(type) {
    switch (type) {
        case 'enter':
            btns.enter.classList.remove('none');
            btns.lotteryBar.classList.add('none');
            transform(targets.table, 2000);
            break;
        default:
            btns.enter.classList.add('none');
            btns.lotteryBar.classList.remove('none');
            transform(targets.sphere, 2000);
            break;
    }
}

/**
 * 创建元素
 */
function createElement(css, text) {
    let dom = document.createElement('div');
    dom.className = css || '';
    dom.innerHTML = text || '';
    return dom;
}

/**
 * 创建名牌
 */
function createCard(user, isBold, id, showTable) {
    var element = createElement();
    element.id = 'card-' + id;

    if (isBold) {
        element.className = 'element lightitem';
        if (showTable) {
            element.classList.add('highlight');
        }
    } else {
        element.className = 'element';
        element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.7 + 0.25) + ')';
    }
    //添加公司标识
    element.appendChild(createElement('company', COMPANY));

    element.appendChild(createElement('name', user[1]));

    element.appendChild(createElement('details', user[0] + '<br/>' + user[2]));
    return element;
}

function removeHighlight() {
    document.querySelectorAll('.highlight').forEach(node => {
        node.classList.remove('highlight');
    });
}

function addHighlight() {
    document.querySelectorAll('.lightitem').forEach(node => {
        node.classList.add('highlight');
    });
}

/**
 * 渲染地球等
 */
function transform(targets, duration) {
    // TWEEN.removeAll();
    for (var i = 0; i < threeDCards.length; i++) {
        var object = threeDCards[i];
        var target = targets[i];

        new TWEEN.Tween(object.position)
            .to({
                x: target.position.x,
                y: target.position.y,
                z: target.position.z
            }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({
                x: target.rotation.x,
                y: target.rotation.y,
                z: target.rotation.z
            }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        // new TWEEN.Tween(object.rotation)
        //     .to({
        //         x: target.rotation.x,
        //         y: target.rotation.y,
        //         z: target.rotation.z
        //     }, Math.random() * duration + duration)
        //     .easing(TWEEN.Easing.Exponential.InOut)
        //     .start();

    }

    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();
}

function rotateBall() {
    return new Promise((resolve, reject) => {
        scene.rotation.y = 0;
        new TWEEN.Tween(scene.rotation)
            .to({
                y: Math.PI * 8
            }, ROTATE_TIME)
            .onUpdate(render)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start()
            .onComplete(() => {
                resolve();
            });
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    // 让场景通过x轴或者y轴旋转
    // rotate && (scene.rotation.y += 0.088);

    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();

    // 渲染循环
    // render();
}

function render() {
    renderer.render(scene, camera);
}

function selectCard(duration = 600) {
    rotate = false;
    let width = 140,
        tag = -(currentLuckys.length - 1) / 2;

    let text = currentLuckys.map(item => item[1]);
    addQipao(`恭喜${text.join('、')}获得${currentPrize.title}, 2019年必定旺旺旺。`);

    selectedCardIndex.forEach((cardIndex, index) => {
        changeCard(cardIndex, currentLuckys[index]);
        var object = threeDCards[cardIndex];
        new TWEEN.Tween(object.position)
            .to({
                x: tag * width * Resolution,
                y: 50 * Resolution,
                z: 2200
            }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({
                x: 0,
                y: 0,
                z: 0
            }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        object.element.classList.add('prize');
        tag++;
    });

    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start()
        .onComplete(() => {
            // 动画结束后可以操作
            setLotteryStatus();
        });
}

/**
 * 重置抽奖牌内容
 */
function resetCard(duration = 500) {
    if (currentLuckys.length === 0) {
        return Promise.resolve();
    }

    selectedCardIndex.forEach((index) => {
        let object = threeDCards[index],
            target = targets.sphere[index];

        new TWEEN.Tween(object.position)
            .to({
                x: target.position.x,
                y: target.position.y,
                z: target.position.z
            }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({
                x: target.rotation.x,
                y: target.rotation.y,
                z: target.rotation.z
            }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
    })

    return new Promise((resolve, reject) => {
        new TWEEN.Tween(this)
            .to({}, duration * 2)
            .onUpdate(render)
            .start()
            .onComplete(() => {
                selectedCardIndex.forEach((index) => {
                    let object = threeDCards[index];
                    object.element.classList.remove('prize');
                });
                resolve();
            });
    });
}

/**
 * 抽奖
 */
function lottery() {
    rotateBall().then(() => {
        // 将之前的记录置空
        currentLuckys = [];
        selectedCardIndex = [];
        // 当前同时抽取的数目,当前奖品抽完还可以继续抽，但是不记录数据
        let perCount = EACH_COUNT[currentPrizeIndex],
            leftCount = basicData.leftUsers.length;

        if (leftCount === 0) {
            addQipao('人员已抽完，现在重新设置所有人员可以进行二次抽奖！');
            basicData.leftUsers = basicData.users;
            leftCount = basicData.leftUsers.length;
        }

        for (let i = 0; i < perCount; i++) {
            let luckyId = random(leftCount);
            currentLuckys.push(basicData.leftUsers.splice(luckyId, 1)[0]);
            leftCount--;

            let cardIndex = random(TOTAL_CARDS);
            while (selectedCardIndex.includes(cardIndex)) {
                cardIndex = random(TOTAL_CARDS);
            }
            selectedCardIndex.push(cardIndex);
        }
        let type = currentPrize.type;
        let peopleCodes = [];
        for (let i = 0; i < currentLuckys.length; i++) {
            peopleCodes = peopleCodes.concat(currentLuckys[i][0]);
        }
        window.AJAX(
            {
                type: 'POST',
                url: BACKEND_URL + 'event/lottery/' + eventId,
                data: {
                    'level': type,
                    'codes': peopleCodes
                },
            }
        )

        selectCard();
    });
}

function changePrize() {
    let luckys = basicData.luckyUsers[currentPrize.type];
    let luckyCount = luckys.length + EACH_COUNT[currentPrizeIndex];
    // 修改左侧prize的数目和百分比
    setPrizeData(currentPrizeIndex, luckyCount);
}

/**
 * 随机抽奖
 */
function random(num) {
    // Math.floor取到0-num-1之间数字的概率是相等的
    return Math.floor(Math.random() * num)
}

/**
 * 切换名牌人员信息
 */
function changeCard(cardIndex, user) {
    let card = threeDCards[cardIndex].element;

    card.innerHTML = `<div class="company">${COMPANY}</div><div class="name">${user[1]}</div><div class="details">${user[0]}<br/>${user[2] || 'PSST'}</div>`;
}

/**
 * 切换名牌背景
 */
function shine(cardIndex, color) {
    let card = threeDCards[cardIndex].element;
    card.style.backgroundColor = color || 'rgba(0,127,127,' + (Math.random() * 0.7 + 0.25) + ')';
}

/**
 * 随机切换背景和人员信息
 */
function shineCard() {
    let maxCard = 15,
        maxUser;
    let shineCard = random(maxCard);

    setInterval(() => {
        // 正在抽奖停止闪烁
        if (isLotting) {
            return;
        }
        maxUser = basicData.leftUsers.length;
        for (let i = 0; i < shineCard; i++) {
            let index = random(maxUser),
                cardIndex = random(TOTAL_CARDS);
            // 当前显示的已抽中名单不进行随机切换
            if (selectedCardIndex.includes(cardIndex)) {
                continue;
            }
            shine(cardIndex);
            changeCard(cardIndex, basicData.leftUsers[index])
        }
    }, 500);
}

let onload = window.onload;

window.onload = function () {
    onload && onload();

    let music = document.querySelector('#music');


    let rotated = 0,
        stopAnimate = false,
        musicBox = document.querySelector('#musicBox');

    function animate() {
        requestAnimationFrame(function () {
            if (stopAnimate) {
                return;
            }
            rotated = rotated % 360;
            musicBox.style.transform = 'rotate(' + rotated + 'deg)';
            rotated += 1;
            animate();
        });
    }

    musicBox.addEventListener('click', function (e) {
        if (music.paused) {
            music.play().then(() => {
                stopAnimate = false;
                animate();
            }, () => {
                addQipao('背景音乐自动播放失败，请手动播放！')
            });
        } else {
            music.pause();
            stopAnimate = true;
        }
    }, false);

    setTimeout(function () {
        musicBox.click();
    }, 1000);
}
