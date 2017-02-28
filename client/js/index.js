var app = {
	dateFormat: 'YYYY-MM-DD',
	datePickerFormat:'yyyy-mm-dd',
	searchForm: $('#search-form'),
  container: $('.updates'),
  template: $('#template').html(),
  tabs: $('#tabs'),
  tabsUl: $('#tabs ul'),
  loading: '<div><h4 class="text-center">Loading...</h4></div>',
  searchButton: $('#search-button'),
  beforeLoadData: function(date) {
    app.container.empty();
    app.container.append(app.loading);
    app.searchButton.attr('disabled', true);
    if (!date) {
      app.tabs.hide();
    }
  },
  successLoadData: function(data, response, date) {
    if (!!response.length) {
      data = {list: response};
    } 
    var template = Handlebars.compile(app.template);
    app.container.empty();
    app.container.append(template(data));
    app.searchButton.attr('disabled', false);
    if (!date) {
      app.renderDates(app.params.date.val());
    } 
  },
  errorLoadData: function() {
    app.searchButton.attr('disabled', false);
  },
	params: {
		from: $('#from'),
		to: $('#to'),
		date: $('#date')
	}
};


$(document).ready(function() {
	app.params.date.attr('value', moment(new Date()).format(app.dateFormat));
	app.params.date.datepicker({
	  format: app.datePickerFormat
	});

  Handlebars.registerHelper('dateFormat', function (context) {
    var f = "MMM DD, YYYY hh:mm a"; //default format
    return moment(context.fn(this)).format(f);
  });


  app.loadData = function(date) {

    app.beforeLoadData(date);

    $.ajax({
      url: "/api/search",
      type: "GET",
      data: {
        from: app.params.from.val(),
        to: app.params.to.val(),
        date: date || app.params.date.val()
      },
      success: function(response) {
        var data = {};
        app.successLoadData(data, response, date);
      },
      error: function(err, status) {
        app.errorLoadData();
      }
     });
  }


  app.searchForm.on('submit', function(e) {
    e.preventDefault();
    app.loadData();
  });

  app.renderDates = function(date) {
    var data = {}
    var activeDate = date;  
    var tabItems = [];

    app.tabsUl.empty();

    tabItems.push($("<li role='presentation'><a href='''role='tab' data-toggle='tab'>"+ moment(activeDate).add(-2, 'days').format(app.dateFormat) +"</a></li>"));
    tabItems.push($("<li role='presentation'><a href='''role='tab' data-toggle='tab'>"+ moment(activeDate).add(-1, 'days').format(app.dateFormat) +"</a></li>"));
    tabItems.push($("<li role='presentation' class='active'><a href='''role='tab' data-toggle='tab'>"+ activeDate +"</a></li>"));
    tabItems.push($("<li role='presentation'><a href='''role='tab' data-toggle='tab'>"+ moment(activeDate).add(1, 'days').format(app.dateFormat) +"</a></li>"));
    tabItems.push($("<li role='presentation'><a href='''role='tab' data-toggle='tab'>"+ moment(activeDate).add(2, 'days').format(app.dateFormat) +"</a></li>"));

    app.tabsUl.append(tabItems);
    app.tabs.show();

    $('#tabs ul li').click(function(){
      let checkedDate = $(this).find('a').text();
      if (app.checkedDate !== checkedDate) {
        app.loadData(checkedDate);
        app.checkedDate = checkedDate;
      }
    });

  }



});