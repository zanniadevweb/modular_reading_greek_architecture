function calculateModularity()
{
	var textLength = document.getElementById("inputLength").value; // 8.40
	// textLength = 8.40;

	var textWidth = document.getElementById("inputWidth").value; // 4.60
	// textWidth = 4.60;

	var textUnitValue = document.getElementById("inputUnitValue").value;  // 0.3436;
	// textUnitValue = 0.3436;

	var selectRounding = document.getElementById("selectRounding").value; // 1

	var selectSizeModulo = document.getElementById("selectSizeModulo").value; // 2

	var selectNumberColumns = document.getElementById("selectNumberColumns").value;// 4

	var selectTypeTemple = document.getElementById("selectTypeTemple").value; // Périptère (2n-1)

	var rangeModulosRes = [];
	if (!textUnitValue) {
		// Min Range and Max Range are first expressed in meters without the '0.' for conveniance in for loop. Result is with '0.'
		var minRange = 2940;
		var maxRange = 3500;
		rangeModulosRes = forLoopDigits(minRange, maxRange);

		var feetUnitLengthCountArr = [];
		var feetUnitWidthCountArr = [];

		for (var iRangeModulo = 0; iRangeModulo < rangeModulosRes.length; iRangeModulo++) {
			feetUnitLengthCountArr.push(Math.round(textLength/rangeModulosRes[iRangeModulo]));
			feetUnitWidthCountArr.push(Math.round(textWidth/rangeModulosRes[iRangeModulo]));
		}

	} else {
		var feetUnitLengthCount = Math.round(textLength/textUnitValue);
		var feetUnitWidthCount = Math.round(textWidth/textUnitValue);
	}

	var differenceLengthWidth = textLength - textWidth;

	if (!textLength || !textWidth) // || !textUnitValue
	{
		writeErrorMessage("ATTENTION : Tous les champs doivent être remplis avant calcul");
		writeResultMessage('');
		writeDetailCalculation('');
		writeMoreDetailCalculationLength(false);
		writeMoreDetailCalculationWidth(false);
		writeSummaryMessage('');
	} else if (differenceLengthWidth < 0)
	{
		writeErrorMessage("ATTENTION : La longueur doit être supérieure à la largeur");
		writeResultMessage('');
		writeDetailCalculation('');
		writeMoreDetailCalculationLength(false);
		writeMoreDetailCalculationWidth(false);
		writeSummaryMessage('');
	} else {

		writeErrorMessage('');

		var ratioLengthWidth = textLength/textWidth;
		var roundedRatioLengthWidth = ratioLengthWidth.toFixed(selectRounding);
		var fractionFromFloat = calculateFractionFromFloat(roundedRatioLengthWidth);
		var numberOfSquareByBuildingSide = calculateNumberOfSquareByBuildingSide(textLength, textWidth, selectRounding, selectSizeModulo);
		var commonValueLengthWidth = numberOfSquareByBuildingSide[4];

		if (rangeModulosRes.length > 0) {
			var modulo1Arr = [];
			var modulo2Arr = [];
			for (var iRangeModulo = 0; iRangeModulo < rangeModulosRes.length; iRangeModulo++) {
				modulo1Arr.push((feetUnitLengthCountArr[iRangeModulo] / numberOfSquareByBuildingSide[0]).toFixed(selectRounding));
				modulo2Arr.push((feetUnitWidthCountArr[iRangeModulo] / numberOfSquareByBuildingSide[1]).toFixed(selectRounding));
			}
		}
		else {
			var modulo1 = (feetUnitLengthCount / numberOfSquareByBuildingSide[0]).toFixed(selectRounding);
			var modulo2 = (feetUnitWidthCount / numberOfSquareByBuildingSide[1]).toFixed(selectRounding);
		}

		// ----------------------------------------------------------
		var ratioLongueurTableau = [];
		var ratioLargeurTableau = [];
		ratioLongueurTableau = numberOfSquareByBuildingSide[2];
		ratioLargeurTableau = numberOfSquareByBuildingSide[3];
		// ----------------------------------------------------------

		if (rangeModulosRes.length > 0) {
			for (var iRangeModulo = 0; iRangeModulo < rangeModulosRes.length; iRangeModulo++) {
				console.log(
					iRangeModulo + ". DONNEES : "
				+	"NLO = Nombre pieds / longueur = " + feetUnitLengthCountArr[iRangeModulo] + " ; "
				+ "NLA = Nombre pieds / largeur = " + feetUnitWidthCountArr[iRangeModulo] + " ; "
				+ "RATL = Ratio arrondi (" + selectRounding + " chiffre) longueur / largeur = " + roundedRatioLengthWidth + " ; "
				+ "FLL = Fraction ratio longueur / largeur = " + fractionFromFloat + " ; "
				+ "Longueur & largeur nombre de cases de la grille = " + numberOfSquareByBuildingSide[0] + " & " + numberOfSquareByBuildingSide[1] + " ; "
				+ "Valeur d'un module arrondi (" + selectRounding + " chiffre) : M1 = " + modulo1Arr[iRangeModulo] + " (LONGUEUR) & M2 = " + modulo2Arr[iRangeModulo] + " (LARGEUR) ; "
				);
			}
		} else {
			writeResultMessage(
				"DONNEES : "
			+	"NLO = Nombre pieds / longueur = " + feetUnitLengthCount + " ; "
			+ "NLA = Nombre pieds / largeur = " + feetUnitWidthCount + " ; "
			+ "RATL = Ratio arrondi (" + selectRounding + " chiffre) longueur / largeur = " + roundedRatioLengthWidth + " ; "
			+ "FLL = Fraction ratio longueur / largeur = " + fractionFromFloat + " ; "
			+ "Longueur & largeur nombre de cases de la grille = " + numberOfSquareByBuildingSide[0] + " & " + numberOfSquareByBuildingSide[1] + " ; "
			+ "Valeur d'un module arrondi (" + selectRounding + " chiffre) : M1 = " + modulo1 + " (LONGUEUR) & M2 = " + modulo2 + " (LARGEUR) ; "
			);
		}

		if (rangeModulosRes.length > 0) {
			for (var iRangeModulo = 0; iRangeModulo < rangeModulosRes.length; iRangeModulo++) {
				console.log(
					iRangeModulo + ". DETAIL CALCULS : "
				+	"NLO = Arrondi(" + textLength + " / " + rangeModulosRes[iRangeModulo] + ") ; "
				+	"NLA = Arrondi(" + textWidth + " / " + rangeModulosRes[iRangeModulo] + ") ; "
				+ "RATL = Arrondi(" + textLength + " / " + textWidth + ") ; "
				+ "FLL = Fraction(" + roundedRatioLengthWidth + ") ; "
				+ "M1 = NLO / Nombre cases pour Longueur = " + feetUnitLengthCountArr[iRangeModulo] + " / " +  numberOfSquareByBuildingSide[0] +  ") ; "
				+ "M2 = NLA / Nombre cases pour Largeur = " + feetUnitWidthCountArr[iRangeModulo] + " / " + numberOfSquareByBuildingSide[1] +  ")"
				);
			}
		} else {
			writeDetailCalculation(
				"DETAIL CALCULS : "
			+	"NLO = Arrondi(" + textLength + " / " + textUnitValue + ") ; "
			+	"NLA = Arrondi(" + textWidth + " / " + textUnitValue + ") ; "
			+ "RATL = Arrondi(" + textLength + " / " + textWidth + ") ; "
			+ "FLL = Fraction(" + roundedRatioLengthWidth + ") ; "
			+ "M1 = NLO / Nombre cases pour Longueur = " + feetUnitLengthCount + " / " +  numberOfSquareByBuildingSide[0] +  ") ; "
			+ "M2 = NLA / Nombre cases pour Largeur = " + feetUnitWidthCount + " / " + numberOfSquareByBuildingSide[1] +  ")"
			);
		}

		var removeBeforeLength = removeAllAfterArrayValue(ratioLongueurTableau, commonValueLengthWidth).join(", ");
		var removeAfterLength = removeAllBeforeArrayValue(ratioLongueurTableau, commonValueLengthWidth).slice(1).join(", ");

		if (rangeModulosRes.length > 0) {
			console.log(true, removeBeforeLength, commonValueLengthWidth, removeAfterLength);
		} else {
			writeMoreDetailCalculationLength(true, removeBeforeLength, commonValueLengthWidth, removeAfterLength);
		}

		var removeBeforeWidth = removeAllAfterArrayValue(ratioLargeurTableau, commonValueLengthWidth).join(", ");
		var removeAfterWidth = removeAllBeforeArrayValue(ratioLargeurTableau, commonValueLengthWidth).slice(1).join(", ");

		if (rangeModulosRes.length > 0) {
			console.log(true, removeBeforeWidth, commonValueLengthWidth, removeAfterWidth);
		} else {
			writeMoreDetailCalculationWidth(true, removeBeforeWidth, commonValueLengthWidth, removeAfterWidth);
		}

		if (rangeModulosRes.length > 0) {
			for (var iRangeModulo = 0; iRangeModulo < rangeModulosRes.length; iRangeModulo++) {
				console.log(
					iRangeModulo + ". BILAN : "
				+ feetUnitLengthCountArr[iRangeModulo] + ' PIEDS pour ' + numberOfSquareByBuildingSide[0] + ' CASES (LONGUEUR) '
				+ "et : " + feetUnitWidthCountArr[iRangeModulo] + ' PIEDS pour ' + numberOfSquareByBuildingSide[1] + ' CASES (LARGEUR)' + " ; "
				+ "pour UN MODULE DE : " + modulo1Arr[iRangeModulo] + ' (LONGUEUR) = ' + modulo2Arr[iRangeModulo] + ' (LARGEUR) PIEDS, SOIT : ' + modulo1Arr[iRangeModulo]*rangeModulosRes[iRangeModulo] + '( =('+feetUnitLengthCountArr[iRangeModulo]+'/'+numberOfSquareByBuildingSide[0]+')x'+rangeModulosRes[iRangeModulo]+' ) (LONGUEUR) / ' + modulo2Arr[iRangeModulo]*rangeModulosRes[iRangeModulo] + '( =('+feetUnitWidthCountArr[iRangeModulo]+'/'+numberOfSquareByBuildingSide[1]+')x'+rangeModulosRes[iRangeModulo]+' ) (LARGEUR) m PAR CASE' + " ; "
				);
			}
		} else {
			writeSummaryMessage(
				"BILAN : "
			+ feetUnitLengthCount + ' PIEDS pour ' + numberOfSquareByBuildingSide[0] + ' CASES (LONGUEUR) '
			+ "et : " + feetUnitWidthCount + ' PIEDS pour ' + numberOfSquareByBuildingSide[1] + ' CASES (LARGEUR)' + " ; "
			+ "pour UN MODULE DE : " + modulo1 + ' (LONGUEUR) = ' + modulo2 + ' (LARGEUR) PIEDS, SOIT : ' + modulo1*textUnitValue + '( =('+feetUnitLengthCount+'/'+numberOfSquareByBuildingSide[0]+')x'+textUnitValue+' ) (LONGUEUR) / ' + modulo2*textUnitValue + '( =('+feetUnitWidthCount+'/'+numberOfSquareByBuildingSide[1]+')x'+textUnitValue+' ) (LARGEUR) m PAR CASE' + " ; "
			);
		}

		if (textUnitValue) {
			createGridModulo(numberOfSquareByBuildingSide[0], numberOfSquareByBuildingSide[1]);
			var resultSquareLength = numberOfSquareByBuildingSide[0]; // Nombre de cases en hauteur
			var resultSquareWidth = numberOfSquareByBuildingSide[1]; // Nombre de cases en largeur
			var resultSquareHeight = numberOfSquareByBuildingSide[1]/roundedRatioLengthWidth
			draw(resultSquareLength, resultSquareWidth, selectNumberColumns, selectTypeTemple, resultSquareHeight);
		}

	}
}

