import "./App.css";
import { useEffect, useState, useRef } from "react";
import * as atlas from "azure-maps-control";
// import * as drawing from "azure-maps-drawing-tools";
import "azure-maps-drawing-tools/dist/atlas-drawing.min.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  // const [userMarker, setUserMarker] = useState(atlas.HtmlMarker)

  const map = loadMap();
  const datasource = new atlas.source.DataSource();

  let userMarker;
  let drawingManager;
  let cameraSettings;

  // Não utilizado ainda, porém irá representar o que fazer com o desenho
  // voltar para o idle state
  // 0 - Descartar desenho
  // 1 - Salvar e adicionar forma
  // //   let drawingState = 0;

  // Chamado assim que body estiver pronto
  // function Init() {
  //     map = loadMap();
  // }

  // Inicializa o objeto do mapa, deve ser o primeiro método usado
  function loadMap() {
    const mapConfig = {
      language: "pt-BR",
      // FIXME: ESTE GIT NÃO DEVE SER PÚBLICO DEVIDO A CHAVE
      authOptions: {
        authType: "subscriptionKey",
        subscriptionKey: "rYxdJxzEusl4khSeRLDL5kbCvt1Ujl8PJDdgF2hNM-8",
      },
    };

    // Map será carregado na div #mapView
    let mapInstance = new atlas.Map("mapView", mapConfig);

    // Remove icones de rua, logo e outras coisas não usadas
    mapInstance.setStyle({
      showLogo: false,
    });

    mapInstance.events.add("ready", mapReady);

    return mapInstance;
  }

  // Troca o estilo do mapa entre light/dark mode
  function changeThemeMode() {
    if (darkMode) {
      map.setStyle({ style: "grayscale_dark" });
    } else {
      map.setStyle({ style: "grayscale_light" });
    }
  }

  // Chamado quando o mapa está realmente pronto
  function mapReady() {
    createDataSource();
    cameraSettings = map.getCamera();
    //setBoundaries();
    //focusCoords([-48.664421562511805, -26.91725917299918]);
    setDarkMode(true);
    changeThemeMode();

    // Cria o objeto do drawing manager em modo idle
    drawingManager = new atlas.drawing.DrawingManager(map, {
      mode: "idle",
    });
    map.events.add("drawingcomplete", drawingManager, onDrawingCompleted);
  }

  // Cria as camadas de desenho
  function createDataSource() {
    // Adiciona a fonte de dados ao mapa, onde as informações são armazenadas
    map.sources.add(datasource);

    // Camada de poligonos
    let polygonLayer = new atlas.layer.PolygonLayer(datasource, null, {
      filter: [
        "any",
        ["==", ["geometry-type"], "Polygon"],
        ["==", ["geometry-type"], "MultiPolygon"],
      ],
    });

    map.layers.add([polygonLayer]);

    map.events.add("click", [polygonLayer], onPolygonClicked);
  }

  // Use este método para qualquer update da camera
  // isto vai manter as alterações já existentes
  function updateCamera(newSettings, keepCameraTransform = true) {
    let updatedSettings = {
      ...cameraSettings,
      ...newSettings,
    };

    if (keepCameraTransform) {
      let tempCameraSettings = map.getCamera();
      updatedSettings.center = tempCameraSettings.center;
      updatedSettings.zoom = tempCameraSettings.zoom;
    }

    console.log(updatedSettings);
    map.setCamera(updatedSettings);
    console.log(map.getCamera());

    cameraSettings = updatedSettings;
  }

  // Define os limites da camera, ainda é hard-coded
  // Na versão final, o banco de dados deve retornar essa informação
  // para delimitar a região do mapa
  function setBoundaries() {
    updateCamera({
      maxBounds: [-48.6688671, -26.9197299, -48.662859, -26.9137699],
      padding: 10,
      // Evita rotação 3D
      minPitch: 0,
      maxPitch: 0,
    });
  }

  // Foca a camera em uma coordenada especifica
  // Utilizado para waypoints
  function focusCoords(coords) {
    updateCamera({
      center: coords,
      zoom: 10,
    });
  }

  function drawSwitch() {
    if (drawingManager.getOptions().mode == "idle") {
      drawingManager.setOptions({
        mode: "draw-polygon",
      });
    } else {
      drawingManager.setOptions({
        mode: "idle",
      });
    }
    console.log(drawingManager);
  }

  function onDrawingCompleted(dm) {
    console.log("Drawing completed!");
    let geometry =
      dm.dataSource.shapes[dm.dataSource.shapes.length - 1].data.geometry;

    datasource.add(
      new atlas.data.Feature(geometry, {
        name: "NOME_SALA",
        subtitulo: "SUBTITULO_SALA",
        descricao: "DESCRICAO_SALA",
      })
    );
  }

  // Acionado quando um objeto da camada de poligono é clicado
  function onPolygonClicked(data) {
    alert("Poligono clicado");
    let shape = data.shapes;
    console.log(shape[0].properties);
  }

  // Método de teste
  function createBoundingBox(geometry) {
    let boundingBox = new atlas.data.BoundingBox(geometry);
    console.log(boundingBox);
  }

  function getLocation() {
    if (!navigator.geolocation) {
      alert("Geolocalização não é suportado pelo seu navegador!");
    } else {
      console.log("Locating..");
      // Param 1 = Callback sucesso
      // Param 2 = Callback falha
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log("Localização obtida: " + latitude + " | " + longitude);
          console.log(userMarker);
          if (userMarker) {
            userMarker.position = [longitude, latitude];
          } else {
            userMarker = new atlas.HtmlMarker({
              htmlContent:
                "<div><div class='pin bounce'></div><div class='pulse'></div></div>",
              position: [longitude, latitude],
              pixelOffset: [5, -18],
            });

            map.markers.add(userMarker);
          }
          focusCoords([longitude, latitude]);
        },
        (err) => {
          alert("Não foi possivel obter localização\nMotivo: " + err.message);
        }
      );
    }
  }

  function runTest() {
    console.log(map.getCamera());
    map.setCamera({
      center: [14, 14],
      zoom: 12,
      maxZoom: 22,
      minZoom: 1,
      pitch: 0,
    });
  }

  // useEffect(() => {
  //   map = loadMap();
  // }, []);

  return (
    <>
      <div id="mapView"></div>
      {/* <button onClick={drawPolygon()}>
          Drawing Mode
      </button> */}
    </>
  );
}

export default App;
