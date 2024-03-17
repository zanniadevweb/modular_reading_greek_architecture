function generate3dTemple(length, width, numberColShortSide, heightColumn, idFactorRuleNumberColSide, scene) {
  setUp(scene);
  drawArchitecturalElements(length, width, numberColShortSide, heightColumn, idFactorRuleNumberColSide, scene);
}

function calculateHeightAboveZeroYaxis(zeroYaxis, heightValue) {
  return heightValue - zeroYaxis
}

function ratioLengthWidth(value, modulo = 1.8) {
  return value/1.8;
}

function drawArchitecturalElements(length, width, numberColShortSide, heightColumn, idFactorRuleNumberColSide, scene) {
  var width = document.getElementById('inputLength').value;
  if (width == '') {
    width = 30
  }
  var length = document.getElementById('inputWidth').value;
  if (length == '') {
    length = 60
  }

  var podiumResult;
  var podiumHeight = 1; // TODO : VALEUR FIXE POUR LE MOMENT
  podiumResult = drawPodium(width, length, podiumHeight);
  scene.add(podiumResult);
  podiumResult.position.y = podiumHeight/2

  var podiumPositionY = podiumHeight

  var distBetwCols = 0;

  var compensatingDistBetwColsPositionArray = ['null', 'null', 'null', 'null', 'null', 0, -5.5, -11, -16.5, -22, -27.5];
  var compensatingDistBetwColsPosition = 0;
  compensatingDistBetwColsPosition = compensatingDistBetwColsPositionArray[distBetwCols];

  var podiumHeightCompensate = calculateHeightAboveZeroYaxis(distBetwCols, podiumHeight)
  podiumHeightCompensate = podiumHeightCompensate;

  var thicknessColumn = 2; // TODO : C'est une valeur fixe pour le moment
  var colonnaded = 'peripteral'; // TODO : C'est une valeur fixe pour le moment
  var facadeType = 'prostyle'; // TODO : C'est une valeur fixe pour le moment
  var rangeHeightColumns = [6, 20];

  var distBetwColsCompensate = - podiumHeightCompensate

  var columnResult = null;

  var numberColLongSide = 0;
  var architraveHeight = 1.25
  var doricFriseHeight = 1.25
  var heightPodiumPosition = -2.5
  var heightFrontonPosition = -10
  var heightCapital = 0.75;
  var compensatingCapitalHeight = 2.75;
  var baseThickness = 1.25;
  var heightArchitravePosition = 0;
  var heightDoricFriseBlockPosition = 0;

  if (idFactorRuleNumberColSide == 'two_n_minus_one') {
    numberColLongSide = numberColShortSide*2 - 1;
  } else if (idFactorRuleNumberColSide == 'two_n') {
    numberColLongSide = numberColShortSide*2;
  } else if (idFactorRuleNumberColSide == 'two_n_plus_one') {
    numberColLongSide = numberColShortSide*2 + 1;
  }

  if (colonnaded === 'apteral') {
    if (facadeType !== 'apteral_facade') {
      distBetwCols = createOneSideWall('north', numberColShortSide, heightColumn, heightCapital, numberColShortSide, numberColLongSide, baseThickness, width, length, podiumPositionY, scene);
    }
    createOneSideWall('south', numberColShortSide, heightColumn, heightCapital, numberColShortSide, numberColLongSide, baseThickness, width, length, podiumPositionY, scene);
    createOneSideWall('west', numberColLongSide, heightColumn, heightCapital, numberColLongSide, numberColLongSide, baseThickness, width, length, podiumPositionY, scene, distBetwCols);
    createOneSideWall('east', numberColLongSide, heightColumn, heightCapital, numberColLongSide, numberColLongSide, baseThickness, width, length, podiumPositionY, scene, distBetwCols);
  }

  if (colonnaded === 'peripteral') {
    if (facadeType !== 'apteral_facade') {
      distBetwCols = createOneSideCol('north', numberColShortSide, heightColumn, heightCapital, numberColShortSide, numberColLongSide, baseThickness, width, length, podiumPositionY, scene);
    }
    createOneSideCol('south', numberColShortSide, heightColumn, heightCapital, numberColShortSide, numberColLongSide, baseThickness, width, length, podiumPositionY, scene);
    createOneSideCol('west', numberColLongSide, heightColumn, heightCapital, numberColLongSide, numberColLongSide, baseThickness, width, length, podiumPositionY, scene, distBetwCols);
    createOneSideCol('east', numberColLongSide, heightColumn, heightCapital, numberColLongSide, numberColLongSide, baseThickness, width, length, podiumPositionY, scene, distBetwCols);
  }

  architraveResult = drawArchitrave(width, length);
  scene.add(architraveResult);
  heightArchitravePosition = ratioLengthWidth(heightColumn) + heightCapital*2.25;
  architraveResult.position.y = heightArchitravePosition;

  var shortSideMetopesNumber = (numberColShortSide)*2 + 1;
  var longSideMetopesNumber = (numberColLongSide)*2 + 1 // TODO
  var allMetopesNumber = shortSideMetopesNumber*2 + longSideMetopesNumber*2
  var triglyphLength = 1;

  doricFriseBlockResult = drawArchitrave(width, length);
  scene.add(doricFriseBlockResult);
  heightDoricFriseBlockPosition = heightArchitravePosition + heightCapital*1.65;
  doricFriseBlockResult.position.y = heightDoricFriseBlockPosition;
  // createDoricFrise(width, length, [shortSideMetopesNumber, longSideMetopesNumber, allMetopesNumber], triglyphLength, doricFriseHeight, compensatingCapitalHeight, thicknessColumn, distBetwCols, heightColumn, width, length, idFactorRuleNumberColSide, numberColLongSide, distBetwColsCompensate, compensatingDistBetwColsPosition, scene);
}

