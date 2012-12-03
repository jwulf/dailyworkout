Meteor.startup(function () {
    // code to run on server at startup
    wods = new Meteor.Collection('wods');
    
    Meteor.setInterval(timedgenerateWOD, 1000*60);
 });
    
function timedgenerateWOD () {
    var result = wods.findOne({stackOrder: stackableDate()});
    if (typeof result == 'undefined')
        Meteor.call('generateWOD', 3);
};
    
Meteor.methods( {
    'generateWOD': function (numberOfExercises) {
        var noExerciseSelected, exerciseAlreadySelected, random, WOD;
        var sayings = [
            'Save time, chant Hare Krishna',
            'Anything more than 10 minutes is a waste of time',
            'Go hard and go back home, back to Godhead',
            'Sweat is fat crying',
            'One who is regulated in the habits of eating, sleeping, recreation and work can mitigate all material pains by practicing the yoga system.',
            'Once more with feeling!',
            "Ain't nuthin' to do it but to do it!",
            "Lightweight! It's all lightweight!",
            "Strong people are harder to kill, and generally more useful",
            'Poor form in the gym is caused by insufficient yelling',
            'Training is a process, not the events of one day',
            "Ask Old Santa for a squat rack. Preferably one that won't fit down the chimney. You can't do the program without it, and that would leave you forever an elf",    
            "The Vaisnava WOD will make you invincible against 10 men or 14 dwarves",
            "Cutting: its not just for the tree of samsara anymore", 
            "Only actions performed with perseverance can ensure success"
        ];
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
        
        WOD = { };
        WOD.exercises = [ ];
        for (var i=0; i < numberOfExercises; i++){
            noExerciseSelected = true;
            while (noExerciseSelected){
                random = Math.floor(Math.random() * exercises.length);
                
                exerciseAlreadySelected = false;
                
                // Make sure we haven't already chosen this one
                for (var existingExercises = 0; existingExercises < WOD.exercises.length; existingExercises ++){
                    console.log(random);
                    console.log(exercises[random].id)
                    if (WOD.exercises[existingExercises].id == exercises[random].id)
                        exerciseAlreadySelected = true;
                }
                
                if ( ! exerciseAlreadySelected ) {
                    // Let's check our other rules
                    WOD.exercises.push(exercises[random]);
                    noExerciseSelected = false;
                }
                
            }
        }
        WOD.saying = sayings[Math.floor(Math.random() * sayings.length)];
        WOD.date = humanDate();
        WOD.stackOrder = stackableDate();
        console.log(WOD);
        wods.insert(WOD);
    }
});

   // generateWOD(3);