// Credits:
// https://chrome.google.com/webstore/detail/ehllkhjndgnlokhomdlhgbineffifcbj (Always active Window - Always Visible)
// https://chrome.google.com/webstore/detail/jehoagbopeaefibnihnfgenfcilmcikj (enable-selection)

chrome.scripting.registerContentScripts([{
    'id': 'keepFocus',
    'js': ['js/keepFocus.js'],
    'matches': ['*://*.pijarsekolah.id/*'],
    'allFrames': true,
    'matchOriginAsFallback': true,
    'runAt': 'document_start',
    'world': 'MAIN'
}]);

chrome.scripting.registerContentScripts([{
    'id': 'selection',
    'js': ['js/enableSelection.js'],
    'matches': ['*://*.pijarsekolah.id/*'],
    'allFrames': true,
    'matchOriginAsFallback': true,
    'runAt': 'document_start',
    'world': 'MAIN'
}]);