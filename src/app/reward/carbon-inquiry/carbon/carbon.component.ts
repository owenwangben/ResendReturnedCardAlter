import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ErrorPageService } from 'app/shared/shared.module';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { CarbonDetail, getCarbonTrxResultModel } from '../services/carbon-inquiry-models';
import { CarbonInquiryService } from '../services/carbon-inquiry.service';


@Component({
  selector: 'app-carbon',
  templateUrl: './carbon.component.html',
  styleUrls: ['./carbon.component.css']
})
export class CarbonComponent implements OnInit {
  /**自訂日期 flag */
  public customPickDate: boolean = false;
  /**總碳足跡克數 */
  public TotalGrams: number = 0;
  /**全部資料 */
  private carbonData: getCarbonTrxResultModel;
  /**總覽 (深拷貝) */
  public carbonDataOverflow: { MccCode: string, Type: string; total: number, data: any, bar: string, color: string }[] = [];
  /**總覽顯示(全部)(深拷貝) */
  private AllcarbonDataOverflow: { MccCode: string, Type: string; total: number, data: any, bar: string, color: string }[] = [];
  /**明細資料(全) */
  private carbonDetail: { MccCode: string, data: CarbonDetail, Date: Date }[] = [];
  /**明細資料-篩選(各類別) */
  private typeDetail: { MccCode: string, data: CarbonDetail, Date: Date }[] = [];
  /**明細資料-呈現 */
  public showDetail: Array<CarbonDetail> = [];
  /**類型碳足跡(公斤) */
  public typeKg: number = 0;
  public selectedTab: string = tableType.Overvier;
  /**類別名稱、代號 (下拉選單) */
  public typeOption: { Type: string; Code: string }[] = [];
  /**卡名、後四碼 (下拉選單) */
  public cardOption: { Name: string; No: string }[] = [];
  /**快速查詢日期鈕 */
  public quickDates: { Date: string; value: number; dateS?: Date, dateE?: Date }[] = [];
  public showbox: boolean = false;
  /**查詢時間開始 */
  public searchDateS: Date;
  /**查詢時間結束 */
  public searchDateE: Date;
  /**快速選取btn index */
  Timeselect: number = 0;
  /**最大查詢日期 */
  public Maxdate: Date;
  /**最小查詢日期 */
  public MinDate: Date;
  public lastcardidx: number = 0;
  public lastType: string = '000';
  public form: FormGroup;
  pages: number = 1;
  public defDate: string;
  /**有無資料flag */
  public hasItem = false;
  /**API是否有錯 */
  isError = true;
  /**是否為小網 */
  isMobile = environment.IsMobile;
  /**自訂日期警語 */
  public customnotice = '最多只能查詢 1 年內的帳單';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private carbonInquiryService: CarbonInquiryService,
    private errorPageService: ErrorPageService,
  ) { }

  get DateStart() {
    return this.form.get('DateStart') as FormControl;
  }
  get DateEnd() {
    return this.form.get('DateEnd') as FormControl;
  }

  get DateStartM() {
    return this.form.get('DateStartM') as FormControl;
  }

  get DateEndM() {
    return this.form.get('DateEndM') as FormControl;
  }

  async ngOnInit() {
    this.form = this.fb.group({
      DateStart: ['',],
      DateEnd: [''],
      DateStartM: ['',],
      DateEndM: ['',],
    })
    console.log(this.carbonInquiryService._isEligibleCardData);
    this.initTypeSelect();
    await this.initDate();
    this.quickSearch(0);
  }

  async getData(DateS: Date, DateE: Date) {
    const response = await this.carbonInquiryService.GetCarbonTrx(
      moment(DateS).format('YYYYMMDD') as any,
      moment(DateE).format('YYYYMMDD') as any,
      '');
    if (this.errorPageService.validateResponse(response, { redirect: false, showMessage: false })) {
      this.carbonData = response.Result;
      // 是否有資料
      if (this.carbonData.Items) {
        // Result{"Items": []}、Result{"Items": [{ }]}
        this.carbonData.Items[0] ? this.carbonData.Items[0].Trxs ? this.hasItem = true : this.hasItem = false : this.hasItem = false;
      } else {
        // Result{}
        this.hasItem = false;
      }
      if (this.hasItem) {
        let Otherdetail: {}[] = [];
        let Othertotal = 0;
        for (let i of this.carbonData.Items) {
          let idx = this.carbonDataOverflow.findIndex((element) => {
            return element.Type === i.MCCDesc;
          })
          for (let detail of i.Trxs) {
            detail.Grams = this.GramsToKilgrams(detail.Grams);
            detail.TransactionDate = moment(detail.TransactionDate).format('YYYY/MM/DD');
            detail.DEDate = moment(detail.DEDate).format('YYYY/MM/DD');
            detail.CardDesc = detail.CardDesc + detail.CardNo.substring(12, 16)// 卡名 + 卡號後4碼
            detail.CardNo = detail.CardNo;
            detail.MCCDesc = detail.MCCDesc !== '' ? detail.MCCDesc : '其他消費';
            if (detail.CurrencyCode != 'TWD') {
              detail.Amount = Math.round((detail.Amount) * 100) / 100;
            }
            //總覽
            if (idx == -1 || idx == 5) {
              // 其他消費加總
              Othertotal = Othertotal + detail.Grams;
              // 總覽
              this.carbonDataOverflow[5].total = Othertotal;
              this.carbonDataOverflow[5].bar = Othertotal.toString();
              // 其他消類資料
              Otherdetail.push(detail);
              // 明細
              this.carbonDetail.push({
                MccCode: this.carbonDataOverflow[5].MccCode,
                data: detail,
                // Date:用於排序(消費日降冪)
                Date: moment(detail.TransactionDate).toDate(),
              });
            } else {
              // 總覽
              this.carbonDataOverflow[idx].total = this.carbonDataOverflow[idx].total + detail.Grams;
              this.carbonDataOverflow[idx].data = i.Trxs;
              // 明細
              this.carbonDetail.push({
                MccCode: this.carbonDataOverflow[idx].MccCode,
                data: detail,
                Date: moment(detail.TransactionDate).toDate(),
              });
            }
          }
        }
        this.setBar();
        this.carbonDataOverflow[5].data = Otherdetail;
        this.AllcarbonDataOverflow = JSON.parse(JSON.stringify(this.carbonDataOverflow));
        // 資料排序：消費日(降冪)
        this.carbonDetail.sort(function (x, y) {
          if (x.Date > y.Date) {
            return -1;
          }
          if (x.Date < y.Date) {
            return 1;
          }
          return 0;
        });
      }
      // 明細
      for (let item of this.carbonDetail) {
        this.showDetail.push(item.data);
      }
    } else {
      this.isError = false;
    }
    // 卡片選項改從 isEligibleCard api資料
    for (let Card of this.carbonInquiryService._isEligibleCardData) {
      this.CardInfo(Card.Name + Card.CardNo.substring(12, 16), Card.CardNo); // 卡片下拉
    }
  }

  /**公克-> 公斤 */
  GramsToKilgrams(g: number) {
    const kg = g / 1000;
    // 有值但不足0.1者則以0.1呈現
    if (kg > 0 && kg < 0.1) {
      return 0.1;
    }
    //無條件捨去至小數點後二位
    return Math.trunc(kg*100) / 100;
  }

  /**總覽、明細下拉 */
  onSelectType(cardidx: number, type?: string,) {
    this.showDetail = [];
    let detailTotle = 0;
    this.carbonDataOverflow = JSON.parse(JSON.stringify(this.AllcarbonDataOverflow));
    this.typeDetail = this.carbonDetail;
    if (type) {
      this.pages = 1;
      this.lastcardidx = cardidx;
      this.selectedTab = tableType.Detail;
      // 明細
      if (Number(cardidx) !== 0) {
        this.typeDetail = this.typeDetail.filter(item => item.data.CardNo === this.cardOption[cardidx].No);
      }
      if (type !== '000') {
        this.typeDetail = this.typeDetail.filter(item => item.MccCode === type);
      }
      this.lastType = type;
      for (let i of this.typeDetail) {
        this.showDetail.push(i.data);
        detailTotle = detailTotle + i.data.Grams;
      }
      this.showDetail.length === 0 ? this.hasItem = false : this.hasItem = true;
      this.typeKg = detailTotle;
    } else {
      // 總覽
      this.lastcardidx = cardidx;
      this.selectedTab = tableType.Overvier;
      if (Number(cardidx) !== 0) {
        let idx = 0;
        for (let i of this.carbonDataOverflow) {
          if (i.total !== 0) {
            const showItem = i.data.filter(c => c.CardNo === this.cardOption[cardidx].No);
            let TypeGrams = 0;
            if (showItem.length === 0) {
              i.bar = '0';
              i.total = 0;
            } else {
              // 重新計算該卡的類別Bar、碳足跡
              for (let item of showItem) {
                TypeGrams = TypeGrams + item.Grams;
              }
              // 百分比大於100以100顯示，小於0以0顯示，碳足跡為負值時以0顯示
              let percent = TypeGrams > 0 ? (TypeGrams / this.TotalGrams) * 100 : 0;
              percent = (percent > 100) ? 100 : ((percent < 0) ? 0 : percent);
              this.carbonDataOverflow[idx].total = TypeGrams;
              this.carbonDataOverflow[idx].bar = (percent).toString();
            }
            this.carbonDataOverflow[idx].data = showItem;
          }
          idx++;
        }
      }
    }
  }

  /**
   * 卡片資訊下拉
   * @param name 卡名 + 4碼
   * @param no 卡號
   */
  CardInfo(name: string, no: string) {
    let same = false;
    for (let cardinfo of this.cardOption) {
      if (cardinfo.Name === name && cardinfo.No === no) {
        same = true;
      }
    }
    if (!same) {
      this.cardOption.push({
        Name: name,
        No: no,
      });
    }
  }

  /** 設定日期相關參數 */
  async initDate() {
    //組成快速搜尋按鈕內容
    await this.quickDateBtn();
    //#region 日期選擇器相關設定
    //最大、小日期
    this.Maxdate = moment(moment().add(-1, 'days').startOf('day').format('YYYY-MM-DD')).toDate();
    this.MinDate = moment(moment().add(-1, 'year').startOf('day').format('YYYY-MM-DD')).toDate();
    switch (this.isMobile) {
      case true:
        // 小網-開始
        this.DateStartM.setValue(moment().add(-31, 'days').startOf('day').format('YYYYMMDD'));
        // 小網-結束
        this.DateEndM.setValue(moment().add(-1, 'days').startOf('day').format('YYYYMMDD'));
        break;
      case false:
        // 大網-開始
        this.DateStart.setValue(moment().add(-31, 'days').startOf('day').toDate());
        // 大網-結束
        this.DateEnd.setValue(moment(moment().add(-1, 'days').startOf('day')).toDate());
        break;
      default:
        break;
    }
    //#endregion
  }

  /** 快速搜尋三按鈕 */
  quickDateBtn() {
    for (let i = 0; i < 4; i++) {
      if (i === 3) {
        this.quickDates.push({ Date: '自訂', value: i });
      }
      else {
        this.quickDates.push({
          Date: moment().add(-i, 'month').format('YYYY/MM').toString(),
          value: i,
          dateS: moment().add(-i, 'month').startOf('month').toDate(),
          dateE: i === 0 ? moment().add(-1, 'day').toDate() : moment().add(-i, 'month').endOf('month').toDate(),
        });
      }
    }
  }

  /**
   * 快速查詢
   * @param index
   * @returns
   */
  quickSearch(index: number) {
    if (index === 3) {
      this.customPickDate = true;
      return;
    } else {
      this.customPickDate = false;
    }
    this.customDate(this.quickDates[index].dateS.toString(), this.quickDates[index].dateE.toString());
  }

  /**日期 submit */
  async customDate(start: string, end: string, customdateClick?: boolean) {
    let DateS = moment(start).toDate();
    let DateE = moment(end).toDate();
    // 自訂日期查詢鈕Click才檢核
    if (customdateClick) {
      if (this.isMobile) {
        // 小網
        const date = this.CheckDate(this.DateStartM.value, this.DateEndM.value)
        if (!date) {
          this.errorPageService.display('請輸入正確的日期格式', false);
          return;
        } else {
          DateS = moment(this.DateStartM.value).toDate();
          DateE = moment(this.DateEndM.value).toDate();
        }

      }
      const validate = this.Validate(DateS, DateE);
      if (!validate) {
        return
      }
    }
    if (moment(DateS).isSame(this.searchDateS) && moment(DateE).isSame(this.searchDateE)) {
      return;//與上次查詢相同日期則不再查詢
    }
    this.searchDateS = DateS;
    this.searchDateE = DateE;
    this.resetOption();
    this.getData(DateS, DateE);
  }

  /**重設Select option */
  resetOption(): void {
    this.cardOption = [{ Name: '全部卡片', No: '0000' }];
    this.initCarbonDataOverflow();
    this.typeDetail = [];
    this.lastType = '000';
    this.lastcardidx = 0;
    this.TotalGrams = 0;
    this.carbonDetail = [];
    this.typeKg = 0;
    this.showDetail = [];
    this.pages = 1;
  }

  /**初始化總覽資料 */
  initCarbonDataOverflow() {
    this.carbonDataOverflow = [
      { MccCode: '001', Type: '餐廳飲食', total: 0, data: '', bar: '0', color: 'royalblue' },
      { MccCode: '002', Type: '交通運輸', total: 0, data: '', bar: '0', color: 'skyblue' },
      { MccCode: '003', Type: '購物消費', total: 0, data: '', bar: '0', color: 'orangered' },
      { MccCode: '004', Type: '家庭開銷', total: 0, data: '', bar: '0', color: 'gold' },
      { MccCode: '005', Type: '金融服務', total: 0, data: '', bar: '0', color: 'rebeccapurple' },
      { MccCode: '006', Type: '其他消費', total: 0, data: '', bar: '0', color: 'hotpink' },
      { MccCode: '007', Type: '休閒旅遊', total: 0, data: '', bar: '0', color: 'yellowgreen' }];
    this.AllcarbonDataOverflow = JSON.parse(JSON.stringify(this.carbonDataOverflow));
  }

  /**初始化消費種類下拉選單 */
  initTypeSelect() {
    this.typeOption = [
      { Type: '全部消費類別', Code: '000' },
      { Type: '餐廳飲食', Code: '001' },
      { Type: '交通運輸', Code: '002' },
      { Type: '購物消費', Code: '003' },
      { Type: '家庭開銷', Code: '004' },
      { Type: '金融服務', Code: '005' },
      { Type: '其他消費', Code: '006' },
      { Type: '休閒旅遊', Code: '007' }]
  }

  /**設定總覽Bar的資料 */
  setBar() {
    // 計算總碳足跡
    for (let typeData of this.carbonDataOverflow) {
      this.TotalGrams = this.TotalGrams + typeData.total;
    }
    // 計算bar的長度
    for (let idx of this.carbonDataOverflow) {
      // 百分比大於100以100顯示，小於0以0顯示，碳足跡為負值時以0顯示
      let percent = idx.total > 0 ? (idx.total / this.TotalGrams) * 100 : 0;
      percent = (percent > 100) ? 100 : ((percent < 0) ? 0 : percent);
      idx.bar = (percent).toString();
    }
    this.typeKg = this.TotalGrams;
  }

  scrollTop() {
    document.getElementById('resultType').scrollIntoView({ behavior: 'smooth' });
  }

  // 大小網共用驗證
  Validate(DateS: Date, DateE: Date): boolean {
    if (DateS < this.MinDate) {
      this.errorPageService.display('僅可查詢近一年資料(自啟用日起計算)', false);// 僅可查詢近一年資料(自啟用日起計算)
      return false;
    }
    else if (DateE > this.Maxdate) {
      this.errorPageService.display('碳足跡資料將於刷卡消費後約1~8天產生，無法查詢當日交易', false);// 僅可查詢近一年資料(自啟用日起計算)
      return false;
    }
    else if (DateE < DateS) {
      this.errorPageService.display('結束日期不可早於開始日期', false);// 結束日期不可早於開始日期
      return false;
    } return true

  }

  // 小網檢核：月份>12、日>該月天數
  CheckDate(StartM: string, EndM: string): boolean {
    if (StartM.length !== 8 || EndM.length !== 8) {
      return false
    } else {
      const pattern = /(\d{4})(\d{2})(\d{2})/
      const [yearS, monthS, dayS] = StartM.match(pattern).slice(1);
      const [yearE, monthE, dayE] = EndM.match(pattern).slice(1);
      if (Number(monthS) > 12 || Number(monthE) > 12) {
        return false
      } else {
        // 取得該年月的天數
        let Sdays = moment(yearS + monthS, "YYYYMM").daysInMonth();
        let Edays = moment(yearE + monthE, "YYYYMM").daysInMonth();
        if (Number(dayS) > Sdays || Number(dayE) > Edays) {
          return false
        }
      }
    } return true

  }
}

/** 頁籤類型 */
export enum tableType {
  /**總覽 */
  Overvier = 'overvier',
  /**明細 */
  Detail = 'detail',
}

