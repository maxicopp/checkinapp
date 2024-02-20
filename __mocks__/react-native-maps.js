import React from 'react';

const MockMapView = props => <div {...props} />;
MockMapView.Marker = props => <div {...props} />;
MockMapView.Polyline = props => <div {...props} />;
MockMapView.UrlTile = props => <div {...props} />;

export default MockMapView;
