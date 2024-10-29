// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	IsMobile: false,
	applicationName: 'EWEB2',
	home: null,
	header: '/MemberPortal/Member/Menubar.aspx?UID={{UID}}&External=Card&Session=&Encoding=Big5',
	footer: '/MemberPortal/Member/FooterBar.aspx?External=Card&Encoding=big5',
	login: '/MemberPortal/Member/ReqLogin.aspx?REFURL=/SinoCard', //大網MMA會員登入頁
	indexWeb: '/Shared/HomePageTwd.aspx?CH=card&ID=0&card', //MMA首頁（保持登入）大網
	soft_cert_url: ""
};
