'use strict';
const settings = {
    rowCount: 8,
    colCount: 9,
};

const game = {
    settings,
    containerElement: null,
    color: 'white', // a8 - белая
    cellElements: [],
    figuresPosition: {
        'pawn(b)': [71, 72, 73, 74, 75, 76, 77, 78],
        'rook(b)': [81, 88],
        'knight(b)': [82, 87],
        'bishop(b)': [83, 86],
        'queen(b)': [84],
        'king(b)': [85],
        'pawn(w)': [21, 22, 23, 24, 25, 26, 27, 28],
        'rook(w)': [11, 18],
        'knight(w)': [12, 17],
        'bishop(w)': [13, 16],
        'queen(w)': [14],
        'king(w)': [15],
    },

    init() {
        this.containerElement = document.querySelector('#game');
        this.initCells()
    },
    
    initCells() {
        this.cellElements = [];
        //first line
        for (let row = 0; row < this.settings.rowCount; row++) {
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);

            for (let col = 0; col < this.settings.colCount; col++) {

                const cell = document.createElement('td');
                let id = ((row - 8) * -1);
                if (col == 0){
                    cell.innerHTML = ((row - 8) * -1);
                    cell.style.backgroundImage = 'url(texture/wood.png)'
                } else {
                    cell.style.backgroundColor = (this.getColor());
                    cell.id = (id + '' + col);
                    
                };
                id = ((row - 8) * -10 + col);
                let figure = null;
                figure  = this.checkFigures(id);
                if (figure){
                    console.log(figure);
                    cell.style.backgroundImage = figure
                };
                trElem.appendChild(cell);
                this.cellElements.push(cell);
            }
            //reset color
            this.getColor();
        }

        //sumbols line
        const trElem = document.createElement('tr');
        this.containerElement.appendChild(trElem);
        for (let col = 0; col < this.settings.colCount; col++) {
            const cell = document.createElement('td');
            if (!col == 0){
                cell.innerHTML = this.vocubulary(col);
            };
            cell.style.backgroundImage = 'url(texture/wood.png)'
            trElem.appendChild(cell);

            this.cellElements.push(cell);
        }
    },

    getColor(){
        switch (this.color) {
            case 'white':
                this.color = 'black';
                return 'white';
            case 'black':
                this.color = 'white';
                return 'black';
        }
    },

    vocubulary(col) {
        switch (col){
            case 0:
                return '';
            case 1:
                return 'A';
            case 2:
                return 'B';
            case 3:
                return 'C';
            case 4:
                return 'D';
            case 5:
                return 'E';
            case 6:
                return 'F';
            case 7:
                return 'G';
            case 8:
                return 'H';
        }

    },

    //figures
    checkFigures(id) {
        for (const figure in this.figuresPosition){
            for (const pos of this.figuresPosition[figure]){
                if (pos === id){
                    return 'url("figures/' + figure + '.png")'
                }
            }
        }
    }

};

game.init()