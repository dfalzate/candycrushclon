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

	//dragable feature
	squares.forEach((square) => square.addEventListener('dragstart', dragStart));
	squares.forEach((square) => square.addEventListener('dragend', dragEnd));
	squares.forEach((square) => square.addEventListener('dragover', dragOver));
	squares.forEach((square) => square.addEventListener('dragenter', dragEnter));
	squares.forEach((square) => square.addEventListener('dragleave', dragLeave));
	squares.forEach((square) => square.addEventListener('dragdrop', dragDrop));

	function dragStart() {
		console.log(this.id, 'dragStart');
	}
	function dragEnd() {
		console.log(this.id, 'dragEnd');
	}
	function dragOver() {
		console.log(this.id, 'dragOver');
	}
	function dragEnter() {
		console.log(this.id, 'dragEnter');
	}
	function dragLeave() {
		console.log(this.id, 'dragLeave');
	}
	function dragDrop() {
		console.log(this.id, 'dragDrop');
	}
});
