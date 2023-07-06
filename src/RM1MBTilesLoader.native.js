'use strict';

// this only works for native code!

import fs from 'node:fs';
import path from 'node:path';

// todo: make those files on demand?
// maybe best to load up only those selected in the profile
import MBTiles from '@mapbox/mbtiles';

function setVectorTileLoader(vectorSource /*: VectorTileSource*/){
  vectorSource.setTileLoadFunction(vectorTileLoad);
}

function vectorTileLoad(tile, fromurl) {
  // parse the URL for xyz info
  const file = null;
  const z = null;
  const x = null;
  const y = null;
  const mbtiles = loadMBTilesFile('', file);
  mbtiles.getTile(z, x, y);
  /* from https://openlayers.org/en/latest/apidoc/module-ol_Tile.html
  import TileState from 'ol/TileState.js';
    source.setTileLoadFunction(function(tile, src) {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.addEventListener('loadend', function (evt) {
        const data = this.response;
        if (data !== undefined) {
          tile.getImage().src = URL.createObjectURL(data);
        } else {
          tile.setState(TileState.ERROR);
        }
      });
      xhr.addEventListener('error', function () {
        tile.setState(TileState.ERROR);
      });
      xhr.open('GET', src);
      xhr.send();
    });
  */
  // need to pass on the features to the format?
}

// MBFiles cache
const mbtilesCache = new Map();

function loadMBTilesFile(mbpath, mbname) {
  mbpath = 'c:/Users/tfras/maps/mbtiles/albania.mbtiles'; // TODO: pass this info down
  // check the cache
  const mbtiles = mbtilesCache.get(mbname);
  if (!mbtiles) {
    // not in cache, so fetch the data
    const filepath = `${mbpath}/$mbname`;
    const mbfileStats = fs.statSync(filepath);
    if (!mbfileStats.isFile()) { throw new Error(`.mbfile is not a file: ${filepath}`); }
    if (mbfileStats.size <= 0) { throw new Error(`.mbfile is zero sized: ${filepath}`) }
    // found a suitable file, so load it
    const instance = new MBTiles(filepath + '?mode=ro', (err) => {
      if (err) { throw new Error(`${err}: ${filepath}`); }
      // check it's valid
      instance.getInfo((err, info) => {
        if (err || !info) { throw new Error(`Metadata missing in the MBTiles file: ${filepath}`); }
        //const bounds = info.bounds;
        // tiles must be pbf (vector data)
        // TODO: add raster data support
        if (info.name.toLowerCase().indexOf('openmaptiles') < 0) {
          throw new Error(`MBTiles file not in "openmaptiles" format: ${filepath}`);
        }
        if (info.format !== 'pbf') {
          throw new Error(`MBTiles file contains ${info.format} tiles, expected "pbf": ${filepath}`);
        }
      });
    });
    mbtilesCache.set(mbname, mbtiles);
    mbtiles = instance;
  }
  return mbtiles;
}

function loadMBTilesDirectory(mbpath/*: string*/) {
  const mbtiles/*: MBTiles[]*/ = [];

  mbpath = path.resolve([], mbpath);
  // scan the directory path for suitable files
  const files = fs.readdirSync(mbpath);
  for (const file of files) {
    try {
      if (file.endsWith('.mbtiles')) {
        loadMBTilesFile(mbpath, file);
      }
    } catch (e) {
      // TODO: handle errors better
      console.error(e);
    }
  } // for
}

export default setVectorTileLoader;