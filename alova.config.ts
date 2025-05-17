module.exports = {
  generator: [
    {
      input: 'http://localhost:3000/api-json',
      platform: 'swagger',
      output: 'apps/view/src/composables/api/clients',
      global: 'Apis',
    },
    {
      input: 'http://localhost:3000/api-json',
      platform: 'swagger',
      output: 'apps/cms/src/composables/api/clients',
      global: 'EndApis',
    },
  ],
  autoUpdate: {
    launchEditor: true,
    interval: 5 * 60 * 1000
  }
};