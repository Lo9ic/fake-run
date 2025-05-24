"use client"

import React, { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/Map"), { 
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full rounded-lg bg-gray-100 animate-pulse" />
  )
})

interface RouteStats {
  distance: number;
  duration: number;
  elevationGain: number;
}

interface SearchResult {
  center: [number, number];
  place_name: string;
}

type Coordinate = [number, number]

export default function Home() {
  const [activityType, setActivityType] = useState("run")
  const [date, setDate] = useState<Date>()
  const [pace, setPace] = useState([5.5])
  const [speed, setSpeed] = useState([20])
  const [searchQuery, setSearchQuery] = useState("")
  const [coordinates, setCoordinates] = useState<Coordinate[]>([])
  const [routeStats, setRouteStats] = useState<RouteStats>({
    distance: 0,
    duration: 0,
    elevationGain: 0
  })
  const [gpxCreator, setGpxCreator] = useState("StravaGPX")
  const [garminModel, setGarminModel] = useState("")
  const gpxCreatorOptions = [
    { label: "Strava GPX", value: "StravaGPX" },
    { label: "Garmin", value: "Garmin" },
    { label: "Wahoo", value: "Wahoo" },
    { label: "Suunto", value: "Suunto" },
    { label: "Coros", value: "Coros" },
  ]
  const garminModelSuggestions = [
    "Garmin Forerunner 265",
    "Garmin Forerunner 945",
    "Garmin Forerunner 165 Music",
    "Garmin Forerunner 255",
    "Garmin Forerunner 955",
    "Garmin Forerunner 245",
    "Garmin Fenix 7",
    "Garmin Fenix 6",
    "Garmin Instinct 2",
    "Garmin Enduro 2",
    "Garmin Venu 3",
    "Garmin Vivoactive 5",
    "Garmin Edge 1040",
    "Garmin Epix Pro",
    "Garmin Forerunner 165",
    "Garmin Forerunner 55",
    "Garmin Forerunner 45",
    "Garmin Forerunner 745",
    "Garmin Forerunner 735XT",
    "Garmin Forerunner 935",
    "Garmin Forerunner 35",
    "Garmin Forerunner 10",
    "Garmin Forerunner 920XT",
    "Garmin Forerunner 310XT",
    "Garmin Forerunner 405",
    "Garmin Forerunner 410",
    "Garmin Forerunner 620",
    "Garmin Forerunner 630",
    "Garmin Forerunner 910XT",
    "Garmin Forerunner 301",
    "Garmin Forerunner 201",
    "Garmin Forerunner 101",
    "Garmin Forerunner 50",
    "Garmin Forerunner 60",
    "Garmin Forerunner 70",
    "Garmin Forerunner 110",
    "Garmin Forerunner 210",
    "Garmin Forerunner 220",
    "Garmin Forerunner 230",
    "Garmin Forerunner 235",
    "Garmin Forerunner 610",
    "Garmin Forerunner 620",
    "Garmin Forerunner 735XT",
    "Garmin Forerunner 920XT",
    "Garmin Forerunner 935",
    "Garmin Forerunner 945 LTE",
    "Garmin Forerunner 945",
    "Garmin Forerunner 955",
    "Garmin Forerunner 965",
    "Garmin Forerunner 165 Music",
    "Garmin Forerunner 165",
    "Garmin Forerunner 265",
    "Garmin Forerunner 265S",
    "Garmin Forerunner 255",
    "Garmin Forerunner 255S",
    "Garmin Forerunner 55",
    "Garmin Forerunner 45",
    "Garmin Forerunner 45S",
    "Garmin Forerunner 35",
    "Garmin Forerunner 25",
    "Garmin Forerunner 15",
    "Garmin Forerunner 10",
    "Garmin Forerunner 405CX",
    "Garmin Forerunner 410",
    "Garmin Forerunner 610",
    "Garmin Forerunner 620",
    "Garmin Forerunner 630",
    "Garmin Forerunner 910XT",
    "Garmin Forerunner 301",
    "Garmin Forerunner 201",
    "Garmin Forerunner 101",
    "Garmin Forerunner 50",
    "Garmin Forerunner 60",
    "Garmin Forerunner 70",
    "Garmin Forerunner 110",
    "Garmin Forerunner 210",
    "Garmin Forerunner 220",
    "Garmin Forerunner 230",
    "Garmin Forerunner 235",
    "Garmin Forerunner 610",
    "Garmin Forerunner 620",
    "Garmin Forerunner 735XT",
    "Garmin Forerunner 920XT",
    "Garmin Forerunner 935",
    "Garmin Forerunner 945 LTE",
    "Garmin Forerunner 945",
    "Garmin Forerunner 955",
    "Garmin Forerunner 965",
    "Garmin Forerunner 165 Music",
    "Garmin Forerunner 165",
    "Garmin Forerunner 265",
    "Garmin Forerunner 265S",
    "Garmin Forerunner 255",
    "Garmin Forerunner 255S",
    "Garmin Forerunner 55",
    "Garmin Forerunner 45",
    "Garmin Forerunner 45S",
    "Garmin Forerunner 35",
    "Garmin Forerunner 25",
    "Garmin Forerunner 15",
    "Garmin Forerunner 10",
  ]
  const [showGarminSuggestions, setShowGarminSuggestions] = useState(false)
  const garminInputRef = useRef<HTMLInputElement>(null)

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = Math.floor(minutes % 60)
    const secs = Math.round((minutes % 1) * 60)
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const formatDistance = (km: number): string => {
    return km.toFixed(1)
  }

  const handlePaceChange = (newPace: number[]) => {
    setPace(newPace)
    if (activityType === "run") {
      setRouteStats((prev: RouteStats) => ({
        ...prev,
        duration: prev.distance * newPace[0]
      }))
    }
  }

  const handleSpeedChange = (newSpeed: number[]) => {
    setSpeed(newSpeed)
    if (activityType === "bike") {
      setRouteStats((prev: RouteStats) => ({
        ...prev,
        duration: prev.distance / newSpeed[0] * 60
      }))
    }
  }

  const handleRouteUpdate = (coords: number[][], stats: RouteStats) => {
    setCoordinates(coords as Coordinate[])
    setRouteStats({
      ...stats,
      duration: activityType === "run" ? stats.distance * pace[0] : stats.distance / speed[0] * 60
    })
  }

  // Helper to adjust date to local time (for Strava date correctness)
  function toLocalISOString(date: Date) {
    const tzOffset = date.getTimezoneOffset() * 60000;
    const localISO = new Date(date.getTime() - tzOffset).toISOString().slice(0, -1);
    return localISO + 'Z';
  }

  // Helper to interpolate points every ~10 meters between coordinates
  function interpolateRoutePoints(coords: Coordinate[], targetSpacing = 10): Coordinate[] {
    if (coords.length < 2) return coords;
    const toRad = (deg: number) => deg * Math.PI / 180;
    const R = 6371000; // meters
    const result: Coordinate[] = [];
    for (let i = 0; i < coords.length - 1; i++) {
      const [lon1, lat1] = coords[i];
      const [lon2, lat2] = coords[i + 1];
      // Haversine distance
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a = Math.sin(dLat/2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const dist = R * c;
      const numPoints = Math.max(1, Math.round(dist / targetSpacing));
      for (let j = 0; j < numPoints; j++) {
        const frac = j / numPoints;
        // Linear interpolation in lat/lon (good enough for short distances)
        const lat = lat1 + (lat2 - lat1) * frac;
        const lon = lon1 + (lon2 - lon1) * frac;
        result.push([lon, lat]);
      }
    }
    // Add the last point
    result.push(coords[coords.length - 1]);
    return result;
  }

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <header className="w-full flex flex-col items-center py-4 mb-2 md:mb-4">
        <div className="flex flex-col items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Fake_Run_logo.png" alt="Fake Run Logo" className="w-16 h-16 md:w-40 md:h-40 object-contain" />
        </div>
      </header>
      <div className="flex flex-col md:flex-row flex-1 w-full">
        {/* Map Section */}
        <div className="w-full md:w-2/3 p-2 md:p-4 flex flex-col">
          <div className="mb-2 md:mb-4">
            <h1 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Draw Your Route</h1>
            <p className="text-gray-600 text-sm md:text-base">Search for a location and tap/click on the map to create your route</p>
          </div>
          <div className="flex-1 min-h-[300px] md:min-h-[600px]">
            <Map 
              onRouteUpdate={handleRouteUpdate}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              onSearchSelect={(result: SearchResult) => {
                setSearchQuery(result.place_name)
              }}
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/3 flex justify-center items-start md:items-stretch">
          <Card className="w-full max-w-md p-4 md:p-6 rounded-none md:rounded-lg border-t md:border-t-0 md:border-l shadow-none md:shadow-lg">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold">{activityType === "run" ? "Run Details" : "Ride Details"}</h2>
              <div className="flex items-center gap-2">
                <span className={cn("text-sm", activityType === "run" ? "text-orange-500" : "text-gray-400")}>Run</span>
                <Switch 
                  checked={activityType === "bike"}
                  onCheckedChange={(checked: boolean) => setActivityType(checked ? "bike" : "run")}
                />
                <span className={cn("text-sm", activityType === "bike" ? "text-orange-500" : "text-gray-400")}>Bike</span>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="text-sm font-medium">{activityType === "run" ? "Pace Unit" : "Speed Unit"}</label>
                <Select defaultValue={activityType === "run" ? "min/km" : "km/h"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {activityType === "run" ? (
                      <>
                        <SelectItem value="min/km">min/km</SelectItem>
                        <SelectItem value="km/h">km/h</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="km/h">km/h</SelectItem>
                        <SelectItem value="mph">mph</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">{activityType === "run" ? "Run Stats" : "Ride Stats"}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{formatDistance(routeStats.distance)}</div>
                    <div className="text-sm text-gray-500">Distance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{formatDuration(routeStats.duration)}</div>
                    <div className="text-sm text-gray-500">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{Math.round(routeStats.elevationGain)}m</div>
                    <div className="text-sm text-gray-500">Elevation Gain</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{activityType === "run" ? pace[0].toFixed(2) : speed[0].toFixed(1)}</div>
                    <div className="text-sm text-gray-500">{activityType === "run" ? "min/km" : "km/h"}</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">{activityType === "run" ? "Pace (min/km)" : "Speed (km/h)"}</label>
                {activityType === "run" ? (
                  <Slider
                    value={pace}
                    onValueChange={handlePaceChange}
                    max={10}
                    min={3}
                    step={0.1}
                    className="mt-2"
                  />
                ) : (
                  <Slider
                    value={speed}
                    onValueChange={handleSpeedChange}
                    max={60}
                    min={5}
                    step={0.5}
                    className="mt-2"
                  />
                )}
              </div>

              <div>
                <label className="text-sm font-medium">{activityType === "run" ? "Run Name" : "Ride Name"}</label>
                <Input placeholder={activityType === "run" ? "Morning Run" : "Morning Ride"} className="mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                      {date ? date.toLocaleDateString() : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium">Start Time</label>
                <div className="flex gap-2 mt-1">
                  <Select defaultValue="07">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 24}).map((_, i) => (
                        <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                          {i.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <span className="text-xl">:</span>
                  <Select defaultValue="00">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 60}).map((_, i) => (
                        <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                          {i.toString().padStart(2, "0")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder={activityType === "run" ? "Great morning run through the park..." : "Great morning ride through the park..."}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Watch/Platform Format</label>
                <Select value={gpxCreator} onValueChange={setGpxCreator}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {gpxCreatorOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {gpxCreator === "Garmin" && (
                <div className="relative">
                  <label className="text-sm font-medium">Garmin Device/Model</label>
                  <Input
                    ref={garminInputRef}
                    value={garminModel}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setGarminModel(e.target.value);
                      setShowGarminSuggestions(true);
                    }}
                    onFocus={() => setShowGarminSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowGarminSuggestions(false), 100)}
                    placeholder="e.g. Garmin Forerunner 265"
                    className="mt-1"
                  />
                  {showGarminSuggestions && garminModelSuggestions.filter(s => s.toLowerCase().includes(garminModel.toLowerCase())).length > 0 && (
                    <div className="absolute z-10 bg-white border rounded shadow w-full max-h-48 overflow-auto">
                      {garminModelSuggestions.filter(s => s.toLowerCase().includes(garminModel.toLowerCase())).slice(0, 10).map(s => (
                        <div
                          key={s}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          onMouseDown={() => {
                            setGarminModel(s);
                            setShowGarminSuggestions(false);
                            garminInputRef.current?.blur();
                          }}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-base py-3 md:py-2"
                onClick={() => {
                  if (routeStats.distance === 0) return;
                  // Get activity name and description
                  const nameInput = document.querySelector('input[placeholder="Morning Run"]') as HTMLInputElement;
                  if (!nameInput?.value.trim()) return;
                  const activityName = nameInput.value.trim();
                  const activityDesc = (document.querySelector('textarea') as HTMLTextAreaElement)?.value.trim() || '';
                  // Set exact date and time from user inputs
                  const timeSelects = Array.from(document.querySelectorAll('select'));
                  const userHours = timeSelects[0]?.value || '00';
                  const userMinutes = timeSelects[1]?.value || '00';
                  const startDate = new Date(date || new Date());
                  startDate.setHours(parseInt(userHours), parseInt(userMinutes), 0, 0);
                  // Calculate speeds and times
                  const paceInMinPerKm = parseFloat(pace[0].toString());
                  const avgSpeed = activityType === "run"
                    ? 1000 / (paceInMinPerKm * 60) // Convert min/km to m/s
                    : parseFloat(speed[0].toString()) * 1000 / 3600; // Convert km/h to m/s
                  const durationInSeconds = Math.round(routeStats.duration * 60);
                  const distanceInMeters = Math.round(routeStats.distance * 1000);
                  // Interpolate points for realistic GPX
                  const interpolatedCoords = interpolateRoutePoints(coordinates, 10); // 10 meters spacing
                  const n = interpolatedCoords.length;
                  const creatorString = gpxCreator === "Garmin" ? (garminModel.trim() ? garminModel.trim() : "Garmin") : gpxCreator;
                  const gpxContent = `<?xml version="1.0" encoding="UTF-8"?>
<gpx xmlns="http://www.topografix.com/GPX/1/1" 
  xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1"
  xmlns:gpxx="http://www.garmin.com/xmlschemas/GpxExtensions/v3"
  creator="${creatorString}"
  version="1.1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd http://www.garmin.com/xmlschemas/TrackPointExtension/v1 http://www.garmin.com/xmlschemas/TrackPointExtensionv1.xsd">
    <metadata>
      <name>${activityName}</name>
      <desc>${activityDesc}</desc>
      <time>${toLocalISOString(startDate)}</time>
    </metadata>
    <trk>
      <name>${activityName}</name>
      <desc>${activityDesc}</desc>
      <type>${activityType === "run" ? "running" : "cycling"}</type>
      <extensions>
        <gpxx:TrackStatsExtension>
          <gpxx:Distance>${distanceInMeters}</gpxx:Distance>
          <gpxx:TimerTime>${durationInSeconds}</gpxx:TimerTime>
          <gpxx:MovingTime>${durationInSeconds}</gpxx:MovingTime>
          <gpxx:StoppedTime>0</gpxx:StoppedTime>
          <gpxx:MaxSpeed>${avgSpeed}</gpxx:MaxSpeed>
          <gpxx:AverageSpeed>${avgSpeed}</gpxx:AverageSpeed>
        </gpxx:TrackStatsExtension>
      </extensions>
      <trkseg>
${interpolatedCoords.map(([lon, lat], index) => {
          // Distribute time so last point is exactly at start + duration
          const pointTime = new Date(startDate);
          let secondsFromStart = 0;
          if (n > 1) {
            if (index === n - 1) {
              secondsFromStart = durationInSeconds;
            } else {
              secondsFromStart = Math.round((index / (n - 1)) * durationInSeconds);
            }
          }
          pointTime.setSeconds(pointTime.getSeconds() + secondsFromStart);
          // Calculate elevation (optional, can be 0)
          const elevation = 0;
          // Calculate point-specific speed (slightly vary around average)
          const pointSpeed = avgSpeed * (0.95 + (Math.random() * 0.1)); // ±5% variation
          return `      <trkpt lat="${lat}" lon="${lon}">
        <ele>${elevation}</ele>
        <time>${toLocalISOString(pointTime)}</time>
        <extensions>
          <gpxtpx:TrackPointExtension>
            <gpxtpx:speed>${pointSpeed.toFixed(2)}</gpxtpx:speed>
            <gpxtpx:hr>${activityType === "run" ? "165" : "145"}</gpxtpx:hr>
            <gpxtpx:cad>${activityType === "run" ? "180" : "85"}</gpxtpx:cad>
          </gpxtpx:TrackPointExtension>
        </extensions>
      </trkpt>`;
        }).join('\n')}
      </trkseg>
    </trk>
  </gpx>`;
                  const blob = new Blob([gpxContent], { type: 'application/gpx+xml' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `${activityName.toLowerCase().replace(/\s+/g, '-')}.gpx`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }}
                disabled={routeStats.distance === 0}
              >
                Download {activityType === "run" ? "Run" : "Ride"} File
              </Button>
            </div>
          </Card>
      </div>
    </div>
  </main>
)
}
