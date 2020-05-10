document.addEventListener('DOMContentLoaded', () => {
	const candyGrid = document.querySelector('.candyGrid');
	const width = 8;
	const squares = [];
	const candyColor = ['red', 'yellow', 'orange', 'purple', 'green', 'blue'];

	//create board
	function createBoard() {
		for (let i = 0; i < width * width; i++) {
			const square = document.createElement('div');
			let randomColor =
				candyColor[Math.floor(Math.random() * candyColor.length)];
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
});
