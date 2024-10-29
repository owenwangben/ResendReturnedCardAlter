import { MmaCardPage } from './app.po';

describe('mma-card App', () => {
  let page: MmaCardPage;

  beforeEach(() => {
    page = new MmaCardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
