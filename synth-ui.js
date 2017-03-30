
// Nexus UI
nx.onload = function(){
    
    //setting the minimum and maximum values for each oscillator and initialising them 
    oscOneSine.min = -100;
    oscOneSine.max = 6;
    oscOneSine.val.value = -100;
    oscOneSine.init();
    oscOneSine.on("*", function(oscOneSineData){
        //mapping the volume of oscillator 1 to the value of the volume slider for oscillator 1 
        synth1.volume.value = oscOneSineData.value;
    });
    oscTwoSquare.min = -100;
    oscTwoSquare.max = 6;
    oscTwoSquare.val.value = -24;
    oscTwoSquare.init();
    oscTwoSquare.on("*", function(oscOneSquareData){
        //mapping the volume of oscillator 2 to the value of the volume slider for oscillator 2
        synth2.volume.value = oscOneSquareData.value;
    });
    oscThreeSawtooth.min = -100;
    oscThreeSawtooth.max = 6;
    oscThreeSawtooth.val.value = -100;
    oscThreeSawtooth.init();
    oscThreeSawtooth.on("*", function(oscOneSawtoothData){
        //mapping the volume of oscillator 2 to the value of the volume slider for oscillator 2
        synth3.volume.value = oscOneSawtoothData.value;
    });
    
    //setting the minimum and maximum values for the detune dial and intialising it at 0
    pitch.min = -24;
    pitch.max = 24;
    pitch.val.value = 0;
    pitch.init();
    pitch.on("*", function(d){
        //when the pitch dial is moved use function defined as pitchDialActions
        pitchDialActions(d, synth1.detune);
    });
    pitch.on("*", function(d){
        pitchDialActions(d, synth2.detune);
    });
    pitch.on("*", function(d){
        pitchDialActions(d, synth3.detune);
    });
    
    //setting the minimum and maximum values for the ADSR dials
    A.min = D.min = S.min = R.min = 0;
    A.max = D.max = R.max = 3;
    S.max = 1;
    
    //initialising each one at specific values
    A.val.value = 0.005;
    D.val.value = 0.1;
    S.val.value = 0.9;
    R.val.value = 1;
    A.init();
    D.init();
    S.init();
    R.init();
    
    //creating functions for each dial to be mapped to the parameter chosen (attack/decay/sustain/release)
    A.on("*", function(d){
         synth1.envelope.attack = d.value;
         synth2.envelope.attack = d.value;
         synth3.envelope.attack = d.value;
    });
    D.on("*", function(d){
         synth1.envelope.decay = d.value;
         synth2.envelope.decay = d.value;
         synth3.envelope.decay = d.value;
    });
    S.on("*", function(d){
         synth1.envelope.sustain = d.value;
         synth2.envelope.sustain = d.value;
         synth3.envelope.sustain = d.value;
    });
    R.on("*", function(d){
         synth1.envelope.release = d.value;
         synth2.envelope.release = d.value;
         synth3.envelope.release = d.value;
    });
    
    //setting the minimum and maximum values for various dials and initialising them at specific values and mapping them to their respective tone js values required
    cutOff.min = 20;
    cutOff.max = 20000;
    cutOff.val.value = 20000;
    cutOff.init();
    cutOff.on("*", function(dial){
        cutOffDialActions(dial);
    });
    reverbDryWet.min = -100;
    reverbDryWet.max = 6;
    reverbDryWet.val.value = -100;
    reverbDryWet.init();
    reverbDryWet.on("*", function(reverbDryWetData){
        reverbSend1.gain.value = reverbDryWetData.value;
    });
    reverbDryWet.on("*", function(reverbDryWetData){
        reverbSend2.gain.value = reverbDryWetData.value;
    });
    reverbDryWet.on("*", function(reverbDryWetData){
        reverbSend3.gain.value = reverbDryWetData.value;
    });
    delayDryWet.min = -100;
    delayDryWet.max = 6;
    delayDryWet.val.value = -100;
    delayDryWet.init();
    delayDryWet.on("*", function(delayDryWetData){
        delaySend1.gain.value = delayDryWetData.value;
    });
    delayDryWet.on("*", function(delayDryWetData){
        delaySend2.gain.value = delayDryWetData.value;
    });
    delayDryWet.on("*", function(delayDryWetData){
        delaySend3.gain.value = delayDryWetData.value;
    });
    delayRate.min = 0;
    delayRate.max = 1;
    delayRate.val.value = 0.5;
    delayRate.init();
    delayRate.on("*", function(delayRateData){
        delayUnit.delayTime.value = delayRateData.value;
    });
    delayFeedback.min = 0;
    delayFeedback.max = 1;
    delayFeedback.val.value = 0.2;
    delayFeedback.init();
    delayFeedback.on("*", function(delayFeedbackData){
        delayUnit.feedback.value = delayFeedbackData.value;
    });
    distortionDryWet.min = -100;
    distortionDryWet.max = 6;
    distortionDryWet.val.value = -100;
    distortionDryWet.init();
    distortionDryWet.on("*", function(distortionDryWetData){
        distortionSend1.gain.value = distortionDryWetData.value;
    });
    distortionDryWet.on("*", function(distortionDryWetData){
        distortionSend2.gain.value = distortionDryWetData.value;
    });
    distortionDryWet.on("*", function(distortionDryWetData){
        distortionSend3.gain.value = distortionDryWetData.value;
    });
    phaserDryWet.min = -100;
    phaserDryWet.max = 6;
    phaserDryWet.val.value = -100;
    phaserDryWet.init();
    phaserDryWet.on("*", function(phaserDryWetData){
        phaserSend1.gain.value = phaserDryWetData.value;
    });
    phaserDryWet.on("*", function(phaserDryWetData){
        phaserSend2.gain.value = phaserDryWetData.value;
    });
    phaserDryWet.on("*", function(phaserDryWetData){
        phaserSend3.gain.value = phaserDryWetData.value;
    });
    chorusDryWet.min = -100;
    chorusDryWet.max = 6;
    chorusDryWet.val.value = -100;
    chorusDryWet.init();
    chorusDryWet.on("*", function(chorusDryWetData){
        chorusSend1.gain.value = chorusDryWetData.value;
    });
    chorusDryWet.on("*", function(chorusDryWetData){
        chorusSend2.gain.value = chorusDryWetData.value;
    });
    chorusDryWet.on("*", function(chorusDryWetData){
        chorusSend3.gain.value = chorusDryWetData.value;
    });
    chorusRate.min = 2;
    chorusRate.max = 20;
    chorusRate.val.value = 2.5;
    chorusRate.init();
    chorusRate.on("*", function(chorusRateData){
        chorusUnit.delayTime = chorusRateData.value;
    });
    trackVolume.min = -100;
    trackVolume.max = 6;
    trackVolume.val.value = -12;
    trackVolume.init();
    trackVolume.on("*", function(trackVolumeData){
        hipHopPlayer.volume.value = trackVolumeData.value;
    });
    trackVolume.on("*", function(trackVolumeData){
        dubstepPlayer.volume.value = trackVolumeData.value;
    });
    trackVolume.on("*", function(trackVolumeData){
        housePlayer.volume.value = trackVolumeData.value;
    });
    trackVolume.on("*", function(trackVolumeData){
        jungle1Player.volume.value = trackVolumeData.value;
    });
    trackVolume.on("*", function(trackVolumeData){
        jungle2Player.volume.value = trackVolumeData.value;
    });
    trackVolume.on("*", function(trackVolumeData){
        drumAndBassPlayer.volume.value = trackVolumeData.value;
    });
    
    //telling the program to execute the functions that were defined in "synth-audio.js"- playing and stopping the audio when the toggles are clicked on/off
    hipHop.on("*", hipHopToggleActions);
    dubstep.on("*", dubstepToggleActions);
    house.on("*", houseToggleActions);
    jungle1.on("*", jungle1ToggleActions);
    jungle2.on("*", jungle2ToggleActions);
    drumAndBass.on("*", drumAndBassToggleActions);

    //setting the number of octaves in the keyboard displayed on the screen
    midiKeys.octaves = 6;
    midiKeys.init();

    //telling the program to execute the function defined in "synth-audio.js" when notes are clicked and released
    midiKeys.on("*", midiKeysActions);

    //telling the program to execute the function defined below when notes are pressed and released on the QWERTY keyboard
    qwertyKeys.on("*", qwertyKeysActions);
}; 

    //function definition for what happens when notes are pressed and released on the QWERTY keyboard
    var qwertyKeysActions = function(keydata) {

    //structure for which key on QWERTY keyboard corresponds to which midi note
    var keyTable = {
        'a': 48,
        'w': 49,
        's': 50,
        'e': 51,
        'd': 52,
        'f': 53,
        't': 54,
        'g': 55,
        'y': 56,
        'h': 57,
        'u': 58,
        'j': 59,
        'k': 60,
        'o': 61,
        'l': 62,
        'p': 63,
        ';': 64
    };
    
    var note = keyTable[keydata.key];
    
    if (note !== undefined )
    {
        var keyOffset = note - midiKeys.midibase;
        var key = midiKeys.keys[keyOffset];
        
        if (keydata.on) { 

            //indicate when a note is pressed
            midiKeys.toggle(key, true);
                }
        else {
            
            //indicate when a note is released
            midiKeys.toggle(key, false);

        }
    }
    
};
