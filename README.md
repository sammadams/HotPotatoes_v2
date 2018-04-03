# HotPotatoes_v2

## History
In February 2018, I (Sam) worked with a group of Brazilian EFL teachers in a low-tech environment. Their students have smartphones with built-in browsers but the local infrastructure doesn't have stable network connections. The intermittent internet connection creates limitations for what teachers are able to do with their students. I saw a opportunity to repurpose Hot Potatoes since the small HTML files would allow for quick device-to-device transfer via local wifi; moreover, the HotPot creation interface is accessible for teachers and a large repository of guides in multiple languages already exists.

## Current Problems
### 1. UI display issues
Hot Potatoes was created for devices with large screens, so the hardcoded px styling does not look good on mobile devices. Think about responsive design coding in HTML files?

### 2. Incompatibliity with touchscreens
Some activities don't work properly with touchscreens, such as the JMatch drag-and-drop option. Can the tags be updated to work with these screen types?

### 3. Older media player tags for video/audio
See file "hpobjecttags.ht_" for example. Legacy media players (Quicktime, WMP, Real Player, Flash Player) with <object> tags are not preferable for HTML5 browsers.
  
### 4. Score recording
There is currently no way to store student scores on the local device via .txt or .html file creation. I have been successful in Firefox for storing local cookies and then having the user click a button to generate a table on the main activity page, but Chrome doesn't allow local cookie storage and this has also been problematic on mobile devices (e.g. limited cookie storage: I can only get one set of cookies (date/exercise/score) to store).
  
## Goal
1. Create a mobile-friendly interface for Hot Potatoes HTML files.
2. Have score recording after students complete activities.
3. Identify ways to reduce the number of pages for Hot Pot activities created by Masher.
The Masher currently creates an index page and individual HTML files for all exercises. This might be confusing for some younger students who are accessing the files via .zip folder(s).
