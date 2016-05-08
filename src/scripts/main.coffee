$ ->
    $("#input>button").click ->
        options =
            gifWidth: 77
            gifHeight: 89
            images: ("images/#{i}.png" for i in [1..13])
            numFrames: 13
            text: '膜'+$("#input>input").val()
            fontSize: '16px'
            fontWeight: 'bold'
            fontColor: 'black'
            resizeFont: true
        gifshot.createGIF options, (obj) ->
            return if obj.error
            $("#output").attr 'src', obj.image

