# @Author: will
# @Date:   2017-05-26T20:44:52+08:00
# @Filename: build.sh
# @Last modified by:   will
# @Last modified time: 2017-06-21T19:06:30+08:00
#!/bin/sh

if [ "bundle" = "$1" ];then
    react-native bundle --entry-file index.js --bundle-output ./ios/bundle/index.ios.jsbundle --platform ios --assets-dest ./ios/bundle --dev false
    react-native bundle --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --platform android --assets-dest ./android/app/src/main/res/ --dev false
elif [ "ios" = "$1" ];then
    react-native bundle --entry-file index.js --bundle-output ./ios/bundle/index.ios.jsbundle --platform ios --assets-dest ./ios/bundle --dev false
elif [ "android" = "$1" ];then
    react-native bundle --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --platform android --assets-dest ./android/app/src/main/res/ --dev false
else
    react-native init $1 
    mv build.sh $1
    cd $1
    npm install mobx --save
    npm install mobx-react --save
    npm install --save react-native-device-info
    npm install react-navigation --save
    npm install --save teaset
    npm install react-native-animatable --save
    npm install react-native-vector-icons --save 
    npm i --save react-native-elements@1.0.0-beta4
    npm install babel-plugin-transform-decorators-legacy --save-dev
    # 使 eslint 支持 AirBnb 编码规范和ES7 编码规范,
    export PKG=eslint-config-airbnb;
    npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG"
    npm install babel-eslint --save-dev
    npm install react-native-splash-screen --save
    git clone https://github.com/fengshanjian/create-react-native-project.git
    mv create-react-native-project src
    cd src
    rm -rf .git
    rm build.sh
    rm README.md    
    mv others/resource ../
    mv others/.babelrc ../
    mv others/.editorconfig ../
    mv others/.eslintrc ../
    mv others/.gitignore ../
    echo "AppRegistry.registerComponent('$1', () => App);" >>others/index.js
    mv others/index.js ../
    mv others/layout ../android/app/src/main/res/
    mv others/colors.xml ../android/app/src/main/res/values/
    mv others/drawable-xxhdpi ../android/app/src/main/res/
    mv others/drawable-xhdpi ../android/app/src/main/res/
    mv others/LaunchImage.launchimage ../ios/$1/Images.xcassets/
    sed  "s/@TestProject/$1/g"  others/AppDelegate.m > others/AppDelegate.m.tmp
    mv others/AppDelegate.m.tmp others/AppDelegate.m
    mv others/AppDelegate.m ../ios/$1/
    mv others/CommonApi.h ../ios/$1/
    mv others/CommonApi.m ../ios/$1/

    sed  "s/@TestProject/$1/g"  others/app.json > others/app.json.tmp
    mv others/app.json.tmp others/app.json

    sed  "s/@TestProject/$1/g"  others/MainActivity.java > others/MainActivity.java.tmp
    mv others/MainActivity.java.tmp others/MainActivity.java
    projectName=`echo $1 | tr A-Z a-z `

    sed  "s/com.testproject;/com.$projectName;/g"  others/MainActivity.java > others/MainActivity.java.tmp
    mv others/MainActivity.java.tmp others/MainActivity.java
    mv others/MainActivity.java ../android/app/src/main/java/com/$projectName/

    sed  "s/com.testproject;/com.$projectName;/g"  others/ExtensionPackage.java > others/ExtensionPackage.java.tmp
    mv others/ExtensionPackage.java.tmp others/ExtensionPackage.java
    mv others/ExtensionPackage.java ../android/app/src/main/java/com/$projectName/

    sed  "s/com.testproject;/com.$projectName;/g"  others/CommonApi.java > others/CommonApi.java.tmp
    mv others/CommonApi.java.tmp others/CommonApi.java
    mv others/CommonApi.java ../android/app/src/main/java/com/$projectName/

    sed  "s/com.testproject;/com.$projectName;/g"  others/MainApplication.java > others/MainApplication.java.tmp
    mv others/MainApplication.java.tmp others/MainApplication.java
    mv others/MainApplication.java ../android/app/src/main/java/com/$projectName/

    rm -rf others
    sed  's/minifyEnabled enableProguardInReleaseBuilds/minifyEnabled true/g'  ../android/app/build.gradle > ../android/app/build.gradle.tmp
    mv ../android/app/build.gradle.tmp ../android/app/build.gradle
    mkdir ../ios/bundle
    mkdir ../android/app/src/main/assets/
    cd ..
    react-native link
    rm App.js
fi
