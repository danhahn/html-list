$(function() {
    
    var btnList = [];
    
    var buildBtnLlist = function (element) {
        (_.indexOf(btnList, element) === -1) ? btnList.push(element) : "";        
    };
    
    var highlightRow = function() {
        var $this = $(this);
        var rowType = "."+$this.data('action');
        $('.success').removeClass('success');
        $('.inactive').removeClass('inactive');
        $(rowType).addClass('success');
        $('tr:not('+rowType+')').addClass('inactive').slideUp("slow");
    };
    
    
    var displayBtn = function(btn) {
        
        var $btnGroup = $('<div class="btn-group pull-right"><button type="buttom" class="btn btn-default">All</button></div>')
        
        $.each(btn, function(index, value) {
            var $btn = $('<button type="buttom" class="btn btn-default"></button>').html(value);
            $btn.data('action', value);
            $btn.on('click', highlightRow);
            $btn.appendTo($btnGroup);
        });
        
        $btnGroup.insertBefore("h1");
    }
    
    var buildTable = function(data) {
        var $table = $("<table class='table table-bordered'>");
        var $headerRow = $("<tr><th>Name</th><th>Description</th><th>Type</th></tr>");
        $headerRow.appendTo($table);
        $.each(data, function(index, value){
            buildBtnLlist(value.type);
            var compiled = _.template('<tr class="<%= type %>"><td><code>&lt;<%= tag %>&gt;</code></td><td><%= desc %></td><td><%= type %></tr>');
            var output = compiled(value);
            $table.append(output);        
        });        
        
        displayBtn(btnList);
                
        $table.appendTo(".display");
    };
    
    var _init = function() {
        $.getJSON("../json/html.json", function(json) {})
        .done(function(d){
            buildTable(d);                  
        })
    }
    _init();
});