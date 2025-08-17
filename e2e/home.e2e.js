describe('Home Screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show the home title and random button', async () => {
    await expect(element(by.id('home_title'))).toBeVisible();
    await expect(element(by.id('random_button'))).toBeVisible();
  });

  it('should navigate to profile when tapping settings', async () => {
    await element(by.id('settings_button')).tap();
    await expect(element(by.text('Profile'))).toBeVisible();
    // <-- adjust to actual Profile screen text
  });
});
