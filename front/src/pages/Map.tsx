import React from 'react';
import MapView from '../components/MapView';

const Map: React.FC = () => {
  
    const containerStyle = {
        width: '100%',
        height: '100%',
        margin: '0 auto',
        zoomDef: 8
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <MapView width={containerStyle.width} height={containerStyle.height} zoomDef={containerStyle.zoomDef} margin={containerStyle.margin}  />
        </div>
    );

}

export default Map