let fn;

window.addEventListener("load", (_) => {
	fn = new FlowNav();
}, false);

window.addEventListener("resize", (_) => {
	fn.openState = window.innerWidth < 700;
	fn.toggleNav();
}, false);

class FlowNav {

	constructor(_jsonUrl="./flownav/navbar.json") {
		this.jsonUrl = _jsonUrl;

		this.ham = this.renderHamburger();

		this.domElt = document.getElementById("flownav");
		this.openState = window.innerWidth < 700;
		this.toggleNav();
		this.renderNav();

		document.body.addEventListener("click", (_e) => {
			if (this.domElt.contains(_e.target)) return
			Array.from(document.querySelectorAll("#flownav *")).map((_elt) => {
				_elt.classList.remove("open");
			});
		}, false);
	}

	// generates inner DOM for hamburger and sets up events and class list
	renderHamburger() {
		let ham = document.getElementById("flownav-hamburger");
		ham.classList.add("hidden");
		ham.addEventListener("click", (_) => this.toggleNav.call(this));
		ham.innerHTML = "Toggle Navigation" + [0,0,0].map((_)=>"<span></span>").join("");
		return ham;
	}

	// Calls the method to generate the DOM element and then renders to #flownav
	renderNav() {
		fetch(this.jsonUrl)
			.then(response => response.json())
			.then((_json) => {
				this.navItems = this.generateNavItems(_json);
				this.domElt.appendChild(fn_ml("ul", {}, this.navItems));
			});
	}

	// recursive method to loop through items in a level and generate the DOM for them
	generateNavItems(_json, _indentation=0) {
		this.navJson = _json;
		return Object.keys(_json)
			.map((_key) => this.generateNavItem(_indentation, _key, _json));
	}

	// method to create the DOM for a single navItem and it's dropdown, if it has one
	generateNavItem(_indentation, _key, _json) {
		if (typeof _json[_key] == "string") {
			return fn_ml("li", {}, [
				fn_ml("a", {
					href: _json[_key],
					target: _json[_key].substring(0,4).toUpperCase() == "HTTP" ? "_blank" : ""
				}, _key)
			]);
		}

		return fn_ml("li", {}, [
			fn_ml("button", {
				onclick: (_e) => {
					this.openNavItem(_e, _indentation)
				}
			}, _key),
			fn_ml("ul", {
				style: `z-index:-${(_indentation+1)*2}`
			},
				this.generateNavItems(_json[_key], _indentation+1)
			)
		]);
	}

	// callback for nav buttons to open their dropdown and close others in the same or lower levels
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

	toggleNav() {
		this.openState = !this.openState;

		this.domElt.classList.remove("hidden");
		this.domElt.classList.add(
			this.openState ? "preload" : "hidden"
		);
		this.ham.className = this.openState ? "" : "hidden";

		setTimeout((_)=>{
			this.domElt.classList.remove("preload");
		}, 300);
	}

}

// HELPERS

function fn_ml(e, n, t) {
	var r = document.createElement(e);
	if (n)
		for (var i in n) 0 === i.indexOf("on") ? r.addEventListener(i.substr(2).toLowerCase(), n[i], !1) : (i=="disabled" ? r.disabled=n[i] : r.setAttribute(i, n[i]));
	return t ? fn_nester(r, t) : r
}

function fn_nester(e, t) {
	if ("string" == typeof t) e.innerHTML = t;
	else if (t instanceof Array)
		for (var r = 0; r < t.length; r++) "string" == typeof t[r] ? (n = document.createTextNode(t[r]), e.appendChild(n)) : t[r] instanceof Node && e.appendChild(t[r]);
	else t instanceof Node && e.appendChild(t);
	return e
}
