// Tone JS

//creating a tone js player for each backing track and connecting them each to the master output

//this hip hop loop was sequenced by myself using samples from a sample pack called "Hip Hop Drum Loops Pack" from "https://www.partnersinrhyme.com/pirsounds/FreeDrumLoops.shtml"
var hipHopPlayer = new Tone.Player("https://rawgit.com/bret1260/drum-loops/master/hiphoploop.wav");
hipHopPlayer.connect(Tone.Master);

//this dubstep loop was sequenced by myself using samples from a sample pack called "Ghosthack's free Dubstep Pack 1" from  "https://www.ghosthack.de/remository/dubstep-samples/100-Dubstep-Samples/"
var dubstepPlayer = new Tone.Player("https://rawgit.com/bret1260/drum-loops/master/dubsteploop.wav");
dubstepPlayer.connect(Tone.Master);

//this house loop was sequenced by myself using samples from a sample pack called "House drums" from "http://www.producerspot.com/free-house-drum-kit-drum-samples-by-producer-spot"
var housePlayer = new Tone.Player("https://rawgit.com/bret1260/drum-loops/master/houseloop.wav");
housePlayer.connect(Tone.Master);

//this first jungle loop is an excerpt from "Amen, Brother" by The Winstons (Metromedia 1969)
var jungle1Player = new Tone.Player("https://rawgit.com/bret1260/drum-loops/master/amenjunglebreak.wav");
jungle1Player.connect(Tone.Master);

//this second jungle loop is an excerpt from "Apache" by Incredible Bongo Band (Pride 1973)
var jungle2Player = new Tone.Player("https://rawgit.com/bret1260/drum-loops/master/apachejunglebreak.wav");
jungle2Player.connect(Tone.Master);

//this drum and bass loop was sequenced by myself using samples from a sample pack called "Free Dnb Drums" from "https://www.samplephonics.com/products/free/drums/free-dnb-drums"
var drumAndBassPlayer = new Tone.Player("https://rawgit.com/bret1260/drum-loops/master/drumandbassloop.wav");
drumAndBassPlayer.connect(Tone.Master);

//The first oscillator - a sine wave
var synth1 = new Tone.MonoSynth({
                                "oscillator" : {
                                "type" : "sine"
                                },
                                "envelope" : {
                                "attack" : 0.1
                                }
                                }).toMaster();
synth1.connect(Tone.Master);
synth1.set({
           volume: -100
           });


//The second oscillator - a square wave
var synth2 = new Tone.MonoSynth({
                                "oscillator" : {
                                "type" : "square"
                                },
                                "envelope" : {
                                "attack" : 0.1
                                }
                                }).toMaster();
synth2.connect(Tone.Master);
synth2.set({
           volume: -24
           });

//the third oscillator - a sawtooth wave
var synth3 = new Tone.MonoSynth({
                                "oscillator" : {
                                "type" : "sawtooth"
                                },
                                "envelope" : {
                                "attack" : 0.1
                                }
                                }).toMaster();
synth3.connect(Tone.Master);
synth3.set({
           volume: -100
           });

//creating a variable for the amplitude envelope and initialising the values for ADSR 
var ampEnv = new Tone.AmplitudeEnvelope({
                                        "attack": 0.1,
                                        "decay": 0.2,
                                        "sustain": 1.0,
                                        "release": 0.8
                                        }).toMaster();

//creating a variable for the reverb effect and setting the room size, dampening and dry/wet
var reverbUnit = new Tone.Freeverb();
reverbUnit.set({
               roomSize: 0.9
               
               });

reverbUnit.set({
               dampening: 20000
               
               });
reverbUnit.wet.value = 1;

//creating a send for each oscillator called "reverb" and initialising the gain sent to it at -100db
var reverbSend1 = synth1.send("reverb", -100);
var reverbSend2 = synth2.send("reverb", -100);
var reverbSend3 = synth3.send("reverb", -100);

//telling the reverb effect to receive this send and connect it to the master output
reverbUnit.receive("reverb");
reverbUnit.connect(Tone.Master);

//creating a variable for the delay effect
var delayUnit = new Tone.FeedbackDelay("8n", 0.5).toMaster();
delayUnit.wet.value = 1;

//creating a send for each oscillator called "delay" and initialising the gain sent to it at -100db
var delaySend1 = synth1.send("delay", -100);
var delaySend2 = synth2.send("delay", -100);
var delaySend3 = synth3.send("delay", -100);

//telling the delay effect to receive this send and connect it to the master output
delayUnit.receive("delay");
delayUnit.connect(Tone.Master);

