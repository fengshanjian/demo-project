package com.testproject;

import android.app.Application;

import com.facebook.react.ReactApplication;
import android.support.annotation.Nullable;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new ExtensionPackage()
                    );
        }
        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
        @Nullable
        @Override
        protected String getBundleAssetName() {
            if (isDebugable()) {
                return super.getBundleAssetName();
            }
            return "index.android.bundle";
        }
    };
    public static boolean isDebugable() {
        if ("debug".equals(BuildConfig.BUILD_TYPE.toString())) {
            return true;
        }
        return false;
    }
    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
