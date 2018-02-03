function (c,a) { //l:#s.sys.access_log, t:#s.accts.transactions, con:false

	// made by d3f4ult -- no rights reserved ( CC0 )
	// https://creativecommons.org/publicdomain/zero/1.0/

	if (!a) return "\n`APass` `Nt`:`V#s.``Faccts``V.``Ltransactions` `Aand` `Nl`:`V#s.``Fsys``V.``Laccess_log` `Aas parameters in order to highlight any suspicious entries.`\n`AYou can also use con:true in order to also show connection attempts.`" 
	if (typeof a.t !== "object") throw new Error("`AYou need to input a scriptor, not a string! Example:` `V#s.``Fsys``V.``Laccess_log`")
	var logcall = a.l.call({count:500}),
	locrgx = new RegExp(`${c.caller}\.(info|out|external|extern|public|pub|pub_info|pubinfo|p|access|entry)_[a-z0-9]{6}`),
	txcall = a.t.call({count:500}).transactions,
	fmt_l = logcall.map(i=>{
		if (i.includes("Lock rotation.")) return;
		let attac = /Breach att/
		if (attac.test(i)) {
			let t = i.slice(0,11),
			l = i.slice(32)
			let k = "`A" + t + " - attempt by` " + l
			return k
		}
		let s = /System access/
		if (s.test(i)) {
			let t = i.slice(0,11), 
			l = i.slice(31) 
			return "`A"+t+" - ono, access by "+l+"`"
		}
		if (a.con && i.includes("Connection")) {
			let t = i.slice(0,11), 
			l = i.slice(28)
			return "`A"+t+" - connection from "+l+"`" 
		}
		let wrt = /write_log/
		if (wrt.test(i)) {
			let t = i.slice(0,11),
			l = i.slice(41)
			return "`A"+t+" - log write by "+l+"`"
		}
		let ugF = /upgrade_from/
		if (ugF.test(i)) {
			let t = i.slice(0,11),
			l = i.slice(49)
			return "`A"+t+" - sys.xfer_upgrade_from exec by "+l+"`"
		}
		let exU = /e_upgrades/
		if (exU.test(i)) {
			let t = i.slice(0,11),
			l = i.slice(47)
			return "`A"+t+" - sys.expose_upgrades exec by "+l+"`"
		}
		let acL = /ose_access/
		if (acL.test(i)) {
			let t = i.slice(0,11),
			l = i.slice(49)
			return "`A"+t+" - sys.expose_access_log exec by "+l+"`"
		}
		let exB = /ose_bal/
		if (exB.test(i)) {
			let t = i.slice(0,11),
			l = i.slice(46)
			return "`A"+t+" - sys.expose_access_log exec by "+l+"`"
		}
	}),
	fmt_t = txcall.map(b=>{
		if (b.script === "sys.xfer_gc_from"&&b.recipient!=="trust"&&b.recipient!==c.caller) {
			return "`A"+b.time+" - sys.xfer_gc_from exec by "+b.recipient+"`"
		}
		if (locrgx.test(b.script) && /sn_w_glock/.test(b.memo)) {
			return "`A"+b.time+" - glock from "+b.sender+"`"
		}
	})
	return {log:fmt_l.filter(a=>a), tx:fmt_t.filter(a=>a), rt:`${Date.now() - _START} \`Ams\``}
}
