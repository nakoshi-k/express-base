declare module "*.vue" {
    import Vue from 'vue'
    export default Vue
  }
  declare module "BundleServer" {
    export function bs(context:any): Promise<any>;
  }