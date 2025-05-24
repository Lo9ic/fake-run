(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/Map.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Map)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/mapbox-gl/dist/mapbox-gl.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].accessToken = ("TURBOPACK compile-time value", "pk.eyJ1IjoibG85aWMiLCJhIjoiY21heWxzZnEzMDdraDJxcHN1bHl2ZjkycyJ9.fbx0zaRe4fIEfrHmfFxlIg") || '';
function Map({ onRouteUpdate, searchQuery = "", onSearchQueryChange, onSearchSelect }) {
    _s();
    const mapContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [coordinates, setCoordinates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [mapLoaded, setMapLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showAlignButton, setShowAlignButton] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAligning, setIsAligning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isSearching, setIsSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Handle search input changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Map.useEffect": ()=>{
            const searchLocation = {
                "Map.useEffect.searchLocation": async ()=>{
                    if (!searchQuery) {
                        setSearchResults([]);
                        return;
                    }
                    setIsSearching(true);
                    try {
                        console.log('Searching for:', searchQuery);
                        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].accessToken}&limit=5&types=place,locality,neighborhood,address`);
                        if (!response.ok) {
                            throw new Error('Search failed');
                        }
                        const data = await response.json();
                        console.log('Search results:', data);
                        if (data.features && data.features.length > 0) {
                            setSearchResults(data.features);
                            setError(null);
                        } else {
                            setSearchResults([]);
                            setError('No results found');
                        }
                    } catch (err) {
                        console.error('Search error:', err);
                        setError('Failed to search location');
                    } finally{
                        setIsSearching(false);
                    }
                }
            }["Map.useEffect.searchLocation"];
            if (searchQuery.length >= 2) {
                const debounceTimer = setTimeout(searchLocation, 300);
                return ({
                    "Map.useEffect": ()=>clearTimeout(debounceTimer)
                })["Map.useEffect"];
            } else {
                setSearchResults([]);
            }
        }
    }["Map.useEffect"], [
        searchQuery
    ]);
    // Handle input change
    const handleInputChange = (e)=>{
        const value = e.target.value;
        console.log('Input changed:', value);
        onSearchQueryChange?.(value);
    };
    const handleSearchSelect = (result)=>{
        if (!map.current) return;
        const [lng, lat] = result.center;
        map.current.flyTo({
            center: [
                lng,
                lat
            ],
            zoom: 14
        });
        onSearchSelect?.(result);
        setSearchResults([]);
    };
    // Calculate route statistics
    const calculateRouteStats = async (coords)=>{
        let distance = 0;
        let elevationGain = 0;
        for(let i = 1; i < coords.length; i++){
            const [lon1, lat1] = coords[i - 1];
            const [lon2, lat2] = coords[i];
            const R = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            distance += R * c;
        }
        elevationGain = Math.round(distance * 25);
        const baseDuration = distance * 5.5;
        const elevationTime = elevationGain / 60;
        const turns = coords.length - 1;
        const turnsTime = turns * 5 / 60;
        const duration = baseDuration + elevationTime + turnsTime;
        return {
            distance,
            duration,
            elevationGain
        };
    };
    // Initialize map
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Map.useEffect": ()=>{
            if (!mapContainer.current || map.current) return;
            const mapInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [
                    2.3522,
                    48.8566
                ],
                zoom: 13
            });
            mapInstance.on('load', {
                "Map.useEffect": ()=>{
                    mapInstance.addSource('route', {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: []
                            }
                        }
                    });
                    mapInstance.addLayer({
                        id: 'route',
                        type: 'line',
                        source: 'route',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#ff4400',
                            'line-width': 3
                        }
                    });
                    map.current = mapInstance;
                    setMapLoaded(true);
                }
            }["Map.useEffect"]);
            return ({
                "Map.useEffect": ()=>{
                    mapInstance.remove();
                    map.current = null;
                    setMapLoaded(false);
                }
            })["Map.useEffect"];
        }
    }["Map.useEffect"], []);
    // Handle map clicks and route drawing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Map.useEffect": ()=>{
            if (!map.current || !mapLoaded) return;
            const handleClick = {
                "Map.useEffect.handleClick": async (e)=>{
                    // Clear search results when clicking on map
                    setSearchResults([]);
                    onSearchQueryChange?.("");
                    const newCoord = [
                        e.lngLat.lng,
                        e.lngLat.lat
                    ];
                    const newCoords = [
                        ...coordinates,
                        newCoord
                    ];
                    setCoordinates(newCoords);
                    try {
                        const stats = await calculateRouteStats(newCoords);
                        onRouteUpdate?.(newCoords, stats);
                        const source = map.current?.getSource('route');
                        source.setData({
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: newCoords
                            }
                        });
                        const marker = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Marker({
                            color: '#ff4400'
                        }).setLngLat(newCoord).addTo(map.current);
                        markersRef.current.push(marker);
                        // Show align button when we have at least 2 points
                        if (newCoords.length >= 2) {
                            setShowAlignButton(true);
                        }
                        setError(null);
                    } catch (error) {
                        console.error('Error calculating route stats:', error);
                        setError('Failed to calculate route statistics');
                    }
                }
            }["Map.useEffect.handleClick"];
            map.current.on('click', handleClick);
            return ({
                "Map.useEffect": ()=>{
                    if (map.current) {
                        map.current.off('click', handleClick);
                    }
                }
            })["Map.useEffect"];
        }
    }["Map.useEffect"], [
        mapLoaded,
        coordinates,
        onRouteUpdate
    ]);
    const resetPoints = ()=>{
        setCoordinates([]);
        markersRef.current.forEach((marker)=>marker.remove());
        markersRef.current = [];
        setShowAlignButton(false);
        const source = map.current?.getSource('route');
        source.setData({
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: []
            }
        });
        onRouteUpdate?.([], {
            distance: 0,
            duration: 0,
            elevationGain: 0
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: searchQuery,
                                onChange: handleInputChange,
                                placeholder: "Search for a location...",
                                className: "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent",
                                autoComplete: "off"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Map.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this),
                            isSearching && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute right-3 top-1/2 transform -translate-y-1/2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "animate-spin h-5 w-5 border-2 border-orange-500 rounded-full border-t-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Map.tsx",
                                    lineNumber: 280,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Map.tsx",
                                lineNumber: 279,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Map.tsx",
                        lineNumber: 269,
                        columnNumber: 9
                    }, this),
                    searchResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "absolute z-10 w-full bg-white border rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg",
                        children: searchResults.map((result)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "px-4 py-2 hover:bg-gray-100 cursor-pointer",
                                onClick: ()=>handleSearchSelect(result),
                                children: result.place_name
                            }, result.place_name, false, {
                                fileName: "[project]/src/components/Map.tsx",
                                lineNumber: 287,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Map.tsx",
                        lineNumber: 285,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Map.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mapContainer,
                className: "h-[600px] w-full rounded-lg"
            }, void 0, false, {
                fileName: "[project]/src/components/Map.tsx",
                lineNumber: 298,
                columnNumber: 7
            }, this),
            showAlignButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 left-4 flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: async ()=>{
                            setIsAligning(true);
                            try {
                                console.log('Align to Roads: Sending request with coordinates:', coordinates);
                                const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${coordinates.map((coord)=>coord.join(',')).join(';')}?geometries=geojson&access_token=${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].accessToken}`);
                                console.log('Align to Roads: Response status:', response.status);
                                if (!response.ok) throw new Error('Failed to align route');
                                const data = await response.json();
                                console.log('Align to Roads: Response data:', data);
                                if (data.routes && data.routes[0]) {
                                    const alignedCoords = data.routes[0].geometry.coordinates;
                                    console.log('Aligned coordinates:', alignedCoords);
                                    setCoordinates(alignedCoords);
                                    // Update the route line
                                    const source = map.current?.getSource('route');
                                    console.log('Updating route source with aligned coordinates');
                                    source.setData({
                                        type: 'Feature',
                                        properties: {},
                                        geometry: {
                                            type: 'LineString',
                                            coordinates: alignedCoords
                                        }
                                    });
                                    // Update markers
                                    console.log('Removing old markers and adding new markers for aligned coordinates');
                                    markersRef.current.forEach((marker)=>marker.remove());
                                    markersRef.current = alignedCoords.map((coord)=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$mapbox$2d$gl$2f$dist$2f$mapbox$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Marker({
                                            color: '#ff4400'
                                        }).setLngLat(coord).addTo(map.current));
                                    // Update stats
                                    const stats = await calculateRouteStats(alignedCoords);
                                    onRouteUpdate?.(alignedCoords, stats);
                                }
                            } catch (err) {
                                console.error('Error aligning to roads:', err);
                                setError('Failed to align route to roads');
                            } finally{
                                setIsAligning(false);
                            }
                        },
                        disabled: isAligning,
                        className: "bg-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-800",
                        children: isAligning ? 'Aligning...' : 'Align to Roads'
                    }, void 0, false, {
                        fileName: "[project]/src/components/Map.tsx",
                        lineNumber: 301,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: resetPoints,
                        disabled: isAligning,
                        className: "bg-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-800",
                        children: "Reset Points"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Map.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Map.tsx",
                lineNumber: 300,
                columnNumber: 9
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-20 left-4 right-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/Map.tsx",
                lineNumber: 366,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Map.tsx",
        lineNumber: 267,
        columnNumber: 5
    }, this);
}
_s(Map, "9uWmYfCO8JpPxGSNhmoo79BHRGU=");
_c = Map;
var _c;
__turbopack_context__.k.register(_c, "Map");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Map.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/Map.tsx [app-client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=src_components_Map_tsx_80bcc3a8._.js.map