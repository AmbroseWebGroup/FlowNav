let fn;
window.addEventListener("load", (_) => {
	fn = new FlowNav();
}, false);

class FlowNav {

	constructor(_jsonUrl="./flownav/navbar.json") {
		this.jsonUrl = _jsonUrl;
		this.domElt = document.getElementById("flownav");
		this.domElt.classList.add("preload");
		setTimeout((_)=>this.domElt.classList.remove("preload"), 300);
		this.renderNav();

		document.body.addEventListener("click", (_e) => {
			if (this.domElt.contains(_e.target)) return
			Array.from(document.querySelectorAll("#flownav *")).map((_elt) => {
				_elt.classList.remove("open");
			});
		}, false);
	}

	renderNav() {
		fetch(this.jsonUrl)
			.then(response => response.json())
			.then((_json) => {
				this.navItems = this.generateNavItems(_json);
				this.domElt.appendChild(ml("ul", {}, this.navItems));
			});
	}

	generateNavItems(_json, _indentation=0) {
		this.navJson = _json;
		return Object.keys(_json)
			.map((_key) => this.generateNavItem(_indentation, _key, _json));
	}

	generateNavItem(_indentation, _key, _json) {
		if (typeof _json[_key] == "string") {
			return ml("li", {}, [
				ml("a", {
					href: _json[_key],
					target: _json[_key].substring(0,4).toUpperCase() == "HTTP" ? "_blank" : ""
				}, _key)
			]);
		}

		return ml("li", {}, [
			ml("button", {
				onclick: (_e) => {
					this.openNavItem(_e, _indentation)
				}
			}, _key),
			ml("ul", {},
				this.generateNavItems(_json[_key], _indentation+1)
			)
		]);
	}

	openNavItem(_event, _indentation) {
		Array.from(document.querySelectorAll("#flownav *")).map((_elt) => {
			_elt.classList.remove("open");
		});

		let _t = _event.target.parentElement;
		_t.classList.add("open");
		let count = 0;
		while (count < _indentation) {
			_t = _t.parentElement.parentElement;
			_t.classList.add("open");
			count++;
		}
	}

}

function ml(e, n, t) {
	var r = document.createElement(e);
	if (n)
		for (var i in n) 0 === i.indexOf("on") ? r.addEventListener(i.substr(2).toLowerCase(), n[i], !1) : (i=="disabled" ? r.disabled=n[i] : r.setAttribute(i, n[i]));
	return t ? nester(r, t) : r
}

function nester(e, t) {
	if ("string" == typeof t) e.innerHTML = t;
	else if (t instanceof Array)
		for (var r = 0; r < t.length; r++) "string" == typeof t[r] ? (n = document.createTextNode(t[r]), e.appendChild(n)) : t[r] instanceof Node && e.appendChild(t[r]);
	else t instanceof Node && e.appendChild(t);
	return e
}