function forLoopDigits(minRange, maxRange) {
	var rangeModulos = [];
	var striRangeModulo = '';
	for (var iRangeModulo = minRange; iRangeModulo <= maxRange; iRangeModulo++) {
		striRangeModulo = iRangeModulo.toString();
		rangeModulos.push( +('0'+'.'+striRangeModulo) ) // + in front of string converts it to Number
	}
	return rangeModulos;
}

function removeAllBeforeArrayValue(wholeArray, number) {
	var position = wholeArray.indexOf(number);
	if(position === -1) // not found
		return wholeArray;
	return wholeArray.slice(position);
}

function removeAllAfterArrayValue(wholeArray, number) {
	var arrayBefore = removeAllBeforeArrayValue(wholeArray, number);
	var differenceTwoArrays = wholeArray.filter(x => !arrayBefore.includes(x));
	return differenceTwoArrays;
}

function writeResultMessage(result)
{
	document.getElementById("spanResult").textContent = result;
}

function writeDetailCalculation(detail)
{
	document.getElementById("detailCalculation").textContent = detail;
}

function writeMoreDetailCalculationLength(isFilled, removeBeforeLength, commonValueLengthWidth, removeAfterLength)
{
	var  coloredRatioLength = document.getElementById("moreDetailCalculationLength");
	if (isFilled) {
		coloredRatioLength.innerHTML = "Longueur / valeurs [1-40] (Toujours arrondi au 10ème) : " + removeBeforeLength +  ", " + "<span style='color:red;font-weight: bold;'>"+ commonValueLengthWidth +"</span>" + ", " + removeAfterLength;
	} else{
		coloredRatioLength.innerHTML = '';
	}
}

