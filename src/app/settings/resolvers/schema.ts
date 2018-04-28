export const schema = `
  type Settings {
    theme: String!
    autoNightMode: Boolean
    persist: Boolean
  }

  type Query {
    settings: Settings
  }

  type Mutation {
    changeTheme(theme: String!): Settings
    changeAutoNightMode(autoNightMode: Boolean): Settings
    persistPreference(persist: Boolean): Settings
  }
`;
