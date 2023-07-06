//import VectorTileSource from 'ol/source/VectorTile';

function setVectorTileLoader(
  vectorSource /*: VectorTileSource*/,
  region /*: string*/,
) {
  // for the web we only need set the URL. The default loader does the rest
  vectorSource.setUrl(
    'http://localhost:8082/data/' + region + '/{z}/{x}/{y}.pbf',
  );
}

export default setVectorTileLoader;
