(function() {
  $(function() {
    return $("#input>button").click(function() {
      var options;
      options = {
        gifWidth: 102,
        gifHeight: 97,
        images: ["images/nonexistence.jpg"],
        numFrames: 13,
        text: $("#name").val(),
        fontSize: '16px',
        fontWeight: 'bold',
        fontColor: 'black',
        resizeFont: true
      };
      return gifshot.createGIF(options, function(obj) {
        if (obj.error) {
          return;
        }
        return $("#output").attr('src', obj.image);
      });
    });
  });

}).call(this);