function writeMoreDetailCalculationWidth(isFilled, removeBeforeWidth, commonValueLengthWidth, removeAfterWidth)
{
	var  coloredRatioWidth = document.getElementById("moreDetailCalculationWidth");
	if (isFilled) {
		coloredRatioWidth.innerHTML = "Largeur / valeurs [1-40] (Toujours arrondi au 10ème) : " + removeBeforeWidth +  ", " + "<span style='color:red;font-weight: bold;'>"+ commonValueLengthWidth +"</span>" +  ", "+ removeAfterWidth;
	} else {
		coloredRatioWidth.innerHTML = '';
	}
}

function writeSummaryMessage(summary)
{
	document.getElementById("summary").textContent = summary;
}

function writeErrorMessage(errorMessage)
{
	document.getElementById("errorMessage").textContent = errorMessage;
}

function calculateNumberOfSquareByBuildingSide(textLength, textWidth, selectRounding, selectSizeModulo) {
	var squareNumbersLengthArray = [];
	var squareNumbersWidthArray = [];
	var ratioLength = 1;
	var ratioWidth = 1;

	for (var i = 1; i <= 40; i++)
	{
		ratioLength = textLength/i;
		ratioWidth = textWidth/i;
		squareNumbersLengthArray.push(ratioLength);
		squareNumbersWidthArray.push(ratioWidth);
	}

	var commonValues = [];

	var roundedSquareNumbersWidthArray = [];
	var roundedSquareNumbersLengthArray = [];
	var currentElementK = 0;
	var currentElementKk = 0;
	var currentElementL = 0;
	for (var k = 0; k < squareNumbersWidthArray.length; k++)
	{
			currentElementK = roundingOneNumberAfterComma(squareNumbersWidthArray[k], selectRounding);
			roundedSquareNumbersWidthArray.push(currentElementK);
	}

	for (var kk = 0; kk < squareNumbersLengthArray.length; kk++)
	{
			currentElementKk = roundingOneNumberAfterComma(squareNumbersLengthArray[kk], selectRounding);
			roundedSquareNumbersLengthArray.push(currentElementKk);
	}

	var indexLength = 0;
	var indexWidth = 0;
	for (var l = 0; l < squareNumbersLengthArray.length; l++)
	{
			currentElementL = roundingOneNumberAfterComma(squareNumbersLengthArray[l], selectRounding);
			indexCurrentWidth = roundedSquareNumbersWidthArray.indexOf(currentElementL) + 1;
			if (roundedSquareNumbersWidthArray.includes(currentElementL) && indexCurrentWidth >= selectSizeModulo)
			{
					commonValues.push(currentElementL);
					break;
			}
	}

	indexLength = roundedSquareNumbersLengthArray.indexOf(commonValues[0]) + 1;
	indexWidth = roundedSquareNumbersWidthArray.indexOf(commonValues[0]) + 1;

	if (indexLength == -1)
	{
		indexLength = i;
	}
	if (indexWidth == -1)
	{
		indexWidth = i
	}

	return [indexLength, indexWidth, roundedSquareNumbersLengthArray, roundedSquareNumbersWidthArray, commonValues[0]];
}

