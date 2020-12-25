/* globals UAParser */

'use strict';

const DCSI = 'firefox-default';
const tmp = {};


chrome.storage.onChanged.addListener(ps => {
  Object.keys(ps).forEach(key => tmp[key] = ps[key]['newValue']);
  ua.update(undefined, undefined);
});


const ua = {
  _obj: {},

  object(windowId, cookieStoreId = DCSI) {
    return this._obj[cookieStoreId]['global'];
  },
  
  string(str, windowId, cookieStoreId) {
    this._obj[cookieStoreId] = {};
    
    const o = {};
    o.userAgent = str
    this._obj[cookieStoreId][windowId] = o;
  },
  
  update(str = tmp.ua, windowId = 'global', cookieStoreId = DCSI) {
    ua.string(str, windowId, cookieStoreId);
    chrome.webNavigation.onCommitted.addListener(onCommitted);
  }
};


const onCommitted = d => {
  const {frameId, url, tabId} = d;
  const cookieStoreId = DCSI;

  chrome.tabs.executeScript(tabId, {
    runAt: 'document_start',
    frameId,
    code: `{
      const script = document.createElement('script');
      script.textContent = \`{
      const o = JSON.parse('${JSON.stringify(ua.object(tabId, undefined, cookieStoreId))}');
      navigator.__defineGetter__('userAgent', () =>
        {
          return o['userAgent'];
      });
      }\`;
      document.documentElement.appendChild(script);
      script.remove();
    }`
  });
};
