// src/app/weather/[date]/page.tsx
import Navbar from "@/components/shared/Navbar";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
    params: Promise<{ date: string }>;
}

interface OpenMeteoResponse {
    daily: {
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        uv_index_max: number[];
        windspeed_10m_max: number[];
        precipitation_sum: number[];
        precipitation_probability_max: number[];
    };
    hourly: {
        relativehumidity_2m: number[];
        visibility: number[];
    };
}

export default async function WeatherDatePage({ params }: Props) {
    const { date } = await params;

    // validate YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();

    const latitude = 51.4823606; // Updated latitude for Cardiff
    const longitude = -3.1825207; // Updated longitude for Cardiff
    const timezone = "Europe/London";

    // fetch the weather data from Open-Meteo API
    // using the latitude and longitude of Cardiff
    const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&start_date=${date}&end_date=${date}` +
        `&daily=temperature_2m_max,temperature_2m_min,uv_index_max,windspeed_10m_max,precipitation_sum,precipitation_probability_max` +
        `&hourly=relativehumidity_2m,visibility` +
        `&timezone=${encodeURIComponent(timezone)}`;

    // fetch the data from the API
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
        // if the response is not ok, log the error and return a 404 page
        console.error("Open-Meteo fetch failed", await res.text());
        notFound();
    }

    // parse the response as JSON
    const data: OpenMeteoResponse = await res.json();
    const d = data.daily;
    const h = data.hourly;

    // grab the 0th (only) entry
    const maxT = d.temperature_2m_max[0];
    const minT = d.temperature_2m_min[0];
    const uv = d.uv_index_max[0];
    const wind = d.windspeed_10m_max[0];
    const precipSum = d.precipitation_sum[0];
    const precipProb = d.precipitation_probability_max[0];

    // compute averages
    const avgHumidity = h.relativehumidity_2m.reduce((a, v) => a + v, 0) / h.relativehumidity_2m.length;
    const avgVis = h.visibility.reduce((a, v) => a + v, 0) / h.visibility.length;

    // simple traffic-risk heuristic
    let trafficRisk = "Low";
    if (precipProb > 75) trafficRisk = "High";
    else if (precipProb > 30) trafficRisk = "Moderate";

    // human-friendly date
    const humanDate = new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <h1 className="text-3xl font-semibold">Weather for {humanDate} in Cardiff</h1>

                {/* Summary box */}
                <Card className="bg-gray-100 mb-6">
                    <CardContent className="flex flex-col items-center justify-center h-64">
                        <p className="text-2xl">
                            {maxT.toFixed(1)}°C / {minT.toFixed(1)}°C
                        </p>
                        <p className="mt-2">
                            Precipitation: {precipSum.toFixed(1)} mm ({precipProb}% chance)
                        </p>
                    </CardContent>
                </Card>

                {/* Detail cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardContent className="space-y-2">
                            <p>
                                <strong>Humidity:</strong> {avgHumidity.toFixed(0)}%
                            </p>
                            <p>
                                <strong>UV Index:</strong> {uv}
                            </p>
                            <p>
                                <strong>Wind Speed:</strong> {wind.toFixed(1)} km/h
                            </p>
                            <p>
                                <strong>Precipitation:</strong> {precipSum.toFixed(1)} mm
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="space-y-2">
                            <p>
                                <strong>Visibility:</strong> {avgVis.toFixed(0)} km
                            </p>
                            <p>
                                <strong>Traffic Risk:</strong> {trafficRisk}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
