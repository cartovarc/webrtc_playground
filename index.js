
function onCreateOfferPeerA(offer) {
    peer_connection.setLocalDescription(offer);
    console.log("peer a creates this offer");
    console.log(offer.sdp.replaceAll('\n', '\\n'));
}

function onFailedCreatingOfferPeerA(error) {
    console.log("onFailedCreatingOfferPeerA", error);
}

function createOfferPeerA() {
    peer_connection.createOffer(onCreateOfferPeerA, onFailedCreatingOfferPeerA);
}

function setRemoteDescriptionPeerA(sdp) {
    let remote_session_description = new RTCSessionDescription({"sdp": sdp, "type": "answer"})
    peer_connection.setRemoteDescription(remote_session_description)
}

function setRemoteDescriptionPeerB(sdp) {
    let message = {"sdp": sdp, "type": "offer"};
    let remote_session_description = new RTCSessionDescription(message)
    peer_connection.setRemoteDescription(remote_session_description, function() {
        console.log("peer B set offer from peer a as remote description");
        peer_connection.createAnswer(function(answer) {
            console.log("peer b creates answer for peer a");
            console.log(answer.sdp.replaceAll('\n', '\\n'));
        }, function(error) {
            console.log("error creating answer", error);
        })
    })
}

var peer_connection = new RTCPeerConnection();

function addCandidate(candidate_text) {
    let iceCandidate = new RTCIceCandidate(candidate_text);
    peer_connection.addIceCandidate(iceCandidate);
}

peer_connection.onicecandidate = function(candidate) {
    console.log("llegan candidatos", candidate);
}

peer_connection.oniceconnectionstatechange = function(state) {
    console.log("ice connection state chage to", state);
}
