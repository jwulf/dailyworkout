var exercises =  [ 

{
    id: 'sumo_deadlift',
    name: 'Sumo Deadlift High Pull',
    upperbody: 'pull',
    lowerbody: 'push',
    videoURL: 'http://www.youtube.com/watch?v=V0qNjLHV3_c'
},

{
    id: 'push_up',
    name: 'Push Up',
    upperbody: 'push',
    variants: ['half_push_up', 'divebomber_push_up'],
    videoURL: 'http://www.youtube.com/watch?v=UayvOd0xlAU'
},

{
    id: 'spartan_push_up',
    name: 'Spartan Push Up',
    upperbody: 'push',
    variants: ['push_up', 'half_push_up'],
    videoURL: 'http://www.youtube.com/watch?v=1OOnqZdw7PI'
},

{
    id: 'half_push_up',
    name: 'Half Push Up',
    upperbody: 'push',
    variants: ['push_up'],
    videoURL: 'http://www.youtube.com/watch?v=UayvOd0xlAU'
},

{
    id: 'kettlebell_swing',
    name: 'Kettlebell Swing',
    upperbody: 'pull',
    lowerbody: 'push',
    videoURL: 'http://www.youtube.com/watch?v=5zAkYWo_4ts'
},

{
    id: 'overhead_kettlebell_swing',
    name: 'Overhead Kettlebell Swing',
    upperbody: 'pull',
    lowerbody: 'push',
    variants: ['kettlebell_swing'],
    videoURL: 'http://www.youtube.com/watch?v=mepY0l4pRpM'
},

{
    id: 'air_squat',
    name: 'Air Squat',
    lowerbody: 'push',
    videoURL: 'http://www.youtube.com/watch?v=xDdSZmWNYQI'
},

{
    id: 'one_armed_kettlebell_swing',
    name: 'One Armed Kettlebell Swing',
    upperbody: 'pull',
    lowerbody: 'push',
    videoURL: 'http://www.youtube.com/watch?v=egkgjK_8ePQ'
},

{
    id: 'jump_rope',
    name: 'Jump Rope',
    lowerbody: 'push',
    videoURL: 'http://www.youtube.com/watch?v=LsWui2L_r2c'
},

{
    id: 'vertical_sit_up',
    name: 'Vertical Sit Up',
    core: true,
    variants: ['sit_up'],
    videoURL: 'http://www.youtube.com/watch?v=tv8drdaRWL8'
},

{
    id: 'sit_up',
    name: 'Sit Up',
    core: true,
    variants: ['vertical_sit_up'],
    videoURL: 'http://www.youtube.com/watch?v=tv8drdaRWL8'
},

{
    id: 'kettlebell_clean',
    name: 'Kettlebell Clean',
    lowerbody: 'push',
    upperbody: 'pull',
    videoURL: 'http://www.youtube.com/watch?v=6AIlgwod8cY'
},

{
    id: 'kettlebell_clean_and_press',
    name: 'Kettlebell Clean and Press',
    lowerbody: 'push',
    upperbody: 'push',
    videoURL: 'http://www.youtube.com/watch?v=se6MmJkx2h0'
},

{
    id: 'lunge',
    name: 'Lunges',
    variants: ['overhead_lunges'],
    lowerbody: 'push', 
    videoURL: 'http://www.youtube.com/watch?v=Ooi9jjJG9z8'
},

{
    id: 'overhead_lunge',
    name: 'Overhead Lunges',
    lowerbody: 'push',
    variants: ['lunges'],
    videoURL: 'http://www.youtube.com/watch?v=6SAdh7sStRw'
},

{
    id: 'divebomber_pushups',
    name: 'Hindu Dive Bomber Push Up',
    upperbody: 'push',
    variants: ['push_up', 'half_push_up'],
    videoURL: 'http://www.youtube.com/watch?v=ZYx-NO3fU0g'
},

{
    id: 'pull_up',
    name: 'Pull Up',
    upperbody: 'pull',
    core: true,
    videoURL: 'http://www.youtube.com/watch?v=KDmVnkBMDC0'
}


];

    var exercisesByCategory = { 
        lowerbody : [ ] ,
        upperbody: [ ],
        fullbody: [ ],
        core: [ ]
    };
    
    var eachExercise, thisExercise, lowerbody, upperbody, core;
    
    for (eachExercise = 0; eachExercise < exercises.length; eachExercise ++)
    {
        thisExercise = exercises[eachExercise];
        
        if (typeof thisExercise.lowerbody === undefined) {
            lowerbody = false; } else { lowerbody = thisExercise.lowerbody; }
        if (typeof thisExercise.upperbody === undefined) {
            upperbody =false; } else { upperbody = thisExercise.upperbody; }
        if (typeof thisExercise.core === undefined) {
            core = false } else { core = thisExercise.core; }
        if (lowerbody && upperbody)
        {
            exercisesByCategory.fullbody.push(thisExercise);
        } else {
            if ( lowerbody )
                exercisesByCategory.lowerbody.push(thisExercise);
            if (upperbody)
                exercisesByCategory.upperbody.push(thisExercise);
            if (core)
                exercisesByCategory.core.push(thisExercise);
        }
    }
    
    
    function generateWOD (numberOfExercises) {
        var noExerciseSelected, exerciseAlreadySelected, random, WOD;
        
        WOD = [ ];
        for (var i=0; i < numberOfExercises; i++){
            noExerciseSelected = true;
            while (noExerciseSelected){
                random = Math.floor(Math.random() * exercises.length);
                
                exerciseAlreadySelected = false;
                
                // Make sure we haven't already chosen this one
                for (var existingExercises = 0; existingExercises < WOD.length; existingExercises ++){
                    console.log(random);
                    console.log(exercises[random].id)
                    if (WOD[existingExercises].id == exercises[random].id)
                        exerciseAlreadySelected = true;
                }
                
                if ( ! exerciseAlreadySelected ) {
                    // Let's check our other rules
                    WOD.push(exercises[random]);
                    noExerciseSelected = false;
                }
                
            }
        }
        console.log(WOD);
        return WOD;
    }

    generateWOD(3);