/*widget options:
        usage: <div data-jarvis-widget id="wid-id-0" data-widget-editbutton="false">
        data-widget-colorbutton="false"
        data-widget-editbutton="false"
        data-widget-togglebutton="false"
        data-widget-deletebutton="false"
        data-widget-fullscreenbutton="false"
        data-widget-custombutton="false"
        data-widget-collapsed="true"
        data-widget-sortable="false"
*/
angular.module('smartadmin').directive('jarvisWidget', ['$rootScope', function ($rootScope) {
  return {
    restrict: "A",
    compile: function(element, attributes){
      if(element.data('widget-color'))
        element.addClass('jarviswidget-color-' + element.data('widget-color'));


      element.find('.widget-body').prepend('<div class="jarviswidget-editbox"><input class="form-control" type="text"></div>');

      element.addClass('jarviswidget jarviswidget-sortable');
      $rootScope.$emit('jarvisWidgetAdded', element )

    }
  };
}]);