import { AdminPage } from './app.po';

describe('admin App', function() {
  let page: AdminPage;

  beforeEach(() => {
    page = new AdminPage();
  });

  it('should display message saying dashboard works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('dashboard works!');
  });
});
