import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, TileLayer,GeoJson } from 'react-leaflet';
import Control from 'react-leaflet-control';
import ReactDependentScript from 'react-dependent-script';

const stamenTonerTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const stamenTonerAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const mapCenter = [41.87, -87.62];  
const zoomLevel = 12;
const minZoomLevel= 12;

const v=  {
    "type":"Feature","properties":{"statefp10":"17","name10":"Block 1000","blockce10":"1000","tract_bloc":"8390001000","geoid10":"170318390001000","tractce10":"839000","countyfp10":"031"},"geometry":{"type":"MultiPolygon","coordinates":[[[[-87.63012399994028,41.87452800012339],[-87.62989599983497,41.87453100015538],[-87.62986999995819,41.874531000256745],[-87.62966899956287,41.87453400045878],[-87.62965400029374,41.874082000263876],[-87.62964099989098,41.873684999728546],[-87.62963099981373,41.873443000518805],[-87.62962699995883,41.873362000204075],[-87.62962299973026,41.873283999823414],[-87.6296259998912,41.8731089999355],[-87.62961499992333,41.8727269995742],[-87.62960400042418,41.87227600061316],[-87.62971799955933,41.87227399989126],[-87.63005999931083,41.87226799976184],[-87.63017499931937,41.87226699959279],[-87.63030700000945,41.87226499956295],[-87.63045299920306,41.87225400061139],[-87.63061099985619,41.872231999809394],[-87.63064200084673,41.87333799975813],[-87.63067499967966,41.87452199927302],[-87.6304729996004,41.874523999888886],[-87.6304000003497,41.87452499994127],[-87.63012399994028,41.87452800012339]]]]}}



const j =  {"type": "Feature",
    "properties": {"statefp10": "17", "name10": "Block 1020", "blockce10": "1020", "tract_bloc": "8391001020", "geoid10": "170318391001020", "tractce10": "839100", "countyfp10": "031"}, 
    "geometry": {
    "type": "MultiPolygon", 
     "coordinates":
        [[[
        [-87.62797900003312, 41.88689900038233], 
        [-87.62797299937814, 41.8868319998904], 
 [-87.62796800019487, 41.88677900042276], 
 
 [-87.62796200055028, 41.88669799965891], 
 
 [-87.6279549991857, 41.886419999394704], 
 [-87.62795299966572, 41.88630099916351], 
 [-87.62826499953982, 41.88630400009258], 
 [-87.62920199914878, 41.88631499997737], 
 [-87.6295150002777, 41.88631900032508], 
 [-87.62951800018848, 41.886429999946245], 
 [-87.62952800038359, 41.88675099980358], 
 [-87.62952800080564, 41.88676600035975], 
 [-87.62953000043821, 41.88687899979764], 
 [-87.62921900001015, 41.886876999703425],
 [-87.6282879996944, 41.886874000280024], 
 [-87.62822000000823, 41.886873999629735], 
 [-87.62808200001649, 41.886885000672635], 
 [-87.62797900003312, 41.88689900038233 ]]]]}};          

export default class App extends Component {
    constructor(props) {
        super(props);   
        this.state = { currentZoomLevel: zoomLevel };
        this.handleUpPanClick = this.handleUpPanClick.bind(this);
        this.handleRightPanClick = this.handleRightPanClick.bind(this);
        this.handleLeftPanClick = this.handleLeftPanClick.bind(this);
        this.handleDownPanClick = this.handleDownPanClick.bind(this);
    }

    onEachFeature(feature, layer) {
         
            layer.bindPopup(feature.properties.tract_bloc);
    }

    getStyle(feature, layer) {
        return {
          color: '#006400',
          weight: 5,
          opacity: 0.65
        }
      }
    componentDidMount() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.on('zoomend', () => {
            const updatedZoomLevel = leafletMap.getZoom();
            this.handleZoomLevelChange(updatedZoomLevel);
        });
    }

    handleZoomLevelChange(newZoomLevel) {
        this.setState({ currentZoomLevel: newZoomLevel });
    }

    handleUpPanClick() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.panBy([0, -100]);
        window.console.log('Panning up');
    }

    handleRightPanClick() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.panBy([100, 0]);
        window.console.log('Panning right');
    }

    handleLeftPanClick() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.panBy([-100, 0]);
        window.console.log('Panning left');
    }

    handleDownPanClick() {
        const leafletMap = this.leafletMap.leafletElement;
        leafletMap.panBy([0, 100]);
        window.console.log('Panning down');
    }

    render() {
        window.console.log('this.state.currentZoomLevel ->', this.state.currentZoomLevel);

        return (
            
            <div>
                <Map
                    ref={m => { this.leafletMap = m; }}
                    center={mapCenter}
                    zoom={zoomLevel}
                    minZoom={minZoomLevel}
                >
                    <TileLayer
                        attribution={stamenTonerAttr}
                        url={stamenTonerTiles}
                    />
                    <Control position="topright">
                        <div
                            style={{
                                
                                padding: '5px'
                            }}
                        >
                            <div style={{ marginLeft: '37px' }}>
                                <button onClick={this.handleUpPanClick}>
                                    Pan up
                                </button>
                            </div>
                            <div>
                                <button onClick={this.handleLeftPanClick}>
                                    Pan left
                                </button>
                                <button onClick={this.handleRightPanClick}>
                                    Pan right
                                </button>
                            </div>
                            <div style={{ marginLeft: '30px' }}>
                                <button onClick={this.handleDownPanClick}>
                                    Pan down
                                </button>
                            </div>
                        </div>
                    </Control>
                    
                  <GeoJson data= {v} style={this.getStyle} fillColor='red' onEachFeature ={this.onEachFeature} /> 
                  <GeoJson data ={j} style={this.getStyle} />
                </Map>
            </div>
        );
    }
}

render(
    <App />,
    document.getElementById('mount')
);