//creating a variable for the distortion effect
var distortionUnit = new Tone.Chebyshev(3, "4x").toMaster();
distortionUnit.wet.value = 1;

//creating a send for each oscillator called "distortion" and initialising the gain sent to it at -100db
var distortionSend1 = synth1.send("distortion", -100);
var distortionSend2 = synth2.send("distortion", -100);
var distortionSend3 = synth3.send("distortion", -100);

//telling the distortion effect to receive this send and connect it to the master output
distortionUnit.receive("distortion");
distortionUnit.connect(Tone.Master);

//creating a variable for the phaser effect
var phaserUnit = new Tone.Phaser(2).toMaster();
phaserUnit.wet.value = 1;

//creating a send for each oscillator called "phaser" and initialising the gain sent to it at -100db
var phaserSend1 = synth1.send("phaser", -100);
var phaserSend2 = synth2.send("phaser", -100);
var phaserSend3 = synth3.send("phaser", -100);

//telling the phaser effect to receive this send and connect it to the master output
phaserUnit.receive("phaser");
phaserUnit.connect(Tone.Master);

//creating a variable for the chorus effect
var chorusUnit = new Tone.Chorus(4, 2.5, 0.5);
chorusUnit.wet.value = 1;

//creating a send for each oscillator called "chorus" and initialising the gain sent to it at -100db
var chorusSend1 = synth1.send("chorus", -100);
var chorusSend2 = synth2.send("chorus", -100);
var chorusSend3 = synth3.send("chorus", -100);

//telling the chorus effect to receive this send and connect it to the master output
chorusUnit.receive("chorus");
chorusUnit.connect(Tone.Master);

//creating a function for what happens when the detune dial is moved - detune 
var pitchDialActions = function(pitchDialData, pitchsynthparam){

    // dial value comes in in semitones - but the detune value is in cents so this is being converted into cents 
    pitchsynthparam.value = (pitchDialData.value * 100);
};

//creating a function for what happens when the cut off dial is moved - map this to the frequency of the filter envelope
var cutOffDialActions = function(cutOffDialData){
    synth1.filterEnvelope.baseFrequency = (cutOffDialData.value / 200);
    synth2.filterEnvelope.baseFrequency = (cutOffDialData.value / 200);
    synth3.filterEnvelope.baseFrequency = (cutOffDialData.value / 200);
};

//creating functions for what happens when each backing track toggle is clicked - start playing the file, loop it, initialise the volume at -12  then stop the file when it is clicked again
function hipHopToggleActions(event){
    if (event.value == 1 ){
        hipHopPlayer.start();
        hipHopPlayer.loop = true;
        hipHopPlayer.volume.value = -12;
    }
    else {
        hipHopPlayer.stop();
    }
}
function dubstepToggleActions(event){
    if (event.value == 1 ){
        dubstepPlayer.start();
        dubstepPlayer.loop = true;
        dubstepPlayer.volume.value = -12;
    }
    else {
        dubstepPlayer.stop();
    }
}
function houseToggleActions(event){
    if (event.value == 1 ){
        housePlayer.start();
        housePlayer.loop = true;
        housePlayer.volume.value = -12;
    }
    else {
        housePlayer.stop();
    }
}
function jungle1ToggleActions(event){
    if (event.value == 1 ){
        jungle1Player.start();
        jungle1Player.loop = true;
        jungle1Player.volume.value = -12;
    }
    else {
        jungle1Player.stop();
    }
}
function jungle2ToggleActions(event){
    if (event.value == 1 ){
        jungle2Player.start();
        jungle2Player.loop = true;
        jungle2Player.volume.value = -12;
    }
    else {
        console.log(event.value);
        jungle2Player.stop();
    }
}
function drumAndBassToggleActions(event){
    if (event.value == 1 ){
        drumAndBassPlayer.start();
        drumAndBassPlayer.loop = true;
        drumAndBassPlayer.volume.value = -12;
    }
    else {
        console.log(event.value);
        drumAndBassPlayer.stop();
    }
}

//creating a function for what happens when a nx keyboard object is clicked
var midiKeysActions = function(keydata) {
    if (keydata.on) {
        var note = keydata.note;
        var frequency = Tone.Frequency(note, "midi").eval();
        //start the corresponding note from each oscillator when note is clicked
        synth1.triggerAttackRelease(frequency, "1n");
        synth2.triggerAttackRelease(frequency, "1n");
        synth3.triggerAttackRelease(frequency, "1n");
            }
    else {
        //stop the corresponding note from each oscillator when note is released
        synth1.triggerRelease();
        synth2.triggerRelease();
        synth3.triggerRelease();
    }
};