function createOneSideCol(cardinalSide, numberCol, heightColumn, heightCapital, numberColShortSide, numberColLongSide, baseThickness, width, length, podiumPositionY, scene, preCalculatedDistBetwCols = 0) {
    var cardinalDirection = null;
    var side = null;

    if (cardinalSide === 'north' || cardinalSide === 'south') {
      cardinalDirection = 1;
      side = width;
    } else if (cardinalSide === 'west' || cardinalSide === 'east') {
      cardinalDirection = -1;
      side = length;
    }

    var columnPositionX = 0;
    var variableColumnDistanceXorY = 0;
    var wholeBaseRange = numberCol * baseThickness
    // --------------------------------------------------------------------
    var availablePlaceForDistBetwCols_X = (side - wholeBaseRange) - ( baseThickness )
    var availablePlaceBetweenColBases_X = availablePlaceForDistBetwCols_X / (numberCol - 1)
    var distBetwCols = availablePlaceBetweenColBases_X

    var X_North_South = null;
    var X_West = -width/2 + baseThickness;
    var X_East = width/2 - baseThickness;
    var Y_fut = ratioLengthWidth(podiumPositionY) + ratioLengthWidth(heightColumn/2);
    var Y_abaque = ratioLengthWidth(podiumPositionY) + ratioLengthWidth(heightColumn) + ratioLengthWidth(heightCapital);
    var Y_echine = ratioLengthWidth(podiumPositionY) + ratioLengthWidth(heightColumn);
    var Z_West_East = null;
    var Z_North = length/2 - baseThickness;
    var Z_South = -length/2 + baseThickness;

    availablePlaceBetweenColBases_X = distBetwCols + baseThickness
    for (var iCol = 0; iCol < numberCol; iCol++) {
      variableColumnDistanceX = (availablePlaceBetweenColBases_X)*iCol;
      columnPositionX = baseThickness + variableColumnDistanceX;
      X_North_South = -width/2 + columnPositionX;
      Z_West_East = -length/2 + columnPositionX;

      columnResult = drawOneSideColumns(false, 'lightgoldenrodyellow', ratioLengthWidth(heightColumn), ratioLengthWidth(heightCapital), 'doric', baseThickness);
      scene.add(columnResult[0]); // FÛT
      scene.add(columnResult[1]); // ABAQUE
      scene.add(columnResult[2]); // ECHINE
      if (cardinalDirection == -1 && cardinalSide === 'west') {
        columnResult[0].position.x = X_West
        columnResult[0].position.y = Y_fut
        columnResult[0].position.z = Z_West_East
        columnResult[1].position.x = X_West
        columnResult[1].position.y = Y_abaque
        columnResult[1].position.z = Z_West_East
        columnResult[2].position.x = X_West
        columnResult[2].position.y = Y_echine
        columnResult[2].position.z = Z_West_East
      } else if (cardinalDirection == -1 && cardinalSide === 'east') {
        columnResult[0].position.x = X_East
        columnResult[0].position.y = Y_fut
        columnResult[0].position.z = Z_West_East
        columnResult[1].position.x = X_East
        columnResult[1].position.y = Y_abaque
        columnResult[1].position.z = Z_West_East
        columnResult[2].position.x = X_East
        columnResult[2].position.y = Y_echine
        columnResult[2].position.z = Z_West_East
      } else if (cardinalDirection == 1 && cardinalSide === 'north') {
        columnResult[0].position.x = X_North_South
        columnResult[0].position.y = Y_fut
        columnResult[0].position.z = Z_North
        columnResult[1].position.x = X_North_South
        columnResult[1].position.y = Y_abaque
        columnResult[1].position.z = Z_North
        columnResult[2].position.x = X_North_South
        columnResult[2].position.y = Y_echine
        columnResult[2].position.z = Z_North
      } else if (cardinalDirection == 1 && cardinalSide === 'south') {
        columnResult[0].position.x = X_North_South
        columnResult[0].position.y = Y_fut
        columnResult[0].position.z = Z_South
        columnResult[1].position.x = X_North_South
        columnResult[1].position.y = Y_abaque
        columnResult[1].position.z = Z_South
        columnResult[2].position.x = X_North_South
        columnResult[2].position.y = Y_echine
        columnResult[2].position.z = Z_South
      }
    }

    return distBetwCols;
}

