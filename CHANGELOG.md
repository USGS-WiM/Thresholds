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

## [v1.0.2](https://github.com/USGS-WiM/Thresholds/releases/tag/v1.0.2) - 11/4/2021

### Changed

- Removing radar layer when a date other than today is selected
- Change "Experimental" to "Beta"

### Fixed

- Corrected text error in About dialog

## [v1.0.1](https://github.com/USGS-WiM/Thresholds/releases/tag/v1.0.1) - 10/19/2021

### Added

- Added "Reset View" button that returns map view to full extent

### Changed

- Updated tooltips
- Updated contact us email
- Radar layer now visible on site load

### Fixed

-

## [v1.0.0](https://github.com/USGS-WiM/Thresholds/releases/tag/v1.0.0) - 10/12/2021

### Added

- Added alert to sidebar for "No Flooded Features"
- Added tooltip to "No Active Layers" text
- Added loading alert on time period change
- Added last updated date and gage height to AQ popup headers
- Added opacity sliders for All Features, RT Streamgages, and supporting layers.
- Added available AHPS predicted gage height to AQ popup graphs for current date
- Added new subsection to sidebar
- Added contact email to about

### Changed

- Text change to Layer Names
- Updated about text
- Added all threshold icons to sidebar and legend. Icons without active flooding are disabled in sidebar.
- Changed AQ and Real-time Streamgage popups to be full screen on mobile.
- Removed NWIS link from bottom of streamgage popups and added to popup title.

### Fixed

- Fixed legend mousewheel scrolling and legend title always visible when scrolled
- Fixed mobile bugs in map controls and Safari page navigation
- fixed issue where predicted values were not showing up on todays date after changing dates
- Fix mobile bugs in map controls and Safari page navigation
- Fixed popup title cut off on streamgage popups

## [v0.7.0](https://github.com/USGS-WiM/Thresholds/releases/tag/v0.7.0) - 9/29/2021

### Added

- Added "Error loading NFHL Services" alert if layer load time > 30 seconds or another error occurs
- Added Link to "Subscribe to Water Alert" in reference point popups

### Changed

- Set min date to 01/01/2021 for date picker
- Added time to nwis line on graphs
- Replaced 'Thresholds' and 'Reference Point' language with 'Feature(s)'
- Set datepicker to month view for easier date selection
- Change name of datepicker to "Date"
- Made datepicker menu open on calendar icon click

### Fixed

- Fixed bug in thresholds exceeded count after date change
- Fix nfhl loading alert bug when unchecking nfhl layer before layer is loaded

## [v0.6.0](https://github.com/USGS-WiM/Thresholds/releases/tag/v0.6.0) - 9/22/2021

### Added

- Add tooltips for active flooding
- Added NOAA Tides and Current Stations supporting layer
- Added ability to change time period
- Added alert with thresholds exceeded count to sidebar

### Changed

- Reposition map components on mobile
- Disable "Show All Active Flooding" button when RP layers are all checked
- Changed "Show All Active Flooding" button text to "Show All Active Flooding Layers"

### Fixed

- Fix lat/long/zoom display
- position of popups
- Fixed layer order when toggling RP layer on/off

## [v0.5.0](https://github.com/USGS-WiM/Thresholds/releases/tag/v0.5.0) - 9/1/2021

### Added

- Ability to toggle active flooding subtypes in sidebar
- Add FWW to legend
- Add about section

### Changed

- Removed RPs with active flooding from All RP layer
- Navigation drawer closed on mobile and open on desktop/laptop initally
- Display RPs without real time data on map
- Change supporting layer order in sidebar
- Layers panel expanded on site load
- Update opacity of supporting layers
- Moves geosearch to map control
- Update checkboxes to vuetify

### Fixed

- Hide Show All button and display No Active Flooding text in sidebar when no thresholds met
- Fixed bug in "No active flooding" dialog

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
- rename "streamgage status" to "active flooding" in legend
- Moved NWSR, NFHL, and FWW layers to a "Supporting Layers" section
- fix styling of legend
- remove credit when no graph
- restyle RP icon

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
