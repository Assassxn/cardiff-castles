// components/LeafletMap.tsx
"use client";
import { FC } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
export type Pin = { id: number; position: LatLngExpression };

interface Props {
    pins: Pin[];
    onPinClick: (id: number) => void;
}

const defaultCenter: LatLngExpression = [51.4823, -3.1845]; // Cardiff

const LeafletMap: FC<Props> = ({ pins, onPinClick }) => (
    <MapContainer center={defaultCenter} zoom={14} style={{ width: "100%", height: "100%" }}>
        <TileLayer attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {pins.map(({ id, position }) => (
            <Marker
                key={id}
                position={position}
                eventHandlers={{
                    click: () => onPinClick(id),
                }}
            />
        ))}
    </MapContainer>
);

export default LeafletMap;
