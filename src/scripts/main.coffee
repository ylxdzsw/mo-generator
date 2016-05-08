$ ->
    options =
        images: ("images/#{i}.png" for i in [1..13])
        numFrames: 13
    gifshot.createGIF options, (obj) ->
        return if obj.error
        $("#output").attr 'src', obj.image

