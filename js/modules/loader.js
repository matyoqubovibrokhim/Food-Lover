function loader(loaderSelector) {
	const loaderWrapper = document.querySelector(loaderSelector)

	setTimeout(() => {
		loaderWrapper.style.display = 'none'
	}, 1300)
}

export default loader
