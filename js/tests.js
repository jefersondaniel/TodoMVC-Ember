var isTest = location.href.indexOf('?test') >= 0;

if (isTest) {
	$('#qunit').show();
    Todos.setupForTesting();
    Todos.rootElement = '#ember-testing';

    var createTestTodo = function(todoTitle) {
        visit("/");
        fillIn('#new-todo', todoTitle);
        keyEvent('#new-todo', 'keyup', 13);
    };

    Todos.injectTestHelpers();


	module('Basic tests', {
	  	setup: function() {
	    	Ember.run(Todos, Todos.advanceReadiness);
	  	},
	  	teardown: function() {
		    Todos.reset();
	  	}
	});

    test('Create a todo', function() {
    	expect(1);

		var todoTitle = 'Todo created with qunit';
        createTestTodo(todoTitle);

        andThen(function(){
            equal(find('#todo-list li:last label').text(), todoTitle);
        });
    });

    test('Delete a todo', function() {
        expect(1);

		var todoTitle = 'Todo created with qunit',
			lastTodoDiv = null;
        createTestTodo(todoTitle);

        visit("/");
		lastTodoDiv = $('#todo-list li:last');
        click('#todo-list li:last button.destroy');

        andThen(function() {
        	equal(lastTodoDiv.is('visible'), false);
        });
    });
}