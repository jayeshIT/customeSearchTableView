var fb_permission = ['publish_stream', 'read_stream', 'email', 'user_actions.music', 'user_activities', 'user_events', 'user_hometown', 'user_location', 'user_questions', 'user_religion_politics', 'user_videos', 'publish_actions', 'user_actions.news', 'user_birthday', 'user_games_activity', 'user_interests', 'user_notes', 'user_relationship_details', 'user_status', 'user_website', 'user_about_me', 'user_actions.video', 'user_education_history', 'user_groups', 'user_likes', 'user_photos', 'user_relationships', 'user_subscriptions', 'user_work_history', 'friends_about_me', 'friends_actions.video', 'friends_education_history', 'friends_groups', 'friends_likes', 'friends_photos', 'friends_relationships', 'friends_subscriptions', 'friends_work_history', 'friends_actions.music', 'friends_activities', 'friends_events', 'friends_hometown', 'friends_location', 'friends_questions', 'friends_religion_politics', 'friends_videos', 'friends_actions.news', 'friends_birthday', 'friends_games_activity', 'friends_interests', 'friends_notes', 'friends_relationship_details', 'friends_status', 'friends_website', 'ads_management', 'export_stream', 'manage_notifications', 'photo_upload', 'read_friendlists', 'read_page_mailboxes', 'rsvp_event', 'status_update', 'xmpp_login', 'create_event', 'friends_online_presence', 'manage_pages', 'publish_checkins', 'read_insights', 'read_requests', 'share_item', 'user_online_presence', 'create_note', 'manage_friendlists', 'read_mailbox', 'video_upload', 'user_actions.video'];
var search_bar = Titanium.UI.createSearchBar({
	top : 0,
	barColor : 'white',
	backgroundColor : "transparent",
	borderColor : 'transparent',
	borderRadius : 6,
	borderWidth : 3,
	showCancel : true,
	hintText : "Search",
	height : 30,
	width : '100%'
});
search_bar.addEventListener('return', function(e) {
	search_bar.blur();
});
search_bar.addEventListener('cancel', function(e) {
	search_bar.blur();
});

$.index.add(search_bar);

//$.calendar_tableview.search = search_bar;

var filldata = (function() {
	Ti.API.info('--------------- self calling function------------------');
	var data = [];
	var db = Titanium.Database.install('/city.db', 'city');
	var cal_data = db.execute("select * from cal ");
	var len = cal_data.getRowCount();
	if (len > 0) {
		Ti.API.info('=-- len > 0  so delete');
		db.execute("delete from cal");
	}
	cal_data.close();
	for (var i = 0; i < fb_permission.length; i++) {
		var tblRow = Titanium.UI.createTableViewRow({
			height : 50,
			width : '100%'
		});
		db.execute("INSERT INTO cal(name)values(?)", fb_permission[i]);
		var lbl = Titanium.UI.createLabel({
			left : 5,
			right : 5,
			height : 25,
			text : fb_permission[i]
		});
		tblRow.add(lbl);
		data.push(tblRow);
	}
	Ti.API.info('----FRIST JS DATA :' + data);
	$.calendar_tableview.setData(data);
	db.close();
})();

search_bar.addEventListener('change', function(e) {

	var data2 = [];

	$.calendar_tableview.setData([]);

	var db = Titanium.Database.install('/city.db', 'city');

	var cal_data = db.execute('SELECT * FROM cal WHERE name LIKE "%' + search_bar.value + '%"');

	Ti.API.info('=----------cal_data.getRowCount():' + cal_data.getRowCount());

	if (cal_data.getRowCount() > 0) {

		while (cal_data.isValidRow()) {

			Ti.API.info('----------------cal_data.fieldByName: ' + cal_data.fieldByName('name'));

			var tblRow = Titanium.UI.createTableViewRow({
				height : 50,
				width : '100%',
				borderColor : 'red'
			});

			var lbl = Titanium.UI.createLabel({
				left : 5,
				right : 5,
				height : 25,
				text : cal_data.fieldByName('name')
			});
			tblRow.add(lbl);
			data2.push(tblRow);
			cal_data.next();
		}

		cal_data.close();

		db.close();

		Ti.API.info('=========== : ' + data2);

		$.calendar_tableview.setData(data2);

	} else {

		Ti.API.info('---- no data -----');
	}

});

$.index.open();
