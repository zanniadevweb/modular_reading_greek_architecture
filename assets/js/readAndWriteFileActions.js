function readFile(input) {
	var fileContent = '';
	var fileContentSeparatedLines = [];
	var newFileContentSeparatedLines = [];
	var fileContentLinesAsString = '';
	let file = input.files[0];

	let reader = new FileReader();

	reader.readAsDataURL(file);

	reader.onload = function() {
		fileContent = reader.result
		var gridContainer = document.getElementById('grid-container');
		var gridAutoRows = 'grid-auto-rows';
		var backgroundSize = 'background-size';
		var backgroundRepeat = 'background-repeat';
		var urlFromBase64ImgContent = 'url(\"'+fileContent+'\")';
		gridContainer.style.display = 'grid';
		gridContainer.style.gridAutoRows = '1fr';
		gridContainer.style.background = urlFromBase64ImgContent;
		gridContainer.style.backgroundSize = 'contain';
		gridContainer.style.backgroundRepeat = 'no-repeat';
	};

	reader.onerror = function() {
		console.log(reader.error);
	};
}
