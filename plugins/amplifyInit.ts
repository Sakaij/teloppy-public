import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import awsExports from '~/src/aws-exports.js'

Amplify.configure({...awsExports,ssr:true});
Vue.use(AmplifyModules as any);
