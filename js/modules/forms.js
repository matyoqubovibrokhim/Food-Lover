import { closeModal, openModal } from './modal'

function forms(formSelector, modalTimerId) {
	const form = document.querySelector(formSelector),
		telegramTokenBot = 'YOUR_BOT_TOKEN', // your real telegram tokenBot
		chatId = 'YOUR_CHAT_ID' // your telegram bot chatId

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

		sendMessage(loader, object)
	})

	async function sendMessage(loader, object) {
		try {
			await fetch(
				`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`,
				{
					method: 'POST',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify({
						chat_id: chatId,
						text: `Name: ${object.name}, Phone: ${object.phone}`,
					}),
				}
			)
			showStatusMessage(message.success)
		} catch (error) {
			showStatusMessage(message.failure)
		} finally {
			loader.remove()
			form.reset()
		}
	}

	function showStatusMessage(message) {
		const modalDialog = document.querySelector('.modal__dialog')

		modalDialog.classList.add('hide')
		openModal('.modal__content', '.modal', modalTimerId)

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
			closeModal('.modal')
		}, 2000)
	}
}

export default forms
