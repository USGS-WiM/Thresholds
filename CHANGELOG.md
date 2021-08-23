# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/USGS-WiM/Thresholds/tree/dev)

### Added

-

### Changed

-

### Fixed

-

## [v0.4.0](https://github.com/USGS-WiM/Thresholds/releases/tag/v0.4.0) - 8/19/2021

### Added

- Added Uncategorized icon to map and legend
- Added NFHL layer and legend for NFHL sublayer
- Added No active flooding dialog
- Added NWS Radar layer
- Added layer showing all Reference Points

### Changed

- RP icons visible in legend only if on the map
- Change hydrograph styling
- Increase font size in RP and streamgage popups
- NWIS streamgages shown above RPs when layer is on
- Change default basemap to streets
- Switch RP layer to on by default
- Moved NWSR, NFHL, and FWW layers to a "Supporting Layers" panel

### Fixed

-

## [v0.3.0](https://github.com/USGS-WiM/Thresholds/releases/tag/v0.3.0) - 8/5/2021

### Added

- Added USA banner to top of page
- Added BFE icon to legend
- Added Site Name to popup

### Changed

- Changed icons from boxes to circles
- Changed fonts to dark grey
- Changed graphs font to Public Sans
- Made legend collapsible
- Switched chord and deck icons
- Changed hydrograph date range in AQ popups to test range (8/1/2020-8/8/2020)
- Removed times from x axis labels in AQ popups
- Display only RPs with active flooding on map (using test value 8/4/21 right now)
- Only display threshold in hyrdograph that corresponds to RP type (bank, chord, etc.)

### Fixed

- Fixed mobile responsiveness of header
- Fixed sidebar overlay issue on small screen sizes
- Fixed popup autopanning into view when clicked

## [v0.2.0](https://github.com/USGS-WiM/Thresholds/releases/tag/v0.2.0) - 7/28/2021

### Added

- Added TX location search to navbar
- Added 2 character minimum before displaying menu suggestions
- Added basemap thumbnails
- Added NWIS streamgage layer with Highcharts in popups
- Added loading alert for streamgage layer
- Added zoom level alert message to sidebar layer toggle
- Added WIM favicon
- Added Reference Point Icons for AQUARIUS layer
- Added zoom to AQUARIUS layer on map load
- Added popup to AQUARIUS layer
- Added map legend
- Added thresholds to reference point popups

### Changed

- Moved basemap toggle from map to sidebar
- Moved location search to right side of navbar
- Changed basemap selector from radio input to buttons
- Streamgage popup opens instead of default when USGS ground or surface sites are searched

### Fixed

- Removed vertical scrollbar from page
- Removed console errors due to undefined token in Map.vue
- Fixed popup bug
