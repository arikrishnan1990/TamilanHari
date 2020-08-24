function inject() {
  // closure for global window
  ;(function(global) {
    // console.log('embed start; global:', global)
    // add array index of for old browsers (IE<9)
    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function(obj, start) {
        var i, j
        i = start || 0
        j = this.length
        while (i < j) {
          if (this[i] === obj) {
            return i
          }
          i++
        }
        return -1
      }
    }

    /**
     * detect IEEdge
     * returns version of IE/Edge or false, if browser is not a Microsoft browser
     */
    function detectIEEdgeFireFox() {
      var ua = window.navigator.userAgent
      var msie = ua.indexOf('MSIE ')
      if (msie > 0) {
        // IE 10 or older => return version number
        return {
          browser: 'ie10',
          version: parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
        }
      }
      var trident = ua.indexOf('Trident/')
      if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:')
        return {
          browser: 'ie11',
          version: parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
        }
      }
      var edge = ua.indexOf('Edge/')
      if (edge > 0) {
        // Edge => return version number
        return {
          browser: 'edge',
          version: parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
        }
      }
      const ff = ua.indexOf('Firefox/')
      if (ff > 0) {
        const rv = ua.indexOf('rv:')
        const version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
        if (version < 63) {
          return {
            browser: 'firefox',
            version: parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
          }
        }
      }
      // other browser
      return false
    }

    function start(noShadow) {
      var shadowHost = document.getElementById('botcopy-widget-root')
      var shadowRoot = shadowHost
      if (!noShadow) {
        shadowRoot = shadowHost.attachShadow({ mode: 'open' })
      }

      // add the style tag into the head (once only)
      var styleTag = document.createElement('link')
      styleTag.rel = 'stylesheet'
      styleTag.type = 'text/css'
      styleTag.href = 'https://github.com/arikrishnan1990/TamilanHari/blob/master/botnew/css/test-master.css'
      styleTag.media = 'all'
      shadowRoot.appendChild(styleTag)

      // add a font to the head
      var font = document.createElement('link')
      font.rel = 'stylesheet'
      font.href = 'https://fonts.googleapis.com/css?family=Open+Sans'
      font.media = 'all'
      shadowRoot.appendChild(font)

      // add master.js script
      var injectedScript = document.createElement('script')
      injectedScript.type = 'text/javascript'
      injectedScript.async = true
      injectedScript.src = 'https://github.com/arikrishnan1990/TamilanHari/blob/master/botnew/script/test-master.js'
      injectedScript.dataset.cookieconsent = 'ignore' // ignore cookiebot consent
      shadowRoot.appendChild(injectedScript, embedderElement)
    }

    // make a global object to store stuff in
    if (!global.Botcopy) {
      global.Botcopy = {}
    }

    // just get the embedder element by id, can also be a <div> (in portal) or a <script> for clients
    var embedderElement = document.getElementById(
      'botcopy-embedder-d7lcfheammjct'
    )

    // Create a div
    var div = document.createElement('div')
    div.id = 'botcopy-d7lcfheammjct'

    div.className = 'botcopy-embedder-d7lcfheammjct-embeddable'
    div.innerHTML = '<div id="botcopy-widget-root"></div>'

    document.body.appendChild(div)

    const SNIPPET_ID = 'botcopy-embedder-d7lcfheammjct'
    const currentScript = window.document.getElementById(SNIPPET_ID)
    const disableShadowDom =
      currentScript &&
      (currentScript.getAttribute('data-disableShadowDom') === 'true' ||
        currentScript.getAttribute('data-disableShadowDom') === '1')

    const IEEdgeFirefoxResult = detectIEEdgeFireFox()
    if (IEEdgeFirefoxResult) {
      var shadyScript = document.createElement('script')
      shadyScript.type = 'text/javascript'
      shadyScript.async = false // blocking
      shadyScript.src =
        'https://github.com/arikrishnan1990/TamilanHari/blob/master/botnew/script/test-shadydom.min'
      shadyScript.dataset.cookieconsent = 'ignore' // ignore cookiebot consent
      shadyScript.addEventListener('load', function() {
        start(disableShadowDom)
      })
      embedderElement.appendChild(shadyScript, embedderElement)
    } else {
      start(disableShadowDom)
    }
  })(this)
}

if (document.body) {
  inject()
} else {
  // wait till body loaded, some browsers have problems when injected in the <head>
  window.addEventListener('load', inject)
}
