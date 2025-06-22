document.addEventListener('DOMContentLoaded', () => {
	//Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabParents = document.querySelector('.tabheader__items'),
		tabContents = document.querySelectorAll('.tab_content')

	function hideTabContents() {
		tabContents.forEach(tabContent => {
			tabContent.classList.add('hide')
			tabContent.classList.remove('show')
		})

		tabs.forEach(tab => tab.classList.remove('tabheader__item_active'))
	}

	function showTabContent(index = 0) {
		tabContents[index].classList.add('show', 'fade')
		tabContents[index].classList.remove('hide')
		tabs[index].classList.add('tabheader__item_active')
	}

	tabParents.addEventListener('click', event => {
		const target = event.target

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((tab, index) => {
				if (target === tab) {
					hideTabContents()
					showTabContent(index)
				}
			})
		}
	})

	hideTabContents()
	showTabContent()

	// Loader
	const loaderWrapper = document.querySelector('.loader-wrapper')

	setTimeout(() => {
		loaderWrapper.style.display = 'none'
	}, 1300)

	// Timer
	const deadline = new Date('2025-07-01')

	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds
		const time = Date.parse(endtime) - Date.parse(new Date())

		if (time <= 0) {
			days = 0
			hours = 0
			minutes = 0
			seconds = 0
		} else {
			days = Math.floor(time / (1000 * 60 * 60 * 24)),
			hours = Math.floor((time / (1000 * 60 * 60)) % 24),
			minutes = Math.floor((time / (1000 * 60)) % 60),
			seconds = Math.floor((time / 1000) % 60)
		}

		return {
			totalTime: time,
			days,
			hours,
			minutes,
			seconds,
		}
	}

	function formatNumber(number) {
		if (number >= 0 && number < 10) {
			return `0${number}`
		} else {
			return number
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000)

		updateClock()

		function updateClock() {
			const time = getTimeRemaining(endtime)

			days.textContent = formatNumber(time.days)
			hours.textContent = formatNumber(time.hours)
			minutes.textContent = formatNumber(time.minutes)
			seconds.textContent = formatNumber(time.seconds)

			if (time.totalTime <= 0) {
				clearInterval(timeInterval)
			}
		}
	}

	setClock('.timer', deadline)

	// Modal
	const modalOpenBtns = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalContent = modal.querySelector('.modal__content'),
		modalCloseBtn = document.querySelector('[data-close-modal]')

		function openModal() {
			modalContent.classList.add('modal-fade')
			modal.classList.add('show')
			modal.classList.remove('hide')
			document.body.style.overflow = 'hidden'
			clearInterval(modalTimerId)
		}

		function closeModal(){
			modal.classList.add('hide')
			modal.classList.remove('show')
			document.body.style.overflow = ''
		}

		modalOpenBtns.forEach(btn =>{
			btn.addEventListener('click', openModal)
		})

		modalCloseBtn.addEventListener('click', closeModal)

		modal.addEventListener('click', event =>{
			if(event.target === modal ){
				closeModal()
			}
		})

		document.body.addEventListener('keydown', event =>{
			if(event.code === 'Escape' && modal.classList.contains('show')){
				closeModal()
			}
		})

		const modalTimerId = setTimeout(() => {
			openModal()
		}, 4000);

		// Class
		class Menu{
			constructor(src, alt, title, descr, discount, sale, parentSelector){
				this.src = src
				this.alt = alt
				this.title = title
				this.descr = descr
				this.discount = discount
				this.sale = sale
				this.parent = document.querySelector(parentSelector)
			}

			offerRender(){
				const element = document.createElement('div')
				element.innerHTML = `
					<img src=${this.src} alt=${this.alt}>
					<div>
						<h3>${this.title}</h3>
						<p>${this.descr}</p>
						<p><del>$${this.discount}.00</del> <span class="primary-text">$${this.sale}.00</span></p>
					</div>
				`

				this.parent.append(element)
			}

			daytimeRender(){
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

		const offers = [
			{
				src: "./img/offer1.png",
				alt: "Quattro Pasta",
				title: "Quattro Pasta",
				descr: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
				discount: 55,
				sale: 18,
			},
			{
				src: "./img/offer2.png",
				alt: "Vegertarian Pasta",
				title: "Vegertarian Pasta",
				descr: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
				discount: 65,
				sale: 20,
			},
			{
				src: "./img/offer3.png",
				alt: "Gluten-Free Pasta",
				title: "Gluten-Free Pasta",
				descr: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
				discount: 25,
				sale: 15,
			},
		]

		const daytimes = [
			{
				src: "./img/breckfastIcon.png",
				alt: "Breakfast",
				title: "Breakfast",
				descr: "8:00 am to 10:00 am",
			},
			{
				src: "./img/lunchIcon.png",
				alt: "Lunch",
				title: "Lunch",
				descr: "4:00 pm to 7:00 pm",
			},
			{
				src: "./img/dinnerIcon.png",
				alt: "Dinner",
				title: "Dinner",
				descr: "9:00 pm to 1:00 Am",
			},
			{
				src: "./img/dessertIcon.png",
				alt: "Dessert",
				title: "Dessert",
				descr: "All day",
			},
		]

		offers.forEach(offer =>{
			const {src, alt, title, descr, discount, sale} = offer
			new Menu(src, alt, title, descr, discount, sale, '.offers-items').offerRender()
		})

		daytimes.forEach(daytime =>{
			const {src, alt, title, descr, discount = null, sale = null} = daytime
			new Menu(src, alt, title, descr, discount, sale, '.daytime-items').daytimeRender()
		})
})