function roundingOneNumberAfterComma(currentNumber, selectRounding)
{
	var strNumber = String(currentNumber).slice(0, 4); // EXTRAIT 3 CHIFFRES APRES VIRGULES
	var realNumber = Number(strNumber);
	return round(realNumber, 1); // ARRONDI CONSTANT 1 CHIFFRE APRES VIGULE
}

function round(value, precision) {
		var multiplier = Math.pow(10, precision || 0);
		return Math.round(value * multiplier) / multiplier;
}

function calculateFractionFromFloat(ratioLengthWidth)
{
	var gcd = function(a, b) {
		if (!b) return a;
		return gcd(b, a % b);
	};

	var fraction = ratioLengthWidth;
	var len = fraction.toString().length - 2;

	var denominator = Math.pow(10, len);
	var numerator = fraction * denominator;

	var divisor = gcd(numerator, denominator);

	numerator /= divisor;
	denominator /= divisor;

	var normalizedFraction = (Math.floor(numerator) + '/' + Math.floor(denominator));
	return normalizedFraction;
}

function createGridModulo(numberModuloLength, numberModuloWidth)
{
	var numberModulo = numberModuloLength*numberModuloWidth;

	// var img_default_copy =  document.getElementById('img');
	var table = document.getElementById('grid-container');
	var gridTemplateColumns = 'grid-template-columns';
	table.style.gridTemplateColumns = "repeat("+numberModuloWidth+", 1fr)";
	table.style.background = "url('temple_b_selinus.png') contain";
	table.innerHTML = "";
	squares = [];
	var square = document.createElement('div');
	square.classList.add("grid-item");

	for (var m = 1; m <= numberModulo; m++) {
			var square = document.createElement('div');
			square.classList.add("grid-item");
			squares.push(square);
	}

	for (var n = 0; n < squares.length; n++) {
		table.appendChild(squares[n]);
	}
}