function createOneSideWall(cardinalSide, numberCol, heightColumn, heightCapital, numberColShortSide, numberColLongSide, baseThickness, width, length, podiumPositionY, scene, preCalculatedDistBetwCols = 0) {
    var cardinalDirection = null;
    var side = null;

    if (cardinalSide === 'north' || cardinalSide === 'south') {
      cardinalDirection = 1;
      side = width;
    } else if (cardinalSide === 'west' || cardinalSide === 'east') {
      cardinalDirection = -1;
      side = length;
    }

    var columnPositionX = 0;
    var variableColumnDistanceXorY = 0;
    var wholeBaseRange = numberCol * baseThickness
    // --------------------------------------------------------------------
    var availablePlaceForDistBetwCols_X = (side - wholeBaseRange) - ( baseThickness )
    var availablePlaceBetweenColBases_X = availablePlaceForDistBetwCols_X / (numberCol - 1)
    var distBetwCols = availablePlaceBetweenColBases_X

    var X_North_South = null;
    var X_West = -width/2 + baseThickness/2;
    var X_East = width/2 - baseThickness/2;
    var Y = ratioLengthWidth(podiumPositionY) + ratioLengthWidth(heightColumn/2);
    var Z_West_East = null;
    var Z_North = length/2 - baseThickness/2;
    var Z_South = -length/2 + baseThickness/2;

    availablePlaceBetweenColBases_X = distBetwCols + baseThickness
    for (var iCol = 0; iCol < numberCol; iCol++) {
      variableColumnDistanceX = (availablePlaceBetweenColBases_X)*iCol;
      columnPositionX = baseThickness + variableColumnDistanceX;
      X_North_South = -width/2 + columnPositionX;
      Z_West_East = -length/2 + columnPositionX;

      sideWalls = drawOneSideWall(false, 'lightgoldenrodyellow', ratioLengthWidth(heightColumn));
      backWall = drawOneSideWall(true, 'lightgoldenrodyellow', ratioLengthWidth(heightColumn));
      if (cardinalDirection == -1 && cardinalSide === 'west') {
        sideWalls.position.x = X_West
        sideWalls.position.y = Y
        sideWalls.position.z = Z_West_East
      } else if (cardinalDirection == -1 && cardinalSide === 'east') {
        sideWalls.position.x = X_East
        sideWalls.position.y = Y
        sideWalls.position.z = Z_West_East
      } else if (cardinalDirection == 1 && cardinalSide === 'south') {
        backWall.position.x = X_North_South
        backWall.position.y = Y
        backWall.position.z = Z_South
      }

      if (sideWalls.position.x !== 0 || sideWalls.position.y !== 0 || sideWalls.position.z !== 0) {
        scene.add(sideWalls);
      }
      if (backWall.position.x !== 0 || backWall.position.y !== 0 || backWall.position.z !== 0) {
        scene.add(backWall);
      }
    }
}

