describe('Home Screen', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show the home title', async () => {
    await waitFor(element(by.id('home_title')))
      .toBeVisible()
      .withTimeout(15000);
  });

  it('should navigate to profile when tapping settings', async () => {
    await element(by.id('settings_button')).tap();
    await waitFor(element(by.text('Profile')))
      .toBeVisible()
      .withTimeout(5000);
  });
});
