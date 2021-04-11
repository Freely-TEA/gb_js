"use strict";
const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 4,
    winScore: 50,
    obstacleCount: 12,
    tickToUpdate:12,
    safeZoneRadius: 2,
};

const config = {
    settings,

    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinScore() {
        return this.settings.winScore;
    },

    getObstacleCount() {
        return this.settings.obstacleCount;
    },

    getTickToUpdate() {
        return this.settings.tickToUpdate;
    },

    getSafeZoneRadius(){
        return this.settings.safeZoneRadius;
    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinScore() < 5 || this.getWinScore() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winScore должно быть в диапазоне [5, 50].');
        }

        if (this.getObstacleCount() < 0 || this.getObstacleCount() > 20){
            result.isValid = false;
            result.errors.push('Неверные настройки, значение obstacleCount должно быть в диапазоне [0, 20].');
        }

        if (this.getSafeZoneRadius() < 1 || this.getSafeZoneRadius() > 4){
            result.isValid = false;
            result.errors.push('Неверные настройки, значение safeZoneRadius должно быть в диапазоне [1, 4].');
        }

        return result;
    },
};

const map = {
    cells: null,
    usedCells: [],

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';

        this.cells = {}; // {x1_y1: td, x1_y2: td}
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');

                this.cells[`x${col}_y${row}`] = td;
                tr.appendChild(td);
            }
        }

    },

    render(snakePointsArray, foodPoint, brickPointArray) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }
        this.usedCells = [];

        snakePointsArray.forEach((point, idx) => {
            console.log([`x${point.x}_y${point.y}`]);
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            snakeCell.classList.add(idx === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);

        brickPointArray.forEach((brickPoint) => {
            const brickCell = this.cells[`x${brickPoint.x}_y${brickPoint.y}`];
            brickCell.classList.add('brick');
            this.usedCells.push(brickCell);
        })
    }
};

const snake = {
    body: null,
    direction: null,
    lastStepDirection: null,
    colsCount: null,
    rowsCount: null,

    init(startBody, direction, colsCount, rowsCount) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
        this.colsCount = colsCount;
        this.rowsCount = rowsCount;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    isOnPoint(point) {
        return this.getBody().some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.body.unshift(this.getNextStepHeadPoint());
        this.body.pop();
    },

    growUp() {
        const lastBodyIdx = this.body.length - 1;
        const lastBodyPoint = this.body[lastBodyIdx];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint); // {...lastBodyPoint}

        this.body.push(lastBodyPointClone);
    },

    getNextStepHeadPoint() {
        const firstPoint = this.getBody()[0];

        switch(this.direction) {
            case 'up':
                if (firstPoint.y - 1 < 0) {
                    return {x: firstPoint.x, y: this.rowsCount - 1};
                }
                return {x: firstPoint.x, y: firstPoint.y - 1};
            case 'right':
                if (firstPoint.x + 1 > this.colsCount -1) {
                    return {x: 0, y: firstPoint.y};
                }
                return {x: firstPoint.x + 1, y: firstPoint.y};
            case 'down':
                if (firstPoint.y + 1 > this.rowsCount -1){   
                    return {x: firstPoint.x, y: 0};
                }
                return {x: firstPoint.x, y: firstPoint.y + 1};
            case 'left':
                if (firstPoint.x - 1 < 0){
                    return {x: this.colsCount -1, y: firstPoint.y};
                }
                return {x: firstPoint.x - 1, y: firstPoint.y};
        }
    },



    setDirection(direction) {
        this.direction = direction;
    },
};

const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};

const obstacle = {
    bricks:null,
    
    init() {
        this.bricks = [];
    },

    getObstacle() {
        return this.bricks;
    },

    setCoordinates(point) {
        this.bricks.push({x:point.x, y:point.y})
    },

    isOnPoint(point) {
        return this.getObstacle().some(bricks => bricks.x === point.x && bricks.y === point.y);
    },

    clearObstacle() {
        this.bricks = [];
    },
}

const score = {
    score: null,
    scoreElement: null,

    init() {
        this.score = 0;
        this.scoreElement = document.getElementById('score');
    },

    getScore() {
        return this.score;
    },

    upScore() {
        this.score++;
    },

    setScoreElement() {
        this.scoreElement.innerHTML = this.score;
    }

};

