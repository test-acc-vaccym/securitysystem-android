package com.Osu.SecuritySystem;

import com.urbanairship.push.PushManager;
import com.urbanairship.push.PushPreferences;
import org.apache.cordova.DroidGap;
import android.content.Context;
import android.telephony.TelephonyManager;
import android.webkit.WebView;

public class getAPID {

    private WebView mAppView;
    private DroidGap mGap;
    public getAPID(DroidGap gap, WebView view)
    {
        mAppView = view;
        mGap = gap;
    }
    public String getAPID(){
        PushPreferences prefs = PushManager.shared().getPreferences();
        return prefs.getPushId();
    }

}
