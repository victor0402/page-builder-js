var PBJS_BaseComponent = {

  currentId: 0,

  componentType: 'changeme',

  componentLabel: 'changeme',

  componentIcon: 'fa fa-question',

  options: null,

  getNextId: function () {
    return 'pbjs-' + this.componentType + '-' + ++this.currentId;
  },

  getCurrentId: function () {
    return 'pbjs-' + this.componentType + '-' + this.currentId;
  },

  afterExport: function () {
  },

  exportContent: function () {
    return "<h1>change me!</h1>";
  }
};