const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = {
    config,
    map,
    snake,
    food,
    status,
    score,
    obstacle,
    tickInterval: null,
    playedTicks: null,

    init(userSettings = {}) {
        this.config.init(userSettings);
        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.error(err);
            }
            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());

        this.setEventHandlers();
        this.reset();
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up', this.config.getColsCount(), this.config.getRowsCount());
        this.score.init();
        this.obstacle.init();
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        
        const obstacleCount = this.config.getObstacleCount();
        for (let i = 0; i < obstacleCount; i++){
            this.obstacle.setCoordinates(this.getRandomFreeCoordinates(this.createSafeZone()))
        }

        this.playedTicks = 0;
        this.render();
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            }
        ];
    },

    getRandomFreeCoordinates(safeZone=[]) {
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody(), ...this.obstacle.getObstacle(), ...safeZone];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) {
                return rndPoint;
            }
        }
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра закончена', true);
    },

    setPlayButton(textContents, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = textContents;
        isDisabled
            ? playButton.classList.add('disabled')
            : playButton.classList.remove('disabled');
    },

    tickHandler() {
        if (!this.canMakeStep()) {
            return this.finish();
        }

        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.score.upScore();
            this.snake.growUp();
            this.food.setCoordinates(this.getRandomFreeCoordinates());

            if (this.isGameWon()) this.finish();
        }

        this.playedTicks++;
        if (this.playedTicks === this.config.getTickToUpdate()){
            this.repasteObstacle();
            this.playedTicks = 0;
        }

        this.snake.makeStep();
        this.render();
    },

    repasteObstacle() {
        this.obstacle.clearObstacle();
        
        const obstacleCount = this.config.getObstacleCount();
        for (let i = 0; i < obstacleCount; i++){ 
            this.obstacle.setCoordinates(this.getRandomFreeCoordinates(this.createSafeZone()))
        }
    },

    createSafeZone() {
        const snakeHead = this.snake.getBody()[0];
        const safeZone = [];
        const safeZoneRadius = this.config.getSafeZoneRadius();

        //left top angle
        //{x:snakeHead.x -1, y:snakeHead.y +1}                                               
        for (let i = safeZoneRadius; i !== 0; i--){                                  //   left  angle |     top     | right  angle
            for (let j = safeZoneRadius; j !== 0; j--){                              //    left line  |  sneak head |  right line
                safeZone.push({x:snakeHead.x -i, y:snakeHead.y +j});                 //   right angle |    bottom   | right  andle
            };
        };
        //top vertical
        //{x:snakeHead.x, y:snakeHead.y +1}
        for (let i = safeZoneRadius; i !== 0; i--){
            safeZone.push({x:snakeHead.x, y:snakeHead.y +i});
        };
        //right top angle
        //{x:snakeHead.x +1, y:snakeHead.y +1}
        for (let i = safeZoneRadius; i !== 0; i--){
            for (let j = safeZoneRadius; j !== 0; j--){
                safeZone.push({x:snakeHead.x +i, y:snakeHead.y +j});
            };
        };

        //left line
        //{x:snakeHead.x -1, y:snakeHead.y}
        for (let i = safeZoneRadius; i !== 0; i--){
            safeZone.push({x:snakeHead.x -i, y:snakeHead.y});
        };
        //right line
        //{x:snakeHead.x +1, y:snakeHead.y}
        for (let i = safeZoneRadius; i !== 0; i--){
            safeZone.push({x:snakeHead.x +i, y:snakeHead.y});
        };
            
        //left bottom angle
        //{x:snakeHead.x -1, y:snakeHead.y -1}
        for (let i = safeZoneRadius; i !== 0; i--){
            for (let j = safeZoneRadius; j !== 0; j--){
                safeZone.push({x:snakeHead.x -i, y:snakeHead.y -j});
            };
        };
        //bottom vertical
        //{x:snakeHead.x, y:snakeHead.y -1}
        for (let i = safeZoneRadius; i !== 0; i--){
            safeZone.push({x:snakeHead.x, y:snakeHead.y -i});
        };
        //right bottom angle
        //{x:snakeHead.x +1, y:snakeHead.y -1}
        for (let i = safeZoneRadius; i !== 0; i--){
            for (let j = safeZoneRadius; j !== 0; j--){
                safeZone.push({x:snakeHead.x +i, y:snakeHead.y -j});
            };
        };
        console.log(snakeHead);
        console.log(safeZone);
        return safeZone
    },

    canMakeStep() {
        return !this.obstacle.isOnPoint(this.snake.getNextStepHeadPoint());
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) this.snake.setDirection(direction);
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', event => this.keyDownHandler(event));
    },

    isGameWon() {
        return this.score.getScore() > this.config.getWinScore();
    },

    render() {
        this.score.setScoreElement();
        this.map.render(this.snake.getBody(), this.food.getCoordinates(), this.obstacle.getObstacle());
    }
};

game.init();
