let webcamButton = document.querySelector('#TurnOnWebcam')
let video = document.querySelector('#videoElement')

webcamButton.addEventListener('click',() => {
    if (navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia( { video:true} )
            .then( function (stream) {
                video.srcObject = stream
            })
            .catch( (err) => console.log( err ))
    }else{
        console.log("not working")
    }
})
