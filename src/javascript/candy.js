document.addEventListener('DOMContentLoaded', () => {
	const candyGrid = document.querySelector('.candyGrid');
	const scoreDiv = document.getElementById('score');
	const gridWidth = 8;
	const squares = [];
	const candyImages = [
		'url(images/red-candy.png)',
		'url(images/yellow-candy.png)',
		'url(images/orange-candy.png)',
		'url(images/purple-candy.png)',
		'url(images/green-candy.png)',
		'url(images/blue-candy.png)',
	];
	let score = 0;

	//create board

	function getCandyImage() {
		const candy = candyImages[Math.floor(Math.random() * candyImages.length)];
		return candy;
	}

	function createBoard() {
		for (let i = 0; i < gridWidth * gridWidth; i++) {
			const square = document.createElement('div');
			square.setAttribute('draggable', true);
			square.setAttribute('id', i);
			square.style.backgroundImage = getCandyImage();
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
		colorBeingDragged = this.style.backgroundImage;
		squareIdBeingDragged = parseInt(this.id);
		console.log(this.id, colorBeingDragged, 'dragStart');
	}
	function dragEnd() {
		console.log(this.id, 'dragEnd');
		const validMoves = [
			squareIdBeingDragged + 1,
			squareIdBeingDragged - 1,
			squareIdBeingDragged + gridWidth,
			squareIdBeingDragged - gridWidth,
		];
		let validMove = validMoves.includes(squareIdBeingReplaced);
		if (!validMove && squareIdBeingReplaced) {
			squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplace;
			squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
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
		colorBeingReplace = this.style.backgroundImage;
		squareIdBeingReplaced = parseInt(this.id);
		squares[squareIdBeingReplaced].style.backgroundImage = colorBeingDragged;
		squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplace;
		console.log(this.id, colorBeingReplace, 'dragDrop');
	}

	//Checking for matches

	function checkRowForNum(num) {
		let invalidMoves = [];
		for (let i = 1; i < gridWidth; i++) {
			for (let j = 1; j < num; j++) {
				invalidMoves.push(i * gridWidth - j);
			}
		}
		for (let i = 0; i < Math.pow(gridWidth, 2) - (num - 1); i++) {
			if (invalidMoves.includes(i)) continue;
			let rowOfNum = [];
			for (let j = i; j < i + num; j++) {
				rowOfNum.push(j);
			}
			let decidedColor = squares[i].style.backgroundImage;
			if (rowOfNum.every((index) => squares[index].style.backgroundImage === decidedColor)) {
				score += num;
				rowOfNum.forEach((index) => {
					squares[index].style.backgroundImage = '';
				});
				score += 1;
			}
		}
	}

	function checkColumnForNum(num) {
		for (let i = 0; i < Math.pow(gridWidth, 2) - gridWidth * (num - 1); i++) {
			let columnOfNum = [];
			for (let j = i; j < i + (num - 1) * gridWidth + 1; j += gridWidth) {
				columnOfNum.push(j);
			}
			let decidedColor = squares[i].style.backgroundImage;
			if (columnOfNum.every((index) => squares[index].style.backgroundImage === decidedColor)) {
				score += num;
				columnOfNum.forEach((index) => {
					squares[index].style.backgroundImage = '';
				});
				score += 1;
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

	//drop candies once some have been cleared
	function moveDown() {
		for (let i = 0; i < Math.pow(gridWidth, 2) - gridWidth - 1; i++) {
			if (squares[i + gridWidth].style.backgroundImage === '') {
				squares[i + gridWidth].style.backgroundImage = squares[i].style.backgroundImage;
				squares[i].style.backgroundImage = '';
			}
		}
		for (let i = 0; i < gridWidth; i++) {
			if (squares[i].style.backgroundImage === '')
				squares[i].style.backgroundImage = getCandyImage();
		}
	}

	window.setInterval(() => {
		moveDown();
		checkRowsAndColumns();
		scoreDiv.innerHTML = `Score: ${score}`;
	}, 100);
});
