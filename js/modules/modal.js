function openModal(modalContentSelector, modalSelector, modalTimerId) {
	const modalContent = document.querySelector(modalContentSelector)
	const modal = document.querySelector(modalSelector)

	modalContent.classList.add('modal-fade')
	modal.classList.add('show')
	modal.classList.remove('hide')
	document.body.style.overflow = 'hidden'

	if (modalTimerId) {
		clearInterval(modalTimerId)
	}
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector)

	modal.classList.add('hide')
	modal.classList.remove('show')
	document.body.style.overflow = ''
}

function modal(btnSelector, modalSelector, modalContentSelector, modalTimerId) {
	const modalOpenBtns = document.querySelectorAll(btnSelector),
		modal = document.querySelector(modalSelector)

	modalOpenBtns.forEach(btn => {
		btn.addEventListener('click', () =>
			openModal(modalContentSelector, modalSelector, modalTimerId)
		)
	})

	modal.addEventListener('click', event => {
		if (
			event.target === modal ||
			event.target.getAttribute('data-close-modal') === ''
		) {
			closeModal(modalSelector)
		}
	})

	document.body.addEventListener('keydown', event => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModal(modalSelector)
		}
	})
}

export default modal
export { closeModal, openModal }
