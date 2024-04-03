exports.util = {
	color: {
		accent: 0x37A0DC,
		blue: 0x003057,
		default: 0xff6600,
		green: 0x00ff00,
		red: 0xff0000,
		yellow: 0xffff00,
	},
	console: {
		codes: {
			blue: `\x1b[34m`,
			blue2: `\x1b[94m`,
			bold: `\x1b[1m`,
			cyan: `\x1b[36m`,
			cyan2: `\x1b[96m`,
			green: `\x1b[92m`,
			green2: `\x1b[42m`,
			italic: `\x1b[3m`,
			magenta: `\x1b[35m`,
			magenta2: `\x1b[95m`,
			normal: `\x1b[0m`,
			red: `\x1b[91m`,
			red2: `\x1b[41m`,
			underscore: `\x1b[4m`,
			white: `\x1b[37m`,
			white2: `\x1b[97m`,
			yellow: `\x1b[33m`,
			yellow2: `\x1b[93m`,			
		},
		colorend: `\x1b[0m`,
		colorify: (t = ``, c = ``) => `${this.util.console.codes[c] || this.util.console.codes[`normal`]}${t}${this.util.console.colorend}`,
	},
	delayAwait: async (t) => new Promise(async (resolve) => setTimeout(() => resolve(), t)),
	log: async (t1, t2, c1 = `normal`, c2 = `normal`) => {
		let string = `${this.util.console.colorify(`::`, `cyan`)} ${this.util.console.colorify(t1, c1)}${this.util.console.colorify(`:`, `cyan`)} ${this.util.console.colorify(t2, c2)}`;

		if(t1.startsWith(`[WARN]`)){
			console.warn(string);
		}else if(t1.startsWith(`[ERROR]`)){
			console.error(string);
		}else if(t1.startsWith(`[DEBUG]`)){
			console.log(string);
		}else{
			console.log(string);
		}
	},
	prettyDate: function (e, t = false){
		e = e || new Date();

		let y = e.getFullYear();
		let m = e.getMonth();
		m = m < 9 ? `0${m + 1}` : (m + 1);
		let d = e.getDate();
		d = d < 10 ? `0${d}` : d;
		let h = e.getHours();
		h = h > 12 ? h - 12 : h;
		let i = e.getMinutes();
		i = i < 10 ? '0' + i : i;
		let a = e.getHours() >= 12 ? 'PM' : 'AM';

		return `${m}-${d}-${y}${t ? `` : ` ${h}:${i} ${a}`}`;
	},
	random: {
		number: async (x, y) => {
			x = Math.ceil(x);
			y = Math.floor(y);

			return Math.floor(Math.random() * (y - x)) + x;
		},
		string: async (l = 8) => {
			let str = ``;
			let chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

			for(let i = 0; i < l; i++){
				str += chars.charAt(Math.floor(Math.random() * chars.length));
			}

			return str;
		},
	},
};