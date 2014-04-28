$(function() {
    
    var btnList = ['all'];
    
    // Build list of all items for the buttons
    var buildBtnLlist = function (element) {
        (_.indexOf(btnList, element) === -1) ? btnList.push(element) : "";        
    };
    
    // Highlight all rows that match button
    var highlightRow = function() {
        var $this = $(this);
        var btnType = $this.data('action');
        var rowType = "."+btnType;
        $('.success').removeClass('success');
        $('.inactive').removeClass('inactive');
        if(btnType !== "all") {
            $(rowType).addClass('success');
            $('tr:not('+rowType+')').addClass('inactive');
        }
    };

    var displayAttrData = function() {
        var $el = $(this);
        var data = $el.data('attr');
        var $newRow = $('<tr><td colspan="3"></td></tr>');
        var $attrTable = $('<section class="attr-content hide-height"><table class="table table-bordered">');
        $.each(data, function(index, value) {
            var compiled = _.template('<tr><td><div><code><%= attr %></code></div></td><td><%= value %></td><td><%= d %></tr>');
            var $row = $(compiled(value));
            $attrTable.find("table").append($row);
        });
        $newRow.find("td").append($attrTable);
        $newRow.insertAfter($el);
    }
    
    // add value and class to rows that have attr data
    var addAttrData = function(el, data) {
        el.find("td div").addClass("attr");
        el.data("attr", data);
        el.on("click", displayAttrData);
    }
    
    // Build button group with all itme in Button List
    var displayBtn = function(btn) {
        
        var $btnGroup = $('<div class="btn-group pull-right"></div>')
        
        $.each(btn, function(index, value) {
            var $btn = $('<button type="buttom" class="btn btn-default"></button>').html(value);
            $btn.data('action', value);
            $btn.on('click', highlightRow);
            $btn.appendTo($btnGroup);
        });
        
        $btnGroup.insertBefore("h1");
    }
    
    // Loop thogth the item in object to build table
    var buildTable = function(data) {
        var $table = $("<table class='table table-bordered'>");
        var $headerRow = $("<tr><th>Name</th><th>Description</th><th>Type</th></tr>");
        $headerRow.appendTo($table);
        $.each(data, function(index, value){
            buildBtnLlist(value.type);
            var compiled = _.template('<tr class="<%= type %>"><td><div><code>&lt;<%= tag %>&gt;</code></div></td><td><%= desc %></td><td><%= type %></tr>');
            var $row = $(compiled(value));
            (value.attr) ? addAttrData($row, value.attr) : "";
            $table.append($row);
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
