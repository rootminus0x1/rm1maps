// React
import * as React from 'react';
// import type {PropsWithChildren} from 'react';
import * as RN from 'react-native';

// Styles
import createMapboxStreetsV6Style from './mbstyle';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style.js';

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
//import OLTileLayer from 'ol/layer/Tile';
//import {OSM as OLOSM} from 'ol/source';
//import {XYZ as OLXYZ} from 'ol/source';
//import {olms} from 'ol-mapbox-style';

// vector tiles TODO: hget them in a namespace
import MVT from 'ol/format/MVT';
import VectorTileLayer from 'ol/layer/VectorTile';
//import WebGLVectorTileLayerRenderer from 'ol/renderer/webgl/VectorTileLayer.js';
import VectorTileSource from 'ol/source/VectorTile';

/*
import {Coordinate} from 'ol/coordinate';
import {ProjectionLike} from 'ol/proj';
import {Map, View, MapBrowserEvent, MapEvent} from 'ol';
//import TileLayer from 'ol/layer/Tile';
*/
const map = new OL.Map(/*{controls: []}*/);

// creates am empty map object and attaches it to a "<div>" element
// TODO: just get the style passed down
function RM1Map(props: {
  width: string;
  height: string;
  center?: {latitude: number; longitude: number};
  zoom?: number;
  layers?: string[];
}): JSX.Element {
  const mapElementRef = React.useRef(null);
  //  const [map, setMap] = React.useState<OL.Map>();

  // initialise after mounting UI
  React.useEffect(() => {
    // has to be created here to get the correct initialisation
    map.setLayers([
      /*
      new OLTileLayer({
        source: new OLOSM(),
        opacity: 0.25,
      }),
      */
      /*
      new VectorTileLayer({
        declutter: true,
        source: new VectorTileSource({
          attributions:
            '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
            '© <a href="https://www.openstreetmap.org/copyright">' +
            'OpenStreetMap contributors</a>',
          format: new MVT(),
          url:
            'https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/' +
            'ne:ne_10m_admin_0_countries@EPSG%3A900913@pbf/{z}/{x}/{-y}.pbf',
          maxZoom: 14,
        }),
      }),
      */
      new VectorTileLayer({
        declutter: true,
        source: new VectorTileSource({
          attributions:
            '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
            '© <a href="https://www.openstreetmap.org/copyright">' +
            'OpenStreetMap contributors</a>',
          format: new MVT(),
          //url: '/c/Users/tfras/github/openmaptiles/openmaptiles/data/albania/{z}/{x}/{y}.pbf',
          url: 'http://localhost:8082/data/v3/{z}/{x}/{y}.pbf',
          maxZoom: 7,
          //url: '/c/Users/tfras/github/klokantech/mapbox-gl-js-offline-example/countries/{z}/{x}/{y}.pbf',
        }),
        style: createMapboxStreetsV6Style(Style, Fill, Stroke, Icon, Text),
      }),
    ]);
    // const initialMap = new OL.Map();
    // @ts-ignore
    map.setTarget(mapElementRef.current); // triggers the rendering of the map
    //setMap(initialMap); // triggers all the map attributes to be added
    return () => map.setTarget();
  }, []);
  /*
  React.useEffect(() => {
    for (const layer in props.layers) {
      if (layer === 'osm') {
        map.setLayers([
          new OLTileLayer({
            source: new OSM(),
          }),
        ]);
      }
    }
  }, [props.layers]);
  */
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
      // @ts-ignore
      ref={mapElementRef}
      style={{width: props.width, height: props.height}}
    />
  );
}

export default RM1Map;
