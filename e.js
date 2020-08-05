/* 
	Credits to Grepper for the base of the copy, set and read script. 
	You should really check out their extension, it's basically StackOverflow except it's embedded into search engines.

	Really cool, https://www.codegrepper.com. Go check them out!

	Made with love by MeaxisNetwork.
	-> https://github.com/MeaxisNetwork/ejs
	-> https://meaxisnetwork.net/

	If you ever edit this, please email us at support@meaxisnetwork.net to show us!
*/

// Cookies
function Cookie(name, value, expiration, unit, path, domain)
{
	this.name = name;

	if (value) {
		this.value = value;
	}

	if (expiration) {
		this.expiration = parseInt(expiration);
	}

	if (unit) {
		this.unit = unit;
	}

	if (path) {
		this.path = path;
	}

	if (domain) {
		this.domain = domain;
	}

	this.setAttribute = function(attribute, value) {
		if (attribute === 'value') {
			this.value = value;
		}

		if (attribute === 'expiration') {
			this.expiration = parseInt(value);
		}

		if (attribute === 'unit') {
			this.unit = value;
		}

		if (attribute === 'path') {
			this.path = value;
		}

		if (attribute === 'domain') {
			this.domain = value;
		}
	};

	this.register = function() {
		var expires = "";
		if (this.expiration) {
			var date = new Date();
            var expiration = this.expiration;

			if (this.unit) {

				if (this.unit == "d" || this.unit == "days" || this.unit == "second")
				{
                    var newExp = this.expiration*86400;
					expiration = date.getTime()/1000 + newExp;
				}

				else if (this.unit == "m" || this.unit == "minutes" || this.unit == "minute")
				{
                    var newExp = this.expiration*60;
					expiration = date.getTime()/1000 + newExp;
				}
			}

            var expiration = expiration*1000;
            date.setTime(expiration);
			expires = "; expires=" + date.toUTCString();
		}

		var cook = this.name + "=" + (this.value || "")  + expires + "; path=" + (this.path || "") + "; domain=" + (this.domain || "") + "; secure;";
        document.cookie = cook;
        console.log(cook)
	}

	this.read = function() {
		var name = this.name;
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	this.copy = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) this.value = c.substring(nameEQ.length,c.length); return true;
		}

		this.value = null; return false;
	}

	this.destroy = function() {
		var cook = this.name + "=" + "(deleted)"  + '; expires=Thu, 01 Jan 1970 00:00:00 UTC' + "; path=" + (this.path || "") + "; domain=" + (this.domain || "") + ";";
	}
}
