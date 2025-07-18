'use strict'

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
	const deadline = new Date('2025-08-30')

	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds
		const time = Date.parse(endtime) - Date.parse(new Date())

		if (time <= 0) {
			days = 0
			hours = 0
			minutes = 0
			seconds = 0
		} else {
			;(days = Math.floor(time / (1000 * 60 * 60 * 24))),
				(hours = Math.floor((time / (1000 * 60 * 60)) % 24)),
				(minutes = Math.floor((time / (1000 * 60)) % 60)),
				(seconds = Math.floor((time / 1000) % 60))
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
		modalContent = modal.querySelector('.modal__content')

	function openModal() {
		modalContent.classList.add('modal-fade')
		modal.classList.add('show')
		modal.classList.remove('hide')
		document.body.style.overflow = 'hidden'
		clearInterval(modalTimerId)
	}

	function closeModal() {
		modal.classList.add('hide')
		modal.classList.remove('show')
		document.body.style.overflow = ''
	}

	modalOpenBtns.forEach(btn => {
		btn.addEventListener('click', openModal)
	})

	modal.addEventListener('click', event => {
		if (
			event.target === modal ||
			event.target.getAttribute('data-close-modal') === ''
		) {
			closeModal()
		}
	})

	document.body.addEventListener('keydown', event => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModal()
		}
	})

	const modalTimerId = setTimeout(() => {
		openModal()
	}, 500000)

	// Class
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

	fetch('http://localhost:3000/offers', {
		method: 'GET',
		headers: { 'Content-type': 'application/json' },
	})
		.then(response => response.json())
		.then(data => {
			data.forEach(offer => {
				const { src, alt, title, descr, discount, sale } = offer
				new InfoCard(
					src,
					alt,
					title,
					descr,
					discount,
					sale,
					'.offers-items'
				).offerRender()
			})
		})
		.catch(error => console.log(error))

	fetch('http://localhost:3000/daytimes', {
		method: 'GET',
		headers: { 'Content-type': 'application/json' },
	})
		.then(response => response.json())
		.then(data => {
			data.forEach(daytime => {
				const { src, alt, title, descr, discount = null, sale = null } = daytime
				new InfoCard(
					src,
					alt,
					title,
					descr,
					discount,
					sale,
					'.daytime-items'
				).daytimeRender()
			})
		})
		.catch(error => console.log(error))
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

	fetch('http://localhost:3000/leftMenuData', {
		method: 'GET',
		headers: { 'Content-type': 'application/json' },
	})
		.then(response => response.json())
		.then(data => {
			data.forEach(item => {
				const { src, alt, title, sale, descr } = item
				new Menu(src, alt, title, sale, descr, '.menu-items-left').menuRender()
			})
		})
		.catch(error => console.log(error))

	fetch('http://localhost:3000/rightMenuData', {
		method: 'GET',
		headers: { 'Content-type': 'application/json' },
	})
		.then(response => response.json())
		.then(data => {
			data.forEach(item => {
				const { src, alt, title, sale, descr } = item
				new Menu(src, alt, title, sale, descr, '.menu-items-right').menuRender()
			})
		})
		.catch(error => console.log(error))

	// FORM
	const form = document.querySelector('form'),
		telegramTokenBot = '7824698756:AAFdqLjnyXvQ9x-6z_vsVAFI3DbpK0dsyG4',
		chatId = '5553761029'

	const message = {
		loading: 'Loading...',
		success: 'Thanks for contacting with us',
		failure: 'Something went wrong',
	}

	form.addEventListener('submit', event => {
		event.preventDefault()

		const loader = document.createElement('div')
		loader.classList.add('loader')
		loader.style.width = '25px'
		loader.style.height = '25px'
		loader.style.marginTop = '20px'

		form.append(loader)

		const formData = new FormData(form)

		const object = {}
		formData.forEach((value, key) => {
			object[key] = value
		})

		fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text: `Name: ${object.name}, Phone: ${object.phone}`,
			}),
		})
			.then(() => {
				showStatusMessage(message.success)
				form.reset()
			})
			.catch(() => showStatusMessage(message.failure))
			.finally(() => loader.remove())
	})

	function showStatusMessage(message) {
		const modalDialog = document.querySelector('.modal__dialog')

		modalDialog.classList.add('hide')
		openModal()

		const statusModal = document.createElement('div')
		statusModal.classList.add('modal__dialog')
		statusModal.innerHTML = `
				<div class="modal__content">
					<div data-close-modal class="modal__close">&times;</div>
					<div class="modal__title">${message}</div>
				</div>
			`

		document.querySelector('.modal').append(statusModal)

		setTimeout(() => {
			statusModal.remove()
			modalDialog.classList.remove('hide')
			closeModal()
		}, 2000)
	}

	// SLIDER
	const slides = document.querySelectorAll('.offer__slide'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesInner = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width

	let slideIndex = 1,
		offset = 0

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`
		current.textContent = `0${slideIndex}`
	} else {
		total.textContent = slides.length
		current.textContent = slideIndex
	}

	slidesInner.style.width = 100 * slides.length + '%'
	slidesInner.style.display = 'flex'
	slidesInner.style.transition = 'all .5s ease'

	slidesWrapper.style.overflow = 'hidden'

	slides.forEach(slide => {
		slide.style.width = width
	})

	next.addEventListener('click', () => {
		if (offset === +width.replace(/\D/g, '') * (slides.length - 1)) {
			offset = 0
		} else {
			offset += +width.replace(/\D/g, '')
		}
		slidesInner.style.transform = `translateX(-${offset}px)`

		if (slideIndex === slides.length) {
			slideIndex = 1
		} else {
			slideIndex++
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`
		} else {
			current.textContent = slideIndex
		}
	})

	prev.addEventListener('click', () => {
		if (offset === 0) {
			offset = +width.replace(/\D/g, '') * (slides.length - 1)
		} else {
			offset -= +width.replace(/\D/g, '')
		}
		slidesInner.style.transform = `translateX(-${offset}px)`

		if (slideIndex === 1) {
			slideIndex = slides.length
		} else {
			slideIndex--
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`
		} else {
			current.textContent = slideIndex
		}
	})

	// showSlides(slideIndex)

	// if(slides.length < 10){
	// 	total.textContent = `0${slides.length}`
	// }else{
	// 	total.textContent = slides.length
	// }

	// function showSlides(index){
	// 	if(index > slides.length){
	// 		slideIndex = 1
	// 	}

	// 	if(index < 1){
	// 		slideIndex = slides.length
	// 	}

	// 	slides.forEach(slide => slide.style.display = 'none')

	// 	slides[slideIndex - 1].style.display = 'block'

	// 	if(slides.length < 10){
	// 		current.textContent = `0${slideIndex}`
	// 	}else{
	// 		current.textContent = slideIndex
	// 	}

	// }

	// function moveSlides(index){
	// 	showSlides(slideIndex += index)
	// }

	// prev.addEventListener('click', () => moveSlides(-1))

	// next.addEventListener('click', () => moveSlides(1))
})