function draw(resultSquareLength, resultSquareWidth, numberColumns, selectTypeTemple, resultSquareHeight) {

	var typeTemple = '';

	if (selectTypeTemple == 1) {
		typeTemple = 'Périptère (2n-1)';
	} else if (selectTypeTemple == 2) {
		typeTemple = 'Périptère (2n)';
	} else if (selectTypeTemple == 3) {
		typeTemple = 'Périptère (2n+1)';
	} else if (selectTypeTemple == 4) {
		typeTemple = 'Amphiprostyle';
	} else if (selectTypeTemple == 5) {
		typeTemple = 'Colonnade Nord';
	} else if (selectTypeTemple == 6) {
		typeTemple = 'Colonnade Sud';
	} else if (selectTypeTemple == 6) {
		typeTemple = 'Aptère';
	}

	const canvas = document.querySelector('#canvas');

	if (!canvas.getContext) {
			return;
	}
	const ctx = canvas.getContext('2d');
	ctx.canvas.width  = 900
	ctx.canvas.height = 900

	ctx.clearRect(0, 0, canvas.width, canvas.height)

	drawGridOnCanvas(ctx, canvas.width, canvas.height);

	ctx.strokeStyle = 'red';
	ctx.font = "25px serif";
	ctx.lineWidth = 2;

	var x_StartingPoint = 58;
	var x_StartingPointFacade = x_StartingPoint*6.80;
	var y_StartingPoint = 58;
	var y_StartingPointFacade = y_StartingPoint*2;
	var oneSquareSize = 28;

	ctx.fillText("Plan", x_StartingPoint*1.5, 50);

	// DESSIN DU PLAN -------------------------------------------------------------------------------------------------------
	drawBaseRectangle(ctx, x_StartingPoint, y_StartingPoint, oneSquareSize, resultSquareLength, resultSquareWidth);
	if (numberColumns > 0 || typeTemple !== 'Aptère')
	{
			drawColumnDrums(ctx, x_StartingPoint, y_StartingPoint, oneSquareSize, resultSquareLength, resultSquareWidth, numberColumns, typeTemple)
	}
	//  ----------------------------------------------------------------------------------------------------------------------

	ctx.fillText("Élévation", x_StartingPointFacade, 50);
	// DESSIN DE LA FACADE
	drawBaseRectangle(ctx, x_StartingPointFacade, y_StartingPointFacade, oneSquareSize, resultSquareHeight, resultSquareWidth); // COLONNADE
	drawBaseRectangle(ctx, x_StartingPointFacade, y_StartingPointFacade, oneSquareSize, -resultSquareHeight/2, resultSquareWidth); // ENTABLEMENT
	drawBaseTriangle(ctx, x_StartingPointFacade, y_StartingPointFacade, oneSquareSize, -resultSquareHeight/2, resultSquareWidth, numberColumns); // FRONTON
	if (numberColumns > 0 || typeTemple !== 'Aptère')
	{
			drawColumnHeight(ctx, x_StartingPointFacade, y_StartingPointFacade, oneSquareSize, resultSquareHeight, resultSquareWidth, numberColumns)
	}
	//  ----------------------------------------------------------------------------------------------------------------------
}

