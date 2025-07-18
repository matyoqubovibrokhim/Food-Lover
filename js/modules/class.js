import {
	getDaytimes,
	getLeftData,
	getOffers,
	getRightData,
} from '../services/getResources'

function classCard(
	offerSelector,
	daytimeSelector,
	leftMenuSelector,
	rightMenuSelector
) {
	class InfoCard {
		constructor(src, alt, title, descr, discount, sale, parentSelector) {
			this.src = src
			this.alt = alt
			this.title = title
			this.descr = descr
			this.discount = discount
			this.sale = sale
			this.parent = document.querySelector(parentSelector)
		}

		offerRender() {
			const element = document.createElement('div')
			element.innerHTML = `
					<img src=${this.src} alt=${this.alt}>
					<div>
						<h3>${this.title}</h3>
						<p>${this.descr}</p>
						<p><del>${this.discount}</del> <span class="primary-text">${this.sale}</span></p>
					</div>
				`

			this.parent.append(element)
		}

		daytimeRender() {
			const element = document.createElement('div')
			element.classList.add('daytime-item')
			element.innerHTML = `
					<img src=${this.src} alt=${this.alt}>
					<h3>${this.title}</h3>
					<p>${this.descr}</p>
				`

			this.parent.append(element)
		}
	}

	getOffers().then(data => {
		data.forEach(offer => {
			const { src, alt, title, descr, discount, sale } = offer
			new InfoCard(
				src,
				alt,
				title,
				descr,
				discount,
				sale,
				offerSelector
			).offerRender()
		})
	})

	getDaytimes().then(data => {
		data.forEach(daytime => {
			const { src, alt, title, descr, discount = null, sale = null } = daytime
			new InfoCard(
				src,
				alt,
				title,
				descr,
				discount,
				sale,
				daytimeSelector
			).daytimeRender()
		})
	})

	class Menu {
		constructor(src, alt, title, sale, descr, parentSelector) {
			this.src = src
			this.alt = alt
			this.title = title
			this.sale = sale
			this.descr = descr
			this.parent = document.querySelector(parentSelector)
		}

		menuRender() {
			const element = document.createElement('div')
			element.classList.add('menu-item')
			element.innerHTML = `
					<img src=${this.src} alt=${this.alt}>
					<div>
						<h3>${this.title} <span class="primary-text">${this.sale}</span></h3>
						<p>${this.descr}</p>
					</div>
				`

			this.parent.append(element)
		}
	}

	getLeftData().then(data => {
		data.forEach(item => {
			const { src, alt, title, sale, descr } = item
			new Menu(src, alt, title, sale, descr, leftMenuSelector).menuRender()
		})
	})

	getRightData().then(data => {
		data.forEach(item => {
			const { src, alt, title, sale, descr } = item
			new Menu(src, alt, title, sale, descr, rightMenuSelector).menuRender()
		})
	})
}

export default classCard
