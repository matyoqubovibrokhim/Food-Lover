async function getOffers() {
	try {
		const response = await fetch('http://localhost:3000/offers')
		return await response.json()
	} catch (error) {
		console.log(error)
	}
}

async function getDaytimes() {
	try {
		const response = await fetch('http://localhost:3000/daytimes')
		return await response.json()
	} catch (error) {
		console.log(error)
	}
}

async function getLeftData() {
	try {
		const response = await fetch('http://localhost:3000/leftMenuData')
		return await response.json()
	} catch (error) {
		console.log(error)
	}
}

async function getRightData() {
	try {
		const response = await fetch('http://localhost:3000/rightMenuData')
		return await response.json()
	} catch (error) {
		console.log(error)
	}
}

export { getDaytimes, getLeftData, getOffers, getRightData }
