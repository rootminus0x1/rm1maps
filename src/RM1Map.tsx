// React
import * as React from 'react';
import type {PropsWithChildren} from 'react';
import * as RN from 'react-native';

// OpenLayers
import {Coordinate} from 'ol/coordinate';
import {ProjectionLike} from 'ol/proj';
import {Map, View, MapBrowserEvent, MapEvent} from 'ol';
import RenderEvent from 'ol/render/Event';
import BaseEvent from 'ol/events/Event';
import {Extent} from 'ol/extent';
import {OSM} from 'ol/source';
import TileLayer from 'ol/layer/Tile';
// import {fromLonLat} from 'ol/proj';

/** Center and zoom level */
export type RM1MapView = {
  /** Center of the map */
  center: Coordinate;
  /** Zoom level, 0 is the whole world, 28 is maximum resolution */
  zoom: number;
  /**
   * Optional resolution in meters per pixel
   *
   * When set, it takes precedence over the zoom level
   *
   * @default zoom
   */
  resolution?: number;
};

/**
 * @propsfor RM1Map
 */
export interface RM1MapProps extends PropsWithChildren<unknown> {
  /** The initial view parameters - {center, zoom}, reset only on full component reload */
  initial?: View;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /**
   * Do not include any default controls. Cannot be changed once set.
   * @default false
   */
  noDefaultControls?: boolean;
  /**
   * Do not include any default interactions. Cannot be changed once set.
   * @default false
   */
  noDefaultInteractions?: boolean;
  /** View projection
   * @default 'ESPG:3857'
   */
  projection?: ProjectionLike;
  /** Called immediately on click */
  onClick?: (
    this: typeof RM1Map,
    e: MapBrowserEvent<UIEvent>,
  ) => boolean | void;
  /** Called on single click when the double click timer has expired */
  onSingleClick?: (
    this: typeof RM1Map,
    e: MapBrowserEvent<UIEvent>,
  ) => boolean | void;
  /** Called on double click */
  onDblClick?: (
    this: typeof RM1Map,
    e: MapBrowserEvent<UIEvent>,
  ) => boolean | void;
  /** Called when the user starts panning the map */
  onMoveStart?: (
    this: typeof RM1Map,
    e: MapBrowserEvent<UIEvent>,
  ) => boolean | void;
  /** Called when the user stops panning the map */
  onMoveEnd?: (
    this: typeof RM1Map,
    e: MapBrowserEvent<UIEvent>,
  ) => boolean | void;
  /** Called on every pointer move when dragging, `e.preventDefault()`
   * can be used to stop OpenLayers from also panning the map */
  onPointerDrag?: (
    this: typeof RM1Map,
    e: MapBrowserEvent<UIEvent>,
  ) => boolean | void;
  /** Called on every pointer movement, use with care */
  onPointerMove?: (
    this: typeof RM1Map,
    e: MapBrowserEvent<UIEvent>,
  ) => boolean | void;
  /** Called after a layer has been rendered */
  onPostRender?: (this: typeof RM1Map, e: MapEvent) => boolean | void;
  /** Called before layers are composed */
  onPreCompose?: (this: typeof RM1Map, e: RenderEvent) => boolean | void;
  /** Called after layers are composed */
  onPostCompose?: (this: typeof RM1Map, e: RenderEvent) => boolean | void;
  /** Called after completely rendering the map */
  onRenderComplete?: (this: typeof RM1Map, e: RenderEvent) => boolean | void;
  /** Called on every change */
  onChange?: (this: typeof RM1Map, e: BaseEvent) => void;
  /** A set of properties that can be accessed later by .get()/.getProperties() */
  properties?: Record<string, unknown>;
  /** Extent of the map, cannot be dynamically modified
   * @default world
   */
  extent?: Extent;
  /** Minimum resolution, cannot be dynamically modified */
  minResolution?: number;
  /** Maximum resolution, cannot be dynamically modified */
  maxResolution?: number;
  /**
   * If true, the view will always animate to the closest zoom level after an interaction;
   * false means intermediary zoom levels are allowed.
   * @default false
   */
  constrainResolution?: boolean;
  /** Minimum zoom level */
  minZoom?: number;
  /** Maximum zoom level */
  maxZoom?: number;
  /**
   * Allow rotation of the map.
   * Cannot be updated once the map is created.
   *
   * @default true
   */
  enableRotation?: boolean;
  /**
   * Rotation constraint. false means no constraint. true means no constraint, but snap to zero near zero.
   * A number constrains the rotation to that number of values.
   * For example, 4 will constrain the rotation to 0, 90, 180, and 270 degrees.
   * Cannot be updated once the map is created.
   *
   * @default true
   */
  constrainRotation?: boolean | number;
}

function RM1Map(props: RM1MapProps): JSX.Element {
  const [, setMap] = React.useState<Map>();
  // const [ featuresLayer, setFeaturesLayer ] = useState()
  // const [ selectedCoord , setSelectedCoord ] = React.useState()

  const mapElementRef = React.useRef(null);
  // state ref that openlayers can access
  //const mapRef = useRef();
  //mapRef.current = map;

  // initialise
  React.useEffect(() => {
    const initialMap = new Map({
      // @ts-ignore
      target: mapElementRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],

      view: new View({
        center: [0, 0],
        zoom: 2,
      }),

      controls: [],
    });

    //initialMap.on('click', handleMapClick);
    setMap(initialMap);

    // setFeatureLayer, etc.

    // to remove old attached View, also removes flickering
    return () => initialMap.setTarget();
  }, []);

  // another useEffect with dependencies for updates here:

  // map click handler
  /*
  const handleMapClick = (event) => {
    // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
    //  https://stackoverflow.com/a/60643670
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

    // transform coord to EPSG 4326 standard Lat Long
    const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

    // set React state
    setSelectedCoord( transormedCoord )

    console.log(transormedCoord)

  }
  */

  return (
    <RN.View
      // @ts-ignore
      ref={mapElementRef}
      style={{width: props.width, height: props.height}}
    />
  );
}

export default RM1Map;
