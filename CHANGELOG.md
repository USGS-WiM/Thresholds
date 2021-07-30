# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/USGS-WiM/Thresholds/tree/dev)

### Added

- Added USA banner to top of page

### Changed

- Changed icons from boxes to circles
- Changed fonts to dark grey
- Changed graphs font to Public Sans
- Made legend collapsible

### Fixed

-

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
