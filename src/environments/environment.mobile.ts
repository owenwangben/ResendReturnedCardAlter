// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	IsMobile: true,
	applicationName: 'MWEB',
	home: null,
	header: '/m/member/login/m_menubar.aspx?UID={{UID}}&External=Card&Session=&Encoding=Big5',
	footer: null,
	login: "/m/Member/login/m_ReqLogin.aspx?REFURL=/m/SinoCard",
	indexWeb: '/m/m_menu.aspx?num=2', //MMA首頁（保持登入）小網;
	soft_cert_url: "https://m.sinopac.com/m/SinoCard/Application/MyDataRelay"
	// SIT: http://10.11.36.66/m/SinoCard/Application/MyDataRelay
	// UAT: http://10.11.42.234/m/SinoCard/Application/MyDataRelay
	// PROD: https://m.sinopac.com/m/SinoCard/Application/MyDataRelay
}
