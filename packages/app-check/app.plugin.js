const { withAppDelegate } = require('@expo/config-plugins')

const withDebugProvider = (config) => {
    return withAppDelegate(infoPlist, config => {
        config.modResults.contents = addAppCheckDebugProvider(config.modResults.contents);
        return config;
    })
}


const addAppCheckDebugProvider = (appDelegate) => {
    return appDelegate.replace('[FIRApp configure];', `
    FIRAppCheckDebugProviderFactory *providerFactory =
          [[FIRAppCheckDebugProviderFactory alloc] init];
    [FIRAppCheck setAppCheckProviderFactory:providerFactory];
    [FIRApp configure];
    `)
}

module.exports =  withDebugProvider;