function drawMoveTo(ctx, x, y) {
	ctx.beginPath();
	ctx.moveTo(x, y);
}

function drawLineTo(ctx, x, y) {
	ctx.lineTo(x, y);
	ctx.stroke();
}

function drawCircleTo(ctx, x, y, radius, startAngle, endAngle) {
	ctx.beginPath();
	ctx.arc(
		x,
		y,
		radius,
		startAngle,
		endAngle
	);
	ctx.stroke();
}

	function drawColumnHeight(ctx, x_StartingPoint, y_StartingPoint, oneSquareSize, resultSquareHeight, resultSquareWidth, numberColumns)
	{
		var positionCenterColX = 0;
		var positionCenterColY = 0;
		var variation = 25;
		var diameterColumn = oneSquareSize/4;

		for (var col = 1 ; col <= numberColumns ; col++)
		{
				currentColumnPositionX = x_StartingPoint - (oneSquareSize/2) + (oneSquareSize/2)*col*2; // DISTANCE PRISE PAR LES COLONNES
				currentColumnPositionY = y_StartingPoint + (oneSquareSize/2) - (oneSquareSize/2); // PLACEMENT COLONNES LE LONG DU MUR

				// drawCircleTo(
				//  ctx,
				//  currentColumnPositionX,
				//      currentColumnPositionY,
				//  diameterColumn,
				//  0,
				//  2 * Math.PI
				// );

				drawMoveTo(ctx, currentColumnPositionX-diameterColumn, currentColumnPositionY);
				drawLineTo(ctx, currentColumnPositionX-diameterColumn, currentColumnPositionY + oneSquareSize*resultSquareHeight);

				drawMoveTo(ctx, currentColumnPositionX+diameterColumn, currentColumnPositionY);
				drawLineTo(ctx, currentColumnPositionX+diameterColumn, currentColumnPositionY + oneSquareSize*resultSquareHeight);
		}
}

function drawColumnDrums(ctx, x_StartingPoint, y_StartingPoint, oneSquareSize, resultSquareLength, resultSquareWidth, numberColumns, typeTemple)
{
	if (typeTemple == 'Périptère (2n-1)' || typeTemple == 'Périptère (2n)' || typeTemple == 'Périptère (2n+1)')
	{
		var peripterType = '';
		if (typeTemple == 'Périptère (2n-1)') {
			peripterType = '2n-1';
		} else if (typeTemple == 'Périptère (2n)') {
			peripterType = '2n';
		} else if (typeTemple == 'Périptère (2n+1)') {
			peripterType = '2n+1';
		}
		drawPeripteralColumns(ctx, x_StartingPoint, y_StartingPoint, oneSquareSize, resultSquareLength, resultSquareWidth, numberColumns, peripterType)
	}
	else if (typeTemple == 'Colonnade Nord' || typeTemple == 'Colonnade Sud')
	{
		var cardinalSide = '';
		if (typeTemple == 'Colonnade Nord') {
			cardinalSide = 'north'
		} else if (typeTemple == 'Colonnade Sud') {
			cardinalSide = 'south'
		}
		drawOneSideColumns(ctx, x_StartingPoint, y_StartingPoint, oneSquareSize, resultSquareLength, resultSquareWidth, numberColumns, cardinalSide)
	}
	else if (typeTemple == 'Amphiprostyle')
	{
		drawTwoSidesColumns(ctx, x_StartingPoint, y_StartingPoint, oneSquareSize, resultSquareLength, resultSquareWidth, numberColumns)
	}
}

