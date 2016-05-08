$ ->
    $("#input>button").click ->
        options =
            images: ("images/#{i}.png" for i in [1..13])
            numFrames: 13
            text: '膜'+$("#input>input").val()
            fontSize: '28px'
            fontWeight: 'bold'
            fontColor: 'black'
        console.log(options)
        gifshot.createGIF options, (obj) ->
            return if obj.error
            $("#output").attr 'src', obj.image

