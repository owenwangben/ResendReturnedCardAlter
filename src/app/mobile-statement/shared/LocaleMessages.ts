export const LocaleMessages = {
	zh_TW: {
		Header: {
			Title: '信用卡行動帳單'
		},
		Bill: {
			FirstLine: '{0}君，此為您的{1}年{2}月信用卡帳單',
			currency: '幣別',
			StmtDate: '結帳日',
			DUE_DATE: '繳款截止日',
			DUE_DATE_1: '無需繳款',
			DUE_DATE_2: '臺幣金額無需繳款',
			DUE_DATE_NOTE: '遇例假日順延至次一營業日',
			PREVBAL: '上期應繳金額',
			PREVPAYAMT: '已繳款金額',
			CURRAMT: '本期新增款項',
			FINCHARGE: '循環利息',
			LATECHARGE: '違約金',
			CURRBAL: '本期應繳總金額',
			DUEAMT: '本期最低應繳金額',
			CreditCardLimit: '信用額度',
			InternalCashLimit: '國內預借現金額度',
			ExternalCashLimit: '國外預借現金額度',
			INTRATE: '循環利率',
			INTDATE: '適用截止年月',
			CurrencyList: [
				{ Value: '臺幣', Text: '臺幣' },
				{ Value: '美元', Text: '美元' },
				{ Value: '歐元', Text: '歐元' },
				{ Value: '日圓', Text: '日圓' }
			],
			PaymentButton: '立即繳款',
			RTEStmtButton: '帳單分期'
		},
		Payment: {
			HeaderText: '請選擇繳款方式',
			BankAccountPayment: '活存帳戶繳卡費',
			PaymentBarcodeOf7_11: '7-11繳款條碼',
			PaymentBarcodeOfFamilyMart_HiLife: '全家/萊爾富繳款條碼',
			PaymentQrcode: '繳款專用QR Code'
		},
		BillDetail: {
			currency: '幣別',
			DEDATE: '入帳起息日',
			TXDATE: '消費日',
			MEMO: '帳單說明',
			ColumnHeader1Style: { width: '60px' },
			ColumnHeader3Style: { width: '100px' },
			NoData: '查無資料',
			SelectMonthBtn: '歷史帳單查詢',
			DownloadPdfBtn: '下載當期帳單',
			BtnStyle: { 'background-color': '#fff' },
			SelectMonthConfirmText1: '您將開啓歷史帳單，行動帳單訊息將以您選定之帳單月份資料為準。',
			SelectMonthConfirmText2: '* 「立即繳款」金額為最近一期帳單應繳金額',
			CardNoLast4: '卡號末四碼',
			CURDATE: '折算日',
			FOREIGN_CURDATE: '外幣折算日',
			ForeignTXAMT: '外幣金額',
			INST_RATE: '總費用年百分率',
			INST_AMT: '分期未到期金額',
			COUNTRY: '消費地',
			TXCUR: '幣別',
			TXAMT: '消費金額',
			PrevBtn: '上一筆',
			NextBtn: '下一筆',
			BackBtn: '返回',
			BeginOfDataMsg: '目前為第一筆明細',
			EndOfDataMsg: '目前為末筆明細',
			SelectMonth: '帳單月份',
			CurrencyAmt: '<p>{0}</p><p>金額</p>',
			CurrencyList: [
				{ Value: '臺幣', Text: '臺幣' },
				{ Value: '美元', Text: '美元' },
				{ Value: '歐元', Text: '歐元' },
				{ Value: '日圓', Text: '日圓' }
			],
			Detail: {
				CurrencyAmt: '{0}金額',
			}
		},
		LastestMessage: {
			Benefits: '刷卡享優惠',
			AccountingMessage: '會員帳務訊息',
			ExclusiveMessage: '會員專屬訊息',
			ActivitiesMessage: '最新活動及公告',
			RelevantExpenses: '信用卡相關費用',
			PaymentMethod: '繳款方式說明'
		},
		Bonus: {
			AddPoint: '本期消費新增點數',
			AdjustPoint: '活動調整點數',
			ExchangePoint: '本期兌換點數',
			TotalPoint: '累計可用點數',
			ExpiringPoint: '本年度到期點數',
			AdjustTitle: '本期額外獲贈回饋如下，紅利點數部份已計入活動調整點數中：',
			BackBtn: '返回'
		},
		Apply: {
			card_withhold_service: '信用卡自動扣繳設定',
			RTEAgreement: '消費分期約定事項',
			RTE: '單筆消費分期',
			CashAdvance: '預借現金',
			EasyChoice: '預借現金分期(易通財)',
			EStatementChange: '申請行動帳單',
			ApplyCard: '線上辦卡',
			Reward: '紅利點數兌換'
		},
		CustomerService: {
			ChatService: '智慧小豐',
			CustomerServiceCenter: '客服中心',
			CustomerServiceTel: '客服電話',
			ConfirmCustomerServiceTel: '確定要撥客服電話電話到\n{0}'
		},
		PaymentBarcode: {
			TitleOf7_11: '7-11繳款條碼',
			TitleFamilyMart_HiLife: '全家/萊爾富繳款條碼',
			IsCurrBalBarcode_Y: '繳交累計應繳總金額',
			IsCurrBalBarcode_N: '繳交最低應繳金額',
			RemarkOf7_11: '本條碼於 {0} 前有效',
			CName: '姓名',
			CURRBAL: '累積應繳總金額',
			DUEAMT: '最低應繳總金額',
			Notes: '注意事項：',
			Notes_1: '1. 您可直接出示本畫面於指定通路繳交信用卡款。',
			Notes_2: '2. 建議可以增加手機螢幕亮度以提升條碼辨識度。',
			ResultMessage: {
				'01': '無法取得條碼，請稍後再試。',
				'E1': '您的登入資訊已過期，請重新登入。',
				'E2': '您的登入資訊不正確',
				'AF': '本期帳單金額無須繳款',
				'E0': '系統整理中，請稍後再試。'
			}
		},
		PaymentQrcode: {
			Title: '繳款專用QR Code',
			CName: '姓名',
			Notes: '注意事項：',
			Notes_1: '1. 建議可以增加手機螢幕亮度以提升辨識度。',
			ResultMessage: {
				'E1': '您的登入資訊已過期，請重新登入。',
				'E2': '您的登入資訊不正確',
				'E0': '系統整理中，請稍後再試。'
			}
		},
		ConfirmMessage: {
			Exit: '您即將離開行動帳單'
		},
		Button: {
			OK: '確定',
			Cancel: '取消',
		},
		ErrorMessage: {
			NoData: '查無資料'
		},
		Nav: {
			Bill: '帳務<br>資訊',
			BillDetail: '消費<br>明細',
			Message: '最新<br>訊息',
			Bonus: '紅利<br>回饋',
			Apply: '我要<br>申請',
			CustomerService: '客戶<br>服務'
		}
	},
	en: {
		Header: {
			Title: 'Statement'
		},
		Bill: {
			FirstLine: '{0}，here is your {1}/{2} credit crad billing statement',
			currency: 'Currency',
			StmtDate: 'Closing date',
			DUE_DATE: 'Payment due date',
			DUE_DATE_1: 'No payment is required',
			DUE_DATE_2: 'No payment is required for NTD amount',
			DUE_DATE_NOTE: 'Postpone to the next business day if it is a weekend or holiday',
			PREVBAL: 'Amount payable for previous period',
			PREVPAYAMT: 'Amount paid',
			CURRAMT: 'Amount added for current period',
			FINCHARGE: 'Interest on revolving cash ',
			LATECHARGE: 'Default penalty',
			CURRBAL: 'Total due',
			DUEAMT: 'Minimum Payment due',
			CreditCardLimit: 'Credit limit',
			InternalCashLimit: 'Domestic cash advance limit',
			ExternalCashLimit: 'Foreign cash advance limit',
			INTRATE: 'Interest on revolving credit',
			INTDATE: 'Closing year/month for the application',
			CurrencyList: [
				{ Value: '臺幣', Text: 'NTD' },
				{ Value: '美元', Text: 'USD' },
				{ Value: '歐元', Text: 'EUR' },
				{ Value: '日圓', Text: 'JPY' }
			],
			PaymentButton: 'IMMD PAY',
			RTEStmtButton: 'BILL INST'
		},
		Payment: {
			HeaderText: 'Please select the methods of payment',
			BankAccountPayment: 'Pay through banking account ',
			PaymentBarcodeOf7_11: 'Payment barcode of 7-11 ',
			PaymentBarcodeOfFamilyMart_HiLife: 'Payment barcode of  FamilyMart/Hi-Life',
			PaymentQrcode: 'QR CODE for payment only'
		},
		BillDetail: {
			currency: 'Currency',
			DEDATE: 'Date of in',
			TXDATE: 'TRN DATE',
			MEMO: 'Bill description',
			ColumnHeader1Style: { width: '60px'},
			ColumnHeader3Style: { width: '100px' },
			NoData: 'No Billing info.',
			SelectMonthBtn: 'HIST BILL',
			DownloadPdfBtn: 'CUR BILL',
			BtnStyle: { 'background-color': '#fff' },
			SelectMonthConfirmText1: 'You are opening historic billing statements. The message is for the month you selected.',
			SelectMonthConfirmText2: '* “Immediately pay” refers to the amount payable for most recent period.',
			CardNoLast4: 'Last 4 digits of credit card No.',
			CURDATE: 'Translation date',
			FOREIGN_CURDATE: 'Translation date of foreign currency',
			ForeignTXAMT: 'amount in foreign currency',
			INST_RATE: 'Annual percentage of total charges',
			INST_AMT: 'Installment amount not yet due',
			COUNTRY: 'Transaction place',
			TXCUR: 'Currency',
			TXAMT: 'Transaction amount',
			PrevBtn: 'Previous',
			NextBtn: 'Next',
			BackBtn: 'Return',
			BeginOfDataMsg: 'This is the first transaction details',
			EndOfDataMsg: 'This is the last transaction details',
			SelectMonth: 'month of billing statement',
			CurrencyAmt: '<p>Amount in {0}</p>',
			CurrencyList: [
				{ Value: '臺幣', Text: 'NTD' },
				{ Value: '美元', Text: 'USD' },
				{ Value: '歐元', Text: 'EUR' },
				{ Value: '日圓', Text: 'JPY' }
			],
			Detail: {
				CurrencyAmt: 'Amount in {0}',
			}
		},
		LastestMessage: {
			Benefits: 'Benefits and privileges for credit card',
			AccountingMessage: 'Accounting message for cardholder',
			ExclusiveMessage: 'Exclusive message for cardholder',
			ActivitiesMessage: 'Latest activities and publications',
			RelevantExpenses: 'Relevant expenses',
			PaymentMethod: 'Payment method',
			RelevantExpensesBtnStyle: { 'font-size': '14px' },
			PaymentMethodBtnStyle: { 'font-size': '14px' }
		},
		Bonus: {
			AddPoint: 'Transaction points added for current period',
			AdjustPoint: 'Points adjusted for activities',
			ExchangePoint: 'redeemed points for current priod',
			TotalPoint: 'Accumulated redeemable points',
			ExpiringPoint: 'points expiring for current year',
			AdjustTitle: 'Additional feedback is granted for current period as follow;' +
				' the bonus points have been included in the points adjusted for activities',
			BackBtn: 'Return'
		},
		Apply: {
			card_withhold_service: 'Setting of automatic withholding for credit card',
			RTEAgreement: 'Provisions agreed for installment payment of transactions',
			RTE: 'Installment payment for single transaction',
			CashAdvance: 'Cash advance',
			EasyChoice: 'Installment payment of cash advance (easy finance)',
			EStatementChange: 'apply for credit card mobile billing statement',
			ApplyCard: 'online Credit card application',
			Reward: 'Redeem the rewards points'
		},
		CustomerService: {
			ChatService: 'Smart-customer-service',
			CustomerServiceCenter: 'Customer service center',
			CustomerServiceTel: 'Customer service hotline',
			ConfirmCustomerServiceTel: 'Are you sure to call customer service at {0}?'
		},
		PaymentBarcode: {
			TitleOf7_11: 'Payment barcode of 7-11',
			TitleFamilyMart_HiLife: 'Payment barcode of  FamilyMart/Hi-Life',
			IsCurrBalBarcode_Y: 'Payment of accumulated total amounts payable',
			IsCurrBalBarcode_N: 'Payment of minimum amount payable',
			RemarkOf7_11: 'This barcode is effective before {0}',
			CName: 'Name',
			CURRBAL: 'Accumulated total amounts payable',
			DUEAMT: 'Minimum of total amounts payable',
			Notes: 'Notices:',
			Notes_1: '1. You may directly present this screenshot to pay credit card charge at the designated channel.',
			Notes_2: '2. It is suggested to increase the brightness of the screen of your mobile phone to increase the legibility of the bar code.',
			ResultMessage: {
				'01': 'Barcode cannot be obtained; please try again later',
				'E1': 'Your login information has expired; please log in again',
				'E2': 'Your login information is incorrect',
				'AF': 'No payment is required for the billing amount for current period',
				'E0': 'System is preparing; please try again later'
			}
		},
		PaymentQrcode: {
			Title: 'QR CODE for payment only',
			CName: 'Name',
			Notes: 'Notices:',
			Notes_1: '1. It is suggested to increase the brightness of the screen of your mobile phone to increase the legibility. ',
			ResultMessage: {
				'E1': 'Your login information has expired; please log in again',
				'E2': 'Your login information is incorrect',
				'E0': 'System is preparing; please try again later'
			}
		},
		ConfirmMessage: {
			Exit: 'You are leaving from mobile billing statement'
		},
		Button: {
			OK: 'OK',
			Cancel: 'Cancel',
		},
		ErrorMessage: {
			NoData: 'No Billing info.'
		},
		Nav: {
			Bill: 'Acct Info',
			BillDetail: 'Trn Dtl',
			Message: 'Msg',
			Bonus: 'Reward',
			Apply: 'Want Apply',
			CustomerService: 'Cust Srv'
		}
	},
	vi: {
		Header: {
			Title: 'Statement'
		},
		Bill: {
			FirstLine: 'Quý khách {0}, đây là hóa đơn thẻ tín dụng tháng {1} năm {2} của bạn',
			currency: 'Đơn vị tiền',
			StmtDate: 'Ngày kết toán',
			DUE_DATE: 'Thời hạn nộp tiền',
			DUE_DATE_1: 'Không cần nộp tiền',
			DUE_DATE_2: 'Không cần nộp số tiền Đài tệ',
			DUE_DATE_NOTE: 'Nếu đúng ngày nghỉ lễ thì hoãn sang ngày làm việc tiếp sau đó',
			PREVBAL: 'Số tiền phải nộp kỳ trước',
			PREVPAYAMT: 'Số tiền đã nộp',
			CURRAMT: 'Số tiền tăng thêm kỳ này',
			FINCHARGE: 'Lãi quay vòng',
			LATECHARGE: 'Phạt vi phạm hợp đồng',
			CURRBAL: 'Tổng số tiền phải  nộp kỳ này',
			DUEAMT: 'Số tiền tối thiểu phải nộp kỳ này',
			CreditCardLimit: 'Hạn mức tín dụng',
			InternalCashLimit: 'Mức vay tạm ứng tiền mặt trong nước',
			ExternalCashLimit: 'Mức vay tạm ứng tiền mặt ở nước ngoài',
			INTRATE: 'Lãi suất quay vòng',
			INTDATE: 'Thời hạn áp dụng',
			CurrencyList: [
				{ Value: '臺幣', Text: 'Đài tệ' },
				{ Value: '美元', Text: 'USD' },
				{ Value: '歐元', Text: 'EUR' },
				{ Value: '日圓', Text: 'Yên Nhật' }
			],
			PaymentButton: 'Nộp tiền',
			RTEStmtButton: 'Trả góp'
		},
		Payment: {
			HeaderText: 'Vui lòng chọn phương thức nộp',
			BankAccountPayment: 'Nộp tiền từ tài khoản tiền gửi không kỳ hạn',
			PaymentBarcodeOf7_11: 'Mã vạch nộp tiền tại 7-11',
			PaymentBarcodeOfFamilyMart_HiLife: 'Mã vạch nộp tiền tại FamilyMart/Hi-life',
			PaymentQrcode: 'Mã QR để nộp tiền'
		},
		BillDetail: {
			currency: 'Đơn vị tiền',
			DEDATE: 'Tính lãi',
			TXDATE: 'Ngày tiêu',
			MEMO: 'Chi tiết',
			ColumnHeader1Style: { width: '60px'},
			ColumnHeader3Style: { width: '100px' },
			NoData: 'Không có thông tin thanh toán',
			SelectMonthBtn: 'H. đơn cũ',
			DownloadPdfBtn: 'Tải h. đơn',
			BtnStyle: { 'background-color': '#fff' },
			SelectMonthConfirmText1: 'Bạn đang truy vấn hóa đơn cũ, thông tin hóa đơn di động thẻ tín dụng sẽ dựa trên dữ liệu hóa đơn theo tháng bạn đã chọn',
			SelectMonthConfirmText2: '* “Nộp tiền” theo số tiền của hóa đơn kì gần nhất',
			CardNoLast4: '4 mã cuối của số thẻ',
			CURDATE: 'Ngày quy đổi',
			FOREIGN_CURDATE: 'Ngày quy đổi ngoại tệ',
			ForeignTXAMT: 'Số tiền ngoại tệ',
			INST_RATE: 'Phần trăm tổng chi phí hàng năm',
			INST_AMT: 'Số tiền trả góp chưa hết hạn',
			COUNTRY: 'Nơi chi tiêu',
			TXCUR: 'Đơn vị tiền',
			TXAMT: '消費金額',
			PrevBtn: 'Mục trước',
			NextBtn: 'Mục sau',
			BackBtn: 'Trở về',
			BeginOfDataMsg: 'Đây là mục dữ liệu chi tiết đầu tiên',
			EndOfDataMsg: 'Đây là bản kê chi tiết cuối cùng',
			SelectMonth: 'Hóa đơn tháng',
			CurrencyAmt: '<p>Số tiền {0}</p>',
			CurrencyList: [
				{ Value: '臺幣', Text: 'Đài tệ' },
				{ Value: '美元', Text: 'USD' },
				{ Value: '歐元', Text: 'EUR' },
				{ Value: '日圓', Text: 'Yên Nhật' }
			],
			Detail: {
				CurrencyAmt: 'Số tiền {0}',
			}
		},
		LastestMessage: {
			Benefits: 'Quẹt thẻ hưởng ưu đãi',
			AccountingMessage: 'Thông tin tài khoản hội viên',
			ExclusiveMessage: 'Thông tin dành cho hội viên',
			ActivitiesMessage: 'Hoạt động và thông báo mới nhất',
			RelevantExpenses: 'Phí khác',
			PaymentMethod: 'Cách nộp tiền'
		},
		Bonus: {
			AddPoint: 'Điểm thưởng mới của kỳ này',
			AdjustPoint: 'Điểm điều chỉnh theo hoạt động',
			ExchangePoint: 'Điểm quy đổi kỳ này',
			TotalPoint: 'Điểm tích lũy có thể dùng',
			ExpiringPoint: 'Điểm đến hạn của năm nay',
			AdjustTitle: 'Thưởng thêm của kỳ này như sau, điểm thưởng đã được tính vào điểm điều chỉnh:',
			BackBtn: 'Trở về'
		},
		Apply: {
			card_withhold_service: 'Cài đặt tự động khấu trừ để nộp tiền thẻ tín dụng',
			RTEAgreement: 'Thỏa thuận trả góp tiêu dùng',
			RTE: 'Trả góp chi tiêu một món',
			CashAdvance: 'Vay tiền mặt',
			EasyChoice: 'Vay tiền mặt trả góp (ETC)',
			EStatementChange: 'Đăng ký Hóa đơn di động',
			ApplyCard: 'Làm thẻ trực tuyến',
			Reward: 'Đổi điểm thưởng'
		},
		CustomerService: {
			ChatService: 'SinoPac Thông minh',
			CustomerServiceCenter: 'Trung tâm DVKH',
			CustomerServiceTel: 'Điện thoại DVKH',
			ConfirmCustomerServiceTel: 'Có muốn gọi điện thoại Dịch vụ khách hàng {0}'
		},
		PaymentBarcode: {
			TitleOf7_11: 'Mã vạch nộp tiền tại 7-11',
			TitleFamilyMart_HiLife: 'Mã vạch nộp tiền tại FamilyMart/Hi-life',
			IsCurrBalBarcode_Y: 'Nộp tổng số tiền tích lũy phải nộp',
			IsCurrBalBarcode_N: 'Nộp số tiền tối thiểu phải nộp',
			RemarkOf7_11: 'Mã vạch này có hiệu lực trước {0}',
			CName: 'Tên tiếng',
			CURRBAL: 'Tổng số tiền tích lũy phải nộp',
			DUEAMT: 'Tổng số tiền tối thiểu phải nộp',
			Notes: 'Lưu ý:',
			Notes_1: '1. Bạn có thể trực tiếp xuất trình màn hình này để nộp tiền thẻ tín dụng theo các kênh chỉ định',
			Notes_2: '2. Nên tăng độ sáng của màn hình để tăng khả năng nhận diện mã vạch.',
			ResultMessage: {
				'01': 'Không thể lấy mã vạch, vui lòng thử lại sau.',
				'E1': 'Thông tin đăng nhập đã hết hạn, vui lòng đăng nhập lại',
				'E2': 'Thông tin đăng nhập của bạn không chính xác',
				'AF': 'Không cần thanh toán cho số tiền hóa đơn kỳ này',
				'E0': 'Hệ thống đang bận, vui lòng thử lại sau.'
			}
		},
		PaymentQrcode: {
			Title: 'Mã QR để nộp tiền',
			CName: 'Tên tiếng',
			Notes: 'Lưu ý:',
			Notes_1: '1. Nên tăng độ sáng của màn hình để tăng khả năng nhận diện mã vạch.',
			ResultMessage: {
				'E1': 'Thông tin đăng nhập đã hết hạn, vui lòng đăng nhập lại',
				'E2': 'Thông tin đăng nhập của bạn không chính xác',
				'E0': 'Hệ thống đang bận, vui lòng thử lại sau.'
			}
		},
		ConfirmMessage: {
			Exit: 'Bạn sắp thoát phần mềm hóa đơn di động'
		},
		Button: {
			OK: 'OK',
			Cancel: 'Hủy',
		},
		ErrorMessage: {
			NoData: 'Không có thông tin thanh toán'
		},
		Nav: {
			Bill: 'Giao dịch',
			BillDetail: 'Chi tiêu',
			Message: 'Tin mới',
			Bonus: 'Thưởng',
			Apply: 'Đăng ký',
			CustomerService: 'D.vụ KH'
		}
	},
	id: {
		Header: {
			Title: 'Statement'
		},
		Bill: {
			FirstLine: 'Yang terhormat {0}, berikut adalah tagihan kartu kredit anda tahun {1} bulan {2}',
			currency: 'Mata uang',
			StmtDate: 'Tanggal pembayaran',
			DUE_DATE: 'Batas waktu pembayaran',
			DUE_DATE_1: 'Tidak perlu bayar',
			DUE_DATE_2: 'Jumlah NTD tidak perlu dibayar',
			DUE_DATE_NOTE: 'Dalam kasus hari libur, akan ditunda ke hari kerja berikutnya',
			PREVBAL: 'Jumlah yang harus dibayarkan pada periode sebelumnya',
			PREVPAYAMT: 'Jumlah yang sudah dibayarkan',
			CURRAMT: 'Tagihan baru dalam periode ini',
			FINCHARGE: 'Bunga bergulir',
			LATECHARGE: 'Denda pelanggaran perjanjian',
			CURRBAL: 'Jumlah total yang harus dibayarkan untuk periode ini',
			DUEAMT: 'Jumlah minimum yang harus dibayarkan untuk periode ini',
			CreditCardLimit: 'Pagu kredit',
			InternalCashLimit: 'Batas penarikan tunai domestik',
			ExternalCashLimit: 'Batas penarikan tunai luar negeri',
			INTRATE: 'Suku bunga bergulir',
			INTDATE: 'Tenggat waktu yang berlaku',
			CurrencyList: [
				{ Value: '臺幣', Text: 'NTD' },
				{ Value: '美元', Text: 'USD' },
				{ Value: '歐元', Text: 'EUR' },
				{ Value: '日圓', Text: 'JPY' }
			],
			PaymentButton: 'Bayar sekarang',
			RTEStmtButton: 'Cicilan tagihan'
		},
		Payment: {
			HeaderText: 'Pilih metode pembayaran',
			BankAccountPayment: 'Pembayaran melalaui rekening tabungan',
			PaymentBarcodeOf7_11: 'Kode batang pembayaran 7-11',
			PaymentBarcodeOfFamilyMart_HiLife: 'Kode batang pembayaran FamilyMart/Hi-Life',
			PaymentQrcode: 'Kode QR khusus untuk pembayaran'
		},
		BillDetail: {
			currency: 'Mata uang',
			DEDATE: 'Tgl mulai hitung bunga',
			TXDATE: 'Tgl konsumsi',
			MEMO: 'Ket tagihan',
			ColumnHeader1Style: { width: '60px', 'font-size': '8px', 'line-height': '14px' },
			ColumnHeader3Style: { width: '100px' },
			NoData: 'Tidak ada info Penagihan',
			SelectMonthBtn: 'Histori tagihan',
			DownloadPdfBtn: 'Tagihan periode ini',
			BtnStyle: { 'background-color': '#fff', 'font-size' : '12px' },
			SelectMonthConfirmText1: 'Anda akan buka histori tagihan, info tagihan mobile didasarkan pada data bulan tagihan yang dipilih',
			SelectMonthConfirmText2: '* Jumlah "Bayar Sekarang" adalah jumlah yang harus dibayarkan pada tagihan terbaru',
			CardNoLast4: 'Empat digit terakhir nomor kartu',
			CURDATE: 'Tanggal konversi',
			FOREIGN_CURDATE: 'Tanggal konversi mata uang asing',
			ForeignTXAMT: 'Jumlah dalam mata uang asing',
			INST_RATE: 'Persentase tahunan dari total biaya',
			INST_AMT: 'Biaya angsuran belum jatuh tempo',
			COUNTRY: 'Tempat konsumsi',
			TXCUR: 'Mata uang',
			TXAMT: 'Jumlah konsumsi',
			PrevBtn: 'Rincian sebelumnya',
			NextBtn: 'Rincian berikutnya',
			BackBtn: 'Kembali',
			BeginOfDataMsg: 'Saat ini adalah rincian pertama',
			EndOfDataMsg: 'Saat ini adalah rincian terakhir',
			SelectMonth: 'Bulan tagihan',
			CurrencyAmt: '<p>Jumlah dalam {0}</p>',
			CurrencyList: [
				{ Value: '臺幣', Text: 'NTD' },
				{ Value: '美元', Text: 'USD' },
				{ Value: '歐元', Text: 'EUR' },
				{ Value: '日圓', Text: 'JPY' }
			],
			Detail: {
				CurrencyAmt: 'Jumlah dalam {0}',
			}
		},
		LastestMessage: {
			Benefits: 'Gesek kartu untuk menikmati diskon',
			AccountingMessage: 'Informasi Akun Anggota',
			ExclusiveMessage: 'Informasi eksklusif anggota',
			ActivitiesMessage: 'Kegiatan dan pengumuman terbaru',
			RelevantExpenses: 'Biaya terkait',
			PaymentMethod: 'Metode bayar'
		},
		Bonus: {
			AddPoint: 'Penambahan poin baru konsumsi periode ini',
			AdjustPoint: 'Poin penyesuaian aktivitas',
			ExchangePoint: 'Penukaran poin untuk periode ini',
			TotalPoint: 'Poin kumulatif yang tersedia',
			ExpiringPoint: 'Poin jatuh tempo tahun ini',
			AdjustTitle: 'Reward tambahan untuk periode ini adalah sebagai berikut, poin reward telah dimasukkan dalam poin penyesuaian aktifitas:',
			BackBtn: 'Kembali'
		},
		Apply: {
			card_withhold_service: 'Pengaturan pemotongan otomatis kartu kredit',
			RTEAgreement: 'Perjanjian angsuran konsumsi',
			RTE: 'Angsuran konsumsi tunggal',
			CashAdvance: 'Penarikan uang tunai',
			EasyChoice: 'Angsuran penarikan tunai (E-TongCai)',
			EStatementChange: 'Mengajukan permohonan tagihan mobile',
			ApplyCard: 'Pengajuan kartu secara online',
			Reward: 'Penukaran poin reward'
		},
		CustomerService: {
			ChatService: 'Layanan pelanggan Smart XiaoFeng',
			CustomerServiceCenter: 'Pusat pelayanan pelanggan',
			CustomerServiceTel: 'Hotline pelanggan',
			ConfirmCustomerServiceTel: 'Pastikan untuk menghubungi nomor pelayanan pelanggan {0}'
		},
		PaymentBarcode: {
			TitleOf7_11: 'Kode batang pembayaran 7-11',
			TitleFamilyMart_HiLife: 'Kode batang pembayaran FamilyMart/Hi-Life',
			IsCurrBalBarcode_Y: 'Total kumulatif yang harus dibayarkan',
			IsCurrBalBarcode_N: 'Jumlah pembayaran minimum',
			RemarkOf7_11: 'Barcode ini berlaku sebelum {0}',
			CName: 'Nama',
			CURRBAL: 'Total kumulatif yang harus dibayarkan',
			DUEAMT: 'Total minimum yang harus dibayarkan',
			Notes: 'Perhatian:',
			Notes_1: '1. Anda dapat langsung menunjukkan tampilan ini untuk membayar tagihan kartu kredit di saluran yang ditentukan.',
			Notes_2: '2. Disarankan untuk menambah kecerahan layar ponsel untuk menaikkan pengenalan barcode',
			ResultMessage: {
				'01': 'Tidak bisa mendapatkan kode batang, coba lagi nanti',
				'E1': 'Informasi login Anda telah kedaluwarsa, silakan login kembali',
				'E2': 'Informasi login Anda salah',
				'AF': 'Tidak ada pembayaran yang diperlukan untuk jumlah tagihan periode ini',
				'E0': 'Sistem dalam penataan, coba lagi nanti'
			}
		},
		PaymentQrcode: {
			Title: 'Kode QR khusus untuk pembayaran',
			CName: 'Nama',
			Notes: 'Perhatian:',
			Notes_1: '1. Disarankan untuk menambah kecerahan layar ponsel untuk menaikkan tingkat pengenalan',
			ResultMessage: {
				'E1': 'Informasi login Anda telah kedaluwarsa, silakan login kembali',
				'E2': 'Informasi login Anda salah',
				'E0': 'Sistem dalam penataan, coba lagi nanti'
			}
		},
		ConfirmMessage: {
			Exit: 'Anda akan segera meninggalkan tagihan mobile'
		},
		Button: {
			OK: 'Baik',
			Cancel: 'Membatalkan',
		},
		ErrorMessage: {
			NoData: 'Tidak ada info Penagihan'
		},
		Nav: {
			Bill: 'Info rekening',
			BillDetail: 'Detail konsumsi',
			Message: 'Berita terkini',
			Bonus: 'Reward',
			Apply: 'Apply',
			CustomerService: 'Layanan klien',
			MenuTextStyles: { 'font-size': '8px' }
		}
	}
};

export function GetLanguage() {
	let language = sessionStorage.getItem("MBILL.Language");
	if (!language) {
		language = 'zh_TW';
		sessionStorage.setItem("MBILL.Language", language);
	}
	return language;
}