function drawColonnade(ctx, fixedColumnDistanceXorY, fixedColumnPositionXorY, oneSquareSize, colIndex, cardinalSide, squareLengthOrWidth)
{
	var x = 0;
	var y = 0;
	var variableColumnDistanceXorY = (oneSquareSize/2)*colIndex*2;
	var A = fixedColumnDistanceXorY + variableColumnDistanceXorY;
	var B = fixedColumnPositionXorY + oneSquareSize;
	var C = fixedColumnPositionXorY + oneSquareSize*squareLengthOrWidth;

	if (cardinalSide == 'north') {
		x = A;
		y = B;
	} else if (cardinalSide == 'south') {
		x = A;
		y = C;
	} else if (cardinalSide == 'west') {
		x = B;
		y = A;
	} else if (cardinalSide == 'east') {
		x = C;
		y = A;
	}

	var columnRadius = oneSquareSize/4;
	var startAngle = 0;
	var endAngle = 2 * Math.PI;

	drawCircleTo(
		ctx,
		x,
		y,
		columnRadius,
		startAngle,
		endAngle
	);
}

function drawPeripteralColumns(ctx, x_StartingPoint, y_StartingPoint, oneSquareSize, resultSquareLength, resultSquareWidth, numberColumns, peripterType)
{
	var ruleLongSides = 0
	if (peripterType == '2n-1') {
		ruleLongSides = (numberColumns*2)-1;
	} else if (peripterType == '2n') {
		ruleLongSides = (numberColumns*2);
	} else if (peripterType == '2n+1') {
		ruleLongSides = (numberColumns*2)+1;
	}

	var fixedColumnDistanceXorY = x_StartingPoint - (oneSquareSize/2);
	var fixedColumnPositionXorY = y_StartingPoint - (oneSquareSize/2);
	var variableColumnDistanceXorY = 0;
	var columnRadius = oneSquareSize/4;

	// DRAW SHORT SIDES
	for (var colShort = 1 ; colShort <= numberColumns ; colShort++)
	{
		drawColonnade(ctx, fixedColumnDistanceXorY, fixedColumnPositionXorY, oneSquareSize, colShort, 'north');
		drawColonnade(ctx, fixedColumnDistanceXorY, fixedColumnPositionXorY, oneSquareSize, colShort, 'south', resultSquareLength);
	}

	// DRAW LONG SIDES
	for (var colLong = 1 ; colLong <= ruleLongSides ; colLong++)
	{
		drawColonnade(ctx, fixedColumnDistanceXorY, fixedColumnPositionXorY, oneSquareSize, colLong, 'west');
		drawColonnade(ctx, fixedColumnDistanceXorY, fixedColumnPositionXorY, oneSquareSize, colLong, 'east', resultSquareWidth);
	}
}

function drawOneSideColumns(ctx, x_StartingPoint, y_StartingPoint, oneSquareSize, resultSquareLength, resultSquareWidth, numberColumns, cardinalSide)
{
	var fixedColumnDistanceXorY = x_StartingPoint - (oneSquareSize/2);
	var fixedColumnPositionXorY = y_StartingPoint - (oneSquareSize/2);
	var columnRadius = oneSquareSize/4;

	for (var col = 1 ; col <= numberColumns ; col++)
	{
		if (cardinalSide == 'north')
		{
			drawColonnade(ctx, fixedColumnDistanceXorY, fixedColumnPositionXorY, oneSquareSize, col, 'north');
		} else if (cardinalSide == 'south') {
			drawColonnade(ctx, fixedColumnDistanceXorY, fixedColumnPositionXorY, oneSquareSize, col, 'south', resultSquareLength);
		}
	}
}

