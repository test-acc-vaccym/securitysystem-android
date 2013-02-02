package com.Osu.SecuritySystem;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import com.urbanairship.Logger;
import com.urbanairship.UAirship;
import com.urbanairship.push.PushManager;

public class UAirshipInit extends Application {

    final static String TAG = UAirshipInit.class.getSimpleName();
    private static UAirshipInit instance = new UAirshipInit();

    public UAirshipInit() {
        instance = this;
    }

    public static Context getContext() {
        return instance;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        UAirship.takeOff(this);
        PushManager.enablePush();
        PushManager.shared().setIntentReceiver(IntentReceiver.class);
    }

    public void onStop() {
        UAirship.land();
    }
}