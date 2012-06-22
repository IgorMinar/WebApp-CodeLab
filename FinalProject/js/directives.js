var directives = angular.module('wReader.directives', []);


directives.directive('wKeydown', function() {
  return function(scope, elm, attr) {
    elm.bind('keydown', function(e) {
      switch (e.keyCode) {
        case 34: // PgDn
        case 39: // right arrow
        case 40: // down arrow
        case 74: // j
          return scope.$apply(attr.wDown);

        case 32: // Space
          e.preventDefault();
          return scope.$apply(attr.wSpace);

        case 33: // PgUp
        case 37: // left arrow
        case 38: // up arrow
        case 75: // k
          return scope.$apply(attr.wUp);

        case 85: // U
          return scope.$apply(attr.wRead);

        case 72: // H
          return scope.$apply(attr.wStar);
      }
    });
  };
});


/**
 * Component that handles rendering a post content in an iframe. the post content is data-bound into the component via
 * the src attribute.
 *
 * example usage:
 * <w-content src="post.content"><w-conent>
 */
directives.directive('wContent', function() {
  return {
    restrict: 'E',
    template: '<iframe src="post-content.html" seamless></iframe>',
    link: function($scope, $element, attrs) {
      var iframeWindow = $element.find('iframe')[0].contentWindow;


      $scope.$watch(attrs.src, function(content) {
        console.log('new content');
        iframeWindow.postMessage(content, '*');
      });
    }
  }
});