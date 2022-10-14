const wrapper = document.getElementById('tiles')

const getDistance = (y1, x1, y2, x2) => {
	let y = x2 - x1
	x = y2 - y1
	return Math.floor(Math.sqrt(x * x + y * y))
}

const toggleOpacity = (index) => {
	console.log(wrapper)
	const grid = [
		getComputedStyle(wrapper).getPropertyValue('--rows'),
		getComputedStyle(wrapper).getPropertyValue('--columns'),
	]

	const row = Math.floor(index / grid[1])
	col = index % grid[1]
	console.log(row, col)

	wrapper.childNodes.forEach((tile) => {
		let r = Math.floor(tile.dataset.index / grid[1])
		c = tile.dataset.index % grid[1]

		const distance = getDistance(row, col, r, c)

		tile.style.transitionDelay = 80 * distance + 'ms'
		tile.style.opacity = tile.style.opacity == 0 ? 1 : 0
	})
}

const createTile = (index) => {
	const tile = document.createElement('div')
	tile.classList.add('tile')
	tile.dataset.index = index

	tile.addEventListener('click', () => {
		toggleOpacity(index)
	})

	return tile
}

const createTiles = (quantity) => {
	console.log('app')

	Array.from(Array(quantity)).map((tile, index) => {
		wrapper.appendChild(createTile(index))
	})
}

const createGrid = () => {
	wrapper.innerHTML = ''
	let rows = Math.floor(document.body.clientHeight / 50)
	let columns = Math.floor(document.body.clientWidth / 50)

	wrapper.style.setProperty('--rows', rows)
	wrapper.style.setProperty('--columns', columns)

	createTiles(rows * columns)
}

window.onresize = () => createGrid()

createGrid()