function drawOneSideColumns(angleRotation = false, color = 'lightgoldenrodyellow', heightColumn = 10, heightCapital = 5, capitalOrder = 'doric', baseThickness = 1.25)
{
  if (capitalOrder === 'doric') {
    var echinusModel = new THREE.CylinderGeometry( ratioLengthWidth(1.5), ratioLengthWidth(heightCapital), 0.75, 12 );
    var material = new THREE.MeshStandardMaterial({color: 'lightgoldenrodyellow'});
    var cylinderEchinus = new THREE.Mesh(echinusModel, material);

    var abacusModel = new THREE.BoxGeometry( ratioLengthWidth(3), ratioLengthWidth(heightCapital), ratioLengthWidth(3), 12 );
    var material = new THREE.MeshLambertMaterial({color: 'lightgoldenrodyellow'});
    var boxAbacus = new THREE.Mesh(abacusModel, material);

    var columnModel = new THREE.CylinderGeometry( ratioLengthWidth(1), ratioLengthWidth(baseThickness), heightColumn, 12 );
    var material = new THREE.MeshPhongMaterial({color: color});
    var cylinder = new THREE.Mesh(columnModel, material);

    return [cylinder, boxAbacus, cylinderEchinus];
  }
}

function drawOneSideWall(angleRotation = false, color = 'lightgoldenrodyellow', heightWall = 15, lengthWall = 5)
{
  var wallModel = new THREE.BoxGeometry( 1, heightWall, lengthWall );
  var material = new THREE.MeshPhongMaterial({color: color});
  var rectangle = new THREE.Mesh(wallModel, material);
  if (angleRotation == true) {
    rectangle.rotation.z = Math.PI / 2;
    rectangle.rotation.y = Math.PI / 2;
    rectangle.rotation.x = Math.PI / 2;
  }
  return rectangle;
}

function drawPodium(sizePodiumLength = 20, sizePodiumWidth = 20, podiumHeight = 5)
{
  var podiumModel = new THREE.BoxGeometry( sizePodiumLength, podiumHeight, sizePodiumWidth, 12 );
  var material = new THREE.MeshLambertMaterial({color: 'lightgoldenrodyellow'});
  var box = new THREE.Mesh(podiumModel, material);
  return box;
}

function drawArchitrave(sizeArchitraveLength = 20, sizeArchitraveWidth = 20, architraveHeight = 1.25)
{
  var architraveModel = new THREE.BoxGeometry( sizeArchitraveLength, architraveHeight, sizeArchitraveWidth, 12 );
  var material = new THREE.MeshLambertMaterial({color: 'lightgoldenrodyellow'});
  var box = new THREE.Mesh(architraveModel, material);
  return box;
}

