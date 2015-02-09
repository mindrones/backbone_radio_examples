
/*********************
 * channel "values"
 *********************/

var A = 0;
var B = 0;
var chV = Backbone.Radio.channel('values');

chV.comply('showValues', function() {
    d3.select('#values')
    .text('A = ' + A + ', B = ' + B)
    ;
});
chV.command('showValues');

chV.comply('incrA', function() {
    A += 1;
    chV.command('showValues');
});
chV.comply('incrB', function() {
    B += 1;
    chV.command('showValues');
});



/*********************
 * channel 1
 *********************/


var ch1 = Backbone.Radio.channel('1');

// trigger

d3.select('#ch1 .button')
.on('click', function() {
    d3.select('#ch1 .logs')
    .insert('p', 'p')
    .text('ch1 ))) evt')
    ;
    ch1.trigger('ch1:evt', 'ch1:evt');
});

// comply

ch1.comply('com1->ch1:incrA', function() {
    
    chV.command('incrA');
    
    d3.select('#ch1 .logs')
    .insert('p', 'p')
    .classed('com1', true)
    .text('com1->ch1:incrA: comply = increase A')
    ;
});

// reply

ch1.reply('req1->ch1:valueOfA', function() {
    d3.select('#ch1 .logs')
    .insert('p', 'p')
    .classed('req1', true)
    .text('req1->ch1:valueOfA: reply with A')
    ;
    
    return A;
});


/*********************
 * channel 2
 *********************/

var ch2 = Backbone.Radio.channel('2');

// trigger

d3.select('#ch2 .button')
.on('click', function() {
    d3.select('#ch2 .logs')
    .insert('p', 'p')
    .text('ch2 ))) evt')
    ;
    ch2.trigger('ch2:evt', 'ch2:evt');
});

// comply

ch2.comply('com2->ch2:incrB', function() {
    chV.command('incrB');
    
    d3.select('#ch2 .logs')
    .insert('p', 'p')
    .classed('com2', true)
    .text('com2->ch2:incrB: comply = increase B')
    ;
});

//reply

ch2.reply('req2->ch2:valueOfB', function() {
    d3.select('#ch2 .logs')
    .insert('p', 'p')
    .classed('req2', true)
    .text('req2->ch2:valueOfB: reply with B')
    ;
    
    return B;
});



/* listeners */

// listener A

var triggerListenerA = _.extend({}, Backbone.Events);

triggerListenerA.listenTo(ch1, 'ch1:evt', function() {
    d3.select('#tlA .logs')
    .insert('p', 'p')
    .classed('ch1', true)
    .text('ch1 ))) evt')
    ;
});
triggerListenerA.listenTo(ch2, 'ch2:evt', function() {
    d3.select('#tlA .logs')
    .insert('p', 'p')
    .classed('ch2', true)
    .text('ch2 ))) evt')
    ;
});


// listener B

var triggerListenerB = _.extend({}, Backbone.Events);

triggerListenerB.listenTo(ch1, 'ch1:evt', function() {
    d3.select('#tlB .logs')
    .insert('p', 'p')
    .classed('ch1', true)
    .text('ch1 ))) evt')
    ;
});
triggerListenerB.listenTo(ch2, 'ch2:evt', function() {
    d3.select('#tlB .logs')
    .insert('p', 'p')
    .classed('ch2', true)
    .text('ch2 ))) evt')
    ;
});


/* commanders */

// commander A

d3.select('#com1 .button')
.on('click', function() {
    d3.select('#com1 .logs')
    .insert('p', 'p')
    .text('com1->ch1:incrA')
    ;
    ch1.command('com1->ch1:incrA');
})
;

// commander B

d3.select('#com2 .button')
.on('click', function() {
    d3.select('#com2 .logs')
    .insert('p', 'p')
    .text('com2->ch2:incrB')
    ;
    ch2.command('com2->ch2:incrB');
})
;


/* requesters */

// requester A

d3.select('#req1 .button')
.on('click', function() {
    d3.select('#req1 .logs')
    .insert('p', 'p')
    .text('req1->ch1:valueOfA ?')
    ;
    
    var reply = ch1.request('req1->ch1:valueOfA');
    
    d3.select('#req1 .logs')
    .insert('p', 'p')
    .text(reply)
    ;
})
;

// requester B

d3.select('#req2 .button')
.on('click', function() {
    d3.select('#req2 .logs')
    .insert('p', 'p')
    .text('req2->ch2:valueOfB ?')
    ;
    
    var reply = ch2.request('req2->ch2:valueOfB');
    
    d3.select('#req2 .logs')
    .insert('p', 'p')
    .text(reply)
    ;
})
;