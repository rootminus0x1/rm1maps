// React
import * as React from 'react';
// import type {PropsWithChildren} from 'react';
import * as RN from 'react-native';

// Styles
// mapbox json styles
import {applyStyle} from 'ol-mapbox-style';

// OpenLayers
import * as OL from 'ol';
//import OLCoordinate from 'ol/coordinate';
import {
  //ProjectionLike as OLProjectionLike,
  fromLonLat as OLfromLonLat,
} from 'ol/proj';
//import OLRenderEvent from 'ol/render/Event';
//import OLBaseEvent from 'ol/events/Event';
//import {Extent} from 'ol/extent';
import OLTileLayer from 'ol/layer/Tile';
import {OSM as OLOSM} from 'ol/source';
//import {XYZ as OLXYZ} from 'ol/source';
//import {olms} from 'ol-mapbox-style';

// vector tiles TODO: hget them in a namespace
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
//import WebGLVectorTileLayerRenderer from 'ol/renderer/webgl/VectorTileLayer.js';

//import Geometry from 'ol/geom/Geometry';

/*
import {Coordinate} from 'ol/coordinate';
import {ProjectionLike} from 'ol/proj';
import {Map, View, MapBrowserEvent, MapEvent} from 'ol';
//import TileLayer from 'ol/layer/Tile';
*/

import setVectorTileLoader from './RM1MBTilesLoader';

// global map - can't see how to make it local and work with react [] effect
const map = new OL.Map({
  //controls: [],
});

// attaches the global map to a "<div>" element
// TODO: just get the css style passed down
// TODO: pass onclick funtion handlers down to manage data being passed back up
function RM1Map(props: {
  width: string;
  height: string;
  center?: {latitude: number; longitude: number};
  zoom?: number;
  layers?: string[];
  regions?: string[];
  style?: string;
}): JSX.Element {
  const mapElementRef = React.useRef(null);
  React.useEffect(() => {
    // initialise after mounting UI
    // we can assume current is not null as this runs after the container is created
    map.setTarget(mapElementRef.current!);
    return () => map.setTarget();
  }, []);

  React.useEffect(() => {
    // any requested base layers
    if (props.layers?.includes('osm')) {
      map.addLayer(
        new OLTileLayer({
          source: new OLOSM(),
          opacity: 0.25,
        }),
      );
    }
    // all requested regions, by id
    props.regions?.forEach(function (region) {
      const vectorSource = new VectorTileSource({
        attributions:
          '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
          '© <a href="https://www.openstreetmap.org/copyright">' +
          'OpenStreetMap contributors</a>',
        format: new MVT(),
        maxZoom: 7,
      });
      // native apps use local file store but the web has to use a local server for the map tiles, etc.
      setVectorTileLoader(vectorSource, region);
      const vectorLayer = new VectorTileLayer({
        declutter: true,
        source: vectorSource,
      });
      // TODO: get the style from local store on native apps
      //applyStyle(testLayer, 'https://maputnik.github.io/osm-liberty/style.json');
      applyStyle(
        vectorLayer,
        'http://localhost:8082/styles/' + props.style + '/style.json',
      );
      map.addLayer(vectorLayer);
    });
  }, [props.layers, props.style, props.regions]);

  React.useEffect(() => {
    if (map) {
      map.setView(
        new OL.View({
          center: OLfromLonLat([
            props.center?.longitude ?? 0,
            props.center?.latitude ?? 0,
          ]),
          zoom: props.zoom ?? 0,
        }),
      );
    }
  }, [props.center, props.zoom]);

  return (
    <RN.View
      ref={mapElementRef}
      style={{width: props.width, height: props.height}}
    />
  );
}

export default RM1Map;
