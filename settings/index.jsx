function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Fitbit Account</Text>}>
        <Oauth
          settingsKey="oauth"
          title="Login"
          label="Fitbit"
          status="Login"
          authorizeUrl="https://www.fitbit.com/oauth2/authorize"
          requestTokenUrl="https://api.fitbit.com/oauth2/token"
          clientId="22DLXS"
          clientSecret="b1a9b34f08c167505cde42d77882e543"
          scope="nutrition"
        />
      </Section>
      <Section
        title={<Text bold align="center">Settings</Text>}>     
        <Toggle
          settingsKey="netcarbs"
          label="Show Net Carbs"
        />   
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