function createDoricFrise(sizeDoricFriseLength = 20, sizeDoricFriseWidth = 20, metopesNumber, triglyphLength = 1, doricFriseHeight = 1.25, compensatingCapitalHeight, thicknessColumn, distBetwCols, heightColumn, width, length, idFactorRuleNumberColSide, numberColLongSide, distBetwColsCompensate, compensatingDistBetwColsPosition, scene)
{
  // NORTH
  doricFriseResult = drawDoricFrise(false, sizeDoricFriseLength, sizeDoricFriseWidth, metopesNumber[0], 1, doricFriseHeight);
  for (var i = 1; i <= metopesNumber[0]; i++) {
    scene.add(doricFriseResult[i]);

    doricFriseResult[i].position.z = 2.5 + distBetwColsCompensate/2; // NOMBRE MAGIQUE ?

    var totalLengthArchitrave = width + thicknessColumn;

    if (i <= metopesNumber[0]) {
      if (i == 1) {
        doricFriseResult[i].position.x = -thicknessColumn - distBetwColsCompensate/2;
      } else if (i == metopesNumber[0]) {
        doricFriseResult[i].position.x = totalLengthArchitrave + distBetwColsCompensate/2;
      } else {
        doricFriseResult[i].position.x = distBetwCols/2*i - distBetwCols;
      }
    }

    doricFriseResult[i].position.y = parseInt(heightColumn) + compensatingCapitalHeight;
  }


  // SOUTH
  // doricFriseResult = drawDoricFrise(false, sizeDoricFriseLength, sizeDoricFriseWidth, metopesNumber[1], triglyphLength, doricFriseHeight);
  // for (var i = 1; i <= metopesNumber[0]; i++) {
  //   scene.add(doricFriseResult[i]);
  //
  //   doricFriseResult[i].position.z = -length*2 - 2.5 - distBetwColsCompensate/2; // NOMBRE MAGIQUE ?
  //
  //   var totalLengthArchitrave = width + thicknessColumn;
  //
  //   if (i <= metopesNumber[0]) {
  //     if (i == 1) {
  //       doricFriseResult[i].position.x = -thicknessColumn - distBetwColsCompensate/2;
  //     } else if (i == metopesNumber[0]) {
  //       doricFriseResult[i].position.x = totalLengthArchitrave + distBetwColsCompensate/2;
  //     } else {
  //       doricFriseResult[i].position.x = distBetwCols/2*i - distBetwCols - 0;
  //     }
  //   }
  //
  //   doricFriseResult[i].position.y = parseInt(heightColumn) + compensatingCapitalHeight;
  // }
  //
  // var compensatingZelseifPositionArray = ['null', 2, -5, -5, -10, -10, -14.75, -20, -20, -20, -25, -25, -25, -30, -35, -35, -40, -40, -45, -45, -50, -55];
  // var compensatingZelseifPosition = 0;
  // compensatingZelseifPosition = compensatingZelseifPositionArray[numberColLongSide];
  //
  // // WEST
  // doricFriseResult = drawDoricFrise(true, sizeDoricFriseLength, sizeDoricFriseWidth, metopesNumber[1], triglyphLength, doricFriseHeight);
  // for (var i = 1; i <= metopesNumber[1]; i++) {
  //   scene.add(doricFriseResult[i]);
  //
  //   doricFriseResult[i].position.x = -2.5 - distBetwColsCompensate/2; // NOMBRE MAGIQUE ?
  //
  //   var totalLengthArchitrave = width + thicknessColumn;
  //
  //   if (i <= metopesNumber[1]) {
  //     if (i == 1) {
  //       if (numberColLongSide == 1) {
  //         doricFriseResult[i].position.z = -thicknessColumn - 0.25- distBetwColsCompensate/2;
  //       } else {
  //         doricFriseResult[i].position.z = -thicknessColumn + 4 - distBetwColsCompensate/2 + distBetwColsCompensate;
  //       }
  //     } else if (i == metopesNumber[1]) {
  //       doricFriseResult[i].position.z = -totalLengthArchitrave + compensatingZelseifPosition + compensatingDistBetwColsPosition;
  //     } else {
  //       if (numberColLongSide == 1) {
  //         doricFriseResult[i].position.z = -distBetwCols/2*i - distBetwCols + 2.5*4 + 2;
  //       } else {
  //         doricFriseResult[i].position.z = -distBetwCols/2*i - distBetwCols + 2.5*4 + distBetwColsCompensate*2
  //       }
  //     }
  //   }
  //
  //   doricFriseResult[i].position.y = parseInt(heightColumn) + compensatingCapitalHeight;
  // }
  //
  // // EAST
  // doricFriseResult = drawDoricFrise(true, sizeDoricFriseLength, sizeDoricFriseWidth, metopesNumber[1], triglyphLength, doricFriseHeight);
  // for (var i = 1; i <= metopesNumber[1]; i++) {
  //   scene.add(doricFriseResult[i]);
  //
  //   if (idFactorRuleNumberColSide == 'two_n_plus_one') {
  //     doricFriseResult[i].position.x = length - 2.5 - distBetwColsCompensate/2; // NOMBRE MAGIQUE ?
  //   } else if(idFactorRuleNumberColSide == 'two_n_minus_one') {
  //     doricFriseResult[i].position.x = length + 2.5 + distBetwColsCompensate/2; // NOMBRE MAGIQUE ?
  //   } else if (idFactorRuleNumberColSide == 'two_n') {
  //     doricFriseResult[i].position.x = length+ distBetwColsCompensate/2;
  //   }
  //
  //   var totalLengthArchitrave = width + thicknessColumn;
  //
  //   if (i <= metopesNumber[1]) {
  //     if (i == 1) {
  //       if (numberColLongSide == 1) {
  //         doricFriseResult[i].position.z = -thicknessColumn - 0.25;
  //       } else {
  //         doricFriseResult[i].position.z = -thicknessColumn + 4 + distBetwColsCompensate/2
  //       }
  //     } else if (i == metopesNumber[1]) {
  //       doricFriseResult[i].position.z = -totalLengthArchitrave + compensatingZelseifPosition + compensatingDistBetwColsPosition; // NOMBRE MAGIQUE
  //     } else {
  //       if (numberColLongSide == 1) {
  //         doricFriseResult[i].position.z = -distBetwCols/2*i - distBetwCols + 2.5*4 + 2;
  //       } else {
  //         doricFriseResult[i].position.z = -distBetwCols/2*i - distBetwCols + 2.5*4 + distBetwColsCompensate*2 // NOMBRE MAGIQUE
  //       }
  //     }
  //   }
  //
  //   doricFriseResult[i].position.y = parseInt(heightColumn) + compensatingCapitalHeight;
  // }

}

