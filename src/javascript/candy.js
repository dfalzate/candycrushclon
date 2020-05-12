document.addEventListener('DOMContentLoaded', () => {
	const candyGrid = document.querySelector('.candyGrid');
	const gridWidth = 8;
	const squares = [];
	const candyColor = ['red', 'yellow', 'orange', 'purple', 'green', 'blue'];
	let score = 0;

	//create board
	function createBoard() {
		for (let i = 0; i < gridWidth * gridWidth; i++) {
			const square = document.createElement('div');
			let randomColor = candyColor[Math.floor(Math.random() * candyColor.length)];
			square.setAttribute('draggable', true);
			square.setAttribute('id', i);
			square.style.backgroundColor = randomColor;
			candyGrid.appendChild(square);
			squares.push(square);
		}
	}

	createBoard();

	let colorBeingDragged;
	let colorBeingReplace;
	let squareIdBeingDragged;
	let squareIdBeingReplaced;

	//dragable feature
	squares.forEach((square) => square.addEventListener('dragstart', dragStart));
	squares.forEach((square) => square.addEventListener('dragend', dragEnd));
	squares.forEach((square) => square.addEventListener('dragover', dragOver));
	squares.forEach((square) => square.addEventListener('dragenter', dragEnter));
	squares.forEach((square) => square.addEventListener('dragleave', dragLeave));
	squares.forEach((square) => square.addEventListener('drop', dragDrop));

	function dragStart() {
		colorBeingDragged = this.style.backgroundColor;
		squareIdBeingDragged = parseInt(this.id);
		console.log(this.id, colorBeingDragged, 'dragStart');
	}
	function dragEnd() {
		console.log(this.id, 'dragEnd');
		const validMoves = [
			squareIdBeingDragged + 1,
			squareIdBeingDragged - 1,
			squareIdBeingDragged - gridWidth,
			squareIdBeingDragged + gridWidth,
		];
		let validMove = validMoves.includes(squareIdBeingReplaced);
		if (!validMove && squareIdBeingReplaced) {
			squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplace;
			squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
		}
		checkRowsAndColumns();
	}
	function dragOver(e) {
		e.preventDefault();
		console.log(this.id, 'dragOver');
	}
	function dragEnter(e) {
		e.preventDefault();
		console.log(this.id, 'dragEnter');
	}
	function dragLeave() {
		console.log(this.id, 'dragLeave');
	}
	function dragDrop() {
		colorBeingReplace = this.style.backgroundColor;
		squareIdBeingReplaced = parseInt(this.id);
		squares[squareIdBeingReplaced].style.backgroundColor = colorBeingDragged;
		squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplace;
		console.log(this.id, colorBeingReplace, 'dragDrop');
	}

	//Checking for matches

	function checkRowForNum(num) {
		for (let i = 0; i < Math.pow(gridWidth, 2) - (num - 1); i++) {
			let rowOfNum = [];
			for (let j = i; j < i + num; j++) {
				rowOfNum.push(j);
			}
			let decidedColor = squares[i].style.backgroundColor;
			if (rowOfNum.every((index) => squares[index].style.backgroundColor === decidedColor)) {
				score += num;
				rowOfNum.forEach((index) => {
					squares[index].style.backgroundColor = '';
				});
			}
		}
	}

	function checkColumnForNum(num) {
		for (let i = 0; i < Math.pow(gridWidth, 2) - gridWidth * (num - 1); i++) {
			let columnOfNum = [];
			for (let j = i; j < i + (num - 1) * gridWidth + 1; j += gridWidth) {
				columnOfNum.push(j);
			}
			let decidedColor = squares[i].style.backgroundColor;
			if (columnOfNum.every((index) => squares[index].style.backgroundColor === decidedColor)) {
				score += num;
				columnOfNum.forEach((index) => {
					squares[index].style.backgroundColor = '';
				});
			}
		}
	}

	function checkRowsAndColumns() {
		checkRowForNum(5);
		checkRowForNum(4);
		checkRowForNum(3);
		checkColumnForNum(5);
		checkColumnForNum(4);
		checkColumnForNum(3);
	}

	checkRowsAndColumns();
});