function drawTwoSidesColumns(ctx, x_StartingPoint, y_StartingPoint, oneSquareSize, resultSquareLength, resultSquareWidth, numberColumns)
{
	var fixedColumnDistanceXorY = x_StartingPoint - (oneSquareSize/2);
	var fixedColumnPositionXorY = y_StartingPoint - (oneSquareSize/2);
	var columnRadius = oneSquareSize/4;

	for (var col = 1 ; col <= numberColumns ; col++)
	{
		drawColonnade(ctx, fixedColumnDistanceXorY, fixedColumnPositionXorY, oneSquareSize, col, 'north');
		drawColonnade(ctx, fixedColumnDistanceXorY, fixedColumnPositionXorY, oneSquareSize, col, 'south', resultSquareLength);
	}
}

function drawBaseRectangle(ctx, x_StartingPoint, y_StartingPoint, oneSquareSize, resultSquareLength, resultSquareWidth)
{
	drawMoveTo(ctx, x_StartingPoint, y_StartingPoint);
	drawLineTo(ctx, x_StartingPoint, y_StartingPoint + oneSquareSize*resultSquareLength);

	drawMoveTo(ctx, x_StartingPoint, y_StartingPoint + oneSquareSize*resultSquareLength);
	drawLineTo(ctx, x_StartingPoint + oneSquareSize*resultSquareWidth, y_StartingPoint + oneSquareSize*resultSquareLength);

	drawMoveTo(ctx, x_StartingPoint + oneSquareSize*resultSquareWidth, y_StartingPoint);
	drawLineTo(ctx, x_StartingPoint + oneSquareSize*resultSquareWidth, y_StartingPoint + oneSquareSize*resultSquareLength);

	drawMoveTo(ctx, x_StartingPoint, y_StartingPoint);
	drawLineTo(ctx, x_StartingPoint + oneSquareSize*resultSquareWidth, y_StartingPoint);
}

function drawBaseTriangle(ctx, x_StartingPoint, y_StartingPoint, oneSquareSize, resultSquareLength, resultSquareWidth, numberColumns)
{
	var secretVariationSquares = (Math.sqrt(2))/resultSquareWidth;

	if (resultSquareWidth > 2 && resultSquareWidth <= 4) {
		var secretValue = Math.sqrt(2);
	} else if (resultSquareWidth > 4 && resultSquareWidth <= 6) {
		var secretValue = Math.sqrt(2)+secretVariationSquares;
	} else if (resultSquareWidth > 6 && resultSquareWidth <= 8) {
		var secretValue = Math.sqrt(2)*Math.sqrt(2);
	} else if (resultSquareWidth > 8) {
		var secretValue = Math.sqrt(2)*Math.sqrt(2)*Math.sqrt(2)*Math.sqrt(2);
	}

	// WEST SIDE TRIANGLE
	drawMoveTo(ctx, x_StartingPoint, y_StartingPoint/(secretValue));
	drawLineTo(ctx, x_StartingPoint + (oneSquareSize*resultSquareWidth)/2, y_StartingPoint/(secretValue) + oneSquareSize*resultSquareLength);

	// SOUTH SIDE TRIANGLE // TODO
	// drawMoveTo(ctx, x_StartingPoint, y_StartingPoint);
	// drawLineTo(ctx, x_StartingPoint + oneSquareSize*resultSquareWidth, y_StartingPoint);

	// EAST SIDE TRIANGLE
	drawMoveTo(ctx, x_StartingPoint + oneSquareSize*resultSquareWidth, y_StartingPoint/(secretValue));
	drawLineTo(ctx, x_StartingPoint + (oneSquareSize*resultSquareWidth)/2, y_StartingPoint/(secretValue) + oneSquareSize*resultSquareLength);
}

function drawGridOnCanvas(ctx, width, height)
{
	let s = 28
	let nX = Math.floor(width / s) - 2
	let nY = Math.floor(height / s) - 2
	let pX = width - nX * s
	let pY = height - nY * s

	let pL = Math.ceil(pX / 2) - 0.5
	let pT = Math.ceil(pY / 2) - 0.5
	let pR = width - nX * s - pL
	let pB = height - nY * s - pT

	ctx.strokeStyle = 'lightgrey'
	ctx.beginPath()
	for (var x = pL; x <= width - pR; x += s) {
		ctx.moveTo(x, pT)
		ctx.lineTo(x, height - pB)
	}
	for (var y = pT; y <= height - pB; y += s) {
		ctx.moveTo(pL, y)
		ctx.lineTo(width - pR, y)
	}
	ctx.stroke()
}
