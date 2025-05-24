"use client"

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

interface MapProps {
  onRouteUpdate?: (coordinates: number[][], stats: RouteStats) => void;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  onSearchSelect?: (result: SearchResult) => void;
}

interface SearchResult {
  center: [number, number];
  place_name: string;
}

interface RouteStats {
  distance: number;
  duration: number;
  elevationGain: number;
}

type Coordinate = [number, number]

export default function Map({ 
  onRouteUpdate, 
  searchQuery = "", 
  onSearchQueryChange,
  onSearchSelect 
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [coordinates, setCoordinates] = useState<Coordinate[]>([])
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [showAlignButton, setShowAlignButton] = useState(false)
  const [isAligning, setIsAligning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Handle search input changes
  useEffect(() => {
    const searchLocation = async () => {
      if (!searchQuery) {
        setSearchResults([])
        return
      }

      setIsSearching(true)
      try {
        console.log('Searching for:', searchQuery)
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxgl.accessToken}&limit=5&types=place,locality,neighborhood,address`
        )
        if (!response.ok) {
          throw new Error('Search failed')
        }
        
        const data = await response.json()
        console.log('Search results:', data)
        
        if (data.features && data.features.length > 0) {
          setSearchResults(data.features)
          setError(null)
        } else {
          setSearchResults([])
          setError('No results found')
        }
      } catch (err) {
        console.error('Search error:', err)
        setError('Failed to search location')
      } finally {
        setIsSearching(false)
      }
    }

    if (searchQuery.length >= 2) {
      const debounceTimer = setTimeout(searchLocation, 300)
      return () => clearTimeout(debounceTimer)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    console.log('Input changed:', value)
    onSearchQueryChange?.(value)
  }

  const handleSearchSelect = (result: SearchResult) => {
    if (!map.current) return

    const [lng, lat] = result.center
    map.current.flyTo({
      center: [lng, lat],
      zoom: 14
    })

    onSearchSelect?.(result)
    setSearchResults([])
  }

  // Calculate route statistics
  const calculateRouteStats = async (coords: Coordinate[]): Promise<RouteStats> => {
    let distance = 0;
    let elevationGain = 0;

    for (let i = 1; i < coords.length; i++) {
      const [lon1, lat1] = coords[i - 1];
      const [lon2, lat2] = coords[i];
      
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      distance += R * c;
    }

    elevationGain = Math.round(distance * 25);

    const baseDuration = distance * 5.5;
    const elevationTime = elevationGain / 60;
    const turns = coords.length - 1;
    const turnsTime = (turns * 5) / 60;
    
    const duration = baseDuration + elevationTime + turnsTime;

    return {
      distance,
      duration,
      elevationGain
    };
  }

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [2.3522, 48.8566],
      zoom: 13,
    })

    mapInstance.on('load', () => {
      mapInstance.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [],
          },
        },
      })

      mapInstance.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#ff4400',
          'line-width': 3,
        },
      })

      map.current = mapInstance
      setMapLoaded(true)
    })

    return () => {
      mapInstance.remove()
      map.current = null
      setMapLoaded(false)
    }
  }, [])

  // Handle map clicks and route drawing
  useEffect(() => {
    if (!map.current || !mapLoaded) return

    const handleClick = async (e: mapboxgl.MapMouseEvent) => {
      // Clear search results when clicking on map
      setSearchResults([])
      onSearchQueryChange?.("")

      const newCoord: Coordinate = [e.lngLat.lng, e.lngLat.lat]
      const newCoords = [...coordinates, newCoord]
      setCoordinates(newCoords)
      
      try {
        const stats = await calculateRouteStats(newCoords)
        onRouteUpdate?.(newCoords, stats)

        const source = map.current?.getSource('route') as mapboxgl.GeoJSONSource
        source.setData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: newCoords,
          },
        })

        const marker = new mapboxgl.Marker({ color: '#ff4400' })
          .setLngLat(newCoord)
          .addTo(map.current!)
        markersRef.current.push(marker)

        // Show align button when we have at least 2 points
        if (newCoords.length >= 2) {
          setShowAlignButton(true)
        }
        setError(null)
      } catch (error) {
        console.error('Error calculating route stats:', error)
        setError('Failed to calculate route statistics')
      }
    }

    map.current.on('click', handleClick)

    return () => {
      if (map.current) {
        map.current.off('click', handleClick)
      }
    }
  }, [mapLoaded, coordinates, onRouteUpdate])

  const resetPoints = () => {
    setCoordinates([])
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []
    setShowAlignButton(false)
    
    const source = map.current?.getSource('route') as mapboxgl.GeoJSONSource
    source.setData({
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [],
      },
    })

    onRouteUpdate?.([], { distance: 0, duration: 0, elevationGain: 0 })
  }

  return (
    <div className="relative">
      <div className="relative mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for a location..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            autoComplete="off"
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin h-5 w-5 border-2 border-orange-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>
        {searchResults.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
            {searchResults.map((result) => (
              <li
                key={result.place_name}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSearchSelect(result)}
              >
                {result.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div ref={mapContainer} className="h-[600px] w-full rounded-lg" />
      {showAlignButton && (
        <div className="absolute bottom-4 left-4 flex gap-2">
          <button
            onClick={async () => {
              setIsAligning(true)
              try {
                console.log('Align to Roads: Sending request with coordinates:', coordinates)
                const response = await fetch(
                  `https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates.map(coord => coord.join(',')).join(';')}?geometries=geojson&access_token=${mapboxgl.accessToken}`
                )
                console.log('Align to Roads: Response status:', response.status)
                if (!response.ok) throw new Error('Failed to align route')
                
                const data = await response.json()
                console.log('Align to Roads: Response data:', data)
                if (data.routes && data.routes[0]) {
                  const alignedCoords = data.routes[0].geometry.coordinates as Coordinate[]
                  console.log('Aligned coordinates:', alignedCoords)
                  setCoordinates(alignedCoords)
                  
                  // Update the route line
                  const source = map.current?.getSource('route') as mapboxgl.GeoJSONSource
                  console.log('Updating route source with aligned coordinates')
                  source.setData({
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'LineString',
                      coordinates: alignedCoords,
                    },
                  })
                  
                  // Update markers
                  console.log('Removing old markers and adding new markers for aligned coordinates')
                  markersRef.current.forEach(marker => marker.remove())
                  markersRef.current = alignedCoords.map(coord => 
                    new mapboxgl.Marker({ color: '#ff4400' })
                      .setLngLat(coord)
                      .addTo(map.current!)
                  )
                  
                  // Update stats
                  const stats = await calculateRouteStats(alignedCoords)
                  onRouteUpdate?.(alignedCoords, stats)
                }
              } catch (err) {
                console.error('Error aligning to roads:', err)
                setError('Failed to align route to roads')
              } finally {
                setIsAligning(false)
              }
            }}
            disabled={isAligning}
            className="bg-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-800"
          >
            {isAligning ? 'Aligning...' : 'Align to Roads'}
          </button>
          <button
            onClick={resetPoints}
            disabled={isAligning}
            className="bg-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-800"
          >
            Reset Points
          </button>
        </div>
      )}
      {error && (
        <div className="absolute bottom-20 left-4 right-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
    </div>
  )
}
