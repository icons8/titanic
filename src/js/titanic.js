// eslint-disable-next-line no-unused-vars
var Titanic; // a global library container

(function () {
  var startAnimationIndex = 0
  var halfAnimationIndex = 13
  var endAnimationIndex = 27

  // --------- Titanic Item ---------- //
  function playOn () {
    this.anim.playSegments([startAnimationIndex, halfAnimationIndex], true)
    this.state = 1
  }

  function playOff () {
    this.anim.playSegments([halfAnimationIndex + 1, endAnimationIndex], true)
    this.state = 0
  }

  function playAll () {
    this.anim.playSegments([startAnimationIndex, endAnimationIndex], true)
    this.state = 0
  }

  function toggle () {
    if (this.state === 0) {
      this.on()
    } else {
      this.off()
    }
  }

  var TitanicItem = function (element, token, options, baseURL) {
    var self = this

    // props
    self.titanicToken = token
    self.state = 0
    // eslint-disable-next-line no-undef
    self.anim = bodymovin.loadAnimation({
      container: element,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: baseURL + token + '.json'
    })

    // methods
    self.on = playOn.bind(self)
    self.off = playOff.bind(self)
    self.play = playAll.bind(self)
    self.toggle = toggle.bind(self)

    if (options.click) {
      element.addEventListener('click', self.toggle)
    }
    if (options.hover) {
      element.addEventListener('pointerenter', self.toggle)
      element.addEventListener('pointerleave', self.toggle)
    }
  }

  // --------- Titanic Library ---------- //

  var titanicIcons = []
  var isInitialized = false

  function initialize (options, callback) {
    var baseURL = options.baseURL

    document.addEventListener('DOMContentLoaded', function () {
      var titanicElements = document.getElementsByClassName('titanic')
      var i = titanicElements.length

      while (i) {
        var element = titanicElements[--i]
        var match = element.className.match(/titanic-([^\s]+)/)
        if (match && match.length && match[1]) {
          titanicIcons.unshift(new TitanicItem(element, match[1], options, baseURL))
        }
      }

      isInitialized = true
      if (typeof callback === 'function') {
        callback()
      }
    })
  }

  function findItem (token) {
    if (!isInitialized) {
      return
    }
    for (var i = titanicIcons.length - 1; i >= 0; i--) {
      if (titanicIcons[i].titanicToken === token) {
        return titanicIcons[i]
      }
    }
  }

  function applyMethod (itemToken, methodToken) {
    var titanicItem = findItem(itemToken)
    if (titanicItem && typeof titanicItem[methodToken] === 'function') {
      titanicItem[methodToken]()
    }
  }

  Titanic = function (options) {
    this.options = {
      baseURL: options.baseURL || 'https://cdn.rawgit.com/icons8/titanic/master/dist/icons/',
      hover: options.hover !== undefined ? options.hover : true,
      click: options.click !== undefined ? options.click : false
    }

    var self = this
    initialize(this.options, function () {
      self.items = titanicIcons
      self.isInitialized = function () {
        return isInitialized
      }
      self.on = function (token) {
        applyMethod(token, 'on')
      }
      self.off = function (token) {
        applyMethod(token, 'off')
      }
      self.play = function (token) {
        applyMethod(token, 'play')
      }
    })
  }
})()
