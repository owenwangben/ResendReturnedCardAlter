function ShowPopup2() {

		LockView();
		$('#sessionWarning').show();

		var reminder = reminderMessage;

		var label = document.getElementById('modalMessage2');

		if (document.all) {
			label.innerText = String.f(reminder, timeout);
		}
		else {
			label.textContent = String.f(reminder, timeout);
		}

		downTimer = setTimeout(countDown2, 1000);
	}


	function countDown2() {
		var reminder = reminderMessage;

		count--;
		var label = document.getElementById('modalMessage2');

		if (document.all) {
			label.innerText = String.f(reminder, count);
		}
		else {
			label.textContent = String.f(reminder, count);
		}

		if (count > 1) {
			downTimer = downTimer = setTimeout(countDown2, 1000);
		}
		else {
			clearTimeout(downTimer);
			stopTimer = setTimeout(ShowExpired2, 1000);
		}
	}

	function ShowExpired2() {
		var label = document.getElementById('modalMessage2');

		if (document.all) {
			label.innerText = expirationMessage;
		}
		else {
			label.textContent = expirationMessage;
		}

	   $('#preExpired2').hide();

	   $('#expired2').show();
	}

	function ok2() {
		//ModalDialog.Hide("timeoutCountdownDialog");

		noLockView();
		$('#sessionWarning').hide();

		if (startTimer != null) {
			clearTimeout(startTimer);
			clearTimeout(stopTimer);
		}

		if (downTimer != null) {
			clearTimeout(downTimer);
		}

		startTimer = setTimeout(ShowPopup2, timeoutReminder);
		// stopTimer = setTimeout(ShowExpired, expiration);
		count = timeout;

		// LoadXMLDoc(mmaServer + '/MemberPortal/Member/sessionUpdater.aspx', BuildXMLResults);

		// var syncImage = new Image;
		// syncImage.src = mmaServer + '/MemberPortal/Member/sessionUpdater.aspx';
		// syncImage = null;

		createIframe('updateSessionFrame', mmaServer + '/MemberPortal/Member/sessionUpdater.aspx');

		// __doPostBack('editBox_OK', e);
	}

	function cancel2() {
		if (downTimer != null) {
			clearTimeout(downTimer);
		}

		noLockView();
		$('#sessionWarning').hide();

		window.location = mmaServer + "/m/member/login/m_logout.aspx";
	}


	function resetTimer() {
		// var syncImage = new Image;
		// syncImage.src = mmaServer + '/MemberPortal/Member/sessionUpdater.aspx';
		// syncImage = null;

		createIframe('updateSessionFrame', mmaServer + '/MemberPortal/Member/sessionUpdater.aspx');

		if (startTimer != null) {
			clearTimeout(startTimer);
			clearTimeout(stopTimer);
		}

		startTimer = setTimeout(ShowPopup2, timeoutReminder);
	}


	function createIframe(frameid, srcUrl) {
		var ifrm;

		ifrm = document.getElementById(frameid);

		if (ifrm != undefined) {
			ifrm.parentNode.removeChild(ifrm);
		}

		ifrm = document.createElement("IFRAME");
		ifrm.setAttribute("id", frameid);
		ifrm.setAttribute("src", srcUrl);
		ifrm.style.width = 0 + "px";
		ifrm.style.height = 0 + "px";
		document.body.appendChild(ifrm);
	}

	String.f = function(text) {
		//check if there are two arguments in the arguments list
		if (arguments.length <= 1) {
			//if there are not 2 or more arguments there’s nothing to replace
			//just return the original text
			return text;
		}

		//decrement to move to the second argument in the array
		var tokenCount = arguments.length - 2;

		for (var token = 0; token <= tokenCount; token++) {
			//iterate through the tokens and replace their placeholders from the original text in order
			text = text.replace(new RegExp("\\{" + token + "\\}", "gi"), arguments[token + 1]);
		}

		return text;
	};

	function LockView() {
		$('body').append("<div id='overlay'></div>");
		$("html").css("overflow", "hidden");
	}

	function noLockView() {
		$('html').css('overflow', 'auto');
		$('body').find('#overlay').remove();
	}