function drawFriseBlock(angleRotation = false, sizeDoricFriseLength = 20, sizeDoricFriseWidth = 20, metopesNumber, triglyphLength = 1, doricFriseHeight = 1.25)
{
  var box1 = []
  var doricFriseModel = new THREE.BoxGeometry( sizeDoricFriseLength, doricFriseHeight, sizeDoricFriseWidth, 12 );
  var material = new THREE.MeshLambertMaterial({color: 'lightgoldenrodyellow'});
  var box1 = new THREE.Mesh(doricFriseModel, material);
  return box1
}

function drawDoricFrise(angleRotation = false, sizeDoricFriseLength = 20, sizeDoricFriseWidth = 20, metopesNumber, triglyphLength = 1, doricFriseHeight = 1.25)
{
  var box2 = []
  var triglypheModel;
  var material;
  for (var numCol = 1; numCol <= metopesNumber; numCol++) {
    triglypheModel = new THREE.BoxGeometry(  triglyphLength, 1.25, triglypheWidth = 0.3, 10 );
    material = new THREE.MeshLambertMaterial({color: '#00008B'});
    box2[numCol] = new THREE.Mesh(triglypheModel, material);
    if (angleRotation == true) {
      box2[numCol].rotation.z = Math.PI / 2;
      box2[numCol].rotation.y = Math.PI / 2;
      box2[numCol].rotation.x = Math.PI / 2;
    }
  }
  return box2;
}

