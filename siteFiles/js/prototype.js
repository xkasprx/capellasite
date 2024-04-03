(() => {
	Window.prototype.imageLoaded = el => el.removeAttribute(`onload`);
})();