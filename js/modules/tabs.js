function tabs(tabsSelector, tabContentsSelector, tabParentsSelector) {
	const tabs = document.querySelectorAll(tabsSelector),
		tabContents = document.querySelectorAll(tabContentsSelector),
		tabParents = document.querySelector(tabParentsSelector)

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
}

export default tabs