var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10000);
function setUp(scene) {
  var three_D_Canvas = document.getElementById('three_D_Canvas');
  var renderer = new THREE.WebGLRenderer({ alpha: true, canvas: three_D_Canvas });
  renderer.setSize( window.innerWidth, window.innerHeight );

  // create a Scene
  var onRenderFcts= [];
  scene.name = 'scene';

  // create a PerspectiveCamera
  camera.position.set( 0, 0, 100 );
  camera.fov = 20; // ZOOM
  camera.updateProjectionMatrix();
  var aspect = window.innerWidth / window.innerHeight;
  var nearClippingPlane = 0.1;
  var farClippingPlane = 1000;
  const width = 30;
  const height = 30;

  let geometry = new THREE.Geometry()
  geometry.vertices.push(new THREE.Vector3(-5, 0, 0))
  geometry.vertices.push(new THREE.Vector3(5, 0, 0))
  let line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x00ff00 }))


  //////////////////////////////////////////////////////////////////////////////////
  //		set 3 point lighting						//
  //////////////////////////////////////////////////////////////////////////////////
  ;(function()
  {
    // add a ambient light
    var light	= new THREE.AmbientLight( 0x020202 )
    scene.add( light )
    // add a light in front
    var light	= new THREE.DirectionalLight('white', 1)
    light.position.set(0.5, 0.5, 2)
    scene.add( light )
    // add a light behind
    var light	= new THREE.DirectionalLight('white', 0.75)
    light.position.set(-0.5, 2.5, -2)
    scene.add( light )
  })()

  scene.add( line );

  const size = 1000;
  const divisions = 1000;

  const gridHelper = new THREE.GridHelper( size, divisions );
  // scene.add( gridHelper );

  //////////////////////////////////////////////////////////////////////////////////
  //		Camera Controls							//
  //////////////////////////////////////////////////////////////////////////////////
  var mouse	= {x : 0, y : 0}
  document.addEventListener('mousemove', function(event){
    mouse.y	= (event.clientY / window.innerHeight) - 0.5
  }, false)
  document.addEventListener( 'mousewheel', (event) => {
    // camera.position.y +=event.deltaY/5;
  });
  onRenderFcts.push(function(delta, now){
    // camera.position.y += (mouse.y*999 - camera.position.y + 1) * (delta*3)
    camera.lookAt( scene.position )
  })

  //////////////////////////////////////////////////////////////////////////////////
  //		render the scene						//
  //////////////////////////////////////////////////////////////////////////////////
  onRenderFcts.push(function(){
    renderer.render( scene, camera );
  })

  //////////////////////////////////////////////////////////////////////////////////
  //		loop runner							//
  //////////////////////////////////////////////////////////////////////////////////
  var lastTimeMsec= null
  requestAnimationFrame(function animate(nowMsec){
    // keep looping
    requestAnimationFrame( animate );
    // measure time
    lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
    var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
    lastTimeMsec	= nowMsec
    // call each update function
    onRenderFcts.forEach(function(onRenderFct){
      onRenderFct(deltaMsec/1000, nowMsec/1000)
    })
  })
}


function moveCameraUp() {
  camera.translateY(5)
}
function moveCameraDown() {
  camera.translateY(-5)
}
function moveCameraLeft() {
  camera.translateX(-5)
}
function moveCameraRight() {
  camera.translateX(5)
}
function moveCameraZoomIn() {
  camera.translateZ(-5)
}
function moveCameraZoomOut() {
  camera.translateZ(5)
